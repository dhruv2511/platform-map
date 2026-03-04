export function FrameworkReviewSection() {
  return (
    <section className="roadmap-section">
      <h3 className="section-subtitle">
        <span className="section-icon best-practices">📊</span>
        Framework Review Deep Dive
      </h3>

      <div className="review-hero card-density-hero">
        <h4>🔄 Platform Evolution (Feb 24 → Feb 27)</h4>
        <div className="review-chip-row">
          <span className="review-chip warning">Stability Sprint</span>
          <span className="review-chip success">Security Milestone</span>
          <span className="review-chip info">Automation Track</span>
        </div>
        <div className="review-grid">
          <div className="review-state before card-density-primary">
            <h5 className="review-state-title">Before</h5>
            <ul>
              <li>Workspace config and backend variable drift</li>
              <li>Missing Azure DevOps parity</li>
              <li>SSO/SCIM modules not fully operationalized</li>
            </ul>
          </div>
          <div className="review-state after card-density-primary">
            <h5 className="review-state-title">After</h5>
            <ul>
              <li>Repo variable/state alignment complete</li>
              <li>CI/CD parity implemented</li>
              <li>SSO/SCIM, KMS, PrivateLink security wave deployed</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="kpi-row">
        <div className="kpi card-density-primary">AWS Score<strong>84%</strong></div>
        <div className="kpi card-density-primary">Databricks Score<strong>78%</strong></div>
        <div className="kpi card-density-primary">Security Pillar<strong>93%</strong></div>
        <div className="kpi card-density-primary">Maturity<strong>L3.0 → L3.3</strong></div>
      </div>

      <div className="feature-grid grid-secondary">
        <article className="roadmap-mini-card warning card-density-secondary">
          <h4><span className="icon-status warning">⚠</span>P0 Critical</h4>
          <ul>
            <li>✓ IAM updates deployed</li>
            <li>System table setup</li>
            <li>CloudWatch dashboards + alarms</li>
          </ul>
        </article>
        <article className="roadmap-mini-card warning card-density-secondary">
          <h4><span className="icon-status warning">⚠</span>P1 High</h4>
          <ul>
            <li>Cluster policy enforcement</li>
            <li>Backup strategy rollout</li>
            <li>Secret rotation lifecycle automation</li>
          </ul>
        </article>
        <article className="roadmap-mini-card success card-density-secondary">
          <h4><span className="icon-status success">✓</span>P2 Medium</h4>
          <ul>
            <li>Spot strategy and DBU optimization</li>
            <li>Private DNS refinements</li>
            <li>Runbook and DR hardening</li>
          </ul>
        </article>
      </div>
    </section>
  )
}
