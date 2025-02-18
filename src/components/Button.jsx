import { Link } from 'react-router';

import './Button.css';

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
  );
}
