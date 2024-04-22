$(document).ready(() => {
    handleSendFeedBack()
})

function validateFeedBack(name, email, phone, feedback) {
    if (!name) {
        $('.contact-form #customer-name').addClass('is-invalid')
        $('.contact-form #customer-name').focus()
        $('.contact-form #name-error').css('display', 'block')
        return false
    }
    if (!email) {
        $('.contact-form #customer-email').addClass('is-invalid')
        $('.contact-form #customer-email').focus()
        $('.contact-form #email-error').css('display', 'block')
        return false
    }
    if (!phone) {
        $('.contact-form #customer-phone').addClass('is-invalid')
        $('.contact-form #customer-phone').focus()
        $('.contact-form #phone-error').css('display', 'block')
        return false
    }
    if (!feedback) {
        $('.contact-form #customer-feedback').addClass('is-invalid')
        $('.contact-form #customer-feedback').focus()
        $('.contact-form #feedback-error').css('display', 'block')
        return false
    }
    if (!isValidEmail(email)) {
        $('.contact-form #customer-email').addClass('is-invalid')
        $('.contact-form #customer-email').focus()
        $('.contact-form #email-error').text('Email không hợp lệ')
        $('.contact-form #email-error').css('display', 'block')
        return false
    }
    if (!isValidPhone(phone)) {
        $('.contact-form #customer-phone').addClass('is-invalid')
        $('.contact-form #customer-phone').focus()
        $('.contact-form #phone-error').text('Số điện thoại không hợp lệ hoặc không tồn tại')
        $('.contact-form #phone-error').css('display', 'block')
        return false
    }

    $('.contact-form #customer-name').removeClass('is-invalid')
    $('.contact-form #name-error').css('display', 'none')
    $('.contact-form #customer-email').removeClass('is-invalid')
    $('.contact-form #email-error').css('display', 'none')
    $('.contact-form #customer-phone').removeClass('is-invalid')
    $('.contact-form #phone-error').css('display', 'none')
    $('.contact-form #customer-feedback').removeClass('is-invalid')
    $('.contact-form #feedback-error').css('display', 'none')
    return true
}

function sendFeedback(name, email, phone, feedback) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'server/src/controller/FeedBackController.php',
            type: 'POST',
            data: { action: 'send-feedback', name, email, phone, feedback },
            success: res => resolve(res),
            error: (xhr, status, error) => reject(error)
        })
    })
}

function handleSendFeedBack() {
    $('.btn-send-feedback').on('click', async e => {
        e.preventDefault()
        const name = $('.contact-form #customer-name').val()
        const email = $('.contact-form #customer-email').val()
        const phone = $('.contact-form #customer-phone').val()
        const feedback = $('.contact-form #customer-feedback').val()

        if (!validateFeedBack(name, email, phone, feedback)) return

        NProgress.start()
        try {
            const res = await sendFeedback(name, email, phone, feedback)
            if (res === 'success') {
                $('.contact-form #customer-name').val('')
                $('.contact-form #customer-email').val('')
                $('.contact-form #customer-phone').val('')
                $('.contact-form #customer-feedback').val('')
                alert('Cảm ơn bạn đã góp ý, chúng tôi sẽ phản hồi sớm nhất có thể!')
            } else {
                console.log(res)
                alert('Có lỗi xảy ra, vui lòng thử lại sau!')
            }
        } catch (error) {
            console.log(error)
            alert('Có lỗi xảy ra, vui lòng thử lại sau!')
        }
        NProgress.done()
    })
}