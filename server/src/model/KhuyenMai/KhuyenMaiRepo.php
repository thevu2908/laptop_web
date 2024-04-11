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
        try {
            $sql = "SELECT * FROM khuyenmai WHERE ma_km = '$ma_km'";
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

    function addKhuyenMai($khuyenmai) {
        $ma_km = $khuyenmai->getMaKm();
        $ten_khuyen_mai = $khuyenmai->getTenKhuyenMai();
        $muc_khuyen_mai = $khuyenmai->getMucKhuyenMai();
        $dieu_kien = $khuyenmai->getDieuKien();
        $thoi_gian_bat_dau = $khuyenmai->getThoiGianBatDau();
        $thoi_gian_ket_thuc = $khuyenmai->getThoiGianKetThuc();
        $tinh_trang = $khuyenmai->getTinhTrang();

        $sql = "INSERT INTO khuyenmai(ma_km,ten_khuyen_mai,muc_khuyen_mai,dieu_kien,thoi_gian_bat_dau,thoi_gian_ket_thuc,tinh_trang) 
                VALUES ('$ma_km', '$ten_khuyen_mai', '$muc_khuyen_mai', '$dieu_kien', '$thoi_gian_bat_dau', '$thoi_gian_ket_thuc', '$tinh_trang')";
        $result = mysqli_query($this->conn, $sql);
        if ($result) {
            return true;
        }
        return false;
    }

    function deleteKhuyenMai($ma_km) {
        $sql = "UPDATE khuyenmai SET trang_thai=1 WHERE ma_km='$ma_km'";
        $result = mysqli_query($this->conn, $sql);
        if ($result) {
            return true;
        }
        return false;
    }

    function updateKhuyenMai($khuyenmai) {
        $ma_km = $khuyenmai->getMaKm();
        $ten_khuyen_mai = $khuyenmai->getTenKhuyenMai();
        $muc_khuyen_mai = $khuyenmai->getMucKhuyenMai();
        $dieu_kien = $khuyenmai->getDieuKien();
        $thoi_gian_bat_dau = $khuyenmai->getThoiGianBatDau();
        $thoi_gian_ket_thuc = $khuyenmai->getThoiGianKetThuc();
        $tinh_trang = $khuyenmai->getTinhTrang();

        $sql = "UPDATE khuyenmai SET ten_khuyen_mai='$ten_khuyen_mai', muc_khuyen_mai='$muc_khuyen_mai', dieu_kien='$dieu_kien', 
                thoi_gian_bat_dau='$thoi_gian_bat_dau', thoi_gian_ket_thuc='$thoi_gian_ket_thuc', tinh_trang='$tinh_trang'
                WHERE ma_km='$ma_km'";

        $result = mysqli_query($this->conn, $sql);
        if ($result) {
            return true;
        }
        return false;

        // try {
        //     $sql = "UPDATE khuyenmai SET ten_khuyen_mai=?, muc_khuyen_mai=?, dieu_kien=?, 
        //         thoi_gian_bat_dau=?, thoi_gian_ket_thuc=?, tinh_trang=?
        //         WHERE ma_km=?";
        //     $statement = mysqli_prepare($this->conn, $sql);
            
        //     if (!$statement) {
        //         throw new Exception("Query preparation failed: " . mysqli_error($this->conn));
        //     }

        //     $ma_km = $khuyenmai->getMaKm();
        //     $ten_khuyen_mai = $khuyenmai->getTenKhuyenMai();
        //     $muc_khuyen_mai = $khuyenmai->getMucKhuyenMai();
        //     $dieu_kien = $khuyenmai->getDieuKien();
        //     $thoi_gian_bat_dau = $khuyenmai->getThoiGianBatDau();
        //     $thoi_gian_ket_thuc = $khuyenmai->getThoiGianKetThuc();
        //     $tinh_trang = $khuyenmai->getTinhTrang();

        //     $result = $statement->bind_param(
        //         "sssssssssdssis", 
        //         $ma_km, $ten_khuyen_mai, $muc_khuyen_mai,
        //         $dieu_kien, $thoi_gian_bat_dau, $thoi_gian_ket_thuc, 
        //         $tinh_trang
        //     );

        //     if (!$result) {
        //         throw new Exception("Binding parameters failed: " . $statement->error);
        //     }

        //     if ($statement->execute()) {
        //         return true;
        //     } else {
        //         throw new Exception("Execution of query failed: " . mysqli_error($this->conn));
        //     }
        // } catch (Exception $e) {
        //     echo 'Error: ' . $e->getMessage() . '<br>';
        //     return false;
        // }
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

    function getSizeKhuyenMai(): int {
        try {
            $sql = "SELECT count(*) as count FROM khuyenmai";
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