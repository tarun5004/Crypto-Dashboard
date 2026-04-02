export const ordersOverview = {
  title: 'Orders',
  description: 'Create, manage, and track investor transactions with editable status and payment methods.',
}

export const orderSeeds = [
  { id: 'ord1', customerName: 'Priya Sharma', date: '2026-03-04T10:30:00.000Z', total: 353000, status: 'Paid', paymentMethod: 'UPI', city: 'Mumbai' },
  { id: 'ord2', customerName: 'Rohit Mehta', date: '2026-03-06T11:45:00.000Z', total: 690000, status: 'Chargeback', paymentMethod: 'NEFT', city: 'Bengaluru' },
  { id: 'ord3', customerName: 'Anjali Singh', date: '2026-03-12T09:15:00.000Z', total: 486000, status: 'Refunded', paymentMethod: 'RTGS', city: 'Delhi' },
  { id: 'ord4', customerName: 'Sunita Rao', date: '2026-03-14T15:20:00.000Z', total: 247000, status: 'Paid', paymentMethod: 'IMPS', city: 'Pune' },
]

export const orderStatusOptions = ['Paid', 'Chargeback', 'Refunded', 'Pending']
export const paymentMethodOptions = ['UPI', 'NEFT', 'RTGS', 'IMPS', 'Cheque', 'DD']
