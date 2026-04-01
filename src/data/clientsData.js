export const clientsOverview = {
  title: 'Clients',
  description: 'Review key accounts, account health, and recent interactions across your active portfolio.',
}

export const clientColumns = [
  { key: 'client', label: 'Client', type: 'identity' },
  { key: 'company', label: 'Company', type: 'text' },
  { key: 'email', label: 'Email', type: 'text' },
  { key: 'status', label: 'Status', type: 'status' },
]

export const clientRows = [
  { client: { title: 'Garrett Winters', subtitle: 'West Coast Lead', avatar: 'G' }, company: 'Good Guys', email: 'garrett@wins.com', status: 'Active' },
  { client: { title: 'Ashton Cox', subtitle: 'Partnership Owner', avatar: 'A' }, company: 'Leviz Furniture', email: 'ashton@cox.com', status: 'Active' },
  { client: { title: 'Sonya Frost', subtitle: 'Growth Advisor', avatar: 'S' }, company: 'Child World', email: 'sonya@frost.com', status: 'Blocked' },
  { client: { title: 'Jena Gaines', subtitle: 'RevOps Partner', avatar: 'J' }, company: 'Helping Hand', email: 'jena@gaines.com', status: 'Inactive' },
  { client: { title: 'Angelica Ramos', subtitle: 'Enterprise Champion', avatar: 'AR' }, company: 'The Wiz', email: 'angelica@ramos.com', status: 'Active' },
]

export const spotlightClient = {
  name: 'Angelica Ramos',
  initials: 'AR',
  company: 'The Wiz',
  email: 'angelica@ramos.com',
  phone: '+1 (234) 123-123-123',
  status: 'Active',
  about: 'Strong strategic partner with expansion opportunities across billing, analytics, and embedded reporting.',
}

export const clientActivity = [
  { id: 'c1', title: 'Signed out', time: '30m ago', description: 'Security review completed after device refresh.' },
  { id: 'c2', title: 'Created invoice #1204', time: '2h ago', description: 'Finance workflow generated the Q2 rollout invoice.' },
  { id: 'c3', title: 'Discarded invoice #1147', time: '3h ago', description: 'The draft invoice was removed after pricing correction.' },
  { id: 'c4', title: 'Signed in', time: '21h ago', description: 'Customer admin session started from the London office.' },
]
