import { useState, useMemo } from 'react'

const limits = [
  10,
  100,
  { label: 'All', value: -1 },
]

export default function usePagination (data) {
  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(limits[0])

  const reset = () => setPage(0)
  const next = () => setPage(page + 1)
  const previous = () => setPage(page - 1)

  const changeLimit = (amount) => {
    setLimit(parseInt(amount, 10))

    reset()
  }

  // Amount of items up to which are shown (i.e. `20` given page `2` and limit `10`)
  const to = useMemo(
    () => {
      const total = data.length

      if (limit < 0) {
        return total
      }

      const max = (page + 1) * limit

      return max > total ? total : max
    },
    [page, limit, data],
  )

  // Amount of items from to which are shown (i.e. `11` given page `2` and limit `10`)
  const from = useMemo(
    () => {
      if (!to) {
        return to
      }

      if (limit < 0) {
        return 1
      }

      return page * limit + 1
    },
    [page, limit, to],
  )

  // Portion of data visible on the UI
  const visibleData = useMemo(
    () => limit < 0 ? data : data.slice(page * limit, page * limit + limit),
    [data, page, limit],
  )

  return {
    limits: {
      options: limits,
      amount: limit,
      change: changeLimit,
    },
    pagination: {
      page,
      next,
      previous,
      reset,
    },
    data: {
      from,
      to,
      visible: visibleData,
    },
  }
}
