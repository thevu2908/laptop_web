<?php

class ChipXuLyRepo extends ConnectDB {
    public function getData() : array | null {
        $cpus = [];
        try {
            $statement = mysqli_query($this->conn, "SELECT * FROM chipxuly");
            
            while ($row = mysqli_fetch_assoc($statement)) {
                $cpus[] = $row;
            }

            return $cpus;
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
        }
        return null;
    }

    public function getCPU($id) {
        try {
            $query = "SELECT * FROM chipxuly WHERE ma_chip_xu_ly = '$id'";
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
            $query = "SELECT ma_chip_xu_ly FROM chipxuly WHERE ten_chip = '$name' AND trang_thai = '0'";
            $statement = mysqli_query($this->conn, $query);

            if ($row = mysqli_fetch_assoc($statement)) {
                return $row['ma_chip_xu_ly'];
            }
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
        }
        return null;
    }

    public function getLength() : int {
        try {
            $query = "SELECT COUNT(*) as count FROM chipxuly";
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
            $query = "INSERT INTO chipxuly(ma_chip_xu_ly, ten_chip, trang_thai) VALUES (?, ?, 0)";
            $statement = mysqli_prepare($this->conn, $query);

            if (!$statement) {
                throw new Exception("Query preparation failed: " . mysqli_error($this->conn));
            }

            $id = $object->getMaChipXuLy();
            $name = $object->getTenChip();

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
            $query = "UPDATE chipxuly SET trang_thai = 1 WHERE ma_chip_xu_ly = ?";
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