$(document).ready(() => {
    const urlParams = new URLSearchParams(window.location.search)
    if (window.location.pathname === '/admin.php' && urlParams.get('controller') === 'hoadon') {
        loadBillData()
        clickPage(loadBillData)
    }
    handleRenderCustomerOrder()
    filterEndUserOrderStatus()
    searchEndUserOrder()
    renderCustomerOrderDetail()
})

let search = ""

function getPaginationBill(search) {
    return new Promise((resolve, reject) => {
        const page = $('#currentpage').val()
        $.ajax({
            url: 'server/src/controller/PaginationController.php',
            method: 'GET',
            data: { action: 'pagination', table: 'hoadon', page, id: search },
            dataType: 'JSON',
            success: review => resolve(review),
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}

$(document).on("change","#admin-select-hoadon", async function(){ 
    search = $("#admin-select-hoadon").val()
    loadBillData()
    clickPage(loadBillData)
})

async function loadBillData() {
    try {
        const dataBill = await getPaginationBill(search)

        if (dataBill && dataBill.pagination && dataBill.pagination.length > 0) {
            let html = ''
            for (const item of dataBill.pagination) {
                let khachhang = await getCustomer(item.ma_kh);
                let nhanvien = await getEmployee(item.ma_nv);
                html += `
                    <tr>
                        <td>${item.ma_hd}</td>
                        <td>${khachhang.ten_kh}</td>
                        <td>${nhanvien === null ? "" : nhanvien.ten_nv}</td>
                        <td>${convertDate(item.ngay_tao)}</td>
                        <td>${formatCurrency(item.tong_tien)}</td>
                        <td>${item.khuyen_mai}</td>
                        <td>${formatCurrency(item.thanh_tien)}</td>
                        <td>${item.hinh_thuc}</td>
                        <td>${item.tinh_trang}</td>
                        <td>
                            <a href="/admin.php?controller=chitiethoadon&id=${item.ma_hd}" class="info btn-product-detail" dataBill-id=${item.ma_hd}>
                                <i class="fa-solid fa-circle-info" title="Chi tiết hóa đơn" ></i>
                            </a>
                        </td>
                    </tr>
                `;
            }

            $('.admin-bill-list').html(html);
            totalPage(dataBill.count)
            displayTotalPage("#admin-bill-main .hint-text", dataBill.count, dataBill.pagination.length)
        }

    } catch (error) {
        console.log(error);
    }
}

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

function getCustomerOrder(ma_kh, tinh_trang, search, page) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/HoaDonController.php',
            method: 'GET',
            data: { action: 'get-customer-order', ma_kh, tinh_trang, search, page, limit: 5 },
            dataType: 'JSON',
            success: orders => resolve(orders),
            error: (xhr, status, error) => reject(error)
        })
    })
}

async function renderCustomerOrder() {
    const page = $('#currentpage').val()
    const loginSession = await getLoginSession()
    const customerId = loginSession.customerId
    const status = $('.order-filter__item.active').find('input').val() || ''
    const search = $('.order-search input').val() || ''
    const orders = await getCustomerOrder(customerId, status, search.toUpperCase(), page)
    let orderList = ''

    if (orders && orders.data && orders.data.length > 0) {
        for (let order of orders.data) {
            const orderStatus = order.tinh_trang === 'Đã xác nhận' ? 'complete' : 'not-complete'
            const orderDetails = await getChiTietHoaDon(order.ma_hd)
            orderList += `
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
                                <div class="order-item__status ${orderStatus}">${order.tinh_trang.toUpperCase()}</div>
                            </div>
                            <div class="line"></div>
                            <div class="order-item__product-list" href="#order-detail-modal" data-bs-toggle="modal" data-bs-target="#order-detail-modal">
                                ${orderDetails.map(product => `
                                    <div class="order-item__product-item">
                                        <div class="order-item__product-item-box">
                                            <div class="order-item__product">
                                                <img src="${product.hinh_anh}">
                                                <div class="order-item__product-info">
                                                    <div class="order-item__product-name">
                                                        <span>
                                                            ${product.ten_sp}
                                                            ${product.ten_chip.replaceAll(' ', '-')}
                                                            ${product.ten_card.replaceAll(' ', '-')}
                                                            ${product.ram}/${product.rom}
                                                        </span>
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
                                `).join('')}
                            </div>
                        </div>
                    </div>
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
                    </div>
                </div>
            `
        }
    } else {
        orderList = '<div class="order-empty"><h3>Chưa có đơn hàng</h3><img src="server/src/assets/images/order-empty.png"></div>'
    }

    $('.account-profile__right').html(`
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
                <input type="search" autocomplete="off" placeholder="Bạn có thể tìm kiếm theo Mã đơn hàng hoặc Tên sản phẩm" value="${search}">
            </div>
            <div class="order-list">
                ${orderList}
            </div>
        </div>
    `)
    enduserTotalPage(orders.length, 5, page)
}

function handleRenderCustomerOrder() {
    $('.account-profile__left-item.order').on('click', function() {
        window.history.pushState({}, '', 'index.php?thong-tin-tai-khoan&don-hang')
        $(this).siblings().not($(this)).removeClass('active')
        $(this).addClass('active')
        renderCustomerOrder()
        clickPage(renderCustomerOrder)
    })
}

function filterEndUserOrderStatus() {
    $(document).on('click', '.order-filter__item', function() {
        $(this).siblings().removeClass('active')
        $(this).addClass('active')
        $("#currentpage").val(1)
        renderCustomerOrder()
    })
}

function searchEndUserOrder() {
    $(document).on('keyup', '.order-search input', e => {
        if (e.key === 'Enter') {
            $("#currentpage").val(1)
            renderCustomerOrder(e.target.value)
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
                        ${order.ghi_chu ? `
                            <div class="order-detail__address-info-item">
                                <label>Ghi chú:</label>
                                <span>${order.ghi_chu}</span>
                            </div>
                        ` : ''}
                    </div>
                </div>
                <div class="order-detail__products">
                    <h3>Sản phẩm</h3>
                    <div class="order-detail__product-list">
            `

            orderDetails.forEach((orderDetail, index) => {
                console.log(orderDetail)
                html += `
                    <a href="index.php?san-pham&id=${orderDetail.ma_sp}" class="order-detail__product-item">
                        <div class="order-detail__product-info">
                            <img src="${orderDetail.hinh_anh}" class="order-detail__product-img">
                            <div class="order-detail__product-info-detail">
                                <div class="order-detail__product-name">
                                    <span>
                                        ${orderDetail.ten_sp}
                                        ${orderDetail.ten_chip.replaceAll(' ', '-')}
                                        ${orderDetail.ten_card.replaceAll(' ', '-')}
                                        ${orderDetail.ram}/${orderDetail.rom}
                                    </span>
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
