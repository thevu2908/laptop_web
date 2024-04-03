<?php
include("../model/ConnectDB.php");
include("../model/Panigation/PaginationRepo.php");

class PaginationController {
    private PaginationRepo $paginationRepo;
    function __construct() {
        $this->paginationRepo = new PaginationRepo();
    }

    function getPagination($table, $start, $limit) {
        $pagination = $this->paginationRepo->getPagination($table, $start, $limit);
        $paginationJson = ['count' => $this->paginationRepo->getCount($table), 'pagination' => $pagination];
        echo json_encode($paginationJson);
    }

    function getSize($table) {
        $size = $this->paginationRepo->getCount($table);
        echo json_encode($size);
    }
}

$paginationCtl = new PaginationController();
$action = $_REQUEST['action'];

switch ($action) {
    case 'pagination':
        $table = $_GET['table'];
        $page = !empty($_GET['page']) ? $_GET['page'] : 1;
        $limit = $_GET['limit'] !== '' ? $_GET['limit'] : 8;
        $start = ($page - 1) * $limit;
        $paginationCtl->getPagination($table, $start, $limit);
        break;
    default:
        echo json_encode("Error");
}
