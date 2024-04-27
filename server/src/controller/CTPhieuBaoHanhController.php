<?php
include("../model/ConnectDB.php");
include("../model/ChiTietPhieuBaoHanh/ChiTietPhieuBaoHanh.php");
include("../model/ChiTietPhieuBaoHanh/ChiTietPhieuBaoHanhRepo.php");
class CTPhieuBaoHanhController{
    private $chitietphieubaohanhRepo;
    public function __construct(){
        $this->chitietphieubaohanhRepo=new ChiTietPhieuBaoHanhRepo();
    }
    public function themCTPhieuBaoHanh($maphieubaohanh,$listitemBaoHanh){
        echo json_encode($this->chitietphieubaohanhRepo->addChiTietPhieuBaoHanh($maphieubaohanh,$listitemBaoHanh));
    }

}
$chitietphieubaohanhctl=new CTPhieuBaoHanhController();
$tmp=$_POST['action'];
switch($tmp){
    case 'add':{
        $maphieubaohanh=$_POST['maphieubaohanh'];
        $listitemBaoHanh=$_POST['listitemBaoHanh'];
        $chitietphieubaohanhctl->themCTPhieuBaoHanh($maphieubaohanh,$listitemBaoHanh);
        break;
    }
}
?>