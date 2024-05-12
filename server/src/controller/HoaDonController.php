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
        $bills = $this->hoadonRepo->getAllHoaDon();
        $result = [];

        foreach($bills as $bill) {
            if($bill['trang_thai'] ==  0) {
                $result[] = $bill;
            }
        }

        echo json_encode($result);
    }

    public function getAllHoaDonByStatus($status) {
        $bills = $this->hoadonRepo->getAllHoaDon();
        $result = [];

        foreach($bills as $bill) {
            if($bill['trang_thai'] ==  0 && $bill['tinh_trang'] ==  $status) {
                $result[] = $bill;
            }
        }

        echo json_encode($result);
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

    public function deleteHoaDon($billId) {
        $hoadon = $this->hoadonRepo->getHoaDon($billId);
        if ($hoadon['tinh_trang'] == "Chưa xác nhận") {
            $this->hoadonRepo->deleteHoaDon($billId);
            echo 'success-delete';
        }
        else if($hoadon['tinh_trang'] == "Đã xác nhận") {
            echo 'success-no-delete';
        } 
        else {
            echo 'fail';
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

    public function getOrderInDate($brandId, $startDate, $endDate) {
        $orders = $this->hoadonRepo->getOrderInDate($brandId, $startDate, $endDate);
        $revenue = 0;
        foreach ($orders as $order) {
            $revenue += $order['thanh_tien'];
        }
        echo json_encode([
            'orders' => $orders,
            'revenue' => $revenue
        ]);
    }

    public function getPaginationOrderInDate($brandId, $startDate, $endDate, $start, $limit) {
        echo json_encode([
            "data" => $this->hoadonRepo->getPaginationOrderInDate($brandId, $startDate, $endDate, $start, $limit),
            "length" => $this->hoadonRepo->getPaginationOrderInDateLength($brandId, $startDate, $endDate)
        ]);
    }

    public function getBestSeller($amount, $brandId, $startDate, $endDate) {
        echo json_encode($this->hoadonRepo->getBestSeller($amount, $brandId, $startDate, $endDate));
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
    case 'get-in-date':
        $brandId = $_POST['brandId'];
        $startDate = isset($_POST['startDate']) ? $_POST['startDate'] : null;
        $endDate = isset($_POST['endDate']) ? $_POST['endDate'] : null;
        if (!$startDate && !$endDate) {
            $current_month = date('m');
            $current_year = date('Y');
            $startDate = date('Y-m-01', strtotime("$current_year-$current_month-01"));
            $endDate = date('Y-m-t', strtotime("$current_year-$current_month-01"));
        }
        $hoadonctl->getOrderInDate($brandId, $startDate, $endDate);
        break;
    case 'pagination-order-in-date':
        $brandId = $_POST['brandId'];
        $startDate = isset($_POST['startDate']) ? $_POST['startDate'] : null;
        $endDate = isset($_POST['endDate']) ? $_POST['endDate'] : null;
        $page = isset($_POST['page']) ? $_POST['page'] : 1;
        $limit = isset($_POST['limit']) ? $_POST['limit'] : 8;
        $start = ($page - 1) * $limit;
        if (!$startDate && !$endDate) {
            $current_month = date('m');
            $current_year = date('Y');
            $startDate = date('Y-m-01', strtotime("$current_year-$current_month-01"));
            $endDate = date('Y-m-t', strtotime("$current_year-$current_month-01"));
        }
        $hoadonctl->getPaginationOrderInDate($brandId, $startDate, $endDate, $start, $limit);
        break;
    case 'get-by-month':
        $month = $_POST['month'];
        $hoadonctl->getOrderByMonth($month);
        break;
    case 'get-best-seller':
        $amount = isset($_POST['amount']) ? $_POST['amount'] : 5;
        $brandId = $_POST['brandId'];
        $startDate = isset($_POST['startDate']) ? $_POST['startDate'] : null;
        $endDate = isset($_POST['endDate']) ? $_POST['endDate'] : null;
        if (!$startDate && !$endDate) {
            $current_month = date('m');
            $current_year = date('Y');
            $startDate = date('Y-m-01', strtotime("$current_year-$current_month-01"));
            $endDate = date('Y-m-t', strtotime("$current_year-$current_month-01"));
        }
        $hoadonctl->getBestSeller($amount, $brandId, $startDate, $endDate);
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
        break;
    case 'delete':
        $id = $_POST['billId'];
        $hoadonctl->deleteHoaDon($id);
    case 'search-status':
        $status = $_GET['status'];
        $hoadonctl->getAllHoaDonByStatus($status);
    default:
        break;
}