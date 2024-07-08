import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import ConfirmCode from './Index'

describe('<ConfirmCode/>', () => {

    it('should renders the ConfirmCode component with the correct props', () => {
        const email = 'test@example.com'
        const confirmedCodeLoading = false

        render(
            <ConfirmCode
                email={email}
                confirmedCodeLoading={confirmedCodeLoading}
            />
        )

        const emailElement = screen.getByText(email)
        const loadingElement = screen.queryByTestId('loading')

        expect(emailElement).toBeInTheDocument()
        expect(loadingElement).toBeNull()
    })

    it('should displays the loading state when confirmedCodeLoading is true', () => {
        render(
            <ConfirmCode
                email='test@example.com'
                confirmedCodeLoading={true}
            />
        )

        const loadingElement = screen.getByTestId('loading')

        expect(loadingElement).toBeInTheDocument()
    })
})