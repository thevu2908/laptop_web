<?php
class ChiTietCongKetNoi {
    private $ma_cong;
    private $ma_ctsp;

    // Constructor
    public function __construct($ma_cong, $ma_ctsp) {
        $this->ma_cong = $ma_cong;
        $this->ma_ctsp = $ma_ctsp;
    }

    // Getter methods
    public function getMaCong() {
        return $this->ma_cong;
    }

    public function getMaCtsp() {
        return $this->ma_ctsp;
    }
}