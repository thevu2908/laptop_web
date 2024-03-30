$(document).ready(() => {
    loadBrandData()
    handleAddBrand()
    renderDeleteBrandModal()
    handleDeleteBrand()
})

function loadBrandData() {
    $.ajax({
        url: 'server/src/controller/ThuongHieuController.php',
        method: 'POST',
        data: { action: 'load' },
        dataType:'JSON',
        success: brands => {
            let html = ''
            if (brands && brands.length > 0) {
                brands.forEach((brand, index) => {
                    html += `<option value="${brand.ma_thuong_hieu}">${brand.ten_thuong_hieu}</option>`
                })

                $('#admin-product-main #product-brand').html(html)
            }
        },
        error: (jqXHR, textStatus, error) => console.log(error)
    })
}

function addBrand(brandName) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/ThuongHieuController.php',
            method: 'POST',
            data: { action: 'add', brandName },
            success: res => {
                if (res === 'success') {
                    resolve(true)
                } else {
                    reject(false)
                }
            },
            error: (jqXHR, textStatus, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}

function handleAddBrand() {
    $(document).on('click', '.btn-add-brand', e => {
        const brandName = $('#product-brand-name').val()

        if (!brandName) {
            alert('Vui lòng nhập tên thương hiệu')
            return
        }

        addBrand(brandName)
            .then(res => {
                if (res) {
                    alert('Thêm thương hiệu thành công')
                    $('#addProductBrandModal').modal('hide')
                    $('.add-product-brand-form').trigger('reset')
                    loadBrandData()
                } else {
                    alert('Thêm thương hiệu thất bại')
                    console.log(res)
                }
            })
            .catch(error => console.log(error))

    })
}

function deleteBrand(brandId) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/ThuongHieuController.php',
            method: 'POST',
            data: { action: 'delete', brandId },
            success: res => {
                if (res === 'success') {
                    resolve(true)
                } else {
                    reject(false)
                }
            },
            error: (jqXHR, textStatus, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}

function handleDeleteBrand() {
    $(document).on('click', '.btn-delete-brand', e => {
        const brandId = $('#admin-product-main #product-brand').val()

        deleteBrand(brandId)
            .then(res => {
                if (res) {
                    alert('Xóa thương hiệu thành công')
                    $('#deleteProductBrandModal').modal('hide')
                    loadBrandData()
                } else {
                    alert('Xóa thương hiệu thất bại')
                }
            })
            .catch(error => console.log(error))
    })
}

function getBrand(brandId) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/ThuongHieuController.php',
            method: 'POST',
            data: { action: 'get', brandId },
            dataType: 'JSON',
            success: brand => resolve(brand),
            error: (jqXHR, textStatus, error) => {
                console.log(error)
                reject(error)
            }
        })
    })

}

function renderDeleteBrandModal() {
    $(document).on('click', '.btn-open-delete-brand-modal', e => {
        const brandId = $('#admin-product-main #product-brand').val()

        getBrand(brandId)
            .then(brand => {
                if (brand) {
                    const html = `
                        <p>
                            Bạn có chắc chắn muốn xóa thương hiệu
                            "<b class="delete-brand-id">${brand.ten_thuong_hieu}</b>"
                            không ?
                        </p>
                        <p class="text-warning"><small>Hành động này sẽ không thể hoàn tác</small></p>
                    `

                    $('.brand-confirm-delete').html(html)
                }
            })
            .catch(error => console.log(error))
    })
}

function renderBrandName(brandId, index) {
    getBrand(brandId)
        .then(brand => {
            if (brand) {
                $(`.admin-product-type-name-${index}`).append(brand.ten_thuong_hieu)
            }
        })
        .catch(error => console.log(error))
}

function getBrandId(name) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/ThuongHieuController.php',
            method: 'POST',
            data: { action: 'get-id', name },
            dataType: 'JSON',
            success: id => {
                resolve(id)
            },
            error: (jqXHR, textStatus, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}

async function handleImportBrand(name) {
    try {
        let id = await getBrandId(name)
        if (!id) {
            const res = await addBrand(name)
            if (res) {
                id = await getBrandId(name)
            }
        }
        return id
    } catch (error) {
        console.log(error)
        return null
    }
}