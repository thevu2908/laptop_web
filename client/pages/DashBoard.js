$(document).ready(() => {
    renderStatistic()
    createBarChart()
    renderBestSeller()
    handleRenderBestSellerQuantity()
})

function getOrderByDate(date) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/HoaDonController.php',
            method: 'POST',
            data: { action: 'get-by-date', date },
            dataType: 'JSON',
            success: orders => resolve(orders),
            error: error => reject(error)
        })
    })

}

function getOrderByMonth(month) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/HoaDonController.php',
            method: 'POST',
            data: { action: 'get-by-month', month },
            dataType: 'JSON',
            success: orders => resolve(orders),
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

function getBestSeller(amount) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/HoaDonController.php',
            method: 'POST',
            data: { action: 'get-best-seller', amount },
            dataType: 'JSON',
            success: products => resolve(products),
            error: error => reject(error)
        })
    })
}

async function renderStatistic() {
    try {
        const date = new Date()
        const orders = await getOrderByDate(date)
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
        alert('Có lỗi xảy ra, vui lòng thử lại sau')
    }
}

async function renderBestSeller(initAmount) {
    try {
        const amount = initAmount || 5
        const products = await getBestSeller(amount)
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
    } catch (error) {
        console.log(error)
        alert('Có lỗi xảy ra, vui lòng thử lại sau')
    }
}

function handleRenderBestSellerQuantity() {
    $('.view-product-quantity').on('change', function() {
        const amount = $(this).val()
        renderBestSeller(amount)
    })
}

async function createBarChart() {
    try {
        const chart = document.querySelector('#revenue-chart')
        let revenueData = []
        for (let i = 1; i <= 12; i++) {
            const orders = await getOrderByMonth(i)
            revenueData.push(orders.revenue / 1000000)
        }
    
        new Chart(chart, {
            type: 'bar',
            data: {
                labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
                datasets: [
                    {
                        label: 'Nhập hàng (triệu đồng)',
                        data: [],
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
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        })
    } catch (error) {
        console.log(error)
        alert('Có lỗi trong lúc tạo biểu đồ thống kê, vui lòng thử lại sau')
    }
}