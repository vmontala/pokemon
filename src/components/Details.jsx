import './Details.css'

export default function Details ({ data }) {
  return (
    <ul className="details">
      {Object.entries(data).map(([key, value]) => (
        <li key={key}>
          <strong className="details__key">{key}</strong>: {value}
        </li>
      ))}
    </ul>
  )
}
