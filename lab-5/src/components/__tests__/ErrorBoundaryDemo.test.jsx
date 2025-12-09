import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { ErrorBoundaryDemo } from '../ErrorBoundaryDemo.jsx'

describe('ErrorBoundaryDemo', () => {
  let consoleErrorSpy

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    consoleErrorSpy.mockRestore()
  })

  it('shows a fallback UI when the Bomb throws and recovers on reset', async () => {
    const user = userEvent.setup()
    render(<ErrorBoundaryDemo />)

    await user.click(screen.getByRole('button', { name: /trigger error/i }))

    const alert = await screen.findByRole('alert')
    expect(alert).toHaveTextContent(/something went wrong/i)
    expect(screen.queryByText(/everything is stable/i)).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /try again/i }))

    expect(await screen.findByText(/everything is stable/i)).toBeVisible()
  })
})
