function addCustomer(name, phone, email, address) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/KhachHangController.php',
            method: 'POST',
            data: { action: 'add', name, phone, email, address },
            success: res => res === 'success' ? resolve(true) : resolve(false),
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}

function updateCustomer(id, name, phone, email, address) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/KhachHangController.php',
            method: 'POST',
            data: { action: 'update', id, name, phone, email, address },
            success: res => res === 'success' ? resolve(true) : resolve(false),
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })

}

function getCustomer(id) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/KhachHangController.php',
            method: 'POST',
            data: { action: 'get-customer', id },
            dataType: 'JSON',
            success: customer => resolve(customer),
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}