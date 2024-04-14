// show hide password
const showhidePassword = document.querySelector('.showhide-pwd-icon')
const passwordElement = document.querySelector('.login-password')

if (showhidePassword) {
    showhidePassword.addEventListener('click', e => {
        const passwordIcon = document.querySelector('.showhide-pwd-icon .fa-eye')
        const hidePasswordIcon = document.querySelector('.showhide-pwd-icon .fa-eye-slash')

        if (passwordElement.type === 'password') {
            passwordElement.type = 'text'
            passwordIcon.classList.remove('open')
            hidePasswordIcon.classList.add('open')
        } else {
            passwordElement.type = 'password'
            passwordIcon.classList.add('open')
            hidePasswordIcon.classList.remove('open')
        }

        passwordElement.focus()
    })
}

// show filter product
const showSortFilter = document.querySelector('.show-sort-filter')
const sortFilterList = document.querySelector('.sort-filter-menu')

if (showSortFilter) {
    showSortFilter.addEventListener('click', e => {
        sortFilterList.classList.toggle('active')
    })
}

// add quantity
$('input.input-qty').each(function () {
    var $this = $(this),
        qty = $this.parent().find(".is-form"),
        min = Number($this.attr('min')),
        max = Number($this.attr('max'));

    if (min == 0) {
        var d = 0;
    }
    else {
        var d = min;
    }
    $(qty).on('click', function () {
        if ($(this).hasClass('minus')) {
            if (d > min) d += -1;
        } else if ($(this).hasClass('plus')) {
            var x = Number($this.val()) + 1;
            if (x <= max) d += 1;
        }
        $this.attr('value', d).val(d);
    });
});

// verify otp when sign up
const verifyOtpInput = document.querySelector('.verify-otp-input')
const btnToCreatePwd = document.querySelector('.btn-to-create-pwd')

if (verifyOtpInput && btnToCreatePwd) {
    verifyOtpInput.addEventListener('input', e => {
        verifyOtpInput.setAttribute('value', verifyOtpInput.value)

        if (verifyOtpInput.value.length >= 6) {
            verifyOtpInput.classList.add('full')
            btnToCreatePwd.classList.remove('disabled')
            btnToCreatePwd.removeAttribute('disabled')
        } else {
            verifyOtpInput.classList.remove('full')
            btnToCreatePwd.classList.add('disabled')
            btnToCreatePwd.setAttribute('disabled', true)
        }
    })
}

// count down to confirm otp
const resendOtp = document.querySelector('.verify-otp-confirm')

if (resendOtp) {
    let time = 60;
    const countdown = setInterval(() => {
        resendOtp.innerHTML = `Vui lòng xác nhận mã trong ${time} giây`
        time--
        if (time < 0) {
            clearInterval(countdown)
            const html = `
                <span>Bạn vẫn chưa nhận được?</span>
                <button class="btn-resend-otp">Gửi lại mã</button>
            `
            document.querySelector('.verify-otp-resend-title').innerHTML = html
            resendOtp.style.display = 'none'
        }
    }, 1000)
}

// show signup password
const showHidePwdSignup = document.querySelector('#signup-show-pwd')

if (showHidePwdSignup) {
    const signUpPassword = document.querySelectorAll('.create-password-form .signup-password')

    showHidePwdSignup.addEventListener('change', e => {
        if (showHidePwdSignup.checked) {
            signUpPassword.forEach(password => {
                password.type = 'text'
            })
        } else {
            signUpPassword.forEach(password => {
                password.type = 'password'
            })
        }
    })
}

// count down back homepage when signup success
const backHomePage = document.querySelector('.signup-success-homepage')

if (backHomePage) {
    let time = 5;
    const countdown = setInterval(() => {
        backHomePage.innerHTML = `Bạn sẽ trở về trang chủ trong ${time} giây`
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
$('.openmodal').click((e) => {
    e.preventDefault();
    $('.modal-cart').addClass('open');
});

$('.closemodal').click((e) => {
    e.preventDefault();
    $('.modal-cart').removeClass('open');
});

$('.modal-cart').click((e) => {
    e.preventDefault();
    $('.modal-cart').removeClass('open');
});

$(".modal-cart-dialog").click((e) => {
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

