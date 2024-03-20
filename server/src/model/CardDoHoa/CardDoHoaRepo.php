<?php

class CardDoHoaRepo extends ConnectDB {
    public function getData() {
        $arrays = [];
        try {
            $statement = mysqli_query($this->conn, "SELECT * FROM cardohoa");
            
            while ($row = mysqli_fetch_assoc($statement)) {
                $arrays[] = $row;
            }

            return $arrays;
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
        }
        return null;
    }

    public function getGPU($id) {
        try {
            $query = "SELECT * FROM cardohoa WHERE ma_card = '$id'";
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
            $query = "SELECT COUNT(*) FROM cardohoa";
            $statement = mysqli_query($this->conn, $query);

            return mysqli_fetch_assoc($statement);
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
        }
    }

    public function add($object) {
        try {
            $query = "INSERT INTO cardohoa(ma_card, ten_card, trang_thai) VALUES (?, ?, 0)";
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
            $query = "UPDATE cardohoa SET trang_thai = 1 WHERE ma_card = ?";
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