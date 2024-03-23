$(document).ready(() => {
    renderAdminProductTable()
    addProduct()
    renderUpdateProduct()
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
                    <td>${item.chiet_khau}</td>
                    <td>${item.gia_ban}</td>
                    <td>${item.so_luong_ton}</td>
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
                
            })
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
    if (!product.weight) {
        alert('Vui lòng nhập trọng lượng sản phẩm')
        $('#product-weight').focus()
        return false
    }
    if (product.colors.length === 0) {
        alert('Vui lòng chọn màu sắc sản phẩm')
        $('#product-color').focus()
        return false
    }
    if (!product.material) {
        alert('Vui lòng nhập chất liệu sản phẩm')
        $('#product-material').focus()
        return false
    }
    if (product.cpus.length === 0) {
        alert('Vui lòng chọn CPU')
        $('#product-cpu').focus()
        return false
    }
    if (product.rams.length === 0) {
        alert('Vui lòng chọn RAM')
        $('#product-ram').focus()
        return false
    }
    if (product.roms.length === 0) {
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
    if (product.gpus.length === 0) {
        alert('Vui lòng chọn card đồ họa')
        $('#product-gpu').focus()
        return false
    }
    if (product.plugs.length === 0) {
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

function saveImage() {
    return new Promise((resolve, reject) => {
        const fileInput = document.querySelector('#product-image')
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

        saveImage().then(res => {
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

function ToAdminProductDetail() {
    $(document).on('click', '.btn-to-product-detail', e => {
        window.location.href = '/admin.php?controller=chitietsanpham&id='
    })
}