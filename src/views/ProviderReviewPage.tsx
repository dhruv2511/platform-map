import {
  awsPillarContributionSummary,
  databricksPillarContributionSummary,
  reviewContributions,
  reviewWaves,
} from '../data/providerReviewData'

export function ProviderReviewPage() {
  const completedContributions = reviewContributions.filter((item) => item.status === 'Completed')

  return (
    <section>
      <h2 className="section-title">🧩 Provider Baseline Review Alignment</h2>
      <p>
        Re-review outcomes from March 2026 translated into platform capabilities and mapped to both AWS and
        Databricks well-architected pillars.
      </p>

      <div className="kpi-row" style={{ marginTop: 16 }}>
        <div className="kpi kpi-success">
          Current Baseline
          <strong>AWS 90% / DBX 89%</strong>
          <small>L3.9 maturity</small>
        </div>
        <div className="kpi kpi-info">
          Wave 1 Status
          <strong>Completed</strong>
          <small>P0 + central modules delivered</small>
        </div>
        <div className="kpi kpi-warning">
          Completed Contributions
          <strong>{completedContributions.length}</strong>
          <small>cross-part changes</small>
        </div>
        <div className="kpi">
          Next Waves
          <strong>2</strong>
          <small>P1 and P2 planned</small>
        </div>
      </div>

      <div className="grid" style={{ marginTop: 16 }}>
        <div className="card">
          <h3>AWS Well-Architected Contribution</h3>
          <ul>
            {awsPillarContributionSummary.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="card">
          <h3>Databricks Well-Architected Contribution</h3>
          <ul>
            {databricksPillarContributionSummary.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h3>Review Contributions</h3>
        <ul>
          {reviewContributions.map((item) => (
            <li key={item.id}>
              <strong>[{item.status}] {item.title}</strong> ({item.scope}) — {item.contribution}
              <br />
              <small>
                AWS: {item.awsPillars.join(', ')} | Databricks: {item.databricksPillars.join(', ')}
              </small>
            </li>
          ))}
        </ul>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h3>Wave Plan</h3>
        {reviewWaves.map((wave) => (
          <div key={wave.wave} style={{ marginBottom: 12 }}>
            <h4>{wave.wave} — {wave.status}</h4>
            <ul>
              {wave.tasks.map((task) => (
                <li key={task}>{task}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
