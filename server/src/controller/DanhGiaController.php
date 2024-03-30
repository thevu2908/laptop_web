<?php

include __DIR__ . '/../model/ConnectDB.php';
include __DIR__ . '/../model/DanhGia/DanhGia.php';
include __DIR__ . '/../model/DanhGia/DanhGiaRepo.php';
include __DIR__ . '/../model/SanPham/SanPham.php';
include __DIR__ . '/../model/SanPham/SanPhamRepo.php';

class DanhGiaController {
    private $danhGiaRepo;
    private $sanPhamRepo;

    public function __construct() {
        $this->danhGiaRepo = new DanhGiaRepo();
        $this->sanPhamRepo = new SanPhamRepo();
    }

    public function getListProduct() {
        $products = $this->sanPhamRepo->getData();
        $result = [];
        
        foreach($products as $product) {
            if($product['trang_thai'] ==  0) {
                $result[] = $product;
            }
        }
        echo json_encode($result);
    }

    public function getAllDanhGia($ma_ctsp) {
        $evaluates = $this->danhGiaRepo->getAllDanhGia($ma_ctsp);
        $result = [];

        foreach($evaluates as $evaluate) {
            if($evaluate['trang_thai'] ==  0) {
                $result[] = $evaluate;
            }
        }

        echo json_encode($result);
    }
}

$danhGiaCtl = new DanhGiaController();
$action = $_POST['action'];

switch($action) {
    case 'get-data':
        $danhGiaCtl->getListProduct();
        break;
}