// Optional QA tooling; no browser package is shipped to website visitors.
// EEBD_PLAYWRIGHT_MODULE may point to an already installed Playwright index.mjs.
import { mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { routes } from '../src/routes.mjs';
const {chromium}=await import(process.env.EEBD_PLAYWRIGHT_MODULE || 'playwright');
const browser=await chromium.launch({headless:true,...(process.env.EEBD_CHROME_EXECUTABLE?{executablePath:process.env.EEBD_CHROME_EXECUTABLE}:{})});
const origin=process.env.EEBD_PREVIEW_URL || 'http://127.0.0.1:4173';
const page=await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1});
const errors=[],failures=[];
page.on('pageerror',e=>errors.push(e.message));
page.on('response',r=>{if(r.status()>=400&&!r.url().includes('not-a-page')) failures.push(`${r.status()} ${r.url()}`);});
let responsiveChecks=0;
await mkdir('test-results',{recursive:true});
try {
  for(const width of [320,390,768,1440]) {
    await page.setViewportSize({width,height:1000});
    for(const route of routes) for(const locale of ['en','fr']) {
      const response=await page.goto(origin+route.paths[locale],{waitUntil:'load'});
      assert.equal(response.status(),200);
      const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
      assert.equal(overflow,false,`Overflow at ${width}: ${route.paths[locale]}`);
      assert.equal(await page.locator('h1').count(),1);
      assert.equal(await page.locator('html').getAttribute('lang'),`${locale}-CA`);
      responsiveChecks++;
    }
  }
  for(const width of [390,1440]) {
    await page.setViewportSize({width,height:1000});
    await page.goto(origin+'/brand-concepts/',{waitUntil:'networkidle'});
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,`Brand overflow ${width}`);
    assert.equal(await page.locator('iframe').count(),10);
    await page.screenshot({path:`test-results/brand-review-${width}.png`,fullPage:false});
    for(let concept=6;concept<=10;concept++) {
      await page.goto(`${origin}/en/?concept=${concept}`,{waitUntil:'load'});
      assert.equal(await page.locator('html').getAttribute('data-concept'),String(concept));
      assert.equal(await page.locator('.brand-logo').getAttribute('src'),`/assets/brand/concept-${concept}-light.svg`);
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,`Concept ${concept} overflow ${width}`);
    }
  }
  for(const locale of ['en','fr']) for(const type of ['equipment','training','service']) {
    const quote=routes.find(r=>r.id==='quote').paths[locale],source=routes.find(r=>r.id==='training').paths[locale];
    await page.goto(`${origin}${quote}?type=${type}&source=${encodeURIComponent(source)}`,{waitUntil:'load'});
    assert.equal(await page.locator(`[data-request-type="${type}"]`).isVisible(),true);
    assert.equal(await page.locator('[data-request-type]:not([hidden])').count(),1);
    assert.equal(await page.locator('[data-enquiry] button').isDisabled(),true);
    assert.equal(await page.locator('form').count(),0);
    const other=locale==='en'?'fr':'en';
    const href=await page.locator(`.language-switch a[lang="${other}-CA"]`).getAttribute('href');
    assert.ok(href.includes(`type=${type}`));
    assert.equal(new URL(href,origin).searchParams.get('source'),routes.find(r=>r.id==='training').paths[other]);
    await page.locator('#common-contact').fill('Sample Buyer');
    await page.locator('input[name="requestType"][value="training"]').check();
    assert.equal(await page.locator('#common-contact').inputValue(),'Sample Buyer');
    assert.equal(await page.locator('[data-request-type="training"]').isVisible(),true);
    assert.equal(await page.evaluate(()=>localStorage.length+sessionStorage.length),0);
  }
  await page.setViewportSize({width:390,height:844});
  await page.goto(origin+'/fr/',{waitUntil:'load'});
  const toggle=page.locator('.menu-toggle');
  await toggle.click();assert.equal(await toggle.getAttribute('aria-expanded'),'true');
  await page.locator('#main-navigation a').first().focus();
  await page.keyboard.press('Escape');
  assert.equal(await toggle.getAttribute('aria-expanded'),'false');
  assert.equal(await page.evaluate(()=>document.activeElement.className),'menu-toggle');
  await page.screenshot({path:'test-results/home-fr-mobile.png',fullPage:true});
  await page.setViewportSize({width:1440,height:1000});
  await page.goto(origin+'/en/',{waitUntil:'load'});
  await page.screenshot({path:'test-results/home-desktop.png',fullPage:true});
  const navigation=await page.evaluate(()=>{
    const n=performance.getEntriesByType('navigation')[0];
    return {domContentLoadedMs:Math.round(n.domContentLoadedEventEnd),loadMs:Math.round(n.loadEventEnd),transferBytes:n.transferSize};
  });
  const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
  const nojsPage=await nojs.newPage();
  await nojsPage.goto(origin+'/fr/demander-une-soumission/');
  assert.equal(await nojsPage.locator('[data-request-type]').count(),3);
  assert.equal(await nojsPage.locator('form').count(),0);
  assert.equal(await nojsPage.locator('[data-enquiry] button').isDisabled(),true);
  await nojs.close();
  assert.deepEqual(errors,[]);assert.deepEqual(failures,[]);
  const report={browser:await browser.version(),responsiveChecks,widths:[320,390,768,1440],locales:['en-CA','fr-CA'],enquiryBranches:6,conceptApplications:10,menuEscapeFocus:'PASS',noJavaScript:'PASS',pageErrors:errors,failedResources:failures,navigation,limitations:'Chromium only; local unthrottled timing, not a Core Web Vitals or accessibility certification. Forms inactive; no delivery tests.'};
  await writeFile('test-results/browser-report.json',JSON.stringify(report,null,2));
  console.log(JSON.stringify(report,null,2));
} finally {await browser.close();}
