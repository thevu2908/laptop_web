<?php

class PaginationRepo extends ConnectDB {
    public function getPagination($table, $start = 0, $limit = 8) {
        try {
            if ($table == "chitietquyen") {
                $query = "SELECT DISTINCT ma_quyen,ma_chuc_nang FROM chitietquyen ORDER BY 1 ASC LIMIT {$start},{$limit}";
            } else if ($table == "sanpham") {
                $query = "
                    SELECT sp.*, ten_thuong_hieu, ten_loai, ten_hdh
                    FROM sanpham sp 
                    JOIN thuonghieu th ON sp.ma_thuong_hieu = th.ma_thuong_hieu
                    JOIN theloai tl ON sp.ma_the_loai = tl.ma_the_loai
                    JOIN hedieuhanh hdh ON sp.ma_hdh = hdh.ma_hdh
                    WHERE sp.trang_thai = '0'
                    ORDER BY sp.ma_sp ASC LIMIT {$start}, {$limit}
                ";
            } else {
                $query = "SELECT * from  $table ORDER BY 1 ASC LIMIT {$start},{$limit}";
            }
    
            $result = mysqli_query($this->conn, $query);
            $arrPagination = array();
    
            while ($row = mysqli_fetch_array($result)) {
                $arrPagination[] = $row;
            }
    
            return $arrPagination;
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
            return null;
        }
    }

    public function getCount($table) {
        try {
            if ($table == "chitietquyen") {
                $query = "SELECT count(DISTINCT ma_quyen, ma_chuc_nang) as num FROM chitietquyen";
            } else if ($table == "end-user-sanpham") {
                $query = "
                    SELECT count(*) as num
                    FROM sanpham sp 
                    JOIN thuonghieu th ON sp.ma_thuong_hieu = th.ma_thuong_hieu
                    JOIN theloai tl ON sp.ma_the_loai = tl.ma_the_loai
                    JOIN hedieuhanh hdh ON sp.ma_hdh = hdh.ma_hdh
                    WHERE sp.trang_thai = '0'
                ";
            } else {
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
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
            return -1;
        }
    }
}