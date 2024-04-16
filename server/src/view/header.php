<?php
session_start();
$username = '';
if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] === true) {
    $username = isset($_SESSION['username']) ? $_SESSION['username'] : 'unknown';
}
?>

<header class="header">
    <nav class="navbar navbar-expand-lg navbar-light container">
        <div class="container-fluid">
            <a class="navbar-brand" href="index.php">
                <h1 class="header-logo">LAPTOP</h1>
            </a>
            <form action method="GET" class="search-form" style="opacity: 1; transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg); transform-style: preserve-3d;">
                <div class="search-container">
                    <input class="search-input" maxlength="256" name="tim-kiem" placeholder="Nhập tên sản phẩm" type="search" id="search-input" autocomplete="off">
                    <div class="btn-search-box">
                        <label class="btn btn-search-label" for="search">
                            <span class="material-symbols-outlined">
                                search
                            </span>
                        </label>
                        <input type="submit" class="btn btn-search" id="search" hidden>
                    </div>
                    <div class="search-suggest-container">
                        <div class="suggest-left">
                            <div class="suggest-name">
                                <div class="suggest-title">Từ khóa</div>
                                <ul>

                                </ul>
                            </div>
                        </div>
                        <div class="suggest-right">
                            <div class="suggest-product">
                                <div class="suggest-title">Sản phẩm</div>
                                <ul>

                                </ul>
                            </div>
                        </div>
                        <div class="suggest-empty">Không tìm thấy sản phẩm nào</div>
                    </div>
                </div>
            </form>
            <div class="search-box">
                <button class="cart-btn">
                    <span class="material-symbols-outlined">
                        shopping_bag
                    </span>
                    <div class="cart-number">0</div>
                    <div class="cart-pseudo"></div>
                    <?php include "cart-dropdown.php" ?>
                </button>
                <a href="index.php?dang-nhap" class="login-btn">
                    <i class="fa-regular fa-user"></i>
                </a>
                <a href="index.php?bao-hanh" class="login-btn">
                    <i class="fa-solid fa-screwdriver-wrench"></i>
                </a>
                <a href="index.php?doi-tra" class="login-btn">
                    <i class="fa-solid fa-right-left"></i>
                </a>

                <?php echo $username
                    ? "
                        <div class='header-account'>
                            <span class='header-username'>$username</span>
                            <div class='header__account-menu'>
                                <a href='index.html?thong-tin-tai-khoan' class='header__account-link'>Tài khoản</a>
                                <a href='index.html?don-hang' class='header__account-link'>Đơn hàng đã đặt</a>
                                <a href='index.html?tra-cuu-bao-hanh' class='header__account-link'>Tra cứu bảo hành</a>
                                <a href='index.html?doi-tra' class='header__account-link'>Tra cứu đổi trả</a>
                                <a class='header__account-link btn-logout'>Đăng xuất</a>
                            </div>
                        </div>
                    "
                    : '<a href="index.php?dang-nhap" class="login-btn"><i class="fa-regular fa-user"></i></a>';
                ?>
            </div>
        </div>
    </nav>
</header>
<div class="over-suggest"></div>