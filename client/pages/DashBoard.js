$(document).ready(() => {
    const date = getStartAndEndOfMonth()
    $('#start-date').val(date.start)
    $('#end-date').val(date.end)

    renderFilterProductBrand()
    renderStatistic()
    renderRecentOrder()
    clickPage(renderRecentOrder)
    renderRecentOrderDetail()
    renderBestSeller(5)
    handleRenderBestSellerQuantity()
    handleFilterBrandStatistic()
    handleFilterDateStatistic()
    createRevenueBarChart()
    createOrderLineChart()
    handleFilterChart()
})

function getOrderInDate(brandId, startDate, endDate) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/HoaDonController.php',
            method: 'POST',
            data: { action: 'get-in-date', brandId, startDate, endDate },
            dataType: 'JSON',
            success: orders => resolve(orders),
            error: error => reject(error)
        })
    })
}

function getPaginationOrderInDate(brandId, page, startDate, endDate) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/HoaDonController.php',
            method: 'POST',
            data: { action: 'pagination-order-in-date', brandId, page, startDate, endDate, limit: 8 },
            dataType: 'JSON',
            success: orders => resolve(orders),
            error: error => reject(error)
        })
    })
}

function getOrderByMonth(month, brandId) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/HoaDonController.php',
            method: 'POST',
            data: { action: 'get-by-month', month, brandId },
            dataType: 'JSON',
            success: orders => resolve(orders),
            error: error => reject(error)
        })
    })
}

function getImportInvoiceByMonth(month, brandId) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/PhieuNhap1Controller.php',
            method: 'POST',
            data: { action: 'get-import-month', month, brandId },
            dataType: 'JSON',
            success: invoices => resolve(invoices),
            error: error => reject(error)
        })
    })
}

function getCustomerLength() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/KhachHangController.php',
            method: 'POST',
            data: { action: 'get-length' },
            dataType: 'JSON',
            success: length => resolve(length),
            error: error => reject(error)
        })
    })
}

function getProductTotalQuantity(orderId) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/CTHDController.php',
            method: 'POST',
            data: { action: 'get-total-quantity', orderId },
            dataType: 'JSON',
            success: total => resolve(Number(total)),
            error: error => reject(error)
        })
    })
}

function getBestSeller(amount, brandId, startDate, endDate) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/HoaDonController.php',
            method: 'POST',
            data: { action: 'get-best-seller', amount, brandId, startDate, endDate },
            dataType: 'JSON',
            success: products => resolve(products),
            error: error => reject(error)
        })
    })
}

async function renderFilterProductBrand() {
    try {
        const brands = await getBrandData()
        $('.admin-dashboard .brand-filter__list').html(`
            <option value="">Tất cả</option>
            ${brands.map(brand => `<option value="${brand.ma_thuong_hieu}">${brand.ten_thuong_hieu}</option>`).join('')}
        `)
    } catch (error) {
        console.log(error)
        alert('Xảy ra lối khi lấy dữ liệu lọc theo thương hiệu')
    }
}

async function renderStatistic() {
    try {
        const brandId = $('.admin-dashboard .brand-filter__list').val()
        const startDate = $('#start-date').val()
        const endDate = $('#end-date').val()
        const orders = await getOrderInDate(brandId, startDate, endDate)
        const customerLength = await getCustomerLength()
        let total = 0
        if (orders.orders.length > 0) {
            for (let order of orders.orders) {
                total += await getProductTotalQuantity(order.ma_hd)
            }
        }
        $('.order-statistics__quantity').text(orders.orders.length)
        $('.revenue-statistic__number').text(`₫${formatCurrency(orders.revenue)}`)
        $('.customer-statistic__number').text(customerLength)
        $('.product-statistic__number').text(total)
    } catch (error) {
        console.log(error)
        alert('Có lỗi xảy ra khi lấy dữ liệu thống kê, vui lòng thử lại sau')
    }
}

async function renderRecentOrder() {
    try {
        const brandId = $('.admin-dashboard .brand-filter__list').val()
        const page = $('#currentpage').val()
        const startDate = $('#start-date').val()
        const endDate = $('#end-date').val()
        const orders = await getPaginationOrderInDate(brandId, page, startDate, endDate)

        if (orders && orders.data && orders.data.length > 0) {
            $('.recent-order__list').html(`
                ${orders.data.map(order => `
                    <tr data-target="#order-detail-modal" data-toggle="modal" data-id="${order.ma_hd}" class="recent-order__item">
                        <td>${order.ma_hd}</td>
                        <td>${convertDate(order.ngay_tao)}</td>
                        <td>₫${formatCurrency(order.tong_tien)}</td>
                        <td>₫${formatCurrency(order.khuyen_mai)}</td>
                        <td>₫${formatCurrency(order.thanh_tien)}</td>
                    </tr>
                `
                ).join('')}
            `)
            totalPage(orders.length, 8)
        } else {
            $('.recent-order__list').html('')
        }
    } catch (error) {
        console.log(error)
        alert('Có lỗi xảy ra khi lấy dữ liệu hóa đơn gần đây, vui lòng thử lại sau')
    }
}

function renderRecentOrderDetail() {
    $(document).on('click', '.recent-order__item', async function() {
        try {
            const orderId = $(this).data('id')
            const order = await getOrder(orderId)
            const orderDetails = await getChiTietHoaDon(orderId)
            const address = await getThongTinNhanHang(order.ma_ttnh)

            if (order && orderDetails && orderDetails.length > 0) {
                $('.admin-dashboard #order-detail-modal .modal-content').html(`
                    <div class="modal-header">
                        <h5 class="modal-title order-detail__id">Chi tiết hóa đơn <b>${order.ma_hd}</b></h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
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
                                ${orderDetails.map((detail, index) => `
                                    <div class="order-detail__product-item">
                                        <div class="order-detail__product-info">
                                            <img src="${detail.hinh_anh}" class="order-detail__product-img">
                                            <div class="order-detail__product-info-detail">
                                                <div class="order-detail__product-name">
                                                    <span>
                                                        ${detail.ten_sp}
                                                        ${detail.ten_chip.replaceAll(' ', '-')}
                                                        ${detail.ten_card.replaceAll(' ', '-')}
                                                        ${detail.ram}/${detail.rom}
                                                    </span>
                                                </div>
                                                <div>
                                                    <div class="order-detail__product-color">Màu sắc: ${detail.ten_mau}</div>
                                                    <div class="order-detail__product-quantity">x${detail.so_luong}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="order-detail__product-price">
                                            <span>₫${formatCurrency(detail.gia_sp)}</span>
                                        </div>
                                    </div>
                                    ${index !== orderDetails.length - 1 ? '<div class="line"></div>' : ''}
                                `).join('')}
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
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
                                    <span><b>₫${formatCurrency(order.thanh_tien)}</b></span>
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
                    </div>
                `)
            }
        } catch (error) {
            console.log(error)
            alert('Có lỗi xảy ra khi lấy dữ liệu chi tiết hóa đơn, vui lòng thử lại sau')
        }
    })
}

async function renderBestSeller(initAmount) {
    try {
        const amount = initAmount || 5
        const brandId = $('.admin-dashboard .brand-filter__list').val()
        const startDate = $('#start-date').val()
        const endDate = $('#end-date').val()
        const products = await getBestSeller(amount, brandId, startDate, endDate)
        const productList = $('.product-list')
        productList.empty()

        products.forEach(product => {
            const productItem = $(`
                <li class="product-item">
                    <div class="product-img">
                        <img src="${product.hinh_anh}">
                    </div>
                    <div class="d-flex align-items-center justify-content-between flex-grow-1">
                        <div class="d-flex flex-column">
                            <span class="body-title-2 product-name">
                                ${product.ten_sp}
                                ${product.ten_mau}
                                ${product.ten_chip.replaceAll(' ', '-')}
                                ${product.ten_card.replaceAll(' ', '-')}
                                ${product.ram}/${product.rom}
                            </span>
                            <span class="product-sell-quantity text-tiny mt-1">${product.total} sản phẩm</span>
                        </div>
                        <div>
                            <span class="body-title-2 product-price">₫${formatCurrency(product.gia_tien)}</span>
                        </div>
                    </div>
                </li>
            `)
            productList.append(productItem)
        })
        $('.view-product-quantity').val(products.length)
    } catch (error) {
        console.log(error)
        alert('Có lỗi xảy ra khi lấy dữ liệu sản phẩm bán chạy, vui lòng thử lại sau')
    }
}

function handleRenderBestSellerQuantity() {
    $('.view-product-quantity').on('change', function() {
        const amount = $(this).val()
        if (amount <= 0) {
            alert('Vui lòng nhập số dương')
            return
        }
        renderBestSeller(amount)
    })
}

function handleFilterBrandStatistic() {
    $('.admin-dashboard .brand-filter__list').on('change', function() {
        renderBestSeller()
        renderRecentOrder()
        renderStatistic()
    })
}

function handleFilterDateStatistic() {
    $('.admin-dashboard .btn-filter__date').on('click', function() {
        const startDate = $('#start-date').val()
        const endDate = $('#end-date').val()
        if (!startDate) {
            alert('Vui lòng chọn ngày bắt đầu')
            $('#start-date').focus()
            return
        }
        if (!endDate) {
            alert('Vui lòng chọn ngày kết thúc')
            $('#end-date').focus()
            return
        }
        renderBestSeller()
        renderRecentOrder()
        renderStatistic()
    })
}

let revenueChart
async function createRevenueBarChart() {
    try {
        if (revenueChart) {
            revenueChart.destroy()
        }

        const ctx = document.querySelector('#revenue-chart').getContext('2d')
        const brandId = $('#brand-filter__revenue-chart').val()
        let revenueData = []
        let importData = []

        for (let i = 1; i <= 12; i++) {
            const orders = await getOrderByMonth(i, brandId)
            const importInvoices = await getImportInvoiceByMonth(i, brandId)
            revenueData.push(orders.revenue / 1000000)
            importData.push(importInvoices.total / 1000000)
        }

        revenueChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
                datasets: [
                    {
                        label: 'Nhập hàng (triệu đồng)',
                        data: importData,
                        borderWidth: 1,
                        borderColor: '#FFB1C1',
                        backgroundColor: '#FFB1C1'
                    },
                    {
                        label: 'Doanh thu (triệu đồng)',
                        data: revenueData,
                        borderWidth: 1,
                        borderColor: '#9AD0F5',
                        backgroundColor: '#9AD0F5'
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        })
    } catch (error) {
        console.log(error)
        alert('Có lỗi trong lúc tạo biểu đồ thống kê doanh số, vui lòng thử lại sau')
    }
}

let orderChart
async function createOrderLineChart() {
    try {
        if (orderChart) {
            orderChart.destroy()
        }

        const ctx = document.querySelector('#order-chart').getContext('2d')
        const brandId = $('#brand-filter__order-chart').val()
        let orderData = []

        for (let i = 1; i <= 12; i++) {
            const orders = await getOrderByMonth(i, brandId)
            orderData.push(orders.orders.length)
        }

        orderChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
                datasets: [
                    {
                        label: 'Số hóa đơn',
                        data: orderData,
                        borderWidth: 1,
                        borderColor: '#9AD0F5',
                        backgroundColor: '#9AD0F5'
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        })
    } catch (error) {
        console.log(error)
        alert('Có lỗi trong lúc tạo biểu đồ thống kê hóa đơn, vui lòng thử lại sau')
    }
}

function handleFilterChart() {
    $('#brand-filter__revenue-chart').on('change', function() {
        createRevenueBarChart()
    })
    $('#brand-filter__order-chart').on('change', function() {
        createOrderLineChart()
    })
}