<?php
include("../model/ConnectDB.php");
include("../model/HoaDon/HoaDon.php");
include("../model/HoaDon/HoaDonRepo.php");

class HoaDonController{
    private $hoadonRepo;
    public function __construct(){
        $this->hoadonRepo = new HoaDonRepo();
    }
    function getAllHoaDon() {
        echo json_encode($this->hoadonRepo->getAllHoaDon());
    }
    function getKhachHang($id) {
       echo json_encode($this->hoadonRepo->getThongTinKhachHang($id));
    }
}
$hoadonctl=new HoaDonController();
$action=$_POST['action'];
switch($action) {
    case "getmahoadon":{
        $hoadonctl->getAllHoaDon();
        break;
    }case "getkhachhang":{
        $id=$_POST['id'];
        $hoadonctl->getKhachHang($id);
        break;
    }
}
?>