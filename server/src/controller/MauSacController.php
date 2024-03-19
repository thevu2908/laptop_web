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

    public function getAllColors() {
        echo json_encode($this->mauSacRepo->getData());
    }

    public function getColor($colorId) {
        echo json_encode($this->mauSacRepo->getColor($colorId));
    }

    public function getColorsLength() {
        echo $this->mauSacRepo->getColorsLength();
    }

    public function addColor($color) {
        if ($this->mauSacRepo->addColor($color)) {
            echo 'success';
        } else {
            echo 'fail';
        }
    }

    public function deleteColor($colorId) {
        if ($this->mauSacRepo->deleteColor($colorId)) {
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
        $mauSacCtl->getAllColors();
        break;
    case 'get':
        $colorId = $_POST['colorId'];
        $mauSacCtl->getColor($colorId);
        break;
    case 'add':
        $colorId = $_POST['colorId'];
        $colorName = $_POST['colorName'];
        
        $color = new MauSac($colorId, $colorName, 0);
        $mauSacCtl->addColor($productDetail);
        break;
    case 'delete':
        $colorId = $_POST['colorId'];
        $mauSacCtl->deleteColor($colorId);
        break;
    default:
        break;
}