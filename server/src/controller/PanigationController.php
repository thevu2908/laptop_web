<?php
include("../model/ConnectDB.php");
include("../model/Panigation/PanigationRepo.php");
class PanigationController{
    private $panigationrepo;
    function __construct__(){
        $this->panigationrepo=new PannigatinRepo();
    }
    function getPanigation($table,$start,$limit){
        $panigation=$this->panigationrepo->getPanigation($table,$start,$limit);
        echo json_encode($panigation);
    }
    function getSize($table){
        echo $this->panigationrepo->getSize($table);
    }
}
$action=$_POST['action'];
$panigationctl=new PanigationController();
switch($action){
    case 'panigation':{
        $table=$_POST['table'];
        $page=isset($_POST['page'])?$_POST['page']:1;
        $limit=8;
        $start=($page - 1) * $limit;
        $total=$panigationctl->getSize($table);
        break;
    }
}
?>