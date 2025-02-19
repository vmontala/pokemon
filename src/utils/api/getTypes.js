import capitalise from '@/utils/string/capitalise.js'

import request from './request'

const formatType = (type) => capitalise(type.name)

const getTypes = () => {
  const cache = window.sessionStorage.getItem('types')

  if (cache) {
    return new Promise((resolve) => resolve(JSON.parse(cache)))
  }

  const response = request(`
    {
      pokemon_v2_type(where: {pokemon_v2_pokemontypes: {pokemon_v2_pokemon: {is_default: {_eq: true}}}}) {
        name
      }
    }
  `)

  return response.then(({ data }) => {
    const types = data.pokemon_v2_type.map(formatType).sort((a, b) => a.localeCompare(b))

    window.sessionStorage.setItem('types', JSON.stringify(types))

    return types
  })
}

export default getTypes
