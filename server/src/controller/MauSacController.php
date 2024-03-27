<?php

include __DIR__ . '/../model/ConnectDB.php';
include __DIR__ . '/../model/MauSac/MauSac.php';
include __DIR__ . '/../model/MauSac/MauSacRepo.php';

class MauSacController {
    private $mauSacRepo;

    public function __construct() {
        $this->mauSacRepo = new MauSacRepo();
    }

    public function getData() {
        $colors = $this->mauSacRepo->getData();
        $result = [];

        foreach ($colors as $color) {
            if ($color['trang_thai'] == 0) {
                $result[] = $color;
            }
        }
        
        echo json_encode($result);
    }

    public function getAll() {
        echo json_encode($this->mauSacRepo->getData());
    }

    public function getColor($id) {
        echo json_encode($this->mauSacRepo->getColor($id));
    }

    public function getId($name) {
        echo json_encode($this->mauSacRepo->getId($name));
    }

    public function getLength() : int {
        return $this->mauSacRepo->getLength();
    }

    public function add($object) {
        if ($this->mauSacRepo->add($object)) {
            echo 'success';
        } else {
            echo 'fail';
        }
    }

    public function delete($id) {
        if ($this->mauSacRepo->delete($id)) {
            echo 'success';
        } else {
            echo 'fail';
        }
    }
}

$mauSacCtl = new MauSacController();
$action = $_POST['action'];

switch ($action) {
    case 'load':
        $mauSacCtl->getData();
        break;
    case 'get-all':
        $mauSacCtl->getAll();
        break;
    case 'get':
        $id = $_POST['id'];
        $mauSacCtl->getColor($id);
        break;
    case 'get-id':
        $name = $_POST['name'];
        $mauSacCtl->getId($name);
        break;
    case 'add':
        $id = $_POST['id'];
        $name = $_POST['name'];
        
        $color = new MauSac($id, $name, 0);
        $mauSacCtl->add($color);
        break;
    case 'delete':
        $id = $_POST['id'];
        $mauSacCtl->delete($id);
        break;
    default:
        break;
}