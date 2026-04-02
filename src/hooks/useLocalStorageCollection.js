import { useMemo, useState } from 'react'
import { createId, createTimestamp } from '../utils/ids.js'
import { useLocalStorage } from './useLocalStorage.js'

const addMeta = (items, prefix) => {
  return items.map((item) => ({
    ...item,
    id: item.id ?? createId(prefix),
    createdAt: item.createdAt ?? createTimestamp(),
    updatedAt: item.updatedAt ?? createTimestamp(),
  }))
}

export const useLocalStorageCollection = (key, seedItems, prefix = 'record') => {
  const [items, setItems] = useLocalStorage(key, addMeta(seedItems, prefix))
  const [isLoaded] = useState(true)

  const normalizedItems = useMemo(() => addMeta(items, prefix), [items, prefix])

  const createItem = (payload) => {
    const item = {
      ...payload,
      id: createId(prefix),
      createdAt: createTimestamp(),
      updatedAt: createTimestamp(),
    }

    setItems((currentItems) => [item, ...currentItems])
    return item
  }

  const updateItem = (id, payload) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id
          ? {
              ...item,
              ...payload,
              updatedAt: createTimestamp(),
            }
          : item,
      ),
    )
  }

  const deleteItem = (id) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id))
  }

  const replaceAll = (nextItems) => {
    setItems(addMeta(nextItems, prefix))
  }

  return {
    items: normalizedItems,
    isLoaded,
    createItem,
    updateItem,
    deleteItem,
    replaceAll,
    setItems,
  }
}
