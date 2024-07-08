import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Components
import Footer from "../../Components/Footer/Index";
import Main from "../../Components/Main/Index";
import NavItems from "../../Components/NavItems/Index";
import Navbar from "../../Components/Navbar/Index";
import Form from "../../Components/Form/Index"
import FormItems from "../../Components/FormItems/Index"
import ConfirmCode from "../../Components/ConfirmCode/Index";

//Fetch's
import { confirmCodeFetch } from "../../assets/js/Fetch/confirmCodeFetch"
import { forgotPassFetch } from "../../assets/js/Fetch/forgotPassFetch"
import { changePassFetch } from "../../assets/js/Fetch/changePassFetch"

// Utils
import {
    changePassAction,
    confirmCodeAction,
    forgotPassAction,
} from "../../assets/js/Utils/actions"
import { forgotPassForm, changePassForm } from "../../assets/js/Utils/formContents"
import { confirmationPassword } from '../../assets/js/Utils/confirmPassword'

export default function ForgotPass() {

    const [forgotPassState, setForgotPassState] = useState('requestNewPass')
    const [email, setEmail] = useState('')
    const [code, setCode] = useState('')
    const [confirmCodeLoading, setConfirmCodeLoading] = useState(false)
    const navigate = useNavigate()

    // Is set False to doesn't show the message 
    // And set the message when password confirm doesn't matches
    const [passwordMessage, setPasswordMessage] = useState(false)

    // Check if is equal password and confirmPassword
    const handleCheckPassword = (e) => {
        const checkPassEqual = confirmationPassword(e)

        // If is equal the message is set to false and not appears on the screen
        if (checkPassEqual) {
            setPasswordMessage(false)
        } else {
            setPasswordMessage('As senhas não correspondem')
        }
    }

    const handleAfterRequestNewPass = (e, result) => {
        setEmail(e.target.email.value)
        setForgotPassState('confirmCode')
    }

    const handleAfterCorfirmCode = (e, result) => {
        setCode(e.target.code.value)
        setConfirmCodeLoading(true)

        setTimeout(() => {
            setConfirmCodeLoading(false)
            setForgotPassState('changePass')
        }, 3700)
    }

    const handleAfterChangePass = () => {
        setTimeout(() => {
            navigate('/signin')
        }, 2000)
    }

    return (
        <>
            <Navbar>
                <NavItems />
            </Navbar>

            <Main>
                {forgotPassState === 'requestNewPass' &&

                    <Form
                        title='Esqueci a senha'
                        btnLabel='Enviar'
                        action={forgotPassAction}
                        submitFunction={forgotPassFetch}
                        afterSubmit={handleAfterRequestNewPass}
                    >
                        <FormItems
                            formContent={forgotPassForm}
                        />
                    </Form>
                }

                {forgotPassState === 'confirmCode' &&

                    <Form
                        title='Confirmar o código'
                        btnLabel='Enviar'
                        action={confirmCodeAction}
                        submitFunction={(e) => confirmCodeFetch(e, email)}
                        afterSubmit={handleAfterCorfirmCode}
                    >
                        <ConfirmCode
                            email={email}
                            confirmedCodeLoading={confirmCodeLoading}
                        />
                    </Form>
                }

                {forgotPassState === 'changePass' &&

                    <Form
                        title='Criar nova senha'
                        btnLabel='Enviar'
                        action={changePassAction}
                        submitFunction={(e) => changePassFetch(e, email, code)}
                        newMessage={passwordMessage}
                        afterSubmit={handleAfterChangePass}
                    >
                        <FormItems
                            formContent={changePassForm}
                            checkPassword={handleCheckPassword}
                        />
                    </Form>
                }
            </Main >

            <Footer />
        </>
    )
}