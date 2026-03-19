import { prerequisiteCategories, prerequisiteStats, prerequisitesData } from '../data/prerequisitesData'

export function PrerequisitesPage() {
  const criticalOpen = prerequisitesData.filter(
    (item) => item.priority === 'critical' && item.status !== 'complete'
  )

  const byCategory = prerequisiteCategories.map((category) => {
    const items = prerequisitesData.filter((item) => item.category === category)
    const done = items.filter((item) => item.status === 'complete').length
    const pct = items.length ? Math.round((done / items.length) * 100) : 0
    return { category, total: items.length, done, pct }
  })

  return (
    <section>
      <h2 className="section-title">Prerequisites and Setup Readiness</h2>
      <p>
        Live readiness view driven by tracked prerequisites for AWS account setup, Databricks account
        controls, CI/CD, networking topology, monitoring, security, and documentation.
      </p>

      <div className="kpi-row" style={{ marginTop: 16 }}>
        <div className="kpi kpi-success">
          Completion
          <strong>{prerequisiteStats.completionPercentage}%</strong>
          <small>
            {prerequisiteStats.complete} of {prerequisiteStats.total} complete
          </small>
        </div>
        <div className="kpi kpi-warning">
          In Progress
          <strong>{prerequisiteStats.inProgress}</strong>
          <small>active work items</small>
        </div>
        <div className="kpi">
          Pending
          <strong>{prerequisiteStats.pending}</strong>
          <small>not yet started</small>
        </div>
        <div className="kpi kpi-info">
          Critical Open
          <strong>{criticalOpen.length}</strong>
          <small>requires owner plan</small>
        </div>
      </div>

      <div className="grid" style={{ marginTop: 16 }}>
        <article className="card">
          <h3>Category Progress</h3>
          <ul>
            {byCategory.map((row) => (
              <li key={row.category}>
                <strong>{row.category}</strong>: {row.done}/{row.total} complete ({row.pct}%)
              </li>
            ))}
          </ul>
        </article>

        <article className="card">
          <h3>Current Network Topology Options</h3>
          <ul>
            <li>
              <strong>single_vpc</strong>: fastest path for isolated environments.
            </li>
            <li>
              <strong>hub_spoke</strong>: shared services plus isolated spoke workspaces.
            </li>
            <li>
              <strong>spoke_only</strong>: attach new workspace VPC to existing hub/TGW.
            </li>
            <li>
              Module split now uses dedicated <code>networking</code>, <code>network_hub</code>, and{' '}
              <code>network_spoke</code>.
            </li>
          </ul>
        </article>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h3>Critical Items Not Complete</h3>
        {criticalOpen.length === 0 ? (
          <p>All critical prerequisites are marked complete.</p>
        ) : (
          <ul>
            {criticalOpen.map((item) => (
              <li key={item.id}>
                <strong>{item.item}</strong> ({item.category}) - owner: {item.owner}, status: {item.status}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h3>Release Governance Prerequisites</h3>
        <ul>
          <li>
            Central module registry release workflow is active in <code>terraform-modules-central</code>.
          </li>
          <li>
            Version pinning policy for consuming repositories is tracked as in-progress and should be
            enforced in CI checks.
          </li>
          <li>Environment protection and approval rules remain required for destroy workflows.</li>
        </ul>
      </div>
    </section>
  )
}
