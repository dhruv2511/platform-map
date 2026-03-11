'use client'

import { useState } from 'react'
import {
  prerequisitesData,
  prerequisiteStats,
  prerequisiteCategories,
} from '../data/prerequisitesData'

export default function PrerequisitesTracker() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [selectedStatus, setSelectedStatus] = useState<string>('All')
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  const filteredItems = prerequisitesData.filter(item => {
    const categoryMatch = selectedCategory === 'All' || item.category === selectedCategory
    const statusMatch = selectedStatus === 'All' || item.status === selectedStatus
    return categoryMatch && statusMatch
  })

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedItems(newExpanded)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'complete':
        return '✅'
      case 'in-progress':
        return '⚙️'
      case 'pending':
        return '⏸️'
      case 'blocked':
        return '🚫'
      default:
        return '❓'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete':
        return '#10b981'
      case 'in-progress':
        return '#f59e0b'
      case 'pending':
        return '#6b7280'
      case 'blocked':
        return '#ef4444'
      default:
        return '#9ca3af'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return '#dc2626'
      case 'high':
        return '#f97316'
      case 'medium':
        return '#3b82f6'
      case 'low':
        return '#6b7280'
      default:
        return '#9ca3af'
    }
  }

  const exportToJSON = () => {
    const dataStr = JSON.stringify(
      {
        metadata: {
          exportDate: new Date().toISOString(),
          totalItems: prerequisitesData.length,
          stats: prerequisiteStats,
        },
        prerequisites: prerequisitesData,
      },
      null,
      2
    )
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)
    const exportFileDefaultName = `prerequisites-${new Date().toISOString().split('T')[0]}.json`

    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  const exportToCSV = () => {
    const headers = ['ID', 'Category', 'Item', 'Status', 'Owner', 'Priority', 'Due Date', 'Est. Hours', 'Notes']
    const rows = prerequisitesData.map(item => [
      item.id,
      item.category,
      item.item,
      item.status,
      item.owner,
      item.priority,
      item.dueDate || 'N/A',
      item.estimatedHours?.toString() || 'N/A',
      item.notes?.replace(/"/g, '""') || '',
    ])

    const csvContent =
      headers.join(',') +
      '\n' +
      rows.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n')

    const dataUri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent)
    const exportFileDefaultName = `prerequisites-${new Date().toISOString().split('T')[0]}.csv`

    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  const copyPowerPointSummary = () => {
    const summary = `
AWS-Databricks Platform Prerequisites Summary
Generated: ${new Date().toLocaleDateString()}

Overall Progress: ${prerequisiteStats.completionPercentage}% Complete
- ✅ Complete: ${prerequisiteStats.complete}
- ⚙️ In Progress: ${prerequisiteStats.inProgress}
- ⏸️ Pending: ${prerequisiteStats.pending}
- 🚫 Blocked: ${prerequisiteStats.blocked}

Breakdown by Category:
${prerequisiteCategories
  .map(cat => {
    const items = prerequisitesData.filter(p => p.category === cat)
    const complete = items.filter(p => p.status === 'complete').length
    const total = items.length
    const pct = Math.round((complete / total) * 100)
    return `${cat}: ${complete}/${total} (${pct}%)`
  })
  .join('\n')}

Critical Items Pending:
${prerequisitesData
  .filter(p => p.priority === 'critical' && p.status !== 'complete')
  .map(p => `- ${p.item} (${p.category}) - Owner: ${p.owner}`)
  .join('\n')}

Next Steps:
${prerequisitesData
  .filter(p => p.status === 'in-progress')
  .slice(0, 5)
  .map(p => `- ${p.item} (${p.owner})`)
  .join('\n')}
    `.trim()

    navigator.clipboard.writeText(summary).then(() => {
      alert('Summary copied to clipboard! Ready to paste into PowerPoint.')
    })
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Prerequisites Tracker</h1>
        <div style={styles.subtitle}>
          Track deployment prerequisites across all platform components
        </div>
      </div>

      <div style={styles.statsBar}>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{prerequisiteStats.completionPercentage}%</div>
          <div style={styles.statLabel}>Complete</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{prerequisiteStats.complete}</div>
          <div style={styles.statLabel}>✅ Done</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{prerequisiteStats.inProgress}</div>
          <div style={styles.statLabel}>⚙️ In Progress</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{prerequisiteStats.pending}</div>
          <div style={styles.statLabel}>⏸️ Pending</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{prerequisiteStats.critical}</div>
          <div style={styles.statLabel}>🔴 Critical</div>
        </div>
      </div>

      <div style={styles.progressBarContainer}>
        <div style={styles.progressBar}>
          <div
            style={{
              ...styles.progressFill,
              width: `${prerequisiteStats.completionPercentage}%`,
            }}
          />
        </div>
        <div style={styles.progressText}>
          {prerequisiteStats.complete} of {prerequisiteStats.total} items complete
        </div>
      </div>

      <div style={styles.controls}>
        <div style={styles.filters}>
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            style={styles.select}
          >
            <option value="All">All Categories</option>
            {prerequisiteCategories.map(cat => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={e => setSelectedStatus(e.target.value)}
            style={styles.select}
          >
            <option value="All">All Statuses</option>
            <option value="complete">✅ Complete</option>
            <option value="in-progress">⚙️ In Progress</option>
            <option value="pending">⏸️ Pending</option>
            <option value="blocked">🚫 Blocked</option>
          </select>
        </div>

        <div style={styles.actions}>
          <button onClick={copyPowerPointSummary} style={styles.button}>
            📊 Copy for PowerPoint
          </button>
          <button onClick={exportToCSV} style={styles.button}>
            📄 Export CSV
          </button>
          <button onClick={exportToJSON} style={styles.button}>
            💾 Export JSON
          </button>
          <button onClick={() => window.print()} style={styles.button}>
            🖨️ Print
          </button>
        </div>
      </div>

      <div style={styles.categoryBreakdown}>
        {prerequisiteCategories.map(category => {
          const categoryItems = prerequisitesData.filter(p => p.category === category)
          const completeCount = categoryItems.filter(p => p.status === 'complete').length
          const totalCount = categoryItems.length
          const percentage = Math.round((completeCount / totalCount) * 100)

          return (
            <div key={category} style={styles.categoryCard}>
              <div style={styles.categoryHeader}>
                <span style={styles.categoryName}>{category}</span>
                <span style={styles.categoryStats}>
                  {completeCount}/{totalCount} ({percentage}%)
                </span>
              </div>
              <div style={styles.categoryProgressBar}>
                <div
                  style={{
                    ...styles.categoryProgressFill,
                    width: `${percentage}%`,
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>

      <div style={styles.itemsContainer}>
        {filteredItems.length === 0 ? (
          <div style={styles.emptyState}>
            No prerequisites match the current filters.
          </div>
        ) : (
          filteredItems.map(item => {
            const isExpanded = expandedItems.has(item.id)
            return (
              <div key={item.id} style={styles.itemCard}>
                <div
                  style={styles.itemHeader}
                  onClick={() => toggleExpand(item.id)}
                >
                  <div style={styles.itemMain}>
                    <span style={styles.statusIcon}>{getStatusIcon(item.status)}</span>
                    <div style={styles.itemInfo}>
                      <div style={styles.itemTitle}>{item.item}</div>
                      <div style={styles.itemMeta}>
                        <span style={styles.metaItem}>{item.category}</span>
                        <span style={styles.metaSeparator}>•</span>
                        <span style={styles.metaItem}>{item.owner}</span>
                        <span style={styles.metaSeparator}>•</span>
                        <span
                          style={{
                            ...styles.priorityBadge,
                            backgroundColor: getPriorityColor(item.priority) + '20',
                            color: getPriorityColor(item.priority),
                          }}
                        >
                          {item.priority.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      ...styles.statusBadge,
                      backgroundColor: getStatusColor(item.status) + '20',
                      color: getStatusColor(item.status),
                    }}
                  >
                    {item.status.replace('-', ' ').toUpperCase()}
                  </div>
                </div>

                {isExpanded && (
                  <div style={styles.itemDetails}>
                    {item.notes && (
                      <div style={styles.detailSection}>
                        <strong>Notes:</strong> {item.notes}
                      </div>
                    )}
                    {item.dependencies && item.dependencies.length > 0 && (
                      <div style={styles.detailSection}>
                        <strong>Dependencies:</strong> {item.dependencies.join(', ')}
                      </div>
                    )}
                    {item.estimatedHours && (
                      <div style={styles.detailSection}>
                        <strong>Estimated Hours:</strong> {item.estimatedHours}h
                      </div>
                    )}
                    {item.dueDate && (
                      <div style={styles.detailSection}>
                        <strong>Due Date:</strong> {item.dueDate}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '2rem',
    maxWidth: '1400px',
    margin: '0 auto',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  header: {
    marginBottom: '2rem',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '0.5rem',
  },
  subtitle: {
    fontSize: '1rem',
    color: '#6b7280',
  },
  statsBar: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem',
  },
  statCard: {
    backgroundColor: '#f9fafb',
    padding: '1.5rem',
    borderRadius: '8px',
    textAlign: 'center',
    border: '1px solid #e5e7eb',
  },
  statValue: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '0.25rem',
  },
  statLabel: {
    fontSize: '0.875rem',
    color: '#6b7280',
  },
  progressBarContainer: {
    marginBottom: '2rem',
  },
  progressBar: {
    width: '100%',
    height: '30px',
    backgroundColor: '#e5e7eb',
    borderRadius: '15px',
    overflow: 'hidden',
    marginBottom: '0.5rem',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10b981',
    transition: 'width 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  progressText: {
    textAlign: 'center',
    color: '#6b7280',
    fontSize: '0.875rem',
  },
  controls: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  filters: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  select: {
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    border: '1px solid #d1d5db',
    backgroundColor: 'white',
    fontSize: '0.875rem',
    cursor: 'pointer',
  },
  actions: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
  },
  button: {
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    border: '1px solid #d1d5db',
    backgroundColor: 'white',
    fontSize: '0.875rem',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  categoryBreakdown: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem',
  },
  categoryCard: {
    backgroundColor: 'white',
    padding: '1rem',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
  },
  categoryHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.5rem',
  },
  categoryName: {
    fontWeight: '600',
    color: '#1f2937',
    fontSize: '0.875rem',
  },
  categoryStats: {
    fontSize: '0.75rem',
    color: '#6b7280',
  },
  categoryProgressBar: {
    width: '100%',
    height: '8px',
    backgroundColor: '#e5e7eb',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  categoryProgressFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
    transition: 'width 0.3s ease',
  },
  itemsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  emptyState: {
    textAlign: 'center',
    padding: '4rem 2rem',
    color: '#9ca3af',
    fontSize: '1rem',
  },
  itemCard: {
    backgroundColor: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    overflow: 'hidden',
    transition: 'box-shadow 0.2s',
    cursor: 'pointer',
  },
  itemHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    gap: '1rem',
  },
  itemMain: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1rem',
    flex: 1,
  },
  statusIcon: {
    fontSize: '1.5rem',
    flexShrink: 0,
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '0.5rem',
  },
  itemMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.75rem',
    color: '#6b7280',
    flexWrap: 'wrap',
  },
  metaItem: {},
  metaSeparator: {
    color: '#d1d5db',
  },
  priorityBadge: {
    padding: '0.125rem 0.5rem',
    borderRadius: '4px',
    fontSize: '0.625rem',
    fontWeight: '600',
  },
  statusBadge: {
    padding: '0.25rem 0.75rem',
    borderRadius: '6px',
    fontSize: '0.75rem',
    fontWeight: '600',
    flexShrink: 0,
  },
  itemDetails: {
    padding: '0 1rem 1rem 4rem',
    borderTop: '1px solid #f3f4f6',
    backgroundColor: '#f9fafb',
  },
  detailSection: {
    marginTop: '0.75rem',
    fontSize: '0.875rem',
    color: '#4b5563',
    lineHeight: '1.5',
  },
}
