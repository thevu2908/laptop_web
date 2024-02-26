<?php
class PhieuNhap {
    private $ma_pn;
    private $ma_ncc;
    private $ma_nv;
    private $ngay_nhap;
    private $tong_tien;
    private $trang_thai;

    // Constructor
    public function __construct($ma_pn, $ma_ncc, $ma_nv, $ngay_nhap, $tong_tien, $trang_thai) {
        $this->ma_pn = $ma_pn;
        $this->ma_ncc = $ma_ncc;
        $this->ma_nv = $ma_nv;
        $this->ngay_nhap = $ngay_nhap;
        $this->tong_tien = $tong_tien;
        $this->trang_thai = $trang_thai;
    }

    // Getter methods
    public function getMaPn() {
        return $this->ma_pn;
    }

    public function getMaNcc() {
        return $this->ma_ncc;
    }

    public function getMaNv() {
        return $this->ma_nv;
    }

    public function getNgayNhap() {
        return $this->ngay_nhap;
    }

    public function getTongTien() {
        return $this->tong_tien;
    }

    public function getTrangThai() {
        return $this->trang_thai;
    }
}
?>