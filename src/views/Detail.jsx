import Button from '@/components/Button.jsx'
import Details from '@/components/Details.jsx'
import Wrapper from '@/components/Wrapper.jsx'

import './Detail.css'

import pokemon from './detail.json';

export default function Detail () {
  const details = {
    abilities: pokemon.abilities,
    height: pokemon.height,
    moves: pokemon.moves,
    species: pokemon.species,
    types: pokemon.types,
    weight: pokemon.weight,
  };

  const Header = (
    <Button to="/">
      Back
    </Button>
  );

  return (
    <Wrapper header={Header}>
      <div className="detail">
        <img className="detail__image" src={pokemon.image} />
        <div className="detail__header">
          <h1 className="detail__title">
            {pokemon.name}
          </h1>
          <span className="detail__id">
            #{pokemon.id}
          </span>
        </div>
        <div className="detail__details">
          <h2 className="detail__subtitle">
            Details:
          </h2>
          <Details data={details} />
        </div>
        <div className="detail__stats">
          <h2 className="detail__subtitle">
            Stats:
          </h2>
          <Details data={pokemon.stats} />
        </div>
      </div>
    </Wrapper>
  )
}
