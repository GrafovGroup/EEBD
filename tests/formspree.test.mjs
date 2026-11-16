import test from 'node:test';
import assert from 'node:assert/strict';
import { FORMSPREE_ENDPOINT,submitEnquiry } from '../public/assets/formspree.js';
import { contentSecurityPolicy } from '../src/security.mjs';
import { renderPage } from '../src/render.mjs';
import { packageWhc } from '../scripts/package-whc.mjs';
import { readFile,access } from 'node:fs/promises';

test('AJAX sends JSON to the owner-provided endpoint without credentials or following redirects',async()=>{
  let calls=0;
  const payload={email:'buyer@example.invalid',message:'Synthetic test',_gotcha:''};
  const result=await submitEnquiry(payload,{fetchImpl:async(url,options)=>{
    calls++;assert.equal(url,'https://formspree.io/f/xrpqpylv');assert.equal(url,FORMSPREE_ENDPOINT);
    assert.equal(options.method,'POST');assert.equal(options.credentials,'omit');assert.equal(options.redirect,'error');
    assert.equal(options.headers.Accept,'application/json');assert.deepEqual(JSON.parse(options.body),payload);
    return new Response(JSON.stringify({next:'/thanks'}),{status:200});
  }});
  assert.deepEqual(result,{kind:'accepted'});assert.equal(calls,1);
});
test('only a successful provider response produces confirmation',async()=>{
  for(const [status,body,kind] of [[200,{next:'/thanks'},'accepted'],[200,{ok:false,next:'/thanks'},'unconfirmed'],[200,{},'unconfirmed'],[200,{errors:[{message:'Failed'}],next:'/thanks'},'unconfirmed'],[500,{next:'/thanks'},'unconfirmed'],[429,'Busy','rate-limit'],[403,{errors:[{code:'RECAPTCHA_ERROR'}]},'verification'],[422,{errors:[{field:'email'}]},'invalid']]) {
    const result=await submitEnquiry({},{fetchImpl:async()=>new Response(JSON.stringify(body),{status})});
    assert.equal(result.kind,kind,`${status} ${JSON.stringify(body)}`);
    if(kind==='invalid')assert.deepEqual(result.fields,['email']);
  }
});
test('timeouts, network failures and malformed responses retain an uncertain result without automatic retries',async()=>{
  for(const fetchImpl of [async()=>{throw new DOMException('Timed out','TimeoutError');},async()=>new Response('<html>Error</html>',{status:200})]) {
    let calls=0;assert.deepEqual(await submitEnquiry({},{fetchImpl:async(...args)=>{calls++;return fetchImpl(...args);}}),{kind:'unconfirmed'});assert.equal(calls,1);
  }
});
test('preview remains unable to send; production rendering names Formspree and has no PHP acceptance reference',()=>{
  for(const locale of ['en','fr']) {
    assert.match(renderPage('quote',locale),/data-delivery="disabled"/);
    const live=renderPage('quote',locale,'production');
    assert.match(live,/data-delivery="enabled"/);assert.match(live,/Formspree/);
    assert.match(live,/name="_gotcha"/);assert.doesNotMatch(live,/data-reference|api\/enquiries/);
  }
  assert.match(contentSecurityPolicy('preview'),/connect-src 'none'/);
  assert.match(contentSecurityPolicy('production'),/connect-src https:\/\/formspree.io /);
});
test('WHC package ships only static files and the Formspree host policy',async()=>{
  const result=await packageWhc();
  await assert.rejects(access(result.folder+'/web-root/api/enquiries.php'));
  await assert.rejects(access(result.folder+'/eebd-private'));
  const htaccess=await readFile(result.folder+'/web-root/.htaccess','utf8');
  assert.match(htaccess,/Require all denied/);assert.match(htaccess,/connect-src 'none'/);
  assert.doesNotMatch(htaccess,/SetEnv EEBD_PRIVATE_DIR/);
  assert.match(await readFile(result.folder+'/web-root/assets/formspree.js','utf8'),/xrpqpylv/);
});
