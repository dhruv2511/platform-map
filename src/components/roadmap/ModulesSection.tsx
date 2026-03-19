export function ModulesSection() {
  const modules = [
    {
      name: 'terraform-modules-central/networking',
      status: '✅ Production Ready',
      description: 'Single-VPC networking module for standalone deployments with required Databricks controls.',
      features: ['single_vpc topology', 'Security groups', 'Databricks-required all-outbound egress', 'VPC endpoints', 'Optional firewall'],
    },
    {
      name: 'terraform-modules-central/network_hub',
      status: '✅ Production Ready',
      description: 'Dedicated hub VPC module for enterprise hub-spoke topologies.',
      features: ['Hub VPC', 'Transit Gateway', 'Centralized egress patterns', 'Optional firewall integration'],
    },
    {
      name: 'terraform-modules-central/network_spoke',
      status: '✅ Production Ready',
      description: 'Dedicated spoke VPC module used for hub-spoke and spoke-only deployments.',
      features: ['Spoke VPC provisioning', 'TGW attachment', 'Databricks workspace subnet layout', 'Flow log support'],
    },
    {
      name: 'terraform-modules-central/storage',
      status: '✅ Production Ready',
      description: 'Reusable S3 storage for root, metastore, and audit contexts with encryption/versioning.',
      features: ['S3 bucket create/reference', 'Encryption and versioning', 'Bucket policies'],
    },
    {
      name: 'terraform-modules-central/audit_log_delivery',
      status: '✅ Production Ready',
      description: 'MWS-level audit and billable usage log delivery with cross-account IAM trust and encrypted S3 delivery wiring.',
      features: ['AUDIT_LOGS + BILLABLE_USAGE', 'External ID validation', 'S3 bucket policy wiring', 'S3 integration'],
    },
    {
      name: 'terraform-modules-central/workspace_monitoring',
      status: '✅ Operational',
      description: 'Lakeview dashboard, SQL warehouse, system-table queries, alerts, and workspace observability for Databricks operations.',
      features: ['Lakeview widgets restored', 'System table grants', 'Optimized aggregate queries', 'Dashboard + query resources'],
    },
    {
      name: 'terraform-modules-central/dbx_workspace_creation',
      status: '✅ Production Ready',
      description: 'Databricks workspace provisioning with VPC integration and cross-account IAM setup.',
      features: ['Workspace creation', 'VPC/subnet attachment', 'Storage credential wiring'],
    },
    {
      name: 'terraform-modules-central/dbx_metastore',
      status: '✅ Production Ready',
      description: 'Unity Catalog metastore creation and workspace attachment with governance baseline.',
      features: ['Metastore creation', 'S3 integration', 'Workspace attachment'],
    },
    {
      name: 'terraform-modules-central/dbx_privatelink',
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
