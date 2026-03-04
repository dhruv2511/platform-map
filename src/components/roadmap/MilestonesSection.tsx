import { MilestoneCard } from '../MilestoneCard'
import { milestones } from '../../data/platformData'

export function MilestonesSection() {
  return (
    <section className="roadmap-section">
      <h3 className="section-subtitle">
        <span className="section-icon milestones">🎯</span>
        Implementation Milestones
      </h3>
      <div className="roadmap-grid grid-primary">
        {milestones.map((milestone) => (
          <MilestoneCard key={milestone.number} milestone={milestone} />
        ))}
      </div>
    </section>
  )
}
