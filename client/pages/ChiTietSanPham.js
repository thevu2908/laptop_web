function getProductDetailData() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/CTSanPhamController.php',
            method: 'POST',
            data: { action: 'get-data' },
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

function addProductDetail(productDetail, productId, plugs) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/CTSanPhamController.php',
            method: 'POST',
            data: { action: 'add', productDetail, productId },
            success: productDetailId => {
                if (!productDetailId) {
                    resolve(null)
                } else {
                    let promises = []

                    plugs.forEach(plugId => {
                        let promise = addChiTietCong(plugId, productDetailId)
                            .then(data => {
                                resolve(data)
                            })
                            .catch(error => {
                                reject(error)
                            })

                        promises.push(promise)
                    })

                    Promise.all(promises).then(results => {
                        if (results.includes(false)) {
                            resolve('error')
                        } else {
                            resolve('success')
                        }
                    })
                }
            },
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}