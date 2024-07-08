// Hooks
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Libs
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

// Components
import FormItems from "../../Components/FormItems/Index"
import Form from "../../Components/Form/Index"
import Main from "../../Components/Main/Index"
import NavItems from "../../Components/NavItems/Index"
import Navbar from "../../Components/Navbar/Index"
import Footer from '../../Components/Footer/Index'

// Utils
import { signInForm } from '../../assets/js/Utils/formContents'
import { signInFetch } from '../../assets/js/Fetch/signInFetch'
import { signInAction } from '../../assets/js/Utils/actions'

export default function SignIn() {

    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('token');

        if (!token) {
            return;
        }

        const tokenExpiration = new Date(Cookies.get('token_expiration'));
        if (tokenExpiration < new Date()) {

            Cookies.remove('token');
        } else {

            navigate('/dashboard');
        }

    }, [])

    const handleAfterSignIn = (e, result) => {
        if (result.token) {

            if (result.keepLogged) {
                const decodedToken = jwtDecode(result.token)
                const expirationDate = new Date(decodedToken.exp * 1000)
                Cookies.set('token', result.token, { expires: expirationDate, secure: true })
                navigate('/dashboard')

            } else {
    
                Cookies.set('token', result.token, { secure: true })
                navigate('/dashboard')

            }
        }
    }

    return (
        <>
            <Navbar>
                <NavItems 
                    selected={'signin'}
                />
            </Navbar>

            <Main>
                <Form
                    action={signInAction}
                    title={'Acesse sua conta'}
                    btnLabel={'Entrar'}
                    newMessage={null}
                    submitFunction={signInFetch}
                    afterSubmit={handleAfterSignIn}
                >
                    <FormItems
                        formContent={signInForm}
                        checkPassword={null}
                    />
                </Form>
            </Main>
            <Footer />
        </>
    )
}