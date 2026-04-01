// This orders page presents fulfillment highlights and payment records through reusable summary cards and tables.
import { orderColumns, orderHighlights, orderRows, ordersOverview } from '../../data/ordersData.js'
import { DataTable } from '../../components/common/DataTable.jsx'
import { PageHeader } from '../../components/common/PageHeader.jsx'
import { SurfaceCard } from '../../components/common/SurfaceCard.jsx'

export const OrdersPage = () => {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Fulfillment" title={ordersOverview.title} description={ordersOverview.description} />
      <div className="grid gap-4 md:grid-cols-3">
        {orderHighlights.map((item) => (
          <SurfaceCard key={item.label}>
            <p className="text-sm text-slate-400">{item.label}</p>
            <div className="mt-4 flex items-end justify-between gap-3">
              <p className="text-3xl font-semibold text-white">{item.value}</p>
              <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${item.tone === 'danger' ? 'bg-rose-500/15 text-rose-300' : item.tone === 'warning' ? 'bg-amber-500/15 text-amber-300' : 'bg-emerald-500/15 text-emerald-300'}`}>{item.tone}</span>
            </div>
          </SurfaceCard>
        ))}
      </div>
      <SurfaceCard>
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Orders</p>
            <h2 className="mt-2 text-xl font-semibold text-white">Recent billing activity</h2>
          </div>
          <span className="rounded-full bg-white/[0.05] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">15 entries</span>
        </div>
        <DataTable columns={orderColumns} rows={orderRows} />
      </SurfaceCard>
    </div>
  )
}

