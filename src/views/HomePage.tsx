import { keyGaps, scoreCards } from '../data/platformData'

export function HomePage() {
  const topGaps = keyGaps.filter((gap) => gap.severity === 'High')

  return (
    <section>
      <h2 className="section-title">Overview</h2>
      <div className="kpi-row">
        <div className="kpi">
          AWS WAF
          <strong>{scoreCards.awsWaf}</strong>
        </div>
        <div className="kpi">
          Databricks WAF
          <strong>{scoreCards.databricksWaf}</strong>
        </div>
        <div className="kpi">
          Platform Maturity
          <strong>{scoreCards.platformMaturity}</strong>
        </div>
        <div className="kpi">
          Security Pillar
          <strong>{scoreCards.securityPillar}</strong>
        </div>
      </div>

      <div className="card">
        <h3>Pipeline-first Deployment Model</h3>
        <ul>
          <li>Infrastructure and workspace config are deployed through CI/CD pipelines.</li>
          <li>GitHub OIDC authentication is used for AWS role assumption.</li>
          <li>Terraform state is managed in encrypted S3 with DynamoDB locking.</li>
          <li>Shared module delivery now runs through terraform-modules-central with versioned module releases.</li>
          <li>Networking topology is explicitly split across networking, network_hub, and network_spoke modules.</li>
          <li>Framework pages map deployed capabilities to AWS and Databricks standards.</li>
        </ul>
      </div>

      <div className="card">
        <h3>Key System Gaps (High Priority)</h3>
        <ul>
          {topGaps.map((gap) => (
            <li key={gap.id}>
              <strong>{gap.title}:</strong> {gap.currentState}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}