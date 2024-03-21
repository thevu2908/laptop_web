<?php

$targetDir = "../assets/images/products/";
$myName = 'thevu';
$targetFile = $targetDir . $myName . '.png' ;   
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));

if (file_exists($targetFile)) {
    echo "Hình ảnh đã tồn tại";
    $uploadOk = 0;
}   

if ($uploadOk == 0) {
    echo "Đã xảy ra lỗi trong quá trình lưu ảnh";
} else {
    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $targetFile)) {
        echo "Ảnh ". basename( $_FILES["fileToUpload"]["name"]). " đã được lưu thành công";
    } else {
        echo "Đã xảy ra lỗi trong quá trình lưu ảnh";
    }
}