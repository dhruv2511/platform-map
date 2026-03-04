export function DeploymentSection() {
  const patterns = [
    {
      title: 'Standalone VPC',
      type: 'deployment_type = "standalone"',
      use: 'Dev/test, simple production deployments, low complexity footprint.',
    },
    {
      title: 'Firewall-Enabled VPC',
      type: 'deployment_type = "firewall"',
      use: 'Compliance-heavy environments requiring traffic inspection controls.',
    },
    {
      title: 'Hub-and-Spoke',
      type: 'deployment_type = "hub-spoke"',
      use: 'Enterprise multi-workspace architecture with centralized controls.',
    },
    {
      title: 'Spoke-Only (BYOV)',
      type: 'deployment_type = "spoke-only"',
      use: 'Integrate into existing hub networking model with minimal disruption.',
    },
  ]

  return (
    <section className="roadmap-section">
      <h3 className="section-subtitle">Deployment Patterns</h3>
      <div className="feature-grid">
        {patterns.map((pattern) => (
          <article className="pattern-card" key={pattern.title}>
            <h4>{pattern.title}</h4>
            <div className="status-pill">{pattern.type}</div>
            <p>{pattern.use}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
