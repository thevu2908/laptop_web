<?php

include __DIR__ . '/../model/ConnectDB.php';
include __DIR__ . '/../model/TaiKhoan/Taikhoan.php';
include __DIR__ . '/../model/TaiKhoan/TaiKhoanRepo.php';

$test = new TaiKhoanRepo();

$arr = $test->getData();

var_dump($arr);