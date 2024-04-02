<?php
include("../model/ConnectDB.php");
include("../model/Panigation/PaginationRepo.php");

class PaginationController {
    private PaginationRepo $panigationrepo;
    function __construct(){
        $this->panigationrepo=new PaginationRepo();
    }
    function getPanigation($table,$start,$limit){
        $panigation=$this->panigationrepo->getPanigation($table,$start,$limit);
        $panigationjson=['count'=>$this->panigationrepo->getCount($table),'pagination'=>$panigation];
        echo json_encode($panigationjson);
    }
    function getSize($table){
        $size=$this->panigationrepo->getCount($table);
        echo json_encode($size);
    }
}

$panigationctl = new PaginationController();
$tmp=$_REQUEST['action'];
switch($tmp){
    case 'pagination':{
        $table=$_GET['table'];
        $page = (!empty($_GET['page'])) ? $_GET['page'] : 1;
        $limit = 8;
        $start = ($page - 1) * $limit;
        $panigationctl->getPanigation($table,$start,$limit);
        break;
    }
    default: {
        echo json_encode("Error");
    }
}
?>