import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.ico':'image/x-icon','.webmanifest':'application/manifest+json','.xml':'application/xml','.txt':'text/plain; charset=utf-8'};
export function previewServer(directory=resolve('dist')) {
  return createServer(async(req,res)=>{
    res.setHeader('X-Content-Type-Options','nosniff');
    res.setHeader('X-Robots-Tag','noindex, nofollow');
    res.setHeader('Referrer-Policy','strict-origin-when-cross-origin');
    res.setHeader('Cache-Control','no-store');
    res.setHeader('Content-Security-Policy',"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self'; connect-src 'none'; frame-src 'self'; frame-ancestors 'self'; form-action 'none'; base-uri 'self'; object-src 'none'");
    let path;
    try {path=decodeURIComponent(new URL(req.url,'http://localhost').pathname);} catch {res.writeHead(400);res.end('Bad request');return;}
    if (path.startsWith('/api/')) {res.writeHead(503,{'Content-Type':'application/json'});res.end(JSON.stringify({accepted:false,error:'ENQUIRIES_NOT_CONFIGURED'}));return;}
    if (!['GET','HEAD'].includes(req.method)) {res.writeHead(405,{'Allow':'GET, HEAD'});res.end();return;}
    if(path==='/') {res.writeHead(302,{Location:'/en/'});res.end();return;}
    const file=resolve(directory,'.'+path);
    if(!file.startsWith(directory+sep) || path.includes('\0') || path.split('/').some(s=>s.startsWith('.'))) {res.writeHead(404);res.end();return;}
    try {
      const info=await stat(file);
      if(info.isDirectory() && !path.endsWith('/')) {res.writeHead(308,{Location:path+'/'+new URL(req.url,'http://localhost').search});res.end();return;}
      const target=info.isDirectory()?resolve(file,'index.html'):file;
      // Direct localized 404 URLs must also return genuine 404 status.
      const status=/\/(?:en|fr)\/404\/$/.test(path)||path==='/404.html'?404:200;
      const body=await readFile(target);
      res.writeHead(status,{'Content-Type':mime[extname(target)]||'application/octet-stream'});
      res.end(req.method==='HEAD'?undefined:body);
    } catch {
      const locale=path==='/fr'||path.startsWith('/fr/')?'fr':'en';
      res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});
      res.end(req.method==='HEAD'?undefined:await readFile(resolve(directory,locale,'404','index.html')));
    }
  });
}
