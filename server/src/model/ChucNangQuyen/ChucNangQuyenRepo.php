<?php
class ChucNangQuyenRepo extends ConnectDB{
    public function getAllChucNangQuyen(){
        $query="SELECT * from chucnangquyen";
        $result=mysqli_query($this->conn,$query);
        $arrChucNangQuyen=array();
        while($row=mysqli_fetch_array($result)){
            $arrChucNangQuyen[]=$row;
        }
        return $arrChucNangQuyen;
    }
    public function getChucNang($id){
        $query="SELECT * from chucnangquyen where ma_chuc_nang = '$id'";
        $result=mysqli_query($this->conn,$query);
        if($row=mysqli_fetch_array($result)){
            return $row;
        }
        return null;
    }
}
?>