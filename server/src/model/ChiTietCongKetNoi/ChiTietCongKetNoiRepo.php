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

    public function getChiTietCong($plugId, $productDetailId) {
        try {
            $query = "SELECT * FROM chitietcongketnoi WHERE ma_cong = '$plugId' AND ma_ctsp = '$productDetailId'";
            $statement = mysqli_query($this->conn, $query);

            if ($row = mysqli_fetch_assoc($statement)) {
                return $row;
            }
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