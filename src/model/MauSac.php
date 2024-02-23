<?php
class MauSac {
    private $ma_mau;
    private $ten_mau;
    private $trang_thai;

    // Constructor
    public function __construct($ma_mau, $ten_mau, $trang_thai) {
        $this->ma_mau = $ma_mau;
        $this->ten_mau = $ten_mau;
        $this->trang_thai = $trang_thai;
    }

    // Getter methods
    public function getMaMau() {
        return $this->ma_mau;
    }

    public function getTenMau() {
        return $this->ten_mau;
    }

    public function getTrangThai() {
        return $this->trang_thai;
    }
}
?>