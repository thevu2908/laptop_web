<?php
class GioHangRepo extends ConnectDB {
    function getAllGioHang($ma_kh) {
        $sql = "SELECT * FROM giohang WHERE ma_kh='$ma_kh'";
        $result = mysqli_query($this->conn, $sql);
        $arrGioHang = [];
        while($row = mysqli_fetch_assoc($result)) {
            $arrGioHang[] = $row;
        }
        return $arrGioHang;
    }

    function addGioHang($giohang) {
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

    function deleteGioHang($ma_ctsp, $ma_kh) {
        $sql = "UPDATE giohang SET trang_thai=1 WHERE ma_kh='$ma_kh' AND ma_ctsp = '$ma_ctsp'";
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

        $sql = "UPDATE giohang SET gia_sp='$gia_sp', so_luong='$so_luong', ma_ctsp='$ma_ctsp'
                WHERE ma_kh='$ma_kh'";

        $result = mysqli_query($this->conn, $sql);
        if ($result) {
            return true;
        }
        return false;
    }

    function getSizeGioHang($ma_kh): int {
        try {
            $sql = "SELECT count(*) as count FROM giohang WHERE ma_kh='$ma_kh'";
            $statement = mysqli_query($this->conn, $sql);
            $result = mysqli_fetch_assoc($statement);

            return $result['count'] === null ? - 1 : (int)$result['count'];
        } 
        catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
            return -1;
        }
    }

    function getFullProduct($ma_ctsp) {
        try {
            $query = "SELECT * 
                    FROM sanpham sp JOIN chitietsanpham ctsp ON sp.ma_sp = ctsp.ma_sp 
                    WHERE ctsp.ma_ctsp = '$ma_ctsp'";
            $statement = mysqli_query($this->conn, $query);

            if ($row = mysqli_fetch_assoc($statement)) {
                return $row;
            }
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
        }
        return null;
    }
    
}