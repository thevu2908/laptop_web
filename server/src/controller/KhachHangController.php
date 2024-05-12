<?php

require_once __DIR__ . '/../model/ConnectDB.php';
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

    public function getKhachhangLength() : int {
        return $this->khachHangRepo->getKhachhangLength();
    }
    
    public function getKhachHang($id) {
        return $this->khachHangRepo->getKhachHang($id);
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

    public function addKhachHang($customer) {
        if ($this->khachHangRepo->addKhachHang($customer)) {
            echo 'success';
        } else {
            echo 'fail';
        }
    }

    public function updateKhachHang($customer) {
        if ($this->khachHangRepo->updateKhachHang($customer)) {
            echo 'success';
        } else {
            echo 'fail';
        }
    }
}

$khachHangCtl = new KhachHangController();
$action = isset($_POST['action']) ? $_POST['action'] : '';

switch($action) {
    case 'get-data':
        $khachHangCtl->getAllKhachHang();
        break;
    case 'add':
        $length = $khachHangCtl->getKhachhangLength();
        if ($length >= 0) {
            $length += 1;
            $id = 'KH'.sprintf('%04d', $length);
            $name = $_POST['name'];
            $phone = $_POST['phone'];
            $email = $_POST['email'];
            $customer = new KhachHang($id, $name, $phone, $email, 0);
            $khachHangCtl->addKhachHang($customer);
        }
        break;
    case 'update':
        $id = $_POST['id'];
        $name = $_POST['name'];
        $phone = isset($_POST['phone']) ? $_POST['phone'] : '';
        $email = $_POST['email'];
        $customer = new KhachHang($id, $name, $phone, $email, 0);
        $khachHangCtl->updateKhachHang($customer);
        break;
    case 'get-customer':
        $id = $_POST['id'];
        echo json_encode($khachHangCtl->getKhachHang($id));
        break;
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
    case "get-length": {
        echo $khachHangCtl->getKhachhangLength();
        break;
    }
    default:
        break;
}