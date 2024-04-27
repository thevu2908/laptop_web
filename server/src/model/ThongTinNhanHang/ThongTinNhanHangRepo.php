<?php

class ThongTinNhanHangRepo extends ConnectDB {
    public function getThongTinNhanHang($maTtnh) {
        try {
            $query = "SELECT * FROM thongtinnhanhang WHERE ma_ttnh = '$maTtnh'";
            $statement = mysqli_query($this->conn, $query);
            $result = mysqli_fetch_assoc($statement);

            return $result 
                ? new ThongTinNhanHang(
                    $result['ma_ttnh'],
                    $result['ma_kh'],
                    $result['ho_ten'],
                    $result['so_dien_thoai'],
                    $result['dia_chi'],
                    $result['dia_chi_mac_dinh']
                ) 
                : null; 
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
            return null;
        }
    } 

    public function getThongTinNhanHangByMaKhachHang($maKh) {
        try {
            $array = array();
            $query = "SELECT * FROM thongtinnhanhang WHERE ma_kh = '$maKh' ORDER BY dia_chi_mac_dinh DESC";
            $statement = mysqli_query($this->conn, $query);

            while ($row = mysqli_fetch_assoc($statement)) {
                $array[] = $row;
            }

            return $array;
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
            return null;
        }
    }

    public function getThongTinNhanHangLength() {
        try {
            $query = "SELECT COUNT(*) as count FROM thongtinnhanhang";
            $statement = mysqli_query($this->conn, $query);
            $result = mysqli_fetch_assoc($statement);

            return $result['count'] === null ? - 1 : (int)$result['count'];
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
            return 0;
        }
    }

    public function addThongTinNhanHang(ThongTinNhanHang $ttnh) {
        try {
            $query = "INSERT INTO thongtinnhanhang(ma_ttnh, ma_kh, ho_ten, so_dien_thoai, dia_chi, dia_chi_mac_dinh) VALUES (?, ?, ?, ?, ?, ?)";
            $statement = mysqli_prepare($this->conn, $query);

            if (!$statement) {
                throw new Exception("Query preparation failed: " . mysqli_error($this->conn));
            }

            $maTtnh = $ttnh->getMaTtnh();
            $maKh = $ttnh->getMaKh();
            $hoTen = $ttnh->getHoTen();
            $sodienthoai = $ttnh->getSoDienThoai();
            $diachi = $ttnh->getDiachi();
            $diachimacdinh = $ttnh->getDiachimacdinh();
            $result = $statement->bind_param("sssiss", $maTtnh, $maKh, $hoTen, $sodienthoai, $diachi, $diachimacdinh);

            if (!$result) {
                throw new Exception("Parameter binding failed: " . mysqli_error($this->conn));
            }

            return $statement->execute();
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
            return false;

        }
    }

    public function updateThongTinNhanHang(ThongTinNhanHang $ttnh) {
        try {
            $query = "UPDATE thongtinnhanhang SET ho_ten = ?, sodienthoai = ?, diachi = ? WHERE ma_kh = ? AND ma_ttnh = ?";
            $statement = mysqli_prepare($this->conn, $query);

            if (!$statement) {
                throw new Exception("Query preparation failed: " . mysqli_error($this->conn));
            }

            $maTtnh = $ttnh->getMaTtnh();
            $maKh = $ttnh->getMaKh();
            $hoTen = $ttnh->getHoTen();
            $sodienthoai = $ttnh->getSoDienThoai();
            $diachi = $ttnh->getDiachi();
            $result = $statement->bind_param("sisss", $hoTen, $sodienthoai, $diachi, $maKh, $maTtnh);

            if (!$result) {
                throw new Exception("Parameter binding failed: " . mysqli_error($this->conn));
            }

            return $statement->execute();
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
            return false;
        }
    }

    public function deleteThongTinNhanHang($maTtnh) {
        try {
            $query = "DELETE FROM thongtinnhanhang WHERE ma_ttnh = ?";
            $statement = mysqli_prepare($this->conn, $query);

            if (!$statement) {
                throw new Exception("Query preparation failed: " . mysqli_error($this->conn));
            }

            $result = $statement->bind_param("s", $maTtnh);

            if (!$result) {
                throw new Exception("Parameter binding failed: " . mysqli_error($this->conn));
            }

            return $statement->execute();
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
            return false;
        }
    }

    public function unsetDiaChiMacDinh() {
        try {
            $query = "UPDATE thongtinnhanhang SET dia_chi_mac_dinh = 0";
            $statement = mysqli_prepare($this->conn, $query);
            if (!$statement) {
                throw new Exception("Query preparation failed: " . mysqli_error($this->conn));
            }

            $result = $statement->execute();
            if (!$result) {
                throw new Exception("Query execution failed: " . mysqli_error($this->conn));
            }

            return true;
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
            return false;
        }
    }

    public function setDiaChiMacDinh($maTtnh) {
        try {
            $query1 = "UPDATE thongtinnhanhang SET dia_chi_mac_dinh = 0";
            $query2 = "UPDATE thongtinnhanhang SET dia_chi_mac_dinh = 1 WHERE ma_ttnh = ?";
            
            $statement1 = mysqli_prepare($this->conn, $query1);
            if (!$statement1) {
                throw new Exception("Query preparation failed: " . mysqli_error($this->conn));
            }

            $result1 = $statement1->execute();
            if (!$result1) {
                throw new Exception("Query execution failed: " . mysqli_error($this->conn));
            }

            $statement2 = mysqli_prepare($this->conn, $query2);
            if (!$statement2) {
                throw new Exception("Query preparation failed: " . mysqli_error($this->conn));
            }

            $result2 = $statement2->bind_param("s", $maTtnh);
            if (!$result2) {
                throw new Exception("Parameter binding failed: " . mysqli_error($this->conn));
            }

            $result2 = $statement2->execute();
            if (!$result2) {
                throw new Exception("Query execution failed: " . mysqli_error($this->conn));
            }

            return true;
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
            return false;
        }
    }
}