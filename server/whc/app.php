<?php
declare(strict_types=1);
namespace EEBD;

function configured(array $c): bool {
    return ($c['enabled'] ?? false) === true && ($c['delivery_verified'] ?? false) === true
        && is_string($c['secret'] ?? null) && strlen($c['secret']) >= 48
        && preg_match('~^https://[a-z0-9.-]+$~D', $c['origin'] ?? '') === 1
        && is_int($c['retention_days'] ?? null) && $c['retention_days'] >= 1 && $c['retention_days'] <= 365
        && filter_var($c['recipient'] ?? '', FILTER_VALIDATE_EMAIL) && filter_var($c['sender'] ?? '', FILTER_VALIDATE_EMAIL);
}
function database(string $directory): \PDO {
    if (!is_dir($directory) || !is_writable($directory)) throw new \RuntimeException('PRIVATE_STORAGE_UNAVAILABLE');
    umask(0077);
    $db=new \PDO('sqlite:'.$directory.'/enquiries.sqlite', null, null, [\PDO::ATTR_ERRMODE=>\PDO::ERRMODE_EXCEPTION]);
    $db->exec('PRAGMA busy_timeout=5000; PRAGMA journal_mode=DELETE; PRAGMA synchronous=FULL');
    $db->exec('CREATE TABLE IF NOT EXISTS enquiries (id TEXT PRIMARY KEY, request_key TEXT UNIQUE NOT NULL, digest TEXT NOT NULL, payload TEXT NOT NULL, created_at INTEGER NOT NULL, notify_status TEXT NOT NULL DEFAULT "pending", attempts INTEGER NOT NULL DEFAULT 0, next_attempt INTEGER NOT NULL DEFAULT 0, notified_at INTEGER)');
    $db->exec('CREATE TABLE IF NOT EXISTS limits (bucket TEXT PRIMARY KEY, hits INTEGER NOT NULL, expires INTEGER NOT NULL)');
    return $db;
}
function result(int $status, array $body, array $headers=[]): array {return ['status'=>$status,'body'=>$body,'headers'=>$headers];}
function rejected(int $status, string $error, array $extra=[]): array {return result($status,['accepted'=>false,'error'=>$error]+$extra);}
function limited(\PDO $db, string $key, int $maximum, int $window, int $now): bool {
    $bucket=$key.':'.intdiv($now,$window);
    $q=$db->prepare('INSERT INTO limits(bucket,hits,expires) VALUES(?,1,?) ON CONFLICT(bucket) DO UPDATE SET hits=hits+1');
    $q->execute([$bucket,$now+$window]);
    $q=$db->prepare('SELECT hits FROM limits WHERE bucket=?');$q->execute([$bucket]);
    return (int)$q->fetchColumn()>$maximum;
}
function token(array $c, int $now): string {
    $value=$now.'.'.bin2hex(random_bytes(16));return $value.'.'.hash_hmac('sha256',$value,$c['secret']);
}
function validToken(mixed $value, array $c, int $now): bool {
    if(!is_string($value)||!preg_match('/^(\d{10})\.([a-f0-9]{32})\.([a-f0-9]{64})$/D',$value,$m))return false;
    $age=$now-(int)$m[1];return $age>=2 && $age<=3600 && hash_equals(hash_hmac('sha256',$m[1].'.'.$m[2],$c['secret']),$m[3]);
}
function utf16Length(string $value): int {return strlen(mb_convert_encoding($value,'UTF-16LE','UTF-8'))/2;}
function validate(mixed $input, array $schema): array {
    if(!is_array($input)||array_is_list($input)) return ['ok'=>false,'errors'=>['request'=>'invalid']];
    $errors=[];$type=$input['requestType'] ?? null;
    if(!in_array($type,$schema['requestTypes'],true))$errors['requestType']='invalid';
    if(!in_array($input['locale']??null,['en-CA','fr-CA'],true))$errors['locale']='invalid';
    if(!in_array($input['sourcePath']??null,$schema['allowedPaths'],true))$errors['sourcePath']='invalid';
    if(($input['privacyAcknowledgement']??null)!==true)$errors['privacyAcknowledgement']='required';
    if(!empty($input['productId'])||!empty($input['variantId']))$errors['productId']='unsupported';
    $specific=is_string($type)?($schema['specificFields'][$type]??[]):[];
    $clean=[];$fields=$input['fields']??[];
    if(!is_array($fields))return ['ok'=>false,'errors'=>['request'=>'invalid']];
    foreach(array_merge($schema['commonFields'],$specific,['notes']) as $name) {
        $def=$schema['fieldDefinitions'][$name];$raw=$fields[$name]??'';
        if(!is_string($raw)){$errors[$name]='invalid';continue;}
        $value=preg_replace('/^\s+|\s+$/u','',$raw);
        if($value===null){$errors[$name]='invalid';continue;}
        if(($def['required']??false)&&$value==='')$errors[$name]='required';
        elseif(utf16Length($value)>($def['max']??80)||preg_match('/[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/',$value))$errors[$name]='invalid';
        elseif($value!==''&&isset($def['options'])&&!in_array($value,array_column($def['options'],0),true))$errors[$name]='invalid';
        elseif($name==='email'&&$value!==''&&!filter_var($value,FILTER_VALIDATE_EMAIL))$errors[$name]='invalid';
        $clean[$name]=$value;
    }
    if($errors)return ['ok'=>false,'errors'=>$errors];
    return ['ok'=>true,'value'=>['requestType'=>$type,'locale'=>$input['locale'],'sourcePath'=>$input['sourcePath'],
        'contact'=>['name'=>$clean['contact'],'email'=>$clean['email'],'phone'=>$clean['phone']],
        'organization'=>$clean['organization'],'location'=>$clean['location'],'timing'=>$clean['timing'],
        'requestSpecificFields'=>array_intersect_key($clean,array_flip($specific)),'notes'=>$clean['notes'],
        'privacyAcknowledgement'=>true,'optionalMarketingConsent'=>false]];
}
function handle(array $server, string $raw, array $c, array $schema, ?\PDO $db, ?int $now=null): array {
    $now??=time();
    if(!configured($c)||!$db)return rejected(503,'ENQUIRIES_NOT_CONFIGURED');
    $method=$server['REQUEST_METHOD']??'';
    if(!in_array($method,['GET','POST'],true))return result(405,['accepted'=>false,'error'=>'METHOD_NOT_ALLOWED'],['Allow'=>'GET, POST']);
    $origin=$server['HTTP_ORIGIN']??null;
    if(($origin!==null && $origin!==$c['origin'])||($method==='POST'&&$origin!==$c['origin'])||($server['HTTP_SEC_FETCH_SITE']??'')==='cross-site')return rejected(403,'ORIGIN_REJECTED');
    $ip=hash_hmac('sha256',$server['REMOTE_ADDR']??'unknown',$c['secret']); // Never trust client X-Forwarded-For.
    $db->prepare('DELETE FROM limits WHERE expires<?')->execute([$now]);
    if(limited($db,'traffic:'.$ip,60,60,$now)||limited($db,'traffic-global',1200,60,$now))return result(429,['accepted'=>false,'error'=>'RATE_LIMITED'],['Retry-After'=>'60']);
    if($method==='GET')return result(200,['token'=>token($c,$now)]);
    if(strlen($raw)>32768 || (int)($server['CONTENT_LENGTH']??0)>32768)return rejected(413,'REQUEST_TOO_LARGE');
    if(strtolower(trim(explode(';',$server['CONTENT_TYPE']??'')[0]))!=='application/json')return rejected(415,'JSON_REQUIRED');
    try{$input=json_decode($raw,true,32,JSON_THROW_ON_ERROR);}catch(\JsonException){return rejected(400,'INVALID_JSON');}
    if(!is_array($input)||array_is_list($input))return rejected(400,'INVALID_JSON');
    if(($input['website']??'')!=='')return rejected(422,'BOT_CHECK_FAILED');
    if(!validToken($input['token']??null,$c,$now))return rejected(403,'TOKEN_EXPIRED');
    $key=$input['idempotencyKey']??null;
    if(!is_string($key)||!preg_match('/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/Di',$key))return rejected(400,'INVALID_REQUEST_KEY');
    $checked=validate($input,$schema);if(!$checked['ok'])return rejected(422,'VALIDATION_FAILED',['errors'=>$checked['errors']]);
    $payload=json_encode($checked['value'],JSON_UNESCAPED_UNICODE|JSON_THROW_ON_ERROR);
    $digest=hash('sha256',$payload);$key=hash_hmac('sha256',strtolower($key),$c['secret']);
    $db->exec('BEGIN IMMEDIATE');
    try {
        $q=$db->prepare('SELECT id,digest FROM enquiries WHERE request_key=?');$q->execute([$key]);$prior=$q->fetch(\PDO::FETCH_ASSOC);
        if($prior){$db->exec('COMMIT');return hash_equals($prior['digest'],$digest)?result(202,['accepted'=>true,'reference'=>$prior['id']]):rejected(409,'REQUEST_KEY_CONFLICT');}
        if(limited($db,'submit:'.$ip,5,3600,$now)||limited($db,'submit-global',300,3600,$now)){$db->exec('COMMIT');return result(429,['accepted'=>false,'error'=>'RATE_LIMITED'],['Retry-After'=>'3600']);}
        $reference='EEBD-'.strtoupper(bin2hex(random_bytes(8)));
        $q=$db->prepare('INSERT INTO enquiries(id,request_key,digest,payload,created_at) VALUES(?,?,?,?,?)');$q->execute([$reference,$key,$digest,$payload,$now]);
        $db->exec('COMMIT');
        return result(202,['accepted'=>true,'reference'=>$reference]);
    } catch(\Throwable $error) {$db->exec('ROLLBACK');throw $error;}
}
function notification(array $record, array $schema): array {
    $p=json_decode($record['payload'],true,32,JSON_THROW_ON_ERROR);$fr=$p['locale']==='fr-CA';$locale=$fr?'fr':'en';
    $types=$fr?['equipment'=>'Équipement','training'=>'Formation','service'=>'Soutien technique']:['equipment'=>'Equipment','training'=>'Training','service'=>'Service support'];
    $lines=[$fr?'Nouvelle demande enregistrée par EEBD.ca':'New enquiry saved by EEBD.ca',$record['id'],
        ($fr?'Type : ':'Type: ').$types[$p['requestType']],($fr?'Langue : ':'Language: ').$p['locale'],($fr?'Page source : ':'Source page: ').$p['sourcePath'],''];
    $fields=['contact'=>$p['contact']['name'],'organization'=>$p['organization'],'email'=>$p['contact']['email'],'phone'=>$p['contact']['phone'],'location'=>$p['location'],'timing'=>$p['timing']]+$p['requestSpecificFields']+['notes'=>$p['notes']];
    foreach($fields as $name=>$value){if($value==='')continue;$def=$schema['fieldDefinitions'][$name];foreach($def['options']??[] as $option)if($option[0]===$value){$value=$option[$fr?2:1];break;}$lines[]=$def[$locale].":\n".$value."\n";}
    $lines[]=$fr?'Renseignements fournis par le demandeur. Vérifiez les spécifications et la disponibilité avant de répondre.':'Information supplied by the enquirer. Verify specifications and availability before responding.';
    return ['subject'=>'EEBD.ca '.$record['id'].' ['.$p['locale'].']','body'=>implode("\n",$lines),'replyTo'=>$p['contact']['email']];
}
function processQueue(\PDO $db, array $c, array $schema, callable $transport, ?int $now=null): array {
    $now??=time();$stats=['acceptedByMail'=>0,'failed'=>0,'remaining'=>0];
    // CLI takes an OS lock for the entire worker run; the endpoint never delivers mail.
    $q=$db->prepare('SELECT * FROM enquiries WHERE notify_status="pending" AND next_attempt<=? ORDER BY created_at LIMIT 20');$q->execute([$now]);
    foreach($q->fetchAll(\PDO::FETCH_ASSOC) as $record){
        $message=notification($record,$schema);$ok=false;
        try{$ok=$transport($message,$c)===true;}catch(\Throwable){}
        $attempts=(int)$record['attempts']+1;
        $db->prepare('UPDATE enquiries SET attempts=?,notify_status=?,next_attempt=?,notified_at=? WHERE id=?')->execute([$attempts,$ok?'mail-accepted':'pending',$now+min(3600,60*(2**min($attempts,6))),$ok?$now:null,$record['id']]);
        $stats[$ok?'acceptedByMail':'failed']++;
    }
    $stats['remaining']=(int)$db->query('SELECT count(*) FROM enquiries WHERE notify_status="pending"')->fetchColumn();
    return $stats;
}
