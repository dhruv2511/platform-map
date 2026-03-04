import type { Pillar } from '../data/platformData'

type Props = {
  pillar: Pillar
}

export function PillarCard({ pillar }: Props) {
  const scoreNum = parseInt(pillar.score, 10)
  
  const scoreClass = scoreNum >= 80 ? 'success' : scoreNum >= 60 ? 'warning' : 'danger'

  return (
    <article className="pillar-card card-density-primary">
      <h3>{pillar.name}</h3>
      
      {/* Ring badge score */}
      <div className={`ring-badge ${scoreClass}`} style={{ '--ring-percent': scoreNum } as React.CSSProperties}>
        {pillar.score}
      </div>
      
      {/* Progress bar */}
      <div className="progress-bar">
        <div 
          className={`progress-bar-fill ${scoreClass}`}
          style={{ width: `${scoreNum}%` }}
        />
      </div>

      <ul>
        {pillar.highlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>
    </article>
  )
}