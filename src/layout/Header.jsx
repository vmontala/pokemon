import pokemonLogo from '@/assets/pokemon.svg'

import './Header.css'

export default function Header ({ children }) {
  return (
    <header className="header">
      <img src={pokemonLogo} className="header__logo" />
    </header>
  )
}
