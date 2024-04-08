<?php
class KhuyenMaiRepo extends ConnectDB {
    function getAllKhuyenMai() {
        $sql = "SELECT * FROM khuyenmai";
        $result = mysqli_query($this->conn, $sql);
        $arrKhuyenMai = array();
        while($row = mysqli_fetch_assoc($result)) {
            $arrKhuyenMai[] = $row;
        }
        return $arrKhuyenMai;
    }

    function getKhuyenMai($ma_km) {
        $sql = "SELECT * FROM khuyenmai WHERE ma_km = '$ma_km'";
        $result = mysqli_query($this->conn, $sql);
        if ($row = mysqli_fetch_assoc($result)) {
            return $row;
        }
        return null;
    }

    function addKhuyenMai(KhuyenMai $khuyenmai) {
        $ma_km = $khuyenmai->getMaKm();
        $ten_khuyen_mai = $khuyenmai->getTenKhuyenMai();
        $muc_khuyen_mai = $khuyenmai->getMucKhuyenMai();
        $dieu_kien = $khuyenmai->getDieuKien();
        $thoi_gian_bat_dau = $khuyenmai->getThoiGianBatDau();
        $thoi_gian_ket_thuc = $khuyenmai->getThoiGianKetThuc();

        $sql = "INSERT INTO khuyenmai(ma_km,ten_khuyen_mai,muc_khuyen_mai,dieu_kien,thoi_gian_bat_dau,thoi_gian_ket_thuc) 
                VALUES ('$ma_km', '$ten_khuyen_mai', '$muc_khuyen_mai', '$dieu_kien', '$thoi_gian_bat_dau', '$thoi_gian_ket_thuc')";
        $result = mysqli_query($this->conn, $sql);
        if ($result) {
            return true;
        }
        return false;
    }

    function deleteKhuyenMai($ma_km) {
        $sql = "UPDATE khuyenmai SET trang_thai=0 WHERE ma_km='$ma_km'";
        $result = mysqli_query($this->conn, $sql);
        if ($result) {
            return true;
        }
        return false;
    }

    function updateKhuyenMai(KhuyenMai $khuyenmai) {
        $ma_km = $khuyenmai->getMaKm();
        $ten_khuyen_mai = $khuyenmai->getTenKhuyenMai();
        $muc_khuyen_mai = $khuyenmai->getMucKhuyenMai();
        $dieu_kien = $khuyenmai->getDieuKien();
        $thoi_gian_bat_dau = $khuyenmai->getThoiGianBatDau();
        $thoi_gian_ket_thuc = $khuyenmai->getThoiGianKetThuc();

        $sql = "UPDATE khuyenmai SET ten_khuyen_mai='$ten_khuyen_mai' muc_khuyen_mai='$muc_khuyen_mai', dieu_kien='$dieu_kien', 
                thoi_gian_bat_dau='$thoi_gian_bat_dau', thoi_gian_ket_thuc='$thoi_gian_ket_thuc'
                WHERE ma_km='$ma_km'";
        $result = mysqli_query($this->conn, $sql);
        if ($result) {
            return true;
        }
        return false;
    }

    function searchKhuyenMai($search) {
        $sql = "SELECT * FROM khuyenmai WHERE CONCAT(ma_km,ten_khuyen_mai,muc_khuyen_mai,dieu_kien,thoi_gian_bat_dau,thoi_gian_ket_thuc) 
                LIKE '%$search%'";
        $result = mysqli_query($this->conn, $sql);
        $arrKhuyenMai = array();
        while ($row = mysqli_fetch_assoc($result)) {
            $arrKhuyenMai[] = $row;
        }
        return $arrKhuyenMai;
    }

    function getSizeKhuyenMai() {
        $sql = "SELECT count(*) FROM khuyenmai";
        $result = mysqli_query($this->conn, $sql);
        $size = mysqli_fetch_assoc($result);
        return $size;
    }
}