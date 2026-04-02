const VERSION_KEY = 'gaur-investor-schema-version'

export const SCHEMA_VERSION = '2.0.0'

export const COLLECTION_KEYS = {
  analyticsProjects: 'gaur-analytics-projects',
  analyticsCampaigns: 'gaur-analytics-campaigns',
  ecommerceProducts: 'gaur-ecommerce-products',
  pricingPlans: 'gaur-pricing-plans',
  pricingFaqs: 'gaur-pricing-faqs',
  clients: 'gaur-clients',
  clientActivity: 'gaur-client-activity',
  orders: 'gaur-orders',
  tasks: 'gaur-tasks',
  profile: 'gaur-profile',
  profileLinks: 'gaur-profile-links',
  profileActivity: 'gaur-profile-activity',
  settings: 'gaur-settings',
  notifications: 'gaur-notifications',
  watchlist: 'gaur-watchlist',
  marketOrders: 'gaur-market-orders',
}

export const initializeSchema = () => {
  if (typeof window === 'undefined') {
    return { resetOccurred: false, message: '' }
  }

  const currentVersion = window.localStorage.getItem(VERSION_KEY)

  if (!currentVersion) {
    window.localStorage.setItem(VERSION_KEY, SCHEMA_VERSION)
    return { resetOccurred: false, message: '' }
  }

  if (currentVersion === SCHEMA_VERSION) {
    return { resetOccurred: false, message: '' }
  }

  Object.values(COLLECTION_KEYS).forEach((key) => {
    window.localStorage.removeItem(key)
  })
  window.localStorage.setItem(VERSION_KEY, SCHEMA_VERSION)

  return {
    resetOccurred: true,
    message: 'Data reset due to platform update.',
  }
}
