import { Suspense, lazy } from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import './App.css'
import { ErrorBoundaryDemo } from './components/ErrorBoundaryDemo.jsx'
import { LaggyListDashboard } from './components/LaggyListDashboard.jsx'
import { LoadingSpinner } from './components/LoadingSpinner.jsx'
import { LoginForm } from './components/LoginForm.jsx'
import { ModalDemo } from './components/PortalModal.jsx'
import { ShoppingCart } from './components/ShoppingCart.jsx'
import { TabsDemo } from './components/Tabs.jsx'
import { UserProfile } from './components/UserProfile.jsx'

const AdminPanel = lazy(() => import('./components/AdminPanel.jsx'))

function HomePage() {
  return (
    <div className="grid">
      <UserProfile />
      <ShoppingCart />
      <LaggyListDashboard />
      <TabsDemo />
      <ModalDemo />
      <LoginForm />
      <ErrorBoundaryDemo />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <header className="hero">
          <div>
            <p className="eyebrow">PTUDWeb • Lab 5</p>
            <h1>React Advanced Lab</h1>
            <p className="muted">
              Demonstrating deterministic state management, performance tuning, compound components,
              portals, and testable UI flows.
            </p>
          </div>
          <nav className="hero-nav">
            <Link to="/">Exercises</Link>
            <Link to="/admin">Lazy Admin Panel</Link>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/admin"
            element={
              <Suspense fallback={<LoadingSpinner message="Booting analytics…" />}>
                <AdminPanel />
              </Suspense>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
