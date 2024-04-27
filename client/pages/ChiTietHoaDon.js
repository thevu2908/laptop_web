function getChiTietHoaDon(ma_hd) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/CTHDController.php',
            method: 'POST',
            data: { action: 'get-cthd', ma_hd },
            dataType: 'JSON',
            success: cthd => resolve(cthd),
            error: (xhr, status, error) => reject(error)
        })
    })
}