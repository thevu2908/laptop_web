function getLoginSession() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/GetSessionController.php',
            method: 'POST',
            data: { action: 'get-login' },
            dataType: 'JSON',
            success: res => resolve(res),
            error: (xhr, status, error) => reject(error)
        })
    })
}