$(document).ready(() => {
    loadTypeData()
    addType()
    showDeleteTypeModal()
    deleteType()
})

function loadTypeData() {
    $.ajax({
        url: 'server/src/controller/TheLoaiController.php',
        method: 'POST',
        data: { action: 'load' },
        dataType: 'JSON',
        success: data => {
            let html = ''

            if (data && data.length > 0) {
                data.forEach((item, index) => {
                    html += `<option value="${item.ma_the_loai}">${item.ten_loai}</option>`
                })

                $('#admin-product-main #product-type').html(html)
            }
        },
        error: (xhr, status, error) => {
            console.log(error)
        }
    })
}

function addType() {
    $(document).on('click', '#addProductTypeModal .btn-add-type', e => {
        const name = $('#product-type-name').val()

        if (!name) {
            alert('Vui lòng nhập tên thể loại')
            return
        }

        $.ajax({
            url: 'server/src/controller/TheLoaiController.php',
            method: 'POST',
            data: { action: 'add', name },
            success: data => {
                if (data === 'success') {
                    alert('Thêm thể loại thành công')
                    $('form').trigger('reset')
                    $('#addProductTypeModal').modal('hide')
                    loadTypeData()
                } else {
                    alert('Thêm thể loại thất bại')
                    console.log(data)
                }
            },
            error: (xhr, status, error) => {
                console.log(error)
            }
        })
    })
}

function showDeleteTypeModal() {
    $(document).on('click', '.btn-open-delete-type-modal', e => {
        const id = $('#admin-product-main #product-type').val()

        $.ajax({
            url: 'server/src/controller/TheLoaiController.php',
            method: 'POST',
            data: { action: 'get', id },
            dataType: 'JSON',
            success: data => {
                if (data) {
                    let html = `
                        <p>
                            Bạn có chắc chắn muốn xóa thể loại
                            "<b class="delete-type-id">${data.ten_loai}</b>"
                            không ?
                        </p>
                        <p class="text-warning"><small>Hành động này sẽ không thể hoàn tác</small></p>
                    `

                    $('.type-confirm-delete').html(html)
                }
            },
            error: (xhr, status, error) => {
                console.log(error)
            }
        })
    })
}

function deleteType() {
    $(document).on('click', '.btn-delete-type', e => {
        const id = $('#admin-product-main #product-type').val()

        $.ajax({
            url: 'server/src/controller/TheLoaiController.php',
            method: 'POST',
            data: { action: 'delete', id },
            success: data => {
                if (data === 'success') {
                    alert('Xóa thể loại thành công')
                    $('#deleteProductTypeModal').modal('hide')
                    loadTypeData()
                } else {
                    alert('Xóa thể loại thất bại')
                    console.log(data)
                }
            },
            error: (xhr, status, error) => {
                console.log(error)
            }
        })
    })
}