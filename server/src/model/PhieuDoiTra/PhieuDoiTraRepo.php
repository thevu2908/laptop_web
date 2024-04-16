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
    public function tracuuDoiTra($sodienthoai){
        $query="SELECT chitietphieudoitra.ma_imei,sanpham.ten_sp,phieudoitra.ngay_tra,chitietphieudoitra.ly_do,
        chitietphieudoitra.gia_sp,chitietphieudoitra.so_luong,chitietphieudoitra.thanh_tien,sanpham.hinh_anh
        FROM phieudoitra join chitietphieudoitra on phieudoitra.ma_pdt=chitietphieudoitra.ma_pdt join
        ctsp_imei on ctsp_imei.ma_imei=chitietphieudoitra.ma_imei join chitietsanpham on chitietsanpham.ma_ctsp=ctsp_imei.ma_ctsp
        join sanpham on sanpham.ma_sp=chitietsanpham.ma_sp join hoadon on hoadon.ma_hd=phieudoitra.ma_hd
        join khachhang on khachhang.ma_kh=hoadon.ma_kh where khachhang.so_dien_thoai='$sodienthoai'";
        $result=mysqli_query($this->conn,$query);
        $arrDoiTra=array();
        while ($row=mysqli_fetch_array($result)){
            $arrDoiTra[]=$row;
        }
        return $arrDoiTra;
    }
    public function xemChiTietPhieuDoiTra($ma_pdt){
        $query="SELECT chitietphieudoitra.ma_imei,sanpham.ten_sp,chitietphieudoitra.ly_do,chitietphieudoitra.thanh_tien,
        chitietphieudoitra.so_luong,chitietphieudoitra.thanh_tien from chitietphieudoitra
        JOIN phieudoitra on phieudoitra.ma_pdt=chitietphieudoitra.ma_pdt JOIN ctsp_imei
        on ctsp_imei.ma_imei=chitietphieudoitra.ma_imei join chitietsanpham
        on chitietsanpham.ma_ctsp=ctsp_imei.ma_ctsp join sanpham
        on chitietsanpham.ma_sp=sanpham.ma_sp where chitietphieudoitra.ma_pdt='$ma_pdt'";
        $result=mysqli_query($this->conn,$query);
        $arrDoiTra=array();
        while ($row=mysqli_fetch_array($result)){
            $arrDoiTra[]=$row;
        }
        return $arrDoiTra;
    }
}
?>