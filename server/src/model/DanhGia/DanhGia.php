<?php
class DanhGia {
    private $ma_sp;
    private $ma_kh;
    private $rating;
    private $thoi_gian_danh_gia;
    private $noi_dung;
    private $trang_thai;

    // Constructor
    public function __construct($ma_sp, $ma_kh, $rating, $thoi_gian_danh_gia, $noi_dung,$trang_thai) {
        $this->ma_sp = $ma_sp;
        $this->ma_kh = $ma_kh;
        $this->rating = $rating;
        $this->thoi_gian_danh_gia = $thoi_gian_danh_gia;
        $this->noi_dung = $noi_dung;
        $this->trang_thai = $trang_thai;
    }

    // Getter methods
    public function getMaSP() {
        return $this->ma_sp;
    }

    public function getMaKH() {
        return $this->ma_kh;
    }

    public function getRating() {
        return $this->rating;
    }

    public function getThoiGian() {
        return $this->thoi_gian_danh_gia;
    }

    public function getNoiDung() {
        return $this->noi_dung;
    }

    public function getTrangThai() {
        return $this->trang_thai;
    }
}