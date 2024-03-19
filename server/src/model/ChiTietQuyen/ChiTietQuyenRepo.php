<?php
class ChiTietQuyenRepo extends ConnectDB{
    function getAllChiTietQuyen(){
        $sql = "SELECT DISTINCT ma_quyen,ma_chuc_nang FROM chitietquyen";
        $result = mysqli_query($this->conn,$sql);
        $arrChiTietQuyen=array();
        while($row=mysqli_fetch_assoc($result)){
            
            $arrChiTietQuyen[]=$row;
        }
        return $arrChiTietQuyen;
    }
    function getChucNang($id){
        $sql = "SELECT DISTINCT ma_chuc_nang FROM chitietquyen WHERE ma_quyen='$id' AND hanh_dong!='NULL'";
        $result = mysqli_query($this->conn,$sql);
        $arrChucNang=array();
        while($row=mysqli_fetch_assoc($result)){
            
            $arrChucNang[]=$row;
        }
        return $arrChucNang;
    }
    function getAction($maquyen,$machucnang){
        $sql = "SELECT hanh_dong FROM chitietquyen WHERE ma_quyen='$maquyen' AND ma_chuc_nang='$machucnang'";
        $result = mysqli_query($this->conn,$sql);
        $arrChiTietQuyen=array();
        while($row=mysqli_fetch_assoc($result)){   
            $arrChiTietQuyen[]=$row;
        }
        return $arrChiTietQuyen;
    }
}
?>