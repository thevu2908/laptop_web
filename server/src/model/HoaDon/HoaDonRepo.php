<?php
class HoaDonRepo extends ConnectDB {
    function getAllHoaDon() {
        $sql = "SELECT * FROM hoadon";
        $result = mysqli_query($this->conn, $sql);
        $arrHoaDon = array();
        while($row = mysqli_fetch_assoc($result)) {
            $arrHoaDon[] = $row;
        }
        return $arrHoaDon;
    }

    function getHoaDon($id) {
        $sql = "SELECT * FROM hoadon WHERE ma_hd = '$id'";
        $result = mysqli_query($this->conn, $sql);
        if ($row = mysqli_fetch_assoc($result)) {
            return $row;
        }
        return null;
    }

    function addHoaDon(HoaDon $hoadon) {
        $ma_hd = $hoadon->getMaHd();
        $ma_kh = $hoadon->getMaKh();
        $ma_nv = $hoadon->getMaNv();
        $ngay_tao = $hoadon->getNgayTao();
        $tong_tien = $hoadon->getTongTien();
        $khuyen_mai = $hoadon->getKhuyenMai();
        $thanh_tien = $hoadon->getThanhTien();
        $hinh_thuc = $hoadon->getHinhThuc();
        $tinh_trang = $hoadon->getTinhTrang();

        $sql = "INSERT INTO hoadon(ma_hd,ma_kh,ma_nv,ngay_tao,tong_tien,khuyen_mai,thanh_tien,hinh_thuc,tinh_trang) 
                VALUES ('$ma_hd', '$ma_kh', '$ma_nv', '$ngay_tao', '$tong_tien', '$khuyen_mai', '$thanh_tien', '$hinh_thuc', '$tinh_trang')";
        $result = mysqli_query($this->conn, $sql);
        if ($result) {
            return true;
        }
        return false;
    }

    function deleteHoaDon($ma_hd) {
        $sql = "UPDATE hoadon SET trang_thai=0 WHERE ma_hd='$ma_hd'";
        $result = mysqli_query($this->conn, $sql);
        if ($result) {
            return true;
        }
        return false;
    }

    function updateHoaDon(HoaDon $hoadon) {
        $ma_hd = $hoadon->getMaHd();
        $ma_kh = $hoadon->getMaKh();
        $ma_nv = $hoadon->getMaNv();
        $ngay_tao = $hoadon->getNgayTao();
        $tong_tien = $hoadon->getTongTien();
        $khuyen_mai = $hoadon->getKhuyenMai();
        $thanh_tien = $hoadon->getThanhTien();
        $hinh_thuc = $hoadon->getHinhThuc();
        $tinh_trang = $hoadon->getTinhTrang();

        $sql = "UPDATE hoadon SET ma_kh='$ma_kh', ma_nv='$ma_nv'ngay_tao='$ngay_tao', tong_tien='$tong_tien', 
                khuyen_mai='$khuyen_mai', thanh_tien='$thanh_tien', hinh_thuc='$hinh_thuc', tinh_trang='$tinh_trang'
                WHERE ma_hd='$ma_hd'";
        $result = mysqli_query($this->conn, $sql);
        if ($result) {
            return true;
        }
        return false;
    }

    function searchHoaDon($search) {
        $sql = "SELECT * FROM hoadon WHERE CONCAT(ma_hd,ma_kh,ma_nv,ngay_tao,tong_tien,khuyen_mai,thanh_tien,hinh_thuc,tinh_trang) 
                LIKE '%$search%'";
        $result = mysqli_query($this->conn, $sql);
        $arrHoaDon = array();
        while ($row = mysqli_fetch_assoc($result)) {
            $arrHoaDon[] = $row;
        }
        return $arrHoaDon;
    }

    function getSize() {
        $sql = "SELECT count(*) FROM hoadon";
        $result = mysqli_query($this->conn, $sql);
        $size = mysqli_fetch_assoc($result);
        return $size;
    }
}