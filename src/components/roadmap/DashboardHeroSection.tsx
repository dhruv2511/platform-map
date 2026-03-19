type Metric = {
  label: string
  value: string
  delta: string
  tone: 'good' | 'warn' | 'neutral'
}

const topMetrics: Metric[] = [
  { label: 'AWS WAF', value: '90%', delta: 'Re-Reviewed Mar 18', tone: 'good' },
  { label: 'Databricks WAF', value: '89%', delta: 'Re-Reviewed Mar 18', tone: 'good' },
  { label: 'Security Pillar', value: '94%', delta: 'Enterprise-Grade', tone: 'good' },
  { label: 'Platform Maturity', value: 'L3.9', delta: '100% Complete', tone: 'good' },
]

const tags = ['🔒 Security Excellence 94%', '🎯 Production-Ready L3.9', '📦 Centralized 20-Module Registry']

export function DashboardHeroSection() {
  return (
    <section className="dashboard-hero">
      <div className="dashboard-hero-main">
        <span className="dashboard-badge">Architecture Re-Review Complete</span>
        <h2>Databricks on AWS: Comprehensive WAF Assessment (Mar 18, 2026)</h2>
        <p>
          Enterprise-grade data platform infrastructure with refreshed WAF alignment. AWS 90%, Databricks 89%, L3.9 maturity. Centralized module registry is operational with dedicated hub/spoke networking modules and zero critical infrastructure gaps identified.
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
