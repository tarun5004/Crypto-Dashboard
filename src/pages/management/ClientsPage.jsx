// This clients page reuses the table and card system to present account records and a spotlight panel.
import { clientActivity, clientColumns, clientRows, clientsOverview, spotlightClient } from '../../data/clientsData.js'
import { Avatar } from '../../components/common/Avatar.jsx'
import { DataTable } from '../../components/common/DataTable.jsx'
import { PageHeader } from '../../components/common/PageHeader.jsx'
import { StatusBadge } from '../../components/common/StatusBadge.jsx'
import { SurfaceCard } from '../../components/common/SurfaceCard.jsx'

export const ClientsPage = () => {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Accounts" title={clientsOverview.title} description={clientsOverview.description} />
      <div className="grid gap-4 xl:grid-cols-[1.35fr_0.85fr]">
        <SurfaceCard>
          <div className="mb-4">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Clients</p>
            <h2 className="mt-2 text-xl font-semibold text-white">Account directory</h2>
          </div>
          <DataTable columns={clientColumns} rows={clientRows} />
        </SurfaceCard>

        <SurfaceCard className="space-y-5">
          <div className="flex items-start gap-4">
            <Avatar initials={spotlightClient.initials} size="xl" accent />
            <div>
              <p className="text-xl font-semibold text-white">{spotlightClient.name}</p>
              <p className="mt-1 text-sm text-slate-400">{spotlightClient.company}</p>
              <div className="mt-3 inline-flex">
                <StatusBadge value={spotlightClient.status} />
              </div>
            </div>
          </div>
          <p className="text-sm leading-6 text-slate-400">{spotlightClient.about}</p>
          <div className="space-y-3 rounded-[24px] bg-white/[0.03] p-4">
            <div className="flex items-center justify-between text-sm"><span className="text-slate-400">Email</span><span className="text-white">{spotlightClient.email}</span></div>
            <div className="flex items-center justify-between text-sm"><span className="text-slate-400">Phone</span><span className="text-white">{spotlightClient.phone}</span></div>
          </div>
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Activity</p>
            {clientActivity.map((item) => (
              <div key={item.id} className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-white">{item.title}</p>
                  <span className="text-xs text-slate-500">{item.time}</span>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-400">{item.description}</p>
              </div>
            ))}
          </div>
        </SurfaceCard>
      </div>
    </div>
  )
}

