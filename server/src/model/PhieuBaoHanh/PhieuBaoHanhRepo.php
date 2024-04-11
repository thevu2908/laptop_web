<?php
class PhieuBaoHanhRepo extends ConnectDB{
    public function addPhieuBaoHanh($maphieubaohanh,$manhanvien,$makhachhang,$mahoadon,$ngaybaohanh,$ngaytra,$trangthai,$tinhtrang){
        $query="INSERT INTO phieubaohanh(ma_pbh,ma_nv,ma_kh,ma_hd,ngay_bao_hanh,ngay_tra,trang_thai,tinh_trang) 
        VALUES ('$maphieubaohanh','$manhanvien','$makhachhang','$mahoadon','$ngaybaohanh','$ngaytra',$trangthai,'$tinhtrang')";
        $result=mysqli_query($this->conn,$query);
        if($result){
            return true;
        }
        return false;
    }
}
?>