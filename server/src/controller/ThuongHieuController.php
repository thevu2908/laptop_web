<?php

include __DIR__ . '/../model/ConnectDB.php';
include __DIR__ . '/../model/ThuongHieu/ThuongHieu.php';
include __DIR__ . '/../model/ThuongHieu/ThuongHieuRepo.php';

class ThuongHieuController {
    private $thuongHieuRepo;

    public function __construct() {
        $this->thuongHieuRepo = new ThuongHieuRepo();
    }

    public function getData() {
        $brands = $this->thuongHieuRepo->getData();
        $result = [];

        foreach ($brands as $brand) {
            if ($brand['trang_thai'] == 0) {
                $result[] = $brand;
            }
        }
        
        echo json_encode($result);
    }

    public function getAllBrands() {
        echo json_encode($this->thuongHieuRepo->getData());
    }

    public function getBrand($brandId) {
        echo json_encode($this->thuongHieuRepo->getBrand($brandId));
    }

    public function getBrandsLength() : int {
        return $this->thuongHieuRepo->getBrandsLength();
    }

    public function addBrand($brand) {
        if ($this->thuongHieuRepo->addBrand($brand)) {
            echo 'success';
        } else {
            echo 'fail';
        }
    }

    public function deleteBrand($brandId) {
        if ($this->thuongHieuRepo->deleteBrand($brandId)) {
            echo 'success';
        } else {
            echo 'fail';
        }
    }
}

$thuongHieuCtl = new ThuongHieuController();
$action = $_POST['action'];

switch ($action) {
    case 'load':
        $thuongHieuCtl->getData();
        break;
    case 'get-all':
        $thuongHieuCtl->getAllBrands();
        break;
    case 'get':
        $brandId = $_POST['brandId'];
        $thuongHieuCtl->getBrand($brandId);
        break;
    case 'add':
        $length = $thuongHieuCtl->getBrandsLength();
        if ($length >= 0) {
            $length += 1;
            $brandId = 'TH'.sprintf('%03d', $length);
            $brandName = $_POST['brandName'];
            
            $brand = new ThuongHieu($brandId, $brandName, 0);
            $thuongHieuCtl->addBrand($brand);
        }
        break;
    case 'delete':
        $brandId = $_POST['brandId'];
        $thuongHieuCtl->deleteBrand($brandId);
        break;
    default:
        break;
}