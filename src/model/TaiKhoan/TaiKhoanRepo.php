<?php

include __DIR__ . '/../../connection/ConnectDB.php';
include 'TaiKhoan.php';

class TaiKhoanRepo {
    public function getData() : array | null {
        try {
            $conn = ConnectDB::getConnection();
            $statement = $conn->query('SELECT * FROM taikhoan');
            $accounts = $statement->fetchAll(PDO::FETCH_ASSOC);

            if ($accounts) {
                return $accounts;
            }
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
        }
        return null;
    }
}