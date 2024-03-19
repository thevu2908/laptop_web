<?php

class MauSacRepo extends ConnectDB {
    public function getData() {
        $colors = [];
        try {
            $statement = mysqli_query($this->conn, "SELECT * FROM mausac");
            
            while ($row = mysqli_fetch_assoc($statement)) {
                $colors[] = $row;
            }

            return $colors;
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
        }
        return null;
    }

    public function getColor($colorId) {
        try {
            $query = "SELECT * FROM mausac WHERE ma_mau = '$colorId'";
            $statement = mysqli_query($this->conn, $query);

            if ($row = mysqli_fetch_assoc($statement)) {
                return $row;
            }
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
        }
        return null;
    }

    public function getColorsLength() {
        try {
            $query = "SELECT COUNT(*) FROM mausac";
            $statement = mysqli_query($this->conn, $query);

            return mysqli_fetch_assoc($statement);
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
        }
    }

    public function addColor($color) {
        try {
            $query = "INSERT INTO mausac(ma_mau, ten_mau, trang_thai) VALUES (?, ?, 0)";
            $statement = mysqli_prepare($this->conn, $query);

            if (!$statement) {
                throw new Exception("Query preparation failed: " . mysqli_error($this->conn));
            }

            $colorId = $color->getMaMau();
            $colorName = $color->getTenMau();

            $result = $statement->bind_param("ss", $colorId, $colorName);
            
            if (!$result) {
                throw new Exception("Binding parameters failed: " . mysqli_error($this->conn));
            }

            return $statement->execute();
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
            return false;
        }
    }

    public function deleteColor($colorId) : bool {
        try {
            $query = "UPDATE mausac SET trang_thai = 1 WHERE ma_mau = ?";
            $statement = mysqli_prepare($this->conn, $query);

            if (!$statement) {
                throw new Exception("Deleting data failed: " . mysqli_error($this->conn));
            }

            $result = $statement->bind_param("s", $colorId);

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