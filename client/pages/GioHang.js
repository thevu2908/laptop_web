$(document).ready(() => {
    loadCart()
    loadCartNumber()
    handleAddCart()
    updateQuantity()
    handleDeleteCart()
})

async function getMaKH() {
    const loginSession = await getLoginSession()
    return loginSession ? loginSession.customerId : ''
}

function getFullInfoProduct(maCTSP) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/GioHangController.php',
            method: 'POST',
            data: { action: 'get-product', maCTSP },
            dataType: 'JSON',
            success: product => resolve(product),
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}

async function loadCartNumber() {
    const maKH = await getMaKH()
    $.ajax({
        url: 'server/src/controller/GioHangController.php',
        method: 'POST',
        data: { action: 'get-size' , maKH },
        dataType: "JSON",
        success: size => {
            if(size == -1)
                size = 0

            $('.cart__footer-text').text(`Tổng tiền (${size}) sản phẩm: `)
            $('.cart-number').text(size)
        },
        error: (xhr, status, error) => {
            console.log(error)
        }
    })
}

async function loadCart() {
    const maKH = await getMaKH()
    $.ajax({
        url: 'server/src/controller/GioHangController.php',
        method: 'POST',
        data: { action: 'get-all' , maKH },
        dataType: 'JSON',
        success: carts => {
            if (carts) {
                let html = ''
                let html2 = ''
                let tongTien = 0
                if(carts.length > 0) {

                    carts.forEach((cart) => {
                        getFullInfoProduct(cart.ma_ctsp)
                            .then(product => {
                                html += `
                                    <li class="cart__item">
                                        <img src="${product.hinh_anh}" alt="Hình ảnh">
                                        <div class="cart__item-info">
                                            <div class="cart__item-name text-start">${product.ten_sp} ${product.ram}/${product.rom}</div>
                                            <div class="cart__item-total w-100 justify-content-start">
                                                <div class="cart__item-price">₫${formatCurrency(cart.gia_sp)}</div>
                                                <div class="cart__item-quantity" style="margin-left: 10px;">x ${cart.so_luong}</div>
                                            </div>
                                        </div>
                                    </li>
                                `

                                html2 += `
                                    <li class="d-flex justify-content-between w-100 align-items-center">
                                        <div class="cart__left-product-name d-flex p-2">
                                            <img src="${product.hinh_anh}" alt="">
                                            <span>${product.ten_sp} ${product.ram}/${product.rom}</span>
                                        </div>
                                        <div class="cart__left-product-price p-2">₫${formatCurrency(cart.gia_sp)}</div>
                                        <div class="cart__left-gather" >
                                            <div class="cart__left-quantity p-2" style="display: flex;">
                                                <input data-id="${cart.ma_ctsp}" class="minus is-form" type="button" style="border-right: transparent !important;" value="-">
                                                <input data-id="${cart.ma_ctsp}" class="input-qty" type="text" value="${cart.so_luong}" min="1" max="${product.so_luong}" id="quantity" value="1">
                                                <input data-id="${cart.ma_ctsp}" class="plus is-form" type="button" style="border-left: transparent !important;" value="+">
                                            </div>
                                            <button class="p-0 btn btn-remove-cart" data-id="${cart.ma_ctsp}">Xóa</button>
                                        </div>
                                        
                                        <div class="cart__left-product-total p-2">₫${formatCurrency(cart.gia_sp * cart.so_luong)}</div>
                                    </li>
                                `

                                tongTien += cart.gia_sp * cart.so_luong
                                
                                $('.cart__footer-money').text("₫" + formatCurrency(tongTien))
                                $('.cart__right-total-temp').text("₫" + formatCurrency(tongTien))
                                $('.checkout-confirm__tmp-total').text("₫" + formatCurrency(tongTien))
                                $('.cart__right-total').text("₫" + formatCurrency(tongTien))
                                $('.checkout-confirm__money-total').text("₫" + formatCurrency(tongTien))
                                $('.cart__list-product').html(html)
                                $('.cart__left-product').html(html2)

                                updateQuantity()
                                loadPromotionData()
                            })
                            .catch(error => console.log(error))
                    })
                }
                else {
                    html += '<div class="cart-empty"><img src="server/src/assets/images/empty-cart.png" ></div>'
                    // $('.cart__footer-total .cart__footer-text').text("Chưa có sản phẩm trong giỏ hàng")
                    // $('.cart__footer-total .cart__footer-tocart').text("Tiếp tục mua hàng")
                    $('.cart__list-product').html(html)
                    $('.cart__footer-tocart').css('pointer-events', 'none');
                    $('.cart-number').css('border', 'none')
                    $('.cart-number').css('background-color', 'transparent')

                }
            }
        },
        error: (xhr, status, error) => console.log(error)
    })
}

function getCart(productDetailId, customerId) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/GioHangController.php',
            method: 'POST',
            data: { action: 'get', productDetailId, customerId },
            success: res => resolve(res),
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}

function addCart(cart) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/GioHangController.php',
            method: 'POST',
            data: { action: 'add', cart },
            success: res => resolve(res),
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}

function handleAddCart() {
    $(document).off('click', '.btn-add-cart').on('click', '.btn-add-cart', async e => {
        e.preventDefault();
    
        try {
            const loginSession = await getLoginSession()
            if (!loginSession) {
                alert('Vui lòng đăng nhập để tiếp tục')
                window.location.href = 'index.php?dang-nhap'
                return
            }

            const productId = e.target.closest('.btn-add-cart').dataset.id;
            const ram = $('span.product-detail-info.ram').contents().filter(function() { return this.nodeType === 3 }).text().trim()
            const rom = $('span.product-detail-info.rom').contents().filter(function() { return this.nodeType === 3 }).text().replace('SSD', '').trim()
            const color = $('.product-color-item.active').data('id')
            const productDetailId = await getProductDetailId(productId, color, ram, rom)
            const cart = {
                productDetailId,
                customerId: loginSession.customerId,
                price: $('.product-info-right .product-price').contents().first().text().trim().replace(/[₫.]/g, ""),
                quantity: $('.product-info-right .product-bought-quantity').val().trim(),
            }
            const getCartRes = await getCart(cart.productDetailId, cart.customerId)
            const objectData = JSON.parse(getCartRes)
            console.log(objectData)

            if (objectData != null) {
                cart.quantity = parseInt(objectData.so_luong) + parseInt(cart.quantity)
                const updateRes = await updateCart(cart)
                if (updateRes === 'success') {
                    alert('Đã thêm sản phẩm vào giỏ hàng')
                    loadCartNumber(cart.customerId)
                    loadCart(cart.customerId)
                } else {
                    alert('Xảy ra lỗi trong quá trình thêm sản phẩm vào giỏ hàng')
                }
            } 
            else {
                const addRes = await addCart(cart)
                console.log(addRes)
                if (addRes === 'success') {
                    alert('Đã thêm sản phẩm vào giỏ hàng')
                    loadCartNumber(cart.customerId)
                    loadCart(cart.customerId)
                } else {
                    alert('Xảy ra lỗi trong quá trình thêm sản phẩm vào giỏ hàng')
                    console.log('Xảy ra lỗi trong quá trình thêm sản phẩm vào giỏ hàng')
                }
            }
        } catch (error) {
            console.log(error)
            alert('Xảy ra lỗi trong quá trình thêm sản phẩm vào giỏ hàng')
        }
    })
}

function updateCart(cart) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/GioHangController.php',
            method: 'POST',
            data: { action: 'update', cart },
            success: res => {
                resolve(res)
            },
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}

async function updateQuantity() {
    $('input.input-qty').each(function () {
        var $this = $(this),
            qty = $this.parent().find(".is-form"),
            min = Number($this.attr('min')),
            max = Number($this.attr('max'));

        $(qty).on('click', async function () {
            var d = Number($this.val());
            if ($(this).hasClass('minus')) {
                if (d > min) d += -1;
            } else if ($(this).hasClass('plus')) {
                var x = Number($this.val()) + 1;
                if (x <= max) d += 1;
            }
            $this.attr('value', d).val(d);

            updatePriceAndTotal($(this), d)
        });

        $(this).on('change', async function() {
            var d = Number($this.val());
            if (d < min) {
                d = min;
            } else if (d > max) {
                d = max;
            }
            $(this).attr('value', d).val(d);

            updatePriceAndTotal($(this), d)
        });
    });
}

async function updatePriceAndTotal(thisAttr, d) {
    let ma_ctsp = thisAttr.attr('data-id')
    let loginSession = await getLoginSession()
    if (!loginSession) {
        alert('Vui lòng đăng nhập để tiếp tục')
        window.location.href = 'index.php?dang-nhap'
        return
    }

    let cartStr = await getCart(ma_ctsp, loginSession.customerId)
    let objectCart = JSON.parse(cartStr)
    objectCart.so_luong = d
    
    let cart = {
        productDetailId: objectCart.ma_ctsp,
        customerId: objectCart.ma_kh,
        price: $('.cart__left-product .cart__left-product-price').contents().first().text().trim().replace(/[₫.]/g, ""),
        quantity: objectCart.so_luong,
    }

    let updateRes = await updateCart(cart)
    if (updateRes === 'success') {
        loadCartNumber(cart.customerId)
        loadCart(cart.customerId)
    } else {
        alert('Xảy ra lỗi')
    }
}

function checkSoLuongTonCTSP() {

}

function deleteCart(maCTSP, maKH) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/GioHangController.php',
            method: 'POST',
            data: { action: 'delete', maCTSP, maKH },
            success: res => {
                resolve(res)
            },
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}

function deleteCartAll(maKH) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/GioHangController.php',
            method: 'POST',
            data: { action: 'delete-all', maKH },
            success: res => {
                resolve(res)
            },
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}

function handleDeleteCart() {
    $(document).off('click', '.btn-remove-cart').on('click', '.btn-remove-cart', async e => { 
        const ma_ctsp = e.target.getAttribute('data-id');
        const ma_kh = await getMaKH()
        
        const res = await deleteCart(ma_ctsp, ma_kh)
        if(res === 'success') {
            await loadCart()
        }
        else {
            console.log("Xóa sản phẩm không thành công")
        }
    })

    $(document).off('click', '.btn-delete-all-cart').on('click', '.btn-delete-all-cart', async e => { 
        const ma_kh = await getMaKH()

        const confirmDelete = confirm("Bạn có chắc muốn xóa tất cả sản phẩm trong giỏ không?")
        if(confirmDelete) {
            const res = await deleteCartAll(ma_kh)
            if(res === 'success') {
                await loadCart()
            }
            else {
                console.log("Xóa sản phẩm không thành công")
            }
        }
    })
}