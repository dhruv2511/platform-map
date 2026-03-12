export function ModulesSection() {
  const modules = [
    {
      name: 'modules/networking',
      status: '✅ Production Ready',
      description: 'Unified networking module supporting standalone, firewall, hub-spoke and spoke-only patterns.',
      features: ['4 deployment patterns', 'Security groups', 'Databricks-required all-outbound egress', 'VPC endpoints', 'Optional firewall + TGW'],
    },
    {
      name: 'modules/storage',
      status: '✅ Production Ready',
      description: 'Reusable S3 storage for root, metastore, and audit contexts with encryption/versioning.',
      features: ['S3 bucket create/reference', 'Encryption and versioning', 'Bucket policies'],
    },
    {
      name: 'modules/audit_log_delivery',
      status: '✅ Production Ready',
      description: 'MWS-level audit and billable usage log delivery with cross-account IAM trust and encrypted S3 delivery wiring.',
      features: ['AUDIT_LOGS + BILLABLE_USAGE', 'External ID validation', 'S3 bucket policy wiring', 'S3 integration'],
    },
    {
      name: 'modules/workspace_monitoring',
      status: '✅ Operational',
      description: 'Lakeview dashboard, SQL warehouse, system-table queries, alerts, and workspace observability for Databricks operations.',
      features: ['Lakeview widgets restored', 'System table grants', 'Optimized aggregate queries', 'Dashboard + query resources'],
    },
    {
      name: 'modules/dbx_workspace_creation',
      status: '✅ Production Ready',
      description: 'Databricks workspace provisioning with VPC integration and cross-account IAM setup.',
      features: ['Workspace creation', 'VPC/subnet attachment', 'Storage credential wiring'],
    },
    {
      name: 'modules/dbx_metastore',
      status: '✅ Production Ready',
      description: 'Unity Catalog metastore creation and workspace attachment with governance baseline.',
      features: ['Metastore creation', 'S3 integration', 'Workspace attachment'],
    },
    {
      name: 'modules/dbx_privatelink',
      status: '⚠️ Enterprise Optional',
      description: 'Optional private control-plane connectivity for REST API and SCC relay.',
      features: ['Private endpoints', 'SCC relay', 'Hybrid/public-private patterns'],
    },
  ]

  return (
    <section className="roadmap-section">
      <h3 className="section-subtitle">Terraform Modules</h3>
      <div className="feature-grid">
        {modules.map((module) => (
          <article key={module.name} className="module-panel">
            <div className="module-panel-head">
              <h4>{module.name}</h4>
              <span className="status-pill">{module.status}</span>
            </div>
            <p>{module.description}</p>
            <ul>
              {module.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}
