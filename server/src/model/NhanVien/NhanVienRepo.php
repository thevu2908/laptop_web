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

    public function getAvailableEmployees() {
        try {
            $query = "SELECT * FROM nhanvien WHERE ma_nv NOT IN (SELECT ma_tk FROM taikhoan)";
            $result = mysqli_query($this->conn, $query);
            if (!$result) {
                throw new Exception("Error: " . mysqli_error($this->conn));
            }
            $employees = [];
            while ($row = mysqli_fetch_assoc($result)) {
                $employees[] = $row;
            }
            return $employees;
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
            return null;
        }
    }

    public function addEmployee($manv,$tennv,$tuoi,$sodienthoai) {
        $query="INSERT INTO nhanvien(ma_nv,ten_nv,tuoi,so_dien_thoai,hinh_anh,trang_thai) VALUES ('$manv','$tennv',$tuoi,'$sodienthoai','',0)";
        $result=mysqli_query($this->conn,$query);
        if($result){
            return true;
        }else{
            return false;
        }
    }

    public function deleteEmployee($manv) {
        $query="UPDATE nhanvien SET trang_thai=0 WHERE ma_nv='$manv'";
        $result=mysqli_query($this->conn,$query);
        if($result){
            return true;
        }else{
            return false;
        }
    }

    public function getEmployee($manv) {
        $query="SELECT * FROM nhanvien WHERE ma_nv='$manv'";
        $result=mysqli_query($this->conn,$query);
        if($row=mysqli_fetch_array($result)){
            return $row;
        }
        return null;
    }
    public function updateEmployee($manv,$tennv,$tuoi,$sodienthoai){
        $query="UPDATE nhanvien SET ten_nv='$tennv',tuoi=$tuoi,so_dien_thoai='$sodienthoai' WHERE ma_nv='$manv'";
        $result=mysqli_query($this->conn,$query);
        if($result){
            return true;
        }
        return false;
    }
}