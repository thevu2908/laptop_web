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

    public function updatePassword($id, $password) : bool {
        try {
            $query = "UPDATE taikhoan SET password = ? WHERE ma_tk = ?";
            $statement = mysqli_prepare($this->conn, $query);

            if (!$statement) {
                throw new Exception("Query preparation failed: " . mysqli_error($this->conn));
            }

            $result = $statement->bind_param("ss", $password, $id);

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

    public function checkExistUsername($username) : bool {
        try {
            $query = "SELECT * FROM taikhoan WHERE username = ?";
            $statement = mysqli_prepare($this->conn, $query);

            if ($statement === false) {
                throw new Exception("Statement preparation failed: " . mysqli_error($this->conn));
            }

            mysqli_stmt_bind_param($statement, 's', $username);
            mysqli_stmt_execute($statement);

            mysqli_stmt_store_result($statement);
            $result = mysqli_stmt_num_rows($statement) > 0;
            mysqli_stmt_close($statement);

            return $result;
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
            return false;
        }
    }

    public function login($username) {
        try {
            $query = "
                SELECT tk.*, kh.ma_kh, kh.ten_kh FROM khachhang kh LEFT JOIN taikhoan tk ON kh.email = tk.ma_tk 
                WHERE kh.email = ? OR tk.username = ? AND kh.trang_thai = 0 AND tk.trang_thai = 0
                UNION
                SELECT tk.*, nv.ma_nv, nv.ten_nv FROM nhanvien nv JOIN taikhoan tk ON nv.ma_nv = tk.ma_tk 
                WHERE nv.ma_nv = ? OR tk.username = ? AND nv.trang_thai = 0 AND tk.trang_thai = 0
            ";

            $statement = mysqli_prepare($this->conn, $query);

            if (!$statement) {
                throw new Exception("Statement preparation failed: " . mysqli_error($this->conn));
            }

            mysqli_stmt_bind_param($statement, 'ssss', $username, $username, $username, $username);
            mysqli_stmt_execute($statement);

            $result = mysqli_stmt_get_result($statement);
            $row = mysqli_fetch_assoc($result);
            mysqli_stmt_close($statement);

            return $row;
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
            return null;
        }
    }
}