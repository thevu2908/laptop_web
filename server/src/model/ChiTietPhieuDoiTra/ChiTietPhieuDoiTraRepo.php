<?php
class ChiTietPhieuDoiTraRepo extends ConnectDB {
    //ma_pdt	ma_imei	ly_do	gia_sp	so_luong	thanh_tien
    public function addChiTietPhieuDoiTra($mapdt,$ma_imei,$lydo,$giasp,$soluong,$thanhtien,$masanpham){
        $query="INSERT INTO chitietphieudoitra VALUES('$mapdt','$ma_imei','$lydo',$giasp,$soluong,$thanhtien)";
        $result=mysqli_query($this->conn,$query);
        if($result){
            $squery="UPDATE ctsp_imei SET trang_thai=0 WHERE ma_imei='$ma_imei' AND ma_ctsp='$masanpham'";
            return true;
        }
        return false;
    }
}
?>