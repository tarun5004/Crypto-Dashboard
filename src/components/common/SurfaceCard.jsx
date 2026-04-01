// This card wrapper standardizes panel styling so every page shares the same glassy dashboard surface.
export const SurfaceCard = ({ children, className = '' }) => {
  return <section className={`panel-surface rounded-[28px] p-5 ${className}`}>{children}</section>
}

