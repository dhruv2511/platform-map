import { DashboardHeroSection } from '../components/roadmap/DashboardHeroSection'
import { DeliveryPulseSection } from '../components/roadmap/DeliveryPulseSection'
import { FrameworkReviewSection } from '../components/roadmap/FrameworkReviewSection'
import { RecentUpdatesSection } from '../components/roadmap/RecentUpdatesSection'

export function FullRoadmapPage() {
  return (
    <section>
      <DashboardHeroSection />

      <h2 className="section-title">Program Summary (Feb 24 - Mar 19, 2026)</h2>

      <DeliveryPulseSection />
      <RecentUpdatesSection />
      <FrameworkReviewSection />
    </section>
  )
}