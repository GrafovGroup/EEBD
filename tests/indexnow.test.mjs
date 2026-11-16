import test from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {searchContentHash} from '../src/indexnow.mjs';
test('IndexNow compares search content, excluding presentation-only changes',()=>{
 const html='<title>EEBD</title><meta name="description" content="Devices"><main id="main"><h1>Buy &amp; compare</h1><p>Details</p></main><footer>Version 1</footer>';
 assert.equal(searchContentHash(html),searchContentHash(html.replace('<h1>','<h1 class="large">').replace('Version 1','Version 2')));
 assert.notEqual(searchContentHash(html),searchContentHash(html.replace('Details','Revised details')));
 const actual=execFileSync('python3',['-c','import sys;sys.path.insert(0,"scripts/whc");from indexnow import content_hash;print(content_hash(sys.stdin.read()))'],{input:html,encoding:'utf8'}).trim();
 assert.equal(actual,searchContentHash(html),'WHC and Node digests must agree');
});
test('IndexNow verifies live content, retains failures for retry and avoids unchanged submissions',()=>{
 const result=execFileSync('python3',['-c',`
import sys,tempfile,json,time
from pathlib import Path
sys.path.insert(0,'scripts/whc')
from indexnow import changes,notify,content_hash,ENDPOINT
html='<title>EEBD</title><main id="main">New content</main>'
url='https://eebd.ca/en/'; key='0123456789abcdef'
m={'mode':'production-candidate','sourceDirty':False,'sourceCommit':'a'*40,'indexNow':{'key':key,'pages':{url:content_hash(html)}}}
assert changes(m['indexNow']['pages'],m['indexNow']['pages'])==[]
assert changes({url:'b'*64},{})==[url]
try:changes({}, {'https://example.org/':'a'*64});raise AssertionError('foreign host allowed')
except ValueError:pass
with tempfile.TemporaryDirectory() as d:
 state=Path(d)/'state.json'; calls=[]
 def transport(target,data=None):
  calls.append(target)
  if target.endswith('.txt'):return 200,key,{}
  if target==url:return 200,html,{}
  assert target==ENDPOINT and json.loads(data)['urlList']==[url]
  return 429,'',{'Retry-After':'120'}
 r=notify(m,{},state,transport);assert r['result']=='rate-limited'
 assert json.loads(state.read_text())['pages']=={}
 assert notify(m,{},state,transport)['result']=='deferred'
 saved=json.loads(state.read_text());saved['retryAfter']=0;state.write_text(json.dumps(saved))
 def accepted(target,data=None):
  if data:return 200,'',{}
  return transport(target)
 assert notify(m,{},state,accepted)['result']=='received'
 assert notify(m,{},state,accepted)['result']=='unchanged'
 m['sourceDirty']=True
 try:notify(m,{},state,accepted);raise AssertionError('dirty release allowed')
 except ValueError:pass
print('passed')
`],{encoding:'utf8'}).trim();assert.equal(result,'passed');
});
