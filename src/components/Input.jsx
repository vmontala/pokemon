import { useMemo } from 'react'

import './Input.css';

export default function Input ({ value, onChange, className, ...props }) {
  return (
    <input
      type="text"
      onChange={(event) => onChange(event.target.value)}
      value={value}
      className={`input ${className || ''}`}
      {...props}
    />
  );
}
