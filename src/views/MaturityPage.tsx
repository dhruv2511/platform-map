import { maturityRows } from '../data/platformData'

export function MaturityPage() {
  return (
    <section>
      <h2 className="section-title">Platform Maturity</h2>
      <div className="table-wrap card" style={{ borderLeft: '4px solid #4CAF50' }}>
        <table>
          <thead>
            <tr>
              <th>Dimension</th>
              <th>Level</th>
              <th>Capabilities</th>
            </tr>
          </thead>
          <tbody>
            {maturityRows.map((row) => (
              <tr key={row.dimension}>
                <td>{row.dimension}</td>
                <td>{row.level}</td>
                <td>{row.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}