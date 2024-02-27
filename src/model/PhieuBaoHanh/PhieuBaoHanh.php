<?php
class PhieuBaoHanh {
    private $ma_pbh;
    private $ma_nv;
    private $ma_kh;
    private $ma_hd;
    private $ngay_bao_hanh;
    private $trang_thai;

    // Constructor
    public function __construct($ma_pbh, $ma_nv, $ma_kh, $ma_hd, $ngay_bao_hanh, $trang_thai) {
        $this->ma_pbh = $ma_pbh;
        $this->ma_nv = $ma_nv;
        $this->ma_kh = $ma_kh;
        $this->ma_hd = $ma_hd;
        $this->ngay_bao_hanh = $ngay_bao_hanh;
        $this->trang_thai = $trang_thai;
    }

    // Getter methods
    public function getMaPbh() {
        return $this->ma_pbh;
    }

    public function getMaNv() {
        return $this->ma_nv;
    }

    public function getMaKh() {
        return $this->ma_kh;
    }

    public function getMaHd() {
        return $this->ma_hd;
    }

    public function getNgayBaoHanh() {
        return $this->ngay_bao_hanh;
    }

    public function getTrangThai() {
        return $this->trang_thai;
    }
}
?>