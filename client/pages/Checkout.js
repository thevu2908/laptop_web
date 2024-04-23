$(document).ready(() => {
    loadCartToCheckout()
    loadPromoToCheckout()
})

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
                                <li class="d-flex" >
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
        let promises = khuyenMai[maKH].map(maKM => {
            return getPromotion(maKM)
                .then(res => {
                    return `
                        <li class="modal-promo-item p-2" >
                            <div class="modal-promo-name d-flex align-items-center" >
                                <div class="modal-promo-code">${res.ma_km}</div>
                                <div class="modal-promo-name2 ms-2" style="font-weight: 500;">${res.ten_khuyen_mai}</div>
                            </div>
                            <div class="modal-promo-percent" >
                                Giảm ${formatCurrency(convertMucKM(res.muc_khuyen_mai))}₫
                            </div>
                            <div class="modal-promo-bottom d-flex justify-content-between">
                                <div class="modal-promo-expiry" >HSD: ${convertDate(res.thoi_gian_ket_thuc)}</div>
                            </div>
                        </li>
                    `;
                });
        });
    
        Promise.all(promises).then(results => {
            $('.checkout__right-promo').html(results.join(''));
        }).catch(error => console.log(error));

    }
}