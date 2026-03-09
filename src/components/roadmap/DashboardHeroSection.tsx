type Metric = {
  label: string
  value: string
  delta: string
  tone: 'good' | 'warn' | 'neutral'
}

const topMetrics: Metric[] = [
  { label: 'AWS WAF', value: '88%', delta: '+6 (2-week sprint)', tone: 'good' },
  { label: 'Databricks WAF', value: '87%', delta: '+7 (2-week sprint)', tone: 'good' },
  { label: 'Security Pillar', value: '92%', delta: 'Maintained', tone: 'good' },
  { label: 'Platform Maturity', value: 'L3.7', delta: '+0.3 (OpEx +0.3)', tone: 'good' },
]

const tags = ['🔒 Security Wave Complete', '🚀 Infrastructure Ready', '📊 DR & Cost Monitoring Live']

export function DashboardHeroSection() {
  return (
    <section className="dashboard-hero">
      <div className="dashboard-hero-main">
        <span className="dashboard-badge">2-Week Sprint Summary</span>
        <h2>Databricks on AWS: Feb 24 → Mar 9 Delivery Sprint</h2>
        <p>
          Security hardening wave + architect sprint completion. Platform maturity L3.7, AWS 88%, Databricks 87%. Real-time status on DR readiness, cost monitoring with enforcement, module centralization, and lifecycle governance. ✅ 99% implementation complete.
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
