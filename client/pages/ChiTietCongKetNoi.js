function addChiTietCong(plugId, productDetailId) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/CTCongKetNoiController.php',
            method: 'POST',
            data: { action: 'add', plugId, productDetailId },
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

function getProductDetailPlug(productDetailId) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/CTCongKetNoiController.php',
            method: 'POST',
            data: { action: 'get', productDetailId },
            dataType: 'JSON',
            success: data => {
                if (data && data.length > 0) {
                    resolve(data)
                }
            },
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}

function getProductPlugs(productId) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/CTCongKetNoiController.php',
            method: 'POST',
            data: { action: 'get-plug', productId },
            dataType: 'JSON',
            success: plugs => resolve(plugs),
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}

function renderProductDetailPlug(productDetailId, index) {
    getProductDetailPlug(productDetailId)
        .then(data => {
            const html = data.map(data => `<li>${data.ten_cong}</li>`).join('')
            $(`#admin-product-detail-main .product-detail-${index}`).html(html)
        })
        .catch(error => console.log(error))
}