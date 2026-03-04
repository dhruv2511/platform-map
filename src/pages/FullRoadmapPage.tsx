import { ArchitectureSection } from '../components/roadmap/ArchitectureSection'
import { BestPracticesSection } from '../components/roadmap/BestPracticesSection'
import { DashboardHeroSection } from '../components/roadmap/DashboardHeroSection'
import { DeploymentSection } from '../components/roadmap/DeploymentSection'
import { DeliveryPulseSection } from '../components/roadmap/DeliveryPulseSection'
import { FrameworkReviewSection } from '../components/roadmap/FrameworkReviewSection'
import { InteractiveKPIDashboard } from '../components/roadmap/InteractiveKPIDashboard'
import { InteractiveMilestoneTimeline } from '../components/roadmap/InteractiveMilestoneTimeline'

import { ModulesSection } from '../components/roadmap/ModulesSection'
import { OverviewSection } from '../components/roadmap/OverviewSection'
import { RecentUpdatesSection } from '../components/roadmap/RecentUpdatesSection'
import { WorkflowsSection } from '../components/roadmap/WorkflowsSection'
import { SectionFilter } from '../components/SectionFilter'
import { milestones } from '../data/platformData'

export function FullRoadmapPage() {
  return (
    <section>
      <DashboardHeroSection />

      <h2 className="section-title">Full Roadmap View</h2>
      <p style={{ marginTop: 0, marginBottom: 16, color: 'var(--muted)' }}>
        Interactive dashboard with real-time metrics, milestone tracking, and implementation status.
      </p>

      <InteractiveKPIDashboard />

      <DeliveryPulseSection />

      <SectionFilter />

      <h3 className="section-subtitle" style={{ marginTop: '40px' }}>
        <span className="section-icon milestones">🎯</span>
        Milestone Timeline
      </h3>
      <InteractiveMilestoneTimeline milestones={milestones} />

      <OverviewSection />
      <ModulesSection />
      <ArchitectureSection />
      <WorkflowsSection />
      <DeploymentSection />
      <BestPracticesSection />
      <RecentUpdatesSection />
      <FrameworkReviewSection />
    </section>
  )
}