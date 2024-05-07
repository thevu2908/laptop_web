$(document).ready(() => {
    const urlParams = new URLSearchParams(window.location.search)
    if (window.location.pathname === '/index.php' && urlParams.has('quen-mat-khau')) {
        checkEmail()
        toVerifyPage()
        backCheckEmailPage()
        resendEmailOtp()
    }
})

function renderVerifyOtp(email) {
    $('.forgot-password-main .verify-content').html(`
        <div class="verify-content-header">
            <div class="verify-content-header-box">
                <a class="btn-back-verify">
                    <i class="fa-solid fa-arrow-left"></i>
                </a>
                <div class="verify-content-header-title-box">
                    <h5 class="verify-content-header-title">Nhập mã xác nhận</h5>
                </div>
            </div>
        </div>
        <form class="verify-otp-form">
            <div class="verify-otp-form-container">
                <div class="verify-otp-title">Mã xác minh của bạn đã được gửi đến</div>
                <div class="verify-otp-email-box">
                    <div class="verify-otp-email">${email}</div>
                </div>
                <div class="verify-otp-input-container">
                    <div class="verify-otp-input-box">
                        <input type="tel" class="verify-otp-input" autocomplete="one-time-code" maxlength="6" value>
                        <div class="verify-otp-input-underline">
                            <div class="verify-otp-input-underline-item"></div>
                            <div class="verify-otp-input-underline-item"></div>
                            <div class="verify-otp-input-underline-item"></div>
                            <div class="verify-otp-input-underline-item"></div>
                            <div class="verify-otp-input-underline-item"></div>
                            <div class="verify-otp-input-underline-item"></div>
                        </div>
                    </div>
                </div>
                <div class="verify-space"></div>
                <div class="verify-otp-footer">
                    <div class="verify-otp-resend-title">
                        <span class="verify-otp-confirm">Vui lòng xác nhận mã trong 60 giây</span>
                    </div>
                </div>
                <button type="button" class="btn-to-create-pwd disabled" disabled>TIẾP THEO</button>
            </div>
        </form>
    `)
}

function renderResetPassword(email) {
    $('.forgot-password-main .verify-content').html(`
        <div class="verify-content-header">
            <div class="verify-content-header-box">
                <a class="btn-back-verify">
                    <i class="fa-solid fa-arrow-left"></i>
                </a>
                <div class="verify-content-header-title-box">
                    <h5 class="verify-content-header-title">Thiết lập mật khẩu</h5>
                </div>
            </div>
        </div>
        <form class="create-password-form">
            <div class="create-password-form-container">
                <div class="create-password-title">Tạo mật khẩu mới cho</div>
                <div class="create-password-email-box">
                    <div class="create-password-email">${email}</div>
                </div>
                <div class="create-password-input-container">
                    <div class="mb-4">
                        <input type="password" id="reset-password" class="form-control form-control-lg reset-password" placeholder="Mật khẩu" />
                    </div>
                    <div class="mb-3">
                        <input type="password" id="reset-confirm-password" class="form-control form-control-lg reset-password" placeholder="Xác nhận mật khẩu" />
                    </div>
                    <div class="signup-show-pwd-box">
                        <input type="checkbox" id="signup-show-pwd" >
                        <label for="signup-show-pwd">Hiện mật khẩu</label>
                    </div>
                    <button type="button" class="btn-reset-password">TIẾP THEO</button>
                </div>
            </div>
        </form>
    `)
}

function renderResetSuccess(email) {
    $('.forgot-password-main .verify-content').html(`
        <form class="signup-success-form" action="index.php" method="POST">
            <div class="signup-success-container">
                <h5 class="signup-success-header">Đổi mật khẩu!</h5>
                <div class="signup-success-icon">
                    <i class="fa-regular fa-circle-check"></i>
                </div>
                <div class="signup-success-noti">
                    <span>Bạn đã đổi mật khẩu thành công tài khoản</span>
                    <span class="signup-success-email">${email}</span>
                </div>
                <div class="signup-success-noti">
                    <span class="signup-success-homepage">Bạn sẽ trở về trang chủ trong 5 giây</span>
                </div>
                <button type="submit" class="btn-back-homepage">Quay lại trang chủ</button>
            </div>
        </form>
    `)
}

function checkEmail() {
    $('.forgot-password-main .email-input-box input').on('input', function () {
        if (!isValidEmail($(this).val())) {
            $(this).addClass('is-invalid')
            $(this).css('background-color', '#fff6f7')
            $('.forgot-password-main #email-error').show()
            $('.forgot-password-main .btn-verify-otp').addClass('disabled')
            $('.forgot-password-main .email-input-box').addClass('error')
            $('.forgot-password-main .btn-verify-otp').attr('disabled', true)
            return
        }

        $(this).css('background-color', '#fff')
        $(this).removeClass('is-invalid')
        $('.forgot-password-main .email-input-box').removeClass('error')
        $('.forgot-password-main #email-error').hide()
        $('.forgot-password-main .btn-verify-otp').removeClass('disabled')
        $('.forgot-password-main .btn-verify-otp').removeAttr('disabled')
    })
}

function toVerifyPage() {
    $('.forgot-password-main .btn-verify-otp').on('click', async () => {
        NProgress.start()
        try {
            const email = $('.forgot-password-main .email-input-box input').val()
            const emailExist = await checkExistUsername(email)
            if (!emailExist) {
                alert('Không thể tìm thấy email này trong hệ thống\nVui lòng kiểm tra lại')
                NProgress.done()
                return
            }

            const otp = await sendEmailOtp(email)
            if (!containsOnlyNumbers(otp)) {
                alert('Email nhập vào không tồn tại')
                NProgress.done()
                return
            }

            renderVerifyOtp(email)
            toResetPasswordPage(otp)
            countDownConfirmOtp()
        } catch (error) {
            console.log(error)
        }
        NProgress.done()
    })
}

function resendEmailOtp() {
    $(document).on('click', '.btn-resend-otp', async () => {
        const email = $('.verify-otp-email').text()
        NProgress.start()
        try {
            const otp = await sendEmailOtp(email)
            toResetPasswordPage(otp)
            $('.verify-otp-resend-title').html('<span class="verify-otp-confirm">Vui lòng xác nhận mã trong 60 giây</span>')
            countDownConfirmOtp()
            alert('Mã OTP đã được gửi lại')
        } catch (error) {
            console.error(error)
        }
        NProgress.done()
    })
}

function toResetPasswordPage(otp) {
    $('.forgot-password-main .btn-to-create-pwd').off('click').on('click', async () => {
        const email = $('.forgot-password-main .verify-otp-email').text()
        const otpInput = $('.forgot-password-main .verify-otp-input').val()
        if (otpInput !== otp) {
            alert('Mã OTP không chính xác')
            return
        }

        renderResetPassword(email)
        resetPassword(email)
    })
}

function resetPassword(email) {
    $('.forgot-password-main .btn-reset-password').off('click').on('click', async () => {
        const password = $('.forgot-password-main #reset-password').val()
        const confirmPassword = $('.forgot-password-main #reset-confirm-password').val()
        if (!password) {
            alert('Vui lòng nhập mật khẩu')
            $('.forgot-password-main #reset-password').focus()
            return
        }
        if (!confirmPassword) {
            alert('Vui lòng xác nhận mật khẩu')
            $('.forgot-password-main #reset-confirm-password').focus()
            return
        }
        if (password !== confirmPassword) {
            alert('Mật khẩu không trùng khớp')
            return
        }

        NProgress.start()
        try {

            const res = await updatePassword(email, password)
            if (res) {
                renderResetSuccess(email)
                countDownBackHomePage()
            } else {
                alert('Xảy ra ra lỗi, vui lòng thử lại sau')
            }
        } catch (error) {
            console.error(error)
        }
        NProgress.done()
    })
}

function backCheckEmailPage() {
    $(document).on('click', '.forgot-password-main .btn-back-verify', () => {
        window.location.href = 'index.php?quen-mat-khau'
    })
}