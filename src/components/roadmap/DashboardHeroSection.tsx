type Metric = {
  label: string
  value: string
  delta: string
  tone: 'good' | 'warn' | 'neutral'
}

const topMetrics: Metric[] = [
  { label: 'AWS WAF', value: '85%', delta: '+3 (2-week sprint)', tone: 'good' },
  { label: 'Databricks WAF', value: '83%', delta: '+3 (2-week sprint)', tone: 'good' },
  { label: 'Security Pillar', value: '91%', delta: 'Maintained', tone: 'good' },
  { label: 'Platform Maturity', value: 'L3.5', delta: '+0.1 (OpEx +0.3)', tone: 'good' },
]

const tags = ['🔒 Security Wave Complete', '🚀 Architect Sprint Done', '📊 DR Runbooks Live']

export function DashboardHeroSection() {
  return (
    <section className="dashboard-hero">
      <div className="dashboard-hero-main">
        <span className="dashboard-badge">2-Week Sprint Summary</span>
        <h2>Databricks on AWS: Feb 24 → Mar 5 Delivery Sprint</h2>
        <p>
          Security hardening wave + architect sprint completion. Platform maturity L3.5, AWS 85%, Databricks 83%. Real-time status on DR readiness, cost monitoring, and lifecycle governance.
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
