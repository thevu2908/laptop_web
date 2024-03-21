<?php
include __DIR__ . '/../model/ConnectDB.php';
include __DIR__ . '/../model/HeDieuHanh/HeDieuHanh.php';
include __DIR__ . '/../model/HeDieuHanh/HeDieuHanhRepo.php';

class HeDieuHanhController {
    private $heDieuHanhRepo;

    public function __construct() {
        $this->heDieuHanhRepo = new HeDieuHanhRepo();
    }

    public function getData() {
        $oss = $this->heDieuHanhRepo->getData();
        $result = [];

        foreach ($oss as $os) {
            if ($os['trang_thai'] == 0) {
                $result[] = $os;
            }
        }
        
        echo json_encode($result);
    }

    public function getAll() {
        echo json_encode($this->heDieuHanhRepo->getData());
    }

    public function getOS($id) {
        echo json_encode($this->heDieuHanhRepo->getOS($id));
    }

    public function getLength() : int {
        return $this->heDieuHanhRepo->getLength();
    }

    public function add($object) {
        if ($this->heDieuHanhRepo->add($object)) {
            echo 'success';
        } else {
            echo 'fail';
        }
    }

    public function delete($id) {
        if ($this->heDieuHanhRepo->delete($id)) {
            echo 'success';
        } else {
            echo 'fail';
        }
    }
}

$heDieuHanhCtl = new HeDieuHanhController();
$action = $_POST['action'];

switch ($action) {
    case 'load':
        $heDieuHanhCtl->getData();
        break;
    case 'get-all':
        $heDieuHanhCtl->getAll();
        break;
    case 'get':
        $id = $_POST['id'];
        $heDieuHanhCtl->getOS($id);
        break;
    case 'add':
        $length = $heDieuHanhCtl->getLength();
        if ($length >= 0) {
            $length += 1;
            $id = 'HDH'.sprintf('%03d', $length);
            $name = $_POST['name'];

            $object = new HeDieuHanh($id, $name, 0);
            $heDieuHanhCtl->add($object);
        }
        break;
    case 'delete':
        $id = $_POST['id'];
        $heDieuHanhCtl->delete($id);
        break;
    default:
        break;
}