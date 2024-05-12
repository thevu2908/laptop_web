<?php

class PhieuNhap1Repo extends ConnectDB {
    public function getData() : array | null {
        $phieunhaps = [];
        try {
            $statement = mysqli_query($this->conn, "SELECT * FROM phieunhap ORDER BY ngay_nhap DESC");

            while ($row = mysqli_fetch_array($statement)) {
                $phieunhaps[] = $row;
            }

            return $phieunhaps;
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
        }
        return null;
    }

    public function getImportInvoice($id) {
        try {
            $sql = "SELECT pn.*, ncc.*, nv.ten_nv FROM phieunhap pn
                JOIN nhacungcap ncc ON pn.ma_ncc = ncc.ma_ncc
                JOIN nhanvien nv ON nv.ma_nv = pn.ma_nv
                WHERE ma_pn = '$id'";

            $result = mysqli_query($this->conn, $sql);
            if (!$result) {
                throw new Exception("Query failed: " . mysqli_error($this->conn));
            }
            return mysqli_fetch_array($result);
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
            return null;
        }
    }

    public function confirmImportInvoice($id) {
        try {
            $query = "UPDATE phieunhap SET tinh_trang = 1 WHERE ma_pn = '$id'";
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