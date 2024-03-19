<section>
    <div class="py-3 h-100">
        <div class="shadow-bottom">
            <div class="login-header verify-header container">
                <a href="index.php" class="login-header-logo-link">
                    <h1 class="login-header-logo">Laptop</h1>
                </a>
                <h1 class="login-header-title">Đăng ký</h1>
            </div>
        </div>
        <div>
            <div class="verify-container">
                <div class="verify-box">
                    <div class="verify-step-list">
                        <div class="verify-step-item">
                            <div class="verify-step-number active">1</div>
                            <p class="verify-step-text active">Xác minh số điện thoại</p>
                        </div>
                        <?php
                        $active = '';
                        if (isset($_REQUEST["tao-mat-khau"]) || isset($_REQUEST["tao-thanh-cong"])) {
                            $active = 'active';
                        }
                        echo <<<ETO
                            <div class="verify-step-line $active"></div>
                            <div class="verify-step-item">
                                <div class="verify-step-number $active">2</div>
                                <p class="verify-step-text $active">Tạo mật khẩu</p>
                            </div>
                        ETO;
                        ?>
                        <?php
                        $active = '';
                        if (isset($_REQUEST["tao-thanh-cong"])) {
                            $active = 'active';
                        }
                        echo <<<ETO
                            <div class="verify-step-line $active"></div>
                            <div class="verify-step-item">
                                <div class="verify-step-number $active">
                                    <i class="fa-solid fa-check"></i>
                                </div>
                                <p class="verify-step-text $active">Hoàn thành</p>
                            </div>
                        ETO;
                        ?>
                    </div>
                    <div class="verify-content">
                        <?php
                        if (isset($_REQUEST["xac-minh-otp"])) {
                            include 'verify-otp.php';
                        } else if (isset($_REQUEST["tao-mat-khau"])) {
                            include 'create-password.php';
                        } else if (isset($_REQUEST["tao-thanh-cong"])) {
                            include 'signup-success.php';
                        }
                        ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<?php include 'footer.php'; ?>