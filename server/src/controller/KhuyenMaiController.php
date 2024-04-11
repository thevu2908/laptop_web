<?php

include __DIR__ . '/../model/ConnectDB.php';
include __DIR__ . '/../model/KhuyenMai/KhuyenMai.php';
include __DIR__ . '/../model/KhuyenMai/KhuyenMaiRepo.php';

class KhuyenMaiController {
    private $khuyenMaiRepo;

    public function __construct() {
        $this->khuyenMaiRepo = new KhuyenMaiRepo();
    }

    public function getAllKhuyenMai() {
        $promotions = $this->khuyenMaiRepo->getAllKhuyenMai();
        $result = [];

        foreach($promotions as $promotion) {
            if($promotion['trang_thai'] ==  0) {
                $result[] = $promotion;
            }
        }

        echo json_encode($result);
    }

    public function getKhuyenMai($ma_km) {
        return $this->khuyenMaiRepo->getKhuyenMai($ma_km);
    }

    public function getKhuyenMai2($ma_km) {
        echo json_encode($this->khuyenMaiRepo->getKhuyenMai($ma_km));
    }

    public function getSizeKhuyenMai(): int {
        return $this->khuyenMaiRepo->getSizeKhuyenMai();
    }

    public function getSize() {
        echo $this->khuyenMaiRepo->getSizeKhuyenMai();
    }

    public function addKhuyenMai($khuyenmai) {
        if ($this->khuyenMaiRepo->addKhuyenMai($khuyenmai)) {
            echo $khuyenmai->getMaKm();
        } else {
            echo null;
        }
    }

    public function updateKhuyenMai($khuyenmai) {
        if ($this->khuyenMaiRepo->updateKhuyenMai($khuyenmai)) {
            echo 'success';
        } 
        else {
            echo 'fail';
        }
    }

    public function deleteKhuyenMai($ma_km) {
        $promo = $this->khuyenMaiRepo->getKhuyenMai($ma_km);
        if($promo['tinh_trang'] == 'Đang diễn ra') {
            echo 'fail';
        }
        else {
            $this->khuyenMaiRepo->deleteKhuyenMai($ma_km);
            echo 'success';
        }
    }
}

$khuyenMaiCtl = new KhuyenMaiController();
$action = $_POST['action'];

switch($action) {
    case 'get':
        $ma_km = $_POST['promoId'];
        $khuyenMaiCtl->getKhuyenMai2($ma_km);
        break;
    case 'get-size':
        $khuyenMaiCtl->getSize();
        break;
    case 'get-all':
        $khuyenMaiCtl->getAllKhuyenMai();
        break;
    case 'add':
        $size = $khuyenMaiCtl->getSizeKhuyenMai();
        if($size >= 0) {
            $size += 1;
            $promoId = 'KM'.sprintf("%03d", $size);
            $obj = json_decode(json_encode($_POST['promo']));
            
            $promo = new KhuyenMai(
                $promoId,
                $obj->{'promoName'},
                $obj->{'promoPercent'},
                $obj->{'promoCondition'},
                $obj->{'promoDateFrom'},
                $obj->{'promoDateTo'},
                $obj->{'promoStatus'},
                0
            );
            
            $khuyenMaiCtl->addKhuyenMai($promo);
        }
        break;
    case 'delete':
        $promoId = $_POST['promoId'];
        $khuyenMaiCtl->deleteKhuyenMai($promoId);
        break;
    case 'update':
        $obj = json_decode(json_encode($_POST['promo']));
        $promoId = $obj->{'promoId'};

        $promo = new KhuyenMai(
            $promoId,
            $obj->{'promoName'},
            $obj->{'promoPercent'},
            $obj->{'promoCondition'},
            $obj->{'promoDateFrom'},
            $obj->{'promoDateTo'},
            $obj->{'promoStatus'},
            0
        );

        $khuyenMaiCtl->updateKhuyenMai($promo);
        break;
}