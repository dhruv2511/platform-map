'use client'

import { motion } from 'framer-motion'
import { FiCheck, FiClock, FiAlertCircle } from 'react-icons/fi'
import { useDashboardStore } from '../../store/dashboardStore'
import type { Milestone } from '../../data/platformData'

interface InteractiveMilestoneTimelineProps {
  milestones: Milestone[]
}

export function InteractiveMilestoneTimeline({ milestones }: InteractiveMilestoneTimelineProps) {
  const { expandedMilestones, toggleMilestone } = useDashboardStore()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  }

  const getStatusIcon = (status: string) => {
    if (status.includes('Complete')) {
      return <FiCheck className="milestone-status-icon complete" size={24} />
    } else if (status.includes('Progress')) {
      return <FiClock className="milestone-status-icon progress" size={24} />
    }
    return <FiAlertCircle className="milestone-status-icon pending" size={24} />
  }

  return (
    <motion.div
      className="interactive-timeline"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="timeline-connector" />
      {milestones.map((milestone) => {
        const isExpanded = expandedMilestones.has(milestone.number)
        const isComplete = milestone.status.includes('Complete')

        return (
          <motion.div
            key={milestone.number}
            className="timeline-item-wrapper"
            variants={itemVariants}
          >
            <motion.button
              className={`timeline-item-button ${isComplete ? 'complete' : 'progress'}`}
              onClick={() => toggleMilestone(milestone.number)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="timeline-item-header">
                <div className="timeline-dot" />
                <div className="timeline-dot-inner">
                  {getStatusIcon(milestone.status)}
                </div>
                <div className="timeline-content">
                  <h4 className="timeline-title">M{milestone.number}: {milestone.title}</h4>
                  <p className="timeline-status">{milestone.status}</p>
                </div>
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="timeline-chevron"
                >
                  ▼
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: isExpanded ? 1 : 0, height: isExpanded ? 'auto' : 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="timeline-details"
              >
                <p>{milestone.description}</p>
                <div className="features-summary">
                  {milestone.features.slice(0, 3).map((feature) => (
                    <span key={feature} className="feature-tag">
                      {feature}
                    </span>
                  ))}
                  {milestone.features.length > 3 && (
                    <span className="feature-tag more">
                      +{milestone.features.length - 3} more
                    </span>
                  )}
                </div>
              </motion.div>
            </motion.button>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
