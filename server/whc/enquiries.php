<?php
declare(strict_types=1);
ini_set('display_errors','0');
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');
header('X-Robots-Tag: noindex, nofollow');
header("Content-Security-Policy: default-src 'none'; frame-ancestors 'none'");
try {
    // Set this absolute directory in the host configuration, outside ALL web roots.
    $private=realpath(getenv('EEBD_PRIVATE_DIR') ?: '');
    $web=realpath($_SERVER['DOCUMENT_ROOT'] ?? '');
    if(!$private||!$web||$private===$web||str_starts_with($private,$web.DIRECTORY_SEPARATOR)||!is_file($private.'/config.php'))throw new RuntimeException('NOT_CONFIGURED');
    require $private.'/app.php';
    $config=require $private.'/config.php';
    if(!\EEBD\configured($config))throw new RuntimeException('NOT_CONFIGURED');
    foreach($config['public_roots']??[] as $root){$root=realpath($root);if(!$root||$private===$root||str_starts_with($private,$root.DIRECTORY_SEPARATOR))throw new RuntimeException('UNSAFE_STORAGE');}
    if(empty($config['public_roots']))throw new RuntimeException('PUBLIC_ROOTS_REQUIRED');
    $schema=json_decode(file_get_contents($private.'/schema.json'),true,32,JSON_THROW_ON_ERROR);
    $raw=file_get_contents('php://input',false,null,0,32769);
    $db=\EEBD\database($private.'/data');
    $response=\EEBD\handle($_SERVER,$raw===false?'':$raw,$config,$schema,$db);
    http_response_code($response['status']);foreach($response['headers'] as $name=>$value)header($name.': '.$value);
    echo json_encode($response['body'],JSON_THROW_ON_ERROR);
} catch(Throwable) {
    // Do not log raw requests, contact data, configuration or database exceptions.
    http_response_code(503);echo '{"accepted":false,"error":"ENQUIRIES_UNAVAILABLE"}';
}
