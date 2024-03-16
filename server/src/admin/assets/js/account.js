const addModalEmployee = document.querySelector('#admin-account-employee-choose')
const addModalAccountId = document.querySelector('#admin-account-id')
const addModalAccountPwd = document.querySelector('#admin-account-password')
const editModalAccountId = document.querySelector('#admin-account-id-edit')
const editModalAccountPwd = document.querySelector('#admin-account-password-edit')
const showHidePwds = document.querySelectorAll('.showhide-pwd-icon')

function showAccountId() {
    if (addModalAccountId && addModalEmployee) {
        addModalAccountId.value = addModalEmployee.value
    }
}

if (addModalEmployee) {
    addModalEmployee.addEventListener('change', e => {
        addModalAccountId.value = addModalEmployee.value
    })
}

if (showHidePwds) {
    showHidePwds.forEach(showHidePwd => {
        showHidePwd.addEventListener('click', e => {
            const passwordIcons = document.querySelectorAll('.showhide-pwd-icon .fa-eye')
            const hidePasswordIcons = document.querySelectorAll('.showhide-pwd-icon .fa-eye-slash')
    
            if (addModalAccountPwd.type === 'password') {
                addModalAccountPwd.type = 'text'
                editModalAccountPwd.type = 'text'

                passwordIcons.forEach(passwordIcon => {
                    passwordIcon.classList.remove('open')
                })
                hidePasswordIcons.forEach(hidePasswordIcon => {
                    hidePasswordIcon.classList.add('open')
                })
            } else {
                addModalAccountPwd.type = 'password'
                editModalAccountPwd.type = 'password'

                passwordIcons.forEach(passwordIcon => {
                    passwordIcon.classList.add('open')
                })
                hidePasswordIcons.forEach(hidePasswordIcon => {
                    hidePasswordIcon.classList.remove('open')
                })
            }
    
            addModalAccountPwd.focus()
            editModalAccountPwd.focus()
        })
    })
}