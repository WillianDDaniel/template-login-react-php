import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Main from './Index'

describe('Main Component', () => {
  it('should render children correctly', () => {
    render(
      <Main>
        <div data-testid="child">Child Component</div>
      </Main>
    )
    const childElement = screen.getByTestId('child')
    expect(childElement).toBeInTheDocument()
  })
})
