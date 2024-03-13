<?php

class TaiKhoanRepo extends ConnectDB {
    public function getData() : array | null {
        $accounts = [];
        try {
            $statement = mysqli_query($this->conn, "SELECT * FROM taikhoan");
            
            while ($row = mysqli_fetch_assoc($statement)) {
                $accounts[] = $row;
            }

            return $accounts;
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
        }
        return null;
    }

    public function getAccount($accountId) {
        try {
            $query = "SELECT * FROM taikhoan WHERE ma_tk = '$accountId'";
            $statement = mysqli_query($this->conn, $query);

            if ($row = mysqli_fetch_assoc($statement)) {
                return $row;
            }
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
        }
        return null;
    } 

    public function getAccountsLength() {
        try {
            $query = "SELECT COUNT(*) FROM taikhoan";
            $statement = mysqli_query($this->conn, $query);

            return mysqli_fetch_assoc($statement);
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
        }
    }

    public function addAccount($account) : bool {
        try {
            $query = "INSERT INTO taikhoan(ma_tk, ma_quyen, username, password, trang_thai) VALUES(?, ?, ?, ?, 0)";
            $statement = mysqli_prepare($this->conn, $query);

            $id = $account->getMaTk();
            $accessId = $account->getMaQuyen();
            $username = $account->getUsername();
            $password = $account->getPassword();
            $statement->bind_param("ssss", $id, $accessId, $username, $password);
    
            return $statement->execute();
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
            return false;
        }
    }
}