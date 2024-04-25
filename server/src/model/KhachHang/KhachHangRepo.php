<?php

class KhachHangRepo extends ConnectDB {
    public function getAllKhachHang() {
        try {
            $sql = "SELECT * FROM khachhang";
            $result = mysqli_query($this->conn, $sql);
            $arrKhachHang = array();
            while($row = mysqli_fetch_assoc($result)) {
                $arrKhachHang[] = $row;
            }
            return $arrKhachHang;
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
            return null;
        }
    }

    public function getKhachHang($id) {
        try {
            $sql = "SELECT * FROM khachhang WHERE ma_kh = '$id' OR email = '$id'";
            $result = mysqli_query($this->conn, $sql);
            if ($row = mysqli_fetch_assoc($result)) {
                return $row;
            }
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
            return null;
        }
    }
	
    public function getKhachhangLength() : int {
        try {
            $query = "SELECT COUNT(*) as count FROM khachhang";
            $statement = mysqli_query($this->conn, $query);

            $result = mysqli_fetch_assoc($statement);

            return $result['count'] === null ? - 1 : (int)$result['count'];
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
            return -1;
        }
    }
    
    public function addKhachHang(KhachHang $khachhang) {
        try {
            $ma_kh = $khachhang->getMaKh();
            $ten_kh = $khachhang->getTenKh();
            $so_dien_thoai = $khachhang->getSoDienThoai();
            $email = $khachhang->getEmail();
    
            $sql = "INSERT INTO khachhang(ma_kh,ten_kh,so_dien_thoai,email,trang_thai) 
                    VALUES ('$ma_kh', '$ten_kh', '$so_dien_thoai', '$email', '0')";
            $result = mysqli_query($this->conn, $sql);
            
            if ($result) {
                return true;
            }
        } catch (Exception $e) {
            echo 'Error:'. $e->getMessage();
        }
        return false;
    }

    public function deleteKhachHang($ma_kh) {
        try {
            $sql = "UPDATE khachhang SET trang_thai=0 WHERE ma_kh='$ma_kh'";
            $result = mysqli_query($this->conn, $sql);
            if ($result) {
                return true;
            }
            return false;
        } catch (Exception $e) {
            echo 'Error:'. $e->getMessage();
            return false;
        }
    }

    public function updateKhachHang(KhachHang $khachhang) {
        try {
            $ma_kh = $khachhang->getMaKh();
            $ten_kh = $khachhang->getTenKh();
            $so_dien_thoai = $khachhang->getSoDienThoai();
            $email = $khachhang->getEmail();
    
            $sql = "UPDATE khachhang SET ten_kh='$ten_kh', so_dien_thoai='$so_dien_thoai', email='$email' WHERE ma_kh='$ma_kh'";
            $result = mysqli_query($this->conn, $sql);
            if ($result) {
                return true;
            }
            return false;
        } catch (Exception $e) {
            echo 'Error:'. $e->getMessage();
            return false;
        }
    }

    public function getProvince() {
        try {
            $sql = "SELECT * FROM province";
            $result = mysqli_query($this->conn, $sql);
            $provinces = [];
    
            while($row = mysqli_fetch_assoc($result)) {
                $provinces[] = $row;
            }
    
            return $provinces;
        } catch (Exception $e) {
            echo 'Error:'. $e->getMessage();
            return null;
        }
    }

    public function getDistrict($province_id) {    
        try {
            $sql = "SELECT * FROM `district` WHERE `province_id` = {$province_id}";
            $result = mysqli_query($this->conn, $sql);
    
            $data[0] = [
                'id' => '',
                'name' => 'Chọn một Quận/huyện'
            ];
    
            while ($row = mysqli_fetch_assoc($result)) {
                $data[] = [
                    'id' => $row['district_id'],
                    'name'=> $row['name']
                ];
            }
            
            return $data;
        } catch (Exception $e) {
            echo 'Error:'. $e->getMessage();
            return null;
        }
    }

    public function getWard($district_id) {
        try {
            $sql = "SELECT * FROM `wards` WHERE `district_id` = {$district_id}";
            $result = mysqli_query($this->conn, $sql);

            $data[0] = [
                'id' => '',
                'name' => 'Chọn một xã/phường'
            ];
        
            while ($row = mysqli_fetch_assoc($result)) {
                $data[] = [
                    'id' => $row['wards_id'],
                    'name'=> $row['name']
                ];
            }
    
            return $data;
        } catch (Exception $e) {
            echo 'Error:'. $e->getMessage();
            return null;
        }
    }
}