<?php
class ChiTietPhieuDoiTraRepo extends ConnectDB {
    //ma_pdt	ma_imei	ly_do	gia_sp	so_luong	thanh_tien
    public function addChiTietPhieuDoiTra($mapdt,$listitemDoiTra){
        foreach($listitemDoiTra as $key){
            $query = "INSERT INTO `INSERT INTO chitietphieudoitra VALUES('$mapdt','$key[ime]','$key[lydo]',$key[giasanpham],$key[soluong],$key[thanhtien])";
            $result=mysqli_query($this->conn,$query);
            if($result){
                $squery="UPDATE ctsp_imei SET trang_thai=0 WHERE ma_imei='$key[ime]' AND ma_ctsp='$key[mactsp]'";
                $sresult=mysqli_query($this->conn,$squery);
                return true;
            }
        }
        // $query="INSERT INTO chitietphieudoitra VALUES('$mapdt','$ma_imei','$lydo',$giasp,$soluong,$thanhtien)";
        // return false;
    }
}
?>