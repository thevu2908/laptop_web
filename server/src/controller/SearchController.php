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
    public function searchTb($search, $table, $start = 0, $limit = 8){
       echo json_encode(["pagination"=>$this->searchRepo->searchTable($search, $table, $start, $limit),"count"=>$this->searchRepo->getCountTable($table, $search)]);
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
    case "searchTb":{
        $table = $_GET['table'];
        $search = $_GET['search'];
        $page = !empty($_GET['page']) ? $_GET['page'] : 1;
        if (isset($_GET['limit'])) {
            $limit = $_GET['limit'] !== '' ? $_GET['limit'] : 8;
        } else {
            $limit = 8;
        }
        $id = isset($_GET['id']) ? $_GET['id'] : '';
        $start = ($page - 1) * $limit;
        $searchController->searchTb($search,$table,$start,$limit);
        break;
    }    
    default:
        break;
}