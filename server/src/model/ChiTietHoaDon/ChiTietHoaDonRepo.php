<?php

class ChiTietHoaDonRepo extends ConnectDB {
    public function getAllChiTietHoaDon() {
        try {
            $sql = "SELECT * FROM chitiethoadon";
            $result = mysqli_query($this->conn, $sql);
            $arrChiTietHoaDon = array();
            while($row = mysqli_fetch_assoc($result)) {
                $arrChiTietHoaDon = $row;
            }
            return $arrChiTietHoaDon;
        } catch (Exception $e) {
            echo 'Error:'. $e->getMessage();
            return null;
        }
    }

    public function getOnlyChiTietHoaDon($ma_hd) {
        try {
            $sql = "SELECT * FROM chitiethoadon WHERE ma_hd = '$ma_hd'";
            $result = mysqli_query($this->conn, $sql);
            $arrChiTietHoaDon = array();
            while ($row = mysqli_fetch_assoc($result)) {
                $arrChiTietHoaDon[] = $row;
            }
            return $arrChiTietHoaDon;
        } catch (Exception $e) {
            echo 'Error:'. $e->getMessage();
            return null;
        }
    }

    public function getChiTietHoaDon($ma_hd) {
        try {
            $sql = "SELECT cthd.ma_hd, cthd.gia_sp, SUM(cthd.so_luong) as so_luong, sp.ma_sp, ctsp.ma_ctsp, sp.ten_sp, ctsp.ram, ctsp.rom, ms.ten_mau, cxl.ten_chip, cdh.ten_card, sp.hinh_anh
                FROM chitiethoadon cthd
                JOIN ctsp_imei ctspi ON cthd.ma_imei = ctspi.ma_imei
                JOIN chitietsanpham ctsp ON ctsp.ma_ctsp = ctspi.ma_ctsp
                JOIN mausac ms ON ms.ma_mau = ctsp.ma_mau
                JOIN chipxuly cxl ON cxl.ma_chip_xu_ly = ctsp.ma_chip_xu_ly
                JOIn carddohoa cdh ON cdh.ma_card = ctsp.ma_carddohoa
                JOIN sanpham sp ON sp.ma_sp = ctsp.ma_sp
                WHERE cthd.ma_hd = '$ma_hd'
                GROUP BY ctsp.ma_ctsp
            ";
            $result = mysqli_query($this->conn, $sql);
            $arr = [];
            while ($row = mysqli_fetch_assoc($result)) {
                $arr[] = $row;
            }
            return $arr;
        } catch (Exception $e) {
            echo 'Error:'. $e->getMessage();
            return null;
        }
    }

    public function getChiTietHoaDonInHoaDon($ma_hd) {
        try {
            $sql = "SELECT ctsp_imei.ma_imei,chitietsanpham.ma_ctsp,sanpham.ten_sp,chitiethoadon.gia_sp 
                FROM chitiethoadon JOIN ctsp_imei ON chitiethoadon.ma_imei=ctsp_imei.ma_imei 
                JOIN chitietsanpham ON chitietsanpham.ma_ctsp=ctsp_imei.ma_ctsp 
                JOIN sanpham ON sanpham.ma_sp=chitietsanpham.ma_sp 
                WHERE chitiethoadon.ma_hd='$ma_hd' AND ctsp_imei.ma_imei NOT IN (SELECT chitietphieudoitra.ma_imei FROM chitietphieudoitra)
                AND ctsp_imei.ma_imei NOT IN (SELECT chitietphieubaohanh.ma_imei FROM chitietphieubaohanh 
                JOIN phieubaohanh ON phieubaohanh.ma_pbh=chitietphieubaohanh.ma_pbh WHERE phieubaohanh.tinh_trang='Đang Bảo Hành')
            ";
            $result = mysqli_query($this->conn, $sql);
            $arrChiTietHoaDon=array();
            while ($row = mysqli_fetch_array($result)){
                $arrChiTietHoaDon[]=$row;
            }
            return $arrChiTietHoaDon;
        } catch (Exception $e) {
            echo 'Error:'. $e->getMessage();
            return null;
        }
    }

    public function getTotalQuantity($ma_hd) {
        try {
            $sql = "SELECT SUM(so_luong) as total_quantity FROM chitiethoadon WHERE ma_hd = '$ma_hd'";
            $result = mysqli_query($this->conn, $sql);
            if (!$result) {
                throw new Exception('Error: '.mysqli_error($this->conn));
            }
            $row = mysqli_fetch_assoc($result);
            return $row['total_quantity'];
        } catch (Exception $e) {
            echo 'Error:'. $e->getMessage();
            return null;
        }
    }

    public function addCTHD($ma_hd, $ma_ctsp, $so_luong, $gia_sp) {
        try {
            $sql = "INSERT INTO chitiethoadon (ma_hd, ma_imei, gia_sp, so_luong)
                SELECT '$ma_hd', ma_imei, '$gia_sp', 1
                FROM ctsp_imei
                WHERE ma_ctsp = '$ma_ctsp' AND trang_thai = 0
                ORDER BY RAND()
                LIMIT $so_luong
            ";
            $result = mysqli_query($this->conn, $sql);
            if (!$result) {
                throw new Exception('Error: '.mysqli_error($this->conn));
            }
            return $result;
        } catch (Exception $e) {
            echo 'Error:'. $e->getMessage();
            return false;
        }
    }

    public function getCTHDByAdmin($ma_hd) {
        try {
            $sql = "SELECT cthd.ma_hd, cthd.gia_sp, cthd.ma_imei, cthd.so_luong, sp.ma_sp, ctsp.ma_ctsp, sp.ten_sp, ctsp.ram, ctsp.rom, ms.ten_mau, cxl.ten_chip, cdh.ten_card, sp.hinh_anh, hd.tinh_trang
                FROM chitiethoadon cthd
                JOIN ctsp_imei ctspi ON cthd.ma_imei = ctspi.ma_imei
                JOIN chitietsanpham ctsp ON ctsp.ma_ctsp = ctspi.ma_ctsp
                JOIN mausac ms ON ms.ma_mau = ctsp.ma_mau
                JOIN chipxuly cxl ON cxl.ma_chip_xu_ly = ctsp.ma_chip_xu_ly
                JOIn carddohoa cdh ON cdh.ma_card = ctsp.ma_carddohoa
                JOIN sanpham sp ON sp.ma_sp = ctsp.ma_sp
                JOIN hoadon hd ON hd.ma_hd = cthd.ma_hd
                WHERE cthd.ma_hd = '$ma_hd'
                GROUP BY cthd.ma_imei";
    
            $result = mysqli_query($this->conn, $sql);
            $arr = [];
            while ($row = mysqli_fetch_assoc($result)) {
                $arr[] = $row;
            }
            return $arr;
        } catch (Exception $e) {
            echo 'Error:' . $e->getMessage();
            return null;
        }
    }

    public function ConfirmBill($ma_hd, $ma_nv) {
        try {
            $sql = "UPDATE `hoadon` SET tinh_trang='Đã xác nhận', ma_nv='$ma_nv' WHERE ma_hd='$ma_hd'";
            $result = mysqli_query($this->conn, $sql);
            if (!$result) {
                throw new Exception('Error: '.mysqli_error($this->conn));
            }
            return $result;
        } catch (Exception $e) {
            echo 'Error:'. $e->getMessage();
            return false;
        }
    }
}