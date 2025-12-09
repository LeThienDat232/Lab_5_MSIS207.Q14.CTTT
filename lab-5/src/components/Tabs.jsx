import { createContext, useContext, useState } from 'react'

const TabsContext = createContext(null)

function Tabs({ defaultIndex = 0, children }) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex)
  const value = { activeIndex, setActiveIndex }
  return (
    <TabsContext.Provider value={value}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  )
}

Tabs.List = function TabsList({ children }) {
  return <div className="tabs-list">{children}</div>
}

Tabs.Tab = function Tab({ index, children }) {
  const context = useContext(TabsContext)
  if (!context) throw new Error('Tabs.Tab must be used inside Tabs')
  const { activeIndex, setActiveIndex } = context
  const isActive = activeIndex === index
  return (
    <button
      className={isActive ? 'tab active' : 'tab'}
      onClick={() => setActiveIndex(index)}
      type="button"
    >
      {children}
    </button>
  )
}

Tabs.Panel = function TabPanel({ index, children }) {
  const context = useContext(TabsContext)
  if (!context) throw new Error('Tabs.Panel must be used inside Tabs')
  const { activeIndex } = context
  if (index !== activeIndex) return null
  return <div className="tab-panel">{children}</div>
}

export function TabsDemo() {
  return (
    <section className="panel">
      <header>
        <h2>Exercise 3.1: Compound Tabs</h2>
        <p className="muted">
          Tabs, Tabs.List, Tabs.Tab, and Tabs.Panel collaborate through shared context to avoid prop
          drilling.
        </p>
      </header>
      <Tabs defaultIndex={0}>
        <Tabs.List>
          <Tabs.Tab index={0}>React</Tabs.Tab>
          <Tabs.Tab index={1}>Redux Toolkit</Tabs.Tab>
          <Tabs.Tab index={2}>Testing Library</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel index={0}>
          React&apos;s component model lets us express complex UIs through composition and hooks.
        </Tabs.Panel>
        <Tabs.Panel index={1}>
          RTK drastically reduces boilerplate for async requests, entity adapters, and selectors.
        </Tabs.Panel>
        <Tabs.Panel index={2}>
          RTL promotes behavioral tests that interact with the UI the way users do.
        </Tabs.Panel>
      </Tabs>
    </section>
  )
}

export { Tabs }
