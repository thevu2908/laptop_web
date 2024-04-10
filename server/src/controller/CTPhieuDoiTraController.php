<?php
include("../model/ConnectDB.php");
include("../model/ChiTietPhieuDoiTra/ChiTietPhieuDoiTra.php");
include("../model/ChiTietPhieuDoiTra/ChiTietPhieuDoiTraRepo.php");
class ChiTietPhieuDoiTraController{
    private $chitietphieuDoiTraRepo;
    public function __construct(){
        $this->chitietphieuDoiTraRepo = new ChiTietPhieuDoiTraRepo();
    }
    public function themChiTietPhieuDoiTra($maphieudoitra,$listitemDoiTra){
        echo json_encode($this->chitietphieuDoiTraRepo->addChiTietPhieuDoiTra($maphieudoitra,$listitemDoiTra));
    }
}
$chitietphieuDoiTractl=new ChiTietPhieuDoiTraController();
$tmp=$_POST['action'];
switch($tmp){
    case "add":{
        $maphieudoitra=$_POST['maphieudoitra'];
        $listitemDoiTra=json_decode(json_encode($_POST['listitemDoiTra']), true);
        $chitietphieuDoiTractl->themChiTietPhieuDoiTra($maphieudoitra,$listitemDoiTra);
        break;
    }
}
?>