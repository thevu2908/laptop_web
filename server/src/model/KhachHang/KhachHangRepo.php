<?php
class KhachHangRepo extends ConnectDB {
    function getAllKhachHang() {
        $sql = "SELECT * FROM khachhang";
        $result = mysqli_query($this->conn, $sql);
        $arrKhachHang = array();
        while($row = mysqli_fetch_assoc($result)) {
            $arrKhachHang[] = $row;
        }
        return $arrKhachHang;
    }

    function getKhachHang($id) {
        $sql = "SELECT * FROM khachhang WHERE ma_kh = '$id'";
        $result = mysqli_query($this->conn, $sql);
        if ($row = mysqli_fetch_assoc($result)) {
            return $row;
        }
        return null;
    }
	
    function addKhachHang(KhachHang $khachhang) {
        try {
            $ma_kh = $khachhang->getMaKh();
            $ten_kh = $khachhang->getTenKh();
            $so_dien_thoai = $khachhang->getSoDienThoai();
            $email = $khachhang->getEmail();
            $dia_chi = $khachhang->getDiaChi();
    
            $sql = "INSERT INTO khachhang(ma_kh,ten_kh,so_dien_thoai,email,dia_chi) 
                    VALUES ('$ma_kh', '$ten_kh', '$so_dien_thoai', '$email', '$dia_chi')";
            $result = mysqli_query($this->conn, $sql);
            
            if ($result) {
                return true;
            }
        } catch (Exception $e) {
            echo 'Error:'. $e->getMessage();
        }
        return false;
    }

    function deleteKhachHang($ma_kh) {
        $sql = "UPDATE khachhang SET trang_thai=0 WHERE ma_kh='$ma_kh'";
        $result = mysqli_query($this->conn, $sql);
        if ($result) {
            return true;
        }
        return false;
    }

    function updateKhachHang(KhachHang $khachhang) {
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

    function searchKhachHang($search) {
        $sql = "SELECT * FROM khachhang WHERE CONCAT(ma_kh,ten_kh,so_dien_thoai,email,dia_chi) 
                LIKE '%$search%'";
        $result = mysqli_query($this->conn, $sql);
        $arrKhachHang = array();
        while ($row = mysqli_fetch_assoc($result)) {
            $arrKhachHang[] = $row;
        }
        return $arrKhachHang;
    }

    function getSize() {
        $sql = "SELECT count(*) FROM khachhang";
        $result = mysqli_query($this->conn, $sql);
        $size = mysqli_fetch_assoc($result);
        return $size;
    }

    function getProvince() {
        $sql = "SELECT * FROM province";
        $result = mysqli_query($this->conn, $sql);
        $provinces = [];

        while($row = mysqli_fetch_assoc($result)) {
            $provinces[] = $row;
        }

        return $provinces;
    }

    function getDistrict($province_id) {    
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

    function getWard($district_id) {
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