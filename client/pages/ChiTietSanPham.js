$(document).ready(() => {
    renderAdminProductDetail()
    renderProductDetail()
    handleAddProductDetail()
    renderDeleteProductDetailModal()
    handleDeleteProductDetail()
    searchProductDetail()
})

function getProductDetailData(productId) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/CTSanPhamController.php',
            method: 'POST',
            data: { action: 'get-data', productId },
            dataType: 'JSON',
            success: productDetails => {
                if (productDetails && productDetails.length > 0) {
                    resolve(productDetails)
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
                            <td class="product-detail-color-name-${index}"></td>
                            <td class="product-detail-cpu-name-${index}"></td>
                            <td class="product-detail-gpu-name-${index}"></td>
                            <td>${item.ram.toUpperCase()}</td>
                            <td>${item.rom.toUpperCase()}</td>
                            <td class="d-flex justify-content-center"">
                                <ul class="product-detail-${index} mb-0" style="width: fit-content;">
                                    
                                </ul>
                            </td>
                            <td>${item.gia_tien}</td>
                            <td>${item.so_luong}</td>
                            <td>
                                <a href="#deleteProductDetailModal" class="delete btn-delete-product-detail-modal" data-toggle="modal" data-id=${item.ma_ctsp}>
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
                if (!productDetailId.startsWith('CTSP')) {
                    console.log(productDetailId)
                    resolve(false)
                } else {
                    let promises = []

                    plugs.forEach(plugId => {
                        let promise = addChiTietCong(plugId, productDetailId)
                            .then(data => resolve(data))
                            .catch(error => reject(error))

                        promises.push(promise)
                    })

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

function handleAddProductDetail() {
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

        if (!validateProductDetailEmpty(productDetail)) {
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

function validateProductDetailEmpty(productDetail) {
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

function renderDeleteProductDetailModal() {
    $(document).on('click', '.btn-delete-product-detail-modal', e => {
        const productDetailId = e.target.closest('.btn-delete-product-detail-modal').dataset.id

        if (productDetailId) {
            getProductDetail(productDetailId)
                .then(productDetail => {
                    const html = `
                        <p>Bạn có chắc chắn muôn xóa chi tiết sản phẩm có mã "<b class="product-detail-id">${productDetail.ma_ctsp}</b>" không ?</p>
                        <p class="text-warning"><small>Hành động này sẽ không thể hoàn tác</small></p>
                    `
                    $('#deleteProductDetailModal .confirm-delete').html(html)
                })
                .catch(error => console.log(error))
        }
    })

    $('.btn-delete-checked-product-detail-modal').on('click', () => {
        const html = `
            <p>Bạn có chắc muốn xóa các chi tiết sản phẩm được chọn không ?</p>
            <p class="text-warning"><small>Hành động này sẽ không thể hoàn tác</small></p>
        `
        $('#deleteProductDetailModal .confirm-delete').html(html)
    })
}

function deleteProductDetail(productDetailId) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/CTSanPhamController.php',
            method: 'POST',
            data: { action: 'delete', productDetailId },
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

function handleDeleteProductDetail() {
    $(document).on('click', '.btn-delete-product-detail', () => {
        const productDetailId = $('#deleteProductDetailModal .product-detail-id').text()

        if (productDetailId) {
            deleteProductDetail(productDetailId)
                .then(result => {
                    if (result) {
                        alert('Xóa chi tiết sản phẩm thành công')
                        $('#deleteProductDetailModal').modal('hide')
                        renderAdminProductDetail()
                    } else {
                        alert('Xảy ra lỗi trong quá trình xóa chi tiết sản phẩm')
                    }
                })
                .catch(error => console.log(error))
        } else {
            let checkedProductDetails = []
            const firstCheckInputElement = document.querySelector('table.table thead input[type=checkbox]')
            const checkInputElements = document.querySelectorAll('.admin-product-detail-list input[name="chk[]"]')

            checkInputElements.forEach(item => {
                if (item.checked) {
                    checkedProductDetails.push(item.value)
                }
            })

            if (checkedProductDetails.length > 0) {
                let promises = []

                checkedProductDetails.forEach(productDetailId => promises.push(deleteProductDetail(productDetailId)))

                Promise.all(promises).then(results => {
                    if (results.includes(false)) {
                        alert('Xảy ra lỗi trong quá trình xóa các chi tiết sản phẩm')
                    } else {
                        alert('Đã xóa sản phẩm các chi tiết sản phẩm được chọn')
                        firstCheckInputElement.checked = false
                        renderAdminProductDetail()
                    }
                })
            } else {
                alert('Không có chi tiết sản phẩm nào được chọn\nVui lòng check vào ô các chi tiết sản phẩm muốn xóa')
            }

            $('#deleteProductDetailModal').modal('hide')
        }
    })
}

function getProductDetailByProductId(productId) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/CTSanPhamController.php',
            method: 'POST',
            data: { action: 'get-by-product-id', productId },
            dataType: 'JSON',
            success: productDetails => resolve(productDetails),
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })

}

function searchProductDetail() {
    $(document).on('keyup', '.admin-search-info', e => {
        const info = e.target.value.toLowerCase()

        $('.admin-product-detail-table tr').each(function(index) {
            if (index !== 0) {
                $row = $(this)

                const tdElement = $row.find('td')
                const id = tdElement[1].innerText.toLowerCase()
                const color = tdElement[2].innerText.toLowerCase()
                const cpu = tdElement[3].innerText.toLowerCase()
                const gpu = tdElement[4].innerText.toLowerCase()
                const ram = tdElement[5].innerText.toLowerCase()
                const rom = tdElement[6].innerText.toLowerCase()
                const plug = tdElement[7].innerText.toLowerCase()
                const quantity = tdElement[9].innerText.toLowerCase()

                const matchId = id.indexOf(info)
                const matchCPU = cpu.indexOf(info)
                const matchColor = color.indexOf(info)
                const matchGPU = gpu.indexOf(info)
                const matchRam = ram.indexOf(info)
                const matchRom = rom.indexOf(info)
                const matchPlug = plug.indexOf(info)
                const machQuantity = quantity.indexOf(info)


                if (matchId < 0 && matchCPU < 0 && matchColor < 0 && matchGPU < 0 && matchRam < 0 && matchRom < 0 && matchPlug < 0 && machQuantity < 0) {
                    $row.hide()
                } else {
                    $row.show()
                }
            }
        })
    })
}