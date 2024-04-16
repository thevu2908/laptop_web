<?php
class KhachHangRepo extends ConnectDB {
    public function getAllKhachHang() {
        $sql = "SELECT * FROM khachhang";
        $result = mysqli_query($this->conn, $sql);
        $arrKhachHang = array();
        while($row = mysqli_fetch_assoc($result)) {
            $arrKhachHang[] = $row;
        }
        return $arrKhachHang;
    }

    public function getKhachHang($id) {
        $sql = "SELECT * FROM khachhang WHERE ma_kh = '$id'";
        $result = mysqli_query($this->conn, $sql);
        if ($row = mysqli_fetch_assoc($result)) {
            return $row;
        }
        return null;
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
            $dia_chi = $khachhang->getDiaChi();
    
            $sql = "INSERT INTO khachhang(ma_kh,ten_kh,so_dien_thoai,email,dia_chi,trang_thai) 
                    VALUES ('$ma_kh', '$ten_kh', '$so_dien_thoai', '$email', '$dia_chi', '0')";
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
        $sql = "UPDATE khachhang SET trang_thai=0 WHERE ma_kh='$ma_kh'";
        $result = mysqli_query($this->conn, $sql);
        if ($result) {
            return true;
        }
        return false;
    }

    public function updateKhachHang(KhachHang $khachhang) {
        $ma_kh = $khachhang->getMaKh();
        $ten_kh = $khachhang->getTenKh();
        $so_dien_thoai = $khachhang->getSoDienThoai();
        $email = $khachhang->getEmail();
        $dia_chi = $khachhang->getDiaChi();

        $sql = "UPDATE khachhang SET ten_kh='$ten_kh', so_dien_thoai='$so_dien_thoai', 
                email='$email', dia_chi='$dia_chi'
                WHERE ma_kh='$ma_kh'";
        $result = mysqli_query($this->conn, $sql);
        if ($result) {
            return true;
        }
        return false;
    }

    public function searchKhachHang($search) {
        $sql = "SELECT * FROM khachhang WHERE CONCAT(ma_kh,ten_kh,so_dien_thoai,email,dia_chi) 
                LIKE '%$search%'";
        $result = mysqli_query($this->conn, $sql);
        $arrKhachHang = array();
        while ($row = mysqli_fetch_assoc($result)) {
            $arrKhachHang[] = $row;
        }
        return $arrKhachHang;
    }

    public function getSize() {
        $sql = "SELECT count(*) FROM khachhang";
        $result = mysqli_query($this->conn, $sql);
        $size = mysqli_fetch_assoc($result);
        return $size;
    }

    public function getProvince() {
        $sql = "SELECT * FROM province";
        $result = mysqli_query($this->conn, $sql);
        $provinces = [];

        while($row = mysqli_fetch_assoc($result)) {
            $provinces[] = $row;
        }

        return $provinces;
    }

    public function getDistrict($province_id) {    
        $sql = "SELECT * FROM `district` WHERE `province_id` = {$province_id}";
        $result = mysqli_query($this->conn, $sql);

        $data[0] = [
            'id' => null,
            'name' => 'Chọn một Quận/huyện'
        ];

        while ($row = mysqli_fetch_assoc($result)) {
            $data[] = [
                'id' => $row['district_id'],
                'name'=> $row['name']
            ];
        }
        
        return $data;
    }

    public function getWard($district_id) {
        $sql = "SELECT * FROM `wards` WHERE `district_id` = {$district_id}";
        $result = mysqli_query($this->conn, $sql);
    
        $data[0] = [
            'id' => null,
            'name' => 'Chọn một xã/phường'
        ];
    
        while ($row = mysqli_fetch_assoc($result)) {
            $data[] = [
                'id' => $row['wards_id'],
                'name'=> $row['name']
            ];
        }

        return $data;
    }
}