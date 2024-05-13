<?php

require_once __DIR__ . '/../model/ConnectDB.php';
include __DIR__ . '/../model/PhieuNhap/PhieuNhap.php';
include __DIR__ . '/../model/PhieuNhap/PhieuNhap2Repo.php';
include __DIR__ . '/../controller/CTPhieuNhapController.php';
include __DIR__ . '/../controller/CTSanPhamController.php';
include __DIR__ . '/../controller/ImeiController.php';




class PhieuNhap2Controller {
    private $phieunhapRepo2;
    private $ctpnController;
    private $ctspController;
    private $imeiController;

    public function __construct() {
        $this->phieunhapRepo2 = new PhieuNhap2Repo();
        $this->ctspController = new CTSanPhamController();
        $this->imeiController = new ImeiController();
        $this->ctpnController = new ChiTietPhieuNhapController();
    }

    public function getData() {
        $phieunhaps1 = $this->phieunhapRepo2->getData(); 
        $result = [];

        foreach ($phieunhaps1 as $phieunhap) {

                $result[] = $phieunhap;
        }

        echo json_encode($result);
    }

  
 
}

$action = isset($_REQUEST['action']) ? $_REQUEST['action'] : '';

switch ($action) {
    case 'load':
        $phieunhapCt2 = new PhieuNhap2Controller(); 
        $phieunhapCt2->getData(); 
        break;
   
        default:
            echo "Nhập linh tinh gì đấy !";
            break;
}