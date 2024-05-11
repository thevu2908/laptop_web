<?php

class ChiTietPhieuNhapRepo extends ConnectDB {
    public function getImportInvoiceDetail($id) {
        try {
            $sql = "SELECT sp.ma_sp, ctpn.*, sp.ten_sp, sp.hinh_anh, ms.ten_mau, cxl.ten_chip, cdh.ten_card, ctsp.ram, ctsp.rom FROM chitietphieunhap ctpn
                JOIN chitietsanpham ctsp ON ctsp.ma_ctsp = ctpn.ma_ctsp
                JOIN chipxuly cxl ON cxl.ma_chip_xu_ly = ctsp.ma_chip_xu_ly
                JOIN carddohoa cdh ON cdh.ma_card = ctsp.ma_carddohoa
                JOIN mausac ms ON ms.ma_mau = ctsp.ma_mau
                JOIN sanpham sp ON sp.ma_sp = ctsp.ma_sp
                WHERE ctpn.ma_pn = '$id'
            ";
            $result = mysqli_query($this->conn, $sql);
            if (!$result) {
                throw new Exception("Query failed: " . mysqli_error($this->conn));
            }
            $array = [];
            while ($row = mysqli_fetch_array($result)) {
                $array[] = $row;
            }
            return $array;
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
            return null;
        }
    }
}