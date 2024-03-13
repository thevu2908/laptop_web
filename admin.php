<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Admin laptop</title>
  <link rel="icon" type="image/x-icon" href="server\src\admin\assets\images\admin-icon.svg">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto|Varela+Round">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
  <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto|Varela+Round">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
  <link href="https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css" rel="stylesheet">
  <script src="https://gitcdn.github.io/bootstrap-toggle/2.2.2/js/bootstrap-toggle.min.js"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
  <link rel="stylesheet" href="server/src/admin/assets/css/style.css" />
</head>

<body>
  <?php include "./server/src/admin/view/Taskbar.php" ?>
  <div class="content">
    <?php include "./server/src/admin/view/Content.php" ?>
    <?php
    if (isset($_GET['controller'])) {
      $tmp = $_GET['controller'];
      switch ($tmp) {
        case "dashboard":
          include "./server/src/admin/view/DashBoard.php";
          break;
        case "sanpham": {
            include "./server/src/admin/view/SanPham.php";
            break;
          }
        case "taikhoan": {
            include "./server/src/admin/view/TaiKhoan.php";
            break;
          }
        case "nhanvien": {
            include "./server/src/admin/view/NhanVien.php";
            break;
          }
        case "nhomquyen": {
            include "./server/src/admin/view/NhomQuyen.php";
            break;
          }
        case "chucnang": {
            include "./server/src/admin/view/ChucNang.php";
            break;
          }
      }
    } else {
      include "./server/src/admin/view/DashBoard.php";
    }
    ?>
  </div>
  <script src="./public/pages/TaiKhoan.js"></script>
  <script src="./public/pages/NhomQuyen.js"></script>
</body>

</html>