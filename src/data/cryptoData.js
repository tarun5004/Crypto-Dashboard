export const cryptoOverview = {
  title: 'Markets Dashboard',
  description: 'Track simulated INR market prices, maintain a watchlist, and manage market-side order records.',
}

export const watchlistSeeds = [
  { id: 'mw1', symbol: 'RELIANCE', name: 'Reliance Industries', sector: 'Energy', price: 2940, change: 1.2 },
  { id: 'mw2', symbol: 'TCS', name: 'Tata Consultancy Services', sector: 'IT Services', price: 4128, change: -0.4 },
  { id: 'mw3', symbol: 'INFY', name: 'Infosys', sector: 'IT Services', price: 1496, change: 0.8 },
  { id: 'mw4', symbol: 'HDFCBANK', name: 'HDFC Bank', sector: 'Banking & Finance', price: 1688, change: 1.9 },
  { id: 'mw5', symbol: 'SUNPHARMA', name: 'Sun Pharma', sector: 'Pharma', price: 1572, change: -0.6 },
]

export const marketOrderSeeds = [
  { id: 'mo1', pair: 'NIFTY 50 / INR', side: 'Buy', amount: 10, price: 22650, status: 'Open' },
  { id: 'mo2', pair: 'RELIANCE / INR', side: 'Sell', amount: 24, price: 2940, status: 'Executed' },
  { id: 'mo3', pair: 'TCS / INR', side: 'Buy', amount: 12, price: 4128, status: 'Open' },
]

export const tradePairOptions = [
  { value: 'NIFTY 50 / INR', label: 'NIFTY 50 / INR' },
  { value: 'RELIANCE / INR', label: 'RELIANCE / INR' },
  { value: 'TCS / INR', label: 'TCS / INR' },
  { value: 'HDFCBANK / INR', label: 'HDFCBANK / INR' },
]

export const tradeFormDefaults = {
  pair: 'NIFTY 50 / INR',
  amount: 10,
  price: 22650,
  side: 'Buy',
}
