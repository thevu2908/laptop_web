<?php

class SearchRepo extends ConnectDB
{
    public function search($search, $table, $start = 0, $limit = 8, $id): array | null
    {
        try {
            $searchs = [];
            $search_term = $this->conn->real_escape_string($search);
            if ($table == "sanpham") {
                $query = "
                    SELECT sp.*, ten_thuong_hieu, ten_loai, ten_hdh FROM sanpham sp
                    JOIN thuonghieu th ON sp.ma_thuong_hieu = th.ma_thuong_hieu
                    JOIN theloai tl ON sp.ma_the_loai = tl.ma_the_loai
                    JOIN hedieuhanh hdh ON sp.ma_hdh = hdh.ma_hdh
                    WHERE CONCAT(ma_sp, ten_sp, ten_thuong_hieu) LIKE '%$search_term%'
                    ORDER BY ma_sp LIMIT {$start},{$limit}
                ";
            } else if ($table == "nhaphang") {
                 $query = "
                SELECT * FROM sanpham sp JOIN chitietsanpham ctsp ON sp.ma_sp = ctsp.ma_sp JOIN mausac ms ON ctsp.ma_mau = ms.ma_mau
                JOIN chipxuly cxl ON ctsp.ma_chip_xu_ly = cxl.ma_chip_xu_ly
                JOIN carddohoa cdh ON ctsp.ma_carddohoa = cdh.ma_card
                WHERE CONCAT(sp.ma_sp, ctsp.ma_ctsp, ten_sp, ram, rom, ten_mau, ten_chip, ten_card) LIKE '%$search_term%'
                ORDER BY sp.ma_sp, ctsp.ma_ctsp
                LIMIT {$start},{$limit}
            ";

            } else if ($table == "chitietsanpham") {
                $query = "
                    SELECT ctsp.*, ms.ten_mau, cxl.ten_chip, cdh.ten_card FROM chitietsanpham ctsp
                    JOIN mausac ms ON ctsp.ma_mau = ms.ma_mau
                    JOIN chipxuly cxl ON ctsp.ma_chip_xu_ly = cxl.ma_chip_xu_ly
                    JOIN carddohoa cdh ON ctsp.ma_carddohoa = cdh.ma_card
                    WHERE ctsp.ma_sp = '$id' AND CONCAT(ctsp.ma_ctsp, ms.ten_mau, cxl.ten_chip, cdh.ten_card, ram, rom) LIKE '%$search_term%'
                    ORDER BY ctsp.ma_ctsp ASC LIMIT {$start},{$limit}
                ";
            } else if($table == "hoadon") {
                $query = "
                    SELECT * 
                    FROM `hoadon` hd
                    JOIN `khachhang` kh on kh.ma_kh=hd.ma_kh
                    JOIN `nhanvien` nv on nv.ma_nv=hd.ma_nv
                    WHERE CONCAT(ma_hd, kh.ten_kh, nv.ten_nv, ngay_tao, hinh_thuc) LIKE '%$search_term%'
                    ORDER BY hd.ma_hd ASC LIMIT {$start},{$limit}
                ";
            } else {
                $query = "SELECT * FROM $table WHERE CONCAT(";
                $result = $this->conn->query("SHOW COLUMNS FROM $table");
                $columns = array();
                while ($row = $result->fetch_assoc()) {
                    if (str_contains($row['Field'], 'ma') || str_contains($row['Field'], 'ten')) {
                        $columns[] = $row['Field'];
                    }
                }
                $query .= implode(" , ", $columns) . ") LIKE '%$search_term%' ORDER BY $columns[0] LIMIT {$start},{$limit}";
            }

            $result = $this->conn->query($query);

            if ($result === false) {
                throw new Exception("Query execution failed." . $this->conn->error);
            }

            while ($row = $result->fetch_assoc()) {
                $searchs[] = $row;
            }
            return $searchs;
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
        }
        return null;
    }
    public function filterTable($search, $table, $start = 0, $limit = 8)
    {
        if ($table == "chitietquyen") {
            $query = "SELECT DISTINCT ma_quyen,ma_chuc_nang FROM chitietquyen WHERE ma_quyen='$search' ORDER BY 1 ASC LIMIT {$start},{$limit}";
            $arrSearch = array();
            $result = mysqli_query($this->conn, $query);
            while ($row = mysqli_fetch_assoc($result)) {
                $arrSearch[] = $row;
            }
            return $arrSearch;
        }
    }
    public function getCountFilterTable($table, $search)
    {
        if ($table == "chitietquyen") {
            $query = "SELECT COUNT(DISTINCT ma_quyen,ma_chuc_nang) as num FROM chitietquyen where ma_quyen='$search'";
            $result = mysqli_query($this->conn, $query);
            if ($row = mysqli_fetch_assoc($result)) {
                return $row['num'];
            }
            return 0;
        }
    }
    public function getCount($table, $search, $id)
    {
        try {
            $search_term = $this->conn->real_escape_string($search);
            if ($table == 'sanpham') {
                $query = "
                    SELECT count(*) as num FROM sanpham sp JOIN chitietsanpham ctsp ON sp.ma_sp = ctsp.ma_sp JOIN mausac ms ON ctsp.ma_mau = ms.ma_mau
                    JOIN chipxuly cxl ON ctsp.ma_chip_xu_ly = cxl.ma_chip_xu_ly
                    JOIN carddohoa cdh ON ctsp.ma_carddohoa = cdh.ma_card
                    ORDER BY sp.ma_sp, ctsp.ma_ctsp
                    WHERE CONCAT(ma_sp, ten_sp, ten_thuong_hieu) LIKE '%$search_term%'
                ";
            } else if ($table == "nhaphang") {
                $query = "
                    SELECT count(*) as num FROM sanpham sp
                    JOIN chitietsanpham ctsp ON sp.ma_sp = ctsp.ma_sp
                    JOIN mausac ms ON ctsp.ma_mau = ms.ma_mau
                    JOIN chipxuly cxl ON ctsp.ma_chip_xu_ly = cxl.ma_chip_xu_ly
                    JOIN carddohoa cdh ON ctsp.ma_carddohoa = cdh.ma_card
                    WHERE CONCAT(sp.ma_sp, ctsp.ma_ctsp, ten_sp, ram, rom, ten_mau, ten_chip, ten_card) LIKE '%$search_term%'
                ";
            } else if ($table == "chitietsanpham") {
                $query = "
                    SELECT count(*) as num FROM chitietsanpham ctsp
                    JOIN mausac ms ON ctsp.ma_mau = ms.ma_mau
                    JOIN chipxuly cxl ON ctsp.ma_chip_xu_ly = cxl.ma_chip_xu_ly
                    JOIN carddohoa cdh ON ctsp.ma_carddohoa = cdh.ma_card
                    WHERE ctsp.ma_sp = '$id' AND CONCAT(ctsp.ma_ctsp, ms.ten_mau, cxl.ten_chip, cdh.ten_card, ram, rom) LIKE '%$search_term%'
                ";
            } else if($table == "hoadon") {
                $query = "
                SELECT count(*) as num
                FROM `hoadon` hd
                JOIN `khachhang` kh on kh.ma_kh=hd.ma_kh
                JOIN `nhanvien` nv on nv.ma_nv=hd.ma_nv
                WHERE CONCAT(ma_hd, kh.ten_kh, nv.ten_nv, ngay_tao, hinh_thuc, tinh_trang) LIKE '%$search_term%'
                ";
            } else {
                $query = "SELECT count(*) as num FROM $table WHERE CONCAT(";
                $result = $this->conn->query("SHOW COLUMNS FROM $table");
                $columns = array();
                while ($row = $result->fetch_assoc()) {
                    if (str_contains($row['Field'], 'ma') || str_contains($row['Field'], 'ten')) {
                        $columns[] = $row['Field'];
                    }
                }
                $query .= implode(" , ", $columns) . ") LIKE '%$search_term%'";
            }

            $result = $this->conn->query($query);
            if (!$result) return -1;

            if ($row = $result->fetch_assoc()) {
                return $row['num'];
            }
            return 0;
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
            return -1;
        }
    }
}
