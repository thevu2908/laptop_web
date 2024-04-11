$(document).ready(() => {
    loadGPUData()
    handleAddGPU()
    renderDeleteGPUModal()
    handleDeleteGPU()
})

function loadGPUData() {
    $.ajax({
        url: 'server/src/controller/CardDoHoaController.php',
        method: 'POST',
        data: { action: 'load' },
        dataType: 'JSON',
        success: data => {
            if (data && data.length > 0) {
                let html = ''
                
                data.forEach(item => {
                    html += `<option value="${item.ma_card}">${item.ten_card}</option>`
                })

                if ($('#admin-product-main #product-gpu').length > 0 || $('#admin-product-detail-main #product-gpu').length > 0) {
                    $('#admin-product-main #product-gpu').html(html)
                    $('#admin-product-main #product-gpu').selectpicker('refresh')
                    $('#admin-product-detail-main #product-gpu').html(html)
                }
            }
        },
        error: (xhr, status, error) => console.log(error)
    })
}

function addGPU(name) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/CardDoHoaController.php',
            method: 'POST',
            data: { action: 'add', name },
            success: res => {
                if (res === 'success') {
                    resolve(true)
                } else {
                    console.log(res)
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

function handleAddGPU() {
    $(document).on('click', '.btn-add-gpu', e => {
        const name = $('#product-gpu-name').val()

        if (!name) {
            alert('Vui lòng nhập tên GPU')
            return
        }

        addGPU(name)
            .then(res => {
                if (res) {
                    alert('Thêm GPU mới thành công')
                    $('#addProductGPUModal').modal('hide')
                    $('.add-product-gpu-form').trigger('reset')
                    loadGPUData()
                } else {
                    alert('Thêm GPU mới thất bại')
                }
            })
            .catch(error => console.log(error))
    })
}

function getGPU(id) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/CardDoHoaController.php',
            method: 'POST',
            data: { action: 'get', id },
            dataType: 'JSON',
            success: gpu => resolve(gpu),
            error: (xhr, status, error) => {
                console.log(error)
                reject(false)
            }
        })
    })

}

function renderDeleteGPUModal() {
    $(document).on('click', '.btn-delete-gpu-modal', async e => {
        const selected = $('#product-gpu').val()

        if (selected.length === 0) {    
            alert('Vui lòng chọn card đồ họa cần xóa')
            $('#deleteProductGPUModal').modal('hide')
            return
        }
        
        $('#deleteProductGPUModal').modal('show')

        try {
            let gpuHtml = ''
            const gpuPromises = selected.map(gpuId => getGPU(gpuId))
            const gpus = await Promise.all(gpuPromises)

            gpus.forEach((gpu, index) => {
                gpuHtml += `<b class="delete-gpu-id">${gpu.ten_card}</b>`
                if (index !== selected.length - 1) gpuHtml += ', '
            })

            const html = `
                <p>
                    Bạn có chắc chắn muốn xóa card đồ họa
                    ${gpuHtml}
                    không ?
                </p>
                <p class="text-warning"><small>Hành động này sẽ không thể hoàn tác</small></p>
            `

            $('.delete-product-gpu-confirm').html(html)
        } catch(error) {
            console.log(error)
        }
    })
}

function deleteGPU(id) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/CardDoHoaController.php',
            method: 'POST',
            data: { action: 'delete', id },
            success: res => {
                if (res === 'success') {
                    resolve(true)
                } else {
                    console.log(res)
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

function handleDeleteGPU() {
    $(document).on('click', '.btn-delete-gpu', e => {
        const selected = $('#product-gpu').val()
        let promises = []

        selected.forEach(id => promises.push(deleteGPU(id)))

        Promise.all(promises).then(results => {
            if (results.includes(false)) {
                alert('Xóa card đồ họa thất bại')
            } else {
                alert('Xóa card đồ họa thành công')
                $('#deleteProductGPUModal').modal('hide')
                loadGPUData()
            }
        })
    })
}

function renderGPUName(id, index) {
    getGPU(id)
        .then(gpu => {
            if (gpu) {
                $(`.product-detail-gpu-name-${index}`).text(gpu.ten_card)
            }
        })
        .catch(error => error)
}

function getGPUId(name) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/CardDoHoaController.php',
            method: 'POST',
            data: { action: 'get-id', name },
            dataType: 'JSON',
            success: data => {
                resolve(data)
            },
            error: (xhr, status, error) => {
                console.log(error)
                reject(false)
            }
        })
    })
}

async function handleImportGPU(name) {
    try {
        let id = await getGPUId(name)
        if (!id) {
            const res = addGPU(name)
            if (res) id = getGPUId(name)
        }
        return id
    } catch (error) {
        console.log(error)
        return null
    }
}