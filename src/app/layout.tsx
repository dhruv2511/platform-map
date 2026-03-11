import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { NavTabs } from '@/components/NavTabs'
import '../index.css'

export const metadata: Metadata = {
  title: 'Platform Map | AWS Databricks',
  description: 'Framework-aligned view of deployed capabilities, modules, and maturity',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="app-shell">
          <Header />
          <NavTabs />
          <main className="page-wrap">{children}</main>
        </div>
      </body>
    </html>
  )
}
