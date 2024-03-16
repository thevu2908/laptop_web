<?php
class TaiKhoan {
    private $ma_tk;
    private $ma_quyen;
    private $username;
    private $password;
    private $trang_thai;

    // Constructor
    public function __construct($ma_tk, $ma_quyen, $username, $password, $trang_thai) {
        $this->ma_tk = $ma_tk;
        $this->ma_quyen = $ma_quyen;
        $this->username = $username;
        $this->password = $password;
        $this->trang_thai = $trang_thai;
    }

    // Getter methods
    public function getMaTk() {
        return $this->ma_tk;
    }

    public function getMaQuyen() {
        return $this->ma_quyen;
    }

    public function getUsername() {
        return $this->username;
    }

    public function getPassword() {
        return $this->password;
    }

    public function getTrangThai() {
        return $this->trang_thai;
    }
}