<?php

class SanPhamRepo extends ConnectDB {
    public function getProducts() {
        $products = [];
        try {
            $query = "
                SELECT sp.*, ctsp.ma_ctsp, ten_thuong_hieu, ten_loai, ten_hdh, ten_mau, ten_chip, ten_card, ram, rom 
                FROM chitietsanpham ctsp
                JOIN (
                    SELECT sp.*, ten_thuong_hieu, ten_loai, ten_hdh
                    FROM sanpham sp 
                    JOIN thuonghieu th ON sp.ma_thuong_hieu = th.ma_thuong_hieu
                    JOIN theloai tl ON sp.ma_the_loai = tl.ma_the_loai
                    JOIN hedieuhanh hdh ON sp.ma_hdh = hdh.ma_hdh
                    WHERE sp.trang_thai = '0'
                ) AS sp ON ctsp.ma_sp = sp.ma_sp  
                JOIN mausac ms ON ctsp.ma_mau = ms.ma_mau
                JOIN chipxuly cxl ON ctsp.ma_chip_xu_ly = cxl.ma_chip_xu_ly
                JOIN carddohoa cdh ON ctsp.ma_carddohoa = cdh.ma_card
                ORDER BY sp.ma_sp ASC
            ";
            $statement = mysqli_query($this->conn, $query);

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

    public function getProductFullInfo($productId) {
        try {
            $product = [];
            $query = "
                SELECT sp.*, ctsp.*, th.ten_thuong_hieu, tl.ten_loai, hdh.ten_hdh, ms.ten_mau, cxl.ten_chip, cdh.ten_card FROM sanpham sp 
                JOIN chitietsanpham ctsp ON sp.ma_sp = ctsp.ma_sp
                JOIN thuonghieu th ON sp.ma_thuong_hieu = th.ma_thuong_hieu
                JOIN theloai tl ON sp.ma_the_loai = tl.ma_the_loai
                JOIN hedieuhanh hdh ON sp.ma_hdh = hdh.ma_hdh
                JOIN mausac ms ON ctsp.ma_mau = ms.ma_mau
                JOIN chipxuly cxl ON ctsp.ma_chip_xu_ly = cxl.ma_chip_xu_ly
                JOIN carddohoa cdh ON ctsp.ma_carddohoa = cdh.ma_card
                WHERE sp.ma_sp = '$productId'
            ";
            $statement = mysqli_query($this->conn, $query);

            while ($row = mysqli_fetch_assoc($statement)) {
                $product[] = $row;
            }

            return $product;
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
            $query = "INSERT INTO sanpham(ma_sp, ma_thuong_hieu, ma_the_loai, ma_hdh, ten_sp, hinh_anh, kich_co_man_hinh, do_phan_giai, pin, ban_phim, gia_ban, 
                gia_nhap, chiet_khau, trong_luong, chat_lieu, xuat_xu, so_luong_ton, trang_thai) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)";
            $statement = mysqli_prepare($this->conn, $query);

            if (!$statement) {
                throw new Exception("Query preparation failed: " . mysqli_error($this->conn));
            }

            $productId = $product->getMaSp();
            $brandId = $product->getMaThuongHieu();
            $typeId = $product->getMaTheLoai();
            $osId = $product->getMaHdh();
            $productName = $product->getTenSp();
            $productImage = $product->getHinhAnh();
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
                "ssssssssssddddssi", 
                $productId, $brandId, $typeId, $osId,
                $productName, $productImage, $screen, $resolution, $battery, $keyboard,
                $price, $importPrice, $chietkhau,
                $weight, $material, $origin, $quantity
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

    public function updateProduct($product) : bool {
        try {
            $query = "UPDATE sanpham SET ma_thuong_hieu = ?, ma_the_loai = ?, ma_hdh = ?, ten_sp = ?, hinh_anh = ?, kich_co_man_hinh = ?, do_phan_giai = ?, pin = ?,
                ban_phim = ?, gia_ban = ?, gia_nhap = ?, chiet_khau = ?, trong_luong = ?, chat_lieu = ?, xuat_xu = ?, so_luong_ton = ? WHERE ma_sp = ?";
            $statement = mysqli_prepare($this->conn, $query);
            
            if (!$statement) {
                throw new Exception("Query preparation failed: " . mysqli_error($this->conn));
            }

            $productId = $product->getMaSp();
            $brandId = $product->getMaThuongHieu();
            $typeId = $product->getMaTheLoai();
            $osId = $product->getMaHdh();
            $productName = $product->getTenSp();
            $productImage = $product->getHinhAnh();
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
                "sssssssssddddssis", 
                $brandId, $typeId, $osId,
                $productName, $productImage, $screen, $resolution, $battery, $keyboard,
                $price, $importPrice, $chietkhau,
                $weight, $material, $origin, $quantity,
                $productId
            );

            if (!$result) {
                throw new Exception("Binding parameters failed: " . $statement->error);
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
}