<?php
declare(strict_types=1);
if(PHP_SAPI!=='cli'){http_response_code(404);exit;}
require __DIR__.'/app.php';
$config=require __DIR__.'/config.php';
if(!\EEBD\configured($config)){fwrite(STDERR,"Enquiries are not configured.\n");exit(1);}
$lock=fopen(__DIR__.'/data/worker.lock','c');
if(!$lock||!flock($lock,LOCK_EX|LOCK_NB)){fwrite(STDERR,"Worker already running or lock unavailable.\n");exit(1);}
try {
    $db=\EEBD\database(__DIR__.'/data');
    $schema=json_decode(file_get_contents(__DIR__.'/schema.json'),true,32,JSON_THROW_ON_ERROR);
    $stats=\EEBD\processQueue($db,$config,$schema,static function(array $message,array $config):bool{
        return mail($config['recipient'],$message['subject'],$message['body'],[
            'From'=>$config['sender'],'Reply-To'=>$message['replyTo'],
            'MIME-Version'=>'1.0','Content-Type'=>'text/plain; charset=UTF-8',
            // A stable message ID aids investigation; SMTP itself cannot guarantee exactly-once delivery.
            'Message-ID'=>'<'.strtolower(explode(' ',$message['subject'])[1]).'@eebd.ca>',
        ]);
    });
    // SMTP acceptance is not inbox receipt. Retries remain pending until acceptance.
    // Pending requests are preserved for investigation, including beyond the normal retention window.
    $db->prepare('DELETE FROM enquiries WHERE created_at<? AND notify_status="mail-accepted"')->execute([time()-86400*$config['retention_days']]);
    $db->prepare('DELETE FROM limits WHERE expires<?')->execute([time()]);
    echo json_encode($stats,JSON_THROW_ON_ERROR)."\n";
    if($stats['remaining']>0)exit(2); // Monitor this status in WHC operations.
} finally {flock($lock,LOCK_UN);fclose($lock);}
