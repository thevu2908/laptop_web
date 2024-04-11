$(document).ready(() => {
    maKH = getMaKH()
    loadCart(maKH)
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

                carts.forEach((cart) => {
                    getFullInfoProduct(cart.ma_ctsp)
                        .then(product => {
                            html += `
                                <li class="cart__item">
                                    <img src="${product.hinh_anh}" alt="Hình ảnh">
                                    <div class="cart__item-info">
                                        <div class="cart__item-name text-start">${product.ten_sp} ${product.ram}/${product.rom}</div>
                                        <div class="cart__item-total">
                                            <div class="cart__item-price">₫${formatCurrency(cart.gia_sp)}</div>
                                            <div class="cart__item-quantity">x ${cart.so_luong}</div>
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

                            $('.cart__list-product').html(html)
                            $('.cart__left-product').html(html2)
                        })
                        .catch(error => console.log(error))
                })
            }
        },
        error: (xhr, status, error) => {
            console.log(error)
        }
    })
}

function getMaKH() {
    return 'KH001'
}

function addCart(cart) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/GioHangController.php',
            method: 'POST',
            data: { action: 'add', cart },
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

function handleAddCart() {
    $(document).on('click', '.btn-add-cart', e => {
        e.preventDefault();
        
        ctspId = e.target.closest('.btn-add-cart').dataset.id;
        
        const cart = {
            productDetailId: ctspId,
            image: $('.produt-info-left .product-image').attr('src'),
            productName: $('.product-info-right .product-name').text().trim(),
            customerId: 'KH001',
            price: $('.product-info-right .product-price').contents().first().text().trim(),
            quantity: $('.product-info-right .product-bought-quantity').val().trim(),
        }

        // if(!validateCart(cart)) {
        //     return
        // }

        addCart(cart)
            .then(res => {
                if (res) {
                    alert('Đã thêm sản phẩm vào giỏ hàng')
                    loadCart()
                } 
                else {
                    alert('Xảy ra lỗi trong quá trình thêm khuyến mãi')
                }
            })
            .catch(error => console.log(error))
    })
}