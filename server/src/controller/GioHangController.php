<?php

include __DIR__ . '/../model/ConnectDB.php';
include __DIR__ . '/../model/GioHang/GioHang.php';
include __DIR__ . '/../model/GioHang/GioHangRepo.php';

class GioHangController {
    private $gioHangRepo;

    public function __construct() {
        $this->gioHangRepo = new GioHangRepo();
    }

    public function getAllGioHang($ma_kh) {
        echo json_encode($this->gioHangRepo->getAllGioHang($ma_kh));
    }

    public function getGioHang($ma_ctsp, $ma_kh) {
        echo json_encode($this->gioHangRepo->getGioHang($ma_ctsp, $ma_kh));
    }
    
    public function getSizeGioHang($ma_kh) {
        echo json_encode($this->gioHangRepo->getSizeGioHang($ma_kh));
    }

    public function addGioHang($giohang) {
        if ($this->gioHangRepo->addGioHang($giohang)) {
            echo 'success';
        } else {
            echo 'fail';
        }
    }

    public function updateGioHang($giohang) {
        if ($this->gioHangRepo->updateGioHang($giohang)) {
            echo 'success';
        } else {
            echo 'fail';
        }
    }

    public function deleteGioHang($ma_ctsp, $ma_kh) {
        if ($this->gioHangRepo->deleteGioHang($ma_ctsp, $ma_kh)) {
            echo 'success';
        } else {
            echo 'fail';
        }
    }

    public function deleteGioHangByMaKH($ma_kh) {
        if ($this->gioHangRepo->deleteGioHangByMaKH($ma_kh)) {
            echo 'success';
        } else {
            echo 'fail';
        }
    }

    public function getFullProduct($maCTSP) {
        echo json_encode($this->gioHangRepo->getFullProduct($maCTSP));
    }

    public function handlePaymentMethod($methodName) {
        if($methodName == 'vnpay') {
            $vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
            $vnp_Returnurl = "https://localhost/vnpay_php/vnpay_return.php";
            $vnp_TmnCode = "1NE9AQ3J";//Mã website tại VNPAY 
            $vnp_HashSecret = "VFQSSDNZZOOFCCBEBBPVAONAPGYFKBUT"; //Chuỗi bí mật
            
            $vnp_TxnRef = "10000"; //Mã đơn hàng. Trong thực tế Merchant cần insert đơn hàng vào DB và gửi mã này sang VNPAY
            $vnp_OrderInfo = 'Thanh toán hóa đơn';
            $vnp_OrderType = 'billpayment';
            $vnp_Amount = 10000 * 100;
            $vnp_Locale = 'VN';
            $vnp_BankCode = 'NCB';
            $vnp_IpAddr = $_SERVER['REMOTE_ADDR']; // 127.0.0.1
            
            $inputData = array(
                "vnp_Version" => "2.1.0",
                "vnp_TmnCode" => $vnp_TmnCode,
                "vnp_Amount" => $vnp_Amount,
                "vnp_Command" => "pay",
                "vnp_CreateDate" => date('YmdHis'),
                "vnp_CurrCode" => "VND",
                "vnp_IpAddr" => $vnp_IpAddr,
                "vnp_Locale" => $vnp_Locale,
                "vnp_OrderInfo" => $vnp_OrderInfo,
                "vnp_OrderType" => $vnp_OrderType,
                "vnp_ReturnUrl" => $vnp_Returnurl,
                "vnp_TxnRef" => $vnp_TxnRef
            );
            
            if (isset($vnp_BankCode) && $vnp_BankCode != "") {
                $inputData['vnp_BankCode'] = $vnp_BankCode;
            }
            // if (isset($vnp_Bill_State) && $vnp_Bill_State != "") {
            //     $inputData['vnp_Bill_State'] = $vnp_Bill_State;
            // }
            
            //var_dump($inputData);
            ksort($inputData);
            $query = "";
            $i = 0;
            $hashdata = "";
            foreach ($inputData as $key => $value) {
                if ($i == 1) {
                    $hashdata .= '&' . urlencode($key) . "=" . urlencode($value);
                } else {
                    $hashdata .= urlencode($key) . "=" . urlencode($value);
                    $i = 1;
                }
                $query .= urlencode($key) . "=" . urlencode($value) . '&';
            }
            
            $vnp_Url = $vnp_Url . "?" . $query;
            if (isset($vnp_HashSecret)) {
                $vnpSecureHash =   hash_hmac('sha512', $hashdata, $vnp_HashSecret);//  
                $vnp_Url .= 'vnp_SecureHash=' . $vnpSecureHash;
            }
            $returnData = array('code' => '00'
                , 'message' => 'success'
                , 'data' => $vnp_Url);
                if (isset($_POST['redirect'])) {
                    header('Location: ' . $vnp_Url);
                    die();
                } else {
                    echo json_encode($returnData);
                }

            // $returnData = array(
            //     'code' => '00',
            //     'message' => 'success',
            //     'data' => $vnp_Url
            // );

            // Lưu URL thanh toán vào session
            // $_SESSION['vnpay_url'] = $vnp_Url;
            // $_SESSION['vnpay_expiration'] = time() + 600; // Thời gian hết hạn sau 10 phút (600 giây)

            echo json_encode($returnData);
        }
        
        else if($methodName == 'momo') {
            echo '2';
        }
        else if($methodName == 'cod') {
            echo '3';
        }
        else {
            echo '0';
        }
    }
}

$gioHangCtl = new GioHangController();
$action = isset($_REQUEST['action']) ? $_REQUEST['action'] : '';

switch($action) {
    case 'get-size':
        $maKH = $_POST['maKH'];
        $gioHangCtl->getSizeGioHang($maKH);
        break;
    case 'get-all':
        $maKH = $_POST['maKH'];
        $gioHangCtl->getAllGioHang($maKH);
        break;
    case 'get':
        $maCTSP = $_POST['productDetailId'];
        $maKH = $_POST['customerId'];
        $gioHangCtl->getGioHang($maCTSP, $maKH);
        break;
    case 'get-product':
        $ma_ctsp = $_POST['maCTSP'];
        $gioHangCtl->getFullProduct($ma_ctsp);
        break;
    case 'add':
        $obj = json_decode(json_encode($_POST['cart']));
        $cart = new GioHang(
            $obj->{'productDetailId'},
            $obj->{'customerId'},
            $obj->{'price'},
            $obj->{'quantity'},
        );
        $gioHangCtl->addGioHang($cart);
        break;
    case 'delete':
        $maCTSP = $_POST['maCTSP'];
        $maKH = $_POST['maKH'];
        $gioHangCtl->deleteGioHang($maCTSP, $maKH);
        break;
    case 'delete-all':
        $maKH = $_POST['maKH'];
        $gioHangCtl->deleteGioHangByMaKH($maKH);
        break;
    case 'update':
        $obj = json_decode(json_encode($_POST['cart']));
        $cart = new GioHang(
            $obj->{'productDetailId'},
            $obj->{'customerId'},
            $obj->{'price'},
            $obj->{'quantity'},
        );
        $gioHangCtl->updateGioHang($cart);
        break;
    case 'payment':
        $obj = json_decode(json_encode($_POST['method']));
        $gioHangCtl->handlePaymentMethod($obj);
        break;
}