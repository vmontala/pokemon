import { useState, useMemo, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'

import getPokemon from '@/utils/api/getPokemon.js'

import Button from '@/components/Button.jsx'
import Details from '@/components/Details.jsx'
import Wrapper from '@/components/Wrapper.jsx'
import Loader from '@/components/Loader.jsx'

import './Detail.css'

export default function Detail () {
  const { id } = useParams()
  const navigate = useNavigate()

  const [pokemon, setPokemon] = useState({})

  useEffect(() => {
    getPokemon(id)
      .then(setPokemon)
      .catch(() => navigate('/'))
  }, [id, navigate])

  // key-value object used to represent the data on the UI
  const details = useMemo(
    () => ({
      Height: pokemon.height,
      Weight: pokemon.weight,
      Types: pokemon.types,
      Abilities: pokemon.abilities,
    }),
    [pokemon]
  )

  const Header = (
    <Button to="/">
      Back
    </Button>
  )

  return (
    <Wrapper header={Header}>
      {!pokemon.id ? <Loader /> : (
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
      )}
    </Wrapper>
  )
}
