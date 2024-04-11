<?php
class ChiTietPhieuDoiTraRepo extends ConnectDB {
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
                $squery="UPDATE ctsp_imei SET trang_thai=0 WHERE ma_imei='$ime' AND ma_ctsp='$key[masanpham]'";
                $sresult=mysqli_query($this->conn,$squery);
                if(!$sresult){
                    return false;
                }
            }
        }
        return true;
    }
    public function getChiTietPhieuDoiTra($mapdt){
        $query="SELECT * from chitietphieudoitra where ma_pdt = '$mapdt'";
        $result=mysqli_query($this->conn,$query);
        $arrChiTietPhieuDoiTra=array();
        while($row=mysqli_fetch_array($result)){
           $arrChiTietPhieuDoiTra[]=$row;
        }
        return $arrChiTietPhieuDoiTra;
    }
}
?>