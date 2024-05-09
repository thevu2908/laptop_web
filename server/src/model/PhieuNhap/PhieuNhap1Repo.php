<?php

class PhieuNhap1Repo extends ConnectDB {
    public function getData() : array | null {
        $phieunhaps = [];
        try {
            $statement = mysqli_query($this->conn, "SELECT * FROM phieunhap");

            while ($row = mysqli_fetch_array($statement)) {
                $phieunhaps[] = $row;
            }

            return $phieunhaps;
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
        }
        return null;
    }
}