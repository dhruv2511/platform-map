type Metric = {
  label: string
  value: string
  delta: string
  tone: 'good' | 'warn' | 'neutral'
}

const topMetrics: Metric[] = [
  { label: 'AWS WAF', value: '89%', delta: 'Architecture Review', tone: 'good' },
  { label: 'Databricks WAF', value: '88%', delta: 'Architecture Review', tone: 'good' },
  { label: 'Security Pillar', value: '94%', delta: 'Enterprise-Grade', tone: 'good' },
  { label: 'Platform Maturity', value: 'L3.8', delta: '100% Complete', tone: 'good' },
]

const tags = ['🔒 Security Excellence 94%', '🎯 Production-Ready L3.8', '📊 100% Implementation Complete']

export function DashboardHeroSection() {
  return (
    <section className="dashboard-hero">
      <div className="dashboard-hero-main">
        <span className="dashboard-badge">Architecture Review Complete</span>
        <h2>Databricks on AWS: Comprehensive WAF Assessment (Mar 10, 2026)</h2>
        <p>
          Enterprise-grade data platform infrastructure with excellent WAF alignment. AWS 89%, Databricks 88%, L3.8 maturity. All 15 modules production-ready with comprehensive security, cost governance, and operational excellence. ✅ Zero critical gaps identified.
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
