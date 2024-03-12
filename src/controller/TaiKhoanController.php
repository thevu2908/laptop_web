<?php

include __DIR__ . '/../model/TaiKhoan/TaiKhoanRepo.php';

class TaiKhoanController {
    private $taiKhoanRepo;
    private $accountList;

    public function __construct() {
        $this->taiKhoanRepo = new TaiKhoanRepo();
        $this->accountList = [];
    }

    public function getData() {
        
    }
}