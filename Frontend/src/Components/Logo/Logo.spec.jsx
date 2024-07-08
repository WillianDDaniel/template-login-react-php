import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from "react-router-dom"
import Logo from './Index'


describe('<Logo/>', () => {
    it('should contain Logo', () => {
        render(
            <BrowserRouter>
                <Logo />
            </BrowserRouter>
        )

        // When you'll customizing this project make sure change this test to exact name ou role your logo
        const logoElement = screen.getByText(/Logo/i)
        expect(logoElement).toBeInTheDocument()
    })

    it('should redirect to home page when clicked in logo', () => {
        render(
            <BrowserRouter>
                <Logo />
            </BrowserRouter>
        )

        const clickedOnLogo = screen.getByText(/Logo/i)
        
        // Simulate click on "Logo" button
        fireEvent.click(clickedOnLogo)
        expect(window.location.pathname).toBe('/')
    })
})
