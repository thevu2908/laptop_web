<?php
class ChiTietPhieuDoiTraRepo extends ConnectDB {
    //ma_pdt	ma_imei	ly_do	gia_sp	so_luong	thanh_tien
    public function addChiTietPhieuDoiTra($mapdt,$listitemDoiTra){
        foreach($listitemDoiTra as $key){
            $ime = $key['ime'];
            $lydo = $key['lydo'];
            $giasanpham = (float)$key['giasanpham'];
            $soluong = (int)$key['soluong'];
            $thanhtien = (float)$key['thanhtien'];
            $query = "INSERT INTO chitietphieudoitra(ma_pdt,ma_imei,ly_do,gia_sp,so_luong,thanh_tien) VALUES('$mapdt','$ime','$lydo',$giasanpham,$soluong,$thanhtien)";
            $result=mysqli_query($this->conn,$query);
            if($result){
                $squery="UPDATE ctsp_imei SET trang_thai=1 WHERE ma_imei='$ime' AND ma_ctsp='$key[masanpham]'";
                $sresult=mysqli_query($this->conn,$squery);
                if(!$sresult){
                    return false;
                }
            }
        }
        return true;
    }
}
?>