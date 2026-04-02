// This markets page persists watchlist and order records, while the trade panel creates market orders against simulated INR prices.
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { cryptoOverview, marketOrderSeeds, tradeFormDefaults, tradePairOptions, watchlistSeeds } from '../../data/cryptoData.js'
import { useAppContext } from '../../hooks/useAppContext.js'
import { useLocalStorageCollection } from '../../hooks/useLocalStorageCollection.js'
import { useMockRefresh } from '../../hooks/useMockRefresh.js'
import { useModal } from '../../hooks/useModal.js'
import { useToast } from '../../hooks/useToast.js'
import { COLLECTION_KEYS } from '../../utils/schemaVersion.js'
import { formatCompactNumber, formatCurrency, formatPercent } from '../../utils/formatters.js'
import { validationRules } from '../../utils/validation.js'
import { LineChart } from '../../components/charts/LineChart.jsx'
import { Button } from '../../components/common/Button.jsx'
import { CollectionView } from '../../components/common/CollectionView.jsx'
import { ConfirmDialog } from '../../components/common/ConfirmDialog.jsx'
import { CrudModal } from '../../components/common/CrudModal.jsx'
import { FilterBar } from '../../components/common/FilterBar.jsx'
import { PageHeader } from '../../components/common/PageHeader.jsx'
import { StatCard } from '../../components/common/StatCard.jsx'
import { SurfaceCard } from '../../components/common/SurfaceCard.jsx'
import { FormInput } from '../../components/forms/FormInput.jsx'
import { FormSelect } from '../../components/forms/FormSelect.jsx'

const watchlistFilterOptions = [
  { value: 'all', label: 'All sectors' },
  { value: 'Energy', label: 'Energy' },
  { value: 'IT Services', label: 'IT Services' },
  { value: 'Banking & Finance', label: 'Banking & Finance' },
  { value: 'Pharma', label: 'Pharma' },
]
const orderStatusOptions = [
  { value: 'all', label: 'All statuses' },
  { value: 'Open', label: 'Open' },
  { value: 'Executed', label: 'Executed' },
  { value: 'Cancelled', label: 'Cancelled' },
]
const sideOptions = [
  { value: 'Buy', label: 'Buy' },
  { value: 'Sell', label: 'Sell' },
]
const sectorOptions = watchlistFilterOptions.filter((item) => item.value !== 'all')
const chartLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const buildChartSeries = (basePrice, dayChange) => {
  const movement = Number(dayChange || 0) / 100
  return chartLabels.map((label, index) => {
    const swing = 1 + movement * ((index - 3) / 3.5)
    return {
      label,
      value: Number((basePrice * swing).toFixed(2)),
    }
  })
}

export const CryptoPage = () => {
  const { selectedCryptoPair, setSelectedCryptoPair } = useAppContext()
  const { success } = useToast()
  const watchlistCollection = useLocalStorageCollection(COLLECTION_KEYS.watchlist, watchlistSeeds, 'market')
  const orderCollection = useLocalStorageCollection(COLLECTION_KEYS.marketOrders, marketOrderSeeds, 'order')
  const watchlistModal = useModal()
  const orderModal = useModal()
  const deleteModal = useModal()
  const [watchlistQuery, setWatchlistQuery] = useState('')
  const [sectorFilter, setSectorFilter] = useState('all')
  const [orderQuery, setOrderQuery] = useState('')
  const [orderStatusFilter, setOrderStatusFilter] = useState('all')
  const [editingWatchlistItem, setEditingWatchlistItem] = useState(null)
  const [editingOrderItem, setEditingOrderItem] = useState(null)
  const [deleteState, setDeleteState] = useState({ type: '', item: null })
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: tradeFormDefaults })

  useMockRefresh(watchlistCollection.items, watchlistCollection.setItems, 8000)

  const dynamicPairOptions = useMemo(() => {
    const fromWatchlist = watchlistCollection.items.map((item) => ({ value: `${item.symbol} / INR`, label: `${item.symbol} / INR` }))
    const map = new Map([...tradePairOptions, ...fromWatchlist].map((item) => [item.value, item]))
    return Array.from(map.values())
  }, [watchlistCollection.items])

  useEffect(() => {
    if (!dynamicPairOptions.some((item) => item.value === selectedCryptoPair)) {
      setSelectedCryptoPair(dynamicPairOptions[0]?.value ?? tradeFormDefaults.pair)
    }
  }, [dynamicPairOptions, selectedCryptoPair, setSelectedCryptoPair])

  const selectedSymbol = selectedCryptoPair.split(' / ')[0]
  const selectedMarket = watchlistCollection.items.find((item) => item.symbol === selectedSymbol)
  const selectedBasePrice = Number(selectedMarket?.price ?? tradeFormDefaults.price)
  const selectedChange = Number(selectedMarket?.change ?? 0.8)

  const stats = useMemo(() => {
    const watchValue = watchlistCollection.items.reduce((sum, item) => sum + Number(item.price || 0), 0)
    const gainers = watchlistCollection.items.filter((item) => Number(item.change) > 0).length
    const openOrders = orderCollection.items.filter((item) => item.status === 'Open').length
    const avgMove = watchlistCollection.items.length
      ? watchlistCollection.items.reduce((sum, item) => sum + Number(item.change || 0), 0) / watchlistCollection.items.length
      : 0

    return [
      { label: 'Tracked Value', value: watchValue, delta: 4.9, icon: 'wallet', format: 'currency', subValue: `${watchlistCollection.items.length} instruments` },
      { label: 'Gainers', value: gainers, delta: 2.3, icon: 'analytics', subValue: 'Counters in green' },
      { label: 'Open Orders', value: openOrders, delta: 1.7, icon: 'orders', subValue: 'Pending execution' },
      { label: 'Avg Move', value: Math.abs(avgMove), delta: avgMove, icon: 'pulse', subValue: `${avgMove >= 0 ? 'Positive' : 'Negative'} daily sentiment` },
    ]
  }, [orderCollection.items, watchlistCollection.items])

  const filteredWatchlist = useMemo(() => {
    return watchlistCollection.items.filter((item) => {
      const matchesQuery = [item.symbol, item.name, item.sector].join(' ').toLowerCase().includes(watchlistQuery.toLowerCase())
      const matchesSector = sectorFilter === 'all' || item.sector === sectorFilter
      return matchesQuery && matchesSector
    })
  }, [sectorFilter, watchlistCollection.items, watchlistQuery])

  const filteredOrders = useMemo(() => {
    return orderCollection.items.filter((item) => {
      const matchesQuery = [item.pair, item.side, item.status].join(' ').toLowerCase().includes(orderQuery.toLowerCase())
      const matchesStatus = orderStatusFilter === 'all' || item.status === orderStatusFilter
      return matchesQuery && matchesStatus
    })
  }, [orderCollection.items, orderQuery, orderStatusFilter])

  const watchlistColumns = [
    {
      key: 'symbol',
      label: 'Instrument',
      render: (item) => (
        <button
          type="button"
          className="text-left"
          onClick={() => setSelectedCryptoPair(`${item.symbol} / INR`)}
        >
          <p className="font-semibold text-[var(--text-primary)]">{item.symbol}</p>
          <p className="text-xs text-[var(--text-secondary)]">{item.name}</p>
        </button>
      ),
    },
    { key: 'sector', label: 'Sector' },
    { key: 'price', label: 'Price', render: (item) => formatCurrency(Number(item.price || 0)) },
    {
      key: 'change',
      label: 'Change',
      render: (item) => (
        <span className={Number(item.change) >= 0 ? 'text-emerald-700' : 'text-rose-700'}>{formatPercent(Number(item.change || 0))}</span>
      ),
    },
  ]

  const orderColumns = [
    { key: 'pair', label: 'Pair' },
    { key: 'side', label: 'Side', type: 'status' },
    { key: 'amount', label: 'Qty', render: (item) => formatCompactNumber(Number(item.amount || 0)) },
    { key: 'price', label: 'Price', render: (item) => formatCurrency(Number(item.price || 0)) },
    { key: 'status', label: 'Status', type: 'status' },
  ]

  const submitTrade = (values) => {
    const payload = {
      pair: values.pair,
      side: values.side,
      amount: Number(values.amount),
      price: Number(values.price),
      status: 'Open',
    }

    orderCollection.createItem(payload)
    setSelectedCryptoPair(values.pair)
    success(`${values.side} order created for ${values.pair}.`)
    reset({ ...tradeFormDefaults, pair: values.pair, price: Number(values.price) })
  }

  const saveWatchlistItem = (values) => {
    const payload = {
      ...values,
      price: Number(values.price),
      change: Number(values.change),
    }

    if (editingWatchlistItem) {
      watchlistCollection.updateItem(editingWatchlistItem.id, payload)
      success('Watchlist entry updated successfully.')
    } else {
      watchlistCollection.createItem(payload)
      success('Watchlist entry created successfully.')
    }

    watchlistModal.closeModal()
    setEditingWatchlistItem(null)
  }

  const saveOrderItem = (values) => {
    const payload = {
      ...values,
      amount: Number(values.amount),
      price: Number(values.price),
    }

    if (editingOrderItem) {
      orderCollection.updateItem(editingOrderItem.id, payload)
      success('Order updated successfully.')
    } else {
      orderCollection.createItem(payload)
      success('Order created successfully.')
    }

    orderModal.closeModal()
    setEditingOrderItem(null)
  }

  const deleteRecord = () => {
    if (!deleteState.item) {
      return
    }

    if (deleteState.type === 'watchlist') {
      watchlistCollection.deleteItem(deleteState.item.id)
      success('Watchlist entry deleted successfully.')
    }

    if (deleteState.type === 'order') {
      orderCollection.deleteItem(deleteState.item.id)
      success('Order deleted successfully.')
    }

    deleteModal.closeModal()
    setDeleteState({ type: '', item: null })
  }

  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Markets"
        title={cryptoOverview.title}
        description={cryptoOverview.description}
        actions={
          <>
            <div className="rounded-full bg-amber-100 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">Simulated Prices</div>
            <Button
              onClick={() => {
                setEditingWatchlistItem(null)
                watchlistModal.openModal()
              }}
            >
              Add instrument
            </Button>
          </>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <StatCard key={item.label} item={item} money={item.format === 'currency'} compact={item.label === 'Avg Move'} />
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.5fr_0.95fr]">
        <SurfaceCard className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)]">Selected pair</p>
              <h2 className="mt-1 text-xl font-semibold text-[var(--text-primary)]">{selectedCryptoPair}</h2>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">{selectedMarket?.name ?? 'Broader market benchmark'} • {selectedMarket?.sector ?? 'Index'} • Simulated intraday trend</p>
            </div>
            <div className="rounded-[20px] border border-[var(--border-soft)] bg-white px-4 py-3 text-right">
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">Spot price</p>
              <p className="mt-1 text-lg font-semibold text-[var(--text-primary)]">{formatCurrency(selectedBasePrice)}</p>
              <p className={`text-sm font-medium ${selectedChange >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>{formatPercent(selectedChange)}</p>
            </div>
          </div>
          <LineChart series={buildChartSeries(selectedBasePrice, selectedChange)} strokeColor="#107c10" fillColor="rgba(16, 124, 16, 0.12)" height={260} />
        </SurfaceCard>

        <SurfaceCard>
          <div className="mb-4">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)]">Trade desk</p>
            <h2 className="mt-1 text-xl font-semibold text-[var(--text-primary)]">Create a market order</h2>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(submitTrade)}>
            <FormSelect label="Trading pair" name="pair" register={register} options={dynamicPairOptions} error={errors.pair} rules={validationRules.required('Trading pair')} />
            <FormSelect label="Side" name="side" register={register} options={sideOptions} error={errors.side} rules={validationRules.required('Side')} />
            <FormInput label="Quantity" name="amount" type="number" register={register} error={errors.amount} rules={validationRules.amount('Quantity', 1)} />
            <FormInput label="Price (INR)" name="price" type="number" register={register} error={errors.price} rules={validationRules.amount('Price', 1)} />
            <Button type="submit" className="w-full">Place order</Button>
          </form>
        </SurfaceCard>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <SurfaceCard className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)]">Watchlist</p>
              <h2 className="mt-1 text-xl font-semibold text-[var(--text-primary)]">Tracked INR counters</h2>
            </div>
            <Button
              onClick={() => {
                setEditingWatchlistItem(null)
                watchlistModal.openModal()
              }}
            >
              Add watchlist row
            </Button>
          </div>
          <FilterBar
            query={watchlistQuery}
            onQueryChange={setWatchlistQuery}
            filterValue={sectorFilter}
            onFilterChange={setSectorFilter}
            filterOptions={watchlistFilterOptions}
            addLabel="Add instrument"
            onAdd={() => {
              setEditingWatchlistItem(null)
              watchlistModal.openModal()
            }}
            resultCount={filteredWatchlist.length}
          />
          <CollectionView
            columns={watchlistColumns}
            items={filteredWatchlist}
            emptyTitle="No instruments tracked"
            emptyDescription="Add an NSE or India-market counter to build your watchlist."
            onCreate={() => {
              setEditingWatchlistItem(null)
              watchlistModal.openModal()
            }}
            createLabel="Add instrument"
            onEdit={(item) => {
              setEditingWatchlistItem(item)
              watchlistModal.openModal()
            }}
            onDelete={(item) => {
              setDeleteState({ type: 'watchlist', item })
              deleteModal.openModal()
            }}
          />
        </SurfaceCard>

        <SurfaceCard className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)]">Orders</p>
              <h2 className="mt-1 text-xl font-semibold text-[var(--text-primary)]">Persisted trade records</h2>
            </div>
            <Button variant="secondary" onClick={() => setOrderStatusFilter('Open')}>View open</Button>
          </div>
          <FilterBar
            query={orderQuery}
            onQueryChange={setOrderQuery}
            filterValue={orderStatusFilter}
            onFilterChange={setOrderStatusFilter}
            filterOptions={orderStatusOptions}
            addLabel="Add order"
            onAdd={() => {
              setEditingOrderItem(null)
              orderModal.openModal()
            }}
            resultCount={filteredOrders.length}
          />
          <CollectionView
            columns={orderColumns}
            items={filteredOrders}
            emptyTitle="No orders yet"
            emptyDescription="Use the trade desk or add an order manually to begin tracking executions."
            onCreate={() => {
              setEditingOrderItem(null)
              orderModal.openModal()
            }}
            createLabel="Add order"
            onEdit={(item) => {
              setEditingOrderItem(item)
              orderModal.openModal()
            }}
            onDelete={(item) => {
              setDeleteState({ type: 'order', item })
              deleteModal.openModal()
            }}
          />
        </SurfaceCard>
      </div>

      <CrudModal
        isOpen={watchlistModal.isOpen}
        title={editingWatchlistItem ? 'Edit watchlist entry' : 'Add watchlist entry'}
        description="Keep your market watchlist aligned with the India-first counters you monitor most often."
        fields={[
          { name: 'symbol', label: 'Symbol', rules: validationRules.required('Symbol') },
          { name: 'name', label: 'Company name', rules: validationRules.required('Company name') },
          { name: 'sector', label: 'Sector', type: 'select', options: sectorOptions, rules: validationRules.required('Sector') },
          { name: 'price', label: 'Price (INR)', type: 'number', rules: validationRules.amount('Price', 1) },
          { name: 'change', label: 'Day change %', type: 'number', rules: { required: 'Day change is required.' } },
        ]}
        defaultValues={editingWatchlistItem ?? { symbol: '', name: '', sector: 'IT Services', price: 0, change: 0 }}
        onClose={() => {
          watchlistModal.closeModal()
          setEditingWatchlistItem(null)
        }}
        onSubmit={saveWatchlistItem}
        submitLabel={editingWatchlistItem ? 'Save entry' : 'Create entry'}
      />

      <CrudModal
        isOpen={orderModal.isOpen}
        title={editingOrderItem ? 'Edit order' : 'Add order'}
        description="Manually manage persistent market orders when you need to correct or backfill trade data."
        fields={[
          { name: 'pair', label: 'Pair', type: 'select', options: dynamicPairOptions, rules: validationRules.required('Pair') },
          { name: 'side', label: 'Side', type: 'select', options: sideOptions, rules: validationRules.required('Side') },
          { name: 'amount', label: 'Quantity', type: 'number', rules: validationRules.amount('Quantity', 1) },
          { name: 'price', label: 'Price', type: 'number', rules: validationRules.amount('Price', 1) },
          { name: 'status', label: 'Status', type: 'select', options: orderStatusOptions.filter((item) => item.value !== 'all'), rules: validationRules.required('Status') },
        ]}
        defaultValues={editingOrderItem ?? { pair: dynamicPairOptions[0]?.value ?? tradeFormDefaults.pair, side: 'Buy', amount: 1, price: selectedBasePrice, status: 'Open' }}
        onClose={() => {
          orderModal.closeModal()
          setEditingOrderItem(null)
        }}
        onSubmit={saveOrderItem}
        submitLabel={editingOrderItem ? 'Save order' : 'Create order'}
      />

      <ConfirmDialog
        isOpen={deleteModal.isOpen}
        title="Delete record"
        description={`This will permanently remove ${deleteState.item?.name ?? deleteState.item?.pair ?? 'this record'} from the markets dashboard.`}
        onClose={() => {
          deleteModal.closeModal()
          setDeleteState({ type: '', item: null })
        }}
        onConfirm={deleteRecord}
      />
    </div>
  )
}
