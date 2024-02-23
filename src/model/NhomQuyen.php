<?php
class NhomQuyen {
    private $ma_quyen;
    private $ten_quyen;
    private $trang_thai;

    // Constructor
    public function __construct($ma_quyen, $ten_quyen, $trang_thai) {
        $this->ma_quyen = $ma_quyen;
        $this->ten_quyen = $ten_quyen;
        $this->trang_thai = $trang_thai;
    }

    // Getter methods
    public function getMaQuyen() {
        return $this->ma_quyen;
    }

    public function getTenQuyen() {
        return $this->ten_quyen;
    }

    public function getTrangThai() {
        return $this->trang_thai;
    }
}
?>