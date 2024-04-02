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
            if($promotion['tinh_trang'] ==  0) {
                $result[] = $promotion;
            }
        }

        echo json_encode($result);
    }
}

$khuyenMaiCtl = new KhuyenMaiController();
$action = $_POST['action'];

switch($action) {
    case 'load':
        $khuyenMaiCtl->getAllKhuyenMai();
        break;
}