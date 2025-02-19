import capitalise from '@/utils/string/capitalise.js'
import conjunction from '@/utils/array/conjunction.js'

import request from './request'

const formatTypes = (types) => {
  const list = types.map(({ pokemon_v2_type }) => pokemon_v2_type.name)

  return {
    list,
    label: capitalise(conjunction(list)),
  }
}

const formatPokemon = (pokemon) => {
  const types = formatTypes(pokemon.pokemon_v2_pokemontypes)
  const image = pokemon.pokemon_v2_pokemonsprites[0].sprites.front_default

  return {
    id: pokemon.id,
    name: capitalise(pokemon.name),
    image,
    types,
    searchable: [`${pokemon.id}`, pokemon.name, types.label].map((item) => item.toLowerCase()),
  }
}

const getPokemons = () => {
  const cache = window.sessionStorage.getItem('pokemons')

  if (cache) {
    return new Promise((resolve) => resolve(JSON.parse(cache)))
  }

  const response = request(`
    {
      pokemon_v2_pokemon(where: {is_default: {_eq: true}}) {
        id
        name
        pokemon_v2_pokemontypes {
          pokemon_v2_type {
            name
          }
        }
        pokemon_v2_pokemonsprites {
          sprites
        }
      }
    }
  `)

  response.catch(() => window.alert('Error loading the Pokémons'))

  return response.then(({ data }) => {
    const pokemons = data.pokemon_v2_pokemon.map(formatPokemon)

    window.sessionStorage.setItem('pokemons', JSON.stringify(pokemons))

    return pokemons
  })
}

export default getPokemons
