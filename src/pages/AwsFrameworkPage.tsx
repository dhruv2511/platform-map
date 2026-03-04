import { PillarCard } from '../components/PillarCard'
import { awsFramework, keyGaps } from '../data/platformData'

export function AwsFrameworkPage() {
  const awsGaps = keyGaps.filter((gap) => gap.framework === 'AWS' || gap.framework === 'Shared')

  return (
    <section>
      <h2 className="section-title">AWS Well-Architected Framework</h2>
      <p>Current status aligned to deployed capabilities in aws_dbx and pipeline-managed environments.</p>
      <div className="grid" style={{ marginTop: 16 }}>
        {awsFramework.map((pillar) => (
          <PillarCard key={pillar.name} pillar={pillar} />
        ))}
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h3>Key AWS-Centric Gaps</h3>
        <ul>
          {awsGaps.map((gap) => (
            <li key={gap.id}>
              <strong>[{gap.severity}] {gap.title}</strong> - {gap.impact}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}