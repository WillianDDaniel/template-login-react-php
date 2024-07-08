import { fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import '@testing-library/jest-dom'
import Form from './Index'
import { vi } from 'vitest'


describe('<Form/>', () => {

    it('should render the form with correct props texts', () => {
        render(
            <Form
                title={'SomeTitle'}
                btnLabel={'BtnName'}
            />
        )

        const title = screen.getByText(/SomeTitle/i)
        const button = screen.getByText(/BtnName/i)

        expect(title).toBeInTheDocument()
        expect(button).toBeInTheDocument()
    })

    it('should render "Esqueci minha senha" when the button label is "Entrar"', () => {
        render(
            <BrowserRouter>
                <Form
                    btnLabel={'Entrar'}
                />
            </BrowserRouter>
        )

        const forgotPasswordLink = screen.getByRole('link', { name: /Esqueci minha senha/i });
        expect(forgotPasswordLink).toBeInTheDocument();
    })

    it('should redirect to "/forgot-pass" Page, When "Esqueci minha senha" is clicked', () => {
        render(
            <BrowserRouter>
                <Form
                    btnLabel={'Entrar'}
                />
            </BrowserRouter>
        )

        const forgotPasswordLink = screen.getByRole('link', { name: /Esqueci minha senha/i });
        fireEvent.click(forgotPasswordLink)
        expect(window.location.pathname).toBe('/forgot-pass')
    })

    it('should render "Manter-me conectado" when in the page SignIn (btnLabel = Entrar)', () => {
        render(
            <BrowserRouter>
                <Form
                    btnLabel={'Entrar'}
                />
            </BrowserRouter>
        )

        const keepLogged = screen.getByText(/Manter-me conectado/i)

        expect(keepLogged).toBeInTheDocument()
    })

    it('should render a checkbox input when in the page SignIn (btnLabel = Entrar)', () => {
        render(
            <BrowserRouter>
                <Form
                    btnLabel={'Entrar'}
                />
            </BrowserRouter>
        )

        const keepLoggedInput = screen.getByRole('checkbox')

        expect(keepLoggedInput).toBeInTheDocument()
        expect(keepLoggedInput.name).toBe('keepLogged')
    })

})