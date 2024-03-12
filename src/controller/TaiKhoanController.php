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
        echo json_encode($this->taiKhoanRepo->getData());
    }
}

$taiKhoanCTL = new TaiKhoanController();
$action = $_POST['action'];

switch ($action) {
    case 'load':
        $taiKhoanCTL->getData();
        break;
    default:
        break;
}