$(document).ready(() => {
    renderAdminProductDetail(null)
    clickPage(renderAdminProductDetail)
    renderProductDetail()
    handleAddProductDetail()
    renderUpdateProductDetailModal()
    handleUpdateProductDetailPrice()
    renderDeleteProductDetailModal()
    handleDeleteProductDetail()
    searchProductDetail()
})

function getProductDetails(productId) {
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

function getPaginationProductDetails(productId) {
    return new Promise((resolve, reject) => {
        const page = $('#currentpage').val()
        $.ajax({
            url: 'server/src/controller/PaginationController.php',
            method: 'GET',
            data: { action: 'pagination', table: 'chitietsanpham', page, id: productId, limit: 3 },
            dataType: 'JSON',
            success: productDetails => resolve(productDetails),
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
            success: productDetail => resolve(productDetail),
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}

async function renderAdminProductDetail(data) {
    let productId = $('#admin-product-detail-main #product-id').val()

    if (productId) {
        productId = productId.toUpperCase().trim()
        renderProductName(productId)

        const productDetails = data ? data : await getPaginationProductDetails(productId)

        if (productDetails && productDetails.pagination && productDetails.pagination.length > 0) {
            let html = ''
            productDetails.pagination.forEach((productDetail, index) => {
                html += `
                    <tr>
                        <td>
                            <span class="custom-checkbox">
                                <input type="checkbox" id="checkbox-${productDetail.ma_ctsp}" name="chk[]" value="${productDetail.ma_ctsp}">
                                <label for="checkbox-${productDetail.ma_ctsp}"></label>
                            </span>
                        </td>
                        <td>${productDetail.ma_ctsp}</td>
                        <td>${productDetail.ten_mau}</td>
                        <td>${productDetail.ten_chip}</td>
                        <td>${productDetail.ten_card}</td>
                        <td>${productDetail.ram.toUpperCase()}</td>
                        <td>${productDetail.rom.toUpperCase()}</td>
                        <td class="d-flex justify-content-center"">
                            <ul class="product-detail-${index} mb-0" style="width: fit-content;">
                                
                            </ul>
                        </td>
                        <td>${formatCurrency(productDetail.gia_nhap)}</td>
                        <td>${productDetail.chiet_khau}</td>
                        <td>${formatCurrency(productDetail.gia_tien)}</td>
                        <td>${productDetail.so_luong}</td>
<<<<<<< HEAD
=======
                        
>>>>>>> 82a437012b574acf9a4997e6473098f826169dc2
                        <td class="d-flex">
                            <a href="#editProductDetailModal" class="edit btn-update-product-detail-modal" data-toggle="modal" data-id=${productDetail.ma_ctsp}>
                                <i class="material-icons" data-toggle="tooltip" title="Sửa thông tin">&#xE254;</i>
                            </a>
                            <a href="#deleteProductDetailModal" class="delete btn-delete-product-detail-modal" data-toggle="modal" data-id=${productDetail.ma_ctsp}>
                                <i class="material-icons" data-toggle="tooltip" title="Xóa">&#xE872;</i>
                            </a>
                            <a href="/admin.php?controller=danhgia&id=${productDetail.ma_ctsp}" class="info btn-product-detail" data-id=${productDetail.ma_ctsp}>
                                <i class="fa-solid fa-circle-info" title="Xem đánh giá" ></i>
                            </a>
                        </td>
                    </tr>
                `

                renderProductDetailPlug(productDetail.ma_ctsp, index)
            })

            $('.admin-product-detail-list').html(html)
            totalPage(productDetails.count, 3)
        } else {
            $('.admin-product-detail-list').html('')
        }
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
    if (productDetail.plugs.length === 0) {
        alert('Vui lòng chọn cổng kết nối')
        $('#addProductDetailModal #product-plug').focus()
        return false
    }
    return true
}

function renderUpdateProductDetailModal() {
    $(document).on('click', '.btn-update-product-detail-modal', async e => {
        const id = e.target.closest('.btn-update-product-detail-modal').dataset.id
        const productDetail = await getProductDetail(id)

        if (productDetail) {
            $('#editProductDetailModal .product-detail-id').text(productDetail.ma_ctsp)
            $('#product-detail-import-price').val(productDetail.gia_nhap)
            $('#product-detail-chietkhau').val(productDetail.chiet_khau)
            $('#product-detail-price').val(productDetail.gia_tien)
        }
    })
}

function updateProductDetaiPrice(productDetailId, chietkhau, price) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/CTSanPhamController.php',
            method: 'POST',
            data: { action: 'update-price', productDetailId, chietkhau, price },
            success: res => {
                if (res === 'success') {
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

function handleUpdateProductDetailPrice() {
    $(document).on('click', '.btn-update-product-detail', async e => {
        const productDetailId = $('#editProductDetailModal .product-detail-id').text()
        const chietkhau = $('#product-detail-chietkhau').val()
        const price = $('#product-detail-price').val()

        if (productDetailId && chietkhau && price) {
            const res = await updateProductDetaiPrice(productDetailId, chietkhau, price)
            if (res) {
                alert('Cập nhật giá thành công')
                $('#editProductDetailModal').modal('hide')
                renderAdminProductDetail()
            } else {
                alert('Xảy ra lỗi trong quá trình cập nhật giá')
            }
        }
    })
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
        const search = e.target.value.toLowerCase()
        const page = $('#currentpage').val()
        const productId = $('#admin-product-detail-main #product-id').val() ? $('#admin-product-detail-main #product-id').val().toUpperCase().trim() : ''

        $.ajax({
            url: 'server/src/controller/SearchController.php',
            method: 'GET',
            data: { action: 'search', search, table: 'chitietsanpham', page, id: productId },
            dataType: 'JSON',
            success: productDetails => renderAdminProductDetail(productDetails),
            error: (xhr, status, error) => console.log(error)
        })
    })
}