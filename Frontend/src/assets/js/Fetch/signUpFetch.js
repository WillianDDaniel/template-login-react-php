export async function signUpFetch(e) {
    const form = e.target

    const data = {
        name: form.name.value,
        lastName: form.lastName.value,
        email: form.email.value,
        password: form.password.value,
        confirmPassword: form.confirmPassword.value,
    }

    if (data.confirmPassword !== data.password) {
        return {
            success: false,
            message: "As senhas não correspondem"
        }
    }

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