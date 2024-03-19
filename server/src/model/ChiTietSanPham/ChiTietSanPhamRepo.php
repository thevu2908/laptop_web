<?php

class ChiTietSanPhamRepo extends ConnectDB {
    public function getData() : array | null {
        $productDetails = [];
        try {
            $statement = mysqli_query($this->conn, "SELECT * FROM chitietsanpham");
            
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

    public function getProductDetailsLength() {
        try {
            $query = "SELECT COUNT(*) FROM chitietsanpham";
            $statement = mysqli_query($this->conn, $query);

            return mysqli_fetch_assoc($statement);
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
        }
    }

    public function addProductDetail($productDetail) : bool {
        try {
            $query = "INSERT INTO sanpham(ma_ctsp, ma_sp, ma_chip_xu_ly, ma_mau, ram, rom, hinh_anh, card_do_hoa, gia_tien, so_luong, trang_thai) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)";
            $statement = mysqli_prepare($this->conn, $query);

            if (!$statement) {
                throw new Exception("Query preparation failed: " . mysqli_error($this->conn));
            }

            $productDetailId = $productDetail->getMaCtsp();
            $productId = $productDetail->getMaSp();
            $cpuId = $productDetail->getMaChipXuLy();
            $colorId = $productDetail->getMaMau();
            $ram = $productDetail->getRam();
            $rom = $productDetail->getRom();
            $image = $productDetail->getHinhAnh();
            $gpu = $productDetail->getCardDoHoa();
            $price = $productDetail->getGiaTien();
            $quantity = $productDetail->getSoLuong();

            $result = $statement->bind_param(
                "ssssssssdi", 
                $productDetailId, $productId, $cpuId, $colorId,
                $ram, $rom, $image, $gpu,
                $price, $quantity
            );
            
            if (!$result) {
                throw new Exception("Binding parameters failed: " . mysqli_error($this->conn));
            }

            return $statement->execute();
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
            return false;
        }
    }

    public function updateProductDetail($productDetail) : bool {
        try {
            $query = "UPDATE chitietsanpham SET ma_chip_xu_ly = ?, ma_mau = ?, ram = ?, rom = ?, hinh_anh = ?, card_do_hoa = ?, gia_tien = ?, so_luong = ? WHERE ma_ctsp = ?";
            $statement = mysqli_prepare($this->conn, $query);
            
            if (!$statement) {
                throw new Exception("Query preparation failed: " . mysqli_error($this->conn));
            }

            $productDetailId = $productDetail->getMaCtsp();
            $productId = $productDetail->getMaSp();
            $cpuId = $productDetail->getMaChipXuLy();
            $colorId = $productDetail->getMaMau();
            $ram = $productDetail->getRam();
            $rom = $productDetail->getRom();
            $image = $productDetail->getHinhAnh();
            $gpu = $productDetail->getCardDoHoa();
            $price = $productDetail->getGiaTien();
            $quantity = $productDetail->getSoLuong();
            
            $result = $statement->bind_param(
                "sssssssdis", 
                $productId, $cpuId, $colorId,
                $ram, $rom, $image, $gpu,
                $price, $quantity,
                $productDetailId
            );

            if (!$result) {
                throw new Exception("Binding parameters failed: " . $statement->error);
            }

            return $statement->execute();
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