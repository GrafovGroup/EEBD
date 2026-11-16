// Local fixtures or live-host UI checks; provider requests are always intercepted.
import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import { writeFile } from 'node:fs/promises';
import { build } from './build.mjs';
import { previewServer } from './server.mjs';
import { renderPage } from '../src/render.mjs';
import { pathFor } from '../src/routes.mjs';
import { contentSecurityPolicy } from '../src/security.mjs';
import { FORMSPREE_ENDPOINT } from '../public/assets/formspree.js';
const {chromium}=await import(process.env.EEBD_PLAYWRIGHT_MODULE || 'playwright');
const directory=resolve('test-results/formspree-browser-build');
const liveOrigin=process.env.EEBD_LIVE_URL ? new URL(process.env.EEBD_LIVE_URL).origin : null;
let server;
if(!liveOrigin) {
  await build({outDir:directory});
  server=previewServer(directory);
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
}
const origin=liveOrigin || `http://127.0.0.1:${server.address().port}`;
const browser=await chromium.launch({headless:true,executablePath:process.env.EEBD_CHROME_EXECUTABLE});
const context=await browser.newContext({viewport:{width:390,height:844}});
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
async function prepare(locale,type) {
  calls=[];
  await page.goto(origin+pathFor(type==='general'?'contact':'quote',locale)+'?type='+type+'&source='+encodeURIComponent(pathFor('training',locale)));
  await page.locator('[data-review]').click();
  assert.equal(await page.locator('[data-errors]').isVisible(),true);
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
  for(const locale of ['en','fr'])for(const type of ['equipment','training','service','general']) {
    scenario='success';await prepare(locale,type);await page.locator('[data-send]').click();
    await page.locator('[data-enquiry-complete]').waitFor({state:'visible'});
    assert.equal(calls.length,1);const sent=calls[0];
    assert.equal(sent.email,'buyer@example.invalid');assert.equal(sent.name,'Synthetic Buyer');assert.equal(sent.requestType,type);assert.equal(sent.locale,locale+'-CA');
    assert.equal(sent.sourcePath,pathFor('training',locale));assert.equal(sent._gotcha,'');assert.equal(sent.optionalMarketingConsent,false);
    assert.ok(sent.message.includes('<script>literal model name</script>'));
    assert.match(sent.submissionId,/^[a-f0-9-]{36}$/);
    if(type!=='training')assert.equal(sent.participants,undefined);
    if(type!=='service')assert.equal(sent.issue,undefined);
    assert.equal(await page.locator('#common-email').inputValue(),'');
    assert.equal(await page.evaluate(()=>document.activeElement.hasAttribute('data-complete-heading')),true);
    assert.equal(await page.evaluate(()=>localStorage.length+sessionStorage.length),0);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
    if(type==='equipment')await page.screenshot({path:`test-results/formspree-${liveOrigin?'live-':''}confirmation-${locale}.png`,fullPage:true});
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
  scenario='slow';await prepare('en','service');
  await page.locator('[data-send]').evaluate(button=>{button.click();button.click();});
  await page.locator('[data-enquiry-complete]').waitFor({state:'visible'});assert.equal(calls.length,1,'Double click must not send twice');
  assert.deepEqual(unexpected,[]);assert.deepEqual(pageErrors,[]);
  const report={origin,checkedAt:new Date().toISOString(),browser:await browser.version(),successJourneys:8,failureJourneys:6,doubleClick:'PASS',externalRequests:0,realSubmissions:0,limits:'Provider responses are intercepted. This suite does not verify account settings or inbox delivery; those require separate evidence.'};
  await writeFile(`test-results/formspree-${liveOrigin?'live-':''}browser-report.json`,JSON.stringify(report,null,2)+'\n');console.log(report);
} finally {
  await browser.close();
  if(server) {server.closeAllConnections();await new Promise(resolve=>server.close(resolve));}
}
