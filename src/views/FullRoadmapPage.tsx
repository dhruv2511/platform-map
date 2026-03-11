import { DashboardHeroSection } from '../components/roadmap/DashboardHeroSection'
import { FrameworkReviewSection } from '../components/roadmap/FrameworkReviewSection'
import { RecentUpdatesSection } from '../components/roadmap/RecentUpdatesSection'

export function FullRoadmapPage() {
  return (
    <section>
      <DashboardHeroSection />

      <h2 className="section-title">2-Week Sprint Summary (Feb 24 - Mar 5, 2026)</h2>

      <RecentUpdatesSection />
      <FrameworkReviewSection />
    </section>
  )
}