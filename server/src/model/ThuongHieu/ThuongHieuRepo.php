<?php

class ThuongHieuRepo extends ConnectDB {
    public function getData() {
        $brands = [];
        try {
            $statement = mysqli_query($this->conn, "SELECT * FROM thuonghieu");
            
            while ($row = mysqli_fetch_assoc($statement)) {
                $brands[] = $row;
            }

            return $brands;
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
        }
        return null;
    }

    public function getBrand($brandId) {
        try {
            $query = "SELECT * FROM thuonghieu WHERE ma_ctsp = '$brandId'";
            $statement = mysqli_query($this->conn, $query);

            if ($row = mysqli_fetch_assoc($statement)) {
                return $row;
            }
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
        }
        return null;
    }

    public function getBrandsLength() {
        try {
            $query = "SELECT COUNT(*) FROM thuonghieu";
            $statement = mysqli_query($this->conn, $query);

            return mysqli_fetch_assoc($statement);
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
        }
    }

    public function addBrand($brand) {
        try {
            $query = "INSERT INTO thuonghieu(ma_thuong_hieu, ten_thuong_hieu, trang_thai) VALUES (?, ?, 0)";
            $statement = mysqli_prepare($this->conn, $query);

            if (!$statement) {
                throw new Exception("Query preparation failed: " . mysqli_error($this->conn));
            }

            $brandId = $brand->getMaThuongHieu();
            $brandName = $brand->getTenThuongHieu();

            $result = $statement->bind_param("ss", $brandId, $brandName);
            
            if (!$result) {
                throw new Exception("Binding parameters failed: " . mysqli_error($this->conn));
            }

            return $statement->execute();
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
            return false;
        }
    }

    public function deleteBrand($brandId) : bool {
        try {
            $query = "UPDATE thuonghieu SET trang_thai = 1 WHERE ma_thuong_hieu = ?";
            $statement = mysqli_prepare($this->conn, $query);

            if (!$statement) {
                throw new Exception("Deleting data failed: " . mysqli_error($this->conn));
            }

            $result = $statement->bind_param("s", $brandId);

            if (!$result) {
                throw new Exception("Binding parameters failed: " . $statement->error);
            }

            return $statement->execute();
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
            return false;
        }
    }
}