import { BrowserRouter as Router } from 'react-router-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import NavItems from './Index'

describe('NavItems', () => {
  it('should renders correctly buttons on screen', () => {
    render(
      <Router>
        <NavItems />
      </Router>
    )

    const signUpButton = screen.getByText(/Cadastrar/i)
    const signInButton = screen.getByText(/Entrar/i)

    expect(signUpButton).toBeInTheDocument()
    expect(signInButton).toBeInTheDocument()
  })

  it('should redirects to correct routes when clicked', () => {
    render(
      <Router>
        <NavItems />
      </Router>
    )

    const signUpButton = screen.getByText(/Cadastrar/i)
    const signInButton = screen.getByText(/Entrar/i)

    // Simulate click on "Cadastrar" button
    fireEvent.click(signUpButton)
    expect(window.location.pathname).toBe('/signup')

    // Simulate click on "Entrar" button
    fireEvent.click(signInButton)
    expect(window.location.pathname).toBe('/signin')
  })
})
