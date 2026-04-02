const searchableFields = {
  Client: ['name', 'company', 'email', 'city'],
  Order: ['customerName', 'paymentMethod', 'status'],
  Task: ['title', 'status', 'priority', 'owner'],
  Product: ['name', 'company', 'category', 'manager'],
  Market: ['symbol', 'name', 'sector'],
}

export const buildSearchIndex = (collections) => {
  return collections.flatMap((collection) => {
    const fields = searchableFields[collection.type] ?? []

    return collection.items.map((item) => ({
      id: `${collection.type}-${item.id}`,
      type: collection.type,
      title: item.name ?? item.title ?? item.customerName ?? item.symbol,
      subtitle: item.company ?? item.email ?? item.status ?? item.category ?? item.sector ?? '',
      route: collection.route,
      tokens: fields
        .map((field) => item[field])
        .filter(Boolean)
        .join(' ')
        .toLowerCase(),
    }))
  })
}

export const searchIndex = (index, query) => {
  if (!query.trim()) {
    return []
  }

  const normalizedQuery = query.toLowerCase()
  return index.filter((entry) => entry.title?.toLowerCase().includes(normalizedQuery) || entry.tokens.includes(normalizedQuery))
}
