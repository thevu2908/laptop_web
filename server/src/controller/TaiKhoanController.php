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

    public function getAccount($accounntId) {
        echo json_encode($this->taiKhoanRepo->getAccount($accounntId));
    }

    public function addAccount($account) {

    }
}
$taiKhoanCTL = new TaiKhoanController();
<<<<<<< HEAD:src/controller/TaiKhoanController.php
print_r($taiKhoanCTL->getData());
// $action = $_POST['action'];
// switch ($action) {
//     case 'load': {
//         $taiKhoanCTL->getData();
//         break;
//     }
//     default: {
//         break;
//     }
// }
=======
$action = $_POST['action'];

switch ($action) {
    case 'load':
        $taiKhoanCTL->getData();
        break;
    default:
        break;
}
>>>>>>> 374e8c3c02a11b358c0d61f2950605f20a15bf69:server/src/controller/TaiKhoanController.php
