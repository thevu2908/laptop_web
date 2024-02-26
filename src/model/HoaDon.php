<?php
class HoaDon {
    private $ma_hd;
    private $ma_kh;
    private $ma_nv;
    private $ngay_tao;
    private $tong_tien;
    private $khuyen_mai;
    private $thanh_tien;
    private $hinh_thuc;
    private $tinh_trang;
    private $trang_thai;

    // Constructor
    public function __construct($ma_hd, $ma_kh, $ma_nv, $ngay_tao, $tong_tien, $khuyen_mai, $thanh_tien, $hinh_thuc, $tinh_trang, $trang_thai) {
        $this->ma_hd = $ma_hd;
        $this->ma_kh = $ma_kh;
        $this->ma_nv = $ma_nv;
        $this->ngay_tao = $ngay_tao;
        $this->tong_tien = $tong_tien;
        $this->khuyen_mai = $khuyen_mai;
        $this->thanh_tien = $thanh_tien;
        $this->hinh_thuc = $hinh_thuc;
        $this->tinh_trang = $tinh_trang;
        $this->trang_thai = $trang_thai;
    }

    // Getter methods
    public function getMaHd() {
        return $this->ma_hd;
    }

    public function getMaKh() {
        return $this->ma_kh;
    }

    public function getMaNv() {
        return $this->ma_nv;
    }

    public function getNgayTao() {
        return $this->ngay_tao;
    }

    public function getTongTien() {
        return $this->tong_tien;
    }

    public function getKhuyenMai() {
        return $this->khuyen_mai;
    }

    public function getThanhTien() {
        return $this->thanh_tien;
    }

    public function getHinhThuc() {
        return $this->hinh_thuc;
    }

    public function getTinhTrang() {
        return $this->tinh_trang;
    }

    public function getTrangThai() {
        return $this->trang_thai;
    }
}
?>