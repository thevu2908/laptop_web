<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Admin laptop</title>
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
  <link rel="stylesheet" href="./src/admin/assets/css/style.css" />
</head>

<body>
  <?php include "./src/admin/view/navigation.php" ?>
  <div class="content">
    <?php include "./src/admin/view/content.php" ?>
    <?php
    if (isset($_GET['controller'])) {
      $tmp = $_GET['controller'];
      switch ($tmp) {
        case "dashboard":
          include "./src/admin/view/dashboard.php";
          break;
        case "sanpham": {
            include "./src/admin/view/SanPham.php";
            break;
          }
        case "taikhoan": {
            include "./src/admin/view/TaiKhoan.php";
            break;
          }
        case "nhanvien": {
            include "./src/admin/view/NhanVien.php";
            break;
          }
        case "nhomquyen": {
            include "./src/admin/view/NhomQuyen.php";
            break;
          }
        case "chucnang": {
            include "./src/admin/view/ChucNang.php";
            break;
          }
      }
    } else {
      include "./src/admin/view/dashboard.php";
    }
    ?>
  </div>
  <script src="./public/pages/NhomQuyen.js"></script>
  <script src="./public/pages/TaiKhoan.js"></script>
</body>

</html>