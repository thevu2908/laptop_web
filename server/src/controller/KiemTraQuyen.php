<?php
// include("server/src/model/ConnectDB.php");
if(isset($_POST['id'])){
    $maquyen=$_POST['id'];
    if($_GET['controller']=="nhomquyen"){
    }
}else{
    if($_GET['controller']=="nhomquyen"){
        $nhomquyen=new NhomQuyenRepos();
        //$chucnang=new ChucNangQuyenRepo();
    }
}

?>
