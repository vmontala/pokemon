import { useState, useMemo, useEffect } from 'react'

import getPokemons from '@/utils/api/getPokemons.js'
import getTypes from '@/utils/api/getTypes.js'

import Button from '@/components/Button.jsx'
import Input from '@/components/Input.jsx'
import Select from '@/components/Select.jsx'
import Wrapper from '@/components/Wrapper.jsx'
import Table from '@/components/Table.jsx'

import usePagination from './usePagination.js'
import './List.css'

export default function List () {
  const [pokemons, setPokemons] = useState([])
  const [types, setTypes] = useState([])

  useEffect(() => {
    getPokemons().then((data) => setPokemons(data))
    getTypes().then((data) => setTypes(data))
  }, [])

  const [filters, setFilters] = useState({ search: '', type: 'all' })

  const filteredPokemons = useMemo(
    () => {
      const { search, type } = filters

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
          placeholder="Search Pokémon"
          autoFocus
          onChange={(search) => filter({ search })}
        />
      </div>
      <div className="list__filter">
        Filter by type
        <Select
          value={filters.type}
          options={[{ label: 'All', value: 'all' }, ...types]}
          onChange={(type) => filter({ type })}
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
        />
        <span>
          {limits.amount > 0 ? 'Pokémon per page' : 'Pokémon visible'}
        </span>
      </div>
      <div className="list__pagination">
        {data.from}-{data.to} of {filteredPokemons.length}
        <Button onClick={previous} disabled={!pagination.page}>
          &lt;
        </Button>
        <Button onClick={next} disabled={data.to === filteredPokemons.length}>
          &gt;
        </Button>
      </div>
    </div>
  )

  return (
    <Wrapper
      header={Header}
      footer={Footer}
      className="list"
    >
      {data.visible.length ? (<Table rows={data.visible} />) : (
        <div className="list__empty">
          No Pokémon matching the search or filters
        </div>
      )}
    </Wrapper>
  )
}
