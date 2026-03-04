import { PillarCard } from '../components/PillarCard'
import { databricksFramework, keyGaps } from '../data/platformData'

export function DatabricksFrameworkPage() {
  const dbxGaps = keyGaps.filter((gap) => gap.framework === 'Databricks' || gap.framework === 'Shared')

  return (
    <section>
      <h2 className="section-title">Databricks Well-Architected Framework</h2>
      <p>Capability-focused view of workspace, governance, operations, security, and data controls.</p>
      <div className="grid" style={{ marginTop: 16 }}>
        {databricksFramework.map((pillar) => (
          <PillarCard key={pillar.name} pillar={pillar} />
        ))}
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h3>Key Databricks-Centric Gaps</h3>
        <ul>
          {dbxGaps.map((gap) => (
            <li key={gap.id}>
              <strong>[{gap.severity}] {gap.title}</strong> - {gap.currentState}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}