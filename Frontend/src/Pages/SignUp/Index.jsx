// Hooks
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

// Components
import Navbar from "../../Components/Navbar/Index";
import NavItems from "../../Components/NavItems/Index";
import Main from "../../Components/Main/Index";
import Form from "../../Components/Form/Index";
import FormItems from "../../Components/FormItems/Index";
import Footer from "../../Components/Footer/Index";
import ConfirmCode from "../../Components/ConfirmCode/Index";

// Utils
import { signUpAction, confirmAccountAction } from '../../assets/js/Utils/actions'
import { signUpForm } from '../../assets/js/Utils/formContents'
import { confirmationPassword } from '../../assets/js/Utils/confirmPassword'

// JS Fetch's
import { signUpFetch } from '../../assets/js/Fetch/signUpFetch'
import { confirmAccountFetch } from "../../assets/js/Fetch/confirmAccountFetch";


export default function SignUp() {

    const navigate = useNavigate()

    const [confirmCode, setConfirmCode] = useState(false)
    const [confirmCodeLoading, setConfirmCodeLoading] = useState(false)
    const [email, setEmail] = useState('')

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

    const handleAfterSignUp = (e, result) => {
        const email = e.target.email.value
        setConfirmCode(true)
        setEmail(email)
    }

    const handleAfterConfirmCode = (e, result) => {
        if (result.success) {
            setConfirmCodeLoading(true)

            setTimeout(()=> {
                setConfirmCodeLoading(false)
                navigate('/signin')
            }, 3700)
        }
    }

    return (
        <>
            <Navbar>
                <NavItems 
                    selected={'signup'}
                />
            </Navbar>

            <Main>

                {/* <button onClick={() => setConfirmCode(!confirmCode)}>toogle</button> */}
                {!confirmCode &&
                    <Form
                        action={signUpAction}
                        title={'Criar conta'}
                        btnLabel={'Cadastrar'}
                        submitFunction={signUpFetch}
                        newMessage={passwordMessage}
                        afterSubmit={handleAfterSignUp}
                    >
                        <FormItems
                            formContent={signUpForm}
                            checkPassword={handleCheckPassword}
                        />
                    </Form>
                }

                {confirmCode &&
                    <Form
                        action={confirmAccountAction}
                        title={'Confirmar código'}
                        btnLabel={'Enviar'}
                        submitFunction={(e) => confirmAccountFetch(e, email)}
                        newMessage={null}
                        afterSubmit={handleAfterConfirmCode}
                    >
                        <ConfirmCode
                            email={email}
                            confirmedCodeLoading={confirmCodeLoading}
                        />
                    </Form>
                }
            </Main>
            <Footer/>
        </>
    )
}