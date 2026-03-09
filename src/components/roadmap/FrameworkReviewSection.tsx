export function FrameworkReviewSection() {
  return (
    <section className="roadmap-section">
      <h3 className="section-subtitle">
        <span className="section-icon best-practices">📊</span>
        Framework Review & Platform Evolution
      </h3>

      <div className="review-hero card-density-hero">
        <h4>🚀 2-Week Sprint Summary (Feb 24 → Mar 9, 2026)</h4>
        <div className="review-chip-row">
          <span className="review-chip success">Security Wave ✅</span>
          <span className="review-chip success">DR Runbooks ✅</span>
          <span className="review-chip success">Cost Monitoring ✅</span>
          <span className="review-chip success">Module Migration Started ✅</span>
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
            <h5 className="review-state-title">Mar 9 Current State</h5>
            <ul>
              <li>AWS WAF: 88% (+6%) ↗️</li>
              <li>Databricks WAF: 87% (+7%) ↗️</li>
              <li>Maturity: L3.7 (+0.3)</li>
              <li>12/12 milestones feature-complete (99%+)</li>
              <li>✅ DR runbook with RTO/RPO, quarterly drills scheduled</li>
              <li>✅ Cost monitoring: SNS alerts + anomaly detection + dashboards + enforcement</li>
              <li>✅ workspace_monitoring module centralized; 7 modules pending migration</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="kpi-row">
        <div className="kpi card-density-primary">AWS Score<strong>88%</strong><small>+6%</small></div>
        <div className="kpi card-density-primary">Databricks Score<strong>87%</strong><small>+7%</small></div>
        <div className="kpi card-density-primary">Security Pillar<strong>92%</strong><small>+1%</small></div>
        <div className="kpi card-density-primary">Maturity<strong>L3.5 → L3.7</strong><small>OpEx +0.2</small></div>
      </div>

      <div className="feature-grid grid-secondary">
        <article className="roadmap-mini-card success card-density-secondary">
          <h4><span className="icon-status success">✅</span>2-Week Wins (12)</h4>
          <ul>
            <li>✓ ARCH-005: Budget/anomaly controls ✅ 100% complete</li>
            <li>✓ ARCH-004: DR runbooks (RTO/RPO, quarterly drills)</li>
            <li>✓ ARCH-003: Audit drift guards resolved</li>
            <li>✓ Git PAT across all CI/CD pipelines</li>
            <li>✓ Bootstrap user management in place</li>
            <li>✓ Lifecycle tightening (S3/KMS policies)</li>
            <li>✓ workspace_monitoring centralized (Mar 6)</li>
            <li>✓ Cost enforcement + anomaly detection live</li>
            <li>✓ All 12 milestones feature-complete</li>
            <li>✓ Platform-map updated (Mar 9)</li>
            <li>✓ Module migration roadmap documented</li>
            <li>✓ Infrastructure L4.1, Security L4.2 achieved</li>
          </ul>
        </article>
        <article className="roadmap-mini-card warning card-density-secondary">
          <h4><span className="icon-status warning">🔄</span>In Progress (2)</h4>
          <ul>
            <li>⏳ Module centralization: 7/8 modules pending migration</li>
            <li>⏳ ARCH-006: Observability depth (data quality SLOs)</li>
            <li>DLT expectations framework: Ready for post-launch</li>
            <li>Lineage tracking integration: Post-launch priority</li>
          </ul>
        </article>
        <article className="roadmap-mini-card info card-density-secondary">
          <h4><span className="icon-status info">📋</span>Q2 2026 Backlog (3)</h4>
          <ul>
            <li>⏹ ARCH-001: SSO/SCIM validation gates (manual process documented)</li>
            <li>⏹ ARCH-002: Secrets rotation automation (80-day SP, 30-day DB)</li>
            <li>⏹ ARCH-007: User deprovisioning lifecycle automation</li>
            <li>⏹ Q2 Quarterly DR drill (staging environment)</li>
          </ul>
        </article>
      </div>
    </section>
  )
}
