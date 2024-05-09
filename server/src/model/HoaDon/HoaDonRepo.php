<?php

class HoaDonRepo extends ConnectDB {
    public function getAllHoaDon() {
        try {
            $sql = "SELECT * FROM hoadon";
            $result = mysqli_query($this->conn, $sql);
            $arrHoaDon = array();
            while($row = mysqli_fetch_assoc($result)) {
                $arrHoaDon[] = $row;
            }
            return $arrHoaDon;
        } catch (Exception $e) {
            echo 'Error:'. $e->getMessage();
            return null;
        }
    }

    public function getHoaDon($id) {
        try {
            $sql = "SELECT * FROM hoadon WHERE ma_hd = '$id'";
            $result = mysqli_query($this->conn, $sql);
            if ($row = mysqli_fetch_assoc($result)) {
                return $row;
            }
            return null;
        } catch (Exception $e) {
            echo 'Error:'. $e->getMessage();
            return null;
        }
    }

    public function getHoaDonByKhachHang($ma_kh, $tinh_trang, $search) {
        try {
            $sql = "SELECT * FROM hoadon
                WHERE ma_kh = '$ma_kh'
                AND (tinh_trang LIKE '%$tinh_trang%')
                AND (ma_hd LIKE '%$search%' OR ma_hd IN (
                    SELECT cthd.ma_hd FROM chitiethoadon cthd
                    JOIN ctsp_imei ctspi ON ctspi.ma_imei = cthd.ma_imei
                    JOIN chitietsanpham ctsp ON ctsp.ma_ctsp = ctspi.ma_ctsp
                    JOIN sanpham sp ON sp.ma_sp = ctsp.ma_sp
                    WHERE sp.ten_sp LIKE '%$search%'
                ))
                ORDER BY ngay_tao DESC
            ";
            $result = mysqli_query($this->conn, $sql);
            $arrHoaDon = array();
            while ($row = mysqli_fetch_assoc($result)) {
                $arrHoaDon[] = $row;
            }
            return $arrHoaDon;
        } catch (Exception $e) {
            echo 'Error:'. $e->getMessage();
            return null;
        }
    }

    public function getThongTinKhachHang($id) {
        try {
            $sql = "SELECT khachhang.ma_kh,khachhang.ten_kh FROM hoadon JOIN khachhang on khachhang.ma_kh=hoadon.ma_kh WHERE hoadon.ma_hd='$id'";
            $result = mysqli_query($this->conn, $sql);
            if ($row = mysqli_fetch_assoc($result)) {
                return $row;
            }
            return null;
        } catch (Exception $e) {
            echo 'Error:'. $e->getMessage();
            return null;
        }
    }

    public function addHoaDon(HoaDon $hoadon) {
        try {
            $ma_hd = $hoadon->getMaHd();
            $ma_kh = $hoadon->getMaKh();
            $ma_ttnh = $hoadon->getTtnh();
            $ngay_tao = $hoadon->getNgayTao();
            $tong_tien = $hoadon->getTongTien();
            $khuyen_mai = $hoadon->getKhuyenMai();
            $thanh_tien = $hoadon->getThanhTien();
            $hinh_thuc = $hoadon->getHinhThuc();
            $ghi_chu = $hoadon->getGhiChu();
            $tinh_trang = $hoadon->getTinhTrang();
            $trang_thai = $hoadon->getTrangThai();
    
            $sql = "INSERT INTO hoadon(ma_hd,ma_kh,ma_ttnh,ngay_tao,tong_tien,khuyen_mai,thanh_tien,hinh_thuc,ghi_chu,tinh_trang,trang_thai) 
                    VALUES ('$ma_hd', '$ma_kh', '$ma_ttnh', '$ngay_tao', '$tong_tien', '$khuyen_mai', '$thanh_tien', '$hinh_thuc', '$ghi_chu', '$tinh_trang', '$trang_thai')";
            $result = mysqli_query($this->conn, $sql);

            return $result;
        } catch (Exception $e) {
            echo 'Error:'. $e->getMessage();
            return false;
        }
    }

    public function deleteHoaDon($ma_hd) {
        try {
            $sql = "UPDATE hoadon SET trang_thai=1 WHERE ma_hd='$ma_hd'";
            $result = mysqli_query($this->conn, $sql);
            return $result;
        } catch (Exception $e) {
            echo 'Error:'. $e->getMessage();
            return false;
        }
    }

    public function updateHoaDon(HoaDon $hoadon) {
        try {
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

            return $result;
        } catch (Exception $e) {
            echo 'Error:'. $e->getMessage();
            return false;
        }
    }

    public function searchHoaDon($search) {
        try {
            $sql = "SELECT * FROM hoadon WHERE CONCAT(ma_hd,ma_kh,ma_nv,ngay_tao,tong_tien,khuyen_mai,thanh_tien,hinh_thuc,tinh_trang) 
                    LIKE '%$search%'";
            $result = mysqli_query($this->conn, $sql);
            $arrHoaDon = array();
            while ($row = mysqli_fetch_assoc($result)) {
                $arrHoaDon[] = $row;
            }
            return $arrHoaDon;
        } catch (Exception $e) {
            echo 'Error:'. $e->getMessage();
            return null;
        }
    }
    
    function getSizeHoaDon(): int {
        try {
            $sql = "SELECT COUNT(*) AS count FROM hoadon";
            $statement = mysqli_query($this->conn, $sql);
            $result = mysqli_fetch_assoc($statement);    
            return $result['count'];
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
            return -1;
        }
    }
}