$(document).ready(() => {
    $('#address__province').select2({
        placeholder: 'Tỉnh/Thành phố',
        dropdownParent: '#address-modal'
    })
    $('#address__district').select2({
        placeholder: 'Quận/Huyện',
        dropdownParent: '#address-modal'
    })
    $('#address__ward').select2({
        placeholder: 'Phường/Xã',
        dropdownParent: '#address-modal'
    })
    $('#address-modal .btn-close').on('click', resetValue)
    $('#address-modal .btn-secondary').on('click', resetValue)
    
    handleRenderThongTinNhanHang()
    handleAddThongTinNhanhang()
})

function resetValue() {
    $('#address__name').val('')
    $('#address__phone').val('')
    $('#address__street').val('')
    $('#address__default').prop('checked', false)
    $('#address__province').val('0').trigger('change')
    $('#address__district').val('0').trigger('change')
    $('#address__ward').val('0').trigger('change')
}

function validateThongTinNhanHang(hoten, sodienthoai, province, distirct, ward, street) {
    flag = true
    if (!hoten) {
        $('#address__name-error').show()
        $('#address__name-error').text('Vui lòng nhập họ tên')
        $('#address__name-error').siblings('.custom-form__outline').addClass('error')
        flag = false
    }
    if (!province) {
        $('#address__province-error').show()
        $('#address__province-error').text('Vui lòng chọn tỉnh/thành phố')
        $('#address__province-error').siblings('.custom-form__outline').addClass('error')
        flag = false
    }
    if (!distirct) {
        $('#address__district-error').show()
        $('#address__district-error').text('Vui lòng chọn quận/huyện')
        $('#address__district-error').siblings('.custom-form__outline').addClass('error')
        flag = false
    }
    if (!ward) {
        $('#address__ward-error').show()
        $('#address__ward-error').text('Vui lòng chọn phường/xã')
        $('#address__ward-error').siblings('.custom-form__outline').addClass('error')
        flag = false
    }
    if (!street) {
        $('#address__street-error').show()
        $('#address__street-error').text('Vui lòng nhập địa chỉ cụ thể')
        $('#address__street-error').siblings('.custom-form__outline').addClass('error')
        flag = false
    }
    if (!isValidPhone(sodienthoai)) {
        $('#address__phone-error').show()
        $('#address__phone-error').text('Số điện thoại không hợp lệ')
        $('#address__phone-error').siblings('.custom-form__outline').addClass('error')
        flag = false
    }
    return flag;
}

function getThongTinNhanHang(maKh) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/ThongTinNhanHangController.php',
            method: 'POST',
            data: { action: 'get-by-maKh', maKh },
            dataType: 'JSON',
            success: data => resolve(data),
            error: (xhr, textStatus, error) => reject(error)
        })
    })
}

async function renderThongTinNhanHang() {
    const loginSession = await getLoginSession()
    const maKh = loginSession.customerId
    const ttnh = await getThongTinNhanHang(maKh)

    let html = `
        <div class="account-profile__address-container">
            <div class="account-profile__address-title">
                <h3>Địa chỉ nhận hàng</h3>
                <button class="btn-add-address-modal" data-bs-toggle="modal" data-bs-target="#address-modal">
                    <i class="fa-solid fa-plus"></i>
                    <span>Thêm địa chỉ mới</span>
                </button>
            </div>
    `

    if (ttnh && ttnh.length > 0) {
        html += '<div class="account-profile__address-list"><h3 class="account-profile__address-list-heading">Địa chỉ</h3>'

        ttnh.forEach(item => {
            const disabled = item.dia_chi_mac_dinh === '1' ? 'disabled' : ''
            html += `
                <div class="account-profile__address-item">
                    <div class="account-profile__address">
                        <div class="account-profile__address-heading">
                            <div id="" class="account-profile__address-name">
                                <span>${item.ho_ten}</span>
                                <div></div>
                                <span>${item.so_dien_thoai}</span>
                            </div>
                            <div class="d-flex">
                                <button class="btn btn-link btn-update-address__modal" data-bs-toggle="modal" data-bs-target="#address-modal">
                                    Cập nhật
                                </button>
                            </div>
                        </div>
                        <div id="" class="account-profile__address-content">
                            <div class="account-profile__address-info">
                                <div class="account-profile__address-info-box">
                                    <div class="account-profile__address-street">${item.dia_chi.split(',')[0]}</div>
                                    <div class="account-profile__address-street">${item.dia_chi.split(',').slice(1).join(', ').trim()}</div>
                                </div>
                            </div>
                            <button class="btn-set-default-address ${disabled}" ${disabled}>Thiết lập mặc định</button>
                        </div>
                        ${item.dia_chi_mac_dinh === '1' ? '<div id="" class="account-profile__address-default"><span>Mặc định</span></div>' : ''}
                    </div>
                </div>
            `
        })
    }

    html += '</div></div>'
    $('.account-profile__right').html(html)
}

function handleRenderThongTinNhanHang() {
    $('.account-profile__left-item.address').on('click', function() {
        $(this).siblings().not($(this)).removeClass('active')
        $(this).addClass('active')
        renderThongTinNhanHang()
    })
}

function setDiaChiMacDinh(maTtnh) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/ThongTinNhanHangController.php',
            method: 'POST',
            data: { action: 'set-default', maTtnh },
            success: res => resolve(res),
            error: (xhr, textStatus, error) => reject(error)
        })
    })
}

function addThongTinNhanHang(maKh, hoten, sodienthoai, diachi, diachimacdinh = 0) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/ThongTinNhanHangController.php',
            method: 'POST',
            data: { action: 'add', ttnh: { maKh, hoten, sodienthoai, diachi, diachimacdinh } },
            success: res => resolve(res),
            error: (xhr, textStatus, error) => reject(error)
        })
    })
}

function handleAddThongTinNhanhang() {
    $('#account-profile__main .btn-add-address').on('click', async () => {
        const loginSession = await getLoginSession()
        const maKh = loginSession.customerId
        const hoten = $('#address__name').val()
        const sodienthoai = $('#address__phone').val()
        const province = $('#address__province').find(':selected').text()
        const district = $('#address__district').find(':selected').text()
        const ward = $('#address__ward').find(':selected').text()
        const street = $('#address__street').val()
        const defaultCheck = $('#address__default').prop('checked')
    
        if (!validateThongTinNhanHang(hoten, sodienthoai, province, district, ward, street)) return

        const diachi = `${street}, ${ward}, ${district}, ${province}`
        const ttnh = await getThongTinNhanHang(maKh)

        let res = false;
        if (ttnh.length <= 0) {
            res = await addThongTinNhanHang(maKh, hoten, sodienthoai, diachi, 1)
        } else {
            const diachimacdinh = defaultCheck ? 1 : 0
            res = await addThongTinNhanHang(maKh, hoten, sodienthoai, diachi, diachimacdinh)    
        }

        if (res) {
            $('#address-modal .btn-close').click()
            renderThongTinNhanHang()
        } else {
            console.log(res)
            alert('Có lỗi xảy ra, vui lòng thử lại sau')
        }
    })
}