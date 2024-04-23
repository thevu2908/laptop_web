<?php

require_once __DIR__ . '/../model/ConnectDB.php';
include __DIR__ . '/../model/TaiKhoan/Taikhoan.php';
include __DIR__ . '/../model/TaiKhoan/TaiKhoanRepo.php';

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

    public function updatePassword($id, $password) {
        if ($this->taiKhoanRepo->updatePassword($id, $password)) {
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

    public function getLoginInfo($username) {
        return $this->taiKhoanRepo->login($username);
    }

    public function login($username, $password) {
        $account = $this->getLoginInfo($username);
        if ($password === $account['password']) {
            session_start();
            $_SESSION['loggedin'] = true;
            $_SESSION['id'] = $account['ma_tk'];
            $_SESSION['customerId'] = $account['ma_kh'];
            $_SESSION['username'] = $account['ten_kh'];
            $_SESSION['accessId'] = $account['ma_quyen'];
            echo 'success';
        } else {
            echo 'fail';
        }
    }

    public function logout() {
        session_start();
        session_destroy();
        exit();
    }
}

$taiKhoanCTL = new TaiKhoanController();
$action = isset($_REQUEST['action']) ? $_REQUEST['action'] : '';

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
    case 'update-password':
        $id = $_POST['id'];
        $password = $_POST['password'];
        $taiKhoanCTL->updatePassword($id, $password);
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