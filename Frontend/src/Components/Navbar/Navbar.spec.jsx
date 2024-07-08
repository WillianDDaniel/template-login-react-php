import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import Navbar from './Index'
import NavItems from '../NavItems/Index'

describe('Navbar', () => {
  it('should render correctly', () => {
    render(
      <Router>
        <Navbar />
      </Router>
    )
    const navElement = screen.getByRole('navigation')
    expect(navElement).toBeInTheDocument()
  })

  it('should render children correctly', () => {
    render(
      <Router>
        <Navbar>
          <NavItems />
        </Navbar>
      </Router>
    )
    const navItemsElement = screen.getByRole('navigation')
    expect(navItemsElement).toContainElement(screen.getByText(/Cadastrar/i))
  })
})
