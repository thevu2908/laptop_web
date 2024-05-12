<?php

require_once __DIR__ . '/../model/ConnectDB.php';
include __DIR__ . '/../model/PhieuNhap/PhieuNhap.php';
include __DIR__ . '/../model/PhieuNhap/PhieuNhap1Repo.php';
include __DIR__ . '/../controller/CTPhieuNhapController.php';
include __DIR__ . '/../controller/CTSanPhamController.php';
include __DIR__ . '/../controller/ImeiController.php';

class PhieuNhap1Controller {
    private $phieunhapRepo;
    private $ctpnController;
    private $ctspController;
    private $imeiController;

    public function __construct() {
        $this->phieunhapRepo = new PhieuNhap1Repo();
        $this->ctspController = new CTSanPhamController();
        $this->imeiController = new ImeiController();
        $this->ctpnController = new ChiTietPhieuNhapController();
    }

    public function getData() {
        $phieunhaps = $this->phieunhapRepo->getData(); // Sửa tại đây, sử dụng $this->phieunhapRepo
        $result = [];

        foreach ($phieunhaps as $phieunhap) {
            if ($phieunhap['trang_thai'] == 0) {
                $result[] = $phieunhap;
            }
        }

        echo json_encode($result);
    }

    public function getImportInvoice($id) {
        echo json_encode($this->phieunhapRepo->getImportInvoice($id));
    }

    public function confirmImportInvoice($id) {
        $importInvoiceDetails = $this->ctpnController->getImportInvoiceDetail($id);

        foreach ($importInvoiceDetails as $importInvoiceDetail) {
            $productDetailId = $importInvoiceDetail['ma_ctsp'];
            $quantity = $importInvoiceDetail['so_luong'];
            $price = $importInvoiceDetail['gia_tien'];

            for ($i = 0; $i < $quantity; $i++) {
                if (!$this->imeiController->addImei($productDetailId)) return false;
            }

            if (!$this->ctspController->confirmImportUpdateProductDetail($productDetailId, $quantity, $price)) return false;
        }
        return $this->phieunhapRepo->confirmImportInvoice($id);
    }
}

$action = isset($_REQUEST['action']) ? $_REQUEST['action'] : '';

switch ($action) {
    case 'load':
        $phieunhapCtl = new PhieuNhap1Controller(); 
        $phieunhapCtl->getData(); 
        break;
    case 'get-import':
        $id = $_POST['id'];
        $phieunhapCtl = new PhieuNhap1Controller();
        $phieunhapCtl->getImportInvoice($id);
        break;
    case 'confirm':
        $id = $_POST['id'];
        $phieunhapCtl = new PhieuNhap1Controller();
        echo json_encode($phieunhapCtl->confirmImportInvoice($id));
        break;
    default:
        break;
}