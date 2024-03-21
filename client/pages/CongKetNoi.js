$(document).ready(() => {
    loadPlugData()
    addPlug()
    showDeletePlugModal()
    deletePlug()
})

function loadPlugData() {
    $.ajax({
        url: 'server/src/controller/CongKetNoiController.php',
        method: 'POST',
        data: { action: 'load' },
        dataType: 'JSON',
        success: data => {
            if (data && data.length > 0) {
                let html = ''
                
                data.forEach(item => {
                    html += `<option value="${item.ma_cong}">${item.ten_cong}</option>`
                })

                $('#admin-product-main #product-plug').html(html)
                $('#admin-product-main #product-plug').selectpicker('refresh')
            }
        },
        error: (jqXHR, textStatus, error) => {
            console.log(error)
        }
    })
}

function addPlug() {
    $(document).on('click', '.btn-add-plug', e => {
        const name = $('#product-plug-name').val()

        if (!name) {
            alert('Vui lòng nhập tên cổng kết nối')
            return
        }

        $.ajax({
            url: 'server/src/controller/CongKetNoiController.php',
            method: 'POST',
            data: { action: 'add', name },
            success: data => {
                if (data === 'success') {
                    alert('Thêm cổng kết nối mới thành công')
                    $('form').trigger('reset')
                    $('#addProductPlugModal').modal('hide')
                    loadPlugData()
                } else {
                    alert('Thêm cổng kết nối mới thất bại')
                }
            }
        })
    })
}

function showDeletePlugModal() {
    $(document).on('click', '.btn-delete-plug-modal', e => {
        const selected = $('#product-plug').val()

        if (selected.length === 0) {    
            alert('Vui lòng chọn cổng kết nối cần xóa')
            $('#deleteProductPlugModal').modal('hide')
            return
        }
        
        $('#deleteProductPlugModal').modal('show')

        let plugHtml = ''
        let promise
        selected.forEach((plug, index) => {
            promise = new Promise((resolve, reject) => {
                $.ajax({
                    url: 'server/src/controller/CongKetNoiController.php',
                    method: 'POST',
                    data: { action: 'get', id: plug },
                    dataType: 'JSON',
                    success: data => {
                        if (data) {
                            plugHtml += `"<b class="delete-plug-id">${data.ten_cong}</b>"`
                            if (index !== selected.length - 1) {
                                plugHtml += ', '
                            }
                            resolve(plugHtml)
                        }
                    },
                    error: (jqXHR, textStatus, error) => {
                        console.log(error)
                    }
                })
            })
        })

        promise.then(plugHtml => {
            let html = `
                <p>
                    Bạn có chắc chắn muốn xóa cổng kết nối
                    ${plugHtml}
                    không ?
                </p>
                <p class="text-warning"><small>Hành động này sẽ không thể hoàn tác</small></p>
            `

            $('.delete-product-plug-confirm').html(html)
        })
    })
}

function deletePlug() {
    $(document).on('click', '.btn-delete-plug', e => {
        const selected = $('#product-plug').val()
        let promises = []

        selected.forEach(plug => {
            let promise = new Promise((resolve, reject) => {
                $.ajax({
                    url: 'server/src/controller/CongKetNoiController.php',
                    method: 'POST',
                    data: { action: 'delete', id: plug },
                    success: data => {
                        if (data === 'success') {
                            resolve(true)
                        } else {
                            resolve(false)
                        }
                    },
                    error: (jqXHR, textStatus, error) => {
                        console.log(error)
                        reject(false)
                    }
                })
            })

            promises.push(promise)
        })

        Promise.all(promises).then(results => {
            if (results.includes(false)) {
                alert('Xóa cổng kết nối thất bại')
            } else {
                alert('Xóa cổng kết nối thành công')
                $('form').trigger('reset')
                $('#deleteProductPlugModal').modal('hide')
                loadPlugData()
            }
        })
    })
}