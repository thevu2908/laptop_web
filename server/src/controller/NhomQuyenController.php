<?php
include("../model/ConnectDB.php");
include("../model/NhomQuyen/NhomQuyen.php");
include("../model/NhomQuyen/NhomQuyenRepo.php");
class NhomQuyenController {
    private $nhomquyenrepos;
    function __construct()
    {
        $this->nhomquyenrepos=new NhomQuyenRepo();
    }
    function getAllNhomQuyen(){
        $nhomquyen=$this->nhomquyenrepos->getAllNhomQuyen();
        echo json_encode($nhomquyen);
    }
    function getNhomQuyen($ma_quyen){
        echo json_encode($this->nhomquyenrepos->getNhomQuyen($ma_quyen));
    }
    function addNhomQuyen($ma_quyen,$ten_quyen){
        if($this->nhomquyenrepos->addNhomQuyen($ma_quyen,$ten_quyen)){
            echo "Add Successfully";
        }else{
            echo "Add Fail";
        }
    }
    function deleteNhomQuyen($ma_quyen){
        if($this->nhomquyenrepos->deleteNhomQuyen($ma_quyen)){
            echo "Delete Successfully";
        }else{
            echo "Delete Fail";
        }
    }
    function updateNhomQuyen($ma_quyen,$ten_quyen){
        if($this->nhomquyenrepos->updateNhomQuyen($ma_quyen,$ten_quyen)){
            echo "Update Successfully";
        }else{
            echo "Update Fail";
        }
    }
    function searchNhomQuyen($search){
        $nhomquyen= $this->nhomquyenrepos->searchNhomQuyen($search);
        echo json_encode($nhomquyen);
    }
    function getSize(){
        echo $this->nhomquyenrepos->getSize();
    }
}

$nhomquyenctl=new NhomQuyenController();
$tmp=$_POST['action'];
switch($tmp) {
    case "Add":{
        $ma_quyen=$_POST['maquyen'];
        $ten_quyen=$_POST['tenquyen'];
        $nhomquyenctl->addNhomQuyen($ma_quyen,$ten_quyen);
        break;
    }
    case "Load":{
        $nhomquyenctl->getAllNhomQuyen();
        break;
    }
    case "Delete":{
        $ma_quyen=$_POST['id'];
        $nhomquyenctl->deleteNhomQuyen($ma_quyen);
        break;
    }case "Get":{
        $ma_quyen=$_POST['id'];
        $nhomquyenctl->getNhomQuyen($ma_quyen);
        break;
    }
    case "Update":{
        $ma_quyen=$_POST['maquyen'];
        $ten_quyen=$_POST['tenquyen'];
        $nhomquyenctl->updateNhomQuyen($ma_quyen,$ten_quyen);
        break;
    }
    case "Search":{
        $search=$_POST['search'];
        $nhomquyenctl->searchNhomQuyen($search);
        break;
    }
    case "Size":{
        $nhomquyenctl->getSize();
        break;
    }
}
?>