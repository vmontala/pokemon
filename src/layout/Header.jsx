import pokemonLogo from '@/assets/pokemon.svg'

import './Header.css'

export default function Header () {
  return (
    <header className="header">
      <img src={pokemonLogo} className="header__logo" />
    </header>
  )
}
