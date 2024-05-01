<?php
class ThongTinNhanRepo extends ConnectDB {
    function getAllThongTinNhan() {
        $sql = "SELECT * FROM thongtinnhanhang";
        $result = mysqli_query($this->conn, $sql);
        $arrThongTinNhan = array();
        while($row = mysqli_fetch_assoc($result)) {
            $arrThongTinNhan[] = $row;
        }
        return $arrThongTinNhan;
    }

    function getThongTinNhan($ma_km) {
        try {
            $sql = "SELECT * FROM thongtinnhanhang WHERE ma_km = '$ma_km'";
            $result = mysqli_query($this->conn, $sql);
            if ($row = mysqli_fetch_assoc($result)) {
                return $row;
            }
        } 
        catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
        }
        return null;
    }

    public function getProduct($productId) {
        try {
            $query = "SELECT * FROM sanpham WHERE ma_sp = '$productId'";
            $statement = mysqli_query($this->conn, $query);

            if ($row = mysqli_fetch_assoc($statement)) {
                return $row;
            }
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
        }
        return null;
    }

    function addThongTinNhan($thongtinnhanhang) {
        $ma_km = $thongtinnhanhang->getMaKm();
        $ten_khuyen_mai = $thongtinnhanhang->getTenThongTinNhan();
        $muc_khuyen_mai = $thongtinnhanhang->getMucThongTinNhan();
        $dieu_kien = $thongtinnhanhang->getDieuKien();
        $thoi_gian_bat_dau = $thongtinnhanhang->getThoiGianBatDau();
        $thoi_gian_ket_thuc = $thongtinnhanhang->getThoiGianKetThuc();
        $tinh_trang = $thongtinnhanhang->getTinhTrang();

        $sql = "INSERT INTO thongtinnhanhang(ma_km,ten_khuyen_mai,muc_khuyen_mai,dieu_kien,thoi_gian_bat_dau,thoi_gian_ket_thuc,tinh_trang) 
                VALUES ('$ma_km', '$ten_khuyen_mai', '$muc_khuyen_mai', '$dieu_kien', '$thoi_gian_bat_dau', '$thoi_gian_ket_thuc', '$tinh_trang')";
        $result = mysqli_query($this->conn, $sql);
        if ($result) {
            return true;
        }
        return false;
    }

    function deleteThongTinNhan($ma_km) {
        $sql = "UPDATE thongtinnhanhang SET trang_thai=1 WHERE ma_km='$ma_km'";
        $result = mysqli_query($this->conn, $sql);
        if ($result) {
            return true;
        }
        return false;
    }

    function updateThongTinNhan($thongtinnhanhang) {
        $ma_km = $thongtinnhanhang->getMaKm();
        $ten_khuyen_mai = $thongtinnhanhang->getTenThongTinNhan();
        $muc_khuyen_mai = $thongtinnhanhang->getMucThongTinNhan();
        $dieu_kien = $thongtinnhanhang->getDieuKien();
        $thoi_gian_bat_dau = $thongtinnhanhang->getThoiGianBatDau();
        $thoi_gian_ket_thuc = $thongtinnhanhang->getThoiGianKetThuc();
        $tinh_trang = $thongtinnhanhang->getTinhTrang();

        $sql = "UPDATE thongtinnhanhang SET ten_khuyen_mai='$ten_khuyen_mai', muc_khuyen_mai='$muc_khuyen_mai', dieu_kien='$dieu_kien', 
                thoi_gian_bat_dau='$thoi_gian_bat_dau', thoi_gian_ket_thuc='$thoi_gian_ket_thuc', tinh_trang='$tinh_trang'
                WHERE ma_km='$ma_km'";

        $result = mysqli_query($this->conn, $sql);
        if ($result) {
            return true;
        }
        return false;
    }

    function searchThongTinNhan($search) {
        $sql = "SELECT * FROM thongtinnhanhang WHERE CONCAT(ma_km,ten_khuyen_mai,muc_khuyen_mai,dieu_kien,thoi_gian_bat_dau,thoi_gian_ket_thuc) 
                LIKE '%$search%'";
        $result = mysqli_query($this->conn, $sql);
        $arrThongTinNhan = array();
        while ($row = mysqli_fetch_assoc($result)) {
            $arrThongTinNhan[] = $row;
        }
        return $arrThongTinNhan;
    }

    function getSizeThongTinNhan(): int {
        try {
            $sql = "SELECT count(*) as count FROM thongtinnhanhang";
            $statement = mysqli_query($this->conn, $sql);
            $result = mysqli_fetch_assoc($statement);

            return $result['count'] === null ? - 1 : (int)$result['count'];
        } 
        catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
            return -1;
        }
    }
}