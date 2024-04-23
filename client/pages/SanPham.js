$(document).ready(() => {
    renderProducts()
    renderProductInfo()
    handleAddProduct()
    renderUpdateProductModal()
    handleUpdateProduct()
    toAdminProductDetail()
    renderDeleteProductModal()
    handleDeleteProduct()
    renderViewProductModal()
    importExcel()
    exportExcel()
    handleSearchAdminProduct()
    handleFilterEndUserProduct()
    handleFilterSearchEndUserProduct()
})

function formatProduct(products) {
    return Object.values(products.reduce((acc, current) => {
        if (!acc[current.ma_sp]) {
            acc[current.ma_sp] = {
                id: current.ma_sp,
                name: current.ten_sp,
                keyboard: current.ban_phim,
                material: current.chat_lieu,
                screen: current.kich_co_man_hinh,
                resolution: current.do_phan_giai,
                image: current.hinh_anh,
                battery: current.pin,
                os: current.ten_hdh,
                weight: current.trong_luong,
                type: current.ten_loai,
                brand: current.ten_thuong_hieu,
                origin: current.xuat_xu,
                quantity: current.so_luong_ton,
                detail: []
            }
        }

        acc[current.ma_sp].detail.push(
            {
                id: current.ma_ctsp,
                colorId: current.ma_mau,
                color: current.ten_mau,
                cpu: current.ten_chip,
                gpu: current.ten_card,
                ram: current.ram,
                rom: current.rom,
                quantity: current.so_luong,
                importPrice: current.gia_nhap,
                chietkhau: current.chiet_khau,
                price: current.gia_tien,
                plugs: current.plugs
            }
        )

        return acc
    }, {}))
}

function getPaginationProducts(limit) {
    return new Promise((resolve, reject) => {
        const page = $('#currentpage').val()
        $.ajax({
            url: 'server/src/controller/PaginationController.php',
            method: 'GET',
            data: { action: 'pagination', table: 'sanpham', page, limit },
            dataType: 'JSON',
            success: products => resolve(products),
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}

function getFullProductsInfo() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/SanPhamController.php',
            method: 'POST',
            data: { action: 'get-data' },
            dataType: 'JSON',
            success: async products => {
                if (products && products.length > 0) {
                    for (let product of products) {
                        const plugs = await getProductDetailPlug(product.ma_ctsp)
                        product.plugs = plugs.map(plug => plug.ten_cong)
                    }
                    resolve(formatProduct(products))
                } else {
                    resolve(null)
                }
            },
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}

function getProduct(productId) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/SanPhamController.php',
            method: 'POST',
            data: { action: 'get', productId },
            dataType: 'JSON',
            success: product => resolve(product),
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}

function getProductFullInfo(productId) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/SanPhamController.php',
            method: 'POST',
            data: { action: 'get-full-info', productId },
            dataType: 'JSON',
            success: async product => {
                if (product && product.length > 0) {
                    for (let item of product) {
                        const plugs = await getProductDetailPlug(item.ma_ctsp)
                        item.plugs = plugs.map(plug => plug.ten_cong)
                    }
                }
                resolve(formatProduct(product)[0])
            },
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}

function renderProducts() {
    const urlParams = new URLSearchParams(window.location.search)
    if (window.location.pathname === '/admin.php') {
        renderAdminProductTable(null)
        clickPage(renderAdminProductTable)
    } else if (window.location.pathname === '/index.php') {
        if (!urlParams.has('id')) {
            if (urlParams.has('san-pham')) {
                renderEndUserProductPage()
                clickPage(renderEndUserProductList)
            } else if (urlParams.has('tim-kiem')) {
                renderSearchEndUserProduct()
                clickPage(renderSearchEndUserProductList)
            } else {
                renderHomePageProduct()
            }
        }
    }
}

async function renderAdminProductTable(data) {
    let products = null
    if ($('.admin-search-info').val()) {
        products = await searchAdminProduct($('.admin-search-info').val())
    } else {
        products = data ? data : await getPaginationProducts()
    }

    if (products && products.pagination.length > 0) {
        let html = ''
        products.pagination.forEach(product => {
            html += `
                <tr>
                    <td>
                        <span class="custom-checkbox">
                            <input type="checkbox" id="checkbox-${product.ma_sp}" name="chk[]" value="${product.ma_sp}">
                            <label for="checkbox-${product.ma_sp}"></label>
                        </span>
                    </td>
                    <td>
                        ${product.ma_sp}
                    </td>
                    <td>
                        ${product.ten_sp}
                    </td>
                    <td>${product.ten_thuong_hieu}</td>
                    <td>${product.so_luong_ton}</td>
                    <td>
                        <a href="#editProductModal" class="edit btn-update-product-modal" data-toggle="modal" data-id=${product.ma_sp}>
                            <i class="material-icons" data-toggle="tooltip" title="Sửa thông tin">&#xE254;</i>
                        </a>
                        <a href="#deleteProductModal" class="delete btn-delete-product-modal" data-toggle="modal" data-id=${product.ma_sp}>
                            <i class="material-icons" data-toggle="tooltip" title="Xóa">&#xE872;</i>
                        </a>
                        <a href="#viewProductModal" class="view btn-view-product-modal" data-toggle="modal" data-id=${product.ma_sp}>
                            <i class="material-icons" data-toggle="tooltip" title="Xem thông tin">&#xE417;</i>
                        </a>
                        <a href="/admin.php?controller=chitietsanpham&id=${product.ma_sp}" class="info btn-product-detail" data-id=${product.ma_sp}>
                            <i class="fa-solid fa-circle-info" title="Chi tiết sản phẩm" ></i>
                        </a>
                    </td>
                </tr>
            `
        })
        $('.admin-product-list').html(html)
        phanquyen_chucnang("Sản Phẩm")
        totalPage(products.count)
    }
}

async function renderHomePageProduct() {
    const products = await getPaginationProducts(8)

    if (products) {
        let html = ''

        for (let product of products.pagination) {
            const productDetails = await getProductDetailByProductId(product.ma_sp)
            const productDetail = productDetails[0]

            html += `
                <div class="product-item col-3">
                    <a href="index.php?san-pham&id=${product.ma_sp}" class="product-item-link">
                        <div class="product-image-wrapper">
                            <img src="${product.hinh_anh}">
                        </div>
                        <div class="product-info">
                            <div class="product-price">
                                <p class="product-price-number">
                                    ${product.so_luong_ton > 0 ? `₫${formatCurrency(productDetail.gia_tien)}` : 'Hàng sắp về'}
                                </p>
                            </div>
                            <div class="product-name">
                                <p>${product.ten_sp} ${productDetail.ram} ${productDetail.rom}</p>
                            </div>
                            <div class="product-detail row">
                                <span title="Màn hình" class="product-detail-info d-flex col-6">
                                    <span class="material-symbols-outlined">
                                        laptop_windows
                                    </span>
                                    ${product.kich_co_man_hinh}
                                </span>
                                <span title="CPU" class="product-detail-info d-flex col-6">
                                    <span class="material-symbols-outlined">
                                        memory
                                    </span>
                                    ${productDetail.ten_chip}
                                </span>
                                <span title="RAM" class="product-detail-info d-flex col-6">
                                    <span class="material-symbols-outlined">
                                        memory_alt
                                    </span>
                                    ${productDetail.ram}
                                </span>
                                <span title="Ổ cứng" class="product-detail-info d-flex col-6">
                                    <span class="material-symbols-outlined">
                                        hard_drive_2
                                    </span>
                                    SSD ${productDetail.rom}
                                </span>
                                <span title="Card đồ họa" class="product-detail-info d-flex col-6">
                                    <span class="material-symbols-outlined">
                                        developer_board
                                    </span>
                                    ${productDetail.ten_card}
                                </span>
                                <span title="Trọng lượng" class="product-detail-info d-flex col-6">
                                    <span class="material-symbols-outlined">
                                        weight
                                    </span>
                                    ${product.trong_luong} kg
                                </span>
                            </div>
                        </div>
                    </a>
                </div>
            `
        }

        $('.content-product-list').html(html)
    }
}

async function renderEndUserProductPage() {
    NProgress.start()
    renderEndUserProductFilter()
    renderEndUserProductList()
    renderFooter()
    NProgress.done()
}

async function renderEndUserProductList() {
    const brandId = $('.filter-brand .filter-item-link.active').find('input').val() || ''
    const price = $('.filter-price .filter-item-link.active').find('input').val() || ''
    const cpu = $('.filter-cpu .filter-item-link.active').find('input').val() || ''
    const order = $('.sort-filter-container .sort-filter-item.active').find('input').val() || ''
    const page = $('#currentpage').val() || ''
    const products = await getFilterProducts(brandId, price, cpu, order, page)
    let html = ''

    if (products && products.pagination && products.pagination.length > 0) {
        for (let product of products.pagination) {
            const productDetails = await getProductDetailByProductId(product.ma_sp)
            const productDetail = productDetails[0]

            html += `
                <div class="product-item col-4">
                    <a href="index.php?san-pham&id=${product.ma_sp}" class="product-item-link">
                        <div class="product-image-wrapper">
                            <img src="${product.hinh_anh}">
                        </div>
                        <div class="product-info">
                            <div class="product-price">
                                <p class="product-price-number">
                                    ${product.so_luong_ton > 0 ? `₫${formatCurrency(productDetail.gia_tien)}` : 'TẠM HẾT HÀNG'}
                                </p>
                            </div>
                            <div class="product-name">
                                <p>${product.ten_sp} ${productDetail.ram} ${productDetail.rom}</p>
                            </div>
                            <div class="product-detail row">
                                <span title="Màn hình" class="product-detail-info d-flex col-6">
                                    <span class="material-symbols-outlined">
                                        laptop_windows
                                    </span>
                                    ${product.kich_co_man_hinh}
                                </span>
                                <span title="CPU" class="product-detail-info d-flex col-6">
                                    <span class="material-symbols-outlined">
                                        memory
                                    </span>
                                    ${productDetail.ten_chip}
                                </span>
                                <span title="RAM" class="product-detail-info d-flex col-6">
                                    <span class="material-symbols-outlined">
                                        memory_alt
                                    </span>
                                    ${productDetail.ram}
                                </span>
                                <span title="Ổ cứng" class="product-detail-info d-flex col-6">
                                    <span class="material-symbols-outlined">
                                        hard_drive_2
                                    </span>
                                    SSD ${productDetail.rom}
                                </span>
                                <span title="Card đồ họa" class="product-detail-info d-flex col-6">
                                    <span class="material-symbols-outlined">
                                        developer_board
                                    </span>
                                    ${productDetail.ten_card}
                                </span>
                                <span title="Trọng lượng" class="product-detail-info d-flex col-6">
                                    <span class="material-symbols-outlined">
                                        weight
                                    </span>
                                    ${product.trong_luong} kg
                                </span>
                            </div>
                        </div>
                    </a>
                </div>
            `
        }
    }

    $('.product-main .product-list').html(html)
    enduserTotalPage(products.count, 6, page)
}

function renderEndUserProductFilter() {
    $('.product-main .sort-filter').html(`
        <div class="d-flex align-items-center sort-filter-container show-sort-filter">
            <i class="fa-solid fa-filter"></i>
            <div class="sort-filter-list">
                <p class="sort-filter-item-default">
                    Mặc định
                    <input type="hidden" value="">
                </p>
                <ul class="sort-filter-menu">
                    <li class="sort-filter-item active">
                        <a class="sort-filter-item-link">Mặc định</a>
                        <input type="hidden" value="" >
                    </li>
                    <li class="sort-filter-item">
                        <a class="sort-filter-item-link">Bán chạy</a>
                        <input type="hidden" value="best-seller" >
                    </li>
                    <li class="sort-filter-item">
                        <a class="sort-filter-item-link">Giá từ cao đến thấp</a>
                        <input type="hidden" value="high-low" >
                    </li>
                    <li class="sort-filter-item">
                        <a class="sort-filter-item-link">Giá từ thấp đến cao</a>
                        <input type="hidden" value="low-high" >
                    </li>
                </ul>
            </div>
        </div>
    `)

    renderFilterBrand()

    $('.product-main .filter-price').html(`
        <h5>Mức giá</h5>
        <div class="filter-list row">
            <div class="filter-item col-12">
                <button href="index.php?san-pham" class="filter-item-link active">
                    <i class="fa-regular fa-square"></i>
                    Tất cả
                    <input type="hidden" value="" >
                </button>
            </div>
            <div class="filter-item col-12">
                <button class="filter-item-link">
                    <i class="fa-regular fa-square"></i>
                    Dưới 10 triệu
                    <input type="hidden" value="<10" >
                </button>
            </div>
            <div class="filter-item col-12">
                <button class="filter-item-link">
                    <i class="fa-regular fa-square"></i>
                    Từ 10 - 15 triệu
                    <input type="hidden" value="10-15" >
                </button>
            </div>
            <div class="filter-item col-12">
                <button class="filter-item-link">
                    <i class="fa-regular fa-square"></i>
                    Từ 15 - 20 triệu
                    <input type="hidden" value="15-20" >
                </button>
            </div>
            <div class="filter-item col-12">
                <button class="filter-item-link">
                    <i class="fa-regular fa-square"></i>
                    Từ 20 - 25 triệu
                    <input type="hidden" value="20-25" >
                </button>
            </div>
            <div class="filter-item col-12">
                <button class="filter-item-link">
                    <i class="fa-regular fa-square"></i>
                    Trên 25 triệu
                    <input type="hidden" value=">25" >
                </button>
            </div>
        </div>
    `)

    renderFilterCPU()
}

function getFilterProducts(brandId, price, cpu, order, page) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/SanPhamController.php',
            method: 'GET',
            data: { action: 'filter', brandId, price, cpu, order, page },
            dataType: 'JSON',
            success: products => resolve(products),
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}

function handleFilterEndUserProduct() {
    $(document).on('click', '.filter-brand .filter-item-link', function() {
        $('.filter-brand .filter-item-link').removeClass('active')
        $(this).addClass('active')
        renderEndUserProductList()
    })
    $(document).on('click', '.filter-price .filter-item-link', function() {
        $('.filter-price .filter-item-link').removeClass('active')
        $(this).addClass('active')
        renderEndUserProductList()
    })
    $(document).on('click', '.filter-cpu .filter-item-link', function() {
        $('.filter-cpu .filter-item-link').removeClass('active')
        $(this).addClass('active')
        renderEndUserProductList()
    })
    $(document).on('click', '.sort-filter-container .sort-filter-item', function() {
        $('.sort-filter-container .sort-filter-item').removeClass('active')
        $(this).addClass('active')
        const text = $(this).find('a').text()
        const order = $(this).find('input').val()
        $('.sort-filter-container .sort-filter-item-default').html(`${text} <input type="hidden" value="${order}">`)
        renderEndUserProductList()
    })
}

async function renderSearchEndUserProduct() {
    NProgress.start()
    const products = await getSearchEndUserProduct()
    products.count > 0 ? renderFilterType() : $('.search-empty').addClass('active')
    renderSearchEndUserProductList(products)
    NProgress.done()
}

async function renderSearchEndUserProductList(data) {
    const products = data || await getSearchEndUserProduct()
    const page = $('#currentpage').val() || ''
    const search = $('.search-form .search-input').val() || ''
    let html = ''
    if (products && products.pagination && products.pagination.length > 0) {
        for (let product of products.pagination) {
            const productDetails = await getProductDetailByProductId(product.ma_sp)
            const productDetail = productDetails[0]

            html += `
                <div class="product-item col-3">
                    <a href="index.php?san-pham&id=${product.ma_sp}" class="product-item-link">
                        <div class="product-image-wrapper">
                            <img src="${product.hinh_anh}">
                        </div>
                        <div class="product-info">
                            <div class="product-price">
                                <p class="product-price-number">
                                    ${product.so_luong_ton > 0 ? `₫${formatCurrency(productDetail.gia_tien)}` : 'TẠM HẾT HÀNG'}
                                </p>
                            </div>
                            <div class="product-name">
                                <p>${product.ten_sp} ${productDetail.ram} ${productDetail.rom}</p>
                            </div>
                            <div class="product-detail row">
                                <span title="Màn hình" class="product-detail-info d-flex col-6">
                                    <span class="material-symbols-outlined">
                                        laptop_windows
                                    </span>
                                    ${product.kich_co_man_hinh}
                                </span>
                                <span title="CPU" class="product-detail-info d-flex col-6">
                                    <span class="material-symbols-outlined">
                                        memory
                                    </span>
                                    ${productDetail.ten_chip}
                                </span>
                                <span title="RAM" class="product-detail-info d-flex col-6">
                                    <span class="material-symbols-outlined">
                                        memory_alt
                                    </span>
                                    ${productDetail.ram}
                                </span>
                                <span title="Ổ cứng" class="product-detail-info d-flex col-6">
                                    <span class="material-symbols-outlined">
                                        hard_drive_2
                                    </span>
                                    SSD ${productDetail.rom}
                                </span>
                                <span title="Card đồ họa" class="product-detail-info d-flex col-6">
                                    <span class="material-symbols-outlined">
                                        developer_board
                                    </span>
                                    ${productDetail.ten_card}
                                </span>
                                <span title="Trọng lượng" class="product-detail-info d-flex col-6">
                                    <span class="material-symbols-outlined">
                                        weight
                                    </span>
                                    ${product.trong_luong} kg
                                </span>
                            </div>
                        </div>
                    </a>
                </div>
            `
        }
    }
    $('.search-product-main .search-info').html(search ? `<h1>Tìm thấy <b>${products.count}</b> kết quả với từ khóa <b>"${search.toLowerCase()}"</b></h1>` : '')
    $('.search-product-main .search-product-list').html(html)
    enduserTotalPage(products.count, 8, page)
}

function getSearchEndUserProduct() {
    return new Promise((resolve, reject) => {
        $('.search-form .search-input').val(new URLSearchParams(window.location.search).get('tim-kiem'))
        const search = $('.search-form .search-input').val() || ''
        const type = $('.search-product-main .filter-item h2').text() || ''
        const page = $('#currentpage').val()
        $.ajax({
            url: 'server/src/controller/SanPhamController.php',
            method: 'GET',
            data: { action: 'search', search, type, page },
            dataType: 'JSON',
            success: products => resolve(products),
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}

function handleFilterSearchEndUserProduct() {
    $(document).on('click', '.search-product-main .sort-dropdown-item', function() {
        const type = $(this).text()
        $('.search-product-main .filter-list').html(`
            <div class="filter-item">
                <h2>${type}</h2>
                <i class="fa-solid fa-xmark"></i>
            </div>
        `)
        renderSearchEndUserProductList()
    })
    $(document).on('click', '.search-product-main .filter-item', function() {
        $('.search-product-main .filter-list').html('')
        renderSearchEndUserProductList()
    })
}

async function renderProductInfo() {
    NProgress.start()
    const urlParams = new URLSearchParams(window.location.search)
    const productId = urlParams.get('id')

    if (urlParams.has('san-pham') && productId) {
        const product = await getProductFullInfo(productId)

        let html = `
            <div class="product-image-container">
                <img src="${product.image}" class="product-image">
            </div>
            <div class="product-config-container">
                <div class="product-config-info">
                    <span title="Màn hình" class="product-detail-info d-flex col-6">
                        <span class="material-symbols-outlined">
                            laptop_windows
                        </span>
                        ${product.screen}
                    </span>
                    <span title="CPU" class="product-detail-info d-flex col-6">
                        <span class="material-symbols-outlined">
                            memory
                        </span>
                        ${product.detail[0].cpu}
                    </span>
                    <span title="RAM" class="product-detail-info ram d-flex col-6">
                        <span class="material-symbols-outlined">
                            memory_alt
                        </span>
                        ${product.detail[0].ram.toUpperCase()}
                    </span>
                    <span title="Ổ cứng" class="product-detail-info rom d-flex col-6">
                        <span class="material-symbols-outlined">
                            hard_drive_2
                        </span>
                        SSD ${product.detail[0].rom.toUpperCase()}
                    </span>
                    <span title="Card đồ họa" class="product-detail-info d-flex col-6">
                        <span class="material-symbols-outlined">
                            developer_board
                        </span>
                        ${product.detail[0].gpu}
                    </span>
                    <span title="Trọng lượng" class="product-detail-info d-flex col-6">
                        <span class="material-symbols-outlined">
                            weight
                        </span>
                        ${product.weight} kg
                    </span>
                </div>
                <a class="product-config-more-link" data-bs-toggle="modal" data-bs-target="#product-config-detail-modal">Xem chi tiết thông số kỹ thuật</a>
            </div>
        `
        $('.produt-info-left').html(html)

        let rams = product.detail
            .filter(productDetail => product.quantity > 0 ? productDetail.quantity > 0 : true)
            .map(productDetail => ({ ram: productDetail.ram, price: productDetail.price }))
        let roms = product.detail
            .filter(productDetail => product.quantity > 0 ? productDetail.quantity > 0 : true)
            .map(productDetail => ({ rom: productDetail.rom, price: productDetail.price }))
        let colors = product.detail
            .filter(productDetail => product.quantity > 0 ? productDetail.quantity > 0 : true)
            .map(productDetail => ({ id: productDetail.colorId, name: productDetail.color }))

        rams = removeDuplicateObject(rams, 'ram')
        roms = removeDuplicateObject(roms, 'rom')
        colors = removeDuplicateObject(colors, 'id')

        let ramSelect = ''
        if (rams.length > 1) {
            ramSelect = '<div class="product-select">'
            rams.forEach((ram, index) => {
                const checked = index === 0 ? 'checked' : ''
                const active = index === 0 ? 'active' : ''
                ramSelect += `
                    <div class="product-select-item ram ${active}">
                        <div class="product-radio">
                            <input type="radio" name="product-ram" id="product-${ram.ram.toLowerCase()}" value="${ram.ram}" ${checked}>
                            ${ram.ram}
                        </div>
                        <p>₫${formatCurrency(ram.price)}</p>
                    </div>
                `
            })
            ramSelect += '</div>'
        }

        let romSelect = ''
        if (roms.length > 1) {
            romSelect = '<div class="product-select">'
            roms.forEach((rom, index) => {
                const checked = index === 0 ? 'checked' : ''
                const active = index === 0 ? 'active' : ''
                romSelect += `
                    <div class="product-select-item rom ${active}">
                        <div class="product-radio">
                            <input type="radio" name="product-rom" id="product-${rom.rom.toLowerCase()}" value="${rom.rom}" ${checked}>
                            ${rom.rom}
                        </div>
                        <p>₫${formatCurrency(rom.price)}</p>
                    </div>
                `
            })
            romSelect += '</div>'
        }

        let colorHtml = ''
        colors.forEach((color, index) => {
            const active = index === 0 ? 'active' : ''
            colorHtml += `<li class="product-color-item ${active}" data-id="${color.id}" title="${color.name}" style="background-color: ${color.id};"><i class="fa-solid fa-check"></i></li>`
        })

        selectEndUserConfig(product)

        html = `
            <h2 class="product-name">
                ${product.name} ${product.detail[0].ram.toUpperCase()}/${product.detail[0].rom.toUpperCase()}
                ${product.quantity > 0 ? '' : '<span>TẠM HẾT HÀNG</span>'}
            </h2>
            <h3 class="product-price">
                ₫${formatCurrency(product.detail[0].price)}
                <del class="product-origin-price">₫${formatCurrency(product.detail[0].price)}</del>
            </h3>
            ${ramSelect}
            ${romSelect}
            <div class="product-color-box">
                <span>Màu sắc:</span>
                <ul class="product-color-list">
                    ${colorHtml}
                </ul>
            </div>
            <div class="product-buy-box">
                ${product.quantity > 0 
                    ? `
                        <input type="number" class="product-bought-quantity" step="1" min="1" max="9" name="quantity" value="1" title="Số lượng mua" size="4">
                        <button class="btn btn-add-cart" data-id=${product.id}>Thêm vào giỏ</button>
                        <a href="index.php?gio-hang" class="btn btn-buy" data-id=${product.id}>Mua ngay</a>
                    `
                    : ''
                }
            </div>
        `
        $('.product-info-right').html(html)

        const color = $('.product-color-item.active').attr('title')
        const ram = rams.length > 1 ? $('.product-select-item.ram.active').find('input').val() : rams[0].ram
        const rom = roms.length > 1 ? $('.product-select-item.rom.active').find('input').val() : roms[0].rom
        renderProductConfigModal(product, color, ram, rom)
    }
    NProgress.done()
}

function renderProductConfigModal(product, color, ram, rom) {
    $('.product-config-modal .product-config-detail-name span').text(`${product.name} ${product.detail[0].ram.toUpperCase()}/${product.detail[0].rom.toUpperCase()}`)
    $('.product-config-detail-img').attr('src', product.image)
    $('.product-config-modal .product-origin span').text(product.origin)
    $('.product-config-modal .product-brand span').text(product.brand)
    $('.product-config-modal .product-type span').text(product.type)
    $('.product-config-modal .product-weight').text(`${product.weight} kg`)
    $('.product-config-modal .product-color').text(color)
    $('.product-config-modal .product-material').text(product.material)
    $('.product-config-modal .product-cpu').text(product.detail[0].cpu)
    $('.product-config-modal .product-ram').text(ram)
    $('.product-config-modal .product-rom').text(rom)
    $('.product-config-modal .product-screen').text(product.screen)
    $('.product-config-modal .product-gpu').text(product.detail[0].gpu)
    $('.product-config-modal .product-keyboard').text(product.keyboard)
    $('.product-config-modal .product-battery').text(product.battery)
    $('.product-config-modal .product-os').text(product.os)

    const html = product.detail[0].plugs.map(plug => `<li class="modal-row-item">${plug}</li>`).join('')
    $('.product-config-modal .product-plug').html(html)
}

function selectEndUserConfig(product) {
    let ram = product.detail[0].ram
    let rom = product.detail[0].rom
    let color = product.detail[0].color
    let price = `₫${formatCurrency(product.detail[0].price)}`

    $(document).on('click', '.product-select-item.ram', function() {
        $('.product-select-item.ram').removeClass('active')
        $(this).addClass('active')
        $(this).find('input[type="radio"]').prop('checked', true)
        ram = $(this).find('input[type="radio"]').val()
        price = $(this).find('p').text()
        changeEndUserConfig()
    })

    $(document).on('click', '.product-select-item.rom', function() {
        $('.product-select-item.rom').removeClass('active')
        $(this).addClass('active')
        $(this).find('input[type="radio"]').prop('checked', true)
        rom = $(this).find('input[type="radio"]').val()
        price = $(this).find('p').text()
        changeEndUserConfig()
    })

    $(document).on('click', '.product-color-box .product-color-item', function() {
        $('.product-color-box .product-color-item').removeClass('active')
        $(this).addClass('active')
        color = $(this).attr('title')
        changeEndUserConfig()
    })

    function changeEndUserConfig() {
        $('.product-info-right .product-name').text(`${product.name} ${ram}/${rom}`)
        $('.product-detail-info.ram').html(`<span class="material-symbols-outlined">memory_alt</span> ${ram}`)
        $('.product-detail-info.rom').html(`<span class="material-symbols-outlined">hard_drive_2</span> SSD ${rom}`)
        $('.product-info-right .product-price').html(`${price} <del class="product-origin-price">${price}</del>`)
        $('.product-config-modal .product-ram').text(ram)
        $('.product-config-modal .product-rom').text(rom)
        $('.product-config-modal .product-color').text(color)
    }
}

async function renderFooter() {
    try {
        const footerResponse = await fetch('server/src/view/footer.php')
        const footerHtml = await footerResponse.text()
        $('#footer-main').html(footerHtml)
    } catch (error) {
        console.error(error)
    }
}

function renderProductName(productId) {
    getProduct(productId)
        .then(product => {
            $('#admin-product-detail-main .product-name').text(product.ten_sp)
        })
}

function validateProductEmpty(product) {
    if (!product.img) {
        alert('Vui lòng chọn hình ảnh')
        return false
    }
    if (!product.productName) {
        alert('Vui lòng nhập tên sản phẩm')
        $('#product-name').focus()
        return false
    }
    if (!product.origin) {
        alert('Vui lòng nhập xuất xứ sản phẩm')
        $('#product-origin').focus()
        return false
    }
    if (product.chietkhau != undefined && product.chietkhau === '') {
        alert('Vui lòng nhập chiết khấu')
        $('#product-chietkhau').focus()
        return false
    }
    if (product.quantity != undefined && product.quantity === '') {
        alert('Vui lòng nhập số lượng')
        $('#product-quantity').focus()
        return false
    }
    if (!product.weight) {
        alert('Vui lòng nhập trọng lượng sản phẩm')
        $('#product-weight').focus()
        return false
    }
    if (product.colors && product.colors.length === 0) {
        alert('Vui lòng chọn màu sắc sản phẩm')
        $('#product-color').focus()
        return false
    }
    if (!product.material) {
        alert('Vui lòng nhập chất liệu sản phẩm')
        $('#product-material').focus()
        return false
    }
    if (product.cpus && product.cpus.length === 0) {
        alert('Vui lòng chọn CPU')
        $('#product-cpu').focus()
        return false
    }
    if (product.rams && product.rams.length === 0) {
        alert('Vui lòng chọn RAM')
        $('#product-ram').focus()
        return false
    }
    if (product.roms && product.roms.length === 0) {
        alert('Vui lòng chọn ROM')
        $('#product-rom').focus()
        return false
    }
    if (!product.screen) {
        alert('Vui lòng nhập kích cỡ màn hình')
        $('#product-screen').focus()
        return false
    }
    if (!product.resolution) {
        alert('Vui lòng nhập độ phân giải')
        $('#product-resolution').focus()
        return false
    }
    if (product.gpus && product.gpus.length === 0) {
        alert('Vui lòng chọn card đồ họa')
        $('#product-gpu').focus()
        return false
    }
    if (product.plugs && product.plugs.length === 0) {
        alert('Vui lòng chọn cổng kết nối')
        $('#product-plug').focus()
        return false
    }
    if (!product.keyboard) {
        alert('Vui lòng nhập kiểu bàn phím')
        $('#product-keyboard) {').focus()
        return false
    }
    if (!product.battery) {
        alert('Vui lòng nhập loại pin')
        $('#product-battery) {').focus()
        return false
    }
    return true
}

function saveImage(fileInput, productId) {
    return new Promise((resolve, reject) => {
        const file = fileInput.files[0]
        const formData = new FormData()
        formData.append('action', 'save-image')
        formData.append('productId', productId)
        formData.append('fileInputName', file)

        $.ajax({
            url: 'server/src/controller/SanPhamController.php',
            method: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            success: data => {
                resolve(data)
            },
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}

function addProduct(product) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/SanPhamController.php',
            method: 'POST',
            data: { action: 'add', product },
            success: productId => {
                if (!productId.startsWith('SP')) {
                    console.log(productId)
                    resolve(false)
                } else {
                    let promises = []
                    let productDetails = []

                    product.colors.forEach(colorId => {
                        product.cpus.forEach(cpuId => {
                            product.rams.forEach(ram => {
                                product.roms.forEach(rom => {
                                    product.gpus.forEach(gpuId => {
                                        productDetails.push({ colorId, cpuId, ram, rom, gpuId })
                                    })
                                })
                            })
                        })
                    })

                    productDetails.forEach(productDetail => promises.push(addProductDetail(productDetail, productId, product.plugs)))

                    Promise.all(promises).then(results => resolve(!results.includes(false)))
                }
            },
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}

function handleAddProduct() {
    $(document).on('click', '.btn-add-product', e => {
        const product = {
            img: $('.preview-img').attr('src'),
            brandId: $('#product-brand').val(),
            typeId: $('#product-type').val(),
            osId: $('#product-os').val(),
            productName: $('#product-name').val(),
            screen: $('#product-screen').val(),
            resolution: $('#product-resolution').val(),
            battery: $('#product-battery').val(),
            keyboard: $('#product-keyboard').val(),
            weight: $('#product-weight').val(),
            material: $('#product-material').val(),
            origin: $('#product-origin').val(),
            colors: $('#product-color').val(),
            cpus: $('#product-cpu').val(),
            rams: $('#product-ram').val(),
            roms: $('#product-rom').val(),
            gpus: $('#product-gpu').val(),
            plugs: $('#product-plug').val(),
        }

        if (!validateProductEmpty(product)) {
            return
        }

        saveImage(document.querySelector('#addProductModal #product-image'), null)
            .then(res => {
                if (res !== 'success') {
                    alert(res)
                    return
                }

                addProduct(product)
                    .then(res => {
                        if (res) {
                            alert('Thêm sản phẩm thành công')
                            $('form').trigger('reset')
                            $('#addProductModal').modal('hide')
                            renderAdminProductTable()
                        } else {
                            alert('Xảy ra lỗi trong quá trình thêm sản phẩm')
                        }
                    })
                    .catch(error => console.log(error))
            })
            .catch(error => console.log(error))
    })
}

function renderUpdateProductModal() {
    $(document).on('click', '.btn-update-product-modal', e => {
        const productId = e.target.closest('.btn-update-product-modal').dataset.id

        getProduct(productId)
            .then(product => {
                $('#editProductModal .product-id').text(product.ma_sp)
                $('#editProductModal .upload-box').removeClass('hide-image')
                $('#editProductModal .upload-box').css('display', 'flex')
                $('#editProductModal .preview-img').attr('src', product.hinh_anh)
                $('#editProductModal #product-name').val(product.ten_sp)
                $('#editProductModal #product-origin').val(product.xuat_xu)
                $('#editProductModal #product-brand').val(product.ma_thuong_hieu)
                $('#editProductModal #product-type').val(product.ma_the_loai)
                $('#editProductModal #product-weight').val(product.trong_luong)
                $('#editProductModal #product-material').val(product.chat_lieu)
                $('#editProductModal #product-screen').val(product.kich_co_man_hinh)
                $('#editProductModal #product-resolution').val(product.do_phan_giai)
                $('#editProductModal #product-keyboard').val(product.ban_phim)
                $('#editProductModal #product-battery').val(product.pin)
                $('#editProductModal #product-os').val(product.ma_hdh)
                $('#editProductModal #product-import-price').val(product.gia_nhap)
                $('#editProductModal #product-chietkhau').val(product.chiet_khau)
                $('#editProductModal #product-price').val(product.gia_ban)
                $('#editProductModal #product-quantity').val(product.so_luong_ton)
            })
            .catch(error => console.log(error))
    })
}

function updateProduct(product) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/SanPhamController.php',
            method: 'POST',
            data: { action: 'update', product },
            success: res => {
                if (res === 'success') {
                    resolve(true)
                } else {
                    console.log(res)
                    resolve(false)
                }
            },
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}

function handleUpdateProduct() {
    $(document).on('click', '.btn-update-product', () => {
        const product = {
            productId: $('#editProductModal .product-id').text(),
            img: $('#editProductModal .preview-img').attr('src'),
            brandId: $('#editProductModal #product-brand').val(),
            typeId: $('#editProductModal #product-type').val(),
            osId: $('#editProductModal #product-os').val(),
            productName: $('#editProductModal #product-name').val(),
            importPrice: $('#editProductModal #product-import-price').val(),
            chietkhau: $('#editProductModal #product-chietkhau').val(),
            price: $('#editProductModal #product-price').val(),
            quantity: $('#editProductModal #product-quantity').val(),
            screen: $('#editProductModal #product-screen').val(),
            resolution: $('#editProductModal #product-resolution').val(),
            battery: $('#editProductModal #product-battery').val(),
            keyboard: $('#editProductModal #product-keyboard').val(),
            weight: $('#editProductModal #product-weight').val(),
            material: $('#editProductModal #product-material').val(),
            origin: $('#editProductModal #product-origin').val(),
        }

        if (!validateProductEmpty(product)) {
            return
        }

        saveImage(document.querySelector('#editProductModal #product-image'), product.productId)
            .then(res => {
                if (res !== 'success' && res !== 'no image updated') {
                    alert(res)
                    return
                }

                updateProduct(product)
                    .then(res => {
                        if (res) {
                            alert('Cập nhật sản phẩm thành công')
                            $('#editProductModal').modal('hide')
                            renderAdminProductTable()
                        } else {
                            alert('Xảy ra lỗi trong quá trình cập nhật sản phẩm')
                        }
                    })
                    .catch(error => console.log(error))
            })
    })
}

function toAdminProductDetail() {
    $(document).on('click', '.btn-to-product-detail', e => {
        const productId = $('#editProductModal .product-id').text()
        window.location.href = `/admin.php?controller=chitietsanpham&id=${productId}`
    })
}

function renderDeleteProductModal() {
    $(document).on('click', '.btn-delete-product-modal', e => {
        const productId = e.target.closest('.btn-delete-product-modal').dataset.id

        if (productId) {
            getProduct(productId)
                .then(product => {
                    const html = `
                        <p>Bạn có chắc chắn muôn xóa sản phẩm có mã "<b class="product-id">${product.ma_sp}</b>" không ?</p>
                        <p class="text-warning"><small>Hành động này sẽ không thể hoàn tác</small></p>
                    `
                    $('#deleteProductModal .confirm-delete').html(html)
                })
        }
    })

    $('.btn-delete-checked-product-modal').on('click', () => {
        const html = `
            <p>Bạn có chắc muốn xóa các sản phẩm được chọn không ?</p>
            <p class="text-warning"><small>Hành động này sẽ không thể hoàn tác</small></p>
        `
        $('#deleteProductModal .confirm-delete').html(html)
    })
}

function deleteProduct(productId) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/SanPhamController.php',
            method: 'POST',
            data: { action: 'delete', productId },
            success: data => {
                if (data === 'success') {
                    resolve(true)
                } else {
                    resolve(false)
                }
            },
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}

function handleDeleteProduct() {
    $(document).on('click', '.btn-delete-product', () => {
        const productId = $('#deleteProductModal .product-id').text()

        if (productId) {
            deleteProduct(productId)
                .then(res => {
                    if (res === true) {
                        alert('Xóa sản phẩm thành công')
                        $('#deleteProductModal').modal('hide')
                        renderAdminProductTable()
                    } else {
                        alert('Xảy ra lỗi trong quá trình xóa sản phẩm')
                    }
                })
                .catch(error => console.log(error))
        } else {
            let checkedProducts = []
            const firstCheckInputElement = document.querySelector('table.table thead input[type=checkbox]')
            const checkInputElements = document.querySelectorAll('.admin-product-list input[name="chk[]"]')

            checkInputElements.forEach(item => {
                if (item.checked) {
                    checkedProducts.push(item.value)
                }
            })

            if (checkedProducts.length > 0) {
                let promises = []

                checkedProducts.forEach(productId => promises.push(deleteProduct(productId)))

                Promise.all(promises).then(results => {
                    if (results.includes(false)) {
                        alert('Xảy ra lỗi trong quá trình xóa các sản phẩm')
                    } else {
                        alert('Đã xóa sản phẩm các sản phẩm được chọn')
                        firstCheckInputElement.checked = false
                        renderAdminProductTable()
                    }
                })
            } else {
                alert('Không có sản phẩm nào được chọn\nVui lòng check vào ô các sản phẩm muốn xóa')
            }

            $('#deleteProductModal').modal('hide')
        }
    })
}

function renderViewProductModal() {
    $(document).on('click', '.btn-view-product-modal', async e => {
        const productId = e.target.closest('.btn-view-product-modal').dataset.id

        if (productId) {
            const product = await getProduct(productId)
            const productDetails = await getProductDetailByProductId(product.ma_sp)
            const plugs = await getProductPlugs(productId)

            let colors = [], cpus = [], gpus = [], rams = [], roms = []
            productDetails.forEach(productDetail => {
                colors.push(productDetail.ten_mau)
                cpus.push(productDetail.ten_chip)
                gpus.push(productDetail.ten_card)
                rams.push(productDetail.ram)
                roms.push(productDetail.rom)
            })

            colors = [...new Set(colors)]
            cpus = [...new Set(cpus)]
            gpus = [...new Set(gpus)]
            rams = [...new Set(rams)]
            roms = [...new Set(roms)]

            const colorHtml = colors.map(color => color).join(', ')
            const cpuHtml = cpus.map(cpu => `<li>${cpu}</li>`).join('')
            const gpuHtml = gpus.map(gpu => `<li>${gpu}</li>`).join('')
            const ramHtml = rams.map(ram => ram).join(', ')
            const romHtml = roms.map(rom => rom).join(', ')
            const plugHtml = plugs.map(plug => `<li>${plug}</li>`).join('')

            $('#viewProductModal .product-id').text(product.ma_sp)
            $('#viewProductModal .upload-box').css('display', 'flex')
            $('#viewProductModal .preview-img').attr('src', product.hinh_anh)
            $('#viewProductModal .product-name').text(product.ten_sp)
            $('#viewProductModal .product-origin').text(product.xuat_xu)
            $('#viewProductModal #product-brand').val(product.ma_thuong_hieu)
            $('#viewProductModal #product-type').val(product.ma_the_loai)
            $('#viewProductModal .product-weight').text(product.trong_luong)
            $('#viewProductModal .product-material').text(product.chat_lieu)
            $('#viewProductModal .product-screen').text(product.kich_co_man_hinh)
            $('#viewProductModal .product-resolution').text(product.do_phan_giai)
            $('#viewProductModal .product-keyboard').text(product.ban_phim)
            $('#viewProductModal .product-battery').text(product.pin)
            $('#viewProductModal #product-os').val(product.ma_hdh)
            $('#viewProductModal .product-import-price').text(product.gia_nhap)
            $('#viewProductModal .product-chietkhau').text(product.chiet_khau)
            $('#viewProductModal .product-price').text(product.gia_ban)
            $('#viewProductModal .product-quantity').text(product.so_luong_ton)
            $('#viewProductModal .product-color').html(colorHtml)
            $('#viewProductModal .product-cpu').html(cpuHtml)
            $('#viewProductModal .product-gpu').html(gpuHtml)
            $('#viewProductModal .product-ram').html(ramHtml)
            $('#viewProductModal .product-rom').html(romHtml)
            $('#viewProductModal .product-plug').html(plugHtml)
        }
    })
}

function getCellValue(sheet, row, column) {
    const cellAddress = XLSX.utils.encode_cell({ r: row, c: column })
    const cell = sheet[cellAddress]
    return cell ? cell.v : ''
}

function importExcel() {
    $('#admin-product-main #import-excel-file').on('change', e => {
        const file = e.target.files[0]
        const reader = new FileReader()

        reader.onload = async e => {
            NProgress.start()
            try {
                const data = new Uint8Array(e.target.result)
                const workbook = XLSX.read(data, { type: 'array' })
                const sheetName = workbook.SheetNames[0]
                const sheet = workbook.Sheets[sheetName]
                const range = XLSX.utils.decode_range(sheet['!ref'])

                let products = []
                const titles = [
                    'productName', 'origin', 'brandId', 'typeId', 'weight', 'colors', 'material', 'cpus',
                    'rams', 'roms', 'screen', 'resolution', 'gpus', 'plugs', 'keyboard', 'battery', 'osId'
                ]

                for (let i = range.s.r + 1; i <= range.e.r; i++) {
                    let product = {}

                    for (let j = range.s.c; j <= range.e.c; j++) {
                        if (i == 1) continue
                        else {
                            const cellValue = getCellValue(sheet, i, j)

                            if (titles[j] === 'colors' || titles[j] === 'cpus' || titles[j] === 'gpus' || titles[j] === 'rams' || titles[j] === 'roms' || titles[j] === 'plugs') {
                                if (cellValue.toString().includes(',')) {
                                    let arrays = cellValue.split(',')
                                    arrays = arrays.map(item => item.trim())
                                    product[titles[j]] = arrays
                                } else {
                                    product[titles[j]] = [cellValue]
                                }
                            } else {
                                product[titles[j]] = cellValue
                            }
                        }
                    }

                    if (Object.keys(product).length > 0) products.push(product)
                }

                for (let product of products) {
                    product.brandId = await handleImportBrand(product.brandId)
                    product.typeId = await handleImportType(product.typeId)
                    product.osId = await handleImportOS(product.osId)
                    for (let index in product.cpus) product.cpus[index] = await handleImportCPU(product.cpus[index])
                    for (let index in product.gpus) product.gpus[index] = await handleImportGPU(product.gpus[index])
                    for (let index in product.plugs) product.plugs[index] = await handleImportPlug(product.plugs[index])

                    for (let index in product.colors) {
                        product.colors[index] = await getColorId(product.colors[index])
                        if (!product.colors[index]) {
                            alert(`Màu ${product.colors[index]} ở sản phẩm ${product.productName} không tồn tại trong hệ thống\nVui lòng thêm màu vào hệ thống\nSau đó thêm chi tiết sản phẩm riêng trong phần thêm chi tiết sản phẩm`)
                            return
                        }
                    }
                }

                const addProductPromises = products.map(product => addProduct(product))
                const res = await Promise.all(addProductPromises)

                if (!res.includes(false)) {
                    alert('Thêm các sản phẩm từ file excel thành công')
                    $('form').trigger('reset')
                    renderAdminProductTable()
                } else {
                    alert('Xảy ra lỗi trong quá trình thêm sản phẩm vào hệ thống từ file excel\nVui lòng kiểm tra lại định dạng và nội dung của file excel')
                }
            } catch (error) {
                console.log(error)
            } finally {
                NProgress.done()
            }
        }
        reader.readAsArrayBuffer(file)
    })
}

function exportExcel() {
    $('#admin-product-main .btn-export-excel').on('click', async () => {
        NProgress.start()

        try {
            const products = await getFullProductsInfo()
            let excelDatas = []

            products.forEach(product => {
                let colors = [], cpus = [], gpus = [], rams = [], roms = [], plugs = []
                product.detail.forEach(productDetail => {
                    colors.push(productDetail.color)
                    cpus.push(productDetail.cpu)
                    gpus.push(productDetail.gpu)
                    rams.push(productDetail.ram)
                    roms.push(productDetail.rom)
                    plugs.push(productDetail.plugs)
                })

                colors = [...new Set(colors)]
                cpus = [...new Set(cpus)]
                gpus = [...new Set(gpus)]
                rams = [...new Set(rams)]
                roms = [...new Set(roms)]
                plugs = [...new Set(plugs.flatMap(plug => plug))]

                const colorName = colors.map(color => color).join(', ')
                const cpuName = cpus.map(cpu => cpu).join(', ')
                const gpuName = gpus.map(gpu => gpu).join(', ')
                const ramName = rams.map(ram => ram).join(', ')
                const romName = roms.map(rom => rom).join(', ')
                const plugName = plugs.map(plug => plug).join(', ')

                excelDatas.push({
                    'Mã sản phẩm': product.id,
                    'Tên sản phẩm': product.name,
                    'Thương hiệu': product.brand,
                    'Loại sản phẩm': product.type,
                    'Số lượng tồn': product.quantity,
                    'CPU': cpuName,
                    'Card đồ họa': gpuName,
                    'RAM': ramName,
                    'Bộ nhớ': romName,
                    'Màu sắc': colorName,
                    'Cổng kết nối': plugName,
                    'Xuất xứ': product.origin,
                    'Trọng lượng': product.weight,
                    'Chất liệu': product.material,
                    'Kích cỡ màn hình': product.screen,
                    'Hệ điều hành': product.os,
                })
            })

            const ws = XLSX.utils.json_to_sheet(excelDatas)
            const wb = XLSX.utils.book_new()
            XLSX.utils.book_append_sheet(wb, ws, "Sheet1")
            const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
            saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'dssp.xlsx')
        } catch (error) {
            console.log(error)
        } finally {
            NProgress.done()
        }
    })
}

function searchAdminProduct(search) {
    return new Promise((resolve, reject) => {
        const page = $('#currentpage').val()
        $.ajax({
            url: 'server/src/controller/SearchController.php',
            method: 'GET',
            data: { action: 'search', search, table: 'sanpham', page },
            dataType: 'JSON',
            success: products => resolve(products),
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}

function handleSearchAdminProduct() {
    $(document).on('keyup', '.admin-search-info', async e => {
        const products = await searchAdminProduct(e.target.value.toLowerCase())
        renderAdminProductTable(products)
    })
}