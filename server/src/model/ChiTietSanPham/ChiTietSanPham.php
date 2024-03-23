<?php
class ChiTietSanPham {
    private $ma_ctsp;
    private $ma_sp;
    private $ma_chip_xu_ly;
    private $ma_mau;
    private $ma_carddohoa;
    private $ram;
    private $rom;
    private $gia_tien;
    private $trang_thai;

    // Constructor
    public function __construct($ma_ctsp, $ma_sp, $ma_chip_xu_ly, $ma_mau, $ma_carddohoa, $ram, $rom, $gia_tien, $trang_thai) {
        $this->ma_ctsp = $ma_ctsp;
        $this->ma_sp = $ma_sp;
        $this->ma_chip_xu_ly = $ma_chip_xu_ly;
        $this->ma_mau = $ma_mau;
        $this->ma_carddohoa = $ma_carddohoa;
        $this->ram = $ram;
        $this->rom = $rom;
        $this->gia_tien = $gia_tien;
        $this->trang_thai = $trang_thai;
    }

    // Getter methods
    public function getMaCtsp() {
        return $this->ma_ctsp;
    }

    public function getMaSp() {
        return $this->ma_sp;
    }

    public function getMaChipXuLy() {
        return $this->ma_chip_xu_ly;
    }

    public function getMaMau() {
        return $this->ma_mau;
    }
    
    public function getMaCardDoHoa() {
        return $this->ma_carddohoa;
    }

    public function getRam() {
        return $this->ram;
    }

    public function getRom() {
        return $this->rom;
    }

    public function getGiaTien() {
        return $this->gia_tien;
    }

    public function getTrangThai() {
        return $this->trang_thai;
    }
}