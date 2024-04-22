<?php
session_start();

require_once 'TaiKhoanController.php';
require_once 'KhachHangController.php';
require_once __DIR__ . '/../../../lib/google/vendor/autoload.php';

class GoogleLoginController {
    private $taiKhoanCtl;
    private $khachHangCtl;

    public function __construct() {
        $this->taiKhoanCtl = new TaiKhoanController();
        $this->khachHangCtl = new KhachHangController();
    }

    public function getCustomerLength() {
        return $this->khachHangCtl->getKhachhangLength();
    }

    public function getCustomer($id) {
        return $this->khachHangCtl->getKhachHang($id);
    }

    public function addCustomer($email, $name) {
        $length = $this->getCustomerLength();
        if ($length >= 0) {
            $length += 1;
            $id = 'KH'.sprintf("%04d", $length);
            $customer = new KhachHang($id, $name, '', $email, '', 0);
            return $this->khachHangCtl->addKhachHang($customer);
        }
        return false;
    }

    public function getLoginInfo($username) {
        return $this->taiKhoanCtl->getLoginInfo($username);
    }

    public function clientGoogle() {
        $client_id = '78974785377-k43qqdovtiluh2r1edmt9eu0bb47qfpj.apps.googleusercontent.com';
        $client_secret = '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';
        $redirect_uri = 'http://localhost:3000/server/src/controller/GoogleLoginController.php';
        $client = new Google_Client();
        $client->setClientId($client_id);
        $client->setClientSecret($client_secret);
        $client->setRedirectUri($redirect_uri);
        $client->addScope('email');
        $client->addScope('profile');
        return $client;
    }

    public function getGoogleUrl() {
        $client = $this->clientGoogle();
        $url = $client->createAuthUrl();
        return $url;
    }
}

$obj = new GoogleLoginController();
$action = isset($_REQUEST['action']) ? $_REQUEST['action'] : '';

switch ($action) {
    case 'get-google-url':
        echo $obj->getGoogleUrl();
        break;
    default:
        break;
}

if (isset($_GET['code'])) {
    $client = $obj->clientGoogle();
    $token = $client->fetchAccessTokenWithAuthCode($_GET['code']);
    $client->setAccessToken($token['access_token']);
    $google_oauth = new Google_Service_Oauth2($client);
    $google_account_info = $google_oauth->userinfo->get();
    $email = $google_account_info->email;
    $name = $google_account_info->name;
    
    if (!$obj->getCustomer($email)) {
        $obj->addCustomer($email, $name);
    }

    $info = $obj->getLoginInfo($email);
    $_SESSION['loggedin'] = true;
    $_SESSION['id'] = $info['email'];
    $_SESSION['customerId'] = $info['ma_kh'];
    $_SESSION['username'] = $name;
    $_SESSION['accessId'] = 'user';
    echo '<script>if (window.opener){window.opener.location.href="http://localhost:3000/index.php"; window.close();}</script>';
}