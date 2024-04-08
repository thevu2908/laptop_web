<?php

class ChiTietSanPhamRepo extends ConnectDB {
    public function getData($productId) : array | null {
        $productDetails = [];
        try {
            $statement = mysqli_query($this->conn, "SELECT * FROM chitietsanpham WHERE ma_sp = '$productId'");
            
            while ($row = mysqli_fetch_assoc($statement)) {
                $productDetails[] = $row;
            }

            return $productDetails;
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
        }
        return null;
    }

    public function getProductDetail($productDetailId) {
        try {
            $query = "SELECT * FROM chitietsanpham WHERE ma_ctsp = '$productDetailId'";
            $statement = mysqli_query($this->conn, $query);

            if ($row = mysqli_fetch_assoc($statement)) {
                return $row;
            }
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
        }
        return null;
    }

    public function getProductDetailByProductId($productId) {
        try {
            $query = "
                SELECT ctsp.*, ten_mau, ten_chip, ten_card, ram, rom FROM chitietsanpham ctsp 
                JOIN mausac ms ON ctsp.ma_mau = ms.ma_mau
                JOIN chipxuly cxl ON ctsp.ma_chip_xu_ly = cxl.ma_chip_xu_ly
                JOIN carddohoa cdh ON ctsp.ma_carddohoa = cdh.ma_card
                WHERE ma_sp = '$productId' AND ctsp.trang_thai = '0'
            ";
            $statement = mysqli_query($this->conn, $query);

            $productDetails = [];
            while ($row = mysqli_fetch_assoc($statement)) {
                $productDetails[] = $row;
            }

            return $productDetails;
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
        }
        return null;
    }

    public function getProductDetailsLength() : int {
        try {
            $query = "SELECT COUNT(*) as count FROM chitietsanpham";
            $statement = mysqli_query($this->conn, $query);

            $result = mysqli_fetch_assoc($statement);

            return $result['count'] === null ? -1 : (int)$result['count'];
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
            return -1;
        }
    }

    public function addProductDetail($productDetail) : bool {
        try {
            $query = "INSERT INTO chitietsanpham(ma_ctsp, ma_sp, ma_chip_xu_ly, ma_mau, ma_carddohoa, ram, rom, gia_nhap, chiet_khau, gia_tien, so_luong, trang_thai) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)";
            $statement = mysqli_prepare($this->conn, $query);

            if (!$statement) {
                throw new Exception("Query preparation failed: " . mysqli_error($this->conn));
            }

            $productDetailId = $productDetail->getMaCtsp();
            $productId = $productDetail->getMaSp();
            $cpuId = $productDetail->getMaChipXuLy();
            $colorId = $productDetail->getMaMau();
            $gpuId = $productDetail->getMaCardDoHoa();
            $ram = $productDetail->getRam();
            $rom = $productDetail->getRom();
            $importPrice = $productDetail->getGiaNhap();
            $chietkhau = $productDetail->getChietKhau();
            $price = $productDetail->getGiaTien();
            $quantity = $productDetail->getSoLuong();

            $result = $statement->bind_param(
                "sssssssdddi", 
                $productDetailId, $productId, $cpuId, $colorId, $gpuId,
                $ram, $rom,
                $importPrice, $chietkhau, $price, $quantity
            );
            
            if (!$result) {
                throw new Exception("Binding parameters failed: " . mysqli_error($this->conn));
            }

            if ($statement->execute()) {
                return true;
            } else {
                throw new Exception("Execution of query failed: " . mysqli_error($this->conn));
            }
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
            return false;
        }
    }

    public function deleteProductDetail($productDetailId) : bool {
        try {
            $query = "UPDATE chitietsanpham SET trang_thai = 1 WHERE ma_ctsp = ?";
            $statement = mysqli_prepare($this->conn, $query);

            if (!$statement) {
                throw new Exception("Deleting data failed: " . mysqli_error($this->conn));
            }

            $result = $statement->bind_param("s", $productDetailId);

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