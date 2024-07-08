export async function confirmCodeFetch(e, email) {
    const form = e.target

    const data = {
        code: parseInt(form.code.value),
        email: email,
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