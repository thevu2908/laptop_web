<?php
include __DIR__ . '/../model/ConnectDB.php';
include __DIR__ . '/../model/getIdTable.php';
class GetIdTableController{
    private $getIdTable;
    public function __construct() {
        $this->getIdTable = new getIdTable();
    }
    public function getSize($table) {
        echo json_encode($this->getIdTable->getIdInTable($table));
    }
}
$IdInTablectl=new GetIdTableController();
$action=$_REQUEST['action'];
switch($action){
    case "ma":{
        $table=$_POST['table'];
        $IdInTablectl->getSize($table);
        break;
    }
    default:{
        echo "Err";
    }
}
?>