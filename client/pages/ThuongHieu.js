$(document).ready(() => {
    loadBrandData()
    addBrand()
    showDeleteBrandModal()
    deleteBrand()
})

function loadBrandData() {
    $.ajax({
        url: 'server/src/controller/ThuongHieuController.php',
        method: 'POST',
        data: { action: 'load'},
        dataType:'JSON',
        success: data => {
            let html = ''
            if (data && data.length > 0) {
                data.forEach((item, index) => {
                    html += `<option value="${item.ma_thuong_hieu}">${item.ten_thuong_hieu}</option>`
                })

                $('#admin-product-main #product-brand').html(html)
            }
        },
        error: (jqXHR, textStatus, error) => {
            console.log(error)
        }
    })
}

function addBrand() {
    $(document).on('click', '.btn-add-brand', e => {
        const brandName = $('#product-brand-name').val()

        if (!brandName) {
            alert('Vui lòng nhập tên thương hiệu')
            return
        }

        $.ajax({
            url: 'server/src/controller/ThuongHieuController.php',
            method: 'POST',
            data: { action: 'add', brandName },
            success: data => {
                if (data === 'success') {
                    alert('Thêm thương hiệu thành công')
                    $('form').trigger('reset')
                    $('#addProductBrandModal').modal('hide')
                    loadBrandData()
                } else {
                    alert('Thêm thương hiệu thất bại')
                    console.log(data)
                }
            },
            error: (jqXHR, textStatus, error) => {
                console.log(error)
            }
        })
    })
}

function deleteBrand() {
    $(document).on('click', '.btn-delete-brand', e => {
        const brandId = $('#admin-product-main #product-brand').val()

        $.ajax({
            url: 'server/src/controller/ThuongHieuController.php',
            method: 'POST',
            data: { action: 'delete', brandId },
            success: data => {
                if (data === 'success') {
                    alert('Xóa thương hiệu thành công')
                    $('#deleteProductBrandModal').modal('hide')
                    loadBrandData()
                } else {
                    alert('Xóa thương hiệu thất bại')
                    console.log(data)
                }
            },
            error: (jqXHR, textStatus, error) => {
                console.log(error)
            }
        })
    })
}

function showDeleteBrandModal() {
    $(document).on('click', '.btn-open-delete-brand-modal', e => {
        const brandId = $('#admin-product-main #product-brand').val()

        $.ajax({
            url: 'server/src/controller/ThuongHieuController.php',
            method: 'POST',
            data: { action: 'get', brandId },
            dataType: 'JSON',
            success: data => {
                if (data) {
                    let html = `
                        <p>
                            Bạn có chắc chắn muốn xóa thương hiệu
                            "<b class="delete-brand-id">${data.ten_thuong_hieu}</b>"
                            không ?
                        </p>
                        <p class="text-warning"><small>Hành động này sẽ không thể hoàn tác</small></p>
                    `

                    $('.brand-confirm-delete').html(html)
                }
            },
            error: (jqXHR, textStatus, error) => {
                console.log(error)
            }
        })
    })
}