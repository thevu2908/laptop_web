$(document).ready(() => {
    renderAdminProductTable()
    handleAddProduct()
    renderUpdateProduct()
    handleUpdateProduct()
    toAdminProductDetail()
    renderDeleteProductModal()
    handleDeleteProduct()
    importExcel()
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

function renderProductName(productId) {
    getProduct(productId)
        .then(product => {
            $('#admin-product-detail-main .product-name').text(product.ten_sp)
        })
}

function renderAdminProductTable() {
    getProductData()
        .then(data => {
            let html = ''

            if (data) {
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
                                <a href="#deleteProductModal" class="delete btn-delete-product-modal" data-toggle="modal" data-id=${item.ma_sp}>
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
            }

            $('.admin-product-list').html(html)
        })
        .catch(error => console.log(error))
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
    
                    Promise.all(promises).then(results => {
                        if (results.includes(false)) resolve(false) 
                        else resolve(true)
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

function importExcel() {
    $('#admin-product-main #import-excel-file').on('change', e => {
        const file = e.target.files[0]
        const reader = new FileReader()

        reader.onload = e => {
            const data = new Uint8Array(e.target.result)
            const workbook = XLSX.read(data, { type: 'array' })
            const sheetName = workbook.SheetNames[0]
            const sheet = workbook.Sheets[sheetName]
            const range = XLSX.utils.decode_range(sheet['!ref'])

            let promises = []
            let products = []
            const titles = [
                'productName', 'origin', 'brandId', 'typeId', 'weight', 'colors', 'material', 'cpus', 
                'rams', 'roms', 'screen', 'resolution', 'gpus', 'plugs', 'keyboard', 'battery', 'osId'
            ]

            for (let  i = range.s.r + 1; i <= range.e.r; i++) {
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
            
            products.forEach(product => {
                let brandPromise = getBrandId(product.brandId).then(brandId => product.brandId = brandId)
                let typePromise = getTypeId(product.typeId).then(typeId => product.typeId = typeId)
                let osPromise = getOSId(product.osId).then(osId => product.osId = osId)
                let colorPromises = []
                let cpuPromises = []
                let gpuPromises = []
                let plugPromises = []

                product.colors.forEach((colorName, index) => {
                    let colorPromise = getColorId(colorName).then(colorId => product.colors[index] = colorId)
                    colorPromises.push(colorPromise)
                })

                product.cpus.forEach((cpuName, index) => {
                    let cpuPromise = getCPUId(cpuName).then(cpuId => product.cpus[index] = cpuId)
                    cpuPromises.push(cpuPromise)
                })

                product.gpus.forEach((gpuName, index) => {
                    let gpuPromise = getGPUId(gpuName).then(gpuId => product.gpus[index] = gpuId)
                    gpuPromises.push(gpuPromise)
                })

                product.plugs.forEach((plugName, index) => {
                    let plugPromise = getPlugId(plugName).then(plugId => product.plugs[index] = plugId)
                    plugPromises.push(plugPromise)
                })

                promises.push(brandPromise, typePromise, colorPromises, osPromise, cpuPromises, gpuPromises, plugPromises)
            })
            
            Promise.all(promises).then(res => {
                if (!res.includes(false)) {
                    promises = []
                    products.forEach(product => promises.push(addProduct(product)))

                    Promise.all(promises).then(results => {
                        if (results.includes(false)) {
                            alert('Xảy ra lỗi trong quá trình thêm sản phẩm vào hệ thống từ file excel\nVui lòng kiểm tra lại định dạng và thông tin của file excel')
                        } else {
                            alert('Thêm các sản phẩm từ file excel thành công')
                            $('form').trigger('reset')
                            renderAdminProductTable()
                        }
                    })
                } else {
                    alert('Xảy ra lỗi trong quá trình thêm sản phẩm vào hệ thống từ file excel\nVui lòng kiểm tra lại định dạng và thông tin của file excel')
                }
            })
        }
 
        reader.readAsArrayBuffer(file)
    })
}

function getCellValue(sheet, row, column) {
    const cellAddress = XLSX.utils.encode_cell({ r: row, c: column })
    const cell = sheet[cellAddress]
    return cell ? cell.v : ''
}