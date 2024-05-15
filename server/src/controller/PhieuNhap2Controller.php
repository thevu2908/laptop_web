<?php

require_once __DIR__ . '/../model/ConnectDB.php';
include __DIR__ . '/../model/PhieuNhap/PhieuNhap.php';
include __DIR__ . '/../model/PhieuNhap/PhieuNhap2Repo.php';


class PhieuNhap2Controller {
    private $phieunhapRepo2;

    public function __construct() {
        $this->phieunhapRepo2 = new PhieuNhap2Repo();
    }

    public function getData() {
        echo json_encode($this->phieunhapRepo2->getData());
    }
}

$action = isset($_REQUEST['action']) ? $_REQUEST['action'] : '';

switch ($action) {
    case 'load':
        $phieunhapCt2 = new PhieuNhap2Controller();
        $phieunhapCt2->getData();
        break;
    default:
        echo "Nhập linh tinh gì đấy !";
        break;
}