<?php
include("../model/ConnectDB.php");
include("../model/PhieuDoiTra/PhieuDoiTra.php");
include("../model/PhieuDoiTra/PhieuDoiTraRepo.php");
class PhieuDoiTraController{
    private $phieuDoiTraRepo;
    public function __construct(){
        $this->phieuDoiTraRepo = new PhieuDoiTraRepo();
    }
    public function themPhieuDoiTra($mapdt,$manhanvien,$mahoadon,$ngaytra,$tongsoluong,$tongtientra,$trangthai){
        echo json_encode($this->phieuDoiTraRepo->addPhieuDoiTra($mapdt,$manhanvien,$mahoadon,$ngaytra,$tongsoluong,$tongtientra,$trangthai));
    }
    public function kiemtraDoiTra($sodienthoai){
        echo json_encode($this->phieuDoiTraRepo->tracuuDoiTra($sodienthoai));
    }
}
$phieuDoiTractl=new PhieuDoiTraController();
$tmp=$_POST['action'];
switch($tmp){
    case "add":{
        $mapdt=$_POST['maphieudoitra'];
        $manhanvien=$_POST['manhanvien'];
        $mahoadon=$_POST['mahoadon'];
        $ngaytra=date("Y-m-d H:i:s");
        $tongsoluong=(int)$_POST['tongsoluongSP'];
        $tongtientra=(float)$_POST['thanhtienSP'];
        $trangthai=0;
        $phieuDoiTractl->themPhieuDoiTra($mapdt,$manhanvien,$mahoadon,$ngaytra,$tongsoluong,$tongtientra,$trangthai);
        break;
    }case "tracuudoitra":{
        $sodienthoai=$_POST['sodienthoai'];
        $phieuDoiTractl->kiemtraDoiTra($sodienthoai);
        break;
    }
}
?>