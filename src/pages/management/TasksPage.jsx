// This tasks page keeps a persisted advisory workflow board with full CRUD and simple status movement controls.
import { useMemo, useState } from 'react'
import { taskPriorityOptions, taskSeeds, tasksOverview, taskStatusOptions } from '../../data/tasksData.js'
import { useLocalStorageCollection } from '../../hooks/useLocalStorageCollection.js'
import { useModal } from '../../hooks/useModal.js'
import { useToast } from '../../hooks/useToast.js'
import { COLLECTION_KEYS } from '../../utils/schemaVersion.js'
import { formatDate } from '../../utils/formatters.js'
import { validationRules } from '../../utils/validation.js'
import { Button } from '../../components/common/Button.jsx'
import { ConfirmDialog } from '../../components/common/ConfirmDialog.jsx'
import { CrudModal } from '../../components/common/CrudModal.jsx'
import { FilterBar } from '../../components/common/FilterBar.jsx'
import { PageHeader } from '../../components/common/PageHeader.jsx'
import { StatCard } from '../../components/common/StatCard.jsx'
import { StatusBadge } from '../../components/common/StatusBadge.jsx'
import { SurfaceCard } from '../../components/common/SurfaceCard.jsx'

const statusOptions = taskStatusOptions.map((item) => ({ value: item, label: item }))
const priorityOptions = taskPriorityOptions.map((item) => ({ value: item, label: item }))

export const TasksPage = () => {
  const { success } = useToast()
  const taskCollection = useLocalStorageCollection(COLLECTION_KEYS.tasks, taskSeeds, 'task')
  const modal = useModal()
  const deleteModal = useModal()
  const [query, setQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [editingTask, setEditingTask] = useState(null)
  const [deletingTask, setDeletingTask] = useState(null)

  const filteredTasks = useMemo(() => {
    return taskCollection.items.filter((item) => {
      const matchesQuery = [item.title, item.owner, item.priority, item.status].join(' ').toLowerCase().includes(query.toLowerCase())
      const matchesStatus = filterStatus === 'all' || item.status === filterStatus
      return matchesQuery && matchesStatus
    })
  }, [filterStatus, query, taskCollection.items])

  const stats = useMemo(() => {
    return [
      { label: 'Total Tasks', value: taskCollection.items.length, delta: 4.3, icon: 'tasks', subValue: 'Across the advisory board' },
      { label: 'Backlog', value: taskCollection.items.filter((item) => item.status === 'Backlog').length, delta: 1.2, icon: 'analytics', subValue: 'Waiting to start' },
      { label: 'In Progress', value: taskCollection.items.filter((item) => item.status === 'In Progress').length, delta: 3.7, icon: 'pulse', subValue: 'Currently moving' },
      { label: 'Completed', value: taskCollection.items.filter((item) => item.status === 'Completed').length, delta: 5.8, icon: 'check', subValue: 'Closed this cycle' },
    ]
  }, [taskCollection.items])

  const tasksByStatus = useMemo(() => {
    return taskStatusOptions.reduce((accumulator, status) => {
      accumulator[status] = filteredTasks.filter((item) => item.status === status)
      return accumulator
    }, {})
  }, [filteredTasks])

  const saveTask = (values) => {
    const payload = {
      ...values,
      dueDate: new Date(values.dueDate).toISOString(),
    }

    if (editingTask?.id) {
      taskCollection.updateItem(editingTask.id, payload)
      success('Task updated successfully.')
    } else {
      taskCollection.createItem(payload)
      success('Task created successfully.')
    }

    modal.closeModal()
    setEditingTask(null)
  }

  const moveTask = (task, nextStatus) => {
    taskCollection.updateItem(task.id, { status: nextStatus })
    success(`${task.title} moved to ${nextStatus}.`)
  }

  const deleteTask = () => {
    if (!deletingTask) {
      return
    }

    taskCollection.deleteItem(deletingTask.id)
    success('Task removed successfully.')
    deleteModal.closeModal()
    setDeletingTask(null)
  }

  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Execution"
        title={tasksOverview.title}
        description={tasksOverview.description}
        actions={<Button onClick={() => { setEditingTask(null); modal.openModal() }}>Add task</Button>}
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <StatCard key={item.label} item={item} />
        ))}
      </div>

      <SurfaceCard className="space-y-4">
        <FilterBar
          query={query}
          onQueryChange={setQuery}
          filterValue={filterStatus}
          onFilterChange={setFilterStatus}
          filterOptions={[{ value: 'all', label: 'All columns' }, ...statusOptions]}
          addLabel="Add task"
          onAdd={() => { setEditingTask(null); modal.openModal() }}
          resultCount={filteredTasks.length}
        />
        <div className="grid gap-4 xl:grid-cols-3">
          {taskStatusOptions.map((status) => (
            <div key={status} className="rounded-[24px] border border-[var(--border-soft)] bg-white/70 p-4">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)]">{status}</p>
                  <h2 className="mt-1 text-lg font-semibold text-[var(--text-primary)]">{tasksByStatus[status].length} tasks</h2>
                </div>
                <Button variant="secondary" onClick={() => { setEditingTask({ status }); modal.openModal() }}>Add</Button>
              </div>

              <div className="space-y-3">
                {tasksByStatus[status].length ? (
                  tasksByStatus[status].map((task) => (
                    <div key={task.id} className="rounded-[22px] border border-[var(--border-soft)] bg-white p-4 shadow-sm">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold text-[var(--text-primary)]">{task.title}</p>
                          <p className="mt-1 text-xs text-[var(--text-secondary)]">{task.owner} • Due {formatDate(task.dueDate)}</p>
                        </div>
                        <StatusBadge value={task.priority} />
                      </div>
                      <div className="mt-4 grid gap-3">
                        <select
                          value={task.status}
                          onChange={(event) => moveTask(task, event.target.value)}
                          className="w-full rounded-2xl border border-[var(--border-soft)] bg-white px-3 py-2 text-sm text-[var(--text-primary)] outline-none"
                        >
                          {statusOptions.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                          ))}
                        </select>
                        <div className="flex gap-2">
                          <Button className="flex-1" variant="secondary" onClick={() => { setEditingTask(task); modal.openModal() }}>Edit</Button>
                          <Button className="flex-1 bg-rose-500 text-white hover:bg-rose-400" onClick={() => { setDeletingTask(task); deleteModal.openModal() }}>Delete</Button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-[22px] border border-dashed border-[var(--border-soft)] bg-[var(--accent-soft)]/35 p-4 text-sm text-[var(--text-secondary)]">
                    No tasks in this column yet.
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </SurfaceCard>

      <CrudModal
        isOpen={modal.isOpen}
        title={editingTask?.id ? 'Edit task' : 'Add task'}
        description="Maintain advisory work items with owner, due date, priority, and current workflow status."
        fields={[
          { name: 'title', label: 'Task title', rules: validationRules.required('Task title') },
          { name: 'owner', label: 'Owner', rules: validationRules.required('Owner') },
          { name: 'dueDate', label: 'Due date', type: 'date', rules: validationRules.required('Due date') },
          { name: 'priority', label: 'Priority', type: 'select', options: priorityOptions, rules: validationRules.required('Priority') },
          { name: 'status', label: 'Status', type: 'select', options: statusOptions, rules: validationRules.required('Status') },
        ]}
        defaultValues={editingTask?.id ? { ...editingTask, dueDate: editingTask.dueDate.slice(0, 10) } : { title: '', owner: 'Tarun Raj Gaur', dueDate: new Date().toISOString().slice(0, 10), priority: 'Medium', status: editingTask?.status ?? 'Backlog' }}
        onClose={() => {
          modal.closeModal()
          setEditingTask(null)
        }}
        onSubmit={saveTask}
        submitLabel={editingTask?.id ? 'Save task' : 'Create task'}
      />

      <ConfirmDialog
        isOpen={deleteModal.isOpen}
        title="Delete task"
        description={`This will permanently remove ${deletingTask?.title ?? 'this task'} from the workflow board.`}
        onClose={() => {
          deleteModal.closeModal()
          setDeletingTask(null)
        }}
        onConfirm={deleteTask}
      />
    </div>
  )
}
