import capitalise from '@/utils/string/capitalise.js'
import conjunction from '@/utils/array/conjunction.js'

import request from './request'

const formatTypes = (types) => {
  const list = types.map(({ pokemon_v2_type }) => pokemon_v2_type.name)

  return capitalise(conjunction(list))
}

const formatAbilities = (abilities) => {
  const list = abilities.map(({ pokemon_v2_ability }) => pokemon_v2_ability.name)

  return capitalise(conjunction(list))
}

const formatStats = (stats) => stats.reduce((map, stat) => ({
  ...map,
  [stat.pokemon_v2_stat.name]: stat.base_stat,
}), {})

const formatPokemon = (pokemon) => ({
  id: pokemon.id,
  name: capitalise(pokemon.name),
  image: pokemon.pokemon_v2_pokemonsprites[0].sprites.front_default,
  types: formatTypes(pokemon.pokemon_v2_pokemontypes),
  height: `${pokemon.height * 10} cm`,
  weight: `${pokemon.weight / 10} kg`,
  abilities: formatAbilities(pokemon.pokemon_v2_pokemonabilities),
  stats: formatStats(pokemon.pokemon_v2_pokemonstats),
})

const getPokemon = (id) => {
  const cache = window.sessionStorage.getItem(`pokemon-${id}`)

  if (cache) {
    return new Promise((resolve) => resolve(JSON.parse(cache)))
  }

  const response = request(`
    {
      pokemon_v2_pokemon(where: {id: {_eq: "${id}"}}) {
        id
        name
        height
        pokemon_v2_pokemonabilities {
          pokemon_v2_ability {
            name
          }
        }
        pokemon_v2_pokemonsprites {
          sprites
        }
        pokemon_v2_pokemonstats {
          base_stat
          pokemon_v2_stat {
            name
          }
        }
        weight
        pokemon_v2_pokemontypes {
          pokemon_v2_type {
            name
          }
        }
      }
    }
  `)


  return response.then(({ data }) => {
    const pokemon = data.pokemon_v2_pokemon.map(formatPokemon)[0]

    window.sessionStorage.setItem(`pokemon-${id}`, JSON.stringify(pokemon))

    return pokemon
  })
}

export default getPokemon
