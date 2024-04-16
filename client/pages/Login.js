$(document).ready(() => {
    handleLogin()
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
        if (username !== 'admin' && !validateEmail(username)) {
            alert('Email không hợp lệ')
            $('#login-username').focus()
            return
        }
    
        const account = await getAccount(username)
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