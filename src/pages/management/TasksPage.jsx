// This tasks page turns task board mock data into a simple kanban-style management view.
import { tasksOverview, taskBoardColumns } from '../../data/tasksData.js'
import { PageHeader } from '../../components/common/PageHeader.jsx'
import { StatusBadge } from '../../components/common/StatusBadge.jsx'
import { SurfaceCard } from '../../components/common/SurfaceCard.jsx'

export const TasksPage = () => {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Execution" title={tasksOverview.title} description={tasksOverview.description} />
      <div className="grid gap-4 xl:grid-cols-3">
        {taskBoardColumns.map((column) => (
          <SurfaceCard key={column.title} className="space-y-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">{column.title}</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">{column.description}</p>
            </div>
            {column.tasks.map((task) => (
              <div key={task.id} className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4">
                <div className="flex items-start justify-between gap-3">
                  <p className="font-semibold text-white">{task.title}</p>
                  <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-sky-500/12 text-xs font-semibold text-sky-300">{task.owner}</div>
                </div>
                <div className="mt-4 inline-flex">
                  <StatusBadge value={task.priority} />
                </div>
              </div>
            ))}
          </SurfaceCard>
        ))}
      </div>
    </div>
  )
}

