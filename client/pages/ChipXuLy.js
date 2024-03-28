$(document).ready(() => {
    loadCPUData()
    handleAddCPU()
    renderDeleteCPUModal()
    handleDeleteCPU()
})

function loadCPUData() {
    $.ajax({
        url: 'server/src/controller/ChipXuLyController.php',
        method: 'POST',
        data: { action: 'load' },
        dataType: 'JSON',
        success: data => {
            if (data && data.length > 0) {
                let html = ''
                
                data.forEach(item => {
                    html += `<option value="${item.ma_chip_xu_ly}">${item.ten_chip}</option>`
                })

                $('#admin-product-main #product-cpu').html(html)
                $('#admin-product-main #product-cpu').selectpicker('refresh')

                $('#admin-product-detail-main #product-cpu').html(html)
            }
        },
        error: (xhr, status, error) => console.log(error)
    })
}

function addCPU(name) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/ChipXuLyController.php',
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

function handleAddCPU() {
    $(document).on('click', '.btn-add-cpu', e => {
        const name = $('#product-cpu-name').val()

        if (!name) {
            alert('Vui lòng nhập tên CPU')
            return
        }

        addCPU(name)
            .then(res => {
                if (res) {
                    alert('Thêm CPU mới thành công')
                    $('#addProductCPUModal').modal('hide')
                    $('.add-product-cpu-form').trigger('reset')
                    loadCPUData()
                } else {
                    alert('Thêm CPU mới thất bại')
                }
            })
            .catch(error => console.log(error))
    })
}

function getCPU(id) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/ChipXuLyController.php',
            method: 'POST',
            data: { action: 'get', id },
            dataType: 'JSON',
            success: cpu => resolve(cpu),
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}

function renderDeleteCPUModal() {
    $(document).on('click', '.btn-delete-cpu-modal', async e => {
        const selected = $('#product-cpu').val()

        if (selected.length === 0) {    
            alert('Vui lòng chọn CPU cần xóa')
            $('#deleteProductCPUModal').modal('hide')
            return
        }
        
        $('#deleteProductCPUModal').modal('show')

        try {
            let cpuHtml = ''
            const cpuPromises = selected.map(cpuId => getCPU(cpuId))
            const cpus = await Promise.all(cpuPromises)

            cpus.forEach((cpu, index) => {
                cpuHtml += `<b class="delete-cpu-id">${cpu.ten_chip}</b>`
                if (index !== selected.length - 1) cpuHtml += ', '
            })

            const html = `
                <p>
                    Bạn có chắc chắn muốn xóa CPU
                    ${cpuHtml}
                    không ?
                </p>
                <p class="text-warning"><small>Hành động này sẽ không thể hoàn tác</small></p>
            `

            $('.delete-product-cpu-confirm').html(html)
        } catch(error) {
            console.log(error)
        }
    })
}

function deleteCPU(id) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/ChipXuLyController.php',
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
                reject(false)
            }
        })
    })
}

function handleDeleteCPU() {
    $(document).on('click', '.btn-delete-cpu', e => {
        const selected = $('#product-cpu').val()
        let promises = []

        selected.forEach(id => promises.push(deleteCPU(id)))

        Promise.all(promises).then(results => {
            if (results.includes(false)) {
                alert('Xóa CPU thất bại')
            } else {
                alert('Xóa CPU thành công')
                $('#deleteProductCPUModal').modal('hide')
                loadCPUData()
            }
        })
    })
}

function renderCPUName(id, index) {
    getCPU(id)
        .then(cpu => {
            if (cpu) {
                $(`.product-detail-cpu-name-${index}`).text(cpu.ten_chip)
            }
        })
        .catch(error => console.log(error))
}

function getCPUId(name) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/ChipXuLyController.php',
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

async function handleImportCPU(name) {
    try {
        let id = await getCPUId(name)
        if (!id) {
            const res = await addCPU(name)
            if (res) id = getCPUId(name)
        }
        return id
    } catch(error) {
        console.log(error)
        return null
    }
}