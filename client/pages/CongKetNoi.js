$(document).ready(() => {
    loadPlugData()
    handleAddPlug()
    renderDeletePlugModal()
    handleDeletePlug()
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

                if ($('#admin-product-main #product-plug').length > 0 || $('#admin-product-detail-main #product-plug').length > 0) {
                    $('#admin-product-main #product-plug').html(html)
                    $('#admin-product-main #product-plug').selectpicker('refresh')
                    $('#admin-product-detail-main #product-plug').html(html)
                    $('#admin-product-detail-main #product-plug').selectpicker('refresh')
                }
            }
        },
        error: (xhr, status, error) => console.log(error)
    })
}

function addPlug(name) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/CongKetNoiController.php',
            method: 'POST',
            data: { action: 'add', name },
            success: res => {
                if (res === 'success') {
                    resolve(true)
                } else {
                    console.log(res)
                    resolve(false)
                }
            },
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })

}

function handleAddPlug() {
    $(document).on('click', '.btn-add-plug', e => {
        const name = $('#product-plug-name').val()

        if (!name) {
            alert('Vui lòng nhập tên cổng kết nối')
            return
        }

        addPlug(name)
            .then(res => {
                if (res) {
                    alert('Thêm cổng kết nối mới thành công')
                    $('#addProductPlugModal').modal('hide')
                    $('.add-product-plug-form').trigger('reset')
                    loadPlugData()
                } else {
                    alert('Thêm cổng kết nối mới thất bại')
                }
            })
            .catch(error => console.log(error))
    })
}

function getPlug(id) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/CongKetNoiController.php',
            method: 'POST',
            data: { action: 'get', id },
            dataType: 'JSON',
            success: plug => resolve(plug),
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}

function renderDeletePlugModal() {
    $(document).on('click', '.btn-delete-plug-modal', async e => {
        const selected = $('#product-plug').val()

        if (selected.length === 0) {    
            alert('Vui lòng chọn cổng kết nối cần xóa')
            $('#deleteProductPlugModal').modal('hide')
            return
        }
        
        $('#deleteProductPlugModal').modal('show')

        try {
            let plugHtml = ''
            const plugPromises = selected.map(plugId => getPlug(plugId))
            const plugs = await Promise.all(plugPromises)

            plugs.forEach((plug, index) => {
                plugHtml += `<b class="delete-plug-id">${plug.ten_cong}</b>`
                if (index !== selected.length - 1) plugHtml += ', '
            })

            const html = `
                <p>
                    Bạn có chắc chắn muốn xóa cổng kết nối
                    ${plugHtml}
                    không ?
                </p>
                <p class="text-warning"><small>Hành động này sẽ không thể hoàn tác</small></p>
            `

            $('.delete-product-plug-confirm').html(html)
        } catch(error) {
            console.log(error)
        }
    })
}

function deletePlug(id) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/CongKetNoiController.php',
            method: 'POST',
            data: { action: 'delete', id },
            success: res => {
                if (res === 'success') {
                    resolve(true)
                } else {
                    console.log(res)
                    resolve(false)
                }
            },
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}

function handleDeletePlug() {
    $(document).on('click', '.btn-delete-plug', e => {
        const selected = $('#product-plug').val()
        let promises = []

        selected.forEach(id => promises.push(deletePlug(id)))

        Promise.all(promises).then(results => {
            if (results.includes(false)) {
                alert('Xóa cổng kết nối thất bại')
            } else {
                alert('Xóa cổng kết nối thành công')
                $('#deleteProductPlugModal').modal('hide')
                loadPlugData()
            }
        })
    })
}

function getPlugId(name) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/CongKetNoiController.php',
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

async function handleImportPlug(name) {
    try {
        let id = await getPlugId(name)
        if (!id) {
            const res = addPlug(name)
            if (res) id = getPlugId(name)
        }
        return id
    } catch (error) {
        console.log(error)
        return null
    }
}