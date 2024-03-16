<?php
class ChiTietPhieuNhap {
    private $ma_pn;
    private $ma_ctsp;
    private $so_luong;
    private $gia_tien;
    private $thanh_tien;

    // Constructor
    public function __construct($ma_pn, $ma_ctsp, $so_luong, $gia_tien, $thanh_tien) {
        $this->ma_pn = $ma_pn;
        $this->ma_ctsp = $ma_ctsp;
        $this->so_luong = $so_luong;
        $this->gia_tien = $gia_tien;
        $this->thanh_tien = $thanh_tien;
    }

    // Getter methods
    public function getMaPn() {
        return $this->ma_pn;
    }

    public function getMaCtsp() {
        return $this->ma_ctsp;
    }

    public function getSoLuong() {
        return $this->so_luong;
    }

    public function getGiaTien() {
        return $this->gia_tien;
    }

    public function getThanhTien() {
        return $this->thanh_tien;
    }
}
?>