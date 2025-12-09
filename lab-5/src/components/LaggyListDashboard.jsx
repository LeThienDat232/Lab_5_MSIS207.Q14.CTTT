import { memo, useCallback, useMemo, useState } from 'react'

const createItems = () =>
  Array.from({ length: 500 }, (_, index) => ({
    id: index + 1,
    label: `Item ${index + 1}`,
    priority: Math.ceil(Math.random() * 5),
  }))

const expensiveSort = (items) => {
  const sorted = [...items].sort((a, b) => a.label.localeCompare(b.label))
  for (let i = 0; i < 35000; i += 1) {
    Math.sqrt(i)
  }
  return sorted
}

const ListItem = memo(({ item, onDelete }) => (
  <li>
    <span>
      {item.label} — Priority {item.priority}
    </span>
    <button onClick={() => onDelete(item.id)}>Remove</button>
  </li>
))

ListItem.displayName = 'ListItem'

export function LaggyListDashboard() {
  const [items, setItems] = useState(() => createItems())
  const [theme, setTheme] = useState('light')

  const sortedItems = useMemo(() => expensiveSort(items), [items])

  const handleDelete = useCallback((id) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const toggleTheme = () => {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'))
  }

  return (
    <section className={`panel theme-${theme}`}>
      <header>
        <h2>Exercise 2: Performance Engineering</h2>
        <p className="muted">
          useMemo prevents expensive resort operations, React.memo + useCallback stabilize children.
        </p>
      </header>
      <div className="panel-content">
        <div className="toolbar">
          <button onClick={toggleTheme}>Toggle theme (current: {theme})</button>
          <button onClick={() => setItems(createItems())}>Regenerate data</button>
        </div>
        <p className="muted">
          Rendering {sortedItems.length} items. Toggle the theme to verify that optimized rows do
          not re-render unnecessarily.
        </p>
        <ul className="list">
          {sortedItems.slice(0, 30).map((item) => (
            <ListItem item={item} onDelete={handleDelete} key={item.id} />
          ))}
        </ul>
      </div>
    </section>
  )
}
