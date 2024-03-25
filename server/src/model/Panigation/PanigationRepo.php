<?php
class PannigatinRepo extends ConnectDB{
    public function getPanigation($table,$start=0,$limit=8){
        $query="SELECT * from  '$table'  ORDER BY id DESC LIMIT {$start},{$limit}";
        $result=mysqli_query($this->conn,$query);
        $arrPanigation=array();
        while($row=mysqli_fetch_array($result)){
            $arrPanigation[]=$row;
        }
        return $arrPanigation ?? [];
    }
    public function getCount($table)
    {
        $query = "SELECT count(*) as num FROM '$table'";
        $result=mysqli_query($this->conn,$query);
        if($row=mysqli_fetch_array($result)){
            return $row['num'];
        }
        return 0;
    }
}
?>