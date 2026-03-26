const pulseCards = [
  {
    title: '🚀 Deployment Status',
    value: '22 Terraform Modules',
    note: 'Centralized registry 100% complete, hub-spoke split + single-VPC patterns deployed, all 22 modules v0.1.0',
    tone: 'emerald',
  },
  {
    title: '⚙️ Architecture Maturity',
    value: 'L4.2 Production-Ready',
    note: 'AWS 93%, Databricks 92%, Security 96% + Compliance Profile (HIPAA/FEDRAMP), 100% implementation with ESM + governance modules',
    tone: 'indigo',
  },
  {
    title: '📊 WAF Coverage & Gaps',
    value: '9 Strengths / 5 Gaps',
    note: '9 architecture strengths; 3 medium priority (Q2-Q3), 2 low priority optimizations remaining',
    tone: 'amber',
  },
]

const timeline = [
  { date: 'Mar 5', title: 'Security hardening sprint: Git PAT removal, S3 versioning, secret scanning pre-commit', state: 'done' },
  { date: 'Mar 6', title: '✅ workspace_monitoring module centralized - infrastructure ready', state: 'done' },
  { date: 'Mar 12', title: '🛠 Monitoring restored: Lakeview dashboards, system tables, quality monitors + audit-log deduplication', state: 'done' },
  { date: 'Mar 18', title: '🎯 Comprehensive WAF re-review: AWS 93%, Databricks 92%, L4.2 maturity achieved', state: 'done' },
  { date: 'Mar 26', title: '✅ L4.2 Production-Ready: 22-module registry, ESM + Compliance Profile, provider DRY refactoring complete', state: 'active' },
  { date: 'Q2 2026', title: 'Planned: Credential rotation automation (ARCH-002), DR drill execution, module governance hardening', state: 'pending' },
  { date: 'Q3 2026', title: 'Planned: Data lineage & quality observability (ARCH-006), user deprovisioning workflow (ARCH-007), SQL standardization', state: 'pending' },
]

export function DeliveryPulseSection() {
  return (
    <section className="roadmap-section">
      <h3 className="section-subtitle">Delivery Pulse</h3>

      <div className="pulse-grid">
        {pulseCards.map((card) => (
          <article key={card.title} className={`pulse-card ${card.tone}`}>
            <p className="pulse-title">{card.title}</p>
            <strong className="pulse-value">{card.value}</strong>
            <p className="pulse-note">{card.note}</p>
          </article>
        ))}
      </div>

      <div className="timeline-card">
        <h4>Roadmap Timeline</h4>
        <ul className="timeline-list">
          {timeline.map((item) => (
            <li key={item.title} className={`timeline-item ${item.state}`}>
              <span className="timeline-date">{item.date}</span>
              <span className="timeline-text">{item.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
