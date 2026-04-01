// This pricing page renders tier cards and FAQ content from static pricing mock data.
import { pricingFaq, pricingOverview, pricingPlans } from '../../data/pricingData.js'
import { Button } from '../../components/common/Button.jsx'
import { PageHeader } from '../../components/common/PageHeader.jsx'
import { SurfaceCard } from '../../components/common/SurfaceCard.jsx'

export const PricingPage = () => {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Billing" title={pricingOverview.title} description={pricingOverview.description} />
      <div className="grid gap-4 xl:grid-cols-3">
        {pricingPlans.map((plan) => (
          <SurfaceCard key={plan.name} className={`${plan.featured ? 'border-sky-400/30 bg-sky-500/10' : ''}`}>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">{plan.name}</p>
                <div className="mt-3 flex items-end gap-1">
                  <p className="text-5xl font-semibold text-white">{plan.price}</p>
                  <span className="pb-1 text-sm text-slate-400">/mo</span>
                </div>
              </div>
              <p className="text-sm leading-6 text-slate-400">{plan.description}</p>
              <div className="space-y-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="rounded-2xl bg-white/[0.03] px-4 py-3 text-sm text-slate-200">{feature}</div>
                ))}
              </div>
              <Button variant={plan.featured ? 'primary' : 'secondary'} className="w-full">{plan.cta}</Button>
            </div>
          </SurfaceCard>
        ))}
      </div>
      <SurfaceCard className="space-y-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Support</p>
          <h2 className="mt-2 text-xl font-semibold text-white">Frequently asked questions</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {pricingFaq.map((item) => (
            <div key={item.question} className="rounded-[24px] border border-white/8 bg-white/[0.03] p-5">
              <p className="font-semibold text-white">{item.question}</p>
              <p className="mt-3 text-sm leading-6 text-slate-400">{item.answer}</p>
            </div>
          ))}
        </div>
      </SurfaceCard>
    </div>
  )
}

