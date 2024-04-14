<?php
class ChiTietPhieuBaoHanhRepo extends ConnectDB{
    public function addChiTietPhieuBaoHanh($maphieubaohanh,$listitemBaoHanh){
        foreach($listitemBaoHanh as $key){
            $ma_imei=$key['ime'];
            $lydo=$key['lyDoBaoHanh'];
            $noidungbaohanh=$key['noiDungBaoHanh'];
            $query = "INSERT INTO chitietphieubaohanh(ma_pbh,ma_imei,ly_do,noi_dung_bao_hanh) VALUES ('$maphieubaohanh','$ma_imei','$lydo','$noidungbaohanh')";
            $result=mysqli_query($this->conn,$query);
            if(!$result){
                return false;
            }
        }
        return true;
    }
}
?>