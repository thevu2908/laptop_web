<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Laptop</title>
    <link rel="icon" type="image/x-icon" href="server\src\assets\images\logo.jpg">
    <link href='https://fonts.googleapis.com/css?family=Poppins|Source Sans Pro|Catamaran|Roboto|Epilogue' rel='stylesheet'>
    <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/line.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link rel="stylesheet" href="./server/src/assets/css/style.css">
    <link rel="stylesheet" href="./server/src/assets/css/base.css">
</head>

<body>
    <div id="main">
        <?php
        if (isset($_REQUEST["dang-nhap"])) {
            include "./server/src/view/login.php";
        } else if (isset($_REQUEST["dang-ky"])) {
            include "./server/src/view/signup.php";
        } else if (isset($_REQUEST["san-pham"])) {
            if (isset($_REQUEST["id"])) {
                include "./server/src/view/productDetail.php";
            } else {
                include "./server/src/view/product.php";
            }
        } else if (isset($_REQUEST["gio-hang"])) {
            include "./server/src/view/cart.php";
        } else {
            include "./server/src/view/homepage.php";
        }
        ?>
    </div>

    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    <script src="server/src/assets/js/main.js"></script>
</body>

</html>