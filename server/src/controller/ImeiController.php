<?php

require_once __DIR__ . '/../model/ConnectDB.php';
include __DIR__ . '/../model/Imei/Imei.php';
include __DIR__ . '/../model/Imei/ImeiRepo.php';

class ImeiController {
    private $imeiRepo;

    public function __construct() {
        $this->imeiRepo = new ImeiRepo();
    }

    public function getProductDetailImeiLength($productDetailId) : int {
        return $this->imeiRepo->getProductDetailImeiLength($productDetailId);
    }

    public function addImei($productDetailId) : bool {
        $length = $this->imeiRepo->getProductDetailImeiLength($productDetailId) + 1;
        $imeiId = $productDetailId . 'IMEI' . $length;
        $imei = new Imei($imeiId, $productDetailId, 0);
        return $this->imeiRepo->addImei($imei);
    }
}