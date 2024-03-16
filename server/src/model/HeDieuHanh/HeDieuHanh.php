<?php
class HeDieuHanh {
    private $ma_hdh;
    private $ten_hdh;
    private $trang_thai;

    // Constructor
    public function __construct($ma_hdh, $ten_hdh, $trang_thai) {
        $this->ma_hdh = $ma_hdh;
        $this->ten_hdh = $ten_hdh;
        $this->trang_thai = $trang_thai;
    }

    // Getter methods
    public function getMaHdh() {
        return $this->ma_hdh;
    }

    public function getTenHdh() {
        return $this->ten_hdh;
    }

    public function getTrangThai() {
        return $this->trang_thai;
    }
}
?>