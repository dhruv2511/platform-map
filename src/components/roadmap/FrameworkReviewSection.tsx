export function FrameworkReviewSection() {
  return (
    <section className="roadmap-section">
      <h3 className="section-subtitle">
        <span className="section-icon best-practices">📊</span>
        Framework Review & Platform Evolution
      </h3>

      <div className="review-hero card-density-hero">
        <h4>🚀 2-Week Sprint Summary (Feb 24 → Mar 5, 2026)</h4>
        <div className="review-chip-row">
          <span className="review-chip success">Security Wave ✅</span>
          <span className="review-chip success">DR Runbooks ✅</span>
          <span className="review-chip success">Cost Monitoring ✅</span>
          <span className="review-chip info">Architect Tasks 3/8 ✅</span>
        </div>
        <div className="review-grid">
          <div className="review-state before card-density-primary">
            <h5 className="review-state-title">Feb 24 Baseline</h5>
            <ul>
              <li>AWS WAF: 82%</li>
              <li>Databricks WAF: 80%</li>
              <li>Maturity: L3.4</li>
              <li>8/12 milestones complete</li>
              <li>No DR runbook, lifecycle drift guards broad</li>
              <li>Cost framework descriptive only</li>
            </ul>
          </div>
          <div className="review-state after card-density-primary">
            <h5 className="review-state-title">Mar 5 Current State</h5>
            <ul>
              <li>AWS WAF: 85% (+3%) ↗️</li>
              <li>Databricks WAF: 83% (+3%) ↗️</li>
              <li>Maturity: L3.5 (+0.1)</li>
              <li>10/12 milestones complete (95%+)</li>
              <li>✅ DR runbook with RTO/RPO, quarterly drills</li>
              <li>✅ Cost monitoring: SNS alerts + anomaly detection + dashboards</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="kpi-row">
        <div className="kpi card-density-primary">AWS Score<strong>85%</strong><small>+3%</small></div>
        <div className="kpi card-density-primary">Databricks Score<strong>83%</strong><small>+3%</small></div>
        <div className="kpi card-density-primary">Security Pillar<strong>91%</strong><small>Maintained</small></div>
        <div className="kpi card-density-primary">Maturity<strong>L3.4 → L3.5</strong><small>OpEx +0.3</small></div>
      </div>

      <div className="feature-grid grid-secondary">
        <article className="roadmap-mini-card success card-density-secondary">
          <h4><span className="icon-status success">✅</span>2-Week Wins (7)</h4>
          <ul>
            <li>✓ ARCH-005: Budget/anomaly controls ✅</li>
            <li>✓ ARCH-004: DR runbooks (RTO/RPO)</li>
            <li>✓ ARCH-003: Audit drift guards</li>
            <li>✓ Git PAT across all CI/CD</li>
            <li>✓ Bootstrap user management</li>
            <li>✓ Lifecycle tightening (S3/KMS)</li>
            <li>✓ Platform-map updated</li>
          </ul>
        </article>
        <article className="roadmap-mini-card warning card-density-secondary">
          <h4><span className="icon-status warning">🔄</span>In Progress (1)</h4>
          <ul>
            <li>⏳ ARCH-006: Observability depth (data quality SLOs)</li>
            <li>DLT expectations framework: 0% done</li>
            <li>Freshness SLO dashboard: pending</li>
            <li>Lineage tracking integration: pending</li>
          </ul>
        </article>
        <article className="roadmap-mini-card info card-density-secondary">
          <h4><span className="icon-status info">📋</span>Planned Next (4)</h4>
          <ul>
            <li>⏹ ARCH-001: SSO/SCIM gates</li>
            <li>⏹ ARCH-002: Secrets rotation</li>
            <li>⏹ ARCH-007: User deprovisioning</li>
            <li>⏹ ARCH-008: Git restrictions</li>
          </ul>
        </article>
      </div>
    </section>
  )
}
