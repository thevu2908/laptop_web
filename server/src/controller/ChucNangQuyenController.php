<?php
include("../model/ConnectDB.php");
include("../model/ChucNangQuyen/ChucNangQuyen.php");
include("../model/ChucNangQuyen/ChucNangQuyenRepo.php");
class ChucNangQuyenController{
    private $chucNangQuyenRepo;
    public function __construct(){
        $this->chucNangQuyenRepo = new ChucNangQuyenRepo();
    }
    public function getAllChucNangQuyen(){
        $tmp=$this->chucNangQuyenRepo->getAllChucNangQuyen();
        echo json_encode($tmp);
    }
    public function getChucNang($id){
        $tmp=$this->chucNangQuyenRepo->getChucNang($id);
        echo json_encode($tmp);
    }
}
$chucnangquyenctl=new ChucNangQuyenController();
$tmp=$_POST['action'];
switch($tmp){
    case "get":{
        $chucnangquyenctl->getAllChucNangQuyen();
        break;
    }
    case "getchucnang":{
        $id=$_POST['id'];
        $chucnangquyenctl->getChucNang($id);
        break;
    }
}
?>