<header class="header">
    <nav class="navbar navbar-expand-lg navbar-light bg-light container">
        <div class="container-fluid">
            <a class="navbar-brand" href="index.php">
                <h1 class="header-logo">Laptop</h1>
            </a>
            <div class="collapse navbar-collapse nav-content" id="navbarSupportedContent">
                <ul class="navbar-nav mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="index.php?trang-chu">Trang chủ</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Link</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Dropdown
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item" href="#">Action</a></li>
                            <li><a class="dropdown-item" href="#">Another action</a></li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li><a class="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="search-box">
                <form action="/tim-kiem" class="search-form" style="opacity: 1; transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg); transform-style: preserve-3d;">
                    <div class="search-container">
                        <input class="search-input" maxlength="256" name="query" placeholder="Nhập sản phẩm" type="search" id="search" required="">
                        <div class="btn-search-box">
                            <label class="btn btn-search-label" for="search">
                                <span class="material-symbols-outlined">
                                    search
                                </span>
                            </label>
                            <input type="submit" class="btn btn-search" name="search" hidden>
                        </div>
                    </div>
                </form>
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