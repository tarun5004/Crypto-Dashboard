export const ordersOverview = {
  title: 'Orders',
  description: 'Track payment status, order volume, and fulfillment issues before they impact customer experience.',
}

export const orderHighlights = [
  { label: 'Open orders', value: '124', tone: 'success' },
  { label: 'Chargebacks', value: '08', tone: 'danger' },
  { label: 'Refunded', value: '17', tone: 'warning' },
]

export const orderColumns = [
  { key: 'id', label: '#', type: 'text' },
  { key: 'customer', label: 'Billing Name', type: 'text' },
  { key: 'date', label: 'Date', type: 'text' },
  { key: 'total', label: 'Total', type: 'currency' },
  { key: 'paymentStatus', label: 'Payment Status', type: 'status' },
  { key: 'method', label: 'Method', type: 'text' },
]

export const orderRows = [
  { id: '#0001', customer: 'Brian Smith', date: '2026-03-04', total: 353, paymentStatus: 'Paid', method: 'Mastercard' },
  { id: '#0002', customer: 'Patrick Babcock', date: '2026-03-05', total: 690, paymentStatus: 'Chargeback', method: 'Visa' },
  { id: '#0003', customer: 'Ronald Woods', date: '2026-03-12', total: 486, paymentStatus: 'Refunded', method: 'Visa' },
  { id: '#0004', customer: 'Morris Evans', date: '2026-03-14', total: 247, paymentStatus: 'Paid', method: 'Mastercard' },
  { id: '#0005', customer: 'Kirk Batts', date: '2026-03-19', total: 187, paymentStatus: 'Paid', method: 'Visa' },
  { id: '#0006', customer: 'Mark Lebron', date: '2026-03-21', total: 784, paymentStatus: 'Paid', method: 'Mastercard' },
]
