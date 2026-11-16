import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { models } from '../src/models.mjs';
import { imagePath } from '../src/images.mjs';
import { contentSecurityPolicy } from '../src/security.mjs';
import { site, assertProductionReady } from '../src/config.mjs';
import { includedRoutes, sitemapRoutes, locales, routes } from '../src/routes.mjs';
import { renderPage, renderBrandReview, esc } from '../src/render.mjs';

export async function build({ mode='preview', outDir=resolve('dist') }={}) {
  if (!['preview','production'].includes(mode)) throw new Error('Unknown build mode');
  if (mode==='production') assertProductionReady();
  const selected=includedRoutes(mode);
  if (!selected.length) throw new Error('No eligible routes');
  const rendered=selected.flatMap(record=>locales.map(locale=>({path:record.paths[locale],html:renderPage(record.id,locale,mode)})));
  if (mode==='production') {
    const allowed=new Set(selected.flatMap(r=>Object.values(r.paths)));
    for (const page of rendered) for (const [,href] of page.html.matchAll(/href="(\/(?:en|fr)\/[^"?#]*)/g)) {
      if (!allowed.has(href)) throw new Error(`Production route links to unpublished destination: ${href} from ${page.path}`);
    }
  }
  // Refuse destructive cleanup outside the declared build folder (tests can use .test-build-*).
  if (outDir!==resolve('dist') && !outDir.startsWith(resolve('test-results')+'/')) throw new Error('Unsafe output path');
  await rm(outDir,{recursive:true,force:true});
  await mkdir(outDir,{recursive:true});
  await cp('public',outDir,{recursive:true,filter:source=>mode!=='production'||(!source.endsWith('/review.js')&&(!source.includes('concept-')||source.includes(`concept-${site.approvedConcept}-`)))});
  for(const page of rendered) {
    const directory=resolve(outDir,'.'+page.path);
    await mkdir(directory,{recursive:true});
    await writeFile(resolve(directory,'index.html'),page.html);
  }
  for (const locale of locales) {
    await mkdir(resolve(outDir,locale,'404'),{recursive:true});
    await writeFile(resolve(outDir,locale,'404','index.html'),renderPage('404',locale,mode));
  }
  await writeFile(resolve(outDir,'404.html'),renderPage('404','en',mode));
  await writeFile(resolve(outDir,'index.html'),'<!doctype html><html lang="en-CA"><head><meta charset="utf-8"><meta name="robots" content="noindex"><meta name="msvalidate.01" content="'+esc(site.bingVerification)+'"><meta name="viewport" content="width=device-width, initial-scale=1"><title>EEBD.ca — English / Français</title><link rel="stylesheet" href="/assets/site.css"><link rel="icon" href="/assets/favicon.svg"></head><body><main class="wrap page-hero"><h1>EEBD.ca</h1><p>Emergency escape breathing devices / Appareils respiratoires pour l’évacuation d’urgence</p><p><a class="button" href="/en/" lang="en-CA">English</a> <a class="button" href="/fr/" lang="fr-CA">Français</a></p></main></body></html>');
  if (mode==='preview') {
    await mkdir(resolve(outDir,'brand-concepts'),{recursive:true});
    await writeFile(resolve(outDir,'brand-concepts','index.html'),renderBrandReview());
    await mkdir(resolve(outDir,'brand-concepts','round-one'),{recursive:true});
    await writeFile(resolve(outDir,'brand-concepts','round-one','index.html'),renderBrandReview(1));
    await mkdir(resolve(outDir,'brand-concepts','round-two'),{recursive:true});
    await writeFile(resolve(outDir,'brand-concepts','round-two','index.html'),renderBrandReview(2));
  }
  const pairs=Object.fromEntries(selected.flatMap(record=>locales.map(l=>[record.paths[l],record.paths])));
  const modelContext=Object.fromEntries(models.flatMap(m=>locales.map(l=>[routes.find(r=>r.id===m.id).paths[l],m.name])));
  const bulkContext=selected.filter(r=>['fleet','fleetProcurement','procurementDocs'].includes(r.id)).flatMap(r=>Object.values(r.paths));
  await writeFile(resolve(outDir,'assets','routes.js'),`window.eebdRoutePairs=${JSON.stringify(pairs)};window.eebdModelContext=${JSON.stringify(modelContext)};window.eebdBulkContext=${JSON.stringify(bulkContext)};`);
  const sitemap=mode==='production'?sitemapRoutes(selected).flatMap(r=>locales.map(l=>`<url><loc>${esc(site.origin+r.paths[l])}</loc>${locales.map(alt=>`<xhtml:link rel="alternate" hreflang="${alt}-CA" href="${esc(site.origin+r.paths[alt])}"/>`).join('')}<image:image><image:loc>${esc(site.origin+imagePath(r.id))}</image:loc></image:image></url>`)).join(''):'';
  await writeFile(resolve(outDir,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${sitemap}</urlset>`);
  await writeFile(resolve(outDir,'robots.txt'),`User-agent: *\nAllow: /\n${mode==='production'?`Sitemap: ${site.origin}/sitemap.xml\n`:''}`);
  // Preview is not private because of robots controls. Keep it on loopback or authenticated hosting.
  await writeFile(resolve(outDir,'_headers'),`/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  Content-Security-Policy: ${contentSecurityPolicy(mode)}\n${mode==='preview'?'  X-Robots-Tag: noindex, nofollow\n':''}`);
  await writeFile(resolve(outDir,'_redirects'),'/ /en/ 302\n');
  return { mode, pages:selected.length*2+2, outDir };
}
if (process.argv[1] && resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
  try { console.log(await build({mode:process.argv.includes('--production')?'production':'preview'})); }
  catch(error) { console.error(error.message); process.exitCode=1; }
}
