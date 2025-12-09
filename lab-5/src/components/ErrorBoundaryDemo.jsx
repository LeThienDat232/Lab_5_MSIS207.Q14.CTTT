import { Component, useState } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught an error', error, info)
  }

  handleReset = () => {
    this.setState({ hasError: false })
    this.props.onReset?.()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary" role="alert">
          <p>{this.props.fallbackMessage ?? 'Something went wrong.'}</p>
          <button onClick={this.handleReset}>Try again</button>
        </div>
      )
    }

    return this.props.children
  }
}

function Bomb({ shouldExplode }) {
  if (shouldExplode) {
    throw new Error('Boom!')
  }
  return <p>Everything is stable.</p>
}

export function ErrorBoundaryDemo() {
  const [shouldExplode, setShouldExplode] = useState(false)

  return (
    <section className="panel">
      <header>
        <h2>Exercise 4.2: Error Boundary Test Target</h2>
        <p className="muted">
          Trigger the Bomb component to ensure the ErrorBoundary renders a fallback UI instead of
          crashing the page.
        </p>
      </header>
      <div className="panel-content">
        <button onClick={() => setShouldExplode(true)}>Trigger error</button>
        <ErrorBoundary fallbackMessage="Something went wrong." onReset={() => setShouldExplode(false)}>
          <Bomb shouldExplode={shouldExplode} />
        </ErrorBoundary>
      </div>
    </section>
  )
}
