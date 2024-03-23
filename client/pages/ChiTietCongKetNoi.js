function addChiTietCong(plugId, productDetailId) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/CTCongKetNoiController.php',
            method: 'POST',
            data: { action: 'add', plugId, productDetailId },
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