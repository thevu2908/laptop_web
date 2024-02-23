<?php
class TheLoai {
    private $ma_the_loai;
    private $ten_loai;
    private $trang_thai;

    // Constructor
    public function __construct($ma_the_loai, $ten_loai, $trang_thai) {
        $this->ma_the_loai = $ma_the_loai;
        $this->ten_loai = $ten_loai;
        $this->trang_thai = $trang_thai;
    }

    // Getter methods
    public function getMaTheLoai() {
        return $this->ma_the_loai;
    }

    public function getTenLoai() {
        return $this->ten_loai;
    }

    public function getTrangThai() {
        return $this->trang_thai;
    }
}
?>