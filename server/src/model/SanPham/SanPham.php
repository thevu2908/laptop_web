<?php
class SanPham {
    private $ma_sp;
    private $ma_thuong_hieu;
    private $ma_the_loai;
    private $ma_hdh;
    private $ten_sp;
    private $hinh_anh;
    private $kich_co_man_hinh;
    private $do_phan_giai;
    private $pin;
    private $ban_phim;
    private $trong_luong;
    private $chat_lieu;
    private $xuat_xu;
    private $so_luong_ton;
    private $trang_thai;

    // Constructor
    public function __construct($ma_sp, $ma_thuong_hieu, $ma_the_loai, $ma_hdh, $ten_sp, $hinh_anh, $kich_co_man_hinh, $do_phan_giai, $pin, $ban_phim, $trong_luong, $chat_lieu, $xuat_xu, $so_luong_ton, $trang_thai) {
        $this->ma_sp = $ma_sp;
        $this->ma_thuong_hieu = $ma_thuong_hieu;
        $this->ma_the_loai = $ma_the_loai;
        $this->ma_hdh = $ma_hdh;
        $this->ten_sp = $ten_sp;
        $this->hinh_anh = $hinh_anh;
        $this->kich_co_man_hinh = $kich_co_man_hinh;
        $this->do_phan_giai = $do_phan_giai;
        $this->pin = $pin;
        $this->ban_phim = $ban_phim;
        $this->trong_luong = $trong_luong;
        $this->chat_lieu = $chat_lieu;
        $this->xuat_xu = $xuat_xu;
        $this->so_luong_ton = $so_luong_ton;
        $this->trang_thai = $trang_thai;
    }

    // Getter methods
    public function getMaSp() {
        return $this->ma_sp;
    }

    public function getMaThuongHieu() {
        return $this->ma_thuong_hieu;
    }

    public function getMaTheLoai() {
        return $this->ma_the_loai;
    }

    public function getMaHdh() {
        return $this->ma_hdh;
    }

    public function getTenSp() {
        return $this->ten_sp;
    }

    public function getHinhAnh() {
        return $this->hinh_anh;
    }

    public function getKichCoManHinh() {
        return $this->kich_co_man_hinh;
    }

    public function getDoPhanGiai() {
        return $this->do_phan_giai;
    }

    public function getPin() {
        return $this->pin;
    }

    public function getBanPhim() {
        return $this->ban_phim;
    }

    public function getTrongLuong() {
        return $this->trong_luong;
    }

    public function getChatLieu() {
        return $this->chat_lieu;
    }

    public function getXuatXu() {
        return $this->xuat_xu;
    }

    public function getSoLuongTon() {
        return $this->so_luong_ton;
    }

    public function getTrangThai() {
        return $this->trang_thai;
    }
}