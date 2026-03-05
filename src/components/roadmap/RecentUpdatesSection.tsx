export function RecentUpdatesSection() {
  const securityWave = [
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
      status: '✅ Deployed Feb 27',
      items: ['SAML SSO and SCIM provisioning enabled', 'IdP integration validated', 'Group mappings and admin fallback account'],
    },
    {
      title: '🔑 KMS Encryption for S3',
      status: '✅ Deployed Feb 27',
      items: ['Customer-managed keys with rotation', 'Root/metastore/audit buckets encrypted', 'Pipeline IAM KMS permissions refined'],
    },
    {
      title: '🔗 PrivateLink SCC + REST',
      status: '✅ Deployed Feb 27',
      items: ['REST API endpoint (443)', 'SCC relay endpoint (6666)', 'Multi-AZ interface endpoints'],
    },
  ]

  const architectWave = [
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
      status: '✅ Deployed Mar 5',
      items: ['CloudWatch dashboards for infra/network/cost', 'SNS alarms for NAT/S3/KMS thresholds', 'Team-based cost tracking with budget tiers'],
      arch: 'ARCH-005',
    },
    {
      title: '🔄 Bootstrap User Management',
      status: '✅ Deployed Mar 5',
      items: ['manage_users=true for initial workspace provisioning', 'IdP-first user creation pattern', 'Switch to false after IdP sync complete'],
      arch: 'DevOps',
    },
    {
      title: '📊 Platform-Map Complete Update',
      status: '✅ Complete',
      items: ['AWS 82%→85%, Databricks 80%→83% scores updated', 'L3.4→L3.5 maturity with cost dimension (L3.0)', 'Dashboard restructured to show current state'],
      arch: 'Documentation',
    },
  ]

  return (
    <section className="roadmap-section">
      <h3 className="section-subtitle">
        <span className="section-icon highlights">⚡</span>
        Recent Implementation Waves
      </h3>
      
      <article>
        <h4 style={{ paddingBottom: '1rem' }}>🔒 Feb 27 Security Hardening Wave</h4>
        <div className="feature-grid">
          {securityWave.map((update) => (
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
        <h4 style={{ paddingBottom: '1rem' }}>🚀 Mar 3-5 Architect Sprint Wave</h4>
        <div className="feature-grid">
          {architectWave.map((update) => (
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
        <h4>📈 2-Week Impact Summary</h4>
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
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3498db' }}>+6%</div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>Framework Score (AWS +3%, DBX +3%)</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#9b59b6' }}>L3.5</div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>Platform Maturity (RTO/RPO Defined)</div>
          </div>
        </div>
      </div>
    </section>
  )
}
