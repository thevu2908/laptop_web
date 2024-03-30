<?php
include __DIR__ . '/../model/ConnectDB.php';
include __DIR__ . '/../model/ChiTietCongKetNoi/ChiTietCongKetNoi.php';
include __DIR__ . '/../model/ChiTietCongKetNoi/ChiTietCongKetNoiRepo.php';

class ChiTietCongKetNoiController {
    private $ctcknRepo;

    public function __construct() {
        $this->ctcknRepo = new ChiTietCongKetNoiRepo();
    }

    public function getData() {
        echo json_encode($this->ctcknRepo->getData());
    }

    public function getChiTietCong($productDetailId) {
        echo json_encode($this->ctcknRepo->getChiTietCong($productDetailId));
    }

    public function getProductPlugs($productId) {
        echo json_encode($this->ctcknRepo->getProductPlugs($productId));
    }

    public function getLength() {
        echo $this->ctcknRepo->getLength();
    }

    public function add($object) {
        if ($this->ctcknRepo->add($object)) {
            echo 'success';
        } else {
            echo 'fail';
        }
    }

    public function delete($plugId, $productDetailId) {
        if ($this->ctcknRepo->delete($plugId, $productDetailId)) {
            echo 'success';
        } else {
            echo 'fail';
        }
    }
}

$ctcknCtl = new ChiTietCongKetNoiController();
$action = $_POST['action'];

switch ($action) {
    case 'get-data':
        $ctcknCtl->getData();
        break;
    case 'get':
        $productDetailId = $_POST['productDetailId'];
        $ctcknCtl->getChiTietCong($productDetailId);
        break;
    case 'get-plug':
        $productId = $_POST['productId'];
        $ctcknCtl->getProductPlugs($productId);
        break;
    case 'add':
        $plugId = $_POST['plugId'];
        $productDetailId = $_POST['productDetailId'];
        
        $object = new ChiTietCongKetNoi($plugId, $productDetailId);
        $ctcknCtl->add($object);
        break;
    case 'delete':
        $plugId = $_POST['plugId'];
        $productDetailId = $_POST['productDetailId'];
        $ctcknCtl->delete($plugId, $productDetailId);
        break;
    default:
        break;
}