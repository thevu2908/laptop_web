<?php
class CongKetNoi {
    private $ma_cong;
    private $ten_cong;
    private $trang_thai;

    // Constructor
    public function __construct($ma_cong, $ten_cong, $trang_thai) {
        $this->ma_cong = $ma_cong;
        $this->ten_cong = $ten_cong;
        $this->trang_thai = $trang_thai;
    }

    // Getter methods
    public function getMaCong() {
        return $this->ma_cong;
    }

    public function getTenCong() {
        return $this->ten_cong;
    }

    public function getTrangThai() {
        return $this->trang_thai;
    }
}
?>