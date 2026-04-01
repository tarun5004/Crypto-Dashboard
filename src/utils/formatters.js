export const formatCurrency = (value, compact = false) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: compact ? 'compact' : 'standard',
    maximumFractionDigits: compact ? 1 : 0,
  }).format(value)
}

export const formatCompactNumber = (value) => {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value)
}

export const formatPercent = (value) => {
  return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`
}

export const formatChange = (value) => {
  return `${value > 0 ? '+' : ''}${value}`
}

