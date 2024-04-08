<?php

include __DIR__ . '/../model/ConnectDB.php';
include __DIR__ . '/../model/KhuyenMai/KhuyenMai.php';
include __DIR__ . '/../model/KhuyenMai/KhuyenMaiRepo.php';

class KhuyenMaiController {
    private $khuyenMaiRepo;

    public function __construct() {
        $this->khuyenMaiRepo = new KhuyenMaiRepo();
    }

    // public function getAllKhuyenMai() {
    //     $promotions = $this->khuyenMaiRepo->getAllKhuyenMai();
    //     $result = [];

    //     foreach($promotions as $promotion) {
    //         if($promotion['tinh_trang'] ==  0) {
    //             $result[] = $promotion;
    //         }
    //     }

    //     echo json_encode($result);
    // }

    public function getAllKhuyenMai() {
        echo json_encode($this->khuyenMaiRepo->getAllKhuyenMai());
    }

    public function getKhuyenMai($ma_km) {
        echo json_encode($this->khuyenMaiRepo->getKhuyenMai($ma_km));
    }

    public function getSizeKhuyenMai(): int {
        return $this->khuyenMaiRepo->getSizeKhuyenMai();
    }

    public function addKhuyenMai(KhuyenMai $khuyenmai) {
        if ($this->khuyenMaiRepo->addKhuyenMai($khuyenmai)) {
            echo $khuyenmai->getMaKm();
        } else {
            echo null;
        }
    }

    public function updateKhuyenMai(KhuyenMai $khuyenmai) {
        if ($this->khuyenMaiRepo->updateKhuyenMai($khuyenmai)) {
            echo 'success';
        } else {
            echo 'fail';
        }
    }

    public function deleteKhuyenMai($ma_km) {
        if ($this->khuyenMaiRepo->deleteKhuyenMai($ma_km)) {
            echo 'success';
        } else {
            echo 'fail';
        }
    }
}

$khuyenMaiCtl = new KhuyenMaiController();
$action = $_POST['action'];

switch($action) {
    case 'get':
        $ma_km = $_POST['get'];
        $khuyenMaiCtl->getKhuyenMai($ma_km);
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
            $dateFrom = $obj->{'thoi_gian_bat_dau'};
            $dateTo = $obj->{'thoi_gian_ket_thuc'};

            $today = date('Y-m-d');
            if ($today >= $startDate && $today <= $endDate) {
                $status = 'Đang diễn ra';
            } elseif ($today < $startDate) {
                $status = 'Chưa bắt đầu';
            } else {
                $status = 'Đã kết thúc';
            }
            
            $promo = new KhuyenMai(
                $promoId,
                $obj->{'ten_khuyen_mai'},
                $obj->{'muc_khuyen_mai'},
                $obj->{'dieu_kien'},
                $dateFrom,
                $dateTo,
                $status
            );
            
            $khuyenMaiCtl->addKhuyenMai($promo);
        }
        break;
    // case 'update':
    //     $khuyenMaiCtl->updateKhuyenMai();
    //     break;
    // case 'delete':
    //     $khuyenMaiCtl->deleteKhuyenMai();
    //     break;
}