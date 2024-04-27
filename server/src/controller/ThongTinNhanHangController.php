<?php

include __DIR__ . '/../model/ConnectDB.php';
include __DIR__ . '/../model/ThongTinNhanHang/ThongTinNhanHang.php';
include __DIR__ . '/../model/ThongTinNhanHang/ThongTinNhanHangRepo.php';

class ThongTinNhanHangController {
    private $ttnhRepo;

    public function __construct() {
        $this->ttnhRepo = new ThongTinNhanHangRepo();
    }

    public function getThongTinNhanHang($maTtnh) {
        return $this->ttnhRepo->getThongTinNhanhang($maTtnh);
    }

    public function getThongTinNhanHangByMaKhachHang($maKh) {
        return $this->ttnhRepo->getThongTinNhanHangByMaKhachHang($maKh);
    }

    public function getThongTinNhanHangLength() {
        return $this->ttnhRepo->getThongTinNhanHangLength();
    }

    public function addThongTinNhanHang($ttnh) {
        echo $this->ttnhRepo->addThongTinNhanHang($ttnh);
    }

    public function updateThongTinNhanHang($ttnh) {
        if ($this->ttnhRepo->updateThongTinNhanHang($ttnh)) {
            echo 'success';
        } else {
            echo 'fail';
        }
    }
    
    public function deleteThongTinNhanHang($maKh) {
        if ($this->ttnhRepo->deleteThongTinNhanHang($maKh)) {
            echo 'success';
        } else {
            echo 'fail';
        }
    }

    public function setDiaChiMacDinh($maTtnh) {
        if ($this->ttnhRepo->setDiaChiMacDinh($maTtnh)) {
            echo 'success';
        } else {
            echo 'fail';
        }
    }

    public function unsetDiaChiMacDinh() {
        echo $this->ttnhRepo->unsetDiaChiMacDinh();
    }
}

$ttnhCtl = new ThongTinNhanHangController();
$action = isset($_REQUEST['action']) ? $_REQUEST['action'] : '';

switch ($action) {
    case 'get-by-maKh':
        echo json_encode($ttnhCtl->getThongTinNhanHangByMaKhachHang($_POST['maKh']));
        break;
    case 'add':
        $length = $ttnhCtl->getThongTinNhanHangLength();
        if ($length >= 0) {
            $length++;
            $maTtnh = 'TTNH'.sprintf("%04d", $length);
            $object = json_decode(json_encode($_POST['ttnh']));
            $ttnh = new ThongTinNhanHang(
                $maTtnh,
                $object->{'maKh'},
                $object->{'hoten'},
                $object->{'sodienthoai'},
                $object->{'diachi'},
                $object->{'diachimacdinh'}
            );
            if ($object->{'diachimacdinh'} === 1) {
                $ttnhCtl->unsetDiaChiMacDinh();
            }
            $ttnhCtl->addThongTinNhanHang($ttnh);
        }
        break;
    case 'update':
        $object = json_decode(json_encode($_POST['ttnh']));
        $ttnh = $ttnhCtl->getThongTinNhanHang($object->{'maTtnh'});
        $ttnh->setHoTen($object->{'hoTen'});
        $ttnh->setSoDienThoai($object->{'soDienThoai'});
        $ttnh->setDiachi($object->{'diachi'});
        $ttnhCtl->updateThongTinNhanHang($ttnh);
        break;
    case 'delete':
        $ttnhCtl->deleteThongTinNhanHang($_POST['maTtnh']);
        break;
    case 'set-default':
        $ttnhCtl->setDiaChiMacDinh($_POST['maTtnh']);
        break;
    default:
        break;
}