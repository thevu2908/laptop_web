<?php
class ChiTietQuyen {
    private $ma_quyen;
    private $ma_chuc_nang;
    private $hanh_dong;

    // Constructor
    public function __construct($ma_quyen, $ma_chuc_nang, $hanh_dong) {
        $this->ma_quyen = $ma_quyen;
        $this->ma_chuc_nang = $ma_chuc_nang;
        $this->hanh_dong = $hanh_dong;
    }

    // Getter methods
    public function getMaQuyen() {
        return $this->ma_quyen;
    }

    public function getMaChucNang() {
        return $this->ma_chuc_nang;
    }

    public function getHanhDong() {
        return $this->hanh_dong;
    }
}
?>