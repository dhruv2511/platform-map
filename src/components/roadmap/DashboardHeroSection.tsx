type Metric = {
  label: string
  value: string
  delta: string
  tone: 'good' | 'warn' | 'neutral'
}

const topMetrics: Metric[] = [
  { label: 'AWS WAF', value: '93%', delta: '+3% since Mar 9', tone: 'good' },
  { label: 'Databricks WAF', value: '92%', delta: '+5% since Mar 9', tone: 'good' },
  { label: 'Security Pillar', value: '96%', delta: 'Enterprise-Grade + ESM', tone: 'good' },
  { label: 'Platform Maturity', value: 'L4.2', delta: '100% Implementation', tone: 'good' },
]

const tags = ['🔒 Security Excellence 96%', '🎯 Production-Ready L4.2', '📦 Centralized 22-Module Registry', '✅ HIPAA/FEDRAMP Compliant']

export function DashboardHeroSection() {
  return (
    <section className="dashboard-hero">
      <div className="dashboard-hero-main">
        <span className="dashboard-badge">L4.2 Production-Ready | Latest Update: Mar 26, 2026</span>
        <h2>Databricks on AWS: Enterprise Production Platform (L4.2 Maturity)</h2>
        <p>
          Enterprise-grade data platform infrastructure with production-ready security, governance, and centralized module operating model. AWS 93%, Databricks 92%, L4.2 maturity achieved. 22-module centralized registry operational with hub/spoke + single-VPC networking, ESM + HIPAA/FEDRAMP Compliance Profile, and zero critical infrastructure gaps.
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
