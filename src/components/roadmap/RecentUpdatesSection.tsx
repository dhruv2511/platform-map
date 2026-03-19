export function RecentUpdatesSection() {
  const foundationWave = [
    {
      title: '📊 VPC Flow Logs Integration',
      status: '✅ Complete',
      items: ['Real-time network monitoring to CloudWatch', 'Dedicated flow-log IAM role', 'Configurable retention/traffic/aggregation'],
    },
    {
      title: '📋 Audit Log Delivery Module',
      status: '✅ Complete',
      items: ['Account-level MWS log delivery', 'Cross-account trust with external ID', 'AUDIT_LOGS + BILLABLE_USAGE to S3'],
    },
    {
      title: '🔐 SSO/SCIM Integration',
      status: '✅ Complete',
      items: ['SAML SSO and SCIM provisioning enabled', 'IdP integration validated', 'Group mappings and admin fallback account'],
    },
    {
      title: '🔑 KMS Encryption for S3',
      status: '✅ Complete',
      items: ['Customer-managed keys with rotation', 'Root/metastore/audit buckets encrypted', 'Pipeline IAM KMS permissions refined'],
    },
    {
      title: '🔗 PrivateLink SCC + REST',
      status: '✅ Complete',
      items: ['REST API endpoint (443)', 'SCC relay endpoint (6666)', 'Multi-AZ interface endpoints'],
    },
  ]

  const architectureWave = [
    {
      title: '🚀 DR Runbooks & RTO/RPO',
      status: '✅ Complete',
      items: ['Workspace deletion recovery plan with redeploy strategy', 'Quarterly DR drills and incident tracking', 'RTO ≤4h, RPO ≤1h targets'],
      arch: 'ARCH-004',
    },
    {
      title: '🔄 Lifecycle Tightening',
      status: '✅ Complete',
      items: ['Removed broad ignore_changes from storage module', 'S3/KMS policies now monitored for drift', 'Terraform validate catches policy changes'],
      arch: 'ARCH-003',
    },
    {
      title: '🔐 CI/CD Git PAT Orchestration',
      status: '✅ Complete',
      items: ['Optional GitHub PAT support across terraform-plan/apply/destroy', 'Env-var gating pattern prevents GitHub Actions parser errors', '6 orchestrator workflows updated'],
      arch: 'Security',
    },
    {
      title: '💰 Cost Monitoring & Dashboards',
      status: '✅ Complete',
      items: ['SNS topic with email notifications to ops/finance', 'CloudWatch budget threshold alarm ($5k/month default)', 'Cost anomaly detection (ANOMALY_DETECTION_BAND 2σ)', 'Weekly cost spike alerts (25% threshold)', 'CloudWatch dashboard for real-time cost viz', 'Databricks monthly cost analysis job (1st of month)'],
      arch: 'ARCH-005',
    },
    {
      title: '🔄 Bootstrap User Management',
      status: '✅ Deployed Mar 5',
      items: ['manage_users=true for initial workspace provisioning', 'IdP-first user creation pattern', 'Switch to false after IdP sync complete'],
      arch: 'DevOps',
    },
    {
      title: '📦 Centralized Module Registry + Hub/Spoke Split',
      status: '✅ Complete Mar 18',
      items: ['terraform-modules-central now operational as shared registry', 'Dedicated network_hub and network_spoke modules live', 'Re-review baseline updated: AWS 90%, Databricks 89%, L3.9 maturity'],
      arch: 'ARCH-018',
    },
  ]

  return (
    <section className="roadmap-section">
      <h3 className="section-subtitle">
        <span className="section-icon highlights">⚡</span>
        Recent Implementation Waves
      </h3>
      
      <article>
        <h4 style={{ paddingBottom: '1rem' }}>🔒 Foundation Controls Wave</h4>
        <div className="feature-grid">
          {foundationWave.map((update) => (
            <article className="update-card" key={update.title}>
              <h4>{update.title}</h4>
              <div className="trigger-chip">{update.status}</div>
              <ul>
                {update.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </article>

      <article style={{ marginTop: '2rem' }}>
        <h4 style={{ paddingBottom: '1rem' }}>🚀 Architecture & Platform Evolution Wave</h4>
        <div className="feature-grid">
          {architectureWave.map((update) => (
            <article className="update-card" key={update.title}>
              <h4>{update.title}</h4>
              <div className="trigger-chip">{update.status}</div>
              <ul>
                {update.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              {update.arch && (
                <div style={{ marginTop: '0.5rem', fontSize: '0.85rem', fontWeight: 'bold', color: '#0066cc' }}>
                  → {update.arch}
                </div>
              )}
            </article>
          ))}
        </div>
      </article>

      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <h4>📈 Program Impact Summary</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2ecc71' }}>6/8</div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>Architect Tasks Complete (75%)</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2ecc71' }}>11/11</div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>Security Milestones (100%)</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3498db' }}>90 / 89</div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>Current WAF Baseline (AWS / Databricks)</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#9b59b6' }}>L3.9</div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>Platform Maturity with Centralized Module Operating Model</div>
          </div>
        </div>
      </div>
    </section>
  )
}
