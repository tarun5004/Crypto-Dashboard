export const analyticsOverview = {
  title: 'Analytics Dashboard',
  description: 'Monitor campaign efficiency, acquisition quality, and regional growth in one view.',
}

export const analyticsStats = [
  { label: 'Sales', value: 2382, delta: -3.65, icon: 'sales', tone: 'danger' },
  { label: 'Earnings', value: 21300, delta: 6.65, icon: 'wallet', tone: 'success' },
  { label: 'Visitors', value: 14212, delta: 5.25, icon: 'users', tone: 'success' },
  { label: 'Orders', value: 64, delta: -2.25, icon: 'orders', tone: 'warning' },
]

export const analyticsRevenueSeries = [
  { label: 'Jan', value: 2100 },
  { label: 'Feb', value: 1540 },
  { label: 'Mar', value: 1590 },
  { label: 'Apr', value: 1890 },
  { label: 'May', value: 1580 },
  { label: 'Jun', value: 1940 },
  { label: 'Jul', value: 2560 },
  { label: 'Aug', value: 2440 },
  { label: 'Sep', value: 2780 },
  { label: 'Oct', value: 3460 },
  { label: 'Nov', value: 2890 },
  { label: 'Dec', value: 3320 },
]

export const analyticsTrafficSegments = [
  { label: 'Organic', value: 38, color: '#38bdf8' },
  { label: 'Referral', value: 26, color: '#818cf8' },
  { label: 'Paid', value: 21, color: '#f59e0b' },
  { label: 'Social', value: 15, color: '#f43f5e' },
]

export const analyticsProjectColumns = [
  { key: 'project', label: 'Project', type: 'identity' },
  { key: 'company', label: 'Company', type: 'stacked' },
  { key: 'owner', label: 'Owner', type: 'stacked' },
  { key: 'status', label: 'Status', type: 'status' },
  { key: 'progress', label: 'Progress', type: 'progress' },
]

export const analyticsProjectRows = [
  {
    project: { title: 'Project Apollo', subtitle: 'Web / UI-UX Design', avatar: 'A' },
    company: { primary: 'Lechters', secondary: 'Real Estate' },
    owner: { primary: 'Vanessa Tucker', secondary: 'HTML, JS, React' },
    status: 'On track',
    progress: 65,
  },
  {
    project: { title: 'Project Bongo', subtitle: 'Mobile Experience', avatar: 'B' },
    company: { primary: 'Cellophane Logistics', secondary: 'Transportation' },
    owner: { primary: 'William Harris', secondary: 'HTML, JS, Vue' },
    status: 'At risk',
    progress: 33,
  },
  {
    project: { title: 'Project Edison', subtitle: 'Acquisition Playbook', avatar: 'E' },
    company: { primary: 'Affinity Investment Group', secondary: 'Finance' },
    owner: { primary: 'Christina Mason', secondary: 'HTML, JS, React' },
    status: 'On track',
    progress: 80,
  },
  {
    project: { title: 'Project Indigo', subtitle: 'Customer Portal', avatar: 'I' },
    company: { primary: 'Konsili', secondary: 'Retail' },
    owner: { primary: 'Sharon Lessman', secondary: 'HTML, JS, Laravel' },
    status: 'In review',
    progress: 50,
  },
]

export const analyticsCampaigns = [
  {
    title: 'Northern Europe roll-out',
    value: '$84.2K',
    change: '+14.3%',
  },
  {
    title: 'Creator referral funnel',
    value: '$29.8K',
    change: '+8.1%',
  },
  {
    title: 'Retention email sequence',
    value: '$12.4K',
    change: '-1.8%',
  },
]
