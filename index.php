<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Laptop</title>
    <link rel="icon" type="image/x-icon" href="server/src/assets/images/logo.jpg">
    <link href='https://fonts.googleapis.com/css?family=Poppins|Source Sans Pro|Catamaran|Roboto|Epilogue' rel='stylesheet'>
    <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/line.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css">
    <link rel="stylesheet" href="./server/src/assets/css/style.css">
    <link rel="stylesheet" href="./server/src/assets/css/base.css">
    <link rel="stylesheet" href="./server/src/assets/css/responsive.css">
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.js"></script>
</head>

<body>
    <div id="main">
        <?php
        if (isset($_REQUEST['dang-nhap'])) {
            include './server/src/view/login.php';
            echo '<script src="./client/pages/TaiKhoan.js"></script>';
        } else if (isset($_REQUEST['dang-ky'])) {
            include './server/src/view/signup.php';
            echo '<script src="./client/pages/SignUp.js"></script>';
            echo '<script src="./client/pages/TaiKhoan.js"></script>';
            echo '<script src="./client/pages/KhachHang.js"></script>';
        } else if (isset($_REQUEST['quen-mat-khau'])) {
            include './server/src/view/forget-password.php';
            echo '<script src="./client/pages/ForgetPassword.js"></script>';
            echo '<script src="./client/pages/TaiKhoan.js"></script>';
        } else if (isset($_REQUEST['san-pham'])) {
            if (isset($_REQUEST['id'])) {
                include './server/src/view/productDetail.php';
            } else {
                include './server/src/view/product.php';
            }
            echo '<script src="./client/pages/ThuongHieu.js"></script>';
            echo '<script src="./client/pages/TheLoai.js"></script>';
            echo '<script src="./client/pages/MauSac.js"></script>';
            echo '<script src="./client/pages/ChipXuLy.js"></script>';
            echo '<script src="./client/pages/CardDoHoa.js"></script>';
            echo '<script src="./client/pages/CongKetNoi.js"></script>';
            echo '<script src="./client/pages/HeDieuHanh.js"></script>';
            echo '<script src="./client/pages/SanPham.js"></script>';
            echo '<script src="./client/pages/ChiTietSanPham.js"></script>';
            echo '<script src="./client/pages/ChiTietCongKetNoi.js"></script>';
            echo '<script src="./client/pages/DanhGia.js"></script>';
        } else if (isset($_REQUEST['gio-hang'])) {
            include './server/src/view/cart.php';
            include './client/pages/DanhGia.js';
            echo '<script src="./client/pages/KhuyenMai.js"></script>';
        } else if (isset($_REQUEST['thanh-toan'])) {
            include './server/src/view/checkout.php';
            echo '<script src="client/pages/DiaChi.js"></script>';
            echo '<script src="client/pages/Checkout.js"></script>';
        } else if (isset($_REQUEST['tim-kiem'])) {
            include './server/src/view/search-product.php';
            echo '<script src="./client/pages/ThuongHieu.js"></script>';
            echo '<script src="./client/pages/TheLoai.js"></script>';
            echo '<script src="./client/pages/MauSac.js"></script>';
            echo '<script src="./client/pages/ChipXuLy.js"></script>';
            echo '<script src="./client/pages/CardDoHoa.js"></script>';
            echo '<script src="./client/pages/CongKetNoi.js"></script>';
            echo '<script src="./client/pages/HeDieuHanh.js"></script>';
            echo '<script src="./client/pages/SanPham.js"></script>';
            echo '<script src="./client/pages/ChiTietSanPham.js"></script>';
            echo '<script src="./client/pages/ChiTietCongKetNoi.js"></script>';
        } else {
            include './server/src/view/homepage.php';
            echo '<script src="./client/pages/ThuongHieu.js"></script>';
            echo '<script src="./client/pages/TheLoai.js"></script>';
            echo '<script src="./client/pages/MauSac.js"></script>';
            echo '<script src="./client/pages/ChipXuLy.js"></script>';
            echo '<script src="./client/pages/CardDoHoa.js"></script>';
            echo '<script src="./client/pages/CongKetNoi.js"></script>';
            echo '<script src="./client/pages/HeDieuHanh.js"></script>';
            echo '<script src="./client/pages/SanPham.js"></script>';
            echo '<script src="./client/pages/ChiTietSanPham.js"></script>';
            echo '<script src="./client/pages/ChiTietCongKetNoi.js"></script>';
            echo '<script src="./client/pages/FeedBack.js"></script>';
        }
        ?>
    </div>

    <script src="./client/pages/GioHang.js"></script>
    <script src="./client/pages/DanhGia.js"></script>
    <script src="server/src/assets/js/main.js"></script>
    <script src="./client/plugins/pagination.js"></script>
    <script src="./client/plugins/validation.js"></script>
    <script src="./client/plugins/SendOTP.js"></script>
    <script src="./client/plugins/getSession.js"></script>
    <script src="./client/utils/general.js"></script>
    <script src="./client/utils/formatCurrency.js"></script>
    <script src="./client/utils/formatPromotion.js"></script>
    <script src="./client/utils/formatDate.js"></script>
    <script src="./client/pages/TimKiem.js"></script>
    <script src="./client/pages/Login.js"></script>
</body>

</html>