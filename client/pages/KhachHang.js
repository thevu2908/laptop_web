$(document).ready(() => {
    handleRenderCustomerProfile()
    //$('.account-profile__left-item.account').click()
    handleUpdateCustomerProfile()
})

function addCustomer(name, phone, email) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/KhachHangController.php',
            method: 'POST',
            data: { action: 'add', name, phone, email },
            success: res => res === 'success' ? resolve(true) : resolve(false),
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}

function updateCustomer(id, name, phone, email) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/KhachHangController.php',
            method: 'POST',
            data: { action: 'update', id, name, phone, email },
            success: res => res === 'success' ? resolve(true) : resolve(false),
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })

}

function getCustomer(id) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/KhachHangController.php',
            method: 'POST',
            data: { action: 'get-customer', id },
            dataType: 'JSON',
            success: customer => resolve(customer),
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}

function renderCustomerProfile(customer) {
    $('.account-profile__right').html(`
        <div class="account-profile__info-container">
            <h3 class="account-profile__info-title">Hồ sơ cá nhân</h3>
            <div class="account-profile__info">
                <form>
                    <table>
                        <tr>
                            <td>
                                <label for="account-profile__name">Họ tên</label>
                            </td>
                            <td>
                                <div>
                                    <input type="text" id="account-profile__name" class="form-control" value="${customer.ten_kh}" placeholder >
                                </div>
                                <div id="name-error" class="invalid-feedback" style="color: #ff424f; font-size: .75rem;"></div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label for="account-profile__email">Email</label>
                            </td>
                            <td>
                                <div>
                                    <input type="email" id="account-profile__email" class="form-control" value="${customer.email}" placeholder >
                                </div>
                                <div id="email-error" class="invalid-feedback" style="color: #ff424f; font-size: .75rem;"></div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label for="account-profile__phone">Số điện thoại</label>
                            </td>
                            <td>
                                <div>
                                    <input type="tel" id="account-profile__phone" class="form-control" value="${customer.so_dien_thoai}" placeholder >
                                </div>
                                <div id="phone-error" class="invalid-feedback" style="color: #ff424f; font-size: .75rem;"></div>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <button type="button" class="btn btn-update__customer-profile" data-id="${customer.ma_kh}">Lưu</button>
                            </td>
                        </tr>
                    </table>
                </form>
            </div>
        </div>
    `)
}

function handleRenderCustomerProfile() {
    $('.account-profile__left-item.account').on('click', async function() {
        window.history.pushState({}, '', 'index.php?thong-tin-tai-khoan&thong-tin-ca-nhan')
        $(this).siblings().not($(this)).removeClass('active')
        $(this).addClass('active')
        const loginSession = await getLoginSession()
        const { customerId } = loginSession
        const customer = await getCustomer(customerId)
        renderCustomerProfile(customer)
    })
}

function validateCustomer(name, email, phone) {
    let flag = true
    if (!name) {
        $('#name-error').show()
        $('#name-error').text('Vui lòng nhập họ tên')
        $('#account-profile__name').parent().addClass('error')
        flag =  false
    }
    if (!isValidEmail(email)) {
        $('#email-error').show()
        $('#email-error').text('Email không hợp lệ')
        $('#account-profile__email').parent().addClass('error')
        flag =  false
    }
    if (!isValidPhone(phone)) {
        $('#phone-error').show()
        $('#phone-error').text('Số điện thoại không hợp lệ')
        $('#account-profile__phone').parent().addClass('error')
        flag =  false
    }
    return flag
}

function handleUpdateCustomerProfile() {
    $(document).on('click', '.btn-update__customer-profile', async function() {
        const id = $(this).data('id')
        const name = $('#account-profile__name').val()
        const email = $('#account-profile__email').val()
        const phone = $('#account-profile__phone').val()

        if (!validateCustomer(name, email, phone)) return

        const res = await updateCustomer(id, name, phone, email)
        if (res) {
            alert('Cập nhật thông tin thành công')
            $('.account-profile__left-item.account').click()
        } else {
            alert('Có lỗi xảy ra, vui lòng kiểm tra lại thông tin')
        }
    })
}
