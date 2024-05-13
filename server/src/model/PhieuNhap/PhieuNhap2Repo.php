<?php

class PhieuNhap2Repo extends ConnectDB {
    public function getData() : array | null {
        $phieunhaps1 = [];
        try {
            $statement = mysqli_query($this->conn, 
                "SELECT * FROM sanpham sp JOIN chitietsanpham ctsp ON sp.ma_sp = ctsp.ma_sp JOIN mausac ms ON ctsp.ma_mau = ms.ma_mau
                JOIN chipxuly cxl ON ctsp.ma_chip_xu_ly = cxl.ma_chip_xu_ly
                JOIN carddohoa cdh ON ctsp.ma_carddohoa = cdh.ma_card
                ORDER BY sp.ma_sp, ctsp.ma_ctsp
            ");

            while ($row = mysqli_fetch_array($statement)) {
                $phieunhaps1[] = $row;
            }

            return $phieunhaps1;
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
        }
        return null;
    }
}