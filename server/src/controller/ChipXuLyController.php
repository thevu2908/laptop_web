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

    public function getCPU($id) {
        echo json_encode($this->chipXuLyRepo->getCPU($id));
    }

    public function getLength() : int {
        return $this->chipXuLyRepo->getLength();
    }

    public function add($object) {
        if ($this->chipXuLyRepo->add($object)) {
            echo 'success';
        } else {
            echo 'fail';
        }
    }

    public function delete($id) {
        if ($this->chipXuLyRepo->delete($id)) {
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
        $id = $_POST['id'];
        $cpuCtl->getCPU($id);
        break;
    case 'add':
        $length = $cpuCtl->getLength();
        if ($length >= 0) {
            $length += 1;
            $id = 'CXL'.sprintf('%03d', $length);
            $name = $_POST['name'];
            
            $object = new ChipXuLy($id, $name, 0);
            $cpuCtl->add($object);
        }
        break;
    case 'delete':
        $id = $_POST['id'];
        $cpuCtl->delete($id);
        break;
    default:
        break;
}