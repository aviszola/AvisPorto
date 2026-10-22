export default function SkeletonCard() {
  return (
    <div className="gh-card skeleton-card">
      <div className="skeleton-text skeleton-title" />
      <div className="skeleton-text skeleton-desc" />
      <div className="skeleton-meta">
        <div className="skeleton-text skeleton-small" />
        <div className="skeleton-text skeleton-small" />
        <div className="skeleton-text skeleton-small" />
      </div>
      <div className="skeleton-text skeleton-small" style={{ width: '60%' }} />
    </div>
  )
}
