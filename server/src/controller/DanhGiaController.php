<?php

include __DIR__ . '/../model/ConnectDB.php';
include __DIR__ . '/../model/DanhGia/DanhGia.php';
include __DIR__ . '/../model/DanhGia/DanhGiaRepo.php';

class DanhGiaController {
    private $danhGiaRepo;

    public function __construct() {
        $this->danhGiaRepo = new DanhGiaRepo();
    }

    public function getAllDanhGia($ma_ctsp) {
        $reviews = $this->danhGiaRepo->getAllDanhGia($ma_ctsp);
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

    public function deleteReview($reviewId) {
        if ($this->danhGiaRepo->deleteDanhGia($reviewId)) {
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
        $ma_ctsp = json_encode($_POST['ctspId']);
        $danhGiaCtl->getAllDanhGia($ma_ctsp);
        break;
    case 'add':
        $obj = json_decode(json_encode($_POST['review']));
        
        $review = new DanhGia(
            $obj->{'productDetailId'},
            $obj->{'customerId'},
            $obj->{'rating'},
            $obj->{'time'},
            $obj->{'content'},
            0
        );
        
        $danhGiaCtl->addReview($review);
        break;
}