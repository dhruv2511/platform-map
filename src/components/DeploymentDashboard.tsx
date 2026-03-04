import { componentDetails, architectureAssessment, keyGaps } from '../data/platformData'

export default function DeploymentDashboard() {
  // Group components by layer
  const componentsByLayer = componentDetails.reduce((acc, component) => {
    if (!acc[component.layer]) {
      acc[component.layer] = []
    }
    acc[component.layer].push(component)
    return acc
  }, {} as Record<string, typeof componentDetails>)

  const layers = [
    'Layer 1: Provisioning',
    'Layer 2: Bootstrap',
    'Layer 3: Configuration',
    'Layer 4: Operations',
  ]

  const highPriorityGaps = keyGaps.filter((gap) => gap.severity === 'High')

  const getStatusIcon = (status: string) => {
    if (status.includes('✅')) return '✅'
    if (status.includes('⚙️')) return '⚙️'
    if (status.includes('⚠️')) return '⚠️'
    return '❌'
  }

  const getStatusColor = (status: string) => {
    if (status.includes('✅')) return '#10b981'
    if (status.includes('⚙️')) return '#f59e0b'
    if (status.includes('⚠️')) return '#f59e0b'
    return '#ef4444'
  }

  return (
    <section>
      <div className="dashboard-header">
        <h2 className="section-title">🚀 Deployment Status Dashboard</h2>
        <div className="dashboard-meta">
          <span className="meta-item">Last Updated: {architectureAssessment.lastUpdated}</span>
          <span className="meta-item">Maturity: {architectureAssessment.overallMaturity}</span>
          <span className="meta-item">Implementation: {architectureAssessment.implementationStatus}%</span>
        </div>
      </div>

      {/* Overall Progress Bar */}
      <div className="card">
        <h3>Overall Implementation Progress</h3>
        <div className="progress-container">
          <div 
            className="progress-bar" 
            style={{ 
              width: `${architectureAssessment.implementationStatus}%`,
              background: '#10b981'
            }}
          >
            <span className="progress-text">{architectureAssessment.implementationStatus}%</span>
          </div>
        </div>
        <div className="progress-legend">
          <span>0% - Planning</span>
          <span>50% - Development</span>
          <span>75% - Testing</span>
          <span>100% - Production</span>
        </div>
      </div>

      {/* Layer-by-Layer Breakdown */}
      {layers.map((layer) => {
        const components = componentsByLayer[layer] || []
        const completedCount = components.filter((c) => c.status.includes('✅')).length
        const totalCount = components.length
        const layerProgress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

        return (
          <div key={layer} className="card layer-card">
            <div className="layer-header">
              <h3>{layer}</h3>
              <div className="layer-stats">
                <span className="stat">{completedCount}/{totalCount} Components</span>
                <span className="stat">{layerProgress}% Complete</span>
              </div>
            </div>

            <div className="components-grid">
              {components.map((component) => (
                <div 
                  key={component.name} 
                  className="component-card"
                  style={{ borderLeft: `4px solid ${getStatusColor(component.status)}` }}
                >
                  <div className="component-header">
                    <span className="component-status">{getStatusIcon(component.status)}</span>
                    <h4>{component.name}</h4>
                  </div>
                  
                  <p className="component-purpose">{component.purpose}</p>
                  
                  <div className="component-details">
                    <details>
                      <summary>Key Features ({component.keyFeatures.length})</summary>
                      <ul>
                        {component.keyFeatures.map((feature, idx) => (
                          <li key={idx}>{feature}</li>
                        ))}
                      </ul>
                    </details>

                    <details>
                      <summary>Dependencies ({component.dependencies.length})</summary>
                      <ul>
                        {component.dependencies.map((dep, idx) => (
                          <li key={idx}>{dep}</li>
                        ))}
                      </ul>
                    </details>

                    <details>
                      <summary>Security Controls ({component.security.length})</summary>
                      <ul>
                        {component.security.map((sec, idx) => (
                          <li key={idx}>{sec}</li>
                        ))}
                      </ul>
                    </details>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })}

      <div className="card">
        <h3>⚠️ Prioritized Architecture Gaps</h3>
        <ul>
          {highPriorityGaps.map((gap) => (
            <li key={gap.id}>
              <strong>{gap.title}</strong> — {gap.remediation}
            </li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h3>🧭 Near-Term Remediation Plan</h3>
        <ul>
          {architectureAssessment.recommendations.map((recommendation) => (
            <li key={recommendation}>{recommendation}</li>
          ))}
        </ul>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h3>📋 Quick Actions</h3>
        <div className="action-buttons">
          <button onClick={() => window.print()} className="action-btn">
            🖨️ Print Dashboard
          </button>
          <button onClick={() => exportToJSON()} className="action-btn">
            💾 Export Data (JSON)
          </button>
          <button onClick={() => copyToClipboard()} className="action-btn">
            📋 Copy Status Summary
          </button>
        </div>
      </div>

      <style>{`
        .dashboard-header {
          margin-bottom: 2rem;
        }
        
        .dashboard-meta {
          display: flex;
          gap: 2rem;
          margin-top: 0.5rem;
          font-size: 0.9rem;
          color: #6b7280;
        }

        .meta-item {
          padding: 0.25rem 0.75rem;
          background: #f3f4f6;
          border-radius: 0.375rem;
        }

        .progress-container {
          width: 100%;
          height: 40px;
          background: #e5e7eb;
          border-radius: 0.5rem;
          overflow: hidden;
          margin: 1rem 0;
        }

        .progress-bar {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding: 0 1rem;
          transition: width 0.3s ease;
        }

        .progress-text {
          color: white;
          font-weight: 600;
          font-size: 1.1rem;
        }

        .progress-legend {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          color: #6b7280;
          margin-top: 0.5rem;
        }

        .layer-card {
          margin-bottom: 2rem;
        }

        .layer-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid #e5e7eb;
        }

        .layer-stats {
          display: flex;
          gap: 1.5rem;
        }

        .stat {
          padding: 0.375rem 1rem;
          background: #f9fafb;
          border-radius: 0.375rem;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .components-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 1.5rem;
        }

        .component-card {
          background: #f9fafb;
          padding: 1.25rem;
          border-radius: 0.5rem;
          transition: all 0.2s ease;
        }

        .component-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
        }

        .component-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }

        .component-status {
          font-size: 1.5rem;
        }

        .component-header h4 {
          margin: 0;
          font-size: 1rem;
          color: #111827;
        }

        .component-purpose {
          color: #4b5563;
          font-size: 0.875rem;
          margin-bottom: 1rem;
          line-height: 1.5;
        }

        .component-details details {
          margin-bottom: 0.5rem;
        }

        .component-details summary {
          cursor: pointer;
          font-weight: 500;
          color: #374151;
          padding: 0.5rem;
          background: white;
          border-radius: 0.25rem;
          transition: background 0.2s ease;
        }

        .component-details summary:hover {
          background: #f3f4f6;
        }

        .component-details ul {
          margin: 0.5rem 0 0 0;
          padding-left: 1.5rem;
        }

        .component-details li {
          font-size: 0.8rem;
          color: #6b7280;
          margin-bottom: 0.25rem;
        }

        .action-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .action-btn {
          padding: 0.75rem 1.5rem;
          background: #3b82f6;
          color: white;
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          font-weight: 500;
          transition: background 0.2s ease;
        }

        .action-btn:hover {
          background: #2563eb;
        }

        @media print {
          .action-buttons {
            display: none;
          }
        }
      `}</style>
    </section>
  )
}

function exportToJSON() {
  const data = {
    components: componentDetails,
    assessment: architectureAssessment
  }
  const dataStr = JSON.stringify(data, null, 2)
  const dataBlob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(dataBlob)
  const link = document.createElement('a')
  link.href = url
  link.download = `platform-deployment-${new Date().toISOString().split('T')[0]}.json`
  link.click()
}

function copyToClipboard() {
  const summary = `
Platform Deployment Status
==========================
Maturity: ${architectureAssessment.overallMaturity}
Implementation: ${architectureAssessment.implementationStatus}%
Last Updated: ${architectureAssessment.lastUpdated}

Components: ${componentDetails.length}
Production: ${componentDetails.filter(c => c.status.includes('✅')).length}
In Progress: ${componentDetails.filter(c => c.status.includes('⚙️')).length}
Pending: ${componentDetails.filter(c => c.status.includes('❌')).length}
  `.trim()

  navigator.clipboard.writeText(summary)
  alert('Status summary copied to clipboard!')
}
