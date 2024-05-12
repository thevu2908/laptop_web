<?php

class Imei {
    private $imeiId;
    private $productDetailId;
    private $status;

    public function __construct($imeiId, $productDetailId, $status) {
        $this->imeiId = $imeiId;
        $this->productDetailId = $productDetailId;
        $this->status = $status;
    }

    public function getImeiId() {
        return $this->imeiId;
    }

    public function setImeiId($imeiId) {
        $this->imeiId = $imeiId;
    }

    public function getProductDetailId() {
        return $this->productDetailId;
    }

    public function setProductDetailId($productDetailId) {
        $this->productDetailId = $productDetailId;
    }

    public function getStatus() {
        return $this->status;
    }

    public function setStatus($status) {
        $this->status = $status;
    }
}