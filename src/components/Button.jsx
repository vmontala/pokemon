import { Link } from 'react-router'

import './Button.css'

// Renders a styled `button` or `Link` component based on the `to` props
export default function Button ({ children, to, ...props }) {
  return (
    to ? (
      <Link to={to} className="button" {...props}>
        {children}
      </Link>
    ) : (
      <button type="buton" className="button" {...props}>
        {children}
      </button>
    )
  )
}
