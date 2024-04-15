$(document).ready(() => {
    maKH = getMaKH()
    loadCart(maKH)
    loadCartNumber(maKH)
    handleAddCart()
})

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

function loadCartNumber(maKH) {
    $.ajax({
        url: 'server/src/controller/GioHangController.php',
        method: 'POST',
        data: { action: 'get-size' , maKH},
        dataType: "JSON",
        success: size => {
            $('.cart__footer-text').text(`Tổng tiền (${size}) sản phẩm: `)
            $('.cart-number').text(size)
        },
        error: (xhr, status, error) => {
            console.log(error)
        }
    })
}

function loadCart(maKH) {
    $.ajax({
        url: 'server/src/controller/GioHangController.php',
        method: 'POST',
        data: { action: 'get-all' , maKH},
        dataType: 'JSON',
        success: carts => {
            if (carts && carts.length > 0) {
                let html = ''
                let html2 = ''
                let tongTien = 0

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
                                    <div class="cart__left-quantity p-2" style="display: flex;">
                                        <input class="minus is-form" type="button" style="border-right: transparent !important;" value="-">
                                        <input class="input-qty" type="text" value="${cart.so_luong}" min="1" max="10" id="quantity" value="1">
                                        <input class="plus is-form" type="button" style="border-left: transparent !important;" value="+">
                                    </div>
                                    <div class="cart__left-product-total p-2">₫${formatCurrency(cart.gia_sp * cart.so_luong)}</div>
                                </li>
                            `

                            tongTien += cart.gia_sp * cart.so_luong
                            
                            $('.cart__footer-money').text("₫" + formatCurrency(tongTien))
                            $('.cart__list-product').html(html)
                            $('.cart__left-product').html(html2)
                        })
                        .catch(error => console.log(error))
                })
            }
        },
        error: (xhr, status, error) => console.log(error)
    })
}

function getMaKH() {
    return 'KH001'
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
    $(document).on('click', '.btn-add-cart', async e => {
        e.preventDefault();
        
        const productId = e.target.closest('.btn-add-cart').dataset.id;
        const ram = $('span.product-detail-info.ram').contents().filter(function() {
            return this.nodeType === 3
        }).text().trim()
        const rom = $('span.product-detail-info.rom').contents().filter(function() {
            return this.nodeType === 3
        }).text().replace('SSD', '').trim()
        const color = $('.product-color-item.active').data('id')
        
        try {
            const ctspId = await getProductDetailId(productId, color, ram, rom)
            const cart = {
                productDetailId: ctspId,
                customerId: 'KH001',
                price: $('.product-info-right .product-price').contents().first().text().trim().replace(/[₫.]/g, ""),
                quantity: $('.product-info-right .product-bought-quantity').val().trim(),
            }
            
            const getCartRes = await getCart(cart.productDetailId, cart.customerId)
            const objectData = JSON.parse(getCartRes)

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
            } else {
                const addRes = await addCart(cart)
                if (addRes === 'success') {
                    alert('Đã thêm sản phẩm vào giỏ hàng')
                    loadCartNumber(cart.customerId)
                    loadCart(cart.customerId)
                } else {
                    alert('Xảy ra lỗi trong quá trình thêm sản phẩm vào giỏ hàng')
                }
            }
        } catch (error) {
            console.log(error)
        }
        
        // getCart(cart.productDetailId, cart.customerId)
        //     .then(res => {
        //         const objectData = JSON.parse(res);
        //         if (objectData != null) {
        //             cart.quantity = parseInt(objectData.so_luong) + parseInt(cart.quantity)
        //             updateCart(cart)
        //                 .then(res => {
        //                     if (res == 'success') {
        //                         alert('Đã thêm sản phẩm vào giỏ hàng')
        //                         loadCartNumber(cart.customerId)
        //                         loadCart(cart.customerId)
        //                     } 
        //                     else {
        //                         alert('Xảy ra lỗi trong quá trình thêm sản phẩm vào giỏ hàng')
        //                     }
        //                 })
        //                 .catch(error => console.log(error))
        //         } else {
        //             addCart(cart)
        //                 .then(res => {
        //                     if (res == 'success') {
        //                         alert('Đã thêm sản phẩm vào giỏ hàng')
        //                         loadCartNumber(cart.customerId)
        //                         loadCart(cart.customerId)
        //                     } 
        //                     else {
        //                         alert('Xảy ra lỗi trong quá trình thêm sản phẩm vào giỏ hàng')
        //                     }
        //                 })
        //                 .catch(error => console.log(error))
        //         }
        //     })
        //     .catch(error => console.log(error))
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