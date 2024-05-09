<?php
class getIdTable extends ConnectDB{
    public function getIdInTable($table){
        $query="SELECT count(*) as size from ".$table;
        $result=mysqli_query($this->conn,$query);
        if($row=mysqli_fetch_array($result)){
            return  $row['size'];
        }
        return 1;
    }
}
?>