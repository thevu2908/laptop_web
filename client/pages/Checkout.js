$(document).ready(() => {
    initCheckoutStorage()
    loadCartToCheckout()
    loadPromoToCheckout()

    loadTTNHToCheckout()
    handleAddTTNHCheckout()
    
    selectPaymentMethod()
    handlePayment()
})

var isPaidSuccess = false
var countdownInterval

async function initCheckoutStorage() {
    const maKH = await getMaKH();
    const pay_id = $('.select-payment-method.select').attr('data-id');
        
    let payMethodData = sessionStorage.getItem('pttt') ? JSON.parse(sessionStorage.getItem('pttt')) : {};
    if (payMethodData[maKH]) delete payMethodData[maKH];
    
    payMethodData[maKH] = pay_id;
    sessionStorage.setItem('pttt', JSON.stringify(payMethodData));
}

async function loadCartToCheckout() {
    const maKH = await getMaKH()
    $.ajax({
        url: 'server/src/controller/GioHangController.php',
        method: 'POST',
        data: { action: 'get-all' , maKH },
        dataType: 'JSON',
        success: carts => {
            if (carts && carts.length > 0) {
                let html = ''

                carts.forEach((cart) => {
                    getFullInfoProduct(cart.ma_ctsp)
                        .then(product => {
                            html += `
                                <li class="d-flex checkout__right-product" data-id="${cart.ma_ctsp}" >
                                    <div class="checkout__right-image">
                                        <img src="${product.hinh_anh}" alt="">
                                    </div>
                                    <div class="checkout__right-info ms-3 align-self-center">
                                        <span>${product.ten_sp} ${product.ram}/${product.rom}</span> 
                                        <div class="checkout__right-quantity" style="display: flex;">Số lượng: ${cart.so_luong}</div>
                                        <div class="checkout__right-product-price">₫${formatCurrency(cart.gia_sp)}</div>
                                    </div>
                                </li>
                            `
                            
                            $('.checkout__right-cart').html(html)
                        })
                        .catch(error => console.log(error))
                })
            }
        },
        error: (xhr, status, error) => console.log(error)
    })
}

function getPromotion(promoId) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/KhuyenMaiController.php',
            method: 'POST',
            data: { action: 'get', promoId },
            dataType: 'JSON',
            success: promo => resolve(promo),
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}

async function loadPromoToCheckout() { 
    let maKH = await getMaKH()
    let khuyenMai = JSON.parse(localStorage.getItem('khuyenMai')) || {};

    if(khuyenMai[maKH]) {
        let promises = khuyenMai[maKH].map(async maKM => {
            return getPromotion(maKM)
                .then(res => {
                    if (res && res.ma_km) {
                        return `
                            <li class="modal-promo-item p-2">
                                <div class="modal-promo-name d-flex align-items-center">
                                    <div class="modal-promo-code">${res.ma_km}</div>
                                    <div class="modal-promo-name2 ms-2" style="font-weight: 500;">${res.ten_khuyen_mai}</div>
                                </div>
                                <div class="modal-promo-percent">
                                    Giảm ${convertMucKM(res.muc_khuyen_mai)}
                                </div>
                                <div class="modal-promo-bottom d-flex justify-content-between">
                                    <div class="modal-promo-expiry">HSD: ${convertDate(res.thoi_gian_ket_thuc)}</div>
                                </div>
                            </li>
                        `;
                    } else {
                        return '';
                    }
                });
        });
    
        Promise.all(promises)
            .then(results => {
                $('.checkout__right-promo').html(results.join(''));
            })
            .catch(error => console.log(error));
    }
}

async function loadTTNHToCheckout() {
    const maKH = await getMaKH()
    getThongTinNhanHangByMaKH(maKH)
        .then(info => {
            html = ''

            if(info && info.length > 0) {
                info.forEach(item => {
                    const selected = item.dia_chi_mac_dinh == 1 ? 'select' : ''
                    html += `
                        <li class="col-6" >
                            <div class="checkout-address-btn position-relative select-ttnh ${selected}" data-id="${item.ma_ttnh}" >
                                <div class="checkout-address__info">
                                    <h5 style="font-weight: 600;">${item.ho_ten}</h5>
                                    <h6 class="mb-1 mt-1" >${item.so_dien_thoai}</h6>
                                    <h6>${item.dia_chi}</h6>
                                </div>
                            </div>
                        </li>
                    `
                })
            }

            html += `
                <li class="col-6 openmodal" >
                    <div class="checkout-address-btn add-address-btn" style="color: #848788;">Thêm địa chỉ</div>
                </li>
            `

            $('.checkout-address').html(html)
            
            const ttnh_id = $('.select-ttnh.select').attr('data-id')
        
            let ttnhData = sessionStorage.getItem('ttnh') ? JSON.parse(sessionStorage.getItem('ttnh')) : {};
            if (ttnhData[maKH]) delete ttnhData[maKH];
            
            ttnhData[maKH] = ttnh_id;
            sessionStorage.setItem('ttnh', JSON.stringify(ttnhData));
            selectTTNH()
        })
        .catch(error => console.log(error));
}

function resetValueTTNH() {
    $('#inputName').val('')
    $('#inputPhone').val('')
    $('#inputStreet').val('')
    $('#checkDefault').prop('checked', false)
    $('#province').val('0').trigger('change')
    $('#district').val('0').trigger('change')
    $('#wards').val('0').trigger('change')
}

function validateTTNH(hoten, sodienthoai, province, district, ward, street) {
    if (!hoten) {
        alert('Vui lòng nhập họ tên')
        return false
    }
    if (!isValidPhone(sodienthoai)) {
        alert('Số điện thoại không hợp lệ')
        return false
    }
    if (!province || province == "Chọn một tỉnh") {
        alert('Vui lòng chọn tỉnh/thành phố')
        return false
    }
    if (!district || district == "Chọn một quận/huyện") {
        alert('Vui lòng chọn quận/huyện')
        return false
    }
    if (!ward || ward == "Chọn một xã/phường") {
        alert('Vui lòng chọn phường/xã')
        return false
    }
    if (!street) {
        alert('Vui lòng nhập địa chỉ cụ thể')
        return false
    }
    return true;
}

function handleAddTTNHCheckout() {
    $(document).on('click', '.checkout #saveAddress', async function(e) {
        e.preventDefault();

        let customerId = await getMaKH()
        let name = $('.checkout #inputName').val()
        let phone = $('.checkout #inputPhone').val()
        let province = $('.checkout #province option:selected').text();
        let district = $('.checkout #district option:selected').text();
        let wards = $('.checkout #wards option:selected').text();
        let street = $('.checkout #inputStreet').val()
        const checkDefault = $('.checkout #checkDefault').prop('checked')

        if(!validateTTNH(name, phone, province, district, wards, street)) {
            return
        }
        
        const address = `${street}, ${wards}, ${district}, ${province}`
        const ttnh = await getThongTinNhanHangByMaKH(customerId)

        let res = false;
        if (ttnh.length <= 0) {
            res = await addThongTinNhanHang(customerId, name, phone, address, 1)
        } else {
            const addressDefault = checkDefault ? 1 : 0
            res = await addThongTinNhanHang(customerId, name, phone, address, addressDefault)    
        }

        if (res) {
            alert('Đã lưu thành công địa chỉ nhận hàng!!')
            resetValue()
            $('.modal-cart-footer .btn-cancel').click()
            loadTTNHToCheckout()
            console.log(res)
        } else {
            console.log(res)
            alert('Có lỗi xảy ra, vui lòng thử lại sau')
        }
        
    });
}

function selectTTNH() {
    $(document).on('click', '.select-ttnh', async function(e) {
        e.preventDefault();
        $('.select-ttnh').removeClass('select');
        $(this).addClass('select');

        const maKH = await getMaKH()
        const ttnh_id = $(this).attr('data-id')
        
        let ttnhData = sessionStorage.getItem('ttnh') ? JSON.parse(sessionStorage.getItem('ttnh')) : {};
        if (ttnhData[maKH]) delete ttnhData[maKH];
        
        ttnhData[maKH] = ttnh_id;
        sessionStorage.setItem('ttnh', JSON.stringify(ttnhData));
    });
}

function payment(method) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/GioHangController.php',
            method: 'POST',
            data: { action: 'payment', method },
            dataType: 'JSON',
            success: promo => resolve(promo),
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}

function selectPaymentMethod() {
    $(document).on('click', '.select-payment-method', async function(e) {
        e.preventDefault();
        $('.select-payment-method').removeClass('select');
        $(this).addClass('select');
        
        const maKH = await getMaKH();
        const pay_id = $(this).attr("data-id");
        
        let payMethodData = sessionStorage.getItem('pttt') ? JSON.parse(sessionStorage.getItem('pttt')) : {};
        if (payMethodData[maKH]) delete payMethodData[maKH];
        
        payMethodData[maKH] = pay_id;
        sessionStorage.setItem('pttt', JSON.stringify(payMethodData));
    });
}

async function handleRandomCTSP(maHD) {
    const promises = $('.checkout__right-product').toArray().map(async function(e) {
        const maCTSP = $(e).attr('data-id');
        const soLuong = parseInt($(e).find('.checkout__right-quantity').text().split(':')[1].trim());
        const giaSP = $(e).find('.checkout__right-product-price').text().replace(/[₫.]/g, '');

        const cthd = {
            'maHD': maHD,
            'maCTSP': maCTSP,
            'soLuong': soLuong,
            'giaSP': giaSP
        }
        
        const res = await addCTHD(cthd)
        console.log("res = " + res)
        return res === 'success';
    })

    const results = await Promise.all(promises);
    return results.every(result => result);
}

async function clearCart(maKH) {
    delPromoToLocalByMaKH(maKH)
    loadPromoToCheckout()
    $('.checkout-note-input').val("")
    const resDelete = await deleteCartAll(maKH)
    if(resDelete === 'success') {
        console.log("clearCart success")
        await loadCart()
    } else {
        alert("Đã có lỗi xảy ra, vui lòng thử lại sau")
    }
}

function handlePayment() {
    $(document).on('click', '#btn-payment', async function(e) {
        e.preventDefault();

        const maKH = await getMaKH()
        const ptttData = sessionStorage.getItem('pttt') ? JSON.parse(sessionStorage.getItem('pttt')) : {};
        const today = new Date().toISOString().slice(0, 10);
        const finishTotal = $('.checkout-confirm__money-total').text().replace(/[₫.]/g, '');    
        
        // const pttt_id = await payment(ptttData[maKH])
        if(ptttData[maKH] === 'QR') {
            soTien = finishTotal
            date = today.replace(/-/g, "");
            noiDungCK = date + "QRCode" + maKH
            console.log(noiDungCK)
            $('.checkout-qrcode-price').text(soTien)
            $('.checkout-qrcode-content').text(noiDungCK)
            handleMethodQRCode(soTien, noiDungCK)
            startCountDown()
        } else if(ptttData[maKH] === 'COD') {
            sendPayment()
        } else if(ptttData[maKH] === 'VNPAY') {
            
        } else {
            console.log(ptttData[maKH] + " KHÔNG tồn tại")
        }
    });
}

async function sendPayment() {
    const maKH = await getMaKH()
    const ptttData = sessionStorage.getItem('pttt') ? JSON.parse(sessionStorage.getItem('pttt')) : {};
    const ttnhData = sessionStorage.getItem('ttnh') ? JSON.parse(sessionStorage.getItem('ttnh')) : {};
    const today = new Date().toISOString().slice(0, 10);
    const tmpTotal = $('.checkout-confirm__tmp-total').text().replace(/[₫.]/g, '');
    const promotion = $('.checkout-confirm__promo').text().replace(/[^0-9]/g, '');
    const finishTotal = $('.checkout-confirm__money-total').text().replace(/[₫.]/g, '');
    const note = $('.checkout-note-input').val();
    const status = 'Chưa xác nhận'

    const bill = {
        'maKH': maKH,
        'maTTNH': ttnhData[maKH],
        'date': today,
        'tmpTotal': tmpTotal,
        'promotion': promotion,
        'finishTotal': finishTotal,
        'payMethod': ptttData[maKH],
        'note': note,
        'status': status
    }

    const resAddBill = await addBill(bill)

    if (resAddBill.startsWith('HD')) {
        if (handleRandomCTSP(resAddBill)) {
            alert('Đơn hàng đã được gửi đi, vui lòng chờ nhân viên xác nhận')
            clearCart(maKH)
            window.location.href = 'index.php?thong-tin-tai-khoan&don-hang';
        } 
        else {
            alert('Đã xảy ra lỗi khi thanh toán, vui lòng thử lại')
        }
    } else {
        console.log(resAddBill)
        alert('Đã xảy ra lỗi, vui lòng thử lại')
    }
}

let MY_BANK = {
    BANK_ID: "MB",
    ACCOUNT_NO: "0778715603"
}

function handleMethodQRCode(soTien, noiDungCK) {
    let QR = `https://img.vietqr.io/image/${MY_BANK.BANK_ID}-${MY_BANK.ACCOUNT_NO}-qr_only.png?amount=${soTien}&addInfo=${noiDungCK}`;
    $('#img-qrcode img').attr('src', QR);
    console.log(QR)

    setTimeout(() => {
        setInterval(() => {
            checkPaid(soTien, noiDungCK)
        }, 3000)
    }, 3000)

    $('.modal-cart.qr-code').addClass('open')
}

async function checkPaid(soTien, noiDungCK) {
    if(isPaidSuccess) {
        return;
    }
    else {
        try {
            const response = await fetch('https://script.google.com/macros/s/AKfycbziTf9e_uKRRLrklRBkQ_08OQOAiJmtwJM2G5nS2sAfpIHPgfphpdN810fVbflrLSE/exec')
            const data = await response.json()
            const lastPaid = data.data[data.data.length - 1]
    
            lastPrice = lastPaid["Giá trị"]
            lastContent = lastPaid["Mô tả"]
            
            const splitArray = lastContent.split(" ");
    
            if(lastPrice >= soTien && splitArray[2].includes(noiDungCK)) {
                clearInterval(countdownInterval);
                isPaidSuccess = true
                $('.modal-cart.qr-code').removeClass('open')
                $('.modal-cart.qr-code-success').addClass('open')
                startCountDown2()
                setInterval(() => {
                    sendPayment()
                }, 6000)
            }
            else {
                console.log("Không thành công")
            }
        }
        catch {
            console.error("checkPaid LỖI")
        }
    }
}

// Xử lý đếm ngược thời gian trong Thanh toán QR CODE
function startCountDown() {
    const countdownElement = document.getElementById('checkout-qrcode-countdown');

    let countdownSeconds = 60; // giây

    countdownInterval = setInterval(() => {
        const minutes = Math.floor(countdownSeconds / 60);
        const seconds = countdownSeconds % 60;

        countdownElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        countdownSeconds--;

        // Kiểm tra khi thời gian đạt 0
        if (countdownSeconds < 0) {
            clearInterval(countdownInterval);
            isPaidSuccess = true
            $('.modal-cart.qr-code').removeClass('open')
        }
    }, 1000);
}

function startCountDown2() {
    const countdownElement = document.getElementById('checkout-qrcode-countdown2');

    let countdownSeconds = 4;

    const countdownInterval2 = setInterval(() => {
        const seconds = countdownSeconds % 60;

        countdownElement.textContent = `${seconds}s`;

        countdownSeconds--;

        if (countdownSeconds < 0) {
            clearInterval(countdownInterval2);
            $('.modal-cart.qr-code-success').removeClass('open');
        }
    }, 1000);
}