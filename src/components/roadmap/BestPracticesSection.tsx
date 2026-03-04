import { PillarCard } from '../PillarCard'
import { awsFramework, databricksFramework } from '../../data/platformData'

export function BestPracticesSection() {
  return (
    <section className="roadmap-section">
      <h3 className="section-subtitle">Well-Architected Framework Alignment</h3>
      <div className="banner aws">☁️ AWS Well-Architected Framework</div>
      <div className="roadmap-grid" style={{ marginBottom: 20 }}>
        {awsFramework.map((pillar) => (
          <PillarCard key={pillar.name} pillar={pillar} />
        ))}
      </div>
      <div className="banner dbx">🧱 Databricks Well-Architected Framework</div>
      <div className="roadmap-grid">
        {databricksFramework.map((pillar) => (
          <PillarCard key={pillar.name} pillar={pillar} />
        ))}
      </div>
    </section>
  )
}
