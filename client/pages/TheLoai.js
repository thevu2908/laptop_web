$(document).ready(() => {
    renderTypeData()
    handleAddType()
    renderDeleteTypeModal()
    handleDeleteType()
})

function getTypes() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/TheLoaiController.php',
            method: 'POST',
            data: { action: 'load' },
            dataType: 'JSON',
            success: types => resolve(types),
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}

async function renderTypeData() {
    const types = await getTypes()
    if (types && types.length > 0) {
        const html = types.map(type => `<option value="${type.ma_the_loai}">${type.ten_loai}</option>`).join('')
        $('#admin-product-main #product-type').html(html)
    }
}

async function renderFilterType() {
    const types = await getTypes()
    let html = ''
    if (types && types.length > 0) {
        html = `
            <div class="sort-dropdown">
                <div class="sort-dropdown-button">
                    <span>Loại sản phẩm</span>
                    <i class="fa-solid fa-sort"></i>
                </div>
                <div class="sort-dropdown-menu">
                    <div class="wrap">
        `

        html += types.map(type => `<div class="sort-dropdown-item"><a><span>${type.ten_loai}</span></a></div>`).join('')
        html += '</div></div></div><div class="filter-list"></div></div>'
    }
    $('.search-product-main .sort-container').html(html)
}

function addType(name) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/TheLoaiController.php',
            method: 'POST',
            data: { action: 'add', name },
            success: res => {
                if (res === 'success') {
                    resolve(true)
                } else {
                    reject(false)
                }
            },
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}

function handleAddType() {
    $(document).on('click', '#addProductTypeModal .btn-add-type', e => {
        const name = $('#product-type-name').val()

        if (!name) {
            alert('Vui lòng nhập tên thể loại')
            return
        }

        addType(name)
            .then(res => {
                if (res) {
                    alert('Thêm thể loại thành công')
                    $('#addProductTypeModal').modal('hide')
                    $('.add-product-type-form').trigger('reset')
                    renderTypeData()
                }
                else {
                    alert('Thêm thể loại thất bại')
                }
            })
            .catch(error => console.log(error))
    })
}

function getType(id) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/TheLoaiController.php',
            method: 'POST',
            data: { action: 'get', id },
            dataType: 'JSON',
            success: type => resolve(type),
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}

function renderDeleteTypeModal() {
    $(document).on('click', '.btn-open-delete-type-modal', e => {
        const id = $('#admin-product-main #product-type').val()

        getType(id)
            .then(type => {
                if (type) {
                    const html = `
                        <p>
                            Bạn có chắc chắn muốn xóa thể loại
                            "<b class="delete-type-id">${type.ten_loai}</b>"
                            không ?
                        </p>
                        <p class="text-warning"><small>Hành động này sẽ không thể hoàn tác</small></p>
                    `

                    $('.type-confirm-delete').html(html)
                }
            })
            .catch(error => console.log(error))
    })
}

function deleteType(id) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/TheLoaiController.php',
            method: 'POST',
            data: { action: 'delete', id },
            success: res => {
                if (res === 'success') {
                    resolve(true)
                } else {
                    reject(false)
                }
            },
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}

function handleDeleteType() {
    $(document).on('click', '.btn-delete-type', e => {
        const id = $('#admin-product-main #product-type').val()

        deleteType(id)
            .then(res => {
                if (res) {
                    alert('Xóa thể loại thành công')
                    $('#deleteProductTypeModal').modal('hide')
                    renderTypeData()
                } else {
                    alert('Xóa thể loại thất bại')
                }
            })
            .catch(error => console.log(error))
    })
}

function getTypeId(name) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/TheLoaiController.php',
            method: 'POST',
            data: { action: 'get-id', name },
            dataType: 'JSON',
            success: id => {
                resolve(id)
            },
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}

function showType(id, index) {
    $.ajax({
        url: 'server/src/controller/TheLoaiController.php',
        method: 'POST',
        data: { action: 'get', id: id },
        dataType: 'JSON',
        success: data => {
            if (data) {
                $(`.product-type-${index}`).append(data.ten_loai)
            }
        },
        error: (jqXHR, textStatus, error) => {
            console.log(error)
        }
    })
}

async function handleImportType(name) {
    try {
        let id = await getTypeId(name)
        if (!id) {
            const res = await addType(name)
            if (res) {
                id = await getTypeId(name)
            }
        }
        return id
    } catch (error) {
        console.log(error)
        return null
    }
}