export const SurfaceCard = ({ children, className = '' }) => {
  return <section className={`panel-surface rounded-[24px] p-4 sm:p-5 ${className}`}>{children}</section>
}
