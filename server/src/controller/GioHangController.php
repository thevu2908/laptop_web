<?php

include __DIR__ . '/../model/ConnectDB.php';
include __DIR__ . '/../model/GioHang/GioHang.php';
include __DIR__ . '/../model/GioHang/GioHangRepo.php';

class GioHangController {
    private $gioHangRepo;

    public function __construct() {
        $this->gioHangRepo = new GioHangRepo();
    }

    public function getAllGioHang($ma_kh) {
        $carts = $this->gioHangRepo->getAllGioHang($ma_kh);
        $result = [];

        foreach($carts as $cart) {
            if($cart['trang_thai'] ==  0) {
                $result[] = $cart;
            }
        }

        echo json_encode($result);
    }

    public function getSizeGioHang($ma_kh): int {
        return $this->gioHangRepo->getSizeGioHang($ma_kh);
    }

    public function getSize($ma_kh) {
        echo $this->gioHangRepo->getSizeGioHang($ma_kh);
    }

    public function addGioHang($giohang) {
        if ($this->gioHangRepo->addGioHang($giohang)) {
            echo $giohang->getMaKH();
        } else {
            echo null;
        }
    }

    public function updateGioHang($giohang) {
        if ($this->gioHangRepo->updateGioHang($giohang)) {
            echo 'success';
        } 
        else {
            echo 'fail';
        }
    }

    public function deleteGioHang($ma_ctsp, $ma_kh) {
        if($this->gioHangRepo->deleteGioHang($ma_ctsp, $ma_kh)) {
            echo 'success';
        }
        else {
            echo 'fail';
        }
    }

    public function getFullProduct($maCTSP) {
        echo json_encode($this->gioHangRepo->getFullProduct($maCTSP));
    }
}

$gioHangCtl = new GioHangController();
$action = $_POST['action'];

switch($action) {
    case 'get-size':
        $maKH = $_POST['maKH'];
        $gioHangCtl->getSizeGioHang($maKH);
        break;

    case 'get-all':
        $maKH = $_POST['maKH'];
        $gioHangCtl->getAllGioHang($maKH);
        break;

    case 'get-product':
        $ma_ctsp = $_POST['maCTSP'];
        $gioHangCtl->getFullProduct($ma_ctsp);
        break;

    case 'add':
        $obj = json_decode(json_encode($_POST['cart']));
        
        $cart = new GioHang(
            $obj->{'productDetailId'},
            $obj->{'customerId'},
            $obj->{'image'},
            $obj->{'price'},
            $obj->{'quantity'},
            0
        );
        
        $gioHangCtl->addGioHang($cart);
        break;

    case 'delete':
        $maKH = $_POST['maKH'];
        $maCTSP = $_POST['maCTSP'];
        $gioHangCtl->deleteGioHang($maCTSP, $maKH);
        break;

    case 'update':
        // $obj = json_decode(json_encode($_POST['promo']));
        // $promoId = $obj->{'promoId'};

        // $promo = new GioHang(
        //     $promoId,
        //     $obj->{'promoName'},
        //     $obj->{'promoPercent'},
        //     $obj->{'promoCondition'},
        //     $obj->{'promoDateFrom'},
        //     $obj->{'promoDateTo'},
        //     $obj->{'promoStatus'},
        //     0
        // );

        // $gioHangCtl->updateGioHang($promo);
        break;
}