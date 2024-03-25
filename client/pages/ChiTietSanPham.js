$(document).ready(() => {
    renderAdminProductDetail()
    renderProductDetail()
    addProductDetailExecute()
    renderUpdateProductDetail()
    updateProductDetail()
})

function getProductDetailData(productId) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/CTSanPhamController.php',
            method: 'POST',
            data: { action: 'get-data', productId },
            dataType: 'JSON',
            success: data => {
                if (data && data.length > 0) {
                    resolve(data)
                } else {
                    resolve([])
                }
            },
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}

function getProductDetail(productDetailId) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/CTSanPhamController.php',
            method: 'POST',
            data: { action: 'get', productDetailId },
            dataType: 'JSON',
            success: data => {
                if (data) {
                    resolve(data)
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

function renderAdminProductDetail() {
    let productId = $('#admin-product-detail-main #product-id').val()

    if (productId) {
        productId = productId.toUpperCase().trim()
        renderProductName(productId)

        getProductDetailData(productId)
            .then(data => {
                let html = ''
                data.forEach((item, index) => {
                    html += `
                        <tr>
                            <td>
                                <span class="custom-checkbox">
                                    <input type="checkbox" id="checkbox-${item.ma_ctsp}" name="chk[]" value="${item.ma_ctsp}">
                                    <label for="checkbox-${item.ma_ctsp}"></label>
                                </span>
                            </td>
                            <td>${item.ma_ctsp}</td>
                            <td class="product-detail-cpu-name-${index}"></td>
                            <td class="product-detail-color-name-${index}"></td>
                            <td class="product-detail-gpu-name-${index}"></td>
                            <td>${item.ram.toUpperCase()}</td>
                            <td>${item.rom.toUpperCase()}</td>
                            <td class="d-flex justify-content-center"">
                                <ul class="product-detail-${index}" style="width: fit-content;">
                                    
                                </ul>
                            </td>
                            <td>${item.gia_tien}</td>
                            <td>
                                <a href="#editProductDetailModal" class="edit btn-update-product-detail-modal" data-toggle="modal" data-id=${item.ma_ctsp}>
                                    <i class="material-icons" data-toggle="tooltip" title="Sửa thông tin">&#xE254;</i>
                                </a>
                                <a href="#deleteProductModal" class="delete" data-toggle="modal" data-id=${item.ma_ctsp}>
                                    <i class="material-icons" data-toggle="tooltip" title="Xóa">&#xE872;</i>
                                </a>
                            </td>
                        </tr>
                    `

                    renderColorName(item.ma_mau, index)
                    renderCPUName(item.ma_chip_xu_ly, index)
                    renderGPUName(item.ma_carddohoa, index)
                    renderProductDetailPlug(item.ma_ctsp, index)
                })

                if (html) {
                    $('.admin-product-detail-list').html(html)
                } else {
                    $('.admin-product-detail-list').html('')
                }
            })
            .catch(error => console.log(error))
    } else {
        $('.admin-product-detail-list').html('')
    }
}

function renderProductDetail() {
    $('.btn-search-product-detail').on('click', e => {
        renderAdminProductDetail()
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
                            .then(data => resolve(data))
                            .catch(error => reject(error))

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

function renderUpdateProductDetail() {
    $(document).on('click', '.btn-update-product-detail-modal', e => {
        const productDetailId = e.target.closest('.btn-update-product-detail-modal').dataset.id

        getProductDetail(productDetailId)
            .then(data => {
                $('#editProductDetailModal .product-detail-id').text(data.ma_ctsp)
                $('#editProductDetailModal #product-cpu').val(data.ma_chip_xu_ly)
                $('#editProductDetailModal #product-ram').val(data.ram.toLowerCase())
                $('#editProductDetailModal #product-rom').val(data.rom.toLowerCase())
                $('#editProductDetailModal #product-gpu').val(data.ma_carddohoa)
                $('#editProductDetailModal #product-color').val(data.ma_mau)

                getProductDetailPlug(data.ma_ctsp)
                    .then(plugs => {
                        const plugIds = plugs.map(plug => plug.ma_cong)
                        $('#editProductDetailModal #product-plug').val(plugIds)
                        $('#editProductDetailModal #product-plug').selectpicker('refresh')
                    })
                    .catch(error => console.log(error))
            })
            .catch(error => console.log(error))
    })
}

function validateEmpty(productDetail) {
    if (!productDetail.productId) {
        alert('Vui lòng nhập mã sản phẩm')
        $('.modal').modal('hide')
        $('#admin-product-detail-main #product-id').focus()
        return false
    }
    if (!productDetail.cpuId) {
        alert('Vui lòng chọn CPU')
        $('#editProductDetailModal #product-cpu').focus()
        return false
    }
    if (!productDetail.gpuId) {
        alert('Vui lòng chọn card đồ họa')
        $('#editProductDetailModal #product-gpu').focus()
        return false
    }
    if (productDetail.plugs.length === 0) {
        alert('Vui lòng chọn cổng kết nối')
        $('#editProductDetailModal #product-plug').focus()
        return false
    }
    return true
}

function addProductDetailExecute() {
    $(document).on('click', '.btn-add-product-detail', () => {
        const productDetail = {
            productId: $('#admin-product-detail-main #product-id').val() !== null ? $('#admin-product-detail-main #product-id').val().toUpperCase() : null,
            colorId: $('#addProductDetailModal #product-color').val(),
            cpuId: $('#addProductDetailModal #product-cpu').val(),
            ram: $('#addProductDetailModal #product-ram').val().toUpperCase(),
            rom: $('#addProductDetailModal #product-rom').val().toUpperCase(),
            gpuId: $('#addProductDetailModal #product-gpu').val(),
            plugs: $('#addProductDetailModal #product-plug').val()
        }

        if (!validateEmpty(productDetail)) {
            return
        }

        addProductDetail(productDetail, productDetail.productId, productDetail.plugs)
            .then(data => {
                if (data === 'success') {
                    alert('Thêm chi tiết sản phẩm thành công')
                    $('#addProductDetailModal').modal('hide')
                    renderAdminProductDetail()
                } else {
                    alert('Xảy ra lỗi trong quá trình thêm chi tiết sản phẩm')
                }
            })
            .catch(error => console.log(error))
    })
}

function updateProductDetail() {
    $(document).on('click', '.btn-update-product-detail', e => {
        const productDetail = {
            productId: $('#admin-product-detail-main #product-id').val().toUpperCase(),
            productDetailId: $('#editProductDetailModal .product-detail-id').text(),
            colorId: $('#editProductDetailModal #product-color').val(),
            cpuId: $('#editProductDetailModal #product-cpu').val(),
            ram: $('#editProductDetailModal #product-ram').val().toUpperCase(),
            rom: $('#editProductDetailModal #product-rom').val().toUpperCase(),
            gpuId: $('#editProductDetailModal #product-gpu').val(),
            plugs: $('#editProductDetailModal #product-plug').val()
        }

        if (!validateEmpty(productDetail)) {
            return
        }

        $.ajax({
            url: 'server/src/controller/CTSanPhamController.php',
            method: 'POST',
            data: { action: 'update', productDetail },
            success: data => {
                if (data === 'success') {
                    alert('Cập nhật chi tiết sản phẩm thành công')
                    $('#editProductDetailModal').modal('hide')
                    renderAdminProductDetail()
                } else {
                    alert('Xảy ra lỗi trong quá trình cập nhật chi tiết sản phẩm')
                }
            },
            error: (xhr, status, error) => {
                console.log(error)
            }
        })
    })
}