import { Navigate, Route, Routes } from 'react-router-dom'
import { Header } from './components/Header'
import { NavTabs } from './components/NavTabs'
import { AwsFrameworkPage } from './pages/AwsFrameworkPage'
import { DatabricksFrameworkPage } from './pages/DatabricksFrameworkPage'
import { FullRoadmapPage } from './pages/FullRoadmapPage'
import { HomePage } from './pages/HomePage'
import { MaturityPage } from './pages/MaturityPage'
import { ModulesPage } from './pages/ModulesPage'
import { PrerequisitesPage } from './pages/PrerequisitesPage'
import DeploymentDashboard from './components/DeploymentDashboard'
import PrerequisitesTracker from './components/PrerequisitesTracker'

function App() {
  return (
    <div className="app-shell">
      <Header />
      <NavTabs />
      <main className="page-wrap">
        <Routes>
          <Route path="/" element={<FullRoadmapPage />} />
          <Route path="/overview" element={<HomePage />} />
          <Route path="/full-roadmap" element={<FullRoadmapPage />} />
          <Route path="/deployment" element={<DeploymentDashboard />} />
          <Route path="/prerequisites-tracker" element={<PrerequisitesTracker />} />
          <Route path="/aws-framework" element={<AwsFrameworkPage />} />
          <Route path="/databricks-framework" element={<DatabricksFrameworkPage />} />
          <Route path="/modules" element={<ModulesPage />} />
          <Route path="/maturity" element={<MaturityPage />} />
          <Route path="/prerequisites" element={<PrerequisitesPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
