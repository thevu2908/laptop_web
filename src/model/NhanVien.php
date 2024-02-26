<?php
class NhanVien {
    private $ma_nv;
    private $ten_nv;
    private $tuoi;
    private $so_dien_thoai;
    private $hinh_anh;
    private $trang_thai;

    // Constructor
    public function __construct($ma_nv, $ten_nv, $tuoi, $so_dien_thoai, $hinh_anh, $trang_thai) {
        $this->ma_nv = $ma_nv;
        $this->ten_nv = $ten_nv;
        $this->tuoi = $tuoi;
        $this->so_dien_thoai = $so_dien_thoai;
        $this->hinh_anh = $hinh_anh;
        $this->trang_thai = $trang_thai;
    }

    // Getter methods
    public function getMaNv() {
        return $this->ma_nv;
    }

    public function getTenNv() {
        return $this->ten_nv;
    }

    public function getTuoi() {
        return $this->tuoi;
    }

    public function getSoDienThoai() {
        return $this->so_dien_thoai;
    }

    public function getHinhAnh() {
        return $this->hinh_anh;
    }

    public function getTrangThai() {
        return $this->trang_thai;
    }
}
?>