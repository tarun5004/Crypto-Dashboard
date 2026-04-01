export const tasksOverview = {
  title: 'Tasks',
  description: 'Organize backlog, active work, and completed deliverables in a single operational board.',
}

export const taskBoardColumns = [
  {
    title: 'Backlog',
    description: 'Upcoming work that needs sizing and prioritization.',
    tasks: [
      { id: 't1', title: 'Refresh onboarding copy', owner: 'CH', priority: 'Low' },
      { id: 't2', title: 'Audit dashboard empty states', owner: 'VM', priority: 'Medium' },
      { id: 't3', title: 'Review plan card spacing', owner: 'AR', priority: 'High' },
    ],
  },
  {
    title: 'In Progress',
    description: 'Current work actively moving through design or delivery.',
    tasks: [
      { id: 't4', title: 'Polish sidebar mobile transition', owner: 'CM', priority: 'High' },
      { id: 't5', title: 'Sync price chart tooltips', owner: 'WH', priority: 'Medium' },
      { id: 't6', title: 'Tune profile activity layout', owner: 'LT', priority: 'Low' },
    ],
  },
  {
    title: 'Completed',
    description: 'Finished items ready for review and retrospective notes.',
    tasks: [
      { id: 't7', title: 'Ship reusable stat cards', owner: 'CH', priority: 'Done' },
      { id: 't8', title: 'Create plan pricing FAQs', owner: 'AR', priority: 'Done' },
      { id: 't9', title: 'Mock order table states', owner: 'VM', priority: 'Done' },
    ],
  },
]

