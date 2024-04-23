<?php
include("../model/ConnectDB.php");
include("../model/ChiTietHoaDon/ChiTietHoaDon.php");
include("../model/ChiTietHoaDon/ChiTietHoaDonRepo.php");
class CTHDController{
    private $chitietHDRepo;
    public function __construct()
    {
        $this->chitietHDRepo = new ChiTietHoaDonRepo();
    }
    public function getAllChiTietHoaDon(){
        echo json_encode($this->chitietHDRepo->getAllChiTietHoaDon());
    }
    function getChiTietHoaDonInHoaDon($ma_hd) {
        echo json_encode($this->chitietHDRepo->getChiTietHoaDonInHoaDon($ma_hd));
    }
}
$ctHDctl=new CTHDController();
$action=$_POST['action'];
switch($action){
    case "getcthd":{
        $ma_hd=$_POST['mahoadon'];
        $ctHDctl->getChiTietHoaDonInHoaDon($ma_hd);
        break;
    }
}
?>