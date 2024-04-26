<?php

include __DIR__ . '/../model/ConnectDB.php';
include __DIR__ . '/../model/NhaCungCap/NhaCungCap.php';
include __DIR__ . '/../model/NhaCungCap/NhaCungCapRepo.php';

class NhaCungCapController {
    private $NhaCungCapRepo;

    public function __construct() {
        $this->NhaCungCapRepo = new NhaCungCapRepo();
    }

    public function getAllNhaCungCap() {
        $promotions = $this->NhaCungCapRepo->getAllNhaCungCap();
        $result = [];

        foreach($promotions as $promotion) {
            if($promotion['trang_thai'] ==  0) {
                $result[] = $promotion;
            }
        }

        echo json_encode($result);
    }

    public function getNhaCungCap($ma_km) {
        return $this->NhaCungCapRepo->getNhaCungCap();
    }

    public function getNhaCungCap2($ma_km) {
        echo json_encode($this->NhaCungCapRepo->getNhaCungCap($ma_km));
    }

    public function getSizeNhaCungCap(): int {
        return $this->NhaCungCapRepo->getSizeNhaCungCap();
    }

    public function getSize() {
        echo $this->NhaCungCapRepo->getSizeNhaCungCap();
    }

    public function addNhaCungCap($nhacungcap) {
        if ($this->NhaCungCapRepo->addNhaCungCap($nhacungcap)) {
            echo $nhacungcap->getMaNcc();
        } else {
            echo null;
        }
    }

    public function updateNhaCungCap($nhacungcap) {
        if ($this->NhaCungCapRepo->updateNhaCungCap($nhacungcap)) {
            echo 'success';
        } 
        else {
            echo 'fail';
        }
    }

    public function deleteNhaCungCap($ma_km) {
        if ($this->NhaCungCapRepo->deleteNhaCungCap($ma_km)) {
            echo 'success';
        } else {
            echo 'fail';
        }
    }
}

$khuyenMaiCtl = new NhaCungCapController();
$action = $_POST['action'];

switch($action) {
    case 'get':
        $ma_km = $_POST['promoId'];
        $khuyenMaiCtl->getNhaCungCap2($ma_km);
        break;
    case 'get-size':
        $khuyenMaiCtl->getSize();
        break;
    case 'get-all':
        $khuyenMaiCtl->getAllNhaCungCap();
        break;
    case 'add':
        $size = $khuyenMaiCtl->getSizeNhaCungCap();
        if($size >= 0) {
            $size += 1;
            $promoId = 'NCC'.sprintf("%03d", $size);
            $obj = json_decode(json_encode($_POST['promo']));
            
            $promo = new NhaCungCap(
                $promoId,
                $obj->{'promoName'},
                $obj->{'promoPercent'},
                $obj->{'promoCondition'},
                0
            );
            
            $khuyenMaiCtl->addNhaCungCap($promo);
        }
        break;
    case 'delete':
        $promoId = $_POST['promoId'];
        $khuyenMaiCtl->deleteNhaCungCap($promoId);
        break;
    case 'update':
        $obj = json_decode(json_encode($_POST['promo']));
        $promoId = $obj->{'promoId'};

        $promo = new NhaCungCap(
            $promoId,
            $obj->{'promoName'},
            $obj->{'promoPercent'},
            $obj->{'promoCondition'},
            0
        );

        $khuyenMaiCtl->updateNhaCungCap($promo);
        break;
    default:
        break;
}