import { mkdir, writeFile } from 'node:fs/promises';
import { concepts, logoSvg, boardSvg } from '../src/brand.mjs';
export async function writeBrandAssets() {
  await mkdir('public/assets/brand', { recursive: true });
  await mkdir('design', { recursive: true });
  for (const c of concepts) {
    for (const mode of ['light', 'dark', 'mono']) {
      await writeFile(`public/assets/brand/concept-${c.id}-${mode}.svg`, logoSvg(c.id,mode));
      await writeFile(`public/assets/brand/concept-${c.id}-${mode}-fr.svg`, logoSvg(c.id,mode,false,'fr'));
    }
    await writeFile(`public/assets/brand/concept-${c.id}-compact.svg`, logoSvg(c.id,'light',true));
  }
  await writeFile('design/brand-board.svg', boardSvg());
  await writeFile('design/brand-board-round-one.svg', boardSvg(1));
}
if (process.argv[1]?.endsWith('brand-assets.mjs')) await writeBrandAssets();
