<?php

include __DIR__ . '/../model/ConnectDB.php';
include __DIR__ . '/../model/TheLoai/TheLoai.php';
include __DIR__ . '/../model/TheLoai/TheLoaiRepo.php';

class TheLoaiController {
    private $theLoaiRepo;

    public function __construct() {
        $this->theLoaiRepo = new TheLoaiRepo();
    }

    public function getData() {
        $plugs = $this->theLoaiRepo->getData();
        $result = [];

        foreach ($plugs as $plug) {
            if ($plug['trang_thai'] == 0) {
                $result[] = $plug;
            }
        }
        
        echo json_encode($result);
    }

    public function getAll() {
        echo json_encode($this->theLoaiRepo->getData());
    }

    public function getType($id) {
        echo json_encode($this->theLoaiRepo->getType($id));
    }

    public function getLength() {
        echo $this->theLoaiRepo->getLength();
    }

    public function add($object) {
        if ($this->theLoaiRepo->add($object)) {
            echo 'success';
        } else {
            echo 'fail';
        }
    }

    public function delete($id) {
        if ($this->theLoaiRepo->delete($id)) {
            echo 'success';
        } else {
            echo 'fail';
        }
    }
}

$theloaiCtl = new TheLoaiController();
$action = $_POST['action'];

switch ($action) {
    case 'load':
        $theloaiCtl->getData();
        break;
    case 'get-all':
        $theloaiCtl->getAll();
        break;
    case 'get':
        $id = $_POST['id'];
        $theloaiCtl->getType($id);
        break;
    case 'add':
        $id = $_POST['id'];
        $name = $_POST['name'];
        
        $object = new TheLoai($id, $name, 0);
        $theloaiCtl->add($object);
        break;
    case 'delete':
        $id = $_POST['id'];
        $theloaiCtl->delete($id);
        break;
    default:
        break;
}