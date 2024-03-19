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
}