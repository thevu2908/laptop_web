<?php

class GetSessionController {
    public function getLoginSession() {
        session_start();
        echo isset($_SESSION['loggedin']) && $_SESSION['loggedin'] === true
            ? json_encode([
                'accountId' => $_SESSION['id'],
                'customerId' => $_SESSION['customerId'],
                'username' => $_SESSION['username'],
                'accessId' => $_SESSION['accessId']
            ])
            : json_encode(null);
    }
}

$get = new GetSessionController();
$action = isset($_REQUEST['action']) ? $_REQUEST['action'] : null;

switch ($action) {
    case 'get-login':
        $get->getLoginSession();
        break;
    default:
        break;    
}