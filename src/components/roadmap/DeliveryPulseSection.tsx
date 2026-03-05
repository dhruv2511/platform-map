const pulseCards = [
  {
    title: 'Deployment Velocity',
    value: '12 Milestones',
    note: '9 complete, 2 in progress (95%+), 1 queued',
    tone: 'emerald',
  },
  {
    title: 'Architecture Maturity',
    value: 'L3.5',
    note: 'Infrastructure L4.1, Security L4.1, OpEx L3.7, Cost L3.0',
    tone: 'indigo',
  },
  {
    title: 'Architect Backlog',
    value: '8 Tasks',
    note: '3 complete (DR, audit drift, PAT), 2 in progress, 3 planned',
    tone: 'amber',
  },
]

const timeline = [
  { date: 'Feb 24', title: 'Baseline architecture review and scoring', state: 'done' },
  { date: 'Feb 27', title: 'Security hardening: SSO/SCIM, KMS, PrivateLink shipped', state: 'done' },
  { date: 'Mar 3-5', title: '🚀 Architect Sprint: DR runbooks, Git PAT, cost monitoring, lifecycle tightening', state: 'done' },
  { date: 'Mar 5', title: 'Platform maturity: AWS 85%, Databricks 83%, L3.5 overall', state: 'active' },
  { date: 'Next', title: 'SSO/SCIM gates, secrets rotation, observability depth', state: 'pending' },
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
