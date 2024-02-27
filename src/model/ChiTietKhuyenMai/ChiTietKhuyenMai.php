<?php
class ChiTietKhuyenMai {
    private $ma_km;
    private $ma_hd;
    private $gia_tien;

    // Constructor
    public function __construct($ma_km, $ma_hd, $gia_tien) {
        $this->ma_km = $ma_km;
        $this->ma_hd = $ma_hd;
        $this->gia_tien = $gia_tien;
    }

    // Getter methods
    public function getMaKm() {
        return $this->ma_km;
    }

    public function getMaHd() {
        return $this->ma_hd;
    }

    public function getGiaTien() {
        return $this->gia_tien;
    }
}
?>