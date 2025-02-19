import { Link } from 'react-router'

import './Table.css'

export default function Table ({ rows }) {
  return (
    <div className="table">
      {rows.map((row) => (
        <Link
          to={`/${row.id}`}
          className="table__row"
          key={row.name}
        >
          <div className="table__cell">
            <img className="table__image" src={row.image} />
          </div>
          <div className="table__cell">
            {row.name}
            <span className="table__id">
              #{row.id}
            </span>
          </div>
          <div className="table__cell">
            {row.types.label}
          </div>
        </Link>
      ))}
    </div>
  )
}
