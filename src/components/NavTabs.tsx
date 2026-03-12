'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const tabs = [
  { to: '/', label: 'Full Roadmap' },
  { to: '/overview', label: 'Overview' },
  { to: '/deployment', label: '📊 Deployment Status' },
  { to: '/implementation', label: '🔧 Implementation' },
  { to: '/provider-review', label: '🧩 Provider Review' },
  { to: '/prerequisites-tracker', label: '✅ Prerequisites' },
  { to: '/aws-framework', label: 'AWS Framework' },
  { to: '/databricks-framework', label: 'Databricks Framework' },
  { to: '/modules', label: 'Modules' },
  { to: '/maturity', label: 'Maturity' },
]

export function NavTabs() {
  const pathname = usePathname()

  // Strip basePath so comparison works both locally and on GitHub Pages
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
  const relativePath = (pathname ?? '/').replace(base, '') || '/'

  return (
    <nav className="nav-tabs">
      {tabs.map((tab) => {
        const isActive =
          tab.to === '/'
            ? relativePath === '/'
            : relativePath === tab.to || relativePath.startsWith(tab.to + '/')
        return (
          <Link
            key={tab.to}
            href={tab.to}
            className={`nav-link ${isActive ? 'active' : ''}`}
          >
            {tab.label}
          </Link>
        )
      })}
    </nav>
  )
}