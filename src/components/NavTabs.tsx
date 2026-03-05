import { NavLink } from 'react-router-dom'

const tabs = [
  { to: '/', label: 'Full Roadmap' },
  { to: '/overview', label: 'Overview' },
  { to: '/deployment', label: '📊 Deployment Status' },
  { to: '/implementation', label: '🔧 Implementation' },
  { to: '/prerequisites-tracker', label: '✅ Prerequisites' },
  { to: '/aws-framework', label: 'AWS Framework' },
  { to: '/databricks-framework', label: 'Databricks Framework' },
  { to: '/modules', label: 'Modules' },
  { to: '/maturity', label: 'Maturity' },
]

export function NavTabs() {
  return (
    <nav className="nav-tabs">
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.to === '/'}
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          {tab.label}
        </NavLink>
      ))}
    </nav>
  )
}