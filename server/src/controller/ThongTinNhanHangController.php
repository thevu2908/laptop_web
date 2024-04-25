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
        echo $this->ttnhRepo->updateThongTinNhanHang($ttnh);
    }
    
    public function deleteThongTinNhanHang($maKh) {
        echo $this->ttnhRepo->deleteThongTinNhanHang($maKh);
    }

    public function setDiaChiMacDinh($maTtnh) {
        echo $this->ttnhRepo->setDiaChiMacDinh($maTtnh);
    }

    public function unsetDiaChiMacDinh() {
        return $this->ttnhRepo->unsetDiaChiMacDinh();
    }
}

$ttnhCtl = new ThongTinNhanHangController();
$action = isset($_REQUEST['action']) ? $_REQUEST['action'] : '';

switch ($action) {
    case 'get-by-maKh':
        echo json_encode($ttnhCtl->getThongTinNhanHangByMaKhachHang($_POST['maKh']));
        break;
    case 'get':
        echo json_encode($ttnhCtl->getThongTinNhanHang($_POST['id']));
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
            if ($object->{'diachimacdinh'} == 1) {
                $ttnhCtl->unsetDiaChiMacDinh();
            }
            $ttnhCtl->addThongTinNhanHang($ttnh);
        }
        break;
    case 'update':
        $object = json_decode(json_encode($_POST['ttnh']));
        $res = $ttnhCtl->getThongTinNhanHang($object->{'maTtnh'});
        $ttnh = new ThongTinNhanHang($res['ma_ttnh'], $res['ma_kh'], $res['ho_ten'], $res['so_dien_thoai'], $res['dia_chi'], $res['dia_chi_mac_dinh']);
        $ttnh->setHoTen($object->{'hoten'});
        $ttnh->setSoDienThoai($object->{'sodienthoai'});
        $ttnh->setDiachi($object->{'diachi'});
        $ttnh->setDiachimacdinh($object->{'diachimacdinh'});
        if ($object->{'diachimacdinh'} == 1) {
            $ttnhCtl->unsetDiaChiMacDinh();
        }
        $ttnhCtl->updateThongTinNhanHang($ttnh);
        break;
    case 'delete':
        $ttnhCtl->deleteThongTinNhanHang($_POST['maTtnh']);
        break;
    case 'set-default':
        $ttnhCtl->unsetDiaChiMacDinh();
        $ttnhCtl->setDiaChiMacDinh($_POST['maTtnh']);
        break;
    default:
        break;
}