<?php
class PhieuDoiTraRepo extends ConnectDB {
    //ma_pdt	ma_nv	ma_hd	ngay_tra	tong_so_luong	tong_tien_tra	trang_thai
    //$ngaytra = date('Y-m-d H:i:s', strtotime($ngaytra));
    public function addPhieuDoiTra($mapdt,$manhanvien,$mahoadon,$ngaytra,$tongsoluong,$tongtientra,$trangthai){
        $query="INSERT INTO phieudoitra(ma_pdt,ma_nv,ma_hd,ngay_tra,tong_so_luong,tong_tien_tra,trang_thai) VALUES('$mapdt','$manhanvien','$mahoadon','$ngaytra',$tongsoluong,$tongtientra,$trangthai)";
        $result=mysqli_query($this->conn,$query);
        if($result){
            return true;
        }
        return false;
    }
}
?>