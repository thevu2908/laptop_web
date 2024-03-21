<?php

class SanPhamRepo extends ConnectDB {
    public function getData() : array | null {
        $products = [];
        try {
            $statement = mysqli_query($this->conn, "SELECT * FROM sanpham");
            
            while ($row = mysqli_fetch_assoc($statement)) {
                $products[] = $row;
            }

            return $products;
        } catch (Exception $e) {
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

    public function getProductsLength() : int {
        try {
            $query = "SELECT COUNT(*) as count FROM sanpham";
            $statement = mysqli_query($this->conn, $query);

            $result = mysqli_fetch_assoc($statement);

            return $result['count'] === null ? - 1 : (int)$result['count'];
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
            return -1;
        }
    }

    public function addProduct($product) : bool {
        try {
            $query = "INSERT INTO sanpham(ma_sp, ma_thuong_hieu, ma_the_loai, ma_hdh, ten_sp, kich_co_man_hinh, do_phan_giai, pin, ban_phim, gia_ban, 
                gia_nhap, chiet_khau, trong_luong, chat_lieu, xuat_xu, so_luong_ton, trang_thai) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)";
            $statement = mysqli_prepare($this->conn, $query);

            if (!$statement) {
                throw new Exception("Query preparation failed: " . mysqli_error($this->conn));
            }

            $productId = $product->getMaSp();
            $brandId = $product->getMaThuongHieu();
            $typeId = $product->getMaTheLoai();
            $osId = $product->getMaHdh();
            $productName = $product->getTenSp();
            $screen = $product->getKichCoManHinh();
            $resolution = $product->getDoPhanGiai();
            $battery = $product->getPin();
            $keyboard = $product->getBanPhim();
            $importPrice = $product->getGiaNhap();
            $chietkhau = $product->getChietKhau();
            $price = $product->getGiaBan();
            $weight = $product->getTrongLuong();
            $material = $product->getChatLieu();
            $origin = $product->getXuatXu();
            $quantity = $product->getSoLuongTon();

            $result = $statement->bind_param(
                "sssssssssdiddssi", 
                $productId, $brandId, $typeId, $osId,
                $productName, $screen, $resolution, $battery, $keyboard,
                $price, $importPrice, $chietkhau,
                $weight, $material, $origin, $quantity
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

    public function deleteProduct($productId) : bool {
        try {
            $query = "UPDATE sanpham SET trang_thai = 1 WHERE ma_sp = ?";
            $statement = mysqli_prepare($this->conn, $query);

            if (!$statement) {
                throw new Exception("Deleting data failed: " . mysqli_error($this->conn));
            }

            $result = $statement->bind_param("s", $productId);

            if (!$result) {
                throw new Exception("Binding parameters failed: " . $statement->error);
            }

            return $statement->execute();
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
            return false;
        }
    }

    public function updateProduct($product) : bool {
        try {
            $query = "UPDATE sanpham SET ma_thuong_hieu = ?, ma_the_loai = ?, ma_hdh = ?, ten_sp = ?, kich_co_man_hinh = ?, do_phan_giai = ?, pin = ?, ban_phim = ?,  
                gia_ban = ?, gia_nhap = ?, chiet_khau = ?, trong_luong = ?, chat_lieu = ?, xuat_xu = ?, so_luong_ton = ? WHERE ma_sp = ?";
            $statement = mysqli_prepare($this->conn, $query);
            
            if (!$statement) {
                throw new Exception("Query preparation failed: " . mysqli_error($this->conn));
            }

            $productId = $product->getMaSp();
            $brandId = $product->getMaThuongHieu();
            $typeId = $product->getMaTheLoai();
            $osId = $product->getMaHdh();
            $productName = $product->getTenSp();
            $screen = $product->getKichCoManHinh();
            $resolution = $product->getDoPhanGiai();
            $battery = $product->getPin();
            $keyboard = $product->getBanPhim();
            $importPrice = $product->getGiaNhap();
            $chietkhau = $product->getChietKhau();
            $price = $product->getGiaBan();
            $weight = $product->getTrongLuong();
            $material = $product->getChatLieu();
            $origin = $product->getXuatXu();
            $quantity = $product->getSoLuongTon();

            $result = $statement->bind_param(
                "ssssssssdiddssis", 
                $brandId, $typeId, $osId,
                $productName, $screen, $resolution, $battery, $keyboard,
                $price, $importPrice, $chietkhau,
                $weight, $material, $origin, $quantity,
                $productId
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
}