export const ecommerceOverview = {
  title: 'E-Commerce Dashboard',
  description: 'Track revenue momentum, order fulfillment, and product performance across channels.',
}

export const ecommerceStats = [
  { label: 'Income', value: 47482, delta: 3.65, icon: 'wallet', tone: 'success', format: 'currency' },
  { label: 'Orders', value: 2542, delta: -5.25, icon: 'orders', tone: 'danger', format: 'number' },
  { label: 'Activity', value: 16300, delta: 4.65, icon: 'pulse', tone: 'success', format: 'number' },
  { label: 'Revenue', value: 20120, delta: 2.35, icon: 'sales', tone: 'success', format: 'currency' },
]

export const ecommerceRevenueSeries = [
  { label: 'Jan', value: 2180 },
  { label: 'Feb', value: 1550 },
  { label: 'Mar', value: 1610 },
  { label: 'Apr', value: 1900 },
  { label: 'May', value: 1590 },
  { label: 'Jun', value: 1940 },
  { label: 'Jul', value: 2580 },
  { label: 'Aug', value: 2470 },
  { label: 'Sep', value: 2820 },
  { label: 'Oct', value: 3440 },
  { label: 'Nov', value: 2910 },
  { label: 'Dec', value: 3310 },
]

export const ecommerceSalesBars = [
  { label: 'Jan', value: 54 },
  { label: 'Feb', value: 68 },
  { label: 'Mar', value: 41 },
  { label: 'Apr', value: 55 },
  { label: 'May', value: 62 },
  { label: 'Jun', value: 45 },
  { label: 'Jul', value: 72 },
  { label: 'Aug', value: 60 },
  { label: 'Sep', value: 76 },
  { label: 'Oct', value: 48 },
  { label: 'Nov', value: 79 },
  { label: 'Dec', value: 57 },
]

export const ecommerceChannelSegments = [
  { label: 'Website', value: 44, color: '#38bdf8' },
  { label: 'Marketplace', value: 27, color: '#818cf8' },
  { label: 'Retail', value: 19, color: '#34d399' },
  { label: 'Partners', value: 10, color: '#f59e0b' },
]

export const ecommerceProductColumns = [
  { key: 'product', label: 'Product', type: 'identity' },
  { key: 'company', label: 'Brand', type: 'stacked' },
  { key: 'assigned', label: 'Assigned', type: 'stacked' },
  { key: 'orders', label: 'Orders', type: 'number' },
  { key: 'status', label: 'Status', type: 'status' },
]

export const ecommerceProductRows = [
  {
    product: { title: 'Aurora', subtitle: 'UI Kit', avatar: 'A' },
    company: { primary: 'Lechters', secondary: 'Real Estate' },
    assigned: { primary: 'Vanessa Tucker', secondary: 'HTML, JS, React' },
    orders: 520,
    status: 'In progress',
  },
  {
    product: { title: 'Bender', subtitle: 'Dashboard', avatar: 'B' },
    company: { primary: 'Cellophane Transportation', secondary: 'Transport' },
    assigned: { primary: 'William Harris', secondary: 'HTML, JS, Vue' },
    orders: 240,
    status: 'Paused',
  },
  {
    product: { title: 'Camelot', subtitle: 'Operations', avatar: 'C' },
    company: { primary: 'Clemens', secondary: 'Insurance' },
    assigned: { primary: 'Darwin', secondary: 'HTML, JS, Laravel' },
    orders: 180,
    status: 'In progress',
  },
  {
    product: { title: 'Fusion', subtitle: 'Storefront', avatar: 'F' },
    company: { primary: 'Konsili', secondary: 'Retail' },
    assigned: { primary: 'Christina Mason', secondary: 'HTML, JS, Vue' },
    orders: 250,
    status: 'Paused',
  },
]

export const ecommerceFulfillment = [
  { label: 'Avg. order value', value: '$182', trend: '+12%' },
  { label: 'Refund rate', value: '1.8%', trend: '-0.4%' },
  { label: 'Returning buyers', value: '46%', trend: '+6%' },
]

