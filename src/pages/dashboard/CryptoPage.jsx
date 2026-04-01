// This crypto page combines market data tables, trend charts, and a React Hook Form trade panel from crypto mock data.
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { cryptoMarketColumns, cryptoMarketRows, cryptoMarketSeries, cryptoOverview, cryptoStats, buyOrders, sellOrders, tradeFormDefaults, tradePairOptions } from '../../data/cryptoData.js'
import { useAppContext } from '../../hooks/useAppContext.js'
import { Button } from '../../components/common/Button.jsx'
import { DataTable } from '../../components/common/DataTable.jsx'
import { FormInput } from '../../components/forms/FormInput.jsx'
import { FormSelect } from '../../components/forms/FormSelect.jsx'
import { PageHeader } from '../../components/common/PageHeader.jsx'
import { StatCard } from '../../components/common/StatCard.jsx'
import { SurfaceCard } from '../../components/common/SurfaceCard.jsx'
import { LineChart } from '../../components/charts/LineChart.jsx'

export const CryptoPage = () => {
  const { selectedCryptoPair, setSelectedCryptoPair } = useAppContext()
  const [tradeMessage, setTradeMessage] = useState('')
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...tradeFormDefaults,
      pair: selectedCryptoPair,
    },
  })

  const watchedPair = watch('pair')

  useEffect(() => {
    if (watchedPair) {
      setSelectedCryptoPair(watchedPair)
    }
  }, [setSelectedCryptoPair, watchedPair])

  const onSubmit = (values) => {
    setTradeMessage(`${values.side === 'buy' ? 'Buy' : 'Sell'} order prepared for ${values.pair} at ${values.amount}.`)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Markets"
        title={cryptoOverview.title}
        description={cryptoOverview.description}
        actions={
          <>
            <Button variant="secondary">Invite a Friend</Button>
            <Button>New Project</Button>
          </>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cryptoStats.map((item) => (
          <StatCard key={item.label} item={item} money compact />
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.45fr_0.95fr]">
        <SurfaceCard className="space-y-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Pair overview</p>
              <h2 className="mt-2 text-xl font-semibold text-white">{selectedCryptoPair}</h2>
            </div>
            <Button variant="secondary">30 days</Button>
          </div>
          <LineChart series={cryptoMarketSeries} strokeColor="#22c55e" fillColor="rgba(34, 197, 94, 0.14)" height={280} />
        </SurfaceCard>

        <SurfaceCard>
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Markets</p>
              <h2 className="mt-2 text-xl font-semibold text-white">Tracked assets</h2>
            </div>
            <Button variant="ghost" icon="arrowRight">Watchlist</Button>
          </div>
          <DataTable columns={cryptoMarketColumns} rows={cryptoMarketRows} />
        </SurfaceCard>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_1fr_0.85fr]">
        <SurfaceCard>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Sell orders</p>
          <div className="mt-4 space-y-3">
            {sellOrders.map((order) => (
              <div key={`${order.price}-${order.amount}`} className="grid grid-cols-3 rounded-2xl bg-white/[0.03] px-4 py-3 text-sm text-slate-300">
                <span>{order.price}</span>
                <span>{order.amount}</span>
                <span className="text-right text-white">{order.total}</span>
              </div>
            ))}
          </div>
        </SurfaceCard>

        <SurfaceCard>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Buy orders</p>
          <div className="mt-4 space-y-3">
            {buyOrders.map((order) => (
              <div key={`${order.price}-${order.amount}`} className="grid grid-cols-3 rounded-2xl bg-white/[0.03] px-4 py-3 text-sm text-slate-300">
                <span>{order.price}</span>
                <span>{order.amount}</span>
                <span className="text-right text-white">{order.total}</span>
              </div>
            ))}
          </div>
        </SurfaceCard>

        <SurfaceCard>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Operations</p>
          <form className="mt-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-3 rounded-2xl bg-white/[0.03] p-2">
              <label className="cursor-pointer">
                <input type="radio" value="buy" className="sr-only" {...register('side')} defaultChecked />
                <span className="block rounded-2xl bg-sky-500 px-4 py-2 text-center text-sm font-semibold text-slate-950">Buy</span>
              </label>
              <label className="cursor-pointer">
                <input type="radio" value="sell" className="sr-only" {...register('side')} />
                <span className="block rounded-2xl bg-white/[0.04] px-4 py-2 text-center text-sm font-semibold text-white">Sell</span>
              </label>
            </div>
            <FormSelect label="Trading pair" name="pair" register={register} options={tradePairOptions} error={errors.pair} rules={{ required: 'Choose a trading pair.' }} />
            <FormInput label="Amount" name="amount" register={register} type="number" step="0.01" error={errors.amount} rules={{ required: 'Enter an amount.', min: { value: 0.01, message: 'Amount must be at least 0.01.' } }} />
            <FormInput label="Price" name="price" register={register} type="number" step="0.01" error={errors.price} rules={{ required: 'Enter a price.', min: { value: 1, message: 'Price must be valid.' } }} />
            <Button className="w-full" type="submit">Process to wallet</Button>
            {tradeMessage ? <p className="rounded-2xl bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">{tradeMessage}</p> : null}
          </form>
        </SurfaceCard>
      </div>
    </div>
  )
}
