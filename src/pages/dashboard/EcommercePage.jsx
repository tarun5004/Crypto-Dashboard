// This ecommerce page assembles revenue, fulfillment, and product performance widgets from commerce mock data.
import { ecommerceChannelSegments, ecommerceFulfillment, ecommerceOverview, ecommerceProductColumns, ecommerceProductRows, ecommerceRevenueSeries, ecommerceSalesBars, ecommerceStats } from '../../data/ecommerceData.js'
import { BarChart } from '../../components/charts/BarChart.jsx'
import { DonutChart } from '../../components/charts/DonutChart.jsx'
import { LineChart } from '../../components/charts/LineChart.jsx'
import { Button } from '../../components/common/Button.jsx'
import { DataTable } from '../../components/common/DataTable.jsx'
import { PageHeader } from '../../components/common/PageHeader.jsx'
import { StatCard } from '../../components/common/StatCard.jsx'
import { SurfaceCard } from '../../components/common/SurfaceCard.jsx'

export const EcommercePage = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Commerce"
        title={ecommerceOverview.title}
        description={ecommerceOverview.description}
        actions={
          <>
            <Button variant="secondary">Invite a Friend</Button>
            <Button>New Project</Button>
          </>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {ecommerceStats.map((item) => (
          <StatCard key={item.label} item={item} />
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.55fr_0.95fr]">
        <SurfaceCard className="space-y-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Total revenue</p>
            <h2 className="mt-2 text-xl font-semibold text-white">Twelve month revenue</h2>
          </div>
          <LineChart series={ecommerceRevenueSeries} strokeColor="#60a5fa" fillColor="rgba(96, 165, 250, 0.14)" />
        </SurfaceCard>

        <SurfaceCard className="space-y-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Sales by channel</p>
            <h2 className="mt-2 text-xl font-semibold text-white">Revenue mix</h2>
          </div>
          <DonutChart segments={ecommerceChannelSegments} />
        </SurfaceCard>
      </div>

      <div className="grid gap-4 xl:grid-cols-[0.85fr_1.35fr]">
        <SurfaceCard className="space-y-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Sales / Revenue</p>
            <h2 className="mt-2 text-xl font-semibold text-white">Monthly order volume</h2>
          </div>
          <BarChart series={ecommerceSalesBars} />
        </SurfaceCard>

        <SurfaceCard>
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Top selling products</p>
              <h2 className="mt-2 text-xl font-semibold text-white">Best performing offers</h2>
            </div>
            <Button variant="ghost" icon="arrowRight">See catalog</Button>
          </div>
          <DataTable columns={ecommerceProductColumns} rows={ecommerceProductRows} />
        </SurfaceCard>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {ecommerceFulfillment.map((item) => (
          <SurfaceCard key={item.label}>
            <p className="text-sm text-slate-400">{item.label}</p>
            <div className="mt-4 flex items-end justify-between gap-3">
              <p className="text-3xl font-semibold text-white">{item.value}</p>
              <span className={`text-sm font-semibold ${item.trend.startsWith('-') ? 'text-rose-300' : 'text-emerald-300'}`}>{item.trend}</span>
            </div>
          </SurfaceCard>
        ))}
      </div>
    </div>
  )
}

