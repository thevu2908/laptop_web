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
    public function getMaChucNang($tenchucnang){
       echo json_encode($this->chucNangQuyenRepo->getMaChucNang($tenchucnang));
    }
    public function addChucNang($machucnang,$tenchucnang){
       echo json_encode($this->chucNangQuyenRepo->addChucNang($machucnang,$tenchucnang));
    }
    public function updateChucNang($machucnang,$tenchucnang){
        echo json_encode($this->chucNangQuyenRepo->updateChucNang($machucnang,$tenchucnang));
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
    }case "machucnang":{
        $tenchucnang=$_POST['tenchucnang'];
        $chucnangquyenctl->getMaChucNang($tenchucnang);
        break;
    }case "add":{
        $maChucNang=$_POST['maChucNang'];
        $tenChucNang=$_POST['tenChucNang'];
        $chucnangquyenctl->addChucNang($maChucNang,$tenChucNang);
        break;
    }case "update":{
        $maChucNang=$_POST['maChucNang'];
        $tenChucNang=$_POST['tenChucNang'];
        $chucnangquyenctl->updateChucNang($maChucNang,$tenChucNang);
        break;
    }
}
?>