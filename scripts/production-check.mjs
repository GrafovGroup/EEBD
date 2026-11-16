import assert from 'node:assert/strict';
import { readFile,writeFile,readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { packageWhc } from './package-whc.mjs';
import { previewServer } from './server.mjs';
import { routes } from '../src/routes.mjs';
const result=await packageWhc({production:true}),directory=resolve(result.folder,'web-root');
const files=[];
async function walk(dir){for(const e of await readdir(dir,{withFileTypes:true})){const p=resolve(dir,e.name);if(e.isDirectory())await walk(p);else files.push(p);}}
await walk(directory);
for(const file of files.filter(p=>p.endsWith('.html'))) {
  const html=await readFile(file,'utf8');
  assert.doesNotMatch(html,/DESIGN PREVIEW|ENQUIRIES INACTIVE|APERÇU ·|Contact routing is being prepared|Phone pending verification|833\) 696/);
  assert.doesNotMatch(html,/\/brand-concepts\/|\/assets\/review\.js|type="file"/);
}
const sitemap=await readFile(resolve(directory,'sitemap.xml'),'utf8');
assert.equal((sitemap.match(/<url>/g)||[]).length,34);
assert.doesNotMatch(sitemap,/\/privacy\/|\/confidentialite\/|request-a-quote|demander-une-soumission|404|brand-concepts/);
const htaccess=await readFile(resolve(directory,'.htaccess'),'utf8');
assert.match(htaccess,/connect-src https:\/\/formspree.io/);
assert.doesNotMatch(htaccess,/X-Robots-Tag|EEBD_PRIVATE_DIR/);
assert.match(htaccess,/REDIRECT_STATUS/);
const server=previewServer(directory);
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const origin=`http://127.0.0.1:${server.address().port}`;
const {chromium}=await import(process.env.EEBD_PLAYWRIGHT_MODULE || 'playwright');
const browser=await chromium.launch({headless:true,executablePath:process.env.EEBD_CHROME_EXECUTABLE});
const page=await browser.newPage({viewport:{width:1440,height:1000}});
const errors=[],failures=[];page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)failures.push(r.status()+' '+r.url());});
let responsiveChecks=0;
try {
  for(const width of [320,390,768,1440]) {
    await page.setViewportSize({width,height:1000});
    for(const route of routes)for(const locale of ['en','fr']) {
      assert.equal((await page.goto(origin+route.paths[locale])).status(),200);
      assert.equal(await page.locator('h1').count(),1);
      assert.equal(await page.locator('html').getAttribute('lang'),locale+'-CA');
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,route.paths[locale]+' at '+width);
      assert.equal(await page.locator('meta[name="robots"]').getAttribute('content'),route.indexable?'index, follow':'noindex, nofollow');
      assert.equal(await page.locator('.preview-bar').count(),0);
      responsiveChecks++;
    }
  }
  await page.goto(origin+'/en/');await page.screenshot({path:'test-results/production-home-en.png',fullPage:true});
  await page.goto(origin+'/en/contact/');await page.screenshot({path:'test-results/production-contact-en.png',fullPage:true});
  await page.setViewportSize({width:390,height:844});await page.goto(origin+'/fr/');
  await page.locator('.menu-toggle').click();assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'true');
  await page.keyboard.press('Escape');assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'false');
  await page.screenshot({path:'test-results/production-home-fr-mobile.png',fullPage:true});
  assert.deepEqual(errors,[]);assert.deepEqual(failures,[]);
  const report={responsiveChecks,publicPages:38,indexablePages:34,browser:await browser.version(),pageErrors:errors,failedResources:failures,limitations:'Local Chromium only. Apache redirects and production response headers must be checked on WHC. No form submission sent.'};
  await writeFile('test-results/production-check.json',JSON.stringify(report,null,2)+'\n');console.log(report);
} finally {await browser.close();server.closeAllConnections();await new Promise(resolve=>server.close(resolve));}
