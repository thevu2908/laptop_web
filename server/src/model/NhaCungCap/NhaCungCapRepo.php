<?php
class NhaCungCapRepo extends ConnectDB {
    function getAllNhaCungCap() {
        $sql = "SELECT * FROM nhacungcap WHERE trang_thai=0";
        $result = mysqli_query($this->conn, $sql);
        $arrNhaCungCap = array();
        while($row = mysqli_fetch_assoc($result)) {
            $arrNhaCungCap[] = $row;
        }
        return $arrNhaCungCap;
    }

    function getNhaCungCap() {
        try {
            $sql = "SELECT * FROM nhacungcap WHERE trang_thai= 0 ";
            $result = mysqli_query($this->conn, $sql);
            if ($row = mysqli_fetch_assoc($result)) {
                return $row;
            }
        } 
        catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
        }
        return null;
    }

    
    function addNhaCungCap(NhaCungCap $nhacungcap) {
        $ma_ncc = $nhacungcap->getMaNcc();
        $ten_ncc = $nhacungcap->getTenNcc();
        $dia_chi = $nhacungcap->getDiaChi();
        $So_dien_thoai = $nhacungcap->getSoDienThoai();

        $sql = "INSERT INTO nhacungcap(ma_ncc,ten_ncc,dia_chi,so_dien_thoai) 
                VALUES ('$ma_ncc', '$ten_ncc', '$dia_chi', '$So_dien_thoai')";
        $result = mysqli_query($this->conn, $sql);
        if ($result) {
            return true;
        }
        return false;
    }

    function deleteNhaCungCap($ma_ncc) {
        $sql = "UPDATE nhacungcap SET trang_thai=0 WHERE ma_ncc='$ma_ncc'";
        $result = mysqli_query($this->conn, $sql);
        if ($result) {
            return true;
        }
        return false;
    }

    function updateNhaCungCap(NhaCungCap $nhacungcap) {
        $ma_ncc = $nhacungcap->getMaNcc();
        $ten_ncc = $nhacungcap->getTenNcc();
        $dia_chi = $nhacungcap->getDiaChi();
        $So_dien_thoai = $nhacungcap->getSoDienThoai();

        $sql = "UPDATE nhacungcap SET ten_ncc='$ten_ncc', dia_chi='$dia_chi', 
                so_dien_thoai='$So_dien_thoai'
                WHERE ma_ncc='$ma_ncc'";
        $result = mysqli_query($this->conn, $sql);
        if ($result) {
            return true;
        }
        return false;
    }

    

    function getSizeNhaCungCap(): int {
        try {
            $sql = "SELECT count(*) as count FROM nhacungcap";
            $statement = mysqli_query($this->conn, $sql);
            $result = mysqli_fetch_assoc($statement);

            return $result['count'] === null ? - 1 : (int)$result['count'];
        } 
        catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
            return -1;
        }
    }
}