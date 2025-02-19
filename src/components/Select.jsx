import { useMemo } from 'react'

import './Select.css'

export default function Select ({ options, value, onChange, ...props }) {
  const selectedOption = useMemo(
    () => options.find((option) => option?.value === value || option === value),
    [options, value]
  )

  return (
    <div className="select">
      <select
        onChange={(event) => onChange(event.target.value)}
        value={value}
        className="select__field"
        {...props}
      >
        {options.map((option) => (
          <option value={option.value || option} key={option.value || option}>
            {option.label || option}
          </option>
        ))}
      </select>
      {selectedOption?.label || selectedOption}
    </div>
  )
}
