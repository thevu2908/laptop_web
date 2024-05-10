<?php
include __DIR__ . '/../model/ConnectDB.php';
include __DIR__ . '/../model/ChiTietPhieuNhap/ChiTietPhieuNhap.php';
include __DIR__ . '/../model/ChiTietPhieuNhap/ChiTietPhieuNhapRepo.php';

class ChiTietPhieuNhapController {
    private $chitietphieunhapRepo;

    public function __construct() {
        $this->chitietphieunhapRepo = new ChiTietPhieuNhapRepo();
    }

    public function getImportInvoiceDetail($id) {
        echo json_encode($this->chitietphieunhapRepo->getImportInvoiceDetail($id));
    }
}

$action = isset($_REQUEST['action']) ? $_REQUEST['action'] : '';

switch ($action) {
    case 'get':
        $id = $_POST['id'];
        $chitietphieunhapCtl = new ChiTietPhieuNhapController();
        $chitietphieunhapCtl->getImportInvoiceDetail($id);
        break;
    default:
        break;
}