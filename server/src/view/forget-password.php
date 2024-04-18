<section class="forgot-password-main">
    <div class="py-3 h-100">
        <div class="shadow-bottom">
            <div class="container login-header">
                <a href="index.php" class="login-header-logo-link">
                    <h1 class="login-header-logo">Laptop</h1>
                </a>
                <h1 class="login-header-title">Đặt lại mật khẩu</h1>
            </div>
        </div>
        <div class="verify-container">
            <div class="verify-box">
                <div class="verify-content">
                    <div class="verify-content-header">
                        <div class="verify-content-header-box">
                            <a href="index.php?dang-nhap" class="btn-back-verify">
                                <i class="fa-solid fa-arrow-left"></i>
                            </a>
                            <div class="verify-content-header-title-box">
                                <h5 class="verify-content-header-title">Đặt lại mật khẩu</h5>
                            </div>
                        </div>
                    </div>
                    <div class="email-input-container">
                        <div class="email-input-box">
                            <input type="email" class="form-control" placeholder="Nhập email">
                        </div>
                        <div id="email-error" class="invalid-feedback" style="color: #ff424f; font-size: .75rem;">Email không hợp lệ</div>
                        <button class="btn-verify-otp disabled" disabled>Tiếp theo</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<?php include 'footer.php'; ?>