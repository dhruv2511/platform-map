type Metric = {
  label: string
  value: string
  delta: string
  tone: 'good' | 'warn' | 'neutral'
}

const topMetrics: Metric[] = [
  { label: 'AWS WAF', value: '84%', delta: '+7 this week', tone: 'good' },
  { label: 'Databricks WAF', value: '80%', delta: '+5 this week', tone: 'neutral' },
  { label: 'Security Pillar', value: '93%', delta: 'Strong', tone: 'good' },
  { label: 'Platform Maturity', value: 'L3.3', delta: '+1.1 levels', tone: 'warn' },
]

const tags = ['Security Wave Live', 'CI/CD Parity', '14+ Modules Active']

export function DashboardHeroSection() {
  return (
    <section className="dashboard-hero">
      <div className="dashboard-hero-main">
        <span className="dashboard-badge">Platform Health Dashboard</span>
        <h2>Databricks on AWS Delivery Command Center</h2>
        <p>
          Live view of framework alignment, module rollout, and security posture across the aws_dbx platform.
        </p>
        <div className="dashboard-tag-row">
          {tags.map((tag) => (
            <span key={tag} className="dashboard-tag">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="dashboard-metrics-grid">
        {topMetrics.map((metric) => (
          <article key={metric.label} className={`dashboard-metric-card ${metric.tone}`}>
            <p className="metric-label">{metric.label}</p>
            <strong className="metric-value">{metric.value}</strong>
            <span className="metric-delta">{metric.delta}</span>
          </article>
        ))}
      </div>
    </section>
  )
}
