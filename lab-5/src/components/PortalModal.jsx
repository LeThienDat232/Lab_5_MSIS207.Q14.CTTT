import { createPortal } from 'react-dom'
import { useEffect, useMemo, useState } from 'react'

function Modal({ children, onClose }) {
  const modalRoot = document.getElementById('modal-root')
  const container = useMemo(() => document.createElement('div'), [])

  useEffect(() => {
    if (!modalRoot) return undefined
    modalRoot.appendChild(container)
    return () => {
      if (container.isConnected) {
        modalRoot.removeChild(container)
      }
    }
  }, [container, modalRoot])

  if (!modalRoot) return null

  const content = (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(event) => event.stopPropagation()}>
        {children}
        <button className="ghost" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  )

  return createPortal(content, container)
}

export function ModalDemo() {
  const [isOpen, setIsOpen] = useState(false)
  const [clicks, setClicks] = useState(0)

  return (
    <section className="panel">
      <header>
        <h2>Exercise 3.2: Modal via React Portal</h2>
        <p className="muted">
          Content is rendered outside of the parent&apos;s DOM hierarchy but events still bubble to the
          parent container.
        </p>
      </header>
      <div className="panel-content portal-demo" onClick={() => setClicks((count) => count + 1)}>
        <p>Parent click count: {clicks}</p>
        <button onClick={() => setIsOpen(true)}>Open modal</button>
        {isOpen && (
          <Modal onClose={() => setIsOpen(false)}>
            <h3>Portal Escapes Overflow</h3>
            <p>
              This modal exists in document.body, meaning it ignores the card&apos;s overflow styles but
              still participates in React&apos;s synthetic event system.
            </p>
          </Modal>
        )}
      </div>
    </section>
  )
}
