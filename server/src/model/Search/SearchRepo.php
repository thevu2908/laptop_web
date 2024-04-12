<?php

class SearchRepo extends ConnectDB {
    public function search($search, $table, $start = 0, $limit = 8, $id) : array | null {
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
            } else if ($table == "chitietsanpham") {
                $query = "
                    SELECT ctsp.*, ms.ten_mau, cxl.ten_chip, cdh.ten_card FROM chitietsanpham ctsp
                    JOIN mausac ms ON ctsp.ma_mau = ms.ma_mau
                    JOIN chipxuly cxl ON ctsp.ma_chip_xu_ly = cxl.ma_chip_xu_ly
                    JOIN carddohoa cdh ON ctsp.ma_carddohoa = cdh.ma_card
                    WHERE ctsp.ma_sp = '$id' AND CONCAT(ctsp.ma_ctsp, ms.ten_mau, cxl.ten_chip, cdh.ten_card, ram, rom) LIKE '%$search_term%'
                    ORDER BY ctsp.ma_ctsp ASC LIMIT {$start},{$limit}
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
    public function searchTable($search, $table, $start = 0, $limit = 8){
        if ($table == "chitietquyen") {
            if($search=="" || $search=="All"){
                $query = "SELECT DISTINCT chitietquyen.ma_quyen,chitietquyen.ma_chuc_nang FROM chitietquyen 
            join chucnangquyen on chucnangquyen.ma_chuc_nang=chitietquyen.ma_chuc_nang
            join nhomquyen on chitietquyen.ma_quyen=nhomquyen.ma_quyen
            ORDER BY 1 ASC LIMIT {$start},{$limit}";
            }else{
                $query = "SELECT DISTINCT chitietquyen.ma_quyen,chitietquyen.ma_chuc_nang FROM chitietquyen 
            join chucnangquyen on chucnangquyen.ma_chuc_nang=chitietquyen.ma_chuc_nang
            join nhomquyen on chitietquyen.ma_quyen=nhomquyen.ma_quyen where nhomquyen.ten_quyen='$search'
            ORDER BY 1 ASC LIMIT {$start},{$limit}";
            }
            $arrSearch=array();
            $result=mysqli_query($this->conn,$query);
            while ($row = mysqli_fetch_assoc($result)){
                $arrSearch[]=$row;
            }
            return $arrSearch;
        }
    }
    public function getCountTable($table, $search){
        if($table=="chitietquyen"){
            if($search=="" || $search=="All"){
                $query = "SELECT count(DISTINCT chitietquyen.ma_quyen,chitietquyen.ma_chuc_nang) FROM chitietquyen 
                join chucnangquyen on chucnangquyen.ma_chuc_nang=chitietquyen.ma_chuc_nang
                join nhomquyen on chitietquyen.ma_quyen=nhomquyen.ma_quyen";
            }else{
                $query = "SELECT count(DISTINCT chitietquyen.ma_quyen,chitietquyen.ma_chuc_nang) FROM chitietquyen 
                join chucnangquyen on chucnangquyen.ma_chuc_nang=chitietquyen.ma_chuc_nang
                join nhomquyen on chitietquyen.ma_quyen=nhomquyen.ma_quyen where nhomquyen.ten_quyen='$search'";
            }
            
            $result=mysqli_query($this->conn,$query);
            $count=mysqli_num_rows($result);
            return $count;
        }    
    }
    public function getCount($table, $search, $id) {
        try {
            $search_term = $this->conn->real_escape_string($search);
            if ($table == 'sanpham') {
                $query = "
                    SELECT count(*) as num FROM sanpham sp
                    JOIN thuonghieu th ON sp.ma_thuong_hieu = th.ma_thuong_hieu
                    JOIN theloai tl ON sp.ma_the_loai = tl.ma_the_loai
                    JOIN hedieuhanh hdh ON sp.ma_hdh = hdh.ma_hdh
                    WHERE CONCAT(ma_sp, ten_sp, ten_thuong_hieu) LIKE '%$search_term%'
                ";
            } else if ($table == "chitietsanpham") {
                $query = "
                    SELECT count(*) as num FROM chitietsanpham ctsp
                    JOIN mausac ms ON ctsp.ma_mau = ms.ma_mau
                    JOIN chipxuly cxl ON ctsp.ma_chip_xu_ly = cxl.ma_chip_xu_ly
                    JOIN carddohoa cdh ON ctsp.ma_carddohoa = cdh.ma_card
                    WHERE ctsp.ma_sp = '$id' AND CONCAT(ctsp.ma_ctsp, ms.ten_mau, cxl.ten_chip, cdh.ten_card, ram, rom) LIKE '%$search_term%'
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