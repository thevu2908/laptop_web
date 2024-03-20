<?php

class TheLoaiRepo extends ConnectDB {
    public function getData() {
        $arrays = [];
        try {
            $statement = mysqli_query($this->conn, "SELECT * FROM theloai");
            
            while ($row = mysqli_fetch_assoc($statement)) {
                $arrays[] = $row;
            }

            return $arrays;
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
        }
        return null;
    }

    public function getType($id) {
        try {
            $query = "SELECT * FROM theloai WHERE ma_the_loai = '$id'";
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
            $query = "SELECT COUNT(*) FROM theloai";
            $statement = mysqli_query($this->conn, $query);

            return mysqli_fetch_assoc($statement);
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
        }
    }

    public function add($object) {
        try {
            $query = "INSERT INTO theloai(ma_the_loai, ten_loai, trang_thai) VALUES (?, ?, 0)";
            $statement = mysqli_prepare($this->conn, $query);

            if (!$statement) {
                throw new Exception("Query preparation failed: " . mysqli_error($this->conn));
            }

            $id = $object->getMaCong();
            $name = $object->getTenCong();

            $result = $statement->bind_param("ss", $id, $name);
            
            if (!$result) {
                throw new Exception("Binding parameters failed: " . mysqli_error($this->conn));
            }

            return $statement->execute();
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
        }
        return false;
    }

    public function delete($id) {
        try {
            $query = "UPDATE theloai SET trang_thai = 1 WHERE ma_the_loai = ?";
            $statement = mysqli_prepare($this->conn, $query);

            if (!$statement) {
                throw new Exception("Deleting data failed: " . mysqli_error($this->conn));
            }

            $result = $statement->bind_param("s", $id);

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