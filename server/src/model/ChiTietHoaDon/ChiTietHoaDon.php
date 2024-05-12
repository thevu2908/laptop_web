<?php
class ChiTietHoaDon {
    private $ma_hd;
    private $ma_imei;
    private $gia_sp;
    private $so_luong;

    // Constructor
    public function __construct($ma_hd, $ma_imei, $gia_sp, $so_luong) {
        $this->ma_hd = $ma_hd;
        $this->ma_imei = $ma_imei;
        $this->gia_sp = $gia_sp;
        $this->so_luong = $so_luong;
    }

    // Getter methods
    public function getMaHd() {
        return $this->ma_hd;
    }

    public function getMaImei() {
        return $this->ma_imei;
    }

    public function getGiaSp() {
        return $this->gia_sp;
    }

    public function getSoLuong() {
        return $this->so_luong;
    }
}
