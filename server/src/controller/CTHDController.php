<?php
include("../model/ConnectDB.php");
include("../model/ChiTietHoaDon/ChiTietHoaDon.php");
include("../model/ChiTietHoaDon/ChiTietHoaDonRepo.php");

class CTHDController {
    private $chitietHDRepo;

    public function __construct() {
        $this->chitietHDRepo = new ChiTietHoaDonRepo();
    }

    public function getAllChiTietHoaDon() {
        echo json_encode($this->chitietHDRepo->getAllChiTietHoaDon());
    }

    public function getChiTietHoaDon($ma_hd) {
        echo json_encode($this->chitietHDRepo->getChiTietHoaDon($ma_hd));
    }

    public function getChiTietHoaDonInHoaDon($ma_hd) {
        echo json_encode($this->chitietHDRepo->getChiTietHoaDonInHoaDon($ma_hd));
    }

    public function getTotalQuantity($orderId) {
        echo json_encode($this->chitietHDRepo->getTotalQuantity($orderId));
    }

    public function addCTHD($ma_hd, $ma_ctsp, $so_luong, $gia_sp) {
        if ($this->chitietHDRepo->addCTHD($ma_hd, $ma_ctsp, $so_luong, $gia_sp)) {
            echo 'success';
        } else {
            echo 'fail';
        }
    }
}

$ctHDctl = new CTHDController();
$action = isset($_REQUEST['action']) ? $_REQUEST['action'] : null;

switch ($action){
    case 'get-cthd':
        $ma_hd = $_POST['ma_hd'];
        $ctHDctl->getChiTietHoaDon($ma_hd);
        break;
    case 'getcthd':
        $ma_hd = $_POST['mahoadon'];
        $ctHDctl->getChiTietHoaDonInHoaDon($ma_hd);
        break;
    case 'get-total-quantity':
        $orderId = $_POST['orderId'];
        $ctHDctl->getTotalQuantity($orderId);
        break;
    case 'add':
        $obj = json_decode(json_encode($_POST['cthd']));
        $ctHDctl->addCTHD($obj->{'maHD'}, $obj->{'maCTSP'}, $obj->{'soLuong'}, $obj->{'giaSP'});
    default:
        break;
}