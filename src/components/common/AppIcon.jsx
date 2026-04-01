// This icon component centralizes lightweight SVG icons used across navigation, cards, and actions.
const iconMap = {
  analytics: (
    <path d="M4 19h16M7 16V8m5 8V5m5 11v-6" />
  ),
  store: (
    <path d="M5 8h14l-1 11H6L5 8Zm2-3h10l1 3H6l1-3Z" />
  ),
  coin: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M9.5 9.5h4a1.5 1.5 0 0 1 0 3h-3a1.5 1.5 0 0 0 0 3h4" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1 1 0 0 0 .2 1.1l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1 1 0 0 0-1.1-.2 1 1 0 0 0-.6.9V20a2 2 0 1 1-4 0v-.2a1 1 0 0 0-.6-.9 1 1 0 0 0-1.1.2l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1 1 0 0 0 .2-1.1 1 1 0 0 0-.9-.6H4a2 2 0 1 1 0-4h.2a1 1 0 0 0 .9-.6 1 1 0 0 0-.2-1.1l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1 1 0 0 0 1.1.2 1 1 0 0 0 .6-.9V4a2 2 0 1 1 4 0v.2a1 1 0 0 0 .6.9 1 1 0 0 0 1.1-.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1 1 0 0 0-.2 1.1 1 1 0 0 0 .9.6H20a2 2 0 1 1 0 4h-.2a1 1 0 0 0-.9.6Z" />
    </>
  ),
  users: (
    <>
      <path d="M16 19a4 4 0 0 0-8 0" />
      <circle cx="12" cy="9" r="3" />
      <path d="M5 19a3 3 0 0 1 3-3M19 19a3 3 0 0 0-3-3" />
    </>
  ),
  orders: (
    <>
      <path d="M6 6h15l-1.2 6H8.2L6 3H3" />
      <circle cx="9" cy="18" r="1" />
      <circle cx="18" cy="18" r="1" />
    </>
  ),
  pricing: (
    <path d="M12 2v20M17 6.5c0-1.7-2.2-3-5-3S7 4.8 7 6.5 9.2 9.5 12 9.5s5 1.3 5 3-2.2 3-5 3-5-1.3-5-3" />
  ),
  profile: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M5 20a7 7 0 0 1 14 0" />
    </>
  ),
  tasks: (
    <>
      <path d="M9 6h12M9 12h12M9 18h12" />
      <path d="M4 6h.01M4 12h.01M4 18h.01" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  bell: (
    <>
      <path d="M6 8a6 6 0 1 1 12 0c0 7 3 7 3 9H3c0-2 3-2 3-9" />
      <path d="M10 21a2 2 0 0 0 4 0" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6" />
      <path d="m20 20-3.5-3.5" />
    </>
  ),
  moon: <path d="M20 14.5A7.5 7.5 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </>
  ),
  logout: (
    <>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="M16 17l5-5-5-5" />
      <path d="M21 12H9" />
    </>
  ),
  sales: (
    <>
      <path d="M4 19V5" />
      <path d="M10 19v-8" />
      <path d="M16 19V9" />
      <path d="M22 19v-4" />
    </>
  ),
  wallet: (
    <>
      <path d="M3 7a2 2 0 0 1 2-2h12v14H5a2 2 0 0 1-2-2V7Z" />
      <path d="M17 9h4v6h-4a2 2 0 0 1 0-6Z" />
      <path d="M17 7V5" />
    </>
  ),
  pulse: <path d="M3 12h4l2-5 4 10 2-5h6" />,
  bitcoin: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M10 8h3.4a2 2 0 0 1 0 4H10m0 0h3.8a2 2 0 0 1 0 4H10m1-10V6m0 12v-2" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  arrowRight: <path d="M5 12h14m-5-5 5 5-5 5" />,
}

export const AppIcon = ({ name, className = '', size = 18 }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {iconMap[name] ?? <circle cx="12" cy="12" r="8" />}
    </svg>
  )
}

