<?php

include __DIR__ . '/../model/ConnectDB.php';
include __DIR__ . '/../model/TaiKhoan/Taikhoan.php';
include __DIR__ . '/../model/TaiKhoan/TaiKhoanRepo.php';
require '../../../lib/login-google/vendor/autoload.php';

class TaiKhoanController {
    private $taiKhoanRepo;

    public function __construct() {
        $this->taiKhoanRepo = new TaiKhoanRepo();
    }

    public function getData() {
        $accounts = $this->taiKhoanRepo->getData();
        $result = [];

        foreach ($accounts as $account) {
            if ($account['trang_thai'] == 0) {
                $result[] = $account;
            }
        }
        
        echo json_encode($result);
    }

    public function getAllAccount() {
        echo json_encode($this->taiKhoanRepo->getData());
    }

    public function getAccount($accounntId) {
        echo json_encode($this->taiKhoanRepo->getAccount($accounntId));
    }

    public function getAccountsLength() {
        echo $this->taiKhoanRepo->getAccountsLength();
    }

    public function addAccount($account) {
        if ($this->taiKhoanRepo->addAccount($account)) {
            echo 'success';
        } else {
            echo 'fail';
        }
    }

    public function updateAccount($account) {
        if ($this->taiKhoanRepo->updateAccount($account)) {
            echo 'success';
        } else {
            echo 'fail';
        }
    }

    public function deleteAccount($accountId) {
        if ($this->taiKhoanRepo->deleteAccount($accountId)) {
            echo 'success';
        } else {
            echo 'fail';
        }
    }

    public function checkExistUsername($username) {
        echo $this->taiKhoanRepo->checkExistUsername($username);
    }

    public function login($username, $password) {
        $account = $this->taiKhoanRepo->login($username);
        if ($password === $account['password']) {
            session_start();

            $_SESSION['loggedin'] = true;
            $_SESSION['id'] = $account['ma_tk'];
            $_SESSION['username'] = $username;

            echo 'success';
        } else {
            echo 'fail';
        }
    }

    private function clientGoogle() {
        $client_id = "78974785377-k43qqdovtiluh2r1edmt9eu0bb47qfpj.apps.googleusercontent.com";
        $client_secret = "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";
        $redirect_uri = "http://localhost/xulyGoogle.php";
        $client = new Google_Client();
        $client->setClientId($client_id);
        $client->setClientSecret($client_secret);
        $client->setRedirectUri($redirect_uri);
        $client->addScope("email");
        $client->addScope("profile");
        return $client;
    }

    public function googleLogin() {
        $client = $this->clientGoogle();
        $url = $client->createAuthUrl();
    }

    public function logout() {
        session_start();
        unset($_SESSION['loggedin']);
        unset($_SESSION['id']);
        unset($_SESSION['username']);
        exit();
    }
}

$taiKhoanCTL = new TaiKhoanController();
$action = $_POST['action'];

switch ($action) {
    case 'load':
        $taiKhoanCTL->getData();
        break;
    case 'get-all':
        $taiKhoanCTL->getAllAccount();
        break;
    case 'get':
        $accountId = $_POST['accountId'];
        $taiKhoanCTL->getAccount($accountId);
        break;
    case 'add':
        $accountId = $_POST['accountId'];
        $accessId = $_POST['accessId'];
        $username = $_POST['username'];
        $password = $_POST['password'];
        $account = new TaiKhoan($accountId, $accessId, $username, $password, 0);

        $taiKhoanCTL->addAccount($account);
        break;
    case 'update':
        $accountId = $_POST['accountId'];
        $accessId = $_POST['accessId'];
        $username = $_POST['username'];
        $password = $_POST['password'];
        $account = new TaiKhoan($accountId, $accessId, $username, $password, 0);

        $taiKhoanCTL->updateAccount($account);
        break;
    case 'delete':
        $accountId = $_POST['accountId'];
        $taiKhoanCTL->deleteAccount($accountId);
        break;
    case 'check-exist':
        $username = $_POST['username'];
        $taiKhoanCTL->checkExistUsername($username);
        break;
    case 'login':
        $username = $_POST['username'];
        $password = $_POST['password'];
        $taiKhoanCTL->login($username, $password);
        break;
    case 'logout':
        $taiKhoanCTL->logout();
        break;
    default:
        break;
}
