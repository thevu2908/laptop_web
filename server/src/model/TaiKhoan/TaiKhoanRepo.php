<?php

class TaiKhoanRepo extends ConnectDB {
    public function getData() : array | null {
        $accounts = array();
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
            $query = "INSERT INTO taikhoan(ma_tk, ma_quyen, username, password, trang_thai) VALUES (?, ?, ?, ?, 0)";
            $statement = mysqli_prepare($this->conn, $query);

            if (!$statement) {
                throw new Exception("Query preparation failed: " . mysqli_error($this->conn));
            }

            $accountId = $account->getMaTk();
            $accessId = $account->getMaQuyen();
            $username = $account->getUsername();
            $password = $account->getPassword();
            $result = $statement->bind_param("ssss", $accountId, $accessId, $username, $password);
            
            if (!$result) {
                throw new Exception("Binding parameters failed: " . $statement->error);
            }

            return $statement->execute();
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
            return false;
        }
    }

    public function updateAccount($account) : bool {
        try {
            $query = "UPDATE taikhoan SET ma_quyen = ?, password = ? WHERE ma_tk = ?";
            $statement = mysqli_prepare($this->conn, $query);
            
            if (!$statement) {
                throw new Exception("Query preparation failed: " . mysqli_error($this->conn));
            }

            $accountId = $account->getMaTk();
            $accessId = $account->getMaQuyen();
            $password = $account->getPassword();
            $result = $statement->bind_param("sss", $accessId, $password, $accountId);

            if (!$result) {
                throw new Exception("Binding parameters failed: " . $statement->error);
            }

            return $statement->execute();
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
            return false;
        }
    }

    public function deleteAccount($accountId) : bool {
        try {
            $query = "UPDATE taikhoan SET trang_thai = 1 WHERE ma_tk = ?";
            $statement = mysqli_prepare($this->conn, $query);

            if (!$statement) {
                throw new Exception("Query preparation failed: " . mysqli_error($this->conn));
            }

            $result = $statement->bind_param("s", $accountId);

            if (!$result) {
                throw new Exception("Binding parameters failed: " . $statement->error);
            }

            return $statement->execute();
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
            return false;
        }
    }

    public function searchAccount($info) : array | null {
        $searchs = [];
        try {
            $query = "SELECT * FROM taikhoan WHERE ma_tk LIKE '%$info%' or ma_quyen LIKE '%$info% or username LIKE '%$info%";
            $statement = mysqli_query($this->conn, $query);

            while ($row = mysqli_fetch_assoc($statement)) {
                $searchs[] = $row;
            }

            return $searchs;
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
        }
        return null;
    }
}