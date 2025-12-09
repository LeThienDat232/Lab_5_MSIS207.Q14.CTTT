import { useMemo } from 'react'

const data = Array.from({ length: 12 }, (_, index) => ({
  month: index + 1,
  revenue: Math.floor(Math.random() * 20000) + 5000,
}))

export default function AdminPanel() {
  const totals = useMemo(() => {
    const sum = data.reduce((acc, item) => acc + item.revenue, 0)
    return {
      sum,
      average: Math.round(sum / data.length),
      best: data.reduce((prev, item) => (item.revenue > prev.revenue ? item : prev), data[0]),
    }
  }, [])

  return (
    <div className="panel">
      <header>
        <h2>Admin Analytics</h2>
        <p className="muted">Simulated heavy dashboard loaded lazily with React.lazy.</p>
      </header>
      <div className="chart-grid">
        {data.map((item) => (
          <div className="chart-card" key={item.month}>
            <p>Month {item.month}</p>
            <strong>${item.revenue.toLocaleString()}</strong>
          </div>
        ))}
      </div>
      <div className="panel-content">
        <p>Total revenue: ${totals.sum.toLocaleString()}</p>
        <p>Average: ${totals.average.toLocaleString()}</p>
        <p>Best month: Month {totals.best.month}</p>
      </div>
    </div>
  )
}
