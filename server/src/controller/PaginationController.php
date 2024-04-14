<?php
include("../model/ConnectDB.php");
include("../model/Panigation/PaginationRepo.php");

class PaginationController {
    private PaginationRepo $paginationRepo;
    function __construct() {
        $this->paginationRepo = new PaginationRepo();
    }

    function getPagination($table, $start, $limit, $id) {
        $pagination = $this->paginationRepo->getPagination($table, $start, $limit, $id);
        $paginationJson = ['count' => $this->paginationRepo->getCount($table, $id), 'pagination' => $pagination];
        echo json_encode($paginationJson);
    }
}

$paginationCtl = new PaginationController();
$action = $_REQUEST['action'];

switch ($action) {
    case 'pagination':
        $table = $_GET['table'];
        $id = isset($_GET['id']) ? $_GET['id'] : '';
        $page = !empty($_GET['page']) ? $_GET['page'] : 1;
        if (isset($_GET['limit'])) {
            $limit = $_GET['limit'] !== '' ? $_GET['limit'] : 8;
        } else {
            $limit = 8;
        }
        $id = isset($_GET['id']) ? $_GET['id'] : '';
        $start = ($page - 1) * $limit;
        $paginationCtl->getPagination($table, $start, $limit, $id);
        break;
    default:
        echo json_encode("Error");
}
