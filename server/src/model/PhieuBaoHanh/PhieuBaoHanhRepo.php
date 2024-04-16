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
        $arrChiTietPhieuBaoHanh=array();
        while($row=mysqli_fetch_array($result)){
            $arrChiTietPhieuBaoHanh[]=$row;
        }
        return $arrChiTietPhieuBaoHanh;
    }
    public function tracuuThoiGianBaoHanh($hinhthuc,$data){
        if($hinhthuc=='imei'){
            $query="SELECT hoadon.ma_hd,hoadon.ngay_tao,chitiethoadon.ma_imei,sanpham.ten_sp from hoadon join chitiethoadon
            on hoadon.ma_hd=chitiethoadon.ma_hd join ctsp_imei on ctsp_imei.ma_imei=chitiethoadon.ma_imei
            join chitietsanpham on chitietsanpham.ma_ctsp=ctsp_imei.ma_ctsp
            join sanpham on sanpham.ma_sp=chitietsanpham.ma_sp where chitiethoadon.ma_imei='$data'";
        }else{
            $query="SELECT hoadon.ma_hd,hoadon.ngay_tao,chitiethoadon.ma_imei,sanpham.ten_sp from hoadon join chitiethoadon
            on hoadon.ma_hd=chitiethoadon.ma_hd join ctsp_imei on ctsp_imei.ma_imei=chitiethoadon.ma_imei
            join chitietsanpham on chitietsanpham.ma_ctsp=ctsp_imei.ma_ctsp
            join sanpham on sanpham.ma_sp=chitietsanpham.ma_sp join khachhang on khachhang.ma_kh=hoadon.ma_kh
            where khachhang.so_dien_thoai='$data'";
        }
        $result=mysqli_query($this->conn,$query);
        $arrChiTietPhieuBaoHanh=array();
        while($row=mysqli_fetch_array($result)){
            $arrChiTietPhieuBaoHanh[]=$row;
        }
        return $arrChiTietPhieuBaoHanh;
    }
}
?>