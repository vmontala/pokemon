import Header from './Header.jsx'

import './Layout.css'

export default function Layout ({ children }) {
  return (
    <main className="layout">
      <Header />
      {children}
    </main>
  )
}
