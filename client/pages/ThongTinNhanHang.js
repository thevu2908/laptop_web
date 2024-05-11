$(document).ready(() => {
    if (window.location.pathname === '/index.php') {
        initSelect2()
        $('#address-modal .btn-close').on('click', resetValue)
        $('#address-modal .btn-secondary').on('click', resetValue)
        $('.btn-add-address__modal').on('click', resetValue)
    }
    
    handleRenderThongTinNhanHang()
    renderUpdateThongTinNhanHangModal()
    handleThongTinNhanhang()
    handleSetDiaChiMacDinh()
    renderDeleteThongTinNhanHangModal()
    handleDeleteThongTinNhanHang()
})

function initSelect2() {
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
}

function resetValue() {
    $('#address__name').val('')
    $('#address__phone').val('')
    $('#address__street').val('')
    $('#address__default').prop('checked', false)
    $('#address__province').val('0').trigger('change')
    $('#address__district').val('0').trigger('change')
    $('#address__ward').val('0').trigger('change')
    $('#address-modal .modal-title').text('Địa chỉ mới')
    $('.btn-address').text('Thêm')
    $('.custom-form__outline').removeClass('error')
    $('.custom-form__input-error').hide()
    $('.custom-form__input-error').text('')
    $('.address__default-container').removeClass('disabled')
    $('.address__default-container').attr('title', '')
    $('#address__default').prop('checked', false)
    $('#address__default').prop('disabled', false)
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

function getThongTinNhanHangByMaKH(maKh) {
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

function getThongTinNhanHang(id) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/ThongTinNhanHangController.php',
            method: 'POST',
            data: { action: 'get', id },
            dataType: 'JSON',
            success: ttnh => resolve(ttnh),
            error: (xhr, textStatus, error) => reject(error)
        })
    })
}

async function renderThongTinNhanHang() {
    const loginSession = await getLoginSession()
    const maKh = loginSession.customerId
    const ttnh = await getThongTinNhanHangByMaKH(maKh)

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
                            <div class="account-profile__address-name">
                                <span>${item.ho_ten}</span>
                                <div></div>
                                <span>${item.so_dien_thoai}</span>
                            </div>
                            <div class="d-flex">
                                <button class="btn btn-link btn-update-address__modal" data-bs-toggle="modal" data-bs-target="#address-modal" data-id="${item.ma_ttnh}">
                                    Cập nhật
                                </button>
                                ${item.dia_chi_mac_dinh === '0' 
                                    ? `<button class="btn btn-link btn-delete-address__modal" data-bs-toggle="modal" data-bs-target="#delete-address-modal" data-id="${item.ma_ttnh}">
                                        Xóa
                                    </button>` 
                                    : ''
                                }
                            </div>
                        </div>
                        <div class="account-profile__address-content">
                            <div class="account-profile__address-info">
                                <div class="account-profile__address-info-box">
                                    <div class="account-profile__address-street">${item.dia_chi.split(',')[0]}</div>
                                    <div class="account-profile__address-street">${item.dia_chi.split(',').slice(1).join(', ').trim()}</div>
                                </div>
                            </div>
                            <button class="btn-set-default-address ${disabled}" data-id="${item.ma_ttnh}" ${disabled}>Thiết lập mặc định</button>
                        </div>
                        ${item.dia_chi_mac_dinh === '1' ? '<div class="account-profile__address-default"><span>Mặc định</span></div>' : ''}
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
        window.history.pushState({}, '', 'index.php?thong-tin-tai-khoan&dia-chi')
        $(this).siblings().not($(this)).removeClass('active')
        $(this).addClass('active')
        $('.enduser-pagination').html('')
        renderThongTinNhanHang()
    })
}

function renderUpdateThongTinNhanHangModal() {
    $(document).on('click', '.btn-update-address__modal', async function() {
        resetValue()
        const id = $(this).data('id')
        const ttnh = await getThongTinNhanHang(id)
        const [street, ward, district, province] = ttnh.dia_chi.split(',').map(part => part.trim())
        
        if (ttnh) {
            $('.custom-form__title').show()
            $('#address-modal .modal-title').text('Cập nhật địa chỉ')
            $('#address__name').val(ttnh.ho_ten)
            $('#address__phone').val(ttnh.so_dien_thoai)

            const provinceOption = $('#address__province').find('option').filter(function() { return $(this).text() === province })
            $('#address__province').val(provinceOption.val()).trigger('change')

            const districts = await getDistricts(provinceOption.val())
            districts.forEach(district => $('#address__district').append(`<option value="${district.id}">${district.name}</option>`))
            const districtOption = $('#address__district').find('option').filter(function() { return $(this).text() === district })
            $('#address__district').val(districtOption.val()).trigger('change')

            const wards = await getWards(districtOption.val())
            wards.forEach(ward => $('#address__ward').append(`<option value="${ward.id}">${ward.name}</option>`))
            const wardOption = $('#address__ward').find('option').filter(function() { return $(this).text() === ward })
            $('#address__ward').val(wardOption.val()).trigger('change')

            $('#address__street').val(street)

            if (ttnh.dia_chi_mac_dinh === '1') {
                $('.address__default-container').addClass('disabled')
                $('.address__default-container').attr('title', 'Không thể xóa địa chỉ mặc định.\nHãy đặt địa chỉ khác làm địa chỉ mặc định')
                $('#address__default').prop('checked', true)
                $('#address__default').prop('disabled', true)
            }

            $('.btn-address').text('Cập nhật')
            $('.btn-address').data('action', 'update')
            $('.btn-address').data('id', id)
        }
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

function updateThongTinNhanHang(maTtnh, hoten, sodienthoai, diachi, diachimacdinh = 0) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/ThongTinNhanHangController.php',
            method: 'POST',
            data: { action: 'update', ttnh: { maTtnh, hoten, sodienthoai, diachi, diachimacdinh } },
            success: res => resolve(res),
            error: (xhr, textStatus, error) => reject(error)
        })
    })
}

function handleThongTinNhanhang() {
    $(document).on('click', '#account-profile__main .btn-address', async () => {
        const action = $('.btn-address').data('action')
        const hoten = $('#address__name').val()
        const sodienthoai = $('#address__phone').val()
        const province = $('#address__province').find(':selected').text()
        const district = $('#address__district').find(':selected').text()
        const ward = $('#address__ward').find(':selected').text()
        const street = $('#address__street').val()
        const diachi = `${street.replaceAll(',', ' ')}, ${ward}, ${district}, ${province}`
        const diachimacdinh = $('#address__default').prop('checked') ? 1 : 0
    
        if (!validateThongTinNhanHang(hoten, sodienthoai, province, district, ward, street)) return

        NProgress.start()
        let res = false
        if (action === 'add') {
            const loginSession = await getLoginSession()
            const maKh = loginSession.customerId
            const ttnh = await getThongTinNhanHangByMaKH(maKh)
    
            if (ttnh.length <= 0) {
                res = await addThongTinNhanHang(maKh, hoten, sodienthoai, diachi, 1)
            } else {
                res = await addThongTinNhanHang(maKh, hoten, sodienthoai, diachi, diachimacdinh)    
            }
        } else if (action === 'update') {
            const maTtnh = $('.btn-address').data('id')
            res = await updateThongTinNhanHang(maTtnh, hoten, sodienthoai, diachi, diachimacdinh)
        }

        if (res === '1') {
            $('#address-modal .btn-close').click()
            renderThongTinNhanHang()
        } else {
            console.log(res)
            alert('Có lỗi xảy ra, vui lòng thử lại sau')
        }
        NProgress.done()
    })
}

function setDiaChiMacDinh(maTtnh, maKh) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/ThongTinNhanHangController.php',
            method: 'POST',
            data: { action: 'set-default', maTtnh, maKh },
            success: res => resolve(res),
            error: (xhr, textStatus, error) => reject(error)
        })
    })
}

function handleSetDiaChiMacDinh() {
    $(document).on('click', '.btn-set-default-address', async function() {
        NProgress.start()
        const loginSession = await getLoginSession()
        const maKh = loginSession.customerId
        const maTtnh = $(this).data('id')
        const res = await setDiaChiMacDinh(maTtnh, maKh)
        if (res === '1') {
            renderThongTinNhanHang()
        } else {
            console.log(res)
            alert('Có lỗi xảy ra, vui lòng thử lại sau')
        }
        NProgress.done()
    })
}

function deleteThongTinNhanHang(maTtnh) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/ThongTinNhanHangController.php',
            method: 'POST',
            data: { action: 'delete', maTtnh },
            success: res => resolve(res),
            error: (xhr, textStatus, error) => reject(error)
        })
    })
}

function renderDeleteThongTinNhanHangModal() {
    $(document).on('click', '.btn-delete-address__modal', function() {
        $('#delete-address-modal .btn-delete-address').data('id', $(this).data('id'))
    })
}

function handleDeleteThongTinNhanHang() {
    $(document).on('click', '.btn-delete-address', async function() {
        const maTtnh = $(this).data('id')
        const res = await deleteThongTinNhanHang(maTtnh)
        if (res === '1') {
            $('#delete-address-modal .btn-close').click()
            renderThongTinNhanHang()
        } else {
            console.log(res)
            alert('Có lỗi xảy ra, vui lòng thử lại sau')
        }
    })
}