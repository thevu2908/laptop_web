<?php

class NhanVienRepo extends ConnectDB {
    public function getData() : array | null {
        $employees = [];
        try {
            $statement = mysqli_query($this->conn, "SELECT * FROM nhanvien");

            while ($row = mysqli_fetch_array($statement)) {
                $employees[] = $row;
            }

            return $employees;
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
        }
        return null;
    }
}