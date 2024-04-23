<?php
class TheLoai {
    private $ma_kh;
    private $ho_ten;
    private $so_dien_thoai;
    private $dia_chi;

    // Constructor
    public function __construct($ma_kh, $ho_ten, $so_dien_thoai,$dia_chi) {
        $this->ma_kh = $ma_kh;
        $this->ho_ten = $ho_ten;
        $this->so_dien_thoai = $so_dien_thoai;
        $this->dia_chi = $dia_chi;
    }

    // Getter methods
    public function getMaKH() {
        return $this->ma_kh;
    }

    public function getHoTen() {
        return $this->ho_ten;
    }

    public function getSDT() {
        return $this->so_dien_thoai;
    }

    public function getDiaChi() {
        return $this->dia_chi;
    }
}