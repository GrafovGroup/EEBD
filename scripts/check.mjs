import { readdir, readFile, stat } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import assert from 'node:assert/strict';
import { build } from './build.mjs';
const root=resolve('test-results/check-build');
await build({outDir:root});
async function walk(dir) {
  const entries=await readdir(dir,{withFileTypes:true});
  return (await Promise.all(entries.map(e=>e.isDirectory()?walk(resolve(dir,e.name)):resolve(dir,e.name)))).flat();
}
const files=await walk(root),htmlFiles=files.filter(f=>f.endsWith('.html'));
let references=0;
for(const file of htmlFiles) {
  const html=await readFile(file,'utf8');
  const ids=[...html.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(new Set(ids).size,ids.length,`Duplicate id: ${file}`);
  assert.match(html,/<meta name="robots" content="noindex/);
  assert.equal(/supplier verification pending|APPROVED_SUPPLIERS|contractingEntity/.test(html),false,`Private data: ${file}`);
  for(const match of html.matchAll(/<(?:a|link|script|img|iframe)\b[^>]*\b(?:href|src)="([^"]+)"/g)) {
    const href=match[1].replace(/&amp;/g,'&');
    if (/^(https?:|mailto:|tel:)/.test(href)) continue;
    if (href.startsWith('#')) {assert.ok(ids.includes(href.slice(1)),`Missing anchor ${href}: ${file}`);continue;}
    const clean=href.split(/[?#]/)[0];
    const target=clean.startsWith('/')?resolve(root,'.'+clean):resolve(dirname(file),clean);
    let info;
    try {info=await stat(target);} catch {throw new Error(`Broken asset/link ${href}: ${file}`);}
    if (info.isDirectory()) await stat(resolve(target,'index.html'));
    references++;
  }
  for(const image of html.matchAll(/<img\b[^>]*>/g)) assert.match(image[0],/\balt="/);
  for(const label of html.matchAll(/<label\b[^>]*\bfor="([^"]+)"/g)) assert.ok(ids.includes(label[1]),`Missing field ${label[1]}`);
}
assert.equal((await readFile(resolve(root,'sitemap.xml'),'utf8')).includes('<url>'),false);
assert.equal(files.some(f=>/config\.mjs|catalogue\.mjs|\.env|PROJECT_STATUS/.test(f)),false);
console.log(`PASS: ${htmlFiles.length} HTML documents, ${references} internal links/assets, labels/IDs, noindex and preview publication boundaries.`);
