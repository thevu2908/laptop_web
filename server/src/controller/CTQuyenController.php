<?php
include("../model/ConnectDB.php");
include("../model/ChiTietQuyen/ChiTietQuyen.php");
include("../model/ChiTietQuyen/ChiTietQuyenRepo.php");
class ChiTietQuyenController{
    private ChiTietQuyenRepo $chitietquyenRepo;
    public function __construct(){
        $this->chitietquyenRepo = new ChiTietQuyenRepo();
    }
    public function getAllChiTietQuyen(){
        echo json_encode($this->chitietquyenRepo->getAllChiTietQuyen());
    }
    function getAction($maquyen,$machucnang){
       echo json_encode($this->chitietquyenRepo->getAction($maquyen,$machucnang));
    }
    function getChucNang($id){
        echo json_encode($this->chitietquyenRepo->getChucNang($id));
    }
}
$tmp=$_POST['action'];
$chitietquyenctl=new ChiTietQuyenController();
switch ($tmp){
    case "load":{
        $chitietquyenctl->getAllChiTietQuyen();
        break;
    }
    case "get":{
        $maquyen=$_POST['maquyen'];
        $machucnang=$_POST['machucnang'];
        $chitietquyenctl->getAction($maquyen,$machucnang);
        break;
    }case "phanquyen":{
        $id=$_POST['id'];
        $chitietquyenctl->getChucNang($id);
        break;
    }
}
?>