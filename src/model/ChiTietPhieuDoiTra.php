<?php
class ChiTietPhieuDoiTra {
    private $ma_pdt;
    private $ma_ctsp;
    private $ly_do;
    private $gia_sp;
    private $so_luong;
    private $thanh_tien;

    // Constructor
    public function __construct($ma_pdt, $ma_ctsp, $ly_do, $gia_sp, $so_luong, $thanh_tien) {
        $this->ma_pdt = $ma_pdt;
        $this->ma_ctsp = $ma_ctsp;
        $this->ly_do = $ly_do;
        $this->gia_sp = $gia_sp;
        $this->so_luong = $so_luong;
        $this->thanh_tien = $thanh_tien;
    }

    // Getter methods
    public function getMaPdt() {
        return $this->ma_pdt;
    }

    public function getMaCtsp() {
        return $this->ma_ctsp;
    }

    public function getLyDo() {
        return $this->ly_do;
    }

    public function getGiaSp() {
        return $this->gia_sp;
    }

    public function getSoLuong() {
        return $this->so_luong;
    }

    public function getThanhTien() {
        return $this->thanh_tien;
    }
}
?>