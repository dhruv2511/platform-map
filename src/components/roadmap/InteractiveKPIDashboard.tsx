'use client'

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { motion } from 'framer-motion'

// Mock trend data for KPIs
const awsWafTrend = [
  { date: 'Feb 15', value: 72 },
  { date: 'Feb 18', value: 75 },
  { date: 'Feb 21', value: 79 },
  { date: 'Feb 24', value: 82 },
  { date: 'Mar 18', value: 90 },
]

const databricksWafTrend = [
  { date: 'Feb 15', value: 68 },
  { date: 'Feb 18', value: 71 },
  { date: 'Feb 21', value: 74 },
  { date: 'Feb 24', value: 76 },
  { date: 'Mar 18', value: 89 },
]

const securityTrend = [
  { date: 'Feb 15', value: 85 },
  { date: 'Feb 18', value: 88 },
  { date: 'Feb 21', value: 90 },
  { date: 'Feb 24', value: 92 },
  { date: 'Mar 18', value: 94 },
]

const maturityTrend = [
  { date: 'Feb 15', value: 2.8 },
  { date: 'Feb 18', value: 2.95 },
  { date: 'Feb 21', value: 3.05 },
  { date: 'Feb 24', value: 3.2 },
  { date: 'Mar 18', value: 3.9 },
]

const completionData = [
  { name: 'Complete', value: 45, fill: '#2A9D8F' },
  { name: 'In Progress', value: 25, fill: '#F4A261' },
  { name: 'Pending', value: 10, fill: '#94A3B8' },
]

interface InteractiveKPIProps {
  title: string
  currentValue: string | number
  trend: typeof awsWafTrend
  color: string
}

function InteractiveKPI({ title, currentValue, trend, color }: InteractiveKPIProps) {
  return (
    <motion.div
      className="interactive-kpi-card card-density-primary"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
    >
      <h4 style={{ marginBottom: '12px', color: 'var(--secondary)' }}>{title}</h4>
      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '2rem', fontWeight: '700', color }}>
          {currentValue}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={160}>
        <AreaChart data={trend}>
          <defs>
            <linearGradient id={`color-${title}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
          <XAxis dataKey="date" style={{ fontSize: '0.75rem' }} />
          <YAxis style={{ fontSize: '0.75rem' }} />
          <Tooltip
            contentStyle={{
              background: 'rgba(255, 255, 255, 0.95)',
              border: `1px solid ${color}`,
              borderRadius: '8px',
              padding: '8px',
            }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            fillOpacity={1}
            fill={`url(#color-${title})`}
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  )
}

export function InteractiveKPIDashboard() {
  return (
    <motion.div
      className="interactive-kpi-dashboard"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, staggerChildren: 0.1 }}
    >
      <div className="kpi-grid">
        <InteractiveKPI
          title="AWS WAF Score"
          currentValue="90%"
          trend={awsWafTrend}
          color="#0B6E4F"
        />
        <InteractiveKPI
          title="Databricks WAF"
          currentValue="89%"
          trend={databricksWafTrend}
          color="#1B4965"
        />
        <InteractiveKPI
          title="Security Pillar"
          currentValue="94%"
          trend={securityTrend}
          color="#F4A261"
        />
        <InteractiveKPI
          title="Platform Maturity"
          currentValue="L3.9"
          trend={maturityTrend}
          color="#2A9D8F"
        />
      </div>

      <motion.div
        className="completion-overview card-density-primary"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <h4 style={{ marginBottom: '20px', color: 'var(--secondary)' }}>
          Implementation Status Overview
        </h4>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={completionData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value, percent }) => {
                const percentage = percent ? (percent * 100).toFixed(0) : '0'
                return (
                  <text x="0" y="0" fill="var(--ink)" fontSize={12} fontWeight={600}>
                    {name}: {value} ({percentage}%)
                  </text>
                )
              }}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {completionData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => `${value} items`}
              contentStyle={{
                background: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>
    </motion.div>
  )
}
