import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { LoginForm } from '../LoginForm.jsx'

describe('LoginForm integration flow', () => {
  it('submits credentials and surfaces the welcome message', async () => {
    render(<LoginForm />)
    const user = userEvent.setup()

    await user.type(screen.getByLabelText(/email/i), 'learner@lab.com')
    await user.type(screen.getByLabelText(/password/i), 'lab5')
    await user.click(screen.getByRole('button', { name: /login/i }))

    expect(await screen.findByText(/welcome back, learner@lab.com/i)).toBeVisible()
  })
})
