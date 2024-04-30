<?php
include("../model/ConnectDB.php");
include("../model/HoaDon/HoaDon.php");
include("../model/HoaDon/HoaDonRepo.php");

class HoaDonController {
    private $hoadonRepo;

    public function __construct(){
        $this->hoadonRepo = new HoaDonRepo();
    }

    public function getAllHoaDon() {
        echo json_encode($this->hoadonRepo->getAllHoaDon());
    }

    public function getKhachHang($id) {
       echo json_encode($this->hoadonRepo->getThongTinKhachHang($id));
    }

    public function getHoaDonByKhachHang($ma_kh, $tinh_trang, $search) {
        echo json_encode($this->hoadonRepo->getHoaDonByKhachHang($ma_kh, $tinh_trang, $search));
    }

    public function getSizeHoaDon() {
        return $this->hoadonRepo->getSizeHoaDon();
    }

    public function addHoaDon($hoadon) {
        if ($this->hoadonRepo->addHoaDon($hoadon)) {
            echo $hoadon->getMaHd();
        } else {
            echo 'fail';
        }
    }
}

$hoadonctl = new HoaDonController();
$action = isset($_REQUEST['action']) ? $_REQUEST['action'] : null;

switch ($action) {
    case 'get-all':
        $hoadonctl->getAllHoaDon();
        break;
    case 'get-khach-hang':
        $id = $_POST['id'];
        $hoadonctl->getKhachHang($id);
        break;
    case 'get-customer-order':
        $ma_kh = $_POST['ma_kh'];
        $tinh_trang = $_POST['tinh_trang'];
        $search = $_POST['search'];
        $hoadonctl->getHoaDonByKhachHang($ma_kh, $tinh_trang, $search);
        break;
    case 'add':
        $obj = json_decode(json_encode($_POST['bill']));
        $length = $hoadonctl->getSizeHoaDon();

        if($length >= 0) {
            $length += 1;
            $id = 'HD'.sprintf('%04d', $length);
            $hoadon = new HoaDon(
                $id,
                $obj->{'maKH'},
                '',
                $obj->{'maTTNH'},
                $obj->{'date'},
                $obj->{'tmpTotal'},
                $obj->{'promotion'},
                $obj->{'finishTotal'},
                $obj->{'payMethod'},
                $obj->{'note'},
                $obj->{'status'},
                0
            );

            $hoadonctl->addHoaDon($hoadon);
        }

    default:
        break;
}