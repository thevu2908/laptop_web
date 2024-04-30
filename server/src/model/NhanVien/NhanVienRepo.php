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
    public function addEmployee($manv,$tennv,$tuoi,$sodienthoai){
        $query="INSERT INTO nhanvien(ma_nv,ten_nv,tuoi,so_dien_thoai,hinh_anh,trang_thai) VALUES ('$manv','$tennv',$tuoi,'$sodienthoai','',0)";
        $result=mysqli_query($this->conn,$query);
        if($result){
            return true;
        }else{
            return false;
        }
    }
}