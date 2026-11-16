import assert from 'node:assert/strict';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { routes } from '../src/routes.mjs';
import { imageFor, imagePath, imageDescriptions } from '../src/images.mjs';
import { renderPage, renderHomeOption } from '../src/render.mjs';

const owners=new Map(), hashes=new Map(), pages=[];
const provenanceCopy=/AI[- ]generated|generated (?:image|for EEBD)|générée? (?:par IA|pour EEBD)|conceptuell?e?|conceptual/i;
for(const route of routes) {
  const asset=imagePath(route.id), bytes=await readFile('public'+asset);
  const hash=createHash('sha256').update(bytes).digest('hex');
  assert.equal(owners.has(asset),false,`Photo reused by ${route.id} and ${owners.get(asset)}`);
  assert.equal(hashes.has(hash),false,`Duplicate photo bytes for ${route.id} and ${hashes.get(hash)}`);
  owners.set(asset,route.id);hashes.set(hash,route.id);
  if(imageFor(route.id)!=='ocenco-m202-niosh')await readFile('public'+asset.replace('.webp','-small.webp'));
  for(const locale of ['en','fr']) {
    const html=renderPage(route.id,locale,'production');
    assert.doesNotMatch(html,provenanceCopy);
    assert.ok(imageDescriptions[imageFor(route.id)][locale].length>15);
    const main=html.split('<main id="main">')[1].split('</main>')[0];
    const photographs=[...main.matchAll(/<img[^>]*src="(\/assets\/images\/[^"?]+)/g)].map(m=>m[1]);
    assert.deepEqual(photographs,[asset],`Unexpected or repeated photography on ${route.paths[locale]}`);
  }
  pages.push({id:route.id,paths:route.paths,asset,sha256:hash,bytes:bytes.length});
}
for(const id of [1,2,3,4])for(const locale of ['en','fr']) {
  const html=renderHomeOption(id,locale);
  assert.match(html,/<meta name="robots" content="noindex, nofollow">/);
  assert.doesNotMatch(html,provenanceCopy);
}
await mkdir('test-results',{recursive:true});
const report={bilingualPagePairs:routes.length,uniquePhotographs:owners.size,duplicatePhotographs:0,publicPages:routes.length*2,homepageAlternatives:4,pages};
await writeFile('test-results/image-audit.json',JSON.stringify(report,null,2)+'\n');
console.log({...report,pages:undefined});
