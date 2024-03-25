$(document).ready(() => {
    renderAdminProductTable()
    addProduct()
    renderUpdateProduct()
    updateProduct()
    toAdminProductDetail()
})

function getProductData() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/SanPhamController.php',
            method: 'POST',
            data: { action: 'get-data' },
            dataType: 'JSON',
            success: data => {
                if (data && data.length > 0) {
                    resolve(data);
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
            success: data => {
                if (data) {
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

function renderProductName(productId) {
    getProduct(productId)
        .then(product => {
            $('#admin-product-detail-main .product-name').text(product.ten_sp)
        })
}

function renderAdminProductTable() {
    getProductData().then(data => {
        let html = ''

        data.forEach((item, index) => {
            html += `
                <tr>
                    <td>
                        <span class="custom-checkbox">
                            <input type="checkbox" id="checkbox-${item.ma_sp}" name="chk[]" value="${item.ma_sp}">
                            <label for="checkbox-${item.ma_sp}"></label>
                        </span>
                    </td>
                    <td>${item.ma_sp}</td>
                    <td>${item.ten_sp}</td>
                    <td class="admin-product-type-name-${index}"></td>
                    <td>${item.gia_nhap}</td>
                    <td style="text-align: center;">${item.chiet_khau}</td>
                    <td>${item.gia_ban}</td>
                    <td style="text-align: center;">${item.so_luong_ton}</td>
                    <td>
                        <a href="#editProductModal" class="edit btn-update-product-modal" data-toggle="modal" data-id=${item.ma_sp}>
                            <i class="material-icons" data-toggle="tooltip" title="Sửa thông tin">&#xE254;</i>
                        </a>
                        <a href="#deleteProductModal" class="delete" data-toggle="modal" data-id=${item.ma_sp}>
                            <i class="material-icons" data-toggle="tooltip" title="Xóa">&#xE872;</i>
                        </a>
                        <a href="#viewProductModal" class="view" title="View" data-toggle="tooltip" data-id=${item.ma_sp}>
                            <i class="material-icons">&#xE417;</i>
                        </a>
                    </td>
                </tr>
            `

            showBrandName(item.ma_thuong_hieu, index)
        })

        $('.admin-product-list').html(html)
    })
}

function renderUpdateProduct() {
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

function validateEmpty(product) {
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

function saveImage(fileInput) {
    return new Promise((resolve, reject) => {
        const file = fileInput.files[0]

        const formData = new FormData()
        formData.append('action', 'save-image')
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

function addProduct() {
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

        if (!validateEmpty(product)) {
            return
        }

        saveImage(document.querySelector('#addProductModal #product-image'))
            .then(res => {
                if (res !== 'success') {
                    alert(res)
                    return
                }

                $.ajax({
                    url: 'server/src/controller/SanPhamController.php',
                    method: 'POST',
                    data: { action: 'add', product },
                    success: productId => {
                        if (!productId) {
                            alert('Xảy ra lỗi trong quá trình thêm sản phẩm')
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

                            productDetails.forEach(productDetail => {
                                let promise = new Promise((resolve, reject) => {
                                    addProductDetail(productDetail, productId, product.plugs)
                                        .then(result => {
                                            if (result === 'success') {
                                                resolve(true)
                                            } else {
                                                resolve(false)
                                            }
                                        })
                                        .catch(error => {
                                            console.log(error)
                                            reject(error)
                                        })
                                })

                                promises.push(promise)
                            })

                            Promise.all(promises).then(results => {
                                if (results.includes(false)) {
                                    alert('Xảy ra lỗi trong quá trình thêm sản phẩm');
                                } else {
                                    alert('Thêm sản phẩm thành công');
                                    $('form').trigger('reset');
                                    $('#addProductModal').modal('hide');
                                    renderAdminProductTable();
                                }
                            })
                        }
                    },
                    error: (xhr, status, error) => {
                        console.log(error)
                    }
                })
            })
    })
}

function updateProduct() {
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

        if (!validateEmpty(product)) {
            return
        }

        saveImage(document.querySelector('#editProductModal #product-image'))
            .then(res => {
                if (res !== 'success' && res !== 'no image updated') {
                    alert(res)
                    return
                }

                $.ajax({
                    url: 'server/src/controller/SanPhamController.php',
                    method: 'POST',
                    data: { action: 'update', product },
                    success: data => {
                        if (data === 'success') {
                            alert('Cập nhật sản phẩm thành công')
                            $('#editProductModal').modal('hide')
                            renderAdminProductTable()
                        } else {
                            alert('Xảy ra lỗi trong quá trình cập nhật sản phẩm')
                        }
                    },
                    error: (xhr, status, error) => {
                        console.log(error)
                    }
                })
            })
    })
}

function toAdminProductDetail() {
    $(document).on('click', '.btn-to-product-detail', e => {
        const productId = $('#editProductModal .product-id').text()
        window.location.href = `/admin.php?controller=chitietsanpham&id=${productId}`
    })
}