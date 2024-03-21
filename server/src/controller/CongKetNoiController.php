<?php

include __DIR__ . '/../model/ConnectDB.php';
include __DIR__ . '/../model/CongKetNoi/CongKetNoi.php';
include __DIR__ . '/../model/CongKetNoi/CongKetNoiRepo.php';

class CongKetNoiController {
    private $congketnoiRepo;

    public function __construct() {
        $this->congketnoiRepo = new CongKetNoiRepo();
    }

    public function getData() {
        $plugs = $this->congketnoiRepo->getData();
        $result = [];

        foreach ($plugs as $plug) {
            if ($plug['trang_thai'] == 0) {
                $result[] = $plug;
            }
        }
        
        echo json_encode($result);
    }

    public function getAll() {
        echo json_encode($this->congketnoiRepo->getData());
    }

    public function getPlug($id) {
        echo json_encode($this->congketnoiRepo->getPlug($id));
    }

    public function getLength() : int {
        return $this->congketnoiRepo->getLength();
    }

    public function add($object) {
        if ($this->congketnoiRepo->add($object)) {
            echo 'success';
        } else {
            echo 'fail';
        }
    }

    public function delete($id) {
        if ($this->congketnoiRepo->delete($id)) {
            echo 'success';
        } else {
            echo 'fail';
        }
    }
}

$congketnoiCtl = new CongKetNoiController();
$action = $_POST['action'];

switch ($action) {
    case 'load':
        $congketnoiCtl->getData();
        break;
    case 'get-all':
        $congketnoiCtl->getAll();
        break;
    case 'get':
        $id = $_POST['id'];
        $congketnoiCtl->getPlug($id);
        break;
    case 'add':
        $length = $congketnoiCtl->getLength();
        if ($length >= 0) {
            $length += 1;
            $id = 'CKN'.sprintf('%03d', $length);
            $name = $_POST['name'];
            
            $object = new CongKetNoi($id, $name, 0);
            $congketnoiCtl->add($object);
        }
        break;
    case 'delete':
        $id = $_POST['id'];
        $congketnoiCtl->delete($id);
        break;
    default:
        break;
}