<?php
class PanigationRepo extends ConnectDB{
    public function getPanigation($table,$start=0,$limit=8){
        //ORDER BY DEFAULT
        if($table=="chitietquyen"){
            $query="SELECT DISTINCT ma_quyen,ma_chuc_nang FROM chitietquyen ORDER BY 1 ASC LIMIT {$start},{$limit}";
        }else{
            $query="SELECT * from  $table ORDER BY 1 ASC LIMIT {$start},{$limit}";
        }
        $result=mysqli_query($this->conn,$query);
        $arrPanigation=array();
        while($row=mysqli_fetch_array($result)){
            $arrPanigation[]=$row;
        }
        return $arrPanigation;
    }
    public function getCount($table)
    {
        if($table=="chitietquyen"){
            $query = "SELECT count(DISTINCT ma_quyen,ma_chuc_nang) as num FROM chitietquyen";
        }else{
            $query = "SELECT count(*) as num FROM $table";
        }
        $result=mysqli_query($this->conn,$query);
        if (!$result) {
            return -1;
        }
        if($row=mysqli_fetch_array($result)){
            return $row['num'];
        }
        return 0;
    }
}
?>