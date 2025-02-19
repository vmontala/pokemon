import capitalise from '@/utils/string/capitalise.js'
import conjunction from '@/utils/array/conjunction.js'

import request from './request'

// Formats the (nested) list of types to a string
const formatTypes = (types) => {
  const list = types.map(({ pokemon_v2_type }) => pokemon_v2_type.name)

  return capitalise(conjunction(list))
}

// Formats the (nested) list of abilities to a string
const formatAbilities = (abilities) => {
  const list = abilities.map(({ pokemon_v2_ability }) => pokemon_v2_ability.name)

  return capitalise(conjunction(list))
}

// Converts the (nested) list of stats to a map
const formatStats = (stats) => stats.reduce((map, stat) => ({
  ...map,
  [stat.pokemon_v2_stat.name]: stat.base_stat,
}), {})

// Formats the pokémon data as needed for the view upon retrievel from the API
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

  response.catch(() => window.alert('Error loading the Pokémon'))

  return response.then(({ data }) => {
    const pokemon = data.pokemon_v2_pokemon.map(formatPokemon)[0]

    // Caches the formatted data so an extra request can be avoidad
    window.sessionStorage.setItem(`pokemon-${id}`, JSON.stringify(pokemon))

    return pokemon
  })
}

export default getPokemon
