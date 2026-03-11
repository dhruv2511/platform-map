'use client'

import { useState } from 'react'
import { implementationTasks, identifiedGaps } from '../data/implementationData'
import type { ImplementationTask, IdentifiedGap } from '../data/implementationData'

export function ImplementationTasksPage() {
  const [activeView, setActiveView] = useState<'tasks' | 'gaps'>('tasks')
  const [filterStatus, setFilterStatus] = useState<string>('All')
  const [filterCategory, setFilterCategory] = useState<string>('All')

  // Task statistics
  const completedTasks = implementationTasks.filter(t => t.status === 'Completed').length
  const totalTasks = implementationTasks.length
  const completionRate = Math.round((completedTasks / totalTasks) * 100)

  // Gap statistics
  const addressedGaps = identifiedGaps.filter(g => g.status === 'Addressed').length
  const totalGaps = identifiedGaps.length
  const gapResolutionRate = Math.round((addressedGaps / totalGaps) * 100)

  // Filter tasks
  const filteredTasks = implementationTasks.filter(task => {
    const statusMatch = filterStatus === 'All' || task.status === filterStatus
    const categoryMatch = filterCategory === 'All' || task.category === filterCategory
    return statusMatch && categoryMatch
  })

  // Filter gaps
  const filteredGaps = identifiedGaps.filter(gap => {
    const statusMatch = filterStatus === 'All' || gap.status === filterStatus
    const categoryMatch = filterCategory === 'All' || gap.category === filterCategory
    return statusMatch && categoryMatch
  })

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Completed':
      case 'Addressed':
        return 'status-badge status-completed'
      case 'In Progress':
      case 'Mitigated':
        return 'status-badge status-in-progress'
      case 'Planned':
      case 'Open':
        return 'status-badge status-planned'
      case 'Blocked':
      case 'Accepted':
        return 'status-badge status-blocked'
      default:
        return 'status-badge'
    }
  }

  const getPriorityBadgeClass = (priority: string) => {
    switch (priority) {
      case 'Critical':
        return 'priority-badge priority-critical'
      case 'High':
        return 'priority-badge priority-high'
      case 'Medium':
        return 'priority-badge priority-medium'
      case 'Low':
        return 'priority-badge priority-low'
      default:
        return 'priority-badge'
    }
  }

  const renderTaskCard = (task: ImplementationTask) => (
    <div key={task.id} className="task-card">
      <div className="task-header">
        <div>
          <span className="task-id">{task.id}</span>
          <h4 className="task-title">{task.title}</h4>
        </div>
        <div className="task-badges">
          <span className={getPriorityBadgeClass(task.priority)}>{task.priority}</span>
          <span className={getStatusBadgeClass(task.status)}>{task.status}</span>
        </div>
      </div>
      
      <p className="task-description">{task.description}</p>
      
      <div className="task-metadata">
        <div className="metadata-item">
          <strong>Category:</strong> <span className="category-badge">{task.category}</span>
        </div>
        <div className="metadata-item">
          <strong>Impact:</strong> {task.impact}
        </div>
        {task.completedDate && (
          <div className="metadata-item">
            <strong>Completed:</strong> {task.completedDate}
          </div>
        )}
        {task.filesModified && task.filesModified.length > 0 && (
          <div className="metadata-item">
            <strong>Files Modified:</strong>
            <ul className="file-list">
              {task.filesModified.map((file, idx) => (
                <li key={idx}><code>{file}</code></li>
              ))}
            </ul>
          </div>
        )}
        {task.relatedGap && (
          <div className="metadata-item">
            <strong>Related Gap:</strong> <span className="related-tag">{task.relatedGap}</span>
          </div>
        )}
      </div>
    </div>
  )

  const renderGapCard = (gap: IdentifiedGap) => (
    <div key={gap.id} className="task-card gap-card">
      <div className="task-header">
        <div>
          <span className="task-id">{gap.id}</span>
          <h4 className="task-title">{gap.title}</h4>
        </div>
        <div className="task-badges">
          <span className={getPriorityBadgeClass(gap.priority)}>{gap.priority}</span>
          <span className={getStatusBadgeClass(gap.status)}>{gap.status}</span>
        </div>
      </div>
      
      <div className="gap-states">
        <div className="state-block">
          <strong>Current State:</strong>
          <p>{gap.currentState}</p>
        </div>
        <div className="state-arrow">→</div>
        <div className="state-block">
          <strong>Target State:</strong>
          <p>{gap.targetState}</p>
        </div>
      </div>
      
      <div className="task-metadata">
        <div className="metadata-item">
          <strong>Category:</strong> <span className="category-badge">{gap.category}</span>
        </div>
        <div className="metadata-item">
          <strong>Impact:</strong> {gap.impact}
        </div>
        {gap.relatedTasks.length > 0 && (
          <div className="metadata-item">
            <strong>Related Tasks:</strong>
            <div className="related-tags">
              {gap.relatedTasks.map((taskId) => (
                <span key={taskId} className="related-tag">{taskId}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <section className="implementation-section">
      <h2 className="section-title">🔧 Implementation Progress</h2>
      
      {/* Statistics */}
      <div className="kpi-row">
        <div className="kpi kpi-success">
          Tasks Completed
          <strong>{completedTasks} / {totalTasks}</strong>
          <small>{completionRate}%</small>
        </div>
        <div className="kpi kpi-info">
          Gaps Addressed
          <strong>{addressedGaps} / {totalGaps}</strong>
          <small>{gapResolutionRate}%</small>
        </div>
        <div className="kpi kpi-warning">
          Critical Items
          <strong>{implementationTasks.filter(t => t.priority === 'Critical').length}</strong>
          <small>{implementationTasks.filter(t => t.priority === 'Critical' && t.status === 'Completed').length} done</small>
        </div>
        <div className="kpi">
          Files Modified
          <strong>{new Set(implementationTasks.flatMap(t => t.filesModified || [])).size}</strong>
          <small>unique files</small>
        </div>
      </div>

      {/* View Toggle */}
      <div className="view-toggle">
        <button
          className={`toggle-btn ${activeView === 'tasks' ? 'active' : ''}`}
          onClick={() => setActiveView('tasks')}
        >
          📋 Tasks ({implementationTasks.length})
        </button>
        <button
          className={`toggle-btn ${activeView === 'gaps' ? 'active' : ''}`}
          onClick={() => setActiveView('gaps')}
        >
          🔍 Identified Gaps ({identifiedGaps.length})
        </button>
      </div>

      {/* Filters */}
      <div className="filters">
        <div className="filter-group">
          <label>Status:</label>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="All">All</option>
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
            <option value="Planned">Planned</option>
            <option value="Blocked">Blocked</option>
            {activeView === 'gaps' && (
              <>
                <option value="Addressed">Addressed</option>
                <option value="Mitigated">Mitigated</option>
                <option value="Open">Open</option>
                <option value="Accepted">Accepted</option>
              </>
            )}
          </select>
        </div>
        <div className="filter-group">
          <label>Category:</label>
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
            <option value="All">All</option>
            <option value="Security">Security</option>
            <option value="Operations">Operations</option>
            <option value="Infrastructure">Infrastructure</option>
            <option value="Cost Optimization">Cost Optimization</option>
            <option value="Compliance">Compliance</option>
            {activeView === 'gaps' && (
              <>
                <option value="Cost">Cost</option>
                <option value="Reliability">Reliability</option>
                <option value="Performance">Performance</option>
              </>
            )}
          </select>
        </div>
      </div>

      {/* Task or Gap Cards */}
      <div className="tasks-grid">
        {activeView === 'tasks'
          ? filteredTasks.map(renderTaskCard)
          : filteredGaps.map(renderGapCard)}
      </div>

      {(activeView === 'tasks' && filteredTasks.length === 0) ||
       (activeView === 'gaps' && filteredGaps.length === 0) ? (
        <div className="no-results">
          <p>No {activeView} found matching the selected filters.</p>
        </div>
      ) : null}
    </section>
  )
}
