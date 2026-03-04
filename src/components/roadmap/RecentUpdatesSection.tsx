export function RecentUpdatesSection() {
  const updates = [
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

  return (
    <section className="roadmap-section">
      <h3 className="section-subtitle">Recent Updates (Security Hardening Wave)</h3>
      <div className="feature-grid">
        {updates.map((update) => (
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
    </section>
  )
}
