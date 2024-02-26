<?php
class ChipXuLy {
    private $ma_chip_xu_ly;
    private $ten_chip;
    private $trang_thai;

    // Constructor
    public function __construct($ma_chip_xu_ly, $ten_chip, $trang_thai) {
        $this->ma_chip_xu_ly = $ma_chip_xu_ly;
        $this->ten_chip = $ten_chip;
        $this->trang_thai = $trang_thai;
    }

    // Getter methods
    public function getMaChipXuLy() {
        return $this->ma_chip_xu_ly;
    }

    public function getTenChip() {
        return $this->ten_chip;
    }

    public function getTrangThai() {
        return $this->trang_thai;
    }
}
?>