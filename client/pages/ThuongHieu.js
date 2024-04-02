$(document).ready(() => {
    renderAdminBrand()
    renderMoreBrand()
    handleAddBrand()
    renderDeleteBrandModal()
    handleDeleteBrand()
})

function getBrandData() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/ThuongHieuController.php',
            method: 'POST',
            data: { action: 'load' },
            dataType: 'JSON',
            success: brands => resolve(brands),
            error: (jqXHR, textStatus, error) => {
                console.log(error)
                reject(error)
            }
        })
    })

}

async function renderAdminBrand() {
    const brands = await getBrandData()
    if (brands && brands.length > 0) {
        let html = ''
        brands.forEach(brand => html += `<option value="${brand.ma_thuong_hieu}">${brand.ten_thuong_hieu}</option>`)
        $('#admin-product-main #product-brand').html(html)
    }
}

async function renderFilterBrand() {
    const brands = await getBrandData()
    if (brands && brands.length > 0) {
        let html = `
            <h5>Hãng sản xuất</h5>
            <div class="filter-list row">
                <div class="filter-item col-6">
                    <a href="index.php?san-pham" class="filter-item-link active">
                        <i class="fa-regular fa-square"></i>
                        Tất cả
                    </a>
                </div>
        `

        for (let index in brands) {
            html += `
                <div class="filter-item col-6">
                    <a href="index.php?san-pham&loai=${brands[index].ten_thuong_hieu.toLowerCase()}" class="filter-item-link">
                        <i class="fa-regular fa-square"></i>
                        ${brands[index].ten_thuong_hieu}
                    </a>
                </div>
            `
            if (index > 5) break
        }

        if (brands.length > 7) {
            html += `
                    <div class="filter-item col-12 text-center show-more-brand-container">
                        <a class="btn-show-more-brand link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">Xem thêm</a>
                    </div>
                </div>
            `
        } else {
            html += `</div>`
        }

        $('.product-main .filter-brand').html(html)
    }
}

function renderMoreBrand() {
    $(document).on('click', '.product-main .btn-show-more-brand', async () => {
        const brands = await getBrandData()
        let html = ''
        for (let i = 7; i < brands.length; i++) {
            html += `
                <div class="filter-item col-6">
                    <a href="index.php?san-pham&loai=${brands[i].ten_thuong_hieu.toLowerCase()}" class="filter-item-link">
                        <i class="fa-regular fa-square"></i>
                        ${brands[i].ten_thuong_hieu}
                    </a>
                </div
            `
        }
        $('.product-main .show-more-brand-container').remove()
        $('.product-main .filter-brand .filter-list').append(html)
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
                    renderAdminBrand()
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
                    renderAdminBrand()
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