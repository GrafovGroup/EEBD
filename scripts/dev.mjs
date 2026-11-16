import { watch } from 'node:fs';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { previewServer } from './server.mjs';
const execute=promisify(execFile);
// Each build runs in a fresh process so edited ES modules are reloaded.
const build=()=>execute(process.execPath,['scripts/build.mjs']);
await build();
const port=Number(process.env.PORT || 4173);
const server=previewServer();
server.listen(port,'127.0.0.1',()=>console.log(`EEBD.ca preview: http://127.0.0.1:${port}/brand-concepts/`));
let timer,building=false,again=false;
async function rebuild() {
  if(building){again=true;return;}
  building=true;
  try {await build(); console.log('Preview rebuilt. Refresh the browser to see changes.');}
  catch(error){console.error(error.message);}
  finally {building=false;if(again){again=false;await rebuild();}}
}
const watchers=['src','public'].map(dir=>watch(dir,{recursive:true},()=>{clearTimeout(timer);timer=setTimeout(rebuild,100);}));
function stop(){watchers.forEach(w=>w.close());server.close(()=>process.exit(0));}
process.on('SIGINT',stop);process.on('SIGTERM',stop);
