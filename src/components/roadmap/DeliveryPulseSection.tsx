const pulseCards = [
  {
    title: 'Deployment Status',
    value: '15 Modules',
    note: 'All production-ready (100%), comprehensive WAF review complete',
    tone: 'emerald',
  },
  {
    title: 'Architecture Maturity',
    value: 'L3.8',
    note: 'Infrastructure L4.1, Security L4.2, Platform L4.0, OpEx L3.9',
    tone: 'indigo',
  },
  {
    title: 'Enhancement Backlog',
    value: '9 Items',
    note: '3 medium priority (Q2-Q3), 6 low priority optimizations',
    tone: 'amber',
  },
]

const timeline = [
  { date: 'Feb 24', title: 'Baseline architecture review and scoring', state: 'done' },
  { date: 'Feb 27', title: 'Security hardening: SSO/SCIM, KMS, PrivateLink shipped', state: 'done' },
  { date: 'Mar 3-5', title: '🚀 Architect Sprint: DR runbooks, Git PAT, cost monitoring, lifecycle tightening', state: 'done' },
  { date: 'Mar 6', title: '✅ workspace_monitoring module centralized - L3.7 infrastructure ready', state: 'done' },
  { date: 'Mar 9', title: 'Platform update: AWS 88%, Databricks 87%, L3.7, 99% implementation', state: 'done' },
  { date: 'Mar 10', title: '🎯 Comprehensive WAF review: AWS 89%, Databricks 88%, L3.8, 100% complete', state: 'active' },
  { date: 'Q2 2026', title: 'Planned: Credential rotation, DR drill, module migration, user deprovisioning', state: 'pending' },
  { date: 'Q3 2026', title: 'Planned: Data observability, cost attribution, query performance analytics', state: 'pending' },
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
