import { moduleGroups } from '../data/platformData'

export function ModulesPage() {
  return (
    <section>
      <h2 className="section-title">Deployed Module Inventory</h2>
      <div className="grid">
        {moduleGroups.map((group) => (
          <article className="card" key={group.name}>
            <h3>{group.name}</h3>
            <ul>
              {group.modules.map((moduleName) => (
                <li key={moduleName}>{moduleName}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}