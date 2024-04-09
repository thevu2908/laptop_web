$(document).ready(() => {
    renderAdminCPU()
    handleAddCPU()
    renderDeleteCPUModal()
    handleDeleteCPU()
})

function getCPUData() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/ChipXuLyController.php',
            method: 'POST',
            data: { action: 'load' },
            dataType: 'JSON',
            success: cpus => resolve(cpus),
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}

async function renderAdminCPU() {
    const cpus = await getCPUData()
    if (cpus && cpus.length > 0) {
        let html = ''
        cpus.forEach(cpu => html += `<option value="${cpu.ma_chip_xu_ly}">${cpu.ten_chip}</option>`)
        if ($('#admin-product-main #product-cpu').length > 0 || $('#admin-product-detail-main #product-cpu').length > 0) {
            $('#admin-product-main #product-cpu').html(html)
            $('#admin-product-main #product-cpu').selectpicker('refresh')
            $('#admin-product-detail-main #product-cpu').html(html)
        }
    }
}

function renderFilterCPU() {
    $('.product-main .filter-cpu').html(`
        <h5>CPU</h5>
        <div class="filter-list row">
            <div class="filter-item col-12">
                <button class="filter-item-link active">
                    <i class="fa-regular fa-square"></i>
                    Tất cả
                    <input type="hidden" value="" >
                </button>
            </div>
            <div class="filter-item col-12">
                <button class="filter-item-link">
                    <i class="fa-regular fa-square"></i>
                    Intel core i3
                    <input type="hidden" value="i3" >
                </button>
            </div>
            <div class="filter-item col-12">
                <button class="filter-item-link">
                    <i class="fa-regular fa-square"></i>
                    Intel core i5
                    <input type="hidden" value="i5" >
                </button>
            </div>
            <div class="filter-item col-12">
                <button class="filter-item-link">
                    <i class="fa-regular fa-square"></i>
                    Intel core i7
                    <input type="hidden" value="i7" >
                </button>
            </div>
            <div class="filter-item col-12">
                <button class="filter-item-link">
                    <i class="fa-regular fa-square"></i>
                    Intel core i9
                    <input type="hidden" value="i9" >
                </button>
            </div>
            <div class="filter-item col-12">
                <button class="filter-item-link">
                    <i class="fa-regular fa-square"></i>
                    AMD ryzen 3
                    <input type="hidden" value="r3" >
                </button>
            </div>
            <div class="filter-item col-12">
                <button class="filter-item-link">
                    <i class="fa-regular fa-square"></i>
                    AMD ryzen 5
                    <input type="hidden" value="r5" >
                </button>
            </div>
            <div class="filter-item col-12">
                <button class="filter-item-link">
                    <i class="fa-regular fa-square"></i>
                    AMD ryzen 7
                    <input type="hidden" value="r7" >
                </button>
            </div>
        </div>
    `)
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
                    renderAdminCPU()
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
                renderAdminCPU()
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