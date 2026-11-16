<?php
declare(strict_types=1);
$testRoot=getenv('EEBD_TEST_ROOT') ?: '/eebd';
require $testRoot.'/app.php';
$schema=json_decode(file_get_contents($testRoot.'/schema.json'),true);
$checks=0;
function check(bool $condition,string $name):void{global $checks;if(!$condition)throw new RuntimeException($name);$checks++;}
$c=['enabled'=>true,'delivery_verified'=>true,'secret'=>str_repeat('test-only-',8),'origin'=>'https://eebd.ca','retention_days'=>30,'recipient'=>'recipient@example.invalid','sender'=>'sender@example.invalid'];
$db=\EEBD\database($testRoot.'/data');$now=1794790000;
$server=['REQUEST_METHOD'=>'POST','HTTP_ORIGIN'=>$c['origin'],'CONTENT_TYPE'=>'application/json','REMOTE_ADDR'=>'192.0.2.1'];
function input(string $type='equipment',string $locale='en-CA'):array{global $c,$now;return ['requestType'=>$type,'locale'=>$locale,'sourcePath'=>$locale==='en-CA'?'/en/training/':'/fr/formation/','privacyAcknowledgement'=>true,'token'=>\EEBD\token($c,$now-5),'idempotencyKey'=>sprintf('%08x-1234-4123-8123-123456789abc',random_int(1,10000000)),'fields'=>['contact'=>'Sample Buyer','organization'=>'Example Organization','email'=>'buyer@example.invalid','phone'=>'','location'=>'Ontario','timing'=>'Flexible','model'=>'Not sure','quantity'=>'8','application'=>'marine','participants'=>'12','language'=>'fr','objective'=>'Familiarization','format'=>'discuss','support'=>'identify','issue'=>'Review replacement','records'=>'','specifications'=>'','notes'=>'']];}
function callApi(array $input,array $overrides=[]):array{global $server,$c,$schema,$db,$now;return \EEBD\handle(array_merge($server,$overrides),json_encode($input),$c,$schema,$db,$now);}
check(!\EEBD\configured(require $testRoot.'/config.example.php'),'default config fails closed');
foreach(['equipment','training','service'] as $type)foreach(['en-CA','fr-CA'] as $locale){$input=input($type,$locale);$r=callApi($input,['REMOTE_ADDR'=>'192.0.2.'.($checks+1)]);check($r['status']===202,$type.' '.$locale.' acceptance');$again=callApi($input);check($again['body']['reference']===$r['body']['reference'],'idempotent replay');}
check((int)$db->query('SELECT count(*) FROM enquiries')->fetchColumn()===6,'six records only');
$input=input();$r=callApi($input);$input['fields']['quantity']='9';check(callApi($input)['status']===409,'key payload conflict');
$bad=input();$bad['fields']['contact']='';$bad['fields']['email']="x@example.ca\r\nBcc:target@example.ca";$bad['fields']['notes']=str_repeat('é',2001);$bad['privacyAcknowledgement']=false;
$r=callApi($bad);check($r['status']===422 && count($r['body']['errors'])===4,'field errors, unicode length and header injection');
$bad=input();$bad['fields']['contact']=['malicious'];check(callApi($bad)['status']===422,'non-string field');
$bad=input();$bad['requestType']=[];check(callApi($bad)['status']===422,'non-scalar request type');
$bad=input();$bad['sourcePath']='https://outside.invalid/';check(callApi($bad)['status']===422,'source whitelist');
$bad=input();$bad['productId']='unverified';check(callApi($bad)['status']===422,'unknown product');
$bad=input();$bad['website']='spam';check(callApi($bad)['status']===422,'honeypot');
$bad=input();$bad['token']=\EEBD\token($c,$now-4000);check(callApi($bad)['status']===403,'expired token');
$bad=input();$bad['token']=\EEBD\token($c,$now);check(callApi($bad)['status']===403,'too-fast token');
$bad=input();$bad['token'][12]='z';check(callApi($bad)['status']===403,'tampered signature');
check(callApi(input(),['HTTP_ORIGIN'=>'https://outside.invalid'])['status']===403,'cross-origin');
check(callApi(input(),['HTTP_ORIGIN'=>''])['status']===403,'missing origin');
check(callApi(input(),['CONTENT_TYPE'=>'text/plain'])['status']===415,'content type');
check(callApi(input(),['REQUEST_METHOD'=>'PUT'])['status']===405,'method');
check(callApi(input(),['CONTENT_LENGTH'=>32769])['status']===413,'size cap');
check(\EEBD\handle($server,'{',$c,$schema,$db,$now)['status']===400,'malformed json');
check(\EEBD\handle($server,'{}',array_merge($c,['enabled'=>false]),$schema,$db,$now)['status']===503,'disabled');
$input=input();for($i=0;$i<5;$i++)check(callApi(input(),['REMOTE_ADDR'=>'192.0.2.100'])['status']===202,'rate allowance');
check(callApi(input(),['REMOTE_ADDR'=>'192.0.2.100'])['status']===429,'rate limit');
$before=(int)$db->query('SELECT count(*) FROM enquiries')->fetchColumn();
$stats=\EEBD\processQueue($db,$c,$schema,fn()=>false,$now);check($stats['failed']===$before&&$stats['remaining']===$before,'failed mail preserves durable requests');
$stats=\EEBD\processQueue($db,$c,$schema,fn()=>true,$now+1);check($stats['acceptedByMail']===0,'backoff');
$messages=[];$stats=\EEBD\processQueue($db,$c,$schema,function($message)use(&$messages){$messages[]=$message;return true;},$now+5000);
check($stats['acceptedByMail']===$before&&$stats['remaining']===0,'retry mail accepted');
check(str_contains(implode('',array_column($messages,'body')),'Nouvelle demande'),'French notification');
check(str_contains(implode('',array_column($messages,'body')),'New enquiry'),'English notification');
check(\EEBD\processQueue($db,$c,$schema,fn()=>throw new RuntimeException('should not send'),$now+10000)['acceptedByMail']===0,'accepted notifications not resent');
check((int)$db->query('SELECT count(*) FROM enquiries')->fetchColumn()===$before,'mail state does not erase requests');
$init=\EEBD\handle(['REQUEST_METHOD'=>'GET','REMOTE_ADDR'=>'192.0.2.200'],'',$c,$schema,$db,$now);check($init['status']===200&&isset($init['body']['token']),'init token');
// Parsing the public boundary and CLI source catches syntax errors without mail or external access.
foreach(['enquiries.php','worker.php','config.example.php'] as $file){token_get_all(file_get_contents($testRoot.'/'.$file),TOKEN_PARSE);$checks++;}
echo json_encode(['ok'=>true,'php'=>PHP_VERSION,'checks'=>$checks,'delivery'=>'Fake transport only; no real email sent.','limitations'=>'WASM logic/SQLite tests; WHC PHP, filesystem durability, cron, concurrency and mail delivery still require host verification.']);
