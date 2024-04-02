<?php
class ChiTietKhuyenMaiRepo extends ConnectDB {
    function getAllChiTietKhuyenMai() {
        $sql = "SELECT * FROM chitietkhuyenmai";
        $result = mysqli_query($this->conn, $sql);
        $arrChiTietKhuyenMai = array();
        while($row = mysqli_fetch_assoc($result)) {
            $arrChiTietKhuyenMai = $row;
        }
        return $arrChiTietKhuyenMai;
    }

    function getChiTietKhuyenMai($ma_km) {
        $sql = "SELECT * FROM chitietkhuyenmai WHERE ma_km = '$ma_km'";
        $result = mysqli_query($this->conn, $sql);
        if ($row = mysqli_fetch_assoc($result)) {
            return $row;
        }
        return null;
    }
}