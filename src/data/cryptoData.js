export const cryptoOverview = {
  title: 'Crypto Dashboard',
  description: 'Follow market volatility, open orders, and trading activity with a focused execution layout.',
}

export const cryptoStats = [
  { label: 'Portfolio Balance', value: 53252, delta: 6.35, icon: 'wallet', tone: 'success', subValue: '2.30 BTC', format: 'currency' },
  { label: 'BTC / USD', value: 23075, delta: 1.94, icon: 'bitcoin', tone: 'success', subValue: 'Volume: 132.6 BTC', format: 'currency' },
  { label: 'ETH / BTC', value: 6917, delta: -0.85, icon: 'coin', tone: 'warning', subValue: 'Volume: 32.9 BTC', format: 'currency' },
  { label: 'LTC / BTC', value: 5902, delta: 0.44, icon: 'pulse', tone: 'success', subValue: 'Volume: 31.2 BTC', format: 'currency' },
]

export const cryptoMarketSeries = [
  { label: 'Jan', value: 48 },
  { label: 'Feb', value: 52 },
  { label: 'Mar', value: 50 },
  { label: 'Apr', value: 57 },
  { label: 'May', value: 61 },
  { label: 'Jun', value: 59 },
  { label: 'Jul', value: 64 },
  { label: 'Aug', value: 62 },
  { label: 'Sep', value: 68 },
  { label: 'Oct', value: 66 },
  { label: 'Nov', value: 63 },
  { label: 'Dec', value: 71 },
]

export const cryptoMarketColumns = [
  { key: 'coin', label: 'Coin', type: 'identity' },
  { key: 'price', label: 'Price', type: 'currencyCompact' },
  { key: 'volume', label: 'Volume', type: 'number' },
  { key: 'change', label: 'Change', type: 'change' },
]

export const cryptoMarketRows = [
  { coin: { title: 'Ethereum', subtitle: 'ETH', avatar: 'E' }, price: 23079, volume: 42753, change: 1.91 },
  { coin: { title: 'Ripple', subtitle: 'XRP', avatar: 'R' }, price: 12914, volume: 13269, change: 0.64 },
  { coin: { title: 'Litecoin', subtitle: 'LTC', avatar: 'L' }, price: 5902, volume: 31268, change: 1.18 },
  { coin: { title: 'Binance', subtitle: 'BNB', avatar: 'B' }, price: 20167, volume: 25960, change: 0.1 },
  { coin: { title: 'Cardano', subtitle: 'ADA', avatar: 'A' }, price: 12613, volume: 21597, change: -3.2 },
]

export const sellOrders = [
  { price: '0.03892501', amount: '1.24864875', total: '1.26392659' },
  { price: '0.03897549', amount: '0.19373225', total: '1.45702884' },
  { price: '0.03895189', amount: '0.0001222', total: '1.4571406' },
  { price: '0.0389693', amount: '0.05366476', total: '1.51080458' },
  { price: '0.03897932', amount: '0.03085627', total: '1.83971307' },
]

export const buyOrders = [
  { price: '0.03892000', amount: '0.00873616', total: '0.00873616' },
  { price: '0.03890500', amount: '2.58304568', total: '2.5917084' },
  { price: '0.03890332', amount: '2.19999989', total: '4.79197073' },
  { price: '0.0389003', amount: '0.0032205', total: '4.79510378' },
  { price: '0.03889706', amount: '0.60738409', total: '5.40238787' },
]

export const tradePairOptions = [
  { value: 'BTC/USD', label: 'BTC / USD' },
  { value: 'ETH/BTC', label: 'ETH / BTC' },
  { value: 'LTC/BTC', label: 'LTC / BTC' },
  { value: 'SOL/USD', label: 'SOL / USD' },
]

export const tradeFormDefaults = {
  pair: 'BTC/USD',
  amount: '0.25',
  price: '23075',
  side: 'buy',
}

