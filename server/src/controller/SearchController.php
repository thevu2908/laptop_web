<?php

include __DIR__ . '/../model/ConnectDB.php';
include __DIR__ . '/../model/Search/SearchRepo.php';

class SearchController {
    private $searchRepo;

    public function __construct() {
        $this->searchRepo = new SearchRepo();
    }

    public function search($search, $table) {
        echo json_encode($this->searchRepo->search($search, $table));
        // echo $search;
    }
}

$searchController = new SearchController();
$action = $_GET['action'];

switch ($action) {
    case 'search':
        $search = $_GET['search'];
        $table = $_GET['table'];
        $searchController->search($search, $table);
        break;
    default:
        break;
}