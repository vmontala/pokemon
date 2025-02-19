import pokemon from '@/assets/pokemon.svg'

import './Header.css'

export default function Header () {
  return (
    <header className="header">
      <img src={pokemon} className="header__logo" />
    </header>
  )
}
