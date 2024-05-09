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
        $sql = "SELECT DISTINCT chitietquyen.ma_chuc_nang,chucnangquyen.ten_chuc_nang FROM chitietquyen join chucnangquyen on chitietquyen.ma_chuc_nang=chucnangquyen.ma_chuc_nang WHERE chitietquyen.ma_quyen='$id'";
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
    function addMulPhanQuyen($maquyen,$listitemAdd){
        foreach($listitemAdd as $key){
            $macn=$key['machucnang'];
            $hanhdong = $key['hanhdong'];
            $sql = "INSERT INTO chitietquyen(ma_quyen,ma_chuc_nang,hanh_dong) VALUES('$maquyen','$macn','X')";
            $result = mysqli_query($this->conn,$sql);
            if($result){
                foreach($hanhdong as $item){
                    $ssql = "INSERT INTO chitietquyen(ma_quyen,ma_chuc_nang,hanh_dong) VALUES('$maquyen','$macn','$item')";
                    $sresult = mysqli_query($this->conn,$ssql);
                    if(!$sresult){
                        return false;
                    }
                }
            }
        }
        return true;
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
    function getDSChucNang($maquyen){
        $sql = "SELECT * from chucnangquyen where ma_chuc_nang not in (select chitietquyen.ma_chuc_nang from chitietquyen WHERE chitietquyen.ma_quyen='$maquyen')";
        $result = mysqli_query($this->conn,$sql);
        $arrChucNang=array();
        while($row=mysqli_fetch_assoc($result)){
            
            $arrChucNang[]=$row;
        }
        return $arrChucNang;
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
    function kiemtrahangdong($maquyen,$tenchucnang,$hanhdong):bool{
        //$sql = "SELECT * FROM chitietquyen WHERE ma_quyen='$maquyen' AND ma_chuc_nang='$machucnang' AND hanh_dong='$hanhdong'";
        $sql="SELECT * FROM chitietquyen join chucnangquyen on chitietquyen.ma_chuc_nang=chucnangquyen.ma_chuc_nang
        WHERE chitietquyen.ma_quyen='$maquyen' AND chitietquyen.ma_chuc_nang=(select ma_chuc_nang from chucnangquyen WHERE ten_chuc_nang='$tenchucnang') AND chitietquyen.hanh_dong='$hanhdong'";
        $result = mysqli_query($this->conn,$sql);
        if(mysqli_num_rows($result) > 0){
            return true;
        }
        return false;
    }
}
?>