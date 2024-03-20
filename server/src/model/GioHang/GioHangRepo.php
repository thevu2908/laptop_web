<?php
class GioHangRepo extends ConnectDB {
    function getAllGioHang() {
        $sql = "SELECT * FROM giohang WHERE tinh";
        $result = mysqli_query($this->conn, $sql);
        $arrGioHang = array();
        while($row = mysqli_fetch_assoc($result)) {
            $arrGioHang = $row;
        }
        return $arrGioHang;
    }

    function getGioHang($ma_kh) {
        $sql = "SELECT * FROM giohang WHERE ma_kh = '$ma_kh'";
        $result = mysqli_query($this->conn, $sql);
        if ($row = mysqli_fetch_assoc($result)) {
            return $row;
        }
        return null;
    }

    function addGioHang(GioHang $giohang) {
        $ma_ctsp = $giohang->getMaCTSP();
        $ma_kh = $giohang->getMaKH();
        $gia_sp = $giohang->getGiaSP();
        $so_luong = $giohang->getSoLuong();

        $sql = "INSERT INTO giohang(ma_ctsp,ma_kh,gia_sp,so_luong) 
                VALUES ('$ma_ctsp', '$ma_kh', '$gia_sp', '$so_luong')";
        $result = mysqli_query($this->conn, $sql);
        if ($result) {
            return true;
        }
        return false;
    }

    function deleteGioHang($ma_kh) {
        $sql = "UPDATE giohang SET trang_thai=0 WHERE ma_kh='$ma_kh'";
        $result = mysqli_query($this->conn, $sql);
        if ($result) {
            return true;
        }
        return false;
    }

    function updateGioHang(GioHang $giohang) {
        $ma_ctsp = $giohang->getMaCTSP();
        $ma_kh = $giohang->getMaKH();
        $gia_sp = $giohang->getGiaSP();
        $so_luong = $giohang->getSoLuong();

        $sql = "UPDATE giohang SET gia_sp='$gia_sp', so_luong='$so_luong'
                WHERE ma_kh='$ma_kh'";
        $result = mysqli_query($this->conn, $sql);
        if ($result) {
            return true;
        }
        return false;
    }
}