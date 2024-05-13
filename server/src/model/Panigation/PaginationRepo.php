<?php

class PaginationRepo extends ConnectDB {
    public function getPagination($table, $start = 0, $limit = 8, $id) : array | null {
        try {
            if ($table == "chitietquyen") {
                $query = "SELECT DISTINCT chitietquyen.ma_quyen,chitietquyen.ma_chuc_nang FROM 
                chitietquyen join nhomquyen on chitietquyen.ma_quyen=nhomquyen.ma_quyen join chucnangquyen 
                on chitietquyen.ma_chuc_nang=chucnangquyen.ma_chuc_nang AND chucnangquyen.trang_thai=0 
                AND nhomquyen.trang_thai=0 ORDER BY 1 ASC LIMIT {$start},{$limit}";
            } else if ($table == "sanpham") {
                $query = "
                    SELECT sp.*, ten_thuong_hieu, ten_loai, ten_hdh
                    FROM sanpham sp 
                    JOIN thuonghieu th ON sp.ma_thuong_hieu = th.ma_thuong_hieu
                    JOIN theloai tl ON sp.ma_the_loai = tl.ma_the_loai
                    JOIN hedieuhanh hdh ON sp.ma_hdh = hdh.ma_hdh
                    WHERE sp.trang_thai = '0'
                    ORDER BY sp.ma_sp ASC LIMIT {$start},{$limit}
                ";
            } else if ($table == "nhaphang") {
                $query = "
                    SELECT * 
                    FROM sanpham sp JOIN chitietsanpham ctsp ON sp.ma_sp = ctsp.ma_sp JOIN mausac ms ON ctsp.ma_mau = ms.ma_mau
                    JOIN chipxuly cxl ON ctsp.ma_chip_xu_ly = cxl.ma_chip_xu_ly
                    JOIN carddohoa cdh ON ctsp.ma_carddohoa = cdh.ma_card
                    ORDER BY sp.ma_sp, ctsp.ma_ctsp LIMIT {$start},{$limit}
                ";
            }else if ($table == "chitietsanpham") {
                $query = "
                    SELECT ctsp.*, ms.ten_mau, cxl.ten_chip, cdh.ten_card FROM chitietsanpham ctsp
                    JOIN mausac ms ON ctsp.ma_mau = ms.ma_mau
                    JOIN chipxuly cxl ON ctsp.ma_chip_xu_ly = cxl.ma_chip_xu_ly
                    JOIN carddohoa cdh ON ctsp.ma_carddohoa = cdh.ma_card
                    WHERE ctsp.ma_sp = '$id' AND ctsp.trang_thai = '0'
                    ORDER BY ctsp.ma_ctsp ASC LIMIT {$start},{$limit}
                ";
            } else if ($table == "hoadon") {
                $query = "
                    SELECT *
                    FROM hoadon
                    WHERE trang_thai = '0' AND tinh_trang LIKE '%{$id}%'
                    ORDER BY 1 ASC LIMIT {$start},{$limit}
                ";
            } else if ($table == "danhgia") {
                $query = "
                    SELECT *
                    FROM danhgia
                    WHERE trang_thai = '0' AND ma_sp LIKE '%{$id}%'
                    ORDER BY 1 ASC LIMIT {$start},{$limit}
                ";
            } else if ($table == "phieunhap") {
                $query = "
                    SELECT *
                    FROM phieunhap
                    WHERE trang_thai = '0' AND tinh_trang LIKE '%{$id}%'
                    ORDER BY 1 ASC LIMIT {$start},{$limit}
                ";
            } else {
                $query = "SELECT * from $table WHERE trang_thai = '0' ORDER BY 1 ASC LIMIT {$start},{$limit}";
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

    public function getCount($table, $id) {
        try {
            if ($table == "chitietquyen") {
                $query = "SELECT count(DISTINCT nhomquyen.ma_quyen, chucnangquyen.ma_chuc_nang) as num FROM chitietquyen join nhomquyen on chitietquyen.ma_quyen=nhomquyen.ma_quyen join chucnangquyen 
                on chitietquyen.ma_chuc_nang=chucnangquyen.ma_chuc_nang AND chucnangquyen.trang_thai='0'
                AND nhomquyen.trang_thai='0'";
            }else if ($table == "nhaphang") {
                $query = "SELECT count(*) as num FROM sanpham sp JOIN chitietsanpham ctsp ON sp.ma_sp = ctsp.ma_sp JOIN mausac ms ON ctsp.ma_mau = ms.ma_mau
                    JOIN chipxuly cxl ON ctsp.ma_chip_xu_ly = cxl.ma_chip_xu_ly
                    JOIN carddohoa cdh ON ctsp.ma_carddohoa = cdh.ma_card";
            }
             else if ($table == "chitietsanpham") {
                $query = "SELECT count(*) as num FROM chitietsanpham WHERE ma_sp = '$id' AND trang_thai = '0'";
            } else if ($table == "hoadon") {
                $query = "SELECT count(*) as num FROM hoadon WHERE tinh_trang LIKE '%$id%' AND trang_thai = '0'";
            } else if ($table == "danhgia") {
                $query = "SELECT count(*) as num FROM danhgia WHERE ma_sp LIKE '%$id%' AND trang_thai = '0'";
            } else if ($table == "phieunhap") {
                $query = "SELECT count(*) as num FROM phieunhap WHERE tinh_trang LIKE '%$id%' AND trang_thai = '0'";
            } else {
                $query = "SELECT count(*) as num FROM $table WHERE trang_thai = '0'";
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