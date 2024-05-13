<?php

class ImeiRepo extends ConnectDB {
    public function getProductDetailImeiLength($productDetailId) : int {
        try {
            $query = "SELECT COUNT(*) AS count FROM ctsp_imei WHERE ma_ctsp = '$productDetailId'";
            $result = mysqli_query($this->conn, $query);
            if (!$result) {
                throw new Exception("Query failed: " . mysqli_error($this->conn));
            }
            $row = mysqli_fetch_assoc($result);
            return $row['count'];
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
            return -1;
        }
    }

    public function addImei($imei) : bool {
        try {
            $imeiId = $imei->getImeiId();
            $productDetailId = $imei->getProductDetailId();
            $status = $imei->getStatus();

            $query = "INSERT INTO ctsp_imei VALUES ('$imeiId', '$productDetailId', '$status')";
            $result = mysqli_query($this->conn, $query);
            if (!$result) {
                throw new Exception("Query failed: " . mysqli_error($this->conn));
            }
            return $result;
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
            return false;
        }
    }

    public function deleteImei($imeiId) : bool {
        try {
            $query = "UPDATE ctsp_imei SET trang_thai = 1 WHERE ma_imei = '$imeiId'";
            $result = mysqli_query($this->conn, $query);
            if (!$result) {
                throw new Exception("Query failed: " . mysqli_error($this->conn));
            }
            return $result;
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
            return false;
        }
    }
}