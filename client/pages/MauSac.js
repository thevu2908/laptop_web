$(document).ready(() => {
    loadColorData()
    addColor()
    showDeleteColorModal()
    deleteColor()
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
                    $('form').trigger('reset')
                    $('#addProductColorModal').modal('hide')
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

function showDeleteColorModal() {
    $(document).on('click', '.btn-delete-color-modal', e => {
        const selected = $('#product-color').val()

        if (selected.length === 0) {    
            alert('Vui lòng chọn màu cần xóa')
            $('#deleteProductColorModal').modal('hide')
            return
        }
        
        $('#deleteProductColorModal').modal('show')

        let colorHtml = ''
        let promise
        selected.forEach((color, index) => {
            promise = new Promise((resolve, reject) => {
                $.ajax({
                    url: 'server/src/controller/MauSacController.php',
                    method: 'POST',
                    data: { action: 'get', id: color },
                    dataType: 'JSON',
                    success: data => {
                        if (data) {
                            colorHtml += `"<b class="delete-color-id">${data.ten_mau}</b>"`
                            if (index !== selected.length - 1) {
                                colorHtml += ', '
                            }
                            resolve(colorHtml)
                        }
                    },
                    error: (xhr, status, error) => {
                        console.log(error)
                    }
                })
            })
        })

        promise.then(colorHtml => {
            let html = `
                <p>
                    Bạn có chắc chắn muốn xóa màu
                    ${colorHtml}
                    không ?
                </p>
                <p class="text-warning"><small>Hành động này sẽ không thể hoàn tác</small></p>
            `

            $('.delete-product-color-confirm').html(html)
        })
    })
}

function deleteColor() {
    $(document).on('click', '.btn-delete-color', e => {
        const selected = $('#product-color').val()
        let promises = []

        selected.forEach(color => {
            let promise = new Promise((resolve, reject) => {
                $.ajax({
                    url: 'server/src/controller/MauSacController.php',
                    method: 'POST',
                    data: { action: 'delete', id: color},
                    success: data => {
                        if (data === 'success') {
                            resolve(true)
                        } else {
                            resolve(false)
                        }
                    },
                    error: (xhr, status, error) => {
                        console.log(error)
                        reject(false)
                    }
                })
            })

            promises.push(promise)
        })

        Promise.all(promises).then(results => {
            if (results.includes(false)) {
                alert('Xóa màu thất bại')
            } else {
                alert('Xóa màu thành công')
                $('form').trigger('reset')
                $('#deleteProductColorModal').modal('hide')
                loadColorData()
            }
        })
    })
}