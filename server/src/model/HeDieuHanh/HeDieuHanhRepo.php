<?php

class HeDieuHanhRepo extends ConnectDB {
    public function getData() : array | null {
        $arrays = [];
        try {
            $statement = mysqli_query($this->conn, "SELECT * FROM hedieuhanh");
            
            while ($row = mysqli_fetch_assoc($statement)) {
                $arrays[] = $row;
            }

            return $arrays;
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
        }
        return null;
    }

    public function getOS($id) {
        try {
            $query = "SELECT * FROM hedieuhanh WHERE ma_hdh = '$id'";
            $statement = mysqli_query($this->conn, $query);

            if ($row = mysqli_fetch_assoc($statement)) {
                return $row;
            }
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
        }
        return null;
    }

    public function getId($name) {
        try {
            $query = "SELECT ma_hdh FROM hedieuhanh WHERE ten_hdh = '$name' AND trang_thai = '0'";
            $statement = mysqli_query($this->conn, $query);

            if ($row = mysqli_fetch_assoc($statement)) {
                return $row['ma_hdh'];
            }
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
        }
        return null;
    }

    public function getLength() : int {
        try {
            $query = "SELECT COUNT(*) as count FROM hedieuhanh";
            $statement = mysqli_query($this->conn, $query);

            $result = mysqli_fetch_assoc($statement);

            return $result["count"] === null ? -1 : (int)$result["count"];
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
            return -1;
        }
    }

    public function add($object) {
        try {
            $query = "INSERT INTO hedieuhanh(ma_hdh, ten_hdh, trang_thai) VALUES (?, ?, 0)";
            $statement = mysqli_prepare($this->conn, $query);

            if (!$statement) {
                throw new Exception("Query preparation failed: " . mysqli_error($this->conn));
            }

            $id = $object->getMaHdh();
            $name = $object->getTenHdh();

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
            $query = "UPDATE hedieuhanh SET trang_thai = 1 WHERE ma_hdh = ?";
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