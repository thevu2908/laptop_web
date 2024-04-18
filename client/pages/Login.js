$(document).ready(() => {
    handleLogin()
    googleLogin()
    logout()
})

function login(username, password) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/TaiKhoanController.php',
            method: 'POST',
            data: { action: 'login', username, password },
            success: res => res === 'success' ? resolve(true) : resolve(false),
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}

function handleLogin() {
    $('.btn-login').on('click', async () => {
        const username = $('#login-username').val()
        const password = $('#login-password').val()

        if (!username) {
            alert('Vui lòng nhập email')
            $('#login-username').focus()
            return
        }
        if (!password) {
            alert('Vui lòng nhập mật khẩu')
            $('#login-password').focus()
            return
        }

        try {
            const account = await getAccount(username)
            if (account.ma_quyen === 'user' && !isValidEmail(username)) {
                alert('Email không hợp lệ')
                $('#login-username').focus()
                return
            }
    
            if (!account) {
                alert('Email bạn nhập không kết nối với tài khoản nào')
                return
            }
    
            const res = await login(username, password)
            if (res) {
                account.ma_quyen === 'user' ? window.location.href = 'index.php' : window.location.href = 'admin.php'
            } else {
                alert('Mật khẩu không chính xác')
            }
        } catch (error) {
            console.log(error)
            lert('Xảy ra lỗi, vui lòng thử lại sau')
        }
    })
}

function googleLogin() {
    $(document).on('click', '.btn-gg-login', () => {
        $.ajax({
            url: 'server/src/controller/GoogleLoginController.php',
            method: 'POST',
            data: { action: 'get-google-url' },
            success: url => {
                const screenWidth = window.screen.width
                const screenHeight = window.screen.height
                const windowWidth = 500
                const windowHeight = 600
                const left = (screenWidth - windowWidth) / 2
                const top = (screenHeight - windowHeight) / 2 - 50
                window.open(url, 'googleSignInWindow', 'width=' + windowWidth + ', height=' + windowHeight + ', left=' + left + ', top=' + top)
            },
            error: (xhr, status, error) => console.log(error)
        })
    })
}

function logout() {
    $(document).on('click', '.btn-logout', () => {
        $.ajax({
            url: 'server/src/controller/TaiKhoanController.php',
            method: 'POST',
            data: { action: 'logout' },
            success: () => window.location.href = 'index.php',
            error: (xhr, status, error) => console.log(error)
        })
    })
}