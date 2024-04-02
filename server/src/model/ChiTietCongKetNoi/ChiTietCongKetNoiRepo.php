<?php

class ChiTietCongKetNoiRepo extends ConnectDB {
    public function getData() {
        $arrays = [];
        try {
            $statement = mysqli_query($this->conn, "SELECT * FROM chitietcongketnoi");
            
            while ($row = mysqli_fetch_assoc($statement)) {
                $arrays[] = $row;
            }

            return $arrays;
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
        }
        return null;
    }

    public function getChiTietCong($productDetailId) {
        $arrays = [];
        try {
            $query = "SELECT ctckn.*, ten_cong FROM chitietcongketnoi ctckn JOIN congketnoi ckn ON ctckn.ma_cong = ckn.ma_cong WHERE ma_ctsp = '$productDetailId'";
            $statement = mysqli_query($this->conn, $query);

            while ($row = mysqli_fetch_assoc($statement)) {
                $arrays[] = $row;
            }

            return $arrays;
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
        }
        return null;
    }

    public function getProductPlugs($productId) {
        $res = [];
        try {
            $query = "SELECT DISTINCT ten_cong FROM chitietcongketnoi ctckn JOIN chitietsanpham ctsp JOIN congketnoi ckn
                        WHERE ctckn.ma_ctsp = ctsp.ma_ctsp AND ctckn.ma_cong = ckn.ma_cong AND ctsp.trang_thai = '0' AND ctsp.ma_ctsp IN 
                        (SELECT ma_ctsp FROM sanpham sp JOIN chitietsanpham ctsp2 WHERE sp.ma_sp = ctsp2.ma_sp AND sp.ma_sp = '$productId')";
            $statement = mysqli_query($this->conn, $query);

            while ($row = mysqli_fetch_assoc($statement)) {
                $res[] = $row['ten_cong'];
            }

            return $res;
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
        }
        return null;
    }

    public function getLength() {
        try {
            $query = "SELECT COUNT(*) FROM chitietcongketnoi";
            $statement = mysqli_query($this->conn, $query);

            return mysqli_fetch_assoc($statement);
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
        }
    }

    public function add($object) {
        try {
            $query = "INSERT INTO chitietcongketnoi(ma_cong, ma_ctsp) VALUES (?, ?)";
            $statement = mysqli_prepare($this->conn, $query);

            if (!$statement) {
                throw new Exception("Query preparation failed: " . mysqli_error($this->conn));
            }

            $plugId = $object->getMaCong();
            $productDetailId = $object->getMaCtsp();

            $result = $statement->bind_param("ss", $plugId, $productDetailId);
            
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
        }
        return false;
    }

    public function delete($plugId, $productDetailId) {
        try {
            $query = "DELETE FROM chitietcongketnoi WHERE ma_cong = ? AND ma_ctsp = ?";
            $statement = mysqli_prepare($this->conn, $query);

            if (!$statement) {
                throw new Exception("Deleting data failed: " . mysqli_error($this->conn));
            }

            $result = $statement->bind_param("ss", $plugId, $productDetailId);

            if (!$result) {
                throw new Exception("Binding parameters failed: " . $statement->error);
            }

            return $statement->execute();
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
        }
        return false;
    }
}