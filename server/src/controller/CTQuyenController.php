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
    function getHanhDong($maquyen,$machucnang){
        echo json_encode($this->chitietquyenRepo->getHanhDong($maquyen,$machucnang));
    }
    function addPhanQuyen($maquyen,$machucnang,$hanhdong){
        echo json_encode($this->chitietquyenRepo->addPhanQuyen($maquyen,$machucnang,$hanhdong));
    }
    function addMulPhanQuyen($maquyen,$listitemAdd){
        echo json_encode($this->chitietquyenRepo->addMulPhanQuyen($maquyen,$listitemAdd));
    }
    function updatePhanQuyen($maquyen,$machucnang,$hanhdong){
        echo json_encode($this->chitietquyenRepo->updatePhanQuyen($maquyen,$machucnang,$hanhdong));
    }
    function deletePhanQuyen($listitemRemove){
        echo json_encode($this->chitietquyenRepo->deletePhanQuyen($listitemRemove));
    }
    function getDSChucNang($maquyen){
        echo json_encode($this->chitietquyenRepo->getDSChucNang($maquyen));
    }
}
$tmp=$_REQUEST['action'];
$chitietquyenctl=new ChiTietQuyenController();
switch ($tmp){
    case "taskbar":{
        //$chitietquyenctl->getAllChiTietQuyen();
        $id=$_GET['maquyen'];
        $chitietquyenctl->getChucNang($id);
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
    }case "kiemtra":{
        $maquyen=$_POST['maquyen'];
        $machucnang=$_POST['machucnang'];
        $chitietquyenctl->getHanhDong($maquyen,$machucnang);
        break;
    }case "add":{
        $maquyen=$_POST['maquyen'];
        $machucnang=$_POST['machucnang'];
        $hanhdong=$_POST['hanhdong']==''?'X':$_POST['hanhdong'];
        $chitietquyenctl->addPhanQuyen($maquyen,$machucnang,$hanhdong);
        break;
    }case "addMul":{
        $maquyen=$_POST['maquyen'];
        //$machucnang=$_POST['machucnang'];
        $listitemAdd=json_decode(json_encode($_POST['listitemAdd']), true);
        $chitietquyenctl->addMulPhanQuyen($maquyen,$listitemAdd);
        break;
    }
    case "update":{
        $maquyen=$_POST['maquyen'];
        $machucnang=$_POST['machucnang'];
        $hanhdong=$_POST['hanhdong'];
        $chitietquyenctl->updatePhanQuyen($maquyen,$machucnang,$hanhdong);
        break;
    }case "delete":{
        $listitemRemove = json_decode(json_encode($_POST['listitemRemove']), true);
        $chitietquyenctl->deletePhanQuyen($listitemRemove);
        break;
    }case "dschucnang":{
        $maquyen=$_POST['maquyen'];
        $chitietquyenctl->getDSChucNang($maquyen);
        break;
    }
}
?>