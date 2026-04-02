export const appBrand = {
  name: 'Gaur Investor Ltd',
  badge: 'Wealth Suite',
  tagLine: 'India-first investment operations dashboard',
}

export const userQuickProfile = {
  name: 'Tarun Raj Gaur',
  role: 'Managing Director',
  initials: 'TG',
}

export const quickActions = [
  { label: 'Add Client', type: 'primary', route: '/dashboard/clients' },
  { label: 'Create Order', type: 'secondary', route: '/dashboard/orders' },
]

export const initialNotifications = [
  {
    id: 'n1',
    title: 'SIP review scheduled',
    message: 'The Meerut advisory team review for high-value SIP accounts is due this afternoon.',
    read: false,
    category: 'Advisory',
  },
  {
    id: 'n2',
    title: 'NIFTY watchlist updated',
    message: 'Two new large-cap counters were added to the India growth watchlist.',
    read: false,
    category: 'Market',
  },
  {
    id: 'n3',
    title: 'Client KYC verified',
    message: 'A premium investor account from Pune completed KYC verification.',
    read: true,
    category: 'Compliance',
  },
]
