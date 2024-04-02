<?php

include __DIR__ . '/../model/ConnectDB.php';
include __DIR__ . '/../model/CardDoHoa/CardDoHoa.php';
include __DIR__ . '/../model/CardDoHoa/CardDoHoaRepo.php';

class CardDoHoaController {
    private $cardDoHoaRepo;

    public function __construct() {
        $this->cardDoHoaRepo = new CardDoHoaRepo();
    }

    public function getData() {
        $gpus = $this->cardDoHoaRepo->getData();
        $result = [];

        foreach ($gpus as $gpu) {
            if ($gpu['trang_thai'] == 0) {
                $result[] = $gpu;
            }
        }
        
        echo json_encode($result);
    }

    public function getAll() {
        echo json_encode($this->cardDoHoaRepo->getData());
    }

    public function getGPU($id) {
        echo json_encode($this->cardDoHoaRepo->getGPU($id));
    }

    public function getId($name) {
        echo json_encode($this->cardDoHoaRepo->getId($name));
    }
 
    public function getLength() : int {
        return $this->cardDoHoaRepo->getLength();
    }

    public function add($object) {
        if ($this->cardDoHoaRepo->add($object)) {
            echo 'success';
        } else {
            echo 'fail';
        }
    }

    public function delete($id) {
        if ($this->cardDoHoaRepo->delete($id)) {
            echo 'success';
        } else {
            echo 'fail';
        }
    }
}

$cardDoHoaCtl = new CardDoHoaController();
$action = $_POST['action'];

switch ($action) {
    case 'load':
        $cardDoHoaCtl->getData();
        break;
    case 'get-all':
        $cardDoHoaCtl->getAll();
        break;
    case 'get':
        $id = $_POST['id'];
        $cardDoHoaCtl->getGPU($id);
        break;
    case 'get-id':
        $name = $_POST['name'];
        $cardDoHoaCtl->getId($name);
        break;
    case 'add':
        $length = $cardDoHoaCtl->getLength();
        if ($length >= 0) {
            $length += 1;
            $id = 'CDH'.sprintf('%03d', $length);
            $name = $_POST['name'];
            
            $object = new CardDoHoa($id, $name, 0);
            $cardDoHoaCtl->add($object);
        }
        break;
    case 'delete':
        $id = $_POST['id'];
        $cardDoHoaCtl->delete($id);
        break;
    default:
        break;
}