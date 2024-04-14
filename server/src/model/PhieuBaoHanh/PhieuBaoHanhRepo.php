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
    public function tracuuBaoHanh($ma_imei){
        $query="SELECT chitietphieubaohanh.ma_imei,sanpham.ten_sp,phieubaohanh.ngay_bao_hanh,
        phieubaohanh.ngay_tra,chitietphieubaohanh.ly_do,chitietphieubaohanh.noi_dung_bao_hanh,
        phieubaohanh.tinh_trang,sanpham.hinh_anh from phieubaohanh join chitietphieubaohanh on phieubaohanh.ma_pbh=chitietphieubaohanh.ma_pbh join ctsp_imei on ctsp_imei.ma_imei=chitietphieubaohanh.ma_imei
        join chitietsanpham on chitietsanpham.ma_ctsp=ctsp_imei.ma_ctsp join sanpham ON
        sanpham.ma_sp=chitietsanpham.ma_sp where chitietphieubaohanh.ma_imei='$ma_imei'";
        $result=mysqli_query($this->conn,$query);
        if($row=mysqli_fetch_array($result)){
            return $row;
        }
        return null;
    }
}
?>