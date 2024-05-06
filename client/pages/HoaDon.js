$(document).ready(() => {
    // loadBillData()
    handleRenderCustomerOrder()
    filterEndUserOrderStatus()
    searchEndUserOrder()
    renderCustomerOrderDetail()
})

// function loadBillData() {
//     $.ajax({
//         url: 'server/src/controller/HoaDonController.php',
//         method: 'POST',
//         data: { action: 'load' },
//         dataType: 'JSON',
//         success: data => {
//             if (data && data.length > 0) {
//                 let html = ''

//                 data.forEach((item, index) => {
//                     html += `
//                         <tr>
//                             <td>
//                                 <span class="custom-checkbox">
//                                     <input type="checkbox" id="checkbox-${item.ma_hd}" name="chk[]" value="${item.ma_hd}">
//                                     <label for="checkbox-${item.ma_hd}"></label>
//                                 </span>
//                             </td>
//                             <td>${item.ma_km}</td>
//                             <td>${item.dieu_kien}</td>
//                             <td>${item.muc_khuyen_mai}</td>
//                             <td>${item.thoi_gian_bat_dau}</td>
//                             <td>${item.thoi_gian_ket_thuc}</td>
// 							<td><span class="status text-success">&bull;</span> Active</td>
//                             <td>
//                                 <a href="#editbilltion" class="edit" data-toggle="modal" data-id="${item.ma_km}">
//                                     <i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
//                                 </a>
//                                 <a href="#deletebilltion" class="delete" data-toggle="modal" data-id="${item.ma_km}">
//                                     <i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
//                                 </a>
//                                 <a href="#" class="view" title="View" data-toggle="tooltip" data-id="${item.ma_km}">
//                                     <i class="material-icons">&#xE417;</i>
//                                 </a>
//                             </td>
//                         </tr>
//                     `
//                 })

//                 // $('.admin-billtion-list').html(html)
//             }
//         },
//         error: (xhr, status, error) => {
//             console.log(error)
//         }
//     })
// }

function addBill(bill) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/HoaDonController.php',
            method: 'POST',
            data: { action: 'add', bill },
            success: res => resolve(res),
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}

function getOrder(id) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/HoaDonController.php',
            method: 'POST',
            data: { action: 'get', id },
            dataType: 'JSON',
            success: order => resolve(order),
            error: (xhr, status, error) => reject(error)
        })
    })
}

function getCustomerOrder(ma_kh, tinh_trang, search) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/HoaDonController.php',
            method: 'POST',
            data: { action: 'get-customer-order', ma_kh, tinh_trang, search },
            dataType: 'JSON',
            success: orders => resolve(orders),
            error: (xhr, status, error) => reject(error)
        })
    })
}

async function renderCustomerOrder() {
    const loginSession = await getLoginSession()
    const customerId = loginSession.customerId
    const status = $('.order-filter__item.active').find('input').val() || ''
    const search = $('.order-search input').val() || ''
    const orders = await getCustomerOrder(customerId, status, search.toUpperCase())
    let html = `
        <div class="account-order__container">
            <div class="order-filter">
                <a class="order-filter__item ${status === '' ? 'active' : ''}">
                    <span>Tất cả</span>
                    <input type="hidden" value="" >
                </a>
                <a class="order-filter__item ${status === 'Chưa xác nhận' ? 'active' : ''}">
                    <span>Chưa xác nhận</span>
                    <input type="hidden" value="Chưa xác nhận" >
                </a>
                <a class="order-filter__item ${status === 'Đã xác nhận' ? 'active' : ''}">
                    <span>Đã xác nhận</span>
                    <input type="hidden" value="Đã xác nhận" >
                </a>
            </div>
            <div class="order-search">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="search" autocomplete="off" placeholder="Bạn có thể tìm kiếm theo Mã đơn hàng hoặc Tên sản phẩm">
            </div>
        <div class="order-list">
    `

    if (orders && orders.length > 0) {
        for (let order of orders) {
            const status = order.tinh_trang === 'Đã xác nhận' ? 'complete' : 'not-complete'
            html += `
                <div class="order-item">
                    <div>
                        <div class="order-item__box">
                            <div class="order-item__heading">
                                <div class="d-flex align-items-center">
                                    <div class="order-item__id">
                                        MÃ ĐƠN HÀNG:
                                        <span>${order.ma_hd}</span>
                                    </div>
                                    <div class="order-item__date">
                                        NGÀY ĐẶT HÀNG:
                                        <span>${convertDate(order.ngay_tao)}</span>
                                    </div>
                                </div>
                                <div class="order-item__status ${status}">${order.tinh_trang.toUpperCase()}</div>
                            </div>
                            <div class="line"></div>
                            <div class="order-item__product-list" href="#order-detail-modal" data-bs-toggle="modal" data-bs-target="#order-detail-modal">
            `
    
            const orderDetails = await getChiTietHoaDon(order.ma_hd)
            orderDetails.forEach(product => {
                html += `
                    <div class="order-item__product-item">
                        <div class="order-item__product-item-box">
                            <div class="order-item__product">
                                <img src="${product.hinh_anh}">
                                <div class="order-item__product-info">
                                    <div class="order-item__product-name">
                                        <span>${product.ten_sp} ${product.ram}/${product.rom}</span>
                                    </div>
                                    <div>
                                        <div class="order-item__product-color">Màu sắc: ${product.ten_mau}</div>
                                        <div class="order-item__product-quantity">x${product.so_luong}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="order-item__product-price">
                                <span>₫${formatCurrency(product.gia_sp)}</span>
                            </div>
                        </div>
                    </div>
                `
            })
    
            html += `
                </div></div></div>
                <div class="order-item__separate"></div>
                <div class="order-item__total">
                    <div class="order-item__payment">
                        <label>Phương thức thanh toán:</label>
                        <div class="order-item__payment-method">${order.hinh_thuc}</div>
                    </div>
                    <div class="order-item__total-box">
                        <label>Thành tiền:</label>
                        <div class="order-item__total-price">₫${formatCurrency(order.thanh_tien)}</div>
                    </div>
                </div></div>
            `
        }
    } else if (orders && orders.length === 0) {
        html += '<div class="order-empty"><h3>Chưa có đơn hàng</h3><img src="server/src/assets/images/order-empty.png" ></div>'
    }
    
    html += `</div></div>`
    $('.account-profile__right').html(html)
}

function handleRenderCustomerOrder() {
    $('.account-profile__left-item.order').on('click', function() {
        window.history.pushState({}, '', 'index.php?thong-tin-tai-khoan&don-hang')
        $(this).siblings().not($(this)).removeClass('active')
        $(this).addClass('active')
        renderCustomerOrder()
    })
}

function filterEndUserOrderStatus() {
    $(document).on('click', '.order-filter__item', function() {
        $(this).siblings().removeClass('active')
        $(this).addClass('active')
        renderCustomerOrder()
    })
}

function searchEndUserOrder() {
    $(document).on('keyup', '.order-search input', e => {
        if (e.key === 'Enter') {
            renderCustomerOrder()
        }
    })
}
      
function renderCustomerOrderDetail() {
    $(document).on('click', '.order-item__product-list', async function() {
        try {
            const orderId = $(this).parents('.order-item').find('.order-item__id span').text()
            const order = await getOrder(orderId)
            const orderDetails = await getChiTietHoaDon(orderId)
            const address = await getThongTinNhanHang(order.ma_ttnh)
            console.log(order)
            let html = `
                <div class="order-detail_address">
                    <h3>Địa chỉ nhận hàng</h3>
                    <div class="order-detail__address-info">
                        <div class="order-detail__address-info-item">
                            <label>Người nhận:</label>
                            <span>${address.ho_ten}</span>
                        </div>
                        <div class="order-detail__address-info-item">
                            <label>Số điện thoại:</label>
                            <span>${address.so_dien_thoai}</span>
                        </div>
                        <div class="order-detail__address-info-item">
                            <label>Ngày đặt hàng:</label>
                            <span>${convertDate(order.ngay_tao)}</span>
                        </div>
                        <div class="order-detail__address-info-item">
                            <label>Địa chỉ:</label>
                            <span>${address.dia_chi}</span>
                        </div>
                    </div>
                </div>
                <div class="order-detail__products">
                    <h3>Sản phẩm</h3>
                    <div class="order-detail__product-list">
            `

            orderDetails.forEach((orderDetail, index) => {
                html += `
                    <a href="index.php?san-pham&id=${orderDetail.ma_sp}" class="order-detail__product-item">
                        <div class="order-detail__product-info">
                            <img src="${orderDetail.hinh_anh}" class="order-detail__product-img">
                            <div class="order-detail__product-info-detail">
                                <div class="order-detail__product-name">
                                    <span>${orderDetail.ten_sp} ${orderDetail.ram}/${orderDetail.rom}</span>
                                </div>
                                <div>
                                    <div class="order-detail__product-color">Màu sắc: ${orderDetail.ten_mau}</div>
                                    <div class="order-detail__product-quantity">x${orderDetail.so_luong}</div>
                                </div>
                            </div>
                        </div>
                        <div class="order-detail__product-price">
                            <span>₫${formatCurrency(orderDetail.gia_sp)}</span>
                        </div>
                    </a>
                `
                index !== orderDetails.length - 1 ? html += '<div class="line"></div>' : ''
            })

            html += '</div></div>'

            $('#order-detail-modal .modal-title').html(`Chi tiết đơn hàng <b>${order.ma_hd}</b>`)
            $('#order-detail-modal .modal-body').html(html)
            $('#order-detail-modal .modal-footer').html(`
                <div class="order-detail__total">
                    <div class="order-detail__total-row">
                        <div class="order-detail__total-label">
                            <span>Tổng tiền sản phẩm</span>
                        </div>
                        <div class="order-detail__total-price">
                            <span>₫${formatCurrency(order.tong_tien)}</span>
                        </div>
                    </div>
                    <div class="order-detail__total-row">
                        <div class="order-detail__total-label">
                            <span>Giảm giá khuyến mãi</span>
                        </div>
                        <div class="order-detail__total-price">
                            <span>${order.khuyen_mai > 0 ? `-₫${order.khuyen_mai}` : '₫0'}</span>
                        </div>
                    </div>
                    <div class="order-detail__total-row final">
                        <div class="order-detail__total-label">
                            <span>Thành tiền</span>
                        </div>
                        <div class="order-detail__total-price">
                            <span>₫${formatCurrency(order.thanh_tien)}</span>
                        </div>
                    </div>
                    <div class="order-detail__payment">
                        <div class="order-detail__total-label">
                            <span>Phương thức thanh toán</span>
                        </div>
                        <div class="order-detail__total-price">
                            <span>${order.hinh_thuc}</span>
                        </div>
                    </div>
                </div>
            `)
        } catch (error) {
            console.log(error)
            alert('Có lỗi xảy ra, vui lòng thử lại sau!')
        }
    })
}