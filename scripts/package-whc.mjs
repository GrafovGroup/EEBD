import { mkdir, cp, writeFile, rm, readdir, readFile } from 'node:fs/promises';
import { resolve, relative } from 'node:path';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { build } from './build.mjs';
import { fieldDefinitions,commonFields,specificFields,requestTypes } from '../src/enquiry.mjs';
import { routes } from '../src/routes.mjs';
export const enquirySchema={fieldDefinitions,commonFields,specificFields,requestTypes,allowedPaths:routes.flatMap(r=>Object.values(r.paths))};
export async function packageWhc({production=false}={}) {
  const folder=resolve('test-results',production?'whc-production':'whc-preview'),web=resolve(folder,'web-root'),privateDir=resolve(folder,'eebd-private');
  await build({mode:production?'production':'preview',outDir:web});
  await mkdir(privateDir,{recursive:true});await mkdir(resolve(privateDir,'data'),{recursive:true,mode:0o700});
  for(const name of ['app.php','config.example.php','worker.php'])await cp(resolve('server/whc',name),resolve(privateDir,name));
  await writeFile(resolve(privateDir,'schema.json'),JSON.stringify(enquirySchema,null,2));
  await mkdir(resolve(web,'api'),{recursive:true});await cp('server/whc/enquiries.php',resolve(web,'api/enquiries.php'));
  await rm(resolve(web,'_headers'));await rm(resolve(web,'_redirects'));
  // cPanel Apache/LiteSpeed candidate. Actual account capability still requires verification.
  const htaccess=`Options -Indexes\nDirectoryIndex index.html\n${production?'':'# Private staging: replace this gate only with verified authenticated access.\nRequire all denied\n'}<IfModule mod_headers.c>\nHeader always set X-Content-Type-Options "nosniff"\nHeader always set Referrer-Policy "strict-origin-when-cross-origin"\nHeader always set Content-Security-Policy "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self'; connect-src 'self'; frame-src 'self'; frame-ancestors 'self'; form-action 'none'; base-uri 'self'; object-src 'none'"\n${production?'':'Header always set X-Robots-Tag "noindex, nofollow"\n'}</IfModule>\n<FilesMatch "^(\\.|config|schema|worker|app\\.php)|\\.(sqlite|log|json)$">\nRequire all denied\n</FilesMatch>\nRewriteEngine On\n${production?'RewriteCond %{HTTPS} !=on [OR]\nRewriteCond %{HTTP_HOST} !^eebd\\.ca$ [NC]\nRewriteRule ^ https://eebd.ca%{REQUEST_URI} [R=308,L,NE]\n':''}RewriteRule ^$ /en/ [R=302,L]\nRewriteRule ^(?:en|fr)/404/(?:index\\.html)?$ - [R=404,L]\nErrorDocument 404 /404.html\n<If "%{REQUEST_URI} =~ m#^/fr(?:/|$)#">\nErrorDocument 404 /fr/404/index.html\n</If>\n# Configure the absolute private directory OUTSIDE ALL public roots on the host:\n# SetEnv EEBD_PRIVATE_DIR /home/ACCOUNT/eebd-private\n`;
  await writeFile(resolve(web,'.htaccess'),htaccess);
  await writeFile(resolve(privateDir,'.htaccess'),'Require all denied\n');
  await writeFile(resolve(folder,'INSTALL.txt'),`EEBD.ca — ${production?'production candidate':'private preview package'}\n\nDo not extract the entire archive into public_html.\nweb-root/ contains public files only.\neebd-private/ belongs OUTSIDE ALL public document roots, with directory mode 0700 and files 0600.\nRead DEPLOYMENT.md in the source repository before connecting the host.\nPreview web-root/.htaccess denies ALL access until authenticated staging is configured.\nThe endpoint is disabled by default. No live mailbox or WHC runtime has been verified by this package.\nNode is needed to build locally only; the candidate endpoint requires PHP 8.3+, PDO SQLite, mbstring, cron and working mail transport.\n`);
  const files=[];
  async function walk(dir){for(const e of await readdir(dir,{withFileTypes:true})){const p=resolve(dir,e.name);if(e.isDirectory())await walk(p);else if(e.name!=='manifest.json')files.push({path:relative(folder,p),sha256:createHash('sha256').update(await readFile(p)).digest('hex')});}}
  await walk(folder);
  let sourceCommit='uncommitted';try{sourceCommit=execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim();}catch{}
  const sourceDirty=execFileSync('git',['status','--porcelain'],{encoding:'utf8'}).trim().length>0;
  await writeFile(resolve(folder,'manifest.json'),JSON.stringify({mode:production?'production-candidate':'private-preview',sourceCommit,sourceDirty,files},null,2));
  return {folder,fileCount:files.length,production};
}
if(process.argv[1] && resolve(process.argv[1])===fileURLToPath(import.meta.url))console.log(await packageWhc({production:process.argv.includes('--production')}));
