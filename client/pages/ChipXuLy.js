$(document).ready(() => {
    loadCPUData()
    addCPU()
    showDeleteCPUModal()
    deleteCPU()
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
        error: (xhr, status, error) => {
            console.log(error)
        }
    })
}

function addCPU() {
    $(document).on('click', '.btn-add-cpu', e => {
        const name = $('#product-cpu-name').val()

        if (!name) {
            alert('Vui lòng nhập tên CPU')
            return
        }

        $.ajax({
            url: 'server/src/controller/ChipXuLyController.php',
            method: 'POST',
            data: { action: 'add', name },
            success: data => {
                if (data === 'success') {
                    alert('Thêm CPU mới thành công')
                    $('#addProductCPUModal').modal('hide')
                    $('.add-product-cpu-form').trigger('reset')
                    loadCPUData()
                } else {
                    alert('Thêm CPU mới thất bại')
                }
            }
        })
    })
}

function showDeleteCPUModal() {
    $(document).on('click', '.btn-delete-cpu-modal', e => {
        const selected = $('#product-cpu').val()

        if (selected.length === 0) {    
            alert('Vui lòng chọn CPU cần xóa')
            $('#deleteProductCPUModal').modal('hide')
            return
        }
        
        $('#deleteProductCPUModal').modal('show')

        let cpuHtml = ''
        let promise
        selected.forEach((cpu, index) => {
            promise = new Promise((resolve, reject) => {
                $.ajax({
                    url: 'server/src/controller/ChipXuLyController.php',
                    method: 'POST',
                    data: { action: 'get', id: cpu },
                    dataType: 'JSON',
                    success: data => {
                        if (data) {
                            cpuHtml += `"<b class="delete-cpu-id">${data.ten_chip}</b>"`
                            if (index !== selected.length - 1) {
                                cpuHtml += ', '
                            }
                            resolve(cpuHtml)
                        }
                    },
                    error: (xhr, status, error) => {
                        console.log(error)
                    }
                })
            })
        })

        promise.then(cpuHtml => {
            let html = `
                <p>
                    Bạn có chắc chắn muốn xóa CPU
                    ${cpuHtml}
                    không ?
                </p>
                <p class="text-warning"><small>Hành động này sẽ không thể hoàn tác</small></p>
            `

            $('.delete-product-cpu-confirm').html(html)
        })
    })
}

function deleteCPU() {
    $(document).on('click', '.btn-delete-cpu', e => {
        const selected = $('#product-cpu').val()
        let promises = []

        selected.forEach(cpu => {
            let promise = new Promise((resolve, reject) => {
                $.ajax({
                    url: 'server/src/controller/ChipXuLyController.php',
                    method: 'POST',
                    data: { action: 'delete', id: cpu},
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
    $.ajax({
        url: 'server/src/controller/ChipXuLyController.php',
        method: 'POST',
        data: { action: 'get', id },
        dataType: 'JSON',
        success: data => {
            $(`.product-detail-cpu-name-${index}`).text(data.ten_chip)
        },
        error: (xhr, status, error) => {
            console.log(error)
        }
    })
}