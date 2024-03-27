$(document).ready(() => {
    loadOSData()
    addOS()
    showDeleteOSModal()
    deleteOS()
})

function loadOSData() {
    $.ajax({
        url: 'server/src/controller/HeDieuHanhController.php',
        method: 'POST',
        data: { action: 'load' },
        dataType: 'JSON',
        success: data => {
            if (data && data.length > 0) {
                let html = ''
                
                data.forEach(item => {
                    html += `<option value="${item.ma_hdh}">${item.ten_hdh}</option>`
                })

                $('#admin-product-main #product-os').html(html)
            }
        },
        error: (xhr, status, error) => {
            console.log(error)
        }
    })
}

function addOS() {
    $(document).on('click', '.btn-add-os', e => {
        const name = $('#product-os-name').val()

        if (!name) {
            alert('Vui lòng nhập tên hệ điều hành')
            return
        }

        $.ajax({
            url: 'server/src/controller/HeDieuHanhController.php',
            method: 'POST',
            data: { action: 'add', name },
            success: data => {
                if (data === 'success') {
                    alert('Thêm hệ điều hành mới thành công')
                    $('#addProductOSModal').modal('hide')
                    $('.add-product-os-form').trigger('reset')
                    loadOSData()
                } else {
                    alert('Thêm hệ điều hành mới thất bại')
                }
            }
        })
    })
}

function showDeleteOSModal() {
    $(document).on('click', '.btn-delete-os-modal', e => {
        const id = $('#admin-product-main #product-os').val()

        $.ajax({
            url: 'server/src/controller/HeDieuHanhController.php',
            method: 'POST',
            data: { action: 'get', id },
            dataType: 'JSON',
            success: data => {
                if (data) {
                    let html = `
                        <p>
                            Bạn có chắc chắn muốn xóa hệ điều hành
                            "<b class="delete-os-id">${data.ten_hdh}</b>"
                            không ?
                        </p>
                        <p class="text-warning"><small>Hành động này sẽ không thể hoàn tác</small></p>
                    `

                    $('.delete-product-os-confirm').html(html)
                }
            },
            error: (xhr, status, error) => {
                console.log(error)
            }
        })
    })
}

function deleteOS() {
    $(document).on('click', '.btn-delete-os', e => {
        const id = $('#admin-product-main #product-os').val()

        $.ajax({
            url: 'server/src/controller/HeDieuHanhController.php',
            method: 'POST',
            data: { action: 'delete', id },
            success: data => {
                if (data === 'success') {
                    alert('Xóa hệ điều hành thành công')
                    $('#deleteProductOSModal').modal('hide')
                    loadOSData()
                } else {
                    alert('Xóa hệ điều hành thất bại')
                    console.log(data)
                }
            },
            error: (xhr, status, error) => {
                console.log(error)
            }
        })
    })
}

function getOSId(name) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/HeDieuHanhController.php',
            method: 'POST',
            data: { action: 'get-id', name },
            dataType: 'JSON',
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