<?php
class GioHang {
    private $ma_ctsp;
    private $ma_kh;
    private $gia_sp;
    private $so_luong;

    // Constructor
    public function __construct($ma_ctsp, $ma_kh, $gia_sp, $so_luong) {
        $this->ma_ctsp = $ma_ctsp;
        $this->ma_kh = $ma_kh;
        $this->gia_sp = $gia_sp;
        $this->so_luong = $so_luong;
    }

    // Getter methods
    public function getMaCTSP() {
        return $this->ma_ctsp;
    }

    public function getMaKH() {
        return $this->ma_kh;
    }

    public function getGiaSP() {
        return $this->gia_sp;
    }

    public function getSoLuong() {
        return $this->so_luong;
    }
}