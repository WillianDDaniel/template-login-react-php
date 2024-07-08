import { useEffect, useState } from "react"
import Loading from "../Loading/Index"
import { Link } from "react-router-dom"

/**
 * The `Form` component in JavaScript React handles form submission, displays messages, and includes
 * loading state functionality.
 */
export default function Form({
    action, // The URL to send the form data to when submitted
    title, // The title of the form
    submitFunction, // The function to call when the form is submitted
    btnLabel, // The label for the submit button
    afterSubmit, // The function to call after the form has been successfully submitted
    newMessage, // The new message to display in the form
    children, // The child elements of the form
}) {

    useEffect(() => {
        setMessage(newMessage)
    }, [newMessage])

    const [message, setMessage] = useState(false)
    const [loading, setLoading] = useState(false)

    /**
     * The `handleSubmit` function is an asynchronous function that handles form submission, sets
     * loading state, calls a submit function, and updates message and loading state based on the
     * result.
     */
    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)
        const result = await submitFunction(e)
        
        if (result.success) {

            setMessage(result.message)
            afterSubmit(e, result)
            setLoading(false)

        } else {
            setMessage(result.message)
            setLoading(false)
        }
    }

    return (
        
        <form action={action} onSubmit={handleSubmit}
            className="relative flex flex-col items-center bg-gradient-to-bl from-green-200 to-sky-200 mt-5 w-5/12 rounded"
        >

            <div className="flex flex-wrap w-full h-full justify-center">

                <h2 className="text-2xl p-2 w-full flex justify-center">
                    {title}
                </h2>

                {children}

            </div>

            {btnLabel === 'Entrar' &&
                <div>
                    <input name="keepLogged" type="checkbox" className="mr-2" /> Manter-me conectado
                </div>
            }

            <div className="h-6 mt-[-2px] mb-1 text-sm text-red-800">
                {message &&
                    message
                }
            </div>

            <div className="w-full flex justify-center px-2 pb-5">

                <button type="submit"
                    className="bg-green-600 w-10/12 py-0.5 rounded"
                >
                    {btnLabel}
                </button>

            </div>

            {btnLabel === 'Entrar' &&
                <div className="mb-5 italic">
                    <Link to='/forgot-pass'>
                        Esqueci minha senha
                    </Link>
                </div>
            }

            <Loading
                loading={loading}
            />

        </form>
    )
}