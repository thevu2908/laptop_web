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

    public function getHoaDon($id) {
        echo json_encode($this->hoadonRepo->getHoaDon($id));
    }

    public function getKhachHang($id) {
       echo json_encode($this->hoadonRepo->getThongTinKhachHang($id));
    }

    public function getHoaDonByKhachHang($ma_kh, $tinh_trang, $search, $start, $limit) {
        echo json_encode([
            'data' => $this->hoadonRepo->getHoaDonByKhachHang($ma_kh, $tinh_trang, $search, $start, $limit),
            'length' => $this->hoadonRepo->getHoaDonByKhachHangLength($ma_kh, $tinh_trang, $search)
        ]);
    }

    public function getSizeHoaDon() {
        return $this->hoadonRepo->getSizeHoaDon();
    }

    public function addHoaDon($hoadon) {
        if ($this->hoadonRepo->addHoaDon($hoadon)) {
            echo $hoadon->getMaHd();
        } else {
            echo $this->hoadonRepo->addHoaDon($hoadon);
        }
    }

    public function getOrderByMonth($month) {
        $orders = $this->hoadonRepo->getOrderByMonth($month);
        $revenue = 0;
        foreach ($orders as $order) {
            $revenue += $order['thanh_tien'];
        }
        echo json_encode([
            'orders' => $orders,
            'revenue' => $revenue
        ]);
    }

    public function getOrderByDate($date) {
        $orders = $this->hoadonRepo->getOrderByDate($date);
        $revenue = 0;
        foreach ($orders as $order) {
            $revenue += $order['thanh_tien'];
        }
        echo json_encode([
            'orders' => $orders,
            'revenue' => $revenue
        ]);
    }

    public function getBestSeller($amount) {
        echo json_encode($this->hoadonRepo->getBestSeller($amount));
    }
}

$hoadonctl = new HoaDonController();
$action = isset($_REQUEST['action']) ? $_REQUEST['action'] : null;

switch ($action) {
    case 'get-all':
        $hoadonctl->getAllHoaDon();
        break;
    case 'get':
        $id = $_POST['id'];
        $hoadonctl->getHoaDon($id);
        break;
    case 'get-khach-hang':
        $id = $_POST['id'];
        $hoadonctl->getKhachHang($id);
        break;
    case 'get-customer-order':
        $ma_kh = $_GET['ma_kh'];
        $tinh_trang = $_GET['tinh_trang'];
        $search = $_GET['search'];
        $page = isset($_GET['page']) ? $_GET['page'] : 1;
        $limit = isset($_GET['limit']) ? $_GET['limit'] : 5;
        $start = ($page - 1) * $limit;
        $hoadonctl->getHoaDonByKhachHang($ma_kh, $tinh_trang, $search, $start, $limit);
        break;
    case 'get-by-date':
        $date = $_POST['date'];
        $hoadonctl->getOrderByDate($date);
        break;
    case 'get-by-month':
        $month = $_POST['month'];
        $hoadonctl->getOrderByMonth($month);
        break;
    case 'get-best-seller':
        $amount = isset($_POST['amount']) ? $_POST['amount'] : 5;
        $hoadonctl->getBestSeller($amount);
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