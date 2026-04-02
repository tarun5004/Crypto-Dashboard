export const settingsOverview = {
  title: 'Settings',
  description: 'Control advisory defaults, communication preferences, and regional platform settings.',
}

export const settingsSections = ['Account', 'Workspace', 'Security']

export const settingsFormDefaults = {
  username: 'tarun.raj.gaur',
  bio: 'Building disciplined, India-first wealth journeys for long-term investors.',
  firstName: 'Tarun',
  lastName: 'Gaur',
  email: 'tarun@gaurinvestor.in',
  addressLine1: 'Gaur Investor Ltd, Civil Lines',
  addressLine2: 'Office 5, First Floor',
  city: 'Meerut',
  state: 'Uttar Pradesh',
  zip: '250001',
  timezone: 'IST',
  language: 'English',
}

export const settingsSelectOptions = {
  timezone: [
    { value: 'IST', label: 'India Standard Time' },
    { value: 'GST', label: 'Gulf Standard Time' },
    { value: 'SGT', label: 'Singapore Time' },
  ],
  language: [
    { value: 'English', label: 'English' },
    { value: 'Hindi', label: 'Hindi' },
  ],
}

export const settingsPreferences = [
  { id: 'weeklySummary', label: 'Weekly investor summary', description: 'Send a Monday digest of investor activity and plan performance.' },
  { id: 'productUpdates', label: 'Product launch alerts', description: 'Notify me when new wealth products or plan changes are published.' },
  { id: 'tradeWarnings', label: 'Market movement alerts', description: 'Send alerts when tracked counters move outside the watch threshold.' },
]
