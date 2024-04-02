<?php

class PaginationRepo extends ConnectDB {
    public function getPanigation($table, $start = 0, $limit = 8) {
        if ($table == "chitietquyen") {
            $query = "SELECT DISTINCT ma_quyen,ma_chuc_nang FROM chitietquyen ORDER BY 1 ASC LIMIT {$start},{$limit}";
        }
        // else if ($table == "sanpham") {
        //     $query = "
        //         SELECT sp.*, ctsp.ma_ctsp, ten_thuong_hieu, ten_loai, ten_hdh, ten_mau, ten_chip, ten_card, ram, rom 
        //         FROM chitietsanpham ctsp
        //         JOIN (
        //             SELECT sp.*, ten_thuong_hieu, ten_loai, ten_hdh
        //             FROM sanpham sp 
        //             JOIN thuonghieu th ON sp.ma_thuong_hieu = th.ma_thuong_hieu
        //             JOIN theloai tl ON sp.ma_the_loai = tl.ma_the_loai
        //             JOIN hedieuhanh hdh ON sp.ma_hdh = hdh.ma_hdh
        //             WHERE sp.trang_thai = '0'
        //         ) AS sp ON ctsp.ma_sp = sp.ma_sp  
        //         JOIN mausac ms ON ctsp.ma_mau = ms.ma_mau
        //         JOIN chipxuly cxl ON ctsp.ma_chip_xu_ly = cxl.ma_chip_xu_ly
        //         JOIN carddohoa cdh ON ctsp.ma_carddohoa = cdh.ma_card
        //         ORDER BY 1 ASC LIMIT {$start},{$limit}
        //     ";
        // } 
        else {
            $query = "SELECT * from  $table ORDER BY 1 ASC LIMIT {$start},{$limit}";
        }
        $result = mysqli_query($this->conn, $query);
        $arrPanigation = array();
        while ($row = mysqli_fetch_array($result)) {
            $arrPanigation[] = $row;
        }
        return $arrPanigation;
    }

    public function getCount($table) {
        if ($table == "chitietquyen") {
            $query = "SELECT count(DISTINCT ma_quyen,ma_chuc_nang) as num FROM chitietquyen";
        }
        // else if ($table == "sanpham") {
        //     $query = "
        //         SELECT count(ctsp.ma_ctsp) as num
        //         FROM chitietsanpham ctsp
        //         JOIN (
        //             SELECT sp.*, ten_thuong_hieu, ten_loai, ten_hdh
        //             FROM sanpham sp 
        //             JOIN thuonghieu th ON sp.ma_thuong_hieu = th.ma_thuong_hieu
        //             JOIN theloai tl ON sp.ma_the_loai = tl.ma_the_loai
        //             JOIN hedieuhanh hdh ON sp.ma_hdh = hdh.ma_hdh
        //             WHERE sp.trang_thai = '0'
        //         ) AS sp ON ctsp.ma_sp = sp.ma_sp  
        //         JOIN mausac ms ON ctsp.ma_mau = ms.ma_mau
        //         JOIN chipxuly cxl ON ctsp.ma_chip_xu_ly = cxl.ma_chip_xu_ly
        //         JOIN carddohoa cdh ON ctsp.ma_carddohoa = cdh.ma_card
        //     ";
        // }
        else {
            $query = "SELECT count(*) as num FROM $table";
        }
        $result = mysqli_query($this->conn, $query);
        if (!$result) {
            return -1;
        }
        if ($row = mysqli_fetch_array($result)) {
            return $row['num'];
        }
        return 0;
    }
}