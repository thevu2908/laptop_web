// hide element when click outside
$(document).on('click', function (e) {
    if (e.target && !e.target.classList.contains('sort-dropdown-button') && e.target.closest('div') && !e.target.closest('div').classList.contains('sort-dropdown-button')) {
        $('.search-product-main .sort-dropdown-button').removeClass('show') 
    }
    // custom form
    $('.custom-form__outline').removeClass('form-outline__border')
    $('.custom-form__outline').each(function () {
        if ($(this).find('.custom-form__input').val() || $(this).find('.custom-form__select').val()) {
            $(this).find('.custom-form__title').show()
        } else {
            $(this).find('.custom-form__title').hide()
        }
    })
    
    $('.search-suggest-container').hide()
    const overSuggest = $('.over-suggest')
    overSuggest.css('opacity', '0')
    overSuggest.css('visibility', 'hidden')
})

// show hide password
const showhidePassword = document.querySelector('.showhide-pwd-icon')
const passwordElement = document.querySelector('.login-password')

if (showhidePassword) {
    showhidePassword.addEventListener('click', e => {
        const passwordIcon = document.querySelector('.showhide-pwd-icon .fa-eye')
        const hidePasswordIcon = document.querySelector('.showhide-pwd-icon .fa-eye-slash')

        if (passwordElement.type === 'password') {
            passwordElement.type = 'text'
            passwordIcon.classList.add('open')
            hidePasswordIcon.classList.remove('open')
        } else {
            passwordElement.type = 'password'
            passwordIcon.classList.remove('open')
            hidePasswordIcon.classList.add('open')
        }

        passwordElement.focus()
    })
}

// show filter product
$(document).on('click', '.show-sort-filter', e => {
    document.querySelector('.sort-filter-menu').classList.toggle('active')
})

// verify otp when sign up
$(document).on('input', '.verify-otp-input', e => {
    $('.verify-otp-input').attr('value', $('.verify-otp-input').val())
    if ($('.verify-otp-input').val().length >= 6) {
        $('.verify-otp-input').addClass('full')
        $('.btn-to-create-pwd').removeClass('disabled')
        $('.btn-to-create-pwd').removeAttr('disabled')
    } else {
        $('.verify-otp-input').removeClass('full')
        $('.btn-to-create-pwd').addClass('disabled')
        $('.btn-to-create-pwd').attr('disabled', true)
    }
})

// count down to confirm otp
function countDownConfirmOtp() {
    let time = 60;
    const countdown = setInterval(() => {
        $('.verify-otp-confirm').html(`Vui lòng xác nhận mã trong ${time} giây`)
        time--
        if (time < 0) {
            clearInterval(countdown)
            $('.verify-otp-resend-title')
                .html(`
                    <span>Bạn vẫn chưa nhận được?</span>
                    <button type="button" class="btn-resend-otp">Gửi lại mã</button>
                `)
            $('.verify-otp-confirm').css('display', 'none')
        }
    }, 1000)
}

// show signup, forget-password password
$(document).on('change', '#signup-show-pwd', e => {
    if ($('#signup-show-pwd').prop('checked')) {
        $('.create-password-form .signup-password').attr('type', 'text')
        $('.forgot-password-main .reset-password').attr('type', 'text')
    } else {
        $('.create-password-form .signup-password').attr('type', 'password')
        $('.forgot-password-main .reset-password').attr('type', 'password')
    }
})

// count down back homepage when signup success
function countDownBackHomePage() {
    let time = 5;
    const countdown = setInterval(() => {
        $('.signup-success-homepage').html(`Bạn sẽ trở về trang chủ trong ${time} giây`)
        time--
        if (time < 0) {
            clearInterval(countdown)
            window.location.href = 'index.php'
        }
    }, 1000)
}

// configre NProgress
NProgress.configure({
    showSpinner: false,
    trickleSpeed: 50,
})

// open modal
$(document).on('click', '.openmodal', function(e) {
    e.preventDefault();
    $('.modal-cart').addClass('open');
});

$(document).on('click', '.closemodal', function(e) {
    e.preventDefault();
    $('.modal-cart').removeClass('open');
});

$(document).on('click', '.modal-cart', function(e) {
    if (e.target !== this) {
        return;
    }
    e.preventDefault();
    $('.modal-cart').removeClass('open');
});

$(document).on('click', ".modal-cart-dialog", function(e) {
    e.stopPropagation();
});

// Đánh giá số sao
$(function() {
	
	$(document).on({
		mouseover: function(event) {
			$(this).find('.far.review').addClass('star-over');
			$(this).prevAll().find('.far.review').addClass('star-over');
		},
		mouseleave: function(event) {
			$(this).find('.far.review').removeClass('star-over');
			$(this).prevAll().find('.far.review').removeClass('star-over');
		}
	}, '.rate');


	$(document).on('click', '.rate', function() {
		if ( !$(this).find('.star.review').hasClass('rate-active') ) {
			$(this).siblings().find('.star.review').addClass('far review').removeClass('fas rate-active');
			$(this).siblings().find('input').removeClass('rate-active');
			$(this).find('.star.review').addClass('rate-active fas').removeClass('far star-over');
            $(this).find('input').addClass('rate-active');
			$(this).prevAll().find('.star.review').addClass('fas').removeClass('far star-over');
		} else {
			console.log('has');
		}
	});
	
});

// show search dropdown
$(document).on('click', '.search-product-main .sort-dropdown-button', function(e) {
    $('.search-product-main .sort-dropdown-button').not($(this)).removeClass('show')
    $(this).toggleClass('show')
    e.stopPropagation()
})

// custom form
$(document).on('click', '.custom-form__outline', function(e) {
    e.stopPropagation()
    $('.custom-form__outline').not($(this)).removeClass('form-outline__border')
    $(this).removeClass('error')
    $(this).siblings('.custom-form__input-error').hide()
    $(this).siblings('.custom-form__input-error').text('')
    $(this).addClass('form-outline__border')
})

$(document).on('input', '.custom-form__input', function(e) {
    if ($(this).val()) {
        $(this).siblings('.custom-form__title').show()
    } else {
        $(this).siblings('.custom-form__title').hide()
    }
})

$(document).on('change', '.custom-form__select', function(e) {
    if ($(this).val()) {
        $(this).siblings('.custom-form__title').show()
    } else {
        $(this).siblings('.custom-form__title').hide()
    }
})