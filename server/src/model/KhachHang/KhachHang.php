<?php
class KhachHang {
    private $ma_kh;
    private $ten_kh;
    private $so_dien_thoai;
    private $tuoi;
    private $dia_chi;
    private $trang_thai;

    // Constructor
    public function __construct($ma_kh, $ten_kh, $so_dien_thoai, $tuoi, $dia_chi, $trang_thai) {
        $this->ma_kh = $ma_kh;
        $this->ten_kh = $ten_kh;
        $this->so_dien_thoai = $so_dien_thoai;
        $this->tuoi = $tuoi;
        $this->dia_chi = $dia_chi;
        $this->trang_thai = $trang_thai;
    }

    // Getter methods
    public function getMaKh() {
        return $this->ma_kh;
    }

    public function getTenKh() {
        return $this->ten_kh;
    }

    public function getSoDienThoai() {
        return $this->so_dien_thoai;
    }

    public function getTuoi() {
        return $this->tuoi;
    }

    public function getDiaChi() {
        return $this->dia_chi;
    }

    public function getTrangThai() {
        return $this->trang_thai;
    }
}
?>