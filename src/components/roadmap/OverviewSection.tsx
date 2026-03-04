export function OverviewSection() {
  const statusRows = [
    ['Backend', '✅ Complete', 'S3 state, DynamoDB lock, multi-OIDC, least-privilege roles, Secrets Manager bootstrap', 'aws-databricks-backend-provisioning/'],
    ['Networking', '✅ Complete', '4 patterns, VPC endpoints, security groups', 'modules/networking/'],
    ['Storage', '✅ Complete', 'S3 buckets for root & metastore', 'modules/storage/'],
    ['Workspace', '✅ Complete', 'Workspace creation with VPC integration', 'modules/dbx_workspace_creation/'],
    ['Unity Catalog', '✅ Complete', 'Metastore & workspace attachment', 'modules/dbx_metastore/'],
    ['Workspace Config', '⚠️ Partial', 'Users/groups baseline; SSO/SCIM modules available but not fully automated', 'databricks-workspace-configuration-aws/'],
    ['Service Principals', '✅ Complete', 'Automated credential lifecycle', 'databricks-service-principal-bootstrap/'],
    ['CI/CD', '✅ Complete', 'Reusable workflows + Azure DevOps parity', 'pipeline_workflows/'],
  ]

  return (
    <section className="roadmap-section">
      <h3 className="section-subtitle">
        <span className="section-icon overview">📋</span>
        Project Overview
      </h3>
      <p className="section-lead">
        The aws_dbx platform provides an end-to-end, production-ready foundation for Databricks on AWS across backend provisioning,
        workspace creation, Unity Catalog governance, and workspace configuration with CI/CD parity across GitHub Actions and Azure DevOps.
      </p>

      <div className="feature-grid">
        <article className="roadmap-mini-card">
          <h4>✅ Backend Infrastructure</h4>
          <p>CloudFormation and Terraform backend with OIDC role families and secure state handling.</p>
          <div className="progress-bar">
            <div className="progress-bar-fill success" style={{ width: '100%' }} />
          </div>
        </article>
        <article className="roadmap-mini-card">
          <h4>✅ Unified Networking</h4>
          <p>Standalone, firewall, hub-spoke, and spoke-only patterns with VPC endpoints and segmented networking.</p>
          <div className="progress-bar">
            <div className="progress-bar-fill success" style={{ width: '100%' }} />
          </div>
        </article>
        <article className="roadmap-mini-card">
          <h4>✅ Workspace + Unity Catalog</h4>
          <p>Databricks workspace, metastore, storage buckets, and cross-account IAM wiring deployed.</p>
          <div className="progress-bar">
            <div className="progress-bar-fill success" style={{ width: '100%' }} />
          </div>
        </article>
        <article className="roadmap-mini-card warning">
          <h4>⚠️ Workspace Configuration</h4>
          <p>Users/groups and SSO/SCIM baseline implemented; full IdP onboarding automation still pending.</p>
          <div className="progress-bar">
            <div className="progress-bar-fill warning" style={{ width: '65%' }} />
          </div>
        </article>
      </div>

      <div className="table-wrap enhanced-table">
        <table>
          <thead>
            <tr>
              <th>Component</th>
              <th>Status</th>
              <th>Key Features</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {statusRows.map((row) => (
              <tr key={row[0]}>
                <td>{row[0]}</td>
                <td>{row[1]}</td>
                <td>{row[2]}</td>
                <td>
                  <span className="code-chip">{row[3]}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
