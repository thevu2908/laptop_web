<?php

class ChipXuLyRepo extends ConnectDB {
    public function getData() {
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

    public function getCPU($cpuId) {
        try {
            $query = "SELECT * FROM chipxuly WHERE ma_chip_xu_ly = '$cpuId'";
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
            $query = "SELECT COUNT(*) FROM chipxuly";
            $statement = mysqli_query($this->conn, $query);

            return mysqli_fetch_assoc($statement);
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
        }
    }

    public function addCPU($cpu) {
        try {
            $query = "INSERT INTO chip_xu_ly(ma_chip_xu_ly, ten_chip, trang_thai) VALUES (?, ?, 0)";
            $statement = mysqli_prepare($this->conn, $query);

            if (!$statement) {
                throw new Exception("Query preparation failed: " . mysqli_error($this->conn));
            }

            $cpuId = $cpu->getMaChip();
            $cpuName = $cpu->getTenChip();

            $result = $statement->bind_param("ss", $cpuId, $cpuName);
            
            if (!$result) {
                throw new Exception("Binding parameters failed: " . mysqli_error($this->conn));
            }

            return $statement->execute();
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
        }
        return false;
    }

    public function deleteCPU($cpuId) {
        try {
            $query = "UPDATE chipxuly SET trang_thai = 1 WHERE ma_chip_xu_ly = ?";
            $statement = mysqli_prepare($this->conn, $query);

            if (!$statement) {
                throw new Exception("Deleting data failed: " . mysqli_error($this->conn));
            }

            $result = $statement->bind_param("s", $cpuId);

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