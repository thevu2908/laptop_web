<?php
class ChiTietSanPham {
    private $ma_ctsp;
    private $ma_sp;
    private $ma_chip_xu_ly;
    private $ma_mau;
    private $ram;
    private $rom;
    private $hinh_anh;
    private $card_do_hoa;
    private $gia_tien;
    private $so_luong;
    private $trang_thai;

    // Constructor
    public function __construct($ma_ctsp, $ma_sp, $ma_chip_xu_ly, $ma_mau, $ram, $rom, $hinh_anh, $card_do_hoa, $gia_tien, $so_luong, $trang_thai) {
        $this->ma_ctsp = $ma_ctsp;
        $this->ma_sp = $ma_sp;
        $this->ma_chip_xu_ly = $ma_chip_xu_ly;
        $this->ma_mau = $ma_mau;
        $this->ram = $ram;
        $this->rom = $rom;
        $this->hinh_anh = $hinh_anh;
        $this->card_do_hoa = $card_do_hoa;
        $this->gia_tien = $gia_tien;
        $this->so_luong = $so_luong;
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

    public function getRam() {
        return $this->ram;
    }

    public function getRom() {
        return $this->rom;
    }

    public function getHinhAnh() {
        return $this->hinh_anh;
    }

    public function getCardDoHoa() {
        return $this->card_do_hoa;
    }

    public function getSoLuong() {
        return $this->so_luong;
    }

    public function getGiaTien() {
        return $this->gia_tien;
    }

    public function getTrangThai() {
        return $this->trang_thai;
    }
}