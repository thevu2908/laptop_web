<?php

include __DIR__ . '/../model/ConnectDB.php';
include __DIR__ . '/../model/DanhGia/DanhGia.php';
include __DIR__ . '/../model/DanhGia/DanhGiaRepo.php';

class DanhGiaController {
    private $danhGiaRepo;

    public function __construct() {
        $this->danhGiaRepo = new DanhGiaRepo();
    }

    public function getAllDanhGiaByMaSP($ma_sp) {
        $reviews = $this->danhGiaRepo->getAllDanhGiaByMaSP($ma_sp);
        $result = [];

        foreach($reviews as $review) {
            if($review['trang_thai'] ==  0) {
                $result[] = $review;
            }
        }

        echo json_encode($result);
    }

    public function getAllDanhGia() {
        $reviews = $this->danhGiaRepo->getAllDanhGia();
        $result = [];

        foreach($reviews as $review) {
            if($review['trang_thai'] ==  0) {
                $result[] = $review;
            }
        }

        echo json_encode($result);
    }

    public function getReviewSize() : int {
        return $this->danhGiaRepo->getSizeDanhGia();
    }

    public function addReview($danhGia) {
        if ($this->danhGiaRepo->addDanhGia($danhGia)) {
            echo $danhGia->getMaCTSP();
        } 
        else {
            echo null;
        }
    }

    public function deleteReview($ma_kh, $ma_sp, $thoi_gian_danh_gia) {
        if ($this->danhGiaRepo->deleteDanhGia($ma_kh, $ma_sp, $thoi_gian_danh_gia)) {
            echo 'success';
        } else {
            echo 'fail';
        }
    }
}

$danhGiaCtl = new DanhGiaController();
$action = $_POST['action'];

switch($action) {
    case 'get-all':
        $danhGiaCtl->getAllDanhGia();
        break;
    case 'get-by-masp':
        $ma_sp = json_encode($_POST['productId']);
        $danhGiaCtl->getAllDanhGiaByMaSP($ma_sp);
        break;
    case 'add':
        $obj = json_decode(json_encode($_POST['review']));
        
        $review = new DanhGia(
            $obj->{'productId'},
            $obj->{'customerId'},
            $obj->{'rating'},
            $obj->{'time'},
            $obj->{'content'},
            0
        );
        
        $danhGiaCtl->addReview($review);
        break;
    case 'delete':
        $ma_kh = $_POST['maKH'];
        $ma_sp = $_POST['maSP'];
        $thoi_gian = $_POST['thoiGian'];
        
        $danhGiaCtl->deleteReview($ma_kh, $ma_sp, $thoi_gian);
        break;
    }