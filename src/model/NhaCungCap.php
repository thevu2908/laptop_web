<?php
class NhaCungCap {
    private $ma_ncc;
    private $ten_ncc;
    private $dia_chi;
    private $so_dien_thoai;
    private $trang_thai;

    // Constructor
    public function __construct($ma_ncc, $ten_ncc, $dia_chi, $so_dien_thoai, $trang_thai) {
        $this->ma_ncc = $ma_ncc;
        $this->ten_ncc = $ten_ncc;
        $this->dia_chi = $dia_chi;
        $this->so_dien_thoai = $so_dien_thoai;
        $this->trang_thai = $trang_thai;
    }

    // Getter methods
    public function getMaNcc() {
        return $this->ma_ncc;
    }

    public function getTenNcc() {
        return $this->ten_ncc;
    }

    public function getDiaChi() {
        return $this->dia_chi;
    }

    public function getSoDienThoai() {
        return $this->so_dien_thoai;
    }

    public function getTrangThai() {
        return $this->trang_thai;
    }
}
?>