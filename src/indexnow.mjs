import {createHash} from 'node:crypto';
// Public ownership-verification token, not an account or API credential.
export const indexNowKey='6b6ae553a07db67ec24e26004438cbc0';
export function searchContentHash(html) {
  const title=html.match(/<title>([\s\S]*?)<\/title>/)?.[1] || '';
  const description=html.match(/<meta name="description" content="([^"]*)"/)?.[1] || '';
  const main=html.match(/<main id="main">([\s\S]*?)<\/main>/)?.[1] || '';
  // Asset versions, analytics, navigation and fixed controls are not content changes.
  const text=main.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,'').replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim();
  return createHash('sha256').update(JSON.stringify({title,description,text})).digest('hex');
}
