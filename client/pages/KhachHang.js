$(document).ready(() => {
    const urlParams = new URLSearchParams(window.location.search)
    if (window.location.pathname === '/admin.php' && urlParams.get('controller') === 'khachhang') {
        renderAdminCustomerTable()
        renderAdminCustomerAddress()
        searchKhachHang()
    }
    handleRenderCustomerProfile()
    handleUpdateCustomerProfile()
})

function getCustomers(page) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/PaginationController.php',
            method: 'GET',
            data: { action: 'pagination', table: 'khachhang', page },
            dataType: 'JSON',
            success: customers => resolve(customers),
            error: (xhr, status, error) => reject(error)
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
function render(customers){
    let html = ''
    if (customers && customers.pagination && customers.pagination.length > 0) {
        html += customers.pagination.map(customer => `
            <tr>
                <td>${customer.ma_kh}</td>
                <td>${customer.ten_kh}</td>
                <td>${customer.so_dien_thoai}</td>
                <td>${customer.email}</td>
                <td>
                    <a href="#customer-address-modal" data-toggle="modal" class="info btn-customer-address" data-id="${customer.ma_kh}">
                        <i class="fa-solid fa-location-dot"></i>
                    </a>
                </td>
            </tr>
        `).join('')
    }
    $('.admin-customer-list').html(html)
    phanquyen_chucnang('Khách Hàng')
    totalPage(customers.count)
    displayTotalPage("#admin-customer-main .hint-text", customers.count, customers.pagination.length)
}
async function renderAdminCustomerTable() {
    try {
        const page = $('#current-page').val()
        const customers = await getCustomers(page)
        render(customers)
       
    } catch (error) {
        console.log(error)
        alert('Xảy ra lỗi khi lấy dữ liệu khách hàng, vui lòng thử lại sau')
    }
}

function renderAdminCustomerAddress() {
    $(document).on('click', '.btn-customer-address', async function() {
        try {
            const id = $(this).data('id')
            const addresses = await getThongTinNhanHangByMaKH(id)
            console.log(addresses)
            if (addresses && addresses && addresses.length > 0) {
                const html = addresses.map(address => `
                    <div class="customer-address">
                        <div>
                            <span><b>Tên người nhận:</b></span>
                            <span>${address.ho_ten}</span>
                        </div>
                        <div style="margin: 0 12px;">
                            <span><b>Số điện thoại:</b></span>
                            <span>${address.so_dien_thoai}</span>
                        </div>
                        <div>
                            <span><b>Địa chỉ:</b></span>
                            <span>${address.dia_chi}</span>
                        </div>
                        ${address.dia_chi_mac_dinh == 1 ? '<span class="customer-address__default">Mặc định</span>' : ''}
                    </div>
                `)
                $('#customer-address-modal .modal-body').html(html)
            } else {
                $('#customer-address-modal .modal-body').html(`
                    <div class="d-flex align-items-center justify-content-center">
                        <img src="server/src/assets/images/address_empty.png" >
                    </div>
                    <div class="d-flex align-items-center justify-content-center">Chưa có địa chỉ nhận hàng</div>
                `)
            }
        } catch (error) {
            console.log(error)
            alert('Xảy ra lỗi khi lấy dữ liệu, vui lòng thử lại sau')
        }
    })
}

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
        $('.enduser-pagination').html('')
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
function searchKhachHang() {
    $(document).on('keyup', '.admin-search-info', e => {
        const search = e.target.value.toLowerCase()
        $.ajax({
            url: 'server/src/controller/SearchController.php',
            method: 'GET',
            data: { action: 'search', table: 'khachhang', search },
            dataType: 'JSON',
            success: data => render(data),
            error: (xhr, status, error) => console.log(error)
        })
    })
}