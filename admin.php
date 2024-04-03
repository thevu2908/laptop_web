<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Laptop Admin</title>
  <link rel="icon" type="image/x-icon" href="server\src\admin\assets\images\admin-icon.svg">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto|Varela+Round">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
  <link href="https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.1/css/bootstrap-select.css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
  <link rel="stylesheet" href="server/src/admin/assets/css/style.css" />

  <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
  <script src="https://gitcdn.github.io/bootstrap-toggle/2.2.2/js/bootstrap-toggle.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.1/js/bootstrap-select.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.js"></script>
  <script lang="javascript" src="https://cdn.sheetjs.com/xlsx-0.20.1/package/dist/xlsx.full.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js"></script>
</head>

<body>
  <div id="admin-main">
    <?php include "./server/src/admin/view/Taskbar.php"; ?>
    <div class="content">
      <?php include "./server/src/admin/view/Content.php" ?>
      <?php
      if (isset($_GET['controller'])) {
        $tmp = $_GET['controller'];
        switch ($tmp) {
          case "dashboard":
            include "./server/src/admin/view/Dashboard.php";
            break;
          case "sanpham": {
              include "./server/src/admin/view/SanPham.php";
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
              break;
            }
          case "danhgia": {
              include "./server/src/admin/view/DSSanPham.php";
              echo '<script src="./client/pages/DanhGia.js"></script>';
              break;
            }
          case "taikhoan": {
              include "./server/src/admin/view/TaiKhoan.php";
              echo '<script src="./client/pages/TaiKhoan.js"></script>';
              echo "<script src='./client/pages/NhomQuyen.js'></script>";
              echo "<script src='./client/pages/NhanVien.js'></script>'";
              break;
            }
          case "nhanvien": {
              include "./server/src/admin/view/NhanVien.php";
              echo '<script src="./client/pages/TaiKhoan.js"></script>';
              echo "<script src='./client/pages/NhomQuyen.js'></script>";
              echo "<script src='./client/pages/NhanVien.js'></script>'";
              break;
            }
          case "hoadon": {
              include "./server/src/admin/view/HoaDon.php";
              break;
            }
          case "khuyenmai": {
              include "./server/src/admin/view/KhuyenMai.php";
              echo "<script src='./client/pages/KhuyenMai.js'></script>";
              break;
            }
          case "nhomquyen": {
              include "./server/src/admin/view/NhomQuyen.php";
              echo "<script src='./client/pages/NhomQuyen.js'></script>";
              break;
            }
          case "chucnang": {
              include "./server/src/admin/view/ChucNang.php";
              echo "<script src='./client/pages/ChucNangQuyen.js'></script>";
              break;
            }
          case "phanquyen": {
              include "./server/src/admin/view/PhanQuyen.php";
              echo "<script src='./client/pages/ChiTietQuyen.js'></script>";
              break;
            }
          case "chitietsanpham": {
              include "./server/src/admin/view/ChiTietSanPham.php";
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
              break;
            }
        }
      } else {
        include "./server/src/admin/view/DashBoard.php";
      }
      ?>
    </div>
  </div>

  <script src="./server/src/admin/assets/js/main.js"></script>
  <script src="./server/src/admin/assets/js/account.js"></script>
  <script src="./server/src/admin/assets/js/product.js"></script>
  <script src="./server/src/admin/assets/js/productColor.js"></script>
  <script src="./client/utils/formatCurrency.js"></script>
  <script src="./client/plugins/pagination.js"></script>
</body>

</html>