// Optional test tooling only: uses an externally installed WordPress PHP-WASM runtime.
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { enquirySchema } from './package-whc.mjs';
const base=process.env.EEBD_PHP_WASM_DIR;
if(!base)throw new Error('Set EEBD_PHP_WASM_DIR to a directory with @php-wasm/node and @php-wasm/universal (tested: 3.1.54).');
const {PHP}=await import(`${base}/@php-wasm/universal/index.js`);
const {loadNodeRuntime}=await import(`${base}/@php-wasm/node/index.js`);
const php=new PHP(await loadNodeRuntime('8.3',{emscriptenOptions:{processId:1}}));
try {
  php.mkdir('/eebd');php.mkdir('/eebd/data');
  for(const file of await readdir('server/whc'))if(file.endsWith('.php'))php.writeFile(`/eebd/${file}`,await readFile(`server/whc/${file}`));
  php.writeFile('/eebd/schema.json',JSON.stringify(enquirySchema));
  php.writeFile('/eebd/tests.php',await readFile('tests/whc.php'));
  const result=await php.run({scriptPath:'/eebd/tests.php'});
  assert.equal(result.errors,'',result.errors);assert.equal(result.exitCode,0,result.text);
  const report=JSON.parse(result.text);assert.equal(report.ok,true);console.log(JSON.stringify(report,null,2));
}finally{php.exit();}
