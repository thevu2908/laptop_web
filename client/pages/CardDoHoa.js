$(document).ready(() => {
    loadGPUData()
    addGPU()
    showDeleteGPUModal()
    deleteGPU()
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

                $('#admin-product-main #product-gpu').html(html)
                $('#admin-product-main #product-gpu').selectpicker('refresh')

                $('#admin-product-detail-main #product-gpu').html(html)
            }
        },
        error: (xhr, status, error) => {
            console.log(error)
        }
    })
}

function addGPU() {
    $(document).on('click', '.btn-add-gpu', e => {
        const name = $('#product-gpu-name').val()

        if (!name) {
            alert('Vui lòng nhập tên GPU')
            return
        }

        $.ajax({
            url: 'server/src/controller/CardDoHoaController.php',
            method: 'POST',
            data: { action: 'add', name },
            success: data => {
                if (data === 'success') {
                    alert('Thêm GPU mới thành công')
                    $('#addProductGPUModal').modal('hide')
                    $('.add-product-gpu-form').trigger('reset')
                    loadGPUData()
                } else {
                    alert('Thêm GPU mới thất bại')
                }
            }
        })
    })
}

function showDeleteGPUModal() {
    $(document).on('click', '.btn-delete-gpu-modal', e => {
        const selected = $('#product-gpu').val()

        if (selected.length === 0) {    
            alert('Vui lòng chọn GPU cần xóa')
            $('#deleteProductGPUModal').modal('hide')
            return
        }
        
        $('#deleteProductGPUModal').modal('show')

        let gpuHtml = ''
        let promise
        selected.forEach((gpu, index) => {
            promise = new Promise((resolve, reject) => {
                $.ajax({
                    url: 'server/src/controller/CardDoHoaController.php',
                    method: 'POST',
                    data: { action: 'get', id: gpu },
                    dataType: 'JSON',
                    success: data => {
                        if (data) {
                            gpuHtml += `"<b class="delete-gpu-id">${data.ten_card}</b>"`
                            if (index !== selected.length - 1) {
                                gpuHtml += ', '
                            }
                            resolve(gpuHtml)
                        }
                    },
                    error: (xhr, status, error) => {
                        console.log(error)
                    }
                })
            })
        })

        promise.then(gpuHtml => {
            let html = `
                <p>
                    Bạn có chắc chắn muốn xóa GPU
                    ${gpuHtml}
                    không ?
                </p>
                <p class="text-warning"><small>Hành động này sẽ không thể hoàn tác</small></p>
            `

            $('.delete-product-gpu-confirm').html(html)
        })
    })
}

function deleteGPU() {
    $(document).on('click', '.btn-delete-gpu', e => {
        const selected = $('#product-gpu').val()
        let promises = []

        selected.forEach(gpu => {
            let promise = new Promise((resolve, reject) => {
                $.ajax({
                    url: 'server/src/controller/CardDoHoaController.php',
                    method: 'POST',
                    data: { action: 'delete', id: gpu },
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
                alert('Xóa GPU thất bại')
            } else {
                alert('Xóa GPU thành công')
                $('#deleteProductGPUModal').modal('hide')
                loadGPUData()
            }
        })
    })
}

function renderGPUName(id, index) {
    $.ajax({
        url: 'server/src/controller/CardDoHoaController.php',
        method: 'POST',
        data: { action: 'get', id },
        dataType: 'JSON',
        success: data => {
            $(`.product-detail-gpu-name-${index}`).text(data.ten_card)
        },
        error: (xhr, status, error) => {
            console.log(error)
        }
    })
}