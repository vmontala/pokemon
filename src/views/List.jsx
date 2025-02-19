import { useState, useMemo, useEffect } from 'react'

import getPokemons from '@/utils/api/getPokemons.js'
import getTypes from '@/utils/api/getTypes.js'

import Button from '@/components/Button.jsx'
import Input from '@/components/Input.jsx'
import Loader from '@/components/Loader.jsx'
import Select from '@/components/Select.jsx'
import Table from '@/components/Table.jsx'
import Wrapper from '@/components/Wrapper.jsx'

import usePagination from './usePagination.js'
import './List.css'

export default function List () {
  const [pokemons, setPokemons] = useState([])
  const [types, setTypes] = useState([])

  useEffect(() => {
    getPokemons().then(setPokemons)
    getTypes().then(setTypes)
  }, [])

  const loading = useMemo(
    () => !pokemons.length || !types.length,
    [pokemons, types],
  )

  const [filters, setFilters] = useState({ search: '', type: 'all' })

  const filteredPokemons = useMemo(
    () => {
      const { search, type } = filters

      // Filters the pokémons based on the formatted `searchable` property or the list of types
      return pokemons.filter((row) => (
        (!search || row.searchable.some((value) => value.includes(search.toLowerCase())))
        && (type === 'all' || row.types.list.includes(type.toLowerCase()))
      ))
    },
    [pokemons, filters],
  )

  const { limits, pagination, data } = usePagination(filteredPokemons)

  const previous = () => {
    pagination.previous()

    window.scrollTo({top: 0, behavior: 'smooth'})
  }
  const next = () => {
    pagination.next()

    window.scrollTo({top: 0, behavior: 'smooth'})
  }

  const filter = (criteria) => {
    setFilters({ ...filters, ...criteria })

    pagination.reset()
  }

  const Header = (
    <div className="list__header">
      <div className="list__filter">
        <Input
          value={filters.search}
          placeholder="Search"
          onChange={(search) => filter({ search })}
          disabled={loading}
        />
      </div>
      <div className="list__filter">
        Filter by type
        <Select
          value={filters.type}
          options={[{ label: 'All', value: 'all' }, ...types]}
          onChange={(type) => filter({ type })}
          disabled={loading}
        />
      </div>
    </div>
  )

  const Footer = (
    <div className="list__footer">
      <div className="list__limit">
        <Select
          value={limits.amount}
          options={limits.options}
          onChange={limits.change}
          disabled={loading}
        />
        <span>
          {limits.amount > 0 ? 'Pokémon per page' : 'Pokémon visible'}
        </span>
      </div>
      <div className="list__pagination">
        {data.from}-{data.to} of {filteredPokemons.length}
        <Button onClick={previous} disabled={loading || !pagination.page}>
          &lt;
        </Button>
        <Button onClick={next} disabled={loading || data.to === filteredPokemons.length}>
          &gt;
        </Button>
      </div>
    </div>
  )

  const Body = useMemo(
    () => {
      if (loading) {
        return (
          <Loader />
        )
      }

      if (!data.visible.length) {
        return (
          <div className="list__empty">
            No Pokémon matching the search or filters
          </div>
        )
      }

      return (
        <Table rows={data.visible} />
      )
    },
    [loading, data],
  )

  return (
    <Wrapper
      header={Header}
      footer={Footer}
      className="list"
    >
      {Body}
    </Wrapper>
  )
}
