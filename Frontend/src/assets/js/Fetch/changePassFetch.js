export async function changePassFetch(e, email, code) {
    const form = e.target

    const data = {
        code: parseInt(code),
        email: email,
        password: form.password.value,
        confirmPassword: form.confirmPassword.value
    }

    if(data.password !== data.confirmPassword) {
        return {
            success: false,
            message: 'As senhas não correspondem'
        }
    }

    console.log(data)
    const url = form.action

    const options = {
        method: 'POST',
        body: JSON.stringify(data)
    }

    const result = await fetch(url, options)
        .then((res) => {
            return res.json()
        })
        .catch((err) => {
            console.error(err)
        })

    return result
}