let password = '';
let confirmPassword = '';

export function confirmationPassword(e) {

    if(e.target.name === 'password') {
        password = e.target.value
    }

    if(e.target.name === 'confirmPassword') {
        confirmPassword = e.target.value
    }

    if(password === '' || confirmPassword === '') {
        return true
    }
    
    if(password !== confirmPassword) {
        return false
    }

    return true
}