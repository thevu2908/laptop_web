<header class="header">
    <nav class="navbar navbar-expand-lg navbar-light container">
        <div class="container-fluid">
            <a class="navbar-brand" href="index.php">
                <h1 class="header-logo">LAPTOP</h1>
            </a>
            <form action="/tim-kiem" class="search-form" style="opacity: 1; transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg); transform-style: preserve-3d;">
                <div class="search-container">
                    <input class="search-input" maxlength="256" name="query" placeholder="Nhập sản phẩm" type="search" id="search" required="">
                    <div class="btn-search-box">
                        <label class="btn btn-search-label" for="search">
                            <span class="material-symbols-outlined">
                                search
                            </span>
                        </label>
                        <input type="submit" class="btn btn-search" name="search" id="search" hidden>
                    </div>
                </div>
            </form>
            <div class="search-box">
                <a href="index.php?gio-hang" class="cart-btn">
                    <span class="material-symbols-outlined">
                        shopping_bag
                    </span>
                </a>
                <a href="index.php?dang-nhap" class="login-btn">
                    <i class="fa-regular fa-user"></i>
                </a>
            </div>
        </div>
    </nav>
</header>