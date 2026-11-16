// Local fixtures or live-host UI checks; provider requests are always intercepted.
import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import { writeFile } from 'node:fs/promises';
import { build } from './build.mjs';
import { previewServer } from './server.mjs';
import { renderPage } from '../src/render.mjs';
import { models } from '../src/models.mjs';
import { bulkFields } from '../src/enquiry.mjs';
import { pathFor } from '../src/routes.mjs';
import { contentSecurityPolicy } from '../src/security.mjs';
import { FORMSPREE_ENDPOINT } from '../public/assets/formspree.js';
const {chromium}=await import(process.env.EEBD_PLAYWRIGHT_MODULE || 'playwright');
const directory=resolve('test-results/formspree-browser-build');
const sourceRoute=process.env.EEBD_TEST_SOURCE_ROUTE || 'training';
const liveOrigin=process.env.EEBD_LIVE_URL ? new URL(process.env.EEBD_LIVE_URL).origin : null;
let server;
if(!liveOrigin) {
  await build({outDir:directory});
  server=previewServer(directory);
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
}
const origin=liveOrigin || `http://127.0.0.1:${server.address().port}`;
const browser=await chromium.launch({headless:true,executablePath:process.env.EEBD_CHROME_EXECUTABLE});
const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
context.setDefaultTimeout(12000);
await context.addInitScript(()=>localStorage.setItem('eebd.analytics-consent.v1',JSON.stringify({value:'denied',at:Date.now()})));
const page=await context.newPage();
let calls=[],scenario='success',unexpected=[];
const pageErrors=[];page.on('pageerror',error=>pageErrors.push(error.message));
await context.route('**/*',async route=>{
  const request=route.request(),url=new URL(request.url());
  if(request.url()===FORMSPREE_ENDPOINT) {
    calls.push(request.postDataJSON());
    if(scenario==='network')return route.abort('failed');
    if(scenario==='slow')await new Promise(resolve=>setTimeout(resolve,250));
    const responses={invalid:[422,{errors:[{field:'email',message:'Invalid'}]}],rate:[429,{error:'Busy'}],verification:[403,{errors:[{code:'RECAPTCHA_ERROR'}]}],server:[500,{error:'Unavailable'}],malformed:[200,'<html>Unexpected</html>']};
    const [status,result]=responses[scenario] || [200,{next:'https://example.invalid/do-not-follow',ok:true}];
    return route.fulfill({status,contentType:'application/json',body:typeof result==='string'?result:JSON.stringify(result),headers:{'Access-Control-Allow-Origin':origin}});
  }
  if(url.origin!==origin) {unexpected.push(request.url());return route.abort();}
  for(const locale of ['en','fr']) if(!liveOrigin && [pathFor('quote',locale),pathFor('contact',locale)].includes(url.pathname)) {
    return route.fulfill({status:200,contentType:'text/html',body:renderPage(url.pathname===pathFor('contact',locale)?'contact':'quote',locale,'production'),headers:{'Content-Security-Policy':contentSecurityPolicy('production')}});
  }
  return route.continue();
});
async function prepare(locale,type,sourceId=sourceRoute) {
  console.log('Form check:',locale,type,scenario,sourceId);
  calls=[];
  await page.goto(origin+pathFor(type==='general'?'contact':'quote',locale)+'?type='+type+'&source='+encodeURIComponent(pathFor(sourceId,locale)));
  await page.locator('[data-review]').click();
  assert.equal(await page.locator('[data-errors]').isVisible(),true);
  if(type!=='general')await page.locator('[data-optional-details] summary').click();
  for(const [name,value] of Object.entries(type==='general'?{contact:'Synthetic Buyer',email:'buyer@example.invalid'}:{contact:'Synthetic Buyer',organization:'Example Test Organization',email:'buyer@example.invalid',location:'Ontario',timing:'Flexible'}))await page.locator('#common-'+name).fill(value);
  const group=page.locator('[data-request-type="'+type+'"]');
  if(type==='general')await group.locator('[name="message"]').fill('<script>literal model name</script>');
  else await group.locator('[name="model"]').fill('<script>literal model name</script>');
  for(const input of await group.locator('input[required],textarea[required]').all())if(!['model','message'].includes(await input.getAttribute('name')))await input.fill('Synthetic requirement');
  for(const select of await group.locator('select[required]').all())await select.selectOption({index:1});
  await page.locator('[name="privacyAcknowledgement"]').check();
  await page.locator('[data-review]').click();
  assert.equal(await page.locator('[data-enquiry-review]').isVisible(),true);
  assert.equal(await page.locator('[data-summary] script').count(),0);
  assert.equal(calls.length,0,'Review must not send a request');
  await page.locator('[data-edit]').click();
  assert.equal(await page.locator('#common-contact').inputValue(),'Synthetic Buyer');
  await page.locator('[data-review]').click();
}
try {
  for(const model of models)for(const locale of ['en','fr']) {
    await page.goto(origin+pathFor('quote',locale)+'?type=equipment&source='+encodeURIComponent(pathFor(model.id,locale)));
    assert.equal(await page.locator('#equipment-model').inputValue(),model.name);
    const other=locale==='en'?'fr':'en';
    await page.locator('.language-switch a[lang="'+other+'-CA"]').click();
    await page.waitForLoadState('load');
    assert.equal(new URL(page.url()).searchParams.get('source'),pathFor(model.id,other));
    assert.equal(await page.locator('#equipment-model').inputValue(),model.name);
  }
  await page.goto(origin+pathFor('quote','en')+'?source=https://outside.invalid/forged-model');
  assert.equal(await page.locator('#equipment-model').inputValue(),'');
  for(const locale of ['en','fr'])for(const type of ['equipment','training','service','general']) {
    scenario='success';await prepare(locale,type);await page.locator('[data-send]').click();
    await page.locator('[data-enquiry-complete]').waitFor({state:'visible'});
    assert.equal(calls.length,1);const sent=calls[0];
    assert.equal(sent.email,'buyer@example.invalid');assert.equal(sent.name,'Synthetic Buyer');assert.equal(sent.requestType,type);assert.equal(sent.locale,locale+'-CA');
    assert.equal(sent.sourcePath,pathFor(sourceRoute,locale));assert.equal(sent._gotcha,'');assert.equal(sent.optionalMarketingConsent,false);
    assert.ok(sent.message.includes('<script>literal model name</script>'));
    if(type!=='general')assert.ok(sent._subject.endsWith(' — <script>literal model name</script>'));
    assert.match(sent.submissionId,/^[a-f0-9-]{36}$/);
    if(type!=='training')assert.equal(sent.participants,undefined);
    if(type!=='service')assert.equal(sent.issue,undefined);
    assert.equal(await page.locator('#common-email').inputValue(),'');
    assert.equal(await page.evaluate(()=>document.activeElement.hasAttribute('data-complete-heading')),true);
    assert.deepEqual(await page.evaluate(()=>Object.keys(localStorage)),['eebd.analytics-consent.v1']);assert.equal(await page.evaluate(()=>sessionStorage.length),0);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
    if(type==='equipment')await page.screenshot({path:`test-results/formspree-${liveOrigin?'live-':''}confirmation-${locale}.png`,fullPage:true});
  }
  // A buyer can enquire without inventing a model, company or delivery date.
  for(const locale of ['en','fr']) {
    scenario='success';calls=[];
    await page.goto(origin+pathFor('quote',locale));
    assert.equal(await page.locator('[data-optional-details]').getAttribute('open'),null);
    assert.equal(await page.locator('[required]:visible').count(),6);
    for(const [name,value] of Object.entries({contact:'Synthetic Buyer',email:'buyer@example.invalid',location:'Halifax'}))await page.locator('#common-'+name).fill(value);
    await page.locator('#equipment-application').selectOption('marine');
    await page.locator('#equipment-quantity').fill('12');
    await page.locator('[name="privacyAcknowledgement"]').check();
    await page.locator('[data-review]').click();
    assert.equal(await page.locator('[data-enquiry-review]').isVisible(),true);
    assert.equal(calls.length,0);
    await page.locator('[data-send]').click();
    await page.locator('[data-enquiry-complete]').waitFor({state:'visible'});
    assert.equal(calls.length,1);
    assert.equal(calls[0].model,'');assert.equal(calls[0].organization,'');assert.equal(calls[0].timing,'');
    assert.equal(calls[0].quantity,'12');assert.equal(calls[0].location,'Halifax');
    assert.ok(calls[0].message.length>50);
  }
  for(const failure of ['invalid','rate','verification','server','malformed','network']) {
    scenario=failure;await prepare('fr','training');await page.locator('[data-send]').click();
    await page.waitForFunction(()=>!document.querySelector('[data-enquiry-review]').hasAttribute('aria-busy'));
    assert.equal(calls.length,1);assert.equal(await page.locator('[data-enquiry-complete]').isVisible(),false);
    assert.equal(await page.locator('#common-email').inputValue(),'buyer@example.invalid');
    if(failure==='invalid') {
      assert.equal(await page.locator('[data-errors]').isVisible(),true);assert.equal(await page.locator('#common-email').getAttribute('aria-invalid'),'true');
    } else assert.ok((await page.locator('[data-submission-status]').innerText()).length>20);
  }
  const bulkValues={partNumber:'TEST-PART-01',nsn:'TEST-NSN',ncage:'TEST-CAGE',procurementReference:'TEST ONLY procurement',purchasePlan:'forecast',destinationSchedule:'Halifax: 12 estimated, April 2027\nEsquimalt: 8 estimated, May 2027',remainingShelfLife:'Required at delivery: to discuss',documentation:'English and French instructions; exact-variant approvals',accessories:'2 dedicated trainers\n20 separate mounting brackets',deliveryTerms:'Receiving contact and freight terms to confirm'};
  for(const locale of ['en','fr']) {
    scenario='success';await prepare(locale,'equipment','fleetProcurement');
    await page.locator('[data-edit]').click();
    assert.equal(await page.locator('[data-bulk-fields]').getAttribute('open'),'');
    for(const [name,value] of Object.entries(bulkValues)) {
      const field=page.locator('#equipment-'+name);
      if(name==='purchasePlan')await field.selectOption(value);else await field.fill(value);
    }
    await page.locator('[data-review]').click();
    const summary=await page.locator('[data-summary]').innerText();
    assert.ok(summary.includes(bulkValues.destinationSchedule));assert.ok(summary.includes(bulkValues.documentation));
    await page.locator('[data-edit]').click();
    assert.equal(await page.locator('#equipment-accessories').inputValue(),bulkValues.accessories);
    await page.locator('[data-review]').click();await page.locator('[data-send]').click();
    await page.locator('[data-enquiry-complete]').waitFor({state:'visible'});
    assert.equal(calls.length,1);
    for(const [name,value] of Object.entries(bulkValues))assert.equal(calls[0][name],value,name+' survives submission');
    assert.equal(calls[0].sourcePath,pathFor('fleetProcurement',locale));
    assert.ok(calls[0].message.includes(bulkValues.destinationSchedule));
    for(const name of bulkFields)assert.equal(await page.locator('#equipment-'+name).inputValue(),'');
  }
  // Switching away from a populated equipment branch must not send its purchasing data.
  await prepare('en','equipment','fleetProcurement');await page.locator('[data-edit]').click();
  await page.locator('#equipment-partNumber').fill('DO NOT SEND');
  await page.locator('[name="requestType"][value="service"]').check();
  for(const [name,value] of Object.entries({model:'Test unit',quantity:'1',issue:'Test documentation request'}))await page.locator('#service-'+name).fill(value);
  await page.locator('#service-support').selectOption('documents');
  await page.locator('[data-review]').click();
  assert.ok(!(await page.locator('[data-summary]').innerText()).includes('DO NOT SEND'));
  await page.locator('[data-send]').click();await page.locator('[data-enquiry-complete]').waitFor({state:'visible'});
  for(const name of bulkFields)assert.equal(calls[0][name],undefined,'Inactive bulk field '+name);
  scenario='slow';await prepare('en','service');
  await page.locator('[data-send]').evaluate(button=>{button.click();button.click();});
  await page.locator('[data-enquiry-complete]').waitFor({state:'visible'});assert.equal(calls.length,1,'Double click must not send twice');
  assert.deepEqual(unexpected,[]);assert.deepEqual(pageErrors,[]);
  const report={origin,sourceRoute,checkedAt:new Date().toISOString(),browser:await browser.version(),modelContextChecks:models.length*2,unknownModelSourceIgnored:true,successJourneys:8,shortEnquiryJourneys:2,bulkJourneys:2,inactiveBulkFieldsDiscarded:true,failureJourneys:6,doubleClick:'PASS',externalRequests:0,realSubmissions:0,limits:'Provider responses are intercepted. This suite does not verify account settings or inbox delivery; those require separate evidence.'};
  await writeFile(`test-results/formspree-${liveOrigin?'live-':''}browser-report.json`,JSON.stringify(report,null,2)+'\n');console.log(report);
} finally {
  await browser.close();
  if(server) {server.closeAllConnections();await new Promise(resolve=>server.close(resolve));}
}
