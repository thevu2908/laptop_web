$(document).ready(() => {
    handleEventRenderSearchSuggest()
})

function getSearchSuggestProduct(search) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/SanPhamController.php',
            method: 'GET',
            data: { action: 'search', search, limit: 2 },
            dataType: 'JSON',
            success: products => resolve(products),
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}

async function renderSearchSuggest(search, searchSuggest) {
    const products = await getSearchSuggestProduct(search)
    const suggestLeft = searchSuggest.find('.suggest-left')
    const suggestRight = searchSuggest.find('.suggest-right')

    if (products && products.pagination && products.pagination.length > 0) {
        let leftHtml = ''
        let rightHtml = ''
        for (let product of products.pagination) {
            const productDetails = await getProductDetailByProductId(product.ma_sp)
            const productDetail = productDetails[0]

            leftHtml += `<li><a href="index.php?tim-kiem=${product.ten_sp.toLowerCase()}">${product.ten_sp.toLowerCase()}</a></li>`
            rightHtml += `
                <li>
                    <a href="index.php?san-pham&id=${product.ma_sp}">
                        <div class="product-item">
                            <div class="product-item__img me-2">
                                <img src="${product.hinh_anh}">
                            </div>
                            <div class="product-item__info">
                                <h3 class="product-item__name">${product.ten_sp} ${productDetail.ram.toUpperCase()}/${productDetail.rom.toUpperCase()}</h3>
                                <div class="product-item__price">
                                    ${product.so_luong_ton > 0 ? `₫${formatCurrency(productDetail.gia_tien)}` : 'Tạm hết hàng'}
                                    <del>${formatCurrency(productDetail.gia_tien)}</del>
                                </div>
                            </div>
                        </div>
                    </a>
                </li>
            `
        }
        suggestLeft.find('ul').html(leftHtml)
        suggestRight.find('ul').html(rightHtml)
    } else {
        searchSuggest.find('.suggest-empty').css('display', 'block')
        suggestLeft.css('display', 'none')
        suggestRight.css('display', 'none')
    }
}

function handleEventRenderSearchSuggest() {
    const overSuggest = $('.over-suggest')
    const searchSuggest = $('.search-suggest-container')
    $('.header .search-input').on('input', e => {
        e.stopPropagation()
        const search = e.target.value
        
        if (search.length > 0) {
            $('.search-suggest-container').css('display', 'flex')
            overSuggest.css('opacity', '1')
            overSuggest.css('visibility', 'visible')
            renderSearchSuggest(search, searchSuggest)
        } else {
            $('.search-suggest-container').css('display', 'none')
            overSuggest.css('opacity', '0')
            overSuggest.css('visibility', 'hidden')
        }
    })
    $('.header .search-input').on('click', e => {
        e.stopPropagation()
        const search = e.target.value

        if (search.length > 0) {
            $('.search-suggest-container').css('display', 'flex')
            overSuggest.css('opacity', '1')
            overSuggest.css('visibility', 'visible')
            renderSearchSuggest(search, searchSuggest)
        } else {
            $('.search-suggest-container').css('display', 'none')
            overSuggest.css('opacity', '0')
            overSuggest.css('visibility', 'hidden')
        }
    })
}