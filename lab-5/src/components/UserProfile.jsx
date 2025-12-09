import { useEffect, useReducer, useState } from 'react'

const initialState = {
  status: 'idle',
  data: null,
  error: null,
}

const allowedTransitions = {
  idle: ['loading'],
  loading: ['success', 'failure'],
  success: ['loading'],
  failure: ['loading'],
}

const canTransition = (current, next) => allowedTransitions[current]?.includes(next)

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      if (!canTransition(state.status, 'loading')) return state
      return { status: 'loading', data: null, error: null }
    case 'FETCH_SUCCESS':
      if (!canTransition(state.status, 'success')) return state
      return { status: 'success', data: action.payload, error: null }
    case 'FETCH_FAILURE':
      if (!canTransition(state.status, 'failure')) return state
      return { status: 'failure', data: null, error: action.payload }
    default:
      return state
  }
}

const USERS = [1, 2, 3, 4, 5]

export function UserProfile() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [userIndex, setUserIndex] = useState(0)
  const userId = USERS[userIndex]

  useEffect(() => {
    let isActive = true
    const controller = new AbortController()

    const fetchUser = async () => {
      dispatch({ type: 'FETCH_INIT' })
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${userId}`,
          { signal: controller.signal },
        )

        if (!response.ok) {
          throw new Error('Unable to fetch user')
        }

        const data = await response.json()
        if (isActive) {
          dispatch({ type: 'FETCH_SUCCESS', payload: data })
        }
      } catch (error) {
        if (isActive) {
          dispatch({ type: 'FETCH_FAILURE', payload: error.message })
        }
      }
    }

    fetchUser()

    return () => {
      isActive = false
      controller.abort()
    }
  }, [userId])

  const handleNextUser = () => {
    setUserIndex((index) => (index + 1) % USERS.length)
  }

  return (
    <section className="panel">
      <header>
        <h2>Exercise 1.1: useReducer Fetch Machine</h2>
        <p className="muted">
          Demonstrates deterministic async transitions (idle → loading → success/failure).
        </p>
      </header>

      <div className="panel-content">
        <p>
          Current state: <strong>{state.status.toUpperCase()}</strong>
        </p>
        {state.status === 'loading' && <p>Loading user {userId}…</p>}
        {state.status === 'failure' && (
          <p className="error">Something went wrong: {state.error}</p>
        )}
        {state.status === 'success' && state.data && (
          <div className="user-card">
            <h3>{state.data.name}</h3>
            <p>{state.data.email}</p>
            <p>{state.data.company?.name}</p>
          </div>
        )}
        <button onClick={handleNextUser} className="primary">
          Load Next Profile
        </button>
      </div>
    </section>
  )
}
