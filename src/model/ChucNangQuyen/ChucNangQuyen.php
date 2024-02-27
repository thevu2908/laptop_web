<?php
class ChucNangQuyen {
    private $ma_chuc_nang;
    private $ten_chuc_nang;
    private $trang_thai;

    // Constructor
    public function __construct($ma_chuc_nang, $ten_chuc_nang, $trang_thai) {
        $this->ma_chuc_nang = $ma_chuc_nang;
        $this->ten_chuc_nang = $ten_chuc_nang;
        $this->trang_thai = $trang_thai;
    }

    // Getter methods
    public function getMaChucNang() {
        return $this->ma_chuc_nang;
    }

    public function getTenChucNang() {
        return $this->ten_chuc_nang;
    }

    public function getTrangThai() {
        return $this->trang_thai;
    }
}
?>