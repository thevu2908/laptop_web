<?php
class CardDoHoa {
    private $ma_card;
    private $ten_card;
    private $trang_thai;

    // Constructor
    public function __construct($ma_card, $ten_card, $trang_thai) {
        $this->ma_card = $ma_card;
        $this->ten_card = $ten_card;
        $this->trang_thai = $trang_thai;
    }

    // Getter methods
    public function getMaCard() {
        return $this->ma_card;
    }

    public function getTenCard() {
        return $this->ten_card;
    }

    public function getTrangThai() {
        return $this->trang_thai;
    }
}