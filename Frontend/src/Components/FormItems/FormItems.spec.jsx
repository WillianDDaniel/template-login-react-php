import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import FormItems from './Index'
import { vi } from 'vitest'

describe('<FormItems/>', () => {

    const formContent = [
        { label: 'First Name', name: 'firstName', type: 'text', placeHolder: 'Enter your Name' },
        { label: 'Last Name', name: 'lastName', type: 'text', placeHolder: 'Enter your Last name' },
        { label: 'Email', name: 'email', type: 'email', placeHolder: 'Enter your email' },
        { label: 'Password', name: 'password', type: 'password', minLength: 8 },
    ];

    it('should render the component labels correctly', () => {
        render(
            <FormItems formContent={formContent} checkPassword={null} />
        )

        const labels = screen.getAllByLabelText(/First Name|Last Name|Email|Password/i)
        expect(labels.length).toBe(4)
    })

    it('should sets input attributes correctly', () => {

        render(
            <FormItems formContent={formContent} checkPassword={null} />
        )

        const emailInput = screen.getByLabelText(/Email/i)
        const passwordInput = screen.getByLabelText(/Password/i)
        const nameInput = screen.getByLabelText(/First Name/i)
        const lastNameInput = screen.getByLabelText(/Last Name/i)

        expect(emailInput.type).toBe('email')
        expect(passwordInput.type).toBe('password')
        expect(nameInput.type).toBe('text')
        expect(lastNameInput.type).toBe('text')

    })

    it('should be all inputs required', () => {
        
        render(
            <FormItems formContent={formContent} checkPassword={null} />
        )
        
        const allInputs = screen.getAllByRole('input')
        
        allInputs.forEach(input => expect(input.required).toBe(true))
    })
    
    it('should password inputs have minLength = 8', () => {
        
        render(
            <FormItems formContent={formContent} checkPassword={null} />
        )
        
        const passwordInput = screen.getByLabelText(/Password/i)
        
        expect(passwordInput.minLength).toBe(8)
    })
    
    // Here is only when is passed a function to do this, in signup form, not in signin form
    it('should call onChange function for password inputs', () => {
        const mockCheckPassword = vi.fn()
        
        render(
            <FormItems formContent={formContent} checkPassword={mockCheckPassword} />
        )
        
        const passwordInput = screen.getByLabelText(/Password/i)
        
        fireEvent.change(passwordInput, { target: { value: 'new password' } })
        expect(mockCheckPassword).toHaveBeenCalledTimes(1)
    })
})