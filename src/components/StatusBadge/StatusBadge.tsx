import './StatusBadge.css'

type StatusBadgeProps = {
  status: 'pending' | 'failed'
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return <span className={`status-badge status-badge--${status}`}>{status}</span>
}
