<?php
class ChiTietPhieuBaoHanh {
    private $ma_pbh;
    private $ma_ctsp;
    private $ly_do;
    private $noi_dung_bao_hanh;

    // Constructor
    public function __construct($ma_pbh, $ma_ctsp, $ly_do, $noi_dung_bao_hanh) {
        $this->ma_pbh = $ma_pbh;
        $this->ma_ctsp = $ma_ctsp;
        $this->ly_do = $ly_do;
        $this->noi_dung_bao_hanh = $noi_dung_bao_hanh;
    }

    // Getter methods
    public function getMaPbh() {
        return $this->ma_pbh;
    }

    public function getMaCtsp() {
        return $this->ma_ctsp;
    }

    public function getLyDo() {
        return $this->ly_do;
    }

    public function getNoiDungBaoHanh() {
        return $this->noi_dung_bao_hanh;
    }
}
?>