import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { previewServer } from './server.mjs';
import { pathFor } from '../src/routes.mjs';
import { comparisonRows } from '../src/procurement.mjs';
import { escapeRows } from '../src/escape-comparison.mjs';
import { models } from '../src/models.mjs';

// Run after production-check.mjs, or against the public host with EEBD_LIVE_URL.
const liveOrigin=process.env.EEBD_LIVE_URL;
let server;
if(!liveOrigin) {
  server=previewServer(resolve('test-results/whc-production/web-root'));
  await new Promise(done=>server.listen(0,'127.0.0.1',done));
}
const origin=liveOrigin || `http://127.0.0.1:${server.address().port}`;
const {chromium}=await import(process.env.EEBD_PLAYWRIGHT_MODULE || 'playwright');
const browser=await chromium.launch({headless:true,executablePath:process.env.EEBD_CHROME_EXECUTABLE});
const page=await browser.newPage({reducedMotion:'reduce'});
const results=[],errors=[];
page.on('pageerror',e=>errors.push(e.message));
try {
  for(const width of [320,390,768,900,901,1440])for(const locale of ['en','fr']) {
    await page.setViewportSize({width,height:844});
    for(const id of ['comparison','eebdScba']) {
      await page.goto(origin+pathFor(id,locale));
      if(width<=700) {
        const bar=await page.locator('.utility').evaluate(el=>{
          const text=el.querySelector(':scope>span'),right=el.querySelector('.utility-right');
          return {textHeight:text.getBoundingClientRect().height,lineHeight:parseFloat(getComputedStyle(text).lineHeight),textRight:text.getBoundingClientRect().right,linksLeft:right.getBoundingClientRect().left};
        });
        assert.ok(bar.textHeight<=bar.lineHeight+1,'Utility tagline must stay on one line');
        assert.ok(bar.textRight+4<=bar.linksLeft,'Utility text and links must not overlap');
      }
      assert.equal(await page.locator('.comparison-cards').isVisible(),width<=900);
      assert.equal(await page.locator('.comparison-desktop').isVisible(),width>900);
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
      if(width<=900) {
        if(id==='comparison')for(const [index,model] of models.entries()) {
          const card=page.locator('.comparison-card').nth(index);
          assert.deepEqual(await card.locator('dd').allTextContents(),comparisonRows.map(row=>row.values[model.id][locale]));
          const target=new URL(await card.locator('.button').getAttribute('href'),origin);
          assert.equal(target.pathname,pathFor('quote',locale));
          assert.equal(target.searchParams.get('source'),pathFor(model.id,locale));
        }
        if(id==='eebdScba')for(const [index,row] of escapeRows.entries()) {
          assert.deepEqual(await page.locator('.comparison-card').nth(index).locator('dd').allTextContents(),row[locale].slice(1));
        }
      }
      await page.locator('.comparison-jump').click();
      const target=await page.locator('.comparison-jump').getAttribute('href');
      assert.equal(new URL(page.url()).hash,target);
      if(width===390 || width===1440)await page.screenshot({path:`test-results/mobile-ux-${liveOrigin?'live-':''}${id}-${locale}-${width}.png`});
      results.push({width,locale,page:id,layout:width<=900?'cards':'table'});
    }
    await page.goto(origin+pathFor('quote',locale));
    assert.equal(await page.locator('[required]:visible').count(),6);
    assert.equal(await page.locator('[data-optional-details]').getAttribute('open'),null);
    const firstFieldY=await page.locator('#common-contact').evaluate(el=>el.getBoundingClientRect().top+scrollY);
    if(width===390)assert.ok(firstFieldY<800,`First field must appear earlier on mobile: ${firstFieldY}`);
    if(width<=700) {
      const pictureY=await page.locator('.enquiry-photo').evaluate(el=>el.getBoundingClientRect().top+scrollY);
      const enquiryEnd=await page.locator('.enquiry').evaluate(el=>el.getBoundingClientRect().bottom+scrollY);
      assert.ok(pictureY>=enquiryEnd,'Mobile photo follows the complete form');
    }
    await page.locator('[data-optional-details] summary').focus();
    await page.keyboard.press('Enter');
    assert.equal(await page.locator('#common-organization').isVisible(),true);
    await page.keyboard.press('Enter');
    assert.equal(await page.locator('#common-organization').isVisible(),false);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
    await page.evaluate(()=>scrollTo(0,0));
    if(width===390 || width===1440)await page.screenshot({path:`test-results/mobile-ux-${liveOrigin?'live-':''}quote-${locale}-${width}.png`});
    results.push({width,locale,page:'quote',requiredFields:6,firstFieldY});
  }
  assert.deepEqual(errors,[]);
  const report={origin,checkedAt:new Date().toISOString(),checks:results.length,errors,results};
  await writeFile(`test-results/mobile-ux-${liveOrigin?'live-':''}report.json`,JSON.stringify(report,null,2)+'\n');
  console.log({checks:results.length,errors,phoneFirstFields:results.filter(r=>r.width===390 && r.page==='quote')});
} finally {
  await browser.close();
  if(server){server.closeAllConnections();await new Promise(done=>server.close(done));}
}
