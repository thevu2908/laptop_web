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

const showSortFilter = document.querySelector('.show-sort-filter')
const sortFilterList = document.querySelector('.sort-filter-menu')

if (showSortFilter) {
    showSortFilter.addEventListener('click', e => {
        sortFilterList.classList.toggle('active')
    })
}

$('input.input-qty').each(function() {
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
    $(qty).on('click', function() {
        if ($(this).hasClass('minus')) {
            if (d > min) d += -1;
        } else if ($(this).hasClass('plus')) {
            var x = Number($this.val()) + 1;
            if (x <= max) d += 1;
        }
        $this.attr('value', d).val(d);
    });
});
