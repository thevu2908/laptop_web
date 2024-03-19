<?php

include __DIR__ . '/../model/ConnectDB.php';
include __DIR__ . '/../model/Nhanvien/Nhanvien.php';
include __DIR__ . '/../model/Nhanvien/NhanvienRepo.php';

class NhanVienController {
    private $nhanVienRepo;

    public function __construct() {
        $this->nhanVienRepo = new NhanVienRepo();
    }

    public function getData() {
        $employess = $this->nhanVienRepo->getData();
        $result = [];

        foreach ($employess as $employee) {
            if ($employee['trang_thai'] == 0) {
                $result[] = $employee;
            }
        }

        echo json_encode($result);
    }
}

$nhanVienCtl = new NhanVienController();
$action = $_POST['action'];

switch ($action) {
    case 'load':
        $nhanVienCtl->getData();
        break;
    default:
        break;
}