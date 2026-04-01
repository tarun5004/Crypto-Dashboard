// This analytics page composes reusable cards, charts, and tables from analytics mock data.
import { analyticsCampaigns, analyticsOverview, analyticsProjectColumns, analyticsProjectRows, analyticsRevenueSeries, analyticsStats, analyticsTrafficSegments } from '../../data/analyticsData.js'
import { Button } from '../../components/common/Button.jsx'
import { DataTable } from '../../components/common/DataTable.jsx'
import { PageHeader } from '../../components/common/PageHeader.jsx'
import { StatCard } from '../../components/common/StatCard.jsx'
import { SurfaceCard } from '../../components/common/SurfaceCard.jsx'
import { DonutChart } from '../../components/charts/DonutChart.jsx'
import { LineChart } from '../../components/charts/LineChart.jsx'

export const AnalyticsPage = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Performance"
        title={analyticsOverview.title}
        description={analyticsOverview.description}
        actions={
          <>
            <Button variant="secondary">Invite a Friend</Button>
            <Button>New Project</Button>
          </>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {analyticsStats.map((item) => (
          <StatCard key={item.label} item={item} money={item.label === 'Earnings'} />
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.6fr_0.9fr]">
        <SurfaceCard className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Recent movement</p>
              <h2 className="mt-2 text-xl font-semibold text-white">Revenue trend</h2>
            </div>
            <Button variant="secondary">Monthly</Button>
          </div>
          <LineChart series={analyticsRevenueSeries} />
        </SurfaceCard>

        <SurfaceCard className="space-y-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Traffic split</p>
            <h2 className="mt-2 text-xl font-semibold text-white">Audience mix</h2>
          </div>
          <DonutChart segments={analyticsTrafficSegments} />
        </SurfaceCard>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.35fr_0.9fr]">
        <SurfaceCard>
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Latest projects</p>
              <h2 className="mt-2 text-xl font-semibold text-white">Delivery health</h2>
            </div>
            <Button variant="ghost" icon="arrowRight">View all</Button>
          </div>
          <DataTable columns={analyticsProjectColumns} rows={analyticsProjectRows} />
        </SurfaceCard>

        <SurfaceCard className="space-y-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Campaign focus</p>
            <h2 className="mt-2 text-xl font-semibold text-white">Top movers</h2>
          </div>
          {analyticsCampaigns.map((campaign) => (
            <div key={campaign.title} className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4">
              <p className="text-sm font-semibold text-white">{campaign.title}</p>
              <div className="mt-3 flex items-end justify-between gap-3">
                <span className="text-2xl font-semibold text-white">{campaign.value}</span>
                <span className={`text-sm font-semibold ${campaign.change.startsWith('-') ? 'text-rose-300' : 'text-emerald-300'}`}>{campaign.change}</span>
              </div>
            </div>
          ))}
        </SurfaceCard>
      </div>
    </div>
  )
}
