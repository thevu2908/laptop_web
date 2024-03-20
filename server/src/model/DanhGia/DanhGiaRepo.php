<?php
class DanhGiaRepo extends ConnectDB {
    function getAllDanhGia() {
        $sql = "SELECT * FROM danhgia";
        $result = mysqli_query($this->conn, $sql);
        $arrDanhGia = array();
        while($row = mysqli_fetch_assoc($result)) {
            $arrDanhGia = $row;
        }
        return $arrDanhGia;
    }

    function getDanhGia($ma_kh) {
        $sql = "SELECT * FROM danhgia WHERE ma_kh = '$ma_kh'";
        $result = mysqli_query($this->conn, $sql);
        if ($row = mysqli_fetch_assoc($result)) {
            return $row;
        }
        return null;
    }

    function addDanhGia(DanhGia $danhgia) {
        $ma_ctsp = $danhgia->getMaCTSP();
        $ma_kh = $danhgia->getMaKH();
        $rating = $danhgia->getRating();
        $thoi_gian_danh_gia = $danhgia->getThoiGian();
        $noi_dung = $danhgia->getNoiDung();

        $sql = "INSERT INTO danhgia(ma_ctsp,ma_kh,rating,thoi_gian_danh_gia, noi_dung) 
                VALUES ('$ma_ctsp', '$ma_kh', '$rating', '$thoi_gian_danh_gia', '$noi_dung')";
        $result = mysqli_query($this->conn, $sql);
        if ($result) {
            return true;
        }
        return false;
    }

    function deleteDanhGia($ma_kh) {
        $sql = "UPDATE danhgia SET trang_thai=0 WHERE ma_kh='$ma_kh'";
        $result = mysqli_query($this->conn, $sql);
        if ($result) {
            return true;
        }
        return false;
    }

    function updateDanhGia(DanhGia $danhgia) {
        $ma_ctsp = $danhgia->getMaCTSP();
        $ma_kh = $danhgia->getMaKH();
        $rating = $danhgia->getRating();
        $thoi_gian_danh_gia = $danhgia->getThoiGian();
        $noi_dung = $danhgia->getNoiDung();

        $sql = "UPDATE danhgia SET rating='$rating', thoi_gian_danh_gia='$thoi_gian_danh_gia', noi_dung='$noi_dung'
                WHERE ma_kh='$ma_kh'";
        $result = mysqli_query($this->conn, $sql);
        if ($result) {
            return true;
        }
        return false;
    }
}