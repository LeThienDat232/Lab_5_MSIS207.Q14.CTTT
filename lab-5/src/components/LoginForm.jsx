import { useState } from 'react'

const fakeLogin = ({ email, password }) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (password === 'lab5') {
        resolve({ message: `Welcome back, ${email}!` })
      } else {
        reject(new Error('Invalid credentials'))
      }
    }, 700)
  })

export function LoginForm() {
  const [formState, setFormState] = useState({ email: '', password: '' })
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus('loading')
    setMessage('')

    try {
      const response = await fakeLogin(formState)
      setMessage(response.message)
      setStatus('success')
    } catch (error) {
      setMessage(error.message)
      setStatus('error')
    }
  }

  return (
    <section className="panel">
      <header>
        <h2>Exercise 4.1: Login Form (Integration Test Target)</h2>
        <p className="muted">
          Submit the form using user interactions; await the &quot;Welcome back&quot; message to assert
          success.
        </p>
      </header>
      <form className="panel-content" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formState.email}
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={formState.password}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Signing in…' : 'Login'}
        </button>
        {message && (
          <p className={status === 'error' ? 'error' : 'success'} role={status === 'error' ? 'alert' : 'status'}>
            {message}
          </p>
        )}
      </form>
    </section>
  )
}
