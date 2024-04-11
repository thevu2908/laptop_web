<header class="header">
    <nav class="navbar navbar-expand-lg navbar-light container">
        <div class="container-fluid">
            <a class="navbar-brand" href="index.php">
                <h1 class="header-logo">LAPTOP</h1>
            </a>
            <form action method="GET" class="search-form" style="opacity: 1; transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg); transform-style: preserve-3d;">
                <div class="search-container">
                    <input class="search-input" maxlength="256" name="tim-kiem" placeholder="Nhập tên sản phẩm" type="search" id="search-input">
                    <div class="btn-search-box">
                        <label class="btn btn-search-label" for="search">
                            <span class="material-symbols-outlined">
                                search
                            </span>
                        </label>
                        <input type="submit" class="btn btn-search" id="search" hidden>
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