import { useEffect, useMemo, useState } from 'react'
import { buildSearchIndex, searchIndex } from '../utils/searchIndex.js'

export const useSearch = (collections) => {
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState([])

  useEffect(() => {
    setIndex(buildSearchIndex(collections))
  }, [collections])

  const results = useMemo(() => searchIndex(index, query).slice(0, 8), [index, query])

  return {
    query,
    setQuery,
    results,
  }
}
