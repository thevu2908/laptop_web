<?php
include("../model/ConnectDB.php");
include("../model/ChiTietPhieuDoiTra/ChiTietPhieuDoiTra.php");
include("../model/ChiTietPhieuDoiTra/ChiTietPhieuDoiTraRepo.php");
class ChiTietPhieuDoiTraController{
    private $chitietphieuDoiTraRepo;
    public function __construct(){
        $this->chitietphieuDoiTraRepo = new ChiTietPhieuDoiTraRepo();
    }
    public function addChiTietPhieuDoiTra($mapdt,$ma_imei,$lydo,$giasp,$soluong,$thanhtien,$masanpham){
        echo json_encode($this->chitietphieuDoiTraRepo->addChiTietPhieuDoiTra($mapdt,$ma_imei,$lydo,$giasp,$soluong,$thanhtien,$masanpham));
    }
}
$chitietphieuDoiTractl=new ChiTietPhieuDoiTraController();
$action=$_POST['action'];
switch($action){
    case "add":{
        $maphieudoitra=$_POST['maphieudoitra'];
        $imei=$_POST['ime'];
        $lydo=$_POST['lydo'];
        $giasanpham=$_POST['giasanpham'];
        $soluong=$_POST['soluong'];
        $thanhtien=$_POST['thanhtien'];
        $masanpham=$_POST['masanpham'];
        $chitietphieuDoiTractl->addChiTietPhieuDoiTra($maphieudoitra,$imei,$lydo,$giasanpham,$soluong,$thanhtien,$masanpham);
        break;
    }
}
?>