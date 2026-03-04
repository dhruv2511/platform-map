import type { Milestone } from '../data/platformData'

type Props = {
  milestone: Milestone
}

export function MilestoneCard({ milestone }: Props) {
  const cardClass = milestone.status.includes('Complete')
    ? 'milestone-card complete card-density-primary'
    : 'milestone-card card-density-primary'

  // Calculate progress based on status
  const progressPercent = milestone.status.includes('Complete') ? 100 : 65

  return (
    <article className={cardClass}>
      <div className="milestone-number">{milestone.number}</div>
      <h3 className="milestone-title">{milestone.title}</h3>
      <span className={`status-badge ${milestone.status.includes('Complete') ? 'status-complete' : 'status-progress'}`}>
        {milestone.status}
      </span>
      <p className="milestone-description">{milestone.description}</p>
      
      {/* Progress bar */}
      <div className="progress-bar">
        <div 
          className={`progress-bar-fill ${milestone.status.includes('Complete') ? 'success' : 'info'}`}
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <ul className="feature-list">
        {milestone.features.map((feature) => (
          <li key={feature} className="feature-item">
            {feature}
          </li>
        ))}
      </ul>
    </article>
  )
}