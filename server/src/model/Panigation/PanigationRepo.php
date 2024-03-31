<?php
class PanigationRepo extends ConnectDB{
    public function getPanigation($table,$start=0,$limit=8){
        $query="SELECT * from  $table LIMIT {$start},{$limit}";
        $result=mysqli_query($this->conn,$query);
        $arrPanigation=array();
        while($row=mysqli_fetch_array($result)){
            $arrPanigation[]=$row;
        }
        return $arrPanigation;
    }
    public function getCount($table)
    {
        $query = "SELECT count(*) as num FROM $table";
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