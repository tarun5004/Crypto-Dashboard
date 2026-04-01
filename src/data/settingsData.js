export const settingsOverview = {
  title: 'Settings',
  description: 'Manage profile visibility, workspace defaults, and regional preferences in one settings surface.',
}

export const settingsSections = ['Account', 'Workspace', 'Security']

export const settingsFormDefaults = {
  username: 'charles.hall',
  bio: 'Designing clean interface systems for analytics, commerce, and crypto operations.',
  firstName: 'Charles',
  lastName: 'Hall',
  email: 'admin@dashstack.dev',
  addressLine1: '1234 Mission Street',
  addressLine2: 'Studio 5B',
  city: 'San Francisco',
  state: 'CA',
  zip: '94103',
  timezone: 'PST',
  language: 'English',
}

export const settingsSelectOptions = {
  timezone: [
    { value: 'PST', label: 'Pacific Standard Time' },
    { value: 'EST', label: 'Eastern Standard Time' },
    { value: 'GMT', label: 'Greenwich Mean Time' },
    { value: 'IST', label: 'India Standard Time' },
  ],
  language: [
    { value: 'English', label: 'English' },
    { value: 'Spanish', label: 'Spanish' },
    { value: 'French', label: 'French' },
    { value: 'German', label: 'German' },
  ],
}

export const settingsPreferences = [
  {
    id: 'weeklySummary',
    label: 'Weekly email summary',
    description: 'Send a Monday snapshot of activity across all dashboards.',
  },
  {
    id: 'productUpdates',
    label: 'Product update alerts',
    description: 'Notify me when new dashboard blocks or filters are added.',
  },
  {
    id: 'tradeWarnings',
    label: 'Trading volatility warnings',
    description: 'Surface large crypto market swings in the navbar alert tray.',
  },
]
