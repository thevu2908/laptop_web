$(document).ready(() => {
    loadColorData()
    handleAddColor()
})

function loadColorData() {
    $.ajax({
        url: 'server/src/controller/MauSacController.php',
        method: 'POST',
        data: { action: 'load' },
        dataType: 'JSON',
        success: data => {
            if (data && data.length > 0) {
                let html = ''

                data.forEach(item => {
                    html += `<option value="${item.ma_mau}">${item.ten_mau}</option>`
                })

                if ($('#admin-product-main #product-color').length > 0 || $('#admin-product-detail-main #product-color').length > 0) {
                    $('#admin-product-main #product-color').html(html)
                    $('#admin-product-main #product-color').selectpicker('refresh')
                    $('#admin-product-detail-main #product-color').html(html)
                }
            }
        },
        error: (xhr, status, error) => console.log(error)
    })
}

function addColor(id, name) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/MauSacController.php',
            method: 'POST',
            data: { action: 'add', id, name },
            success: data => {
                if (data === 'success') {
                    resolve(true)
                } else {
                    resolve(false)
                    console.log(data)
                }
            },
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}

function handleAddColor() {
    $(document).on('click', '.btn-add-color', e => {
        const id = $('#product-color-id').val()
        const name = $('#product-color-name').val()

        if (!id) {
            alert('Vui lòng nhập mã màu')
            return
        }
        if (!name) {
            alert('Vui lòng nhập tên màu')
            return
        }
        if (!id.startsWith('#')) {
            alert('Vui lòng nhập mã màu theo định dạng #xxxxxx')
            return
        }
        if (!isColor(id)) {
            alert('Mã màu không hợp lệ')
            return
        }

        addColor(id, name)
            .then(res => {
                if (res) {
                    alert('Thêm màu mới thành công')
                    $('#addProductColorModal').modal('hide')
                    $('.add-product-color-form').trigger('reset')
                    loadColorData()
                } else {
                    alert('Thêm màu mới thất bại')
                }
            })
            .catch(error => console.log(error))
    })
}

function getColor(id) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/MauSacController.php',
            method: 'POST',
            data: { action: 'get', id },
            dataType: 'JSON',
            success: color => resolve(color),
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}

function renderColorName(id, index) {
    getColor(id)
        .then(color => {
            if (color) {
                $(`.product-detail-color-name-${index}`).text(color.ten_mau)
            }
        })
        .catch(error => console.log(error))
}

function getColorId(name) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/MauSacController.php',
            method: 'POST',
            data: { action: 'get-id', name },
            dataType: 'JSON',
            success: id => resolve(id),
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}