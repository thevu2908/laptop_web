<?php

class CongKetNoiRepo extends ConnectDB {
    public function getData() : array | null {
        $plugs = [];
        try {
            $statement = mysqli_query($this->conn, "SELECT * FROM congketnoi");
            
            while ($row = mysqli_fetch_assoc($statement)) {
                $plugs[] = $row;
            }

            return $plugs;
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
        }
        return null;
    }

    public function getPlug($id) {
        try {
            $query = "SELECT * FROM congketnoi WHERE ma_cong = '$id'";
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
            $query = "SELECT ma_cong FROM congketnoi WHERE ten_cong = '$name' AND trang_thai = '0'";
            $statement = mysqli_query($this->conn, $query);

            if ($row = mysqli_fetch_assoc($statement)) {
                return $row['ma_cong'];
            }
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
        }
        return null;
    }

    public function getLength() : int {
        try {
            $query = "SELECT COUNT(*) as count FROM congketnoi";
            $statement = mysqli_query($this->conn, $query);

            $result = mysqli_fetch_assoc($statement);

            return $result["count"] === null ? -1 : (int)$result["count"];
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
            return -1;
        }
    }

    public function add($object) : bool {
        try {
            $query = "INSERT INTO congketnoi(ma_cong, ten_cong, trang_thai) VALUES (?, ?, 0)";
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

    public function delete($id) : bool {
        try {
            $query = "UPDATE congketnoi SET trang_thai = 1 WHERE ma_cong = ?";
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