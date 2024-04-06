<?php

class SearchRepo extends ConnectDB {
    public function search($search, $table, $start = 0, $limit = 8) : array | null {
        try {
            $searchs = [];
            $search_term = $this->conn->real_escape_string($search);
            if ($table == "sanpham") {
                $query = "SELECT sp.*, ten_thuong_hieu, ten_loai, ten_hdh FROM sanpham sp
                        JOIN thuonghieu th ON sp.ma_thuong_hieu = th.ma_thuong_hieu
                        JOIN theloai tl ON sp.ma_the_loai = tl.ma_the_loai
                        JOIN hedieuhanh hdh ON sp.ma_hdh = hdh.ma_hdh
                        WHERE CONCAT(ma_sp, ten_sp, ten_thuong_hieu, gia_nhap, gia_ban, so_luong_ton) LIKE '%$search_term%'
                        ORDER BY ma_sp LIMIT {$start},{$limit}
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
            while ($row = $result->fetch_assoc()) {
                $searchs[] = $row;
            }

            return $searchs;
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
        }
        return null;
    }

    public function getCount($table, $search) {
        try {
            $search_term = $this->conn->real_escape_string($search);
            if ($table == 'sanpham') {
                $query = "SELECT count(*) as num FROM sanpham sp
                        JOIN thuonghieu th ON sp.ma_thuong_hieu = th.ma_thuong_hieu
                        JOIN theloai tl ON sp.ma_the_loai = tl.ma_the_loai
                        JOIN hedieuhanh hdh ON sp.ma_hdh = hdh.ma_hdh
                        WHERE CONCAT(ma_sp, ten_sp, ten_thuong_hieu, gia_nhap, gia_ban, so_luong_ton) LIKE '%$search_term%'
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