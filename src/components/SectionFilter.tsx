import { motion } from 'framer-motion'
import { FiFilter } from 'react-icons/fi'
import { useDashboardStore } from '../store/dashboardStore'

export function SectionFilter() {
  const { filterStatus, setFilterStatus } = useDashboardStore()

  const filters = [
    { label: 'All Items', value: 'all' as const },
    { label: 'Complete', value: 'complete' as const },
    { label: 'In Progress', value: 'progress' as const },
  ]

  return (
    <motion.div
      className="section-filter-container"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="filter-label">
        <FiFilter size={18} style={{ marginRight: '8px' }} />
        <span>Filter by Status</span>
      </div>
      <div className="filter-buttons">
        {filters.map((filter) => (
          <motion.button
            key={filter.value}
            className={`filter-button ${filterStatus === filter.value ? 'active' : ''}`}
            onClick={() => setFilterStatus(filter.value)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {filter.label}
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}
