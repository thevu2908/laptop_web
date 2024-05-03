<?php
class NhaCungCapRepo extends ConnectDB {

    public function getData() : array | null {
        $employees = [];
        try {
            $statement = mysqli_query($this->conn, "SELECT * FROM nhacungcap");

            while ($row = mysqli_fetch_array($statement)) {
                $employees[] = $row;
            }

            return $employees;
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
        }
        return null;
    }
    

    public function addSuppiler($mancc, $tenncc, $diachi, $sodienthoai) {
        $query = "INSERT INTO nhacungcap (ma_ncc, ten_ncc, dia_chi, so_dien_thoai, trang_thai) VALUES (?, ?, ?, ?, 0)";
        $stmt = mysqli_prepare($this->conn, $query);
        
        if (!$stmt) {
            return false;
        }
        mysqli_stmt_bind_param($stmt, "ssss", $mancc, $tenncc, $diachi, $sodienthoai);
        $result = mysqli_stmt_execute($stmt);
    
        if ($result) {
            mysqli_stmt_close($stmt);
            return true;
        } else {
            mysqli_stmt_close($stmt);
            return false;
        }
    }
    
    public function deleteNCC($productId) : bool {
        try {
            $query = "UPDATE nhacungcap SET trang_thai = 1 WHERE ma_ncc = ?";
            $statement = mysqli_prepare($this->conn, $query);

            if (!$statement) {
                throw new Exception("Deleting data failed: " . mysqli_error($this->conn));
            }

            $result = $statement->bind_param("s", $productId);

            if (!$result) {
                throw new Exception("Binding parameters failed: " . $statement->error);
            }

            return $statement->execute();
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
            return false;
        }
    }
    
    public function getSuppiler($mancc){
        $query="SELECT * FROM nhacungcap WHERE ma_ncc='$mancc'";
        $result=mysqli_query($this->conn,$query);
        if($row=mysqli_fetch_array($result)){
            return $row;
        }
        return null;
    }
    public function updateSuppiler($mancc, $tenncc, $diachi, $sodienthoai) {
        $query = "UPDATE nhacungcap SET ten_ncc=?, dia_chi=?, so_dien_thoai=? WHERE ma_ncc=?";
        $stmt = mysqli_prepare($this->conn, $query);
    
        if (!$stmt) {
            return false;
        }
    
        mysqli_stmt_bind_param($stmt, "ssss", $tenncc, $diachi, $sodienthoai, $mancc);
        $result = mysqli_stmt_execute($stmt);
    
        if ($result) {
            mysqli_stmt_close($stmt);
            return true;
        } else {
            mysqli_stmt_close($stmt);
            return false;
        }
    }
    
}