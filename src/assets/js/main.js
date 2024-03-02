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