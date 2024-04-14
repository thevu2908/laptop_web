<?php
class ChiTietHoaDonRepo extends ConnectDB {
    function getAllChiTietHoaDon() {
        $sql = "SELECT * FROM chitiethoadon";
        $result = mysqli_query($this->conn, $sql);
        $arrChiTietHoaDon = array();
        while($row = mysqli_fetch_assoc($result)) {
            $arrChiTietHoaDon = $row;
        }
        return $arrChiTietHoaDon;
    }

    function getChiTietHoaDon($ma_hd) {
        $sql = "SELECT * FROM chitiethoadon WHERE ma_hd = '$ma_hd'";
        $result = mysqli_query($this->conn, $sql);
        if ($row = mysqli_fetch_assoc($result)) {
            return $row;
        }
        return null;
    }
    function getChiTietHoaDonInHoaDon($ma_hd) {
        $sql = "SELECT ctsp_imei.ma_imei,chitietsanpham.ma_ctsp,sanpham.ten_sp,chitiethoadon.gia_sp 
        FROM chitiethoadon join ctsp_imei on chitiethoadon.ma_imei=ctsp_imei.ma_imei 
        join chitietsanpham on chitietsanpham.ma_ctsp=ctsp_imei.ma_ctsp 
        join sanpham on sanpham.ma_sp=chitietsanpham.ma_sp where chitiethoadon.ma_hd='$ma_hd' and ctsp_imei.ma_imei
        not in (select chitietphieudoitra.ma_imei from chitietphieudoitra)";
        $result = mysqli_query($this->conn, $sql);
        $arrChiTietHoaDon=array();
        while ($row = mysqli_fetch_array($result)){
            $arrChiTietHoaDon[]=$row;
        }
        return $arrChiTietHoaDon;
    }
}