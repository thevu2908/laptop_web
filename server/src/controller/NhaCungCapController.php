<?php

include __DIR__ . '/../model/ConnectDB.php';
include __DIR__ . '/../model/NhaCungCap/NhaCungCap.php';
include __DIR__ . '/../model/NhaCungCap/NhaCungCapRepo.php';

class NhaCungCapController
{
    private $NhaCungCapRepo;

    public function __construct()
    {
        $this->NhaCungCapRepo = new NhaCungCapRepo();
    }

    public function getData()
    {
        $employess = $this->NhaCungCapRepo->getData();
        $result = [];

        foreach ($employess as $employee) {
            if ($employee['trang_thai'] == 0) {
                $result[] = $employee;
            }
        }

        echo json_encode($result);
    }
    public function addSuppiler($mancc, $tenncc, $diachi, $sodienthoai)
    {
        echo json_encode($this->NhaCungCapRepo->addSuppiler($mancc, $tenncc, $diachi, $sodienthoai));
    }
    public function updateSuppiler($mancc, $tenncc, $diachi, $sodienthoai)
    {
        echo json_encode($this->NhaCungCapRepo->updateSuppiler($mancc, $tenncc, $diachi, $sodienthoai));
    }

    public function deleteNCC($productId)
    {
        if ($this->NhaCungCapRepo->deleteNCC($productId)) {
            echo 'success';
        } else {
            echo 'fail';
        }
    }

    public function getSuppiler($mancc)
    {
        echo json_encode($this->NhaCungCapRepo->getSuppiler($mancc));
    }
}

$nccCtl = new NhaCungCapController();
$action = $_POST['action'];

switch ($action) {
    case 'load':
        $nccCtl->getData();
        break;
    case 'add':
        $mancc = $_POST['mancc'];
        $tenncc = $_POST['tenncc'];
        $diachi = $_POST['diachi'];
        $sodienthoai = $_POST['sodienthoai'];
        $nccCtl->addSuppiler($mancc, $tenncc, $diachi, $sodienthoai);
        break;
    case 'update':
        $mancc = $_POST['mancc'];
        $tenncc = $_POST['tenncc'];
        $diachi = $_POST['diachi'];
        $sodienthoai = $_POST['sodienthoai'];
        $nccCtl->updateSuppiler($mancc, $tenncc, $diachi, $sodienthoai);
        break;
    case 'get':
        $mancc = $_POST['mancc'];
        $nccCtl->getSuppiler($mancc);
        break;
    case 'delete':
        $productId = $_POST['mancc'];
        $nccCtl->deleteNCC($productId);
        break;
    default:
        break;
}
