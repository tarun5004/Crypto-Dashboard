export const tasksOverview = {
  title: 'Tasks',
  description: 'Track advisory tasks, client follow-ups, and product work in a simple persisted workflow board.',
}

export const taskSeeds = [
  { id: 'tsk1', title: 'Review Mumbai SIP escalations', status: 'Backlog', priority: 'High', owner: 'Priya Sharma', dueDate: '2026-04-05T00:00:00.000Z' },
  { id: 'tsk2', title: 'Prepare NIFTY 50 investor deck', status: 'In Progress', priority: 'Medium', owner: 'Rohit Mehta', dueDate: '2026-04-08T00:00:00.000Z' },
  { id: 'tsk3', title: 'Update HNI plan pricing FAQ', status: 'Completed', priority: 'Done', owner: 'Anjali Singh', dueDate: '2026-04-01T00:00:00.000Z' },
  { id: 'tsk4', title: 'Call Pune family office lead', status: 'Backlog', priority: 'Low', owner: 'Sunita Rao', dueDate: '2026-04-09T00:00:00.000Z' },
]

export const taskStatusOptions = ['Backlog', 'In Progress', 'Completed']
export const taskPriorityOptions = ['Low', 'Medium', 'High', 'Done']
