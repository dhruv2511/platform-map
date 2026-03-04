const pulseCards = [
  {
    title: 'Deployment Velocity',
    value: '12 Milestones',
    note: '8 complete, 2 in progress, 2 queued',
    tone: 'emerald',
  },
  {
    title: 'Infrastructure Footprint',
    value: '14+ Modules',
    note: 'Provisioning + workspace + backend layers',
    tone: 'indigo',
  },
  {
    title: 'CI/CD Reliability',
    value: 'Dual Stack',
    note: 'GitHub Actions + Azure DevOps parity',
    tone: 'amber',
  },
]

const timeline = [
  { date: 'Feb 24', title: 'Baseline maturity mapped', state: 'done' },
  { date: 'Feb 26', title: 'Repo parity + variable alignment', state: 'done' },
  { date: 'Feb 27', title: 'Security hardening wave shipped', state: 'active' },
  { date: 'Next', title: 'Observability + cost optimization', state: 'pending' },
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
