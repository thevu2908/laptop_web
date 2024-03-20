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
        $plugs = $this->ctcknRepo->getData();
        $result = [];

        foreach ($plugs as $plug) {
            if ($plug['trang_thai'] == 0) {
                $result[] = $plug;
            }
        }
        
        echo json_encode($result);
    }

    public function getAll() {
        echo json_encode($this->ctcknRepo->getData());
    }

    public function getChiTietCong($plugId, $productDetailId) {
        echo json_encode($this->ctcknRepo->getChiTietCong($plugId, $productDetailId));
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
    case 'load':
        $ctcknCtl->getData();
        break;
    case 'get-all':
        $ctcknCtl->getAll();
        break;
    case 'get':
        $plugId = $_POST['plugId'];
        $productDetailId = $_POST['productDetailId'];
        $ctcknCtl->getChiTietCong($plugId, $productDetailId);
        break;
    case 'add':
        $id = $_POST['id'];
        $name = $_POST['name'];
        
        $object = new CardDoHoa($id, $name, 0);
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