<?php
// session_start();
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

$action = '';

require_once __DIR__ . '/../model/ConnectDB.php';
include __DIR__ . '/../model/PhieuNhap/PhieuNhap.php';
include __DIR__ . '/../model/PhieuNhap/PhieuNhapRepo.php';


if (isset($_REQUEST['action'])) {
    $action = $_REQUEST['action'];
}
  

switch ($action) {
    case '':
        $rows = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $rows[] = $row;
        }

        $rows1 = [];
        while ($row1 = mysqli_fetch_assoc($result1)) {
            $rows1[] = $row1;
        }
        // Free the result set
        mysqli_free_result($result);
        mysqli_free_result($result1);
        break;
    case 'addtocart':
        $ma = $_GET['ma'];
        $mancc = $_GET['mancc'];
        $gianhap = $_GET['gianhap'];
        require '../model/PhieuNhap/PhieuNhapRepo.php';
        break;
    case 'cart':
        require '../admin/view/viewcart.php';
        break;
    case 'changequantity':
        $ma = $_GET['ma'];
        $mancc = $_GET['mancc'];
        $mactsp = $_GET['mactsp'];
        $quantity = intval($_GET['quantity']);
        if ($quantity > 0) {
            $_SESSION['cartimport'][$mancc][$mactsp]['quantity'] = $quantity;
        }

        break;
    case 'delete':
        $ma = $_GET['ma'];
        $mancc = $_GET['mancc'];
        $mactsp = $_GET['mactsp']; // Lấy mã ctsp từ dữ liệu truyền vào
        unset($_SESSION['cartimport'][$mancc][$mactsp]);
        break;
    case 'payimport':
        $ma = $_REQUEST['ma'];
        //them ctsp
        
        $mactsp = $_REQUEST['mactsp'];
        $total = $_REQUEST['total'];
        $quantity = $_REQUEST['quantity'];
        require '../model/PhieuNhap/PhieuNhapRepo.php';
        break;
    case 'invoices':
        require '../../src/model/PhieuNhap/PhieuNhapRepo.php';
        require '../admin/view/NhapHang.php';
        break;
    case 'detailinvoices':
        $ma = $_GET['ma'];
        require '../../model/PhieuNhap/PhieuNhapRepo.php';
        require 'import/detailinvoices.php';
        break;
    default:
        echo "Nhập linh tinh gì đấy !";
}