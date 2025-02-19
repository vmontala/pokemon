import pokeball from '@/assets/pokeball.svg'

import './Loader.css'

export default function Loader () {
  return (
    <div className="loader">
      <img src={pokeball} className="loader__image" />
      <h2 className="loader__text">
        Loading
      </h2>
    </div>
  )
}
