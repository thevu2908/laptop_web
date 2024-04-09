<?php
include("../model/ConnectDB.php");
include("../model/PhieuDoiTra/PhieuDoiTra.php");
include("../model/PhieuDoiTra/PhieuDoiTraRepo.php");
class PhieuDoiTraController{
    private $phieuDoiTraRepo;
    public function __construct(){
        $this->phieuDoiTraRepo = new PhieuDoiTraRepo();
    }
    public function addPhieuDoiTra($mapdt,$manhanvien,$mahoadon,$ngaytra,$tongsoluong,$tongtientra,$trangthai){
        json_encode($this->phieuDoiTraRepo->addPhieuDoiTra($mapdt,$manhanvien,$mahoadon,$ngaytra,$tongsoluong,$tongtientra,$trangthai));
    }
}
$phieuDoiTractl=new PhieuDoiTraController();
$action=$_POST['action'];
switch($action){
    case "add":{
        $mapdt=$_POST['maphieudoitra'];
        $manhanvien=$_POST['manhanvien'];
        $mahoadon=$_POST['mahoadon'];
        $ngaytra=$_POST['ngaydoitra'];
        $tongsoluong=$_POST['tongsoluongSP'];
        $tongtientra=$_POST['thanhtienSP'];
        $trangthai=0;
        $phieuDoiTractl->addPhieuDoiTra($mapdt,$manhanvien,$mahoadon,$ngaytra,$tongsoluong,$tongtientra,$trangthai);
        break;
    }
}
?>