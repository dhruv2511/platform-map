import {
  awsPillarContributionSummary,
  CURRENT_PROVIDER_VERSION,
  databricksPillarContributionSummary,
  LATEST_PROVIDER_VERSION,
  type ProviderGapCategory,
  providerGaps,
  reviewContributions,
  reviewWaves,
} from '../data/providerReviewData'

const SEVERITY_COLOR: Record<string, string> = {
  High: '#b91c1c',
  Medium: '#b45309',
  Low: '#15803d',
}

const CATEGORY_ORDER: ProviderGapCategory[] = [
  'Provider Currency',
  'Security & Compliance',
  'Compute & Serverless',
  'Governance & Monitoring',
  'AI / ML Platform',
]

export function ProviderReviewPage() {
  const completedContributions = reviewContributions.filter((item) => item.status === 'Completed')
  const highGaps = providerGaps.filter((g) => g.severity === 'High').length
  const mediumGaps = providerGaps.filter((g) => g.severity === 'Medium').length

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

      {/* ── Provider Gap Analysis ─────────────────────────────────────────── */}
      <div className="card" style={{ marginTop: 24, borderLeft: '4px solid #e11d48' }}>
        <h3>⚠️ Provider Gap Analysis — Current vs Latest Databricks Terraform Provider</h3>
        <p style={{ marginBottom: 12 }}>
          Current pin: <code>{CURRENT_PROVIDER_VERSION}</code> across all stacks (Part A / B / C).{' '}
          Latest available: <code>{LATEST_PROVIDER_VERSION}</code>.{' '}
          <strong>{providerGaps.length} gaps identified</strong> —{' '}
          <span style={{ color: SEVERITY_COLOR['High'], fontWeight: 700 }}>{highGaps} High</span>,{' '}
          <span style={{ color: SEVERITY_COLOR['Medium'], fontWeight: 700 }}>{mediumGaps} Medium</span>.
          Gaps are grouped by category and wave assignment below.
        </p>

        {CATEGORY_ORDER.map((category) => {
          const items = providerGaps.filter((g) => g.category === category)
          if (items.length === 0) return null
          return (
            <div key={category} style={{ marginBottom: 20 }}>
              <h4 style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: 4, marginBottom: 8 }}>
                {category}
              </h4>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ background: '#f9fafb', textAlign: 'left' }}>
                    <th style={{ padding: '6px 8px', width: 70 }}>ID</th>
                    <th style={{ padding: '6px 8px', width: 60 }}>Severity</th>
                    <th style={{ padding: '6px 8px', width: 280 }}>Resource</th>
                    <th style={{ padding: '6px 8px' }}>Gap Summary</th>
                    <th style={{ padding: '6px 8px', width: 110 }}>Wave</th>
                    <th style={{ padding: '6px 8px', width: 110 }}>Provider Ver.</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((gap, idx) => (
                    <tr
                      key={gap.id}
                      style={{
                        background: idx % 2 === 0 ? '#fff' : '#f9fafb',
                        verticalAlign: 'top',
                      }}
                    >
                      <td style={{ padding: '6px 8px', fontFamily: 'monospace' }}>{gap.id}</td>
                      <td style={{ padding: '6px 8px' }}>
                        <span style={{ color: SEVERITY_COLOR[gap.severity], fontWeight: 700 }}>
                          {gap.severity}
                        </span>
                      </td>
                      <td style={{ padding: '6px 8px', fontFamily: 'monospace', fontSize: 12 }}>
                        {gap.resource}
                      </td>
                      <td style={{ padding: '6px 8px' }}>
                        <strong>{gap.title}</strong>
                        <br />
                        <span style={{ color: '#4b5563' }}>{gap.description}</span>
                        <br />
                        <span style={{ color: '#6b7280', fontStyle: 'italic' }}>
                          Impact: {gap.impact}
                        </span>
                      </td>
                      <td style={{ padding: '6px 8px', whiteSpace: 'nowrap' }}>{gap.wave}</td>
                      <td style={{ padding: '6px 8px', fontFamily: 'monospace', fontSize: 12 }}>
                        {gap.providerVersionIntroduced}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        })}

        <p style={{ marginTop: 12, color: '#6b7280', fontSize: 12 }}>
          * Upgrade path: Part C → Part A → Part B with compatibility testing at each stage.
          Instance pools (PGP-006) and global init scripts (PGP-007) are available at the current pin but
          deferred to Wave 2 (P1).
        </p>
      </div>

      {/* ── WAF Contributions ─────────────────────────────────────────────── */}
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
