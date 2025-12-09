export function LoadingSpinner({ message = 'Loading…' }) {
  return (
    <div className="spinner">
      <div className="spinner-circle" aria-hidden="true" />
      <p>{message}</p>
    </div>
  )
}
