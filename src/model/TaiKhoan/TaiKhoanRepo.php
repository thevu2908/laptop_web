<?php

class TaiKhoanRepo extends ConnectDB {
    public function getData() : array | null {
        $accounts = array();
        try {
            $statement = mysqli_query($this->conn, "SELECT * FROM taikhoan");
            
            while ($row = mysqli_fetch_array($statement)) {
                $accounts[] = $row;
            }
            
            return $accounts;
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
        }
        return null;
    }

    public function addAccount($account) : bool {
        try {
            $query = "INSERT INTO taikhoan('ma_tk', 'ma_quyen', 'username', 'password', 'trang_thai') VALUES(?, ?, ?, ?, 0)";
            $statement = mysqli_prepare($this->conn, $query);
            
            $statement->bind_param("ssss", $account->getMaTk(), $account->getMaQuyen(), $account->getUsername(), $account->getPassword());

            return $statement->execute();
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
        }
        return false;
    }
}