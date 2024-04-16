$(document).ready(() => {
    inputEmail()
    backInputEmail()
    resendEmailOtp()
})

function sendEmailOtp(email) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/SignUpController.php',
            method: 'POST',
            data: { action: 'send-otp', email },
            success: otp => resolve(otp),
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}

function inputEmail() {
    $('.btn-continue-verify').on('click', async () => {
        const email = $('.sign-up__email').val()
        if (!email) {
            alert('Vui lòng nhập email')
            $('.sign-up__email').focus()
            return
        }
        if (!validateEmail(email)) {
            alert('Email không hợp lệ')
            $('.sign-up__email').focus()
            return
        }

        NProgress.start()
        try {
            const emailExist = await checkExistUsername(email)
            if (emailExist) {
                alert('Email này đã được sử dụng')
                NProgress.done()
                return
            }

            const otp = await sendEmailOtp(email)
            if (!containsOnlyNumbers(otp)) {
                alert('Email nhập vào không tồn tại')
                NProgress.done()
                return
            }
            
            const verifyOtp = await fetch('server/src/view/verify-otp.php')
            const footerResponse = await fetch('server/src/view/footer.php')
            const verifyOtpHtml = await verifyOtp.text()
            const footerHtml = await footerResponse.text()
            
            $('.sign-up-container').hide()
            $('.verify-container').css('display', 'flex')
            $('.signup-footer').css('visibility', 'hidden')
            $('.verify-container .verify-content').html(verifyOtpHtml)
            $('.verify-otp-email').text(email)
            $('#main-footer').show()
            $('#main-footer').html(footerHtml)
            verifyEmailOtp(otp)
            countDownConfirmOtp()
        } catch (error) {
            console.error(error)
        }
        NProgress.done()
    })
}

function verifyEmailOtp(otp) {
    $('.btn-to-create-pwd').off('click').on('click', async () => {
        const email = $('.verify-otp-email').text()
        const otpInput = $('.verify-otp-input').val()
        if (otpInput !== otp) {
            alert('Mã OTP không chính xác')
            return
        }

        const createPassword = await fetch('server/src/view/create-password.php')
        const createPasswordHtml = await createPassword.text()
        $('.verify-step-line:eq(0)').addClass('active')
        $('.verify-step-item:eq(1)').addClass('active')
        $('.verify-container .verify-content').html(createPasswordHtml)
        signUp(email)
    })
}

function resendEmailOtp() {
    $(document).on('click', '.btn-resend-otp', async () => {
        const email = $('.verify-otp-email').text()
        NProgress.start()
        try {
            const otp = await sendEmailOtp(email)
            verifyEmailOtp(otp)
            $('.verify-otp-resend-title').html('<span class="verify-otp-confirm">Vui lòng xác nhận mã trong 60 giây</span>')
            countDownConfirmOtp()
            alert('Mã OTP đã được gửi lại')
        } catch (error) {
            console.error(error)
        }
        NProgress.done()
    })
}

function signUp(email) {
    $('.btn-signup').off('click').on('click', async () => {
        const password = $('#signup-password').val()
        const confirmPassword = $('#signup-confirm-password').val()
        if (!password) {
            alert('Vui lòng nhập mật khẩu')
            $('#signup-password').focus()
            return
        }
        if (!confirmPassword) {
            alert('Vui lòng xác nhận mật khẩu')
            $('#signup-confirm-password').focus()
            return
        }
        if (password !== confirmPassword) {
            alert('Mật khẩu không trùng khớp')
            return
        }

        NProgress.start()
        try {
            const res = await addAccount(email, 'user', email, password)
            if (res) {
                const sinupSuccess = await fetch('server/src/view/signup-success.php')
                const sinupSuccessHtml = await sinupSuccess.text()
                const loginRes = await login(email, password)
                if (loginRes) {
                    $('.verify-step-line:eq(1)').addClass('active')
                    $('.verify-step-item:eq(2) ').addClass('active')
                    $('.verify-container .verify-content').html(sinupSuccessHtml)
                    $('.signup-success-email').text(email)
                    countDownBackHomePage()
                }
            }
        } catch (error) {
            console.error(error)
        }
        NProgress.done()
    })
}

function backInputEmail() {
    $(document).on('click', '.btn-back-verify', () => {
        $('.verify-container').hide()
        $('.sign-up-container').show()
        $('#main-footer').hide()
        $('.sign-up__email').val('')
        $('.signup-footer').css('visibility', 'visible')
    })
}