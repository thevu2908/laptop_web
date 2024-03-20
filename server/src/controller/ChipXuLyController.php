<?php

include __DIR__ . '/../model/ConnectDB.php';
include __DIR__ . '/../model/ChipXuLy/ChipXuLy.php';
include __DIR__ . '/../model/ChipXuLy/ChipXuLyRepo.php';

class ChipXuLyController {
    private $chipXuLyRepo;

    public function __construct() {
        $this->chipXuLyRepo = new ChipXuLyRepo();
    }

    public function getData() {
        $cpus = $this->chipXuLyRepo->getData();
        $result = [];

        foreach ($cpus as $cpu) {
            if ($cpu['trang_thai'] == 0) {
                $result[] = $cpu;
            }
        }
        
        echo json_encode($result);
    }

    public function getAll() {
        echo json_encode($this->chipXuLyRepo->getData());
    }

    public function getCPU($cpuId) {
        echo json_encode($this->chipXuLyRepo->getCPU($cpuId));
    }

    public function getLength() {
        echo $this->chipXuLyRepo->getLength();
    }

    public function addCPU($cpu) {
        if ($this->chipXuLyRepo->addCPU($cpu)) {
            echo 'success';
        } else {
            echo 'fail';
        }
    }

    public function deleteCPU($cpuId) {
        if ($this->chipXuLyRepo->deleteCPU($cpuId)) {
            echo 'success';
        } else {
            echo 'fail';
        }
    }
}

$cpuCtl = new ChipXuLyController();
$action = $_POST['action'];

switch ($action) {
    case 'load':
        $cpuCtl->getData();
        break;
    case 'get-all':
        $cpuCtl->getAll();
        break;
    case 'get':
        $cpuId = $_POST['cpuId'];
        $cpuCtl->getCPU($cpuId);
        break;
    case 'add':
        $cpuId = $_POST['cpuId'];
        $cpuName = $_POST['cpuName'];
        
        $cpu = new ChipXuLy($cpuId, $cpuName, 0);
        $cpuCtl->addCPU($cpu);
        break;
    case 'delete':
        $cpuId = $_POST['cpuId'];
        $cpuCtl->deleteCPU($cpuId);
        break;
    default:
        break;
}