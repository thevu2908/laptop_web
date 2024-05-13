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
    public function addEmployee($manv,$tennv,$tuoi,$sodienthoai){
        echo json_encode($this->nhanVienRepo->addEmployee($manv,$tennv,$tuoi,$sodienthoai));
    }
    public function updateEmployee($manv,$tennv,$tuoi,$sodienthoai){
        echo json_encode($this->nhanVienRepo->updateEmployee($manv,$tennv,$tuoi,$sodienthoai));
    }
    public function getEmployee($manv){
        echo json_encode($this->nhanVienRepo->getEmployee($manv));
    }
    public function deleteEmployee($manv){
        echo json_encode($this->nhanVienRepo->deleteEmployee($manv));
    }
    public function deleteMulEmployee($arrNhanVien){
        echo json_encode($this->nhanVienRepo->deleteMulEmployee($arrNhanVien));
    }
}

$nhanVienCtl = new NhanVienController();
$action = $_POST['action'];

switch ($action) {
    case 'load':
        $nhanVienCtl->getData();
        break;
    case 'add':
        $manv=$_POST['manv'];
        $tennv=$_POST['tennv'];
        $tuoi=$_POST['tuoi'];
        $sodienthoai=$_POST['sodienthoai'];
        $nhanVienCtl->addEmployee($manv,$tennv,$tuoi,$sodienthoai); 
        break; 
    case 'update':
        $manv=$_POST['manv'];
        $tennv=$_POST['tennv'];
        $tuoi=$_POST['tuoi'];
        $sodienthoai=$_POST['sodienthoai'];
        $nhanVienCtl->updateEmployee($manv,$tennv,$tuoi,$sodienthoai);
        break;
    case 'get':
        $manv=$_POST['manv'];
        $nhanVienCtl->getEmployee($manv);
        break;
    case 'delete':
        $manv=$_POST['manv'];
        $nhanVienCtl->deleteEmployee($manv);
        break;
    case 'deleteMul':
        $arrMaNhanVien=json_decode(json_encode($_POST['listitemRemove']), true);
        $nhanVienCtl->deleteMulEmployee($arrMaNhanVien);
        break;
    default:
        break;
}