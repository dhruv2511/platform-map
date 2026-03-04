import { create } from 'zustand'

interface DashboardState {
  activeSection: string | null
  expandedMilestones: Set<number>
  expandedCards: Set<string>
  filterStatus: 'all' | 'complete' | 'progress'
  toggleSection: (section: string) => void
  toggleMilestone: (number: number) => void
  toggleCard: (cardId: string) => void
  setFilterStatus: (status: 'all' | 'complete' | 'progress') => void
}

export const useDashboardStore = create<DashboardState>((set) => ({
  activeSection: null,
  expandedMilestones: new Set(),
  expandedCards: new Set(),
  filterStatus: 'all',
  toggleSection: (section) =>
    set((state) => ({
      activeSection: state.activeSection === section ? null : section,
    })),
  toggleMilestone: (number) =>
    set((state) => {
      const newSet = new Set(state.expandedMilestones)
      if (newSet.has(number)) {
        newSet.delete(number)
      } else {
        newSet.add(number)
      }
      return { expandedMilestones: newSet }
    }),
  toggleCard: (cardId) =>
    set((state) => {
      const newSet = new Set(state.expandedCards)
      if (newSet.has(cardId)) {
        newSet.delete(cardId)
      } else {
        newSet.add(cardId)
      }
      return { expandedCards: newSet }
    }),
  setFilterStatus: (status) => set({ filterStatus: status }),
}))
