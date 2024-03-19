<?php
require_once '../../../lib/sms/vendor/autoload.php';
require_once '../../../lib/sms/vendor/pear/http_request2/HTTP/Request2.php';


$request = new HTTP_Request2();
$request->setUrl('https://xljxwl.api.infobip.com/sms/2/text/advanced');
$request->setMethod(HTTP_Request2::METHOD_POST);
$request->setConfig(
    array(
        'follow_redirects' => TRUE
    )
);
$request->setHeader(
    array(
        'Authorization' => 'App 9e6959c6566deb5f17c9c2d9125fb806-87a2866b-59ed-4394-b1c2-bab5c873ed8d',
        'Content-Type' => 'application/json',
        'Accept' => 'application/json'
    )
);
$request->setBody('{"messages":[{"destinations":[{"to":"84976124506"}],"from":"ServiceSMS","text":"Dai Lon"}]}');
try {
    $response = $request->send();
    if ($response->getStatus() == 200) {
        echo $response->getBody();
    } else {
        echo 'Unexpected HTTP status: ' . $response->getStatus() . ' ' .
            $response->getReasonPhrase();
    }
} catch (HTTP_Request2_Exception $e) {
    echo 'Error: ' . $e->getMessage();
}