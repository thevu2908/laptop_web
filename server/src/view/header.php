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
                                    <!-- <li>
                                        <a href="index.php?tim-kiem=macbook">macbook</a>
                                    </li>
                                    <li>
                                        <a href="index.php?tim-kiem=macbook-air">macbook air m2 2022</a>
                                    </li> -->
                                </ul>
                            </div>
                        </div>
                        <div class="suggest-right">
                            <div class="suggest-product">
                                <div class="suggest-title">Sản phẩm</div>
                                <ul>
                                    <!-- <li>
                                        <a href="index.php?san-pham&id=SP001">
                                            <div class="product-item">
                                                <div class="product-item__img me-2">
                                                    <img src="server/src/assets/images/products/SP001.png">
                                                </div>
                                                <div class="product-item__info">
                                                    <h3 class="product-item__name">Macbook mini 2023 M2 8CPU 10GPU 8GB/512GB</h3>
                                                    <div class="product-item__price">
                                                        19.690.000
                                                        <del>21.990.000</del>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="index.php?san-pham&id=SP001">
                                            <div class="product-item">
                                                <div class="product-item__img me-2">
                                                    <img src="server/src/assets/images/products/SP001.png">
                                                </div>
                                                <div class="product-item__info">
                                                    <h3 class="product-item__name">Macbook mini 2023 M2 8CPU 10GPU 8GB/512GB</h3>
                                                    <div class="product-item__price">
                                                        19.690.000
                                                        <del>21.990.000</del>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </li> -->
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
            </div>
        </div>
    </nav>
</header>
<div class="over-suggest"></div>