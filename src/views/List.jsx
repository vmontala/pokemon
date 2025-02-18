import './List.css'

export default function List ({ children }) {
  return (
    <div className="list">
      <div className="list__filters">
        Filters
      </div>
      <div className="list__table">
        Table
      </div>
    </div>
  )
}
