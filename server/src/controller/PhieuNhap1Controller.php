<?php

include __DIR__ . '/../model/ConnectDB.php';
include __DIR__ . '/../model/PhieuNhap/PhieuNhap.php';
include __DIR__ . '/../model/PhieuNhap/PhieuNhap1Repo.php';

class PhieuNhap1Controller {
    private $phieunhapRepo;

    public function __construct() {
        $this->phieunhapRepo = new PhieuNhap1Repo();
    }

    public function getData() {
        $phieunhaps = $this->phieunhapRepo->getData(); // Sửa tại đây, sử dụng $this->phieunhapRepo
        $result = [];

        foreach ($phieunhaps as $phieunhap) {
            if ($phieunhap['trang_thai'] == 0) {
                $result[] = $phieunhap;
            }
        }

        echo json_encode($result);
    }

    public function getImportInvoice($id) {
        echo json_encode($this->phieunhapRepo->getImportInvoice($id));
    }
}

$action = isset($_REQUEST['action']) ? $_REQUEST['action'] : '';

switch ($action) {
    case 'load':
        $phieunhapCtl = new PhieuNhap1Controller(); 
        $phieunhapCtl->getData(); 
        break;
    case 'get':
        $id = $_POST['id'];
        $phieunhapCtl = new PhieuNhap1Controller();
        $phieunhapCtl->getImportInvoice($id);
        break;
    default:
        break;
}