<?php

class ThongTinNhanHang {
    private $maTtnh;
    private $maKh;
    private $hoTen; 
    private $sodienthoai;
    private $diachi;
    private $diachimacdinh;

    public function __construct($maTtnh, $maKh, $hoTen, $sodienthoai, $diachi, $diachimacdinh) {
        $this->maTtnh = $maTtnh;
        $this->maKh = $maKh;
        $this->hoTen = $hoTen;
        $this->sodienthoai = $sodienthoai;
        $this->diachi = $diachi;
        $this->diachimacdinh = $diachimacdinh;
    }

    public function getMaTtnh() {
        return $this->maTtnh;
    }

    public function getMaKh() {
        return $this->maKh;
    }

    public function getHoTen() {
        return $this->hoTen;
    }

    public function getSoDienThoai() {
        return $this->sodienthoai;
    }

    public function getDiachi() {
        return $this->diachi;
    }

    public function getDiachimacdinh() {
        return $this->diachimacdinh;
    }

    public function setMaTtnh($maTtnh) {
        $this->maTtnh = $maTtnh;
    }

    public function setMaKh($maKh) {
        $this->maKh = $maKh;
    }

    public function setHoTen($hoTen) {
        $this->hoTen = $hoTen;
    }

    public function setSoDienThoai($sodienthoai) {
        $this->sodienthoai = $sodienthoai;
    }

    public function setDiachi($diachi) {
        $this->diachi = $diachi;
    }

    public function setDiachimacdinh($diachimacdinh) {
        $this->diachimacdinh = $diachimacdinh;
    }
}