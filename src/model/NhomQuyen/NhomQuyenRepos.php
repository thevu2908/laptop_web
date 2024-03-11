<?php
// include("../ConnectDB.php");
// include("../NhomQuyen/NhomQuyen.php");
class NhomQuyenRepos extends Database{
    function getAllNhomQuyen(){
        $sql = "SELECT * FROM nhomquyen";
        $result = mysqli_query($this->conn,$sql);
        $arrNhomQuyen=array();
        while($row=mysqli_fetch_assoc($result)){
            //$nhomquyen=new NhomQuyen($row['ma_quyen'],$row['ten_quyen'],$row['trang_thai']);
            $arrNhomQuyen[]=$row;
        }
        return $arrNhomQuyen;
    }
    function getNhomQuyen($id){
        $sql = "SELECT * FROM nhomquyen WHERE ma_quyen = '$id'";
        $result = mysqli_query($this->conn,$sql);
        if($row=mysqli_fetch_assoc($result)){
            //$nq=new NhomQuyen($row['ma_quyen'],$row['ten_quyen'],$row['trang_thai']);
            return $row;
        }
        return null;
    }
    function addNhomQuyen($ma_quyen,$ten_quyen){
        $sql = "INSERT INTO nhomquyen(ma_quyen,ten_quyen) VALUES('$ma_quyen','$ten_quyen')";
        $result = mysqli_query($this->conn,$sql);
        if($result){
            return true;
        }
        return false;
    }
    function deleteNhomQuyen($ma_quyen){
        $sql = "DELETE FROM nhomquyen WHERE ma_quyen='$ma_quyen'";
        $result = mysqli_query($this->conn,$sql);
        if($result){
            return true;
        }
        return false;
    }
    function updateNhomQuyen($ma_quyen,$ten_quyen){
        $sql = "UPDATE nhomquyen SET ten_quyen='$ten_quyen' WHERE ma_quyen='$ma_quyen'";
        $result = mysqli_query($this->conn,$sql);
        if($result){
            return true;
        }
        return false;
    }
}
?>