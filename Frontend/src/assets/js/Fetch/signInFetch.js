export async function signInFetch(e) {
    const form = e.target

    const data = {
        email: form.email.value,
        password: form.password.value,
    }

    const keepLogged = form.keepLogged.checked

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

    return { ...result, keepLogged}
}