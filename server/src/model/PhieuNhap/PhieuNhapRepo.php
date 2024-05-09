<?php
$x = $_SESSION;
if (isset($_SESSION['arrPQ'])) {
    $arrPQ = $_SESSION['arrPQ'];
    foreach ($arrPQ as $key => $value) {
        $x = $key;
        $tmp = preg_split("/\./", $key);
        if ($tmp[0] == 'Nhập hàng') {
            foreach ($value['HanhDong'] as $key2 => $value2) {
                $x = $key2;
                if ($key2 == 'cart' && $value2) {
                    $statusCart = 1;
                } else
                if ($key2  == 'import' && $value2) {
                    $statusImport = 1;
                } else
                if ($key2  == 'create' && $value2) {
                    $statusCreate = 1;
                }
            }
        }
    }
}

switch ($action) {
    case '':
        $sql = "SELECT * FROM sanpham sp JOIN chitietsanpham ctsp ON sp.ma_sp = ctsp.ma_sp JOIN mausac ms ON ctsp.ma_mau = ms.ma_mau
        JOIN chipxuly cxl ON ctsp.ma_chip_xu_ly = cxl.ma_chip_xu_ly
        JOIN carddohoa cdh ON ctsp.ma_carddohoa = cdh.ma_card
        ORDER BY sp.ma_sp, ctsp.ma_ctsp";
        $result = (new ConnectDB())->select($sql);
        $sql1 = "select * from nhacungcap";
        $result1 = (new ConnectDB())->select($sql1);
        break;
    case 'addtocart':
        session_start();
        if (empty($_SESSION['cartimport'][$mancc][$ma])) {
            $sql = "SELECT * FROM  sanpham sp JOIN chitietsanpham ctsp ON sp.ma_sp = ctsp.ma_sp JOIN mausac ms ON ctsp.ma_mau = ms.ma_mau
                JOIN chipxuly cxl ON ctsp.ma_chip_xu_ly = cxl.ma_chip_xu_ly
                JOIN carddohoa cdh ON ctsp.ma_carddohoa = cdh.ma_card where ma_ctsp='$ma'";
            $result = (new ConnectDB())->select($sql);
            $each = mysqli_fetch_array($result);
            $sql1 = "select * from nhacungcap where ma_ncc='$mancc'";
            $result1 = (new ConnectDB())->select($sql1);
            $each1 = mysqli_fetch_array($result1);
            $_SESSION['cartimport'][$mancc][$ma]['ma_sp'] = $each['ma_sp'];
            $_SESSION['cartimport'][$mancc][$ma]['ma_ctsp'] = $each['ma_ctsp'];
            $_SESSION['cartimport'][$mancc][$ma]['ten_sp'] = $each['ten_sp'];
            $_SESSION['cartimport'][$mancc][$ma]['hinh_anh'] = $each['hinh_anh'];
            $_SESSION['cartimport'][$mancc][$ma]['ma_ncc'] = $mancc;
            $_SESSION['cartimport'][$mancc][$ma]['ten_ncc'] = $each1['ten_ncc'];
            $_SESSION['cartimport'][$mancc][$ma]['ram'] = $each['ram'];
            $_SESSION['cartimport'][$mancc][$ma]['rom'] = $each['rom'];
            $_SESSION['cartimport'][$mancc][$ma]['ten_mau'] = $each['ten_mau'];
            $_SESSION['cartimport'][$mancc][$ma]['gia_nhap'] = $_GET['gianhap'];

            echo $gia_nhap;

            // $_SESSION['cartimport'][$mancc][$ma]['status'] = 'Chưa Xác Nhận';
            $_SESSION['cartimport'][$mancc][$ma]['quantity'] = 1;
        } else {
            $_SESSION['cartimport'][$mancc][$ma]['quantity']++;
        }
        break;
    case 'payimport':
        for ($i = 0; $i < count($ma); $i++) {
            $sql = " SELECT * FROM  sanpham sp JOIN chitietsanpham ctsp ON sp.ma_sp = ctsp.ma_sp where ma_ctsp='$ma[$i]'";
            $result = (new ConnectDB())->select($sql);
            $each = mysqli_fetch_array($result);
            $new_quantity = $each['so_luong'] + $quantity[$i];
            $sql1 = "update sanpham sp JOIN chitietsanpham ctsp ON sp.ma_sp = ctsp.ma_sp
            set 
            so_luong = '$new_quantity'
            where ma_ctsp ='$ma[$i]'";
            (new ConnectDB())->excute($sql1);
        }

        $arrNCC_PN = [];
        $today = date("Y-m-d");
        session_start();
        $manv = $_SESSION['id'];

        $cart = $_SESSION['cartimport'];
        foreach ($cart as $cart1) {
            foreach ($cart1 as $ma => $each) {
                print_r($each);
                if (empty($arrNCC_PN[$each['ma_ncc']][$each['ma_sp']][$each['ma_ctsp']])) {
                    $mancc1 = $each['ma_ncc'];
                    $arrNCC_PN[$each['ma_ncc']][$each['ma_sp']][$each['ma_ctsp']]['ma_ncc'] = $each['ma_ncc'];
                    $arrNCC_PN[$each['ma_ncc']][$each['ma_sp']][$each['ma_ctsp']]['ma_sp'] = $each['ma_sp'];
                    $arrNCC_PN[$each['ma_ncc']][$each['ma_sp']][$each['ma_ctsp']]['ma_sp'] = $each['ma_ctsp'];
                    $arrNCC_PN[$each['ma_ncc']][$each['ma_sp']][$each['ma_ctsp']]['quantity'] = $each['quantity'];
                    $arrNCC_PN[$each['ma_ncc']][$each['ma_sp']][$each['ma_ctsp']]['gia_nhap'] = $each['gia_nhap'];
                }
            }
        }
        foreach ($arrNCC_PN as $each) {
            $tongtien = 0;
            foreach ($each as $key => $each1) {
                print_r($each1);
                $thanhtien = $each1['quantity'] * $each1['gia_nhap'];
                $tongtien += $thanhtien;
                $mancc = $each1["ma_ncc"];
            }
            $ma123 = $_REQUEST['ma'];
            $mactsp123 = $_REQUEST['mactsp'];
            $total123 = $_REQUEST['total'];
            $mancc123 = $_POST['mancc'];

            // Tạo mã mới dựa trên số lượng mã đã tồn tại
            $sql_ma_pn = "SELECT COUNT(*) as count FROM phieunhap";
            $result = (new ConnectDB())->query($sql_ma_pn);
            $row = mysqli_fetch_assoc($result);
            $count = $row['count'] + 1; // Số thứ tự mới
            $maPN = 'PN' . str_pad($count, 4, '0', STR_PAD_LEFT);

            $sql2 = "insert into phieunhap(ma_pn, ma_ncc, ma_nv, ngay_nhap, tong_tien, tinh_trang, trang_thai)
                values ('$maPN','$mancc123', '$manv', '$today', '$total123', 0 ,0)";

            var_dump($sql2);
            $maPN = (new ConnectDB())->last_id($sql2);
            foreach ($each as $key => $each1) {
                $ma = $each1['ma_ctsp'];
                $quantity = $each1['quantity'];
                $thanhtien = $each1['quantity'] * $each1['gia_nhap'];
                $sql3 = "insert into chitietphieunhap(ma_pn, ma_ctsp, so_luong,thanh_tien) values ('$maPN', '$ma', '$quantity', '$thanhtien')";
                (new ConnectDB())->excute($sql3);
                unset($_SESSION['cartimport'][$mancc][$ma]);
            }
        }
        break;
    case 'invoices':
        $sql = "select * from phieunhap";
        $result123 = (new ConnectDB())->select($sql);


        break;
    case 'detailinvoices':
        // $sql = "SELECT * FROM  sanpham sp JOIN chitietsanpham ctsp ON sp.ma_sp = ctsp.ma_sp where ma_ctsp='$ma'";
        //SELECT * FROM sanpham sp JOIN chitietsanpham ctsp ON sp.ma_sp = ctsp.ma_sp JOIN chitietphieunhap ctpn ON ctsp.ma_ctsp = ctpn.ma_ctsp JOIN phieunhap pn ON ctpn.ma_pn = pn.ma_pn;
        //SELECT * FROM sanpham sp JOIN chitietsanpham ctsp ON sp.ma_sp = ctsp.ma_sp JOIN chitietphieunhap ctpn ON ctsp.ma_ctsp = ctpn.ma_ctsp ;
        $sql = "SELECT * FROM  sanpham sp JOIN chitietsanpham ctsp ON sp.ma_sp = ctsp.ma_sp where ma_ctsp='$ma'";
        $result = (new ConnectDB())->select($sql);
        break;
}
