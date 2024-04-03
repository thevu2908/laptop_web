<?php

include __DIR__ . '/../model/ConnectDB.php';
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

    public function deleteAccount($accountId) {
        if ($this->taiKhoanRepo->deleteAccount($accountId)) {
            echo 'success';
        } else {
            echo 'fail';
        }
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
    default:
        break;
}
