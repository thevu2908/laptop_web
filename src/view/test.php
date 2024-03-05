<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <?php
    $a = "";
    $b = "";
    $result = "";
    $pheptinh = "";

    if (isset($_REQUEST['submit'])) {
        if (isset($_REQUEST['txtA'])) {
            $a = $_REQUEST['txtA'] ?? 0;
        }
        if (isset($_REQUEST['txtB'])) {
            $b = $_REQUEST['txtB'] ?? 0;
        }
        if (isset($_REQUEST['phep-tinh'])) {
            $pheptinh = $_REQUEST['phep-tinh'] ?? 0;
        }

        switch ($pheptinh) {
            case "plus":
                $result = $a + $b;
                break;
            case "sub":
                $result = $a - $b;
                break;
            case "multi":
                $result = $a * $b;
                break;
            case "divide":
                $result = $a / $b;
                break;
            default:
                break;
        }
    }
    ?>
    <form method="post" action="<?php $_SERVER['PHP_SELF'] ?>" autocomplete="off">
        <div>
            <label for="txtA">Số A:</label>
            <input type="number" id="txtA" name="txtA" value="<?= $a ?>">
        </div>
        <div>
            <label for="txtA">Số B:</label>
            <input type="number" id="txtB" name="txtB" value="<?= $b ?>">
        </div>
        <div>
            <label for="phep-tinh">Phép tính:</label>
            <select id="phep-tinh" name="phep-tinh">
                <option value="plus" selected>Cộng</option>
                <option value="sub">Trừ</option>
                <option value="multi">Nhân</option>
                <option value="divide">Chia</option>
            </select>
        </div>
        <div>
            <label for="result">Kết quả</label>
            <input type="text" id="result" value="<?= $result ?>">
        </div>
        <input type="submit" value="Tính" name="submit">
    </form>
</body>

</html>