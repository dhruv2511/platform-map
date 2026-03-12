export function ArchitectureSection() {
  const layers = [
    {
      title: '✅ Layer 5: CI/CD Automation',
      details:
        'GitHub Actions reusable workflows, Azure DevOps parity, orchestrators, approval gates, destructive-change controls.',
    },
    {
      title: '✅ Layer 4: Workspace Configuration',
      details:
        'Users/groups, permissions, SSO/SCIM modules, repo-level separation from infrastructure lifecycle, plus Lakeview workspace monitoring and system-table observability.',
    },
    {
      title: '✅ Layer 3: Databricks Platform',
      details:
        'Workspace creation, Unity Catalog, cross-account IAM, storage and credential setup, optional PrivateLink, and account-level audit log delivery.',
    },
    {
      title: '✅ Layer 2: Cloud Networking & Storage',
      details:
        'VPC/subnets, NAT/IGW, endpoints, firewall options, encrypted and versioned S3 foundations, and Databricks-compliant outbound security-group egress.',
    },
    {
      title: '✅ Layer 1: Backend Infrastructure',
      details:
        'S3 backend, DynamoDB lock, OIDC providers, role family separation, bootstrap secrets.',
    },
  ]

  return (
    <section className="roadmap-section">
      <h3 className="section-subtitle">System Architecture</h3>
      <p className="section-lead">Layered architecture from backend platform controls to runtime workspace configuration.</p>
      <div className="stack-flow">
        {layers.map((layer, index) => (
          <div key={layer.title} className="layer-box">
            <h4>{layer.title}</h4>
            <p>{layer.details}</p>
            {index < layers.length - 1 && <div className="layer-arrow">↓</div>}
          </div>
        ))}
      </div>
      <div className="code-panel">
        <strong>Repository Structure:</strong>
        <pre>
aws_dbx/
├── aws-databricks-backend-provisioning/
├── aws_databricks_provisioning/
├── databricks-workspace-configuration-aws/
├── databricks-service-principal-bootstrap/
└── pipeline_workflows/
        </pre>
      </div>
    </section>
  )
}
