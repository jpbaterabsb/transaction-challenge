import { render, screen } from '@testing-library/react'
import { LoginInput } from './LoginInput'

describe('LoginInput.tsx', () => {
  it('render login input text', () => {
    render(<LoginInput label='Username' name='username' testid='username' type='text' value='' onChange={() => {}} />)
    expect(screen.getByText('Username:')).toHaveClass('font-bold')
    expect(screen.getByTestId('username')).toHaveProperty('type', 'text')
  })

  it('render login input password', () => {
    render(<LoginInput label='Password' name='password' testid='password' type='password' value='' onChange={() => {}} />)
    expect(screen.getByText('Password:')).toHaveClass('font-bold')
    expect(screen.getByTestId('password')).toHaveProperty('type', 'password')
  })
})
