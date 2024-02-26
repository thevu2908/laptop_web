<?php
class ThuongHieu {
    private $ma_thuong_hieu;
    private $ten_thuong_hieu;
    private $trang_thai;

    // Constructor
    public function __construct($ma_thuong_hieu, $ten_thuong_hieu, $trang_thai) {
        $this->ma_thuong_hieu = $ma_thuong_hieu;
        $this->ten_thuong_hieu = $ten_thuong_hieu;
        $this->trang_thai = $trang_thai;
    }

    // Getter methods
    public function getMaThuongHieu() {
        return $this->ma_thuong_hieu;
    }

    public function getTenThuongHieu() {
        return $this->ten_thuong_hieu;
    }

    public function getTrangThai() {
        return $this->trang_thai;
    }
}
?>