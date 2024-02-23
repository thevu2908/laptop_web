<?php
class ChiTietHoaDon {
    private $ma_hd;
    private $ma_ctsp;
    private $gia_sp;
    private $so_luong;
    private $thanh_tien;

    // Constructor
    public function __construct($ma_hd, $ma_ctsp, $gia_sp, $so_luong, $thanh_tien) {
        $this->ma_hd = $ma_hd;
        $this->ma_ctsp = $ma_ctsp;
        $this->gia_sp = $gia_sp;
        $this->so_luong = $so_luong;
        $this->thanh_tien = $thanh_tien;
    }

    // Getter methods
    public function getMaHd() {
        return $this->ma_hd;
    }

    public function getMaCtsp() {
        return $this->ma_ctsp;
    }

    public function getGiaSp() {
        return $this->gia_sp;
    }

    public function getSoLuong() {
        return $this->so_luong;
    }

    public function getThanhTien() {
        return $this->thanh_tien;
    }
}
?>