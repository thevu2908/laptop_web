<?php

include __DIR__ . '/../model/ConnectDB.php';
include __DIR__ . '/../model/KhachHang/KhachHang.php';
include __DIR__ . '/../model/KhachHang/KhachHangRepo.php';

class KhachHangController {
    private $khachHangRepo;

    public function __construct() {
        $this->khachHangRepo = new KhachHangRepo();
    }

    public function getAllKhachHang() {
        $promotions = $this->khachHangRepo->getAllKhachHang();
        $result = [];

        foreach($promotions as $promotion) {
            if($promotion['tinh_trang'] ==  0) {
                $result[] = $promotion;
            }
        }

        echo json_encode($result);
    }

    public function getProvince() {
        echo json_encode($this->khachHangRepo->getProvince());
    }

    public function getDistrict() {
        $province_id = $_POST['province_id'];

        echo json_encode($this->khachHangRepo->getDistrict($province_id));
    }
    public function getWard() {
        $district_id = $_POST['district_id'];

        echo json_encode($this->khachHangRepo->getWard($district_id));
    }
    public function getKH($id){
        echo json_encode($this->khachHangRepo->getKhachHang($id));
    }
}

$khachHangCtl = new KhachHangController();
$action = $_POST["action"];

switch($action) {
    case 'get-province':
        $khachHangCtl->getProvince();
        break;
    case 'get-district':
        $khachHangCtl->getDistrict();
        break;
    case 'get-ward':
        $khachHangCtl->getWard();
        break;
    case "get-khachhang":{
        $id=$_POST['id'];
        $khachHangCtl->getKH($id);
        break;
    }    
}