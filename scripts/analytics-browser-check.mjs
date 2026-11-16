import assert from 'node:assert/strict';
import {resolve} from 'node:path';
import {writeFile,readFile} from 'node:fs/promises';
import {build} from './build.mjs';
import {previewServer} from './server.mjs';
import {pathFor} from '../src/routes.mjs';
import {contentSecurityPolicy} from '../src/security.mjs';
const {chromium}=await import(process.env.EEBD_PLAYWRIGHT_MODULE || 'playwright');
const dir=resolve('test-results/analytics-build');await build({mode:'production',outDir:dir});
const server=previewServer(dir);await new Promise(r=>server.listen(0,'127.0.0.1',r));
const origin=`http://127.0.0.1:${server.address().port}`;
const browser=await chromium.launch({headless:true,executablePath:process.env.EEBD_CHROME_EXECUTABLE});
const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
const errors=[],outside=[];let posts=0,fail=true;
await context.route('**/*',async route=>{
 const url=new URL(route.request().url());
 if(url.hostname==='www.googletagmanager.com'){outside.push(url.href);return route.fulfill({contentType:'text/javascript',body:'/* Stub: no real Analytics traffic in local QA */'});}
 if(url.hostname==='formspree.io'){posts++;return route.fulfill({status:fail?500:200,contentType:'application/json',body:JSON.stringify(fail?{error:'Test failure'}:{ok:true,next:'https://example.invalid/ignored'}),headers:{'Access-Control-Allow-Origin':origin}});}
 if(url.origin!==origin){outside.push(url.href);return route.abort();}
 if(url.pathname.endsWith('/'))return route.fulfill({contentType:'text/html',body:await readFile(resolve(dir,'.'+url.pathname,'index.html'),'utf8'),headers:{'Content-Security-Policy':contentSecurityPolicy('production')}});
 return route.continue();
});
const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
const events=()=>page.evaluate(()=>window.dataLayer.filter(x=>x[0]==='event'));
try {
 for(const locale of ['en','fr']) {
  await context.clearCookies();await page.goto(origin+pathFor('quote',locale));await page.evaluate(()=>localStorage.clear());
  await page.goto(origin+pathFor('quote',locale)+'?email=secret@example.invalid&source=/private-secret/');
  assert.equal(await page.locator('[data-analytics-consent]').isVisible(),true);assert.equal(outside.length,0);
  await page.locator('[data-consent-choice="denied"]').click();
  await page.locator('#common-contact').fill('Private test name');assert.equal((await events()).length,0);
  await page.locator('[data-analytics-preferences]').click();await page.locator('[data-consent-choice="granted"]').click();
  await page.waitForFunction(()=>window.dataLayer.some(x=>x[0]==='event'&&x[1]==='page_view'));
  await page.locator('#common-email').fill('secret@example.invalid');
  await page.locator('#common-location').fill('Secret location');
  await page.locator('#equipment-quantity').fill('secret quantity');await page.locator('#equipment-application').selectOption('marine');
  await page.locator('[name="privacyAcknowledgement"]').check();await page.locator('[data-review]').click();
  await page.locator('[data-send]').click();await page.waitForFunction(()=>!document.querySelector('[data-send]').disabled);
  assert.equal((await events()).filter(x=>x[1]==='generate_lead').length,0);
  fail=false;await page.locator('[data-send]').dblclick();await page.locator('[data-enquiry-complete]').waitFor({state:'visible'});
  const collected=await events();assert.equal(collected.filter(x=>x[1]==='form_start').length,1);assert.equal(collected.filter(x=>x[1]==='generate_lead').length,1);
  assert.doesNotMatch(JSON.stringify(collected),/secret|Private test|@|submissionId/);
  assert.equal(collected.find(x=>x[1]==='generate_lead')[2].enquiry_type,'equipment');
  assert.equal(collected.find(x=>x[1]==='generate_lead')[2].source_page,pathFor('quote',locale));
  await page.evaluate(()=>document.cookie='_ga=mock; path=/');
  await page.locator('[data-analytics-preferences]').click();await page.locator('[data-consent-choice="denied"]').click();
  assert.equal(await page.evaluate(()=>document.cookie.includes('_ga=')),false);
  const before=(await events()).length;await page.evaluate(()=>window.eebdAnalytics.accepted('equipment','fake'));assert.equal((await events()).length,before);
  outside.length=0;fail=true;
 }
 for(const locale of ['en','fr'])for(const width of [320,390,700,768]) {
  await page.setViewportSize({width,height:844});await page.goto(origin+pathFor('comparison',locale));
  assert.equal(await page.locator('[data-mobile-enquiry]').isVisible(),false);
  await page.evaluate(()=>scrollTo(0,document.querySelector('.page-hero').getBoundingClientRect().bottom+100));await page.waitForTimeout(100);
  assert.equal(await page.locator('[data-mobile-enquiry]').isVisible(),width<=700);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true);
  if(width<=700){
   assert.equal(new URL(await page.locator('[data-mobile-enquiry] a').getAttribute('href'),origin).searchParams.get('source'),pathFor('comparison',locale));
   await page.locator('.menu-toggle').click();await page.waitForFunction(()=>document.querySelector('[data-mobile-enquiry]').hidden);assert.equal(await page.locator('[data-mobile-enquiry]').isVisible(),false);await page.keyboard.press('Escape');
   await page.locator('[data-analytics-preferences]').click();await page.waitForFunction(()=>document.querySelector('[data-mobile-enquiry]').hidden);assert.equal(await page.locator('[data-mobile-enquiry]').isVisible(),false);await page.locator('[data-consent-choice="denied"]').click();
   await page.evaluate(()=>scrollTo(0,document.querySelector('.page-hero').getBoundingClientRect().bottom+scrollY+100));await page.waitForTimeout(100);
   if(locale==='en'&&width===390)await page.screenshot({path:'test-results/mobile-quote-en.png'});
  }
  await page.locator('.site-footer').scrollIntoViewIfNeeded();await page.waitForFunction(()=>document.querySelector('[data-mobile-enquiry]').hidden);assert.equal(await page.locator('[data-mobile-enquiry]').isVisible(),false);
 }
 await page.setViewportSize({width:390,height:844});await page.goto(origin+pathFor('comparison','en'));await page.locator('[data-analytics-preferences]').click();await page.locator('[data-consent-choice="granted"]').click();
 await page.evaluate(()=>scrollTo(0,document.querySelector('.page-hero').getBoundingClientRect().bottom+scrollY+100));await page.waitForTimeout(100);
 // Prevent navigation only in this fixture so the click event can be inspected.
 await page.locator('[data-mobile-enquiry] a').evaluate(a=>a.addEventListener('click',e=>e.preventDefault()));await page.locator('[data-mobile-enquiry] a').click();
 assert.equal((await events()).find(x=>x[1]==='quote_click')[2].cta_location,'mobile_bar');
 await page.goto(origin+'/homepage-options/1/en/');assert.equal(await page.locator('script[src*="analytics.js"]').count(),0);
 assert.deepEqual(errors,[]);assert.equal(posts,4,'Only two failed and two accepted mocked submissions');
 const report={passed:true,locales:2,responsiveStickyCases:8,mockedFormspreeRequests:posts,realFormspreeRequests:0,pageErrors:errors};
 await writeFile('test-results/analytics-check.json',JSON.stringify(report,null,2));console.log(report);
}finally{await browser.close();server.closeAllConnections();await new Promise(r=>server.close(r));}
