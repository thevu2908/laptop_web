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
        $sql = "SELECT DISTINCT ma_chuc_nang FROM chitietquyen WHERE ma_quyen='$id'";
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
    function getHanhDong($maquyen,$machucnang){
        $sql = "SELECT hanh_dong FROM chitietquyen WHERE ma_quyen='$maquyen' AND ma_chuc_nang='$machucnang'";
        $result = mysqli_query($this->conn,$sql);
        $arrHanhDong=array();
        while($row=mysqli_fetch_assoc($result)){
            
            $arrHanhDong[]=$row;
        }
        return $arrHanhDong;
    }
    function addPhanQuyen($maquyen,$machucnang,$hanhdong){
        $sql = "INSERT INTO chitietquyen(ma_quyen,ma_chuc_nang,hanh_dong) VALUES('$maquyen','$machucnang','$hanhdong')";
        $result = mysqli_query($this->conn,$sql);
        if($result){
            return true;
        }
        return false;
    }
    function updatePhanQuyen($maquyen,$machucnang,$hanhdong){
        $sql = "DELETE FROM chitietquyen where ma_quyen='$maquyen' AND ma_chuc_nang='$machucnang' AND hanh_dong='$hanhdong'";
        $result = mysqli_query($this->conn,$sql);
        if($result){
            return true;
        }
        return false;
    }
    function deletePhanQuyen($listitemRemove){
        foreach($listitemRemove as $key){
            $sql="DELETE FROM chitietquyen WHERE ma_quyen='$key[maquyen]' AND ma_chuc_nang='$key[machucnang]'";
            $result=mysqli_query($this->conn,$sql);
            if(!$result){
                return false;
            }
        }
        return true;
    }
    function kiemtraquyenhanhdong($maquyen,$machucnang){
        $sql = "SELECT hanh_dong FROM chitietquyen WHERE ma_quyen='$maquyen' AND ma_chuc_nang='$machucnang'";
        $result = mysqli_query($this->conn,$sql);
        $arrChiTietQuyen=array();
        while($row=mysqli_fetch_assoc($result)){   
            $arrChiTietQuyen[]=$row;
        }
        return $arrChiTietQuyen;
    }
    function kiemtrahangdong($maquyen,$machucnang,$hanhdong):bool{
        $sql = "SELECT * FROM chitietquyen WHERE ma_quyen='$maquyen' AND ma_chuc_nang='$machucnang' AND hanh_dong='$hanhdong'";
        $result = mysqli_query($this->conn,$sql);
        if($row=mysqli_fetch_assoc($result)){
            return true;
        }
        return false;
    }
}
?>