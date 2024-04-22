function sendEmailOtp(email) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/SignUpController.php',
            method: 'POST',
            data: { action: 'send-otp', email },
            success: otp => resolve(otp),
            error: (xhr, status, error) => {
                console.log(error)
                reject(error)
            }
        })
    })
}