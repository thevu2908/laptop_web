<?php
include("../model/ConnectDB.php");
include("../model/PhieuBaoHanh/PhieuBaoHanh.php");
include("../model/PhieuBaoHanh/PhieuBaoHanhRepo.php");
class PhieuBaoHanhController{
    private $phieubaohanhRepo;
    public function __construct(){
        $this->phieubaohanhRepo=new PhieuBaoHanhRepo();
    }
    public function themPhieuBaoHanh($maphieubaohanh,$manhanvien,$makhachhang,$mahoadon,$ngaybaohanh,$ngaytra,$trangthai,$tinhtrang){
        echo json_encode($this->phieubaohanhRepo->addPhieuBaoHanh($maphieubaohanh,$manhanvien,$makhachhang,$mahoadon,$ngaybaohanh,$ngaytra,$trangthai,$tinhtrang));
    }
}
$phieubaohanhctl=new PhieuBaoHanhController();
$tmp=$_POST['action'];
switch($tmp){
    case 'add':{
        $maphieubaohanh=$_POST['maphieubaohanh'];
        $mahoadon=$_POST['mahoadon'];
        $manhanvien=$_POST['manhanvien'];
        $makhachhang=$_POST['makhachhang'];
        $ngaybaohanh=date("Y-m-d H:i:s");
        $trangthai=0;
        $tinhtrang=$_POST['tinhtrangbaohanh'];
        $ngaytra=$tinhtrang=="Đang Bảo Hành"?NULL:date("Y-m-d H:i:s");
        $phieubaohanhctl->themPhieuBaoHanh($maphieubaohanh,$manhanvien,$makhachhang,$mahoadon,$ngaybaohanh,$ngaytra,$trangthai,$tinhtrang);
        break;
    }
}
?>