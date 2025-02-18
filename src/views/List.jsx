import { useState, useMemo } from 'react';
import { Link } from 'react-router';

import Button from '@/components/Button.jsx'
import Input from '@/components/Input.jsx'
import Select from '@/components/Select.jsx'
import Wrapper from '@/components/Wrapper.jsx'
import Table from '@/components/Table.jsx'

import './List.css'

import rows from './list.json';

const paginationOptions = [
  10,
  100,
  { label: 'All', value: -1 },
];

export default function List ({ children }) {
  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState({ search: '', type: 'all' });
  const [rowsPerPage, setRowsPerPage] = useState(paginationOptions[0]);

  const changePage = (newPage) => setPage(newPage);
  const previousPage = () => changePage(page - 1);
  const nextPage = () => changePage(page + 1);

  const changeRowsPerPage = (amount) => {
    setRowsPerPage(parseInt(amount, 10));

    setPage(0);
  };

  const filterSearch = (term) => setFilters({ ...filters, search: term });
  const fitlerType = (type) => setFilters({ ...filters, type });

  const filteredRows = useMemo(
    () => {
      const { search, type } = filters;

      return rows.filter((row) => (
        (!search || row.searchable.some((value) => value.includes(search.toLowerCase())))
        && (type === 'all' || row.types.list.includes(type))
      ));
    },
    [rows, filters],
  );

  const visibleRows = useMemo(
    () => rowsPerPage > 0 ? filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : filteredRows,
    [filteredRows, page, rowsPerPage],
  );

  const visibleAmount = useMemo(
    () => {
      const total = rows.length;

      if (rowsPerPage < 0) {
        return {
          from: 1,
          to: total,
        };
      }

      const from = page * rowsPerPage + 1;
      const to = (page + 1) * rowsPerPage;

      return {
        from,
        to: to > total ? total : to,
      };
    },
    [page, rowsPerPage, rows],
  );

  const Header = (
    <div className="list__header">
      <div className="list__filter">
        <Input
          value={filters.search}
          placeholder="Search Pokémon"
          autoFocus
          onChange={filterSearch}
        />
      </div>
      <div className="list__filter">
        Filter by type
        <Select
          value={filters.type}
          options={[{ label: 'All', value: 'all' }, 'Type 1']}
          onChange={fitlerType}
        />
      </div>
    </div>
  );

  const Footer = (
    <div className="list__footer">
      <div className="list__limit">
        <Select
          value={rowsPerPage}
          options={paginationOptions}
          onChange={changeRowsPerPage}
        />
        <span>
          {rowsPerPage > 0 ? 'Pokémon per page' : 'Pokémon visible'}
        </span>
      </div>
      <div className="list__pagination">
        {visibleAmount.from}-{visibleAmount.to} of {rows.length}
        <Button onClick={previousPage} disabled={!page}>
          &lt;
        </Button>
        <Button onClick={nextPage} disabled={visibleAmount.to === rows.length}>
          &gt;
        </Button>
      </div>
    </div>
  );

  return (
    <Wrapper
      header={Header}
      footer={Footer}
      className="list"
    >
      {visibleRows.length ? (<Table rows={visibleRows} />) : (
        <div className="list__empty">
          No Pokémon matching the search or filters
        </div>
      )}
    </Wrapper>
  )
}
