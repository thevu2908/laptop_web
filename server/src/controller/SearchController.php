<?php

include __DIR__ . '/../model/ConnectDB.php';
include __DIR__ . '/../model/Search/SearchRepo.php';

class SearchController {
    private $searchRepo;

    public function __construct() {
        $this->searchRepo = new SearchRepo();
    }

    public function search($search, $table, $start, $limit, $id) {
        $results = [];
        $data = $this->searchRepo->search($search, $table, $start, $limit, $id);
        foreach ($data as $item) {
            if ($item['trang_thai'] == 0) $results[] = $item;
        }
        echo json_encode(['count'=>$this->searchRepo->getCount($table, $search, $id), "pagination"=>$results]);
    }
    public function filterTb($search, $table, $start, $limit){
       echo json_encode(["pagination"=>$this->searchRepo->filterTable($search, $table, $start, $limit),"count"=>$this->searchRepo->getCountFilterTable($table, $search)]);
    }
}

$searchController = new SearchController();
$action = $_GET['action'];

switch ($action) {
    case 'search':
        $search = $_GET['search'];
        $table = $_GET['table'];
        $page = !empty($_GET['page']) ? $_GET['page'] : 1;
        $limit = isset($_GET['$limit']) ? $_GET['limit'] : 8;
        $id = isset($_GET['id']) ? $_GET['id'] : '';
        $start = ($page - 1) * $limit;
        $searchController->search($search, $table, $start, $limit, $id);
        break;
    case "filter":{
        $search = $_GET['search'];
        $table = $_GET['table'];
        $page = !empty($_GET['page']) ? $_GET['page'] : 1;
        $limit = isset($_GET['$limit']) ? $_GET['limit'] : 8;
        $id = isset($_GET['id']) ? $_GET['id'] : '';
        $start = ($page - 1) * $limit;
        $searchController->filterTb($search,$table,$start,$limit);
        break;
    }    
    default:
        break;
}