<?php
class PhieuDoiTra {
    private $ma_pdt;
    private $ma_nv;
    private $ma_hd;
    private $ngay_tra;
    private $tong_so_luong;
    private $tong_tien_tra;
    private $trang_thai;

    // Constructor
    public function __construct($ma_pdt, $ma_nv, $ma_hd, $ngay_tra, $tong_so_luong, $tong_tien_tra, $trang_thai) {
        $this->ma_pdt = $ma_pdt;
        $this->ma_nv = $ma_nv;
        $this->ma_hd = $ma_hd;
        $this->ngay_tra = $ngay_tra;
        $this->tong_so_luong = $tong_so_luong;
        $this->tong_tien_tra = $tong_tien_tra;
        $this->trang_thai = $trang_thai;
    }

    // Getter methods
    public function getMaPdt() {
        return $this->ma_pdt;
    }

    public function getMaNv() {
        return $this->ma_nv;
    }

    public function getMaHd() {
        return $this->ma_hd;
    }

    public function getNgayTra() {
        return $this->ngay_tra;
    }

    public function getTongSoLuong() {
        return $this->tong_so_luong;
    }

    public function getTongTienTra() {
        return $this->tong_tien_tra;
    }

    public function getTrangThai() {
        return $this->trang_thai;
    }
}
?>