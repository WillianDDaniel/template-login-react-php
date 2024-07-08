export async function forgotPassFetch(e) {
    const form = e.target

    const data = {
        email: form.email.value,
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