import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Footer from './Index'

it('renders footer with developer name', () => {
  render(<Footer />)
  expect(screen.getByText(/Desenvolvido com ❤️ por/i)).toBeInTheDocument()
  expect(screen.getByText(/Willian D\. Daniel/i)).toBeInTheDocument()
})
