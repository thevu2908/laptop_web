$(document).ready(() => {
    loadOSData()
    handleAddOS()
    renderDeleteOSModal()
    hanldeDeleteOS()
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
        error: (xhr, status, error) => console.log(error)
    })
}

function addOS(name) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/HeDieuHanhController.php',
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

function handleAddOS() {
    $(document).on('click', '.btn-add-os', e => {
        const name = $('#product-os-name').val()

        if (!name) {
            alert('Vui lòng nhập tên hệ điều hành')
            return
        }

        addOS(name)
            .then(res => {
                if (res) {
                    alert('Thêm hệ điều hành mới thành công')
                    $('#addProductOSModal').modal('hide')
                    $('.add-product-os-form').trigger('reset')
                    loadOSData()
                } else {
                    alert('Thêm hệ điều hành mới thất bại')
                }
            })
            .catch(error => console.log(error))
    })
}

function getOS(id) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/HeDieuHanhController.php',
            method: 'POST',
            data: { action: 'get', id },
            dataType: 'JSON',
            success: os => resolve(os),
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}

function renderDeleteOSModal() {
    $(document).on('click', '.btn-delete-os-modal', e => {
        const id = $('#admin-product-main #product-os').val()

        getOS(id)
            .then(os => {
                if (os) {
                    const html = `
                        <p>
                            Bạn có chắc chắn muốn xóa hệ điều hành
                            "<b class="delete-os-id">${os.ten_hdh}</b>"
                            không ?
                        </p>
                        <p class="text-warning"><small>Hành động này sẽ không thể hoàn tác</small></p>
                    `

                    $('.delete-product-os-confirm').html(html)
                }
            })
            .catch(error => console.log(error))
    })
}

function deleteOS(id) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/HeDieuHanhController.php',
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

function hanldeDeleteOS() {
    $(document).on('click', '.btn-delete-os', e => {
        const id = $('#admin-product-main #product-os').val()

        deleteOS(id)
            .then(res => {
                if (res) {
                    alert('Xóa hệ điều hành thành công')
                    $('#deleteProductOSModal').modal('hide')
                    loadOSData()
                } else {
                    alert('Xóa hệ điều hành thất bại')
                }
            })
            .catch(error => console.log(error))
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

async function handleImportOS(name) {
    try {
        let id = await getOSId(name)
        if (!id) {
            const res = await addOS(name)
            if (res) {
                id = await getOSId(name)
            }
        }
        return id
    } catch (error) {
        console.log(error)
        return null
    }
}