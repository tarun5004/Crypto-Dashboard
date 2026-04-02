export const createId = (prefix = 'item') => {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}-${Date.now().toString(36)}`
}

export const createTimestamp = () => new Date().toISOString()
