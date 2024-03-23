$(document).ready(() => {
    loadColorData()
    addColor()
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

                $('#admin-product-main #product-color').html(html)
                $('#admin-product-main #product-color').selectpicker('refresh');
            }
        },
        error: (xhr, status, error) => {
            console.log(error)
        }
    })
}

function addColor() {
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

        $.ajax({
            url: 'server/src/controller/MauSacController.php',
            method: 'POST',
            data: { action: 'add', id, name },
            success: data => {
                if (data === 'success') {
                    alert('Thêm màu mới thành công')
                    $('#addProductColorModal').modal('hide')
                    $('.add-product-color-form').trigger('reset')
                    loadColorData()
                } else {
                    alert('Thêm màu mới thất bại')
                    console.log(data)
                }
            },
            error: (xhr, status, error) => {
                console.log(error)
            }
        })
    })
}