import test from 'node:test';
import assert from 'node:assert/strict';
import { routes, includedRoutes, sitemapRoutes, pathFor } from '../src/routes.mjs';
import { models } from '../src/models.mjs';
import { cities } from '../src/cities.mjs';
import { offerings } from '../src/offerings.mjs';
import { pages, home } from '../src/content.mjs';
import { site, assertProductionReady } from '../src/config.mjs';
import { saleableProducts } from '../src/catalogue.mjs';
import { renderPage, esc } from '../src/render.mjs';
import { validateEnquiry, requestTypes } from '../src/enquiry.mjs';
import { previewServer } from '../scripts/server.mjs';

test('every page purpose has unique reciprocal English/French routes and content',()=>{
  const paths=routes.flatMap(r=>Object.values(r.paths));
  assert.equal(new Set(paths).size,paths.length);
  for(const r of routes) for(const locale of ['en','fr']) {
    assert.equal(pathFor(r.id,locale),r.paths[locale]);
    assert.ok(r.paths[locale].startsWith(`/${locale}/`));
    assert.ok(r.paths[locale].endsWith('/'));
    if(!['home','quote'].includes(r.id)) assert.ok(pages[r.id][locale].sections.length>=2);
    const html=renderPage(r.id,locale);
    assert.match(html,new RegExp(`<html lang="${locale}-CA"`));
    assert.equal((html.match(/<h1>/g)||[]).length,1);
    assert.ok(html.includes(`rel="canonical" href="https://eebd.ca${r.paths[locale]}"`));
    for(const l of ['en','fr']) assert.ok(html.includes(`hreflang="${l}-CA" href="https://eebd.ca${r.paths[l]}"`));
  }
  assert.ok(home.en && home.fr);
});
test('draft, planned and withdrawn routes cannot enter production or the sitemap',()=>{
  const records=[{status:'draft',indexable:true},{status:'planned',indexable:true},{status:'withdrawn',indexable:true},{status:'published',indexable:false},{status:'published',indexable:true}];
  assert.equal(includedRoutes('preview',records).length,3);
  assert.equal(includedRoutes('production',records).length,2);
  assert.equal(sitemapRoutes(records).length,1);
  assert.equal(includedRoutes('production').length,21+cities.length+offerings.length+models.length);
  assert.equal(sitemapRoutes().length,19+cities.length+offerings.length+models.length);
});
test('production requires verified launch evidence while keeping unarranged supply explicit',()=>{
  assert.doesNotThrow(()=>assertProductionReady());
  assert.equal(site.supplierArrangements,false);
  for(const key of Object.keys(site.readiness))assert.throws(()=>assertProductionReady({...site,readiness:{...site.readiness,[key]:false}}),/Production release blocked/);
  assert.throws(()=>assertProductionReady({...site,emailVerified:false}),/Production release blocked/);
  assert.doesNotMatch(renderPage('home','en','production'),/833.*696/);
});
test('invalid route and locale are rejected',()=>{
  assert.throws(()=>pathFor('imaginary','en'),/Unknown route/);
  assert.throws(()=>pathFor('home','xx'),/Unsupported locale/);
});
test('unverified, recalled or inappropriate equipment cannot become a saleable model',()=>{
  const valid={publicationStatus:'published',supplyStatus:'verified',identityVerified:true,publicCopyReviewed:true,mediaRightsVerified:true,approvalEvidenceVerified:true,limitationsReviewed:true,safetyNoticeStatus:'cleared',safetyNoticeReviewedAt:'2026-11-15',equipmentClass:'escape-oxygen'};
  assert.equal(saleableProducts([valid]).length,1);
  for(const [key,value] of Object.entries(valid)) {
    assert.equal(saleableProducts([{...valid,[key]:typeof value==='boolean'?false:'unverified'}]).length,0,key);
  }
  assert.equal(saleableProducts([{...valid,safetyNoticeReviewedAt:null}]).length,0);
  assert.equal(saleableProducts([{...valid,safetyNoticeStatus:'affected'},{...valid,equipmentClass:'rescue-scba'}]).length,0);
  assert.deepEqual(saleableProducts(),[]);
});
test('output encoding protects text and attribute boundaries',()=>{
  assert.equal(esc('<script>"&\''),'&lt;script&gt;&quot;&amp;&#39;');
});
const allowedPaths=routes.flatMap(r=>Object.values(r.paths));
function request(type='equipment',locale='en-CA') {
  return {requestType:type,locale,sourcePath:locale==='fr-CA'?'/fr/formation/':'/en/training/',privacyAcknowledgement:true,fields:{contact:'Sample Buyer',organization:'Example Organization',email:'buyer@example.invalid',phone:'',location:'Ontario',timing:'Flexible',model:'Not sure',quantity:'Approximately 8',application:'marine',participants:'About 12',language:'fr',objective:'Model familiarization',format:'discuss',support:'identify',issue:'Review replacement route',records:'',specifications:'',notes:''}};
}
for(const type of requestTypes) for(const locale of ['en-CA','fr-CA']) test(`${type} ${locale} validates and retains request context without inactive fields`,()=>{
  const result=validateEnquiry(request(type,locale),allowedPaths);
  assert.equal(result.ok,true);
  assert.equal(result.value.locale,locale);
  assert.equal(result.value.requestType,type);
  assert.equal(result.value.requestSpecificFields.model,'Not sure');
  assert.equal(result.value.optionalMarketingConsent,false);
  if(type!=='training') assert.equal(result.value.requestSpecificFields.participants,undefined);
  if(type!=='service') assert.equal(result.value.requestSpecificFields.issue,undefined);
});
test('missing, invalid and oversized values return field errors without a fake acceptance',()=>{
  const input=request();input.fields.email='not-an-email';input.fields.contact='';input.fields.notes='a'.repeat(2001);input.privacyAcknowledgement=false;
  const result=validateEnquiry(input,allowedPaths);
  assert.equal(result.ok,false);
  assert.deepEqual(Object.keys(result.errors).sort(),['contact','email','notes','privacyAcknowledgement']);
  assert.equal(result.value,undefined);
});
test('untrusted locale, type, source and unsupported product references are rejected',()=>{
  const input={...request(),locale:'xx',requestType:'rescue',sourcePath:'https://example.invalid/private',productId:'unverified-model'};
  const result=validateEnquiry(input,allowedPaths);
  assert.equal(result.ok,false);
  for(const key of ['locale','requestType','sourcePath','productId']) assert.ok(result.errors[key]);
  assert.equal(validateEnquiry(null).ok,false);
  const wrongType=request();wrongType.fields.contact={toString:()=>'<script>'};
  assert.equal(validateEnquiry(wrongType,allowedPaths).errors.contact,'invalid');
});
test('hidden malicious fields are discarded and unknown select values are rejected',()=>{
  const input=request();input.fields.admin=true;input.fields.application='unapproved';
  assert.equal(validateEnquiry(input,allowedPaths).ok,false);
  input.fields.application='marine';
  assert.equal(validateEnquiry(input,allowedPaths).value.admin,undefined);
});
test('preview forms have no submission action, uploads or success state',()=>{
  for(const locale of ['en','fr']) {
    const html=renderPage('quote',locale);
    assert.equal(html.includes('<form'),false);
    assert.equal(html.includes('type="file"'),false);
    assert.match(html,/data-send disabled/);
    assert.match(html,/data-request-type="equipment"/);
    assert.match(html,/data-request-type="training"/);
    assert.match(html,/data-request-type="service"/);
  }
});
test('preview routing returns genuine 404s, redirects and rejects enquiry acceptance',async()=>{
  const server=previewServer();
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const origin=`http://127.0.0.1:${server.address().port}`;
  try {
    const root=await fetch(origin+'/',{redirect:'manual'});assert.equal(root.status,302);assert.equal(root.headers.get('location'),'/en/');
    const slash=await fetch(origin+'/fr/formation?concept=2',{redirect:'manual'});assert.equal(slash.status,308);assert.equal(slash.headers.get('location'),'/fr/formation/?concept=2');
    const page=await fetch(origin+'/en/');assert.equal(page.status,200);assert.match(page.headers.get('x-robots-tag'),/noindex/);
    const missing=await fetch(origin+'/fr/does-not-exist/');assert.equal(missing.status,404);assert.match(await missing.text(),/<html lang="fr-CA"/);
    assert.equal((await fetch(origin+'/en/404/')).status,404);
    assert.equal((await fetch(origin+'/.env')).status,404);
    const submit=await fetch(origin+'/api/enquiries',{method:'POST',body:'sample-only'});assert.equal(submit.status,503);assert.equal((await submit.json()).accepted,false);
    assert.equal((await fetch(origin+'/en/',{method:'POST',body:'sample-only'})).status,405);
  } finally {server.closeAllConnections();await new Promise(resolve=>server.close(resolve));}
});

test('general contact collects only relevant fields and requires a message',()=>{
  for(const locale of ['en','fr']) {
    const html=renderPage('contact',locale,'production');
    assert.match(html,/data-enquiry data-delivery="enabled"/);
    assert.match(html,/value="general"/);assert.match(html,/name="message" required/);
    assert.doesNotMatch(html,/name="quantity"|name="location"|name="timing"|name="organization"/);
  }
  const value={...request(),requestType:'general',fields:{contact:'Sample Buyer',email:'buyer@example.invalid',message:'A general question'}};
  assert.equal(validateEnquiry(value,allowedPaths).ok,true);
  value.fields.message='';assert.equal(validateEnquiry(value,allowedPaths).errors.message,'required');
});

test('optional purchasing requirements retain multiline schedules only for equipment enquiries',()=>{
  const input=request();
  Object.assign(input.fields,{partNumber:'Specified part',purchasePlan:'forecast',destinationSchedule:'Halifax: 12\nEsquimalt: 8',remainingShelfLife:'At delivery: to discuss'});
  const validated=validateEnquiry(input,allowedPaths);
  assert.equal(validated.ok,true);
  assert.equal(validated.value.requestSpecificFields.destinationSchedule,'Halifax: 12\nEsquimalt: 8');
  input.requestType='service';
  assert.equal(validateEnquiry(input,allowedPaths).value.requestSpecificFields.destinationSchedule,undefined);
  input.requestType='equipment';input.fields.purchasePlan='guaranteed-contract';input.fields.nsn='x'.repeat(81);
  const invalid=validateEnquiry(input,allowedPaths);
  assert.deepEqual(invalid.errors,{nsn:'invalid',purchasePlan:'invalid'});
});
