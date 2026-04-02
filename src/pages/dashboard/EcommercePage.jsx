// This ecommerce page persists India-first investment products and derives sales-style summaries directly from those records.
import { useMemo, useState } from 'react'
import { ecommerceOverview, ecommerceProductSeeds } from '../../data/ecommerceData.js'
import { useLocalStorageCollection } from '../../hooks/useLocalStorageCollection.js'
import { useModal } from '../../hooks/useModal.js'
import { useToast } from '../../hooks/useToast.js'
import { COLLECTION_KEYS } from '../../utils/schemaVersion.js'
import { formatCompactNumber, formatCurrency } from '../../utils/formatters.js'
import { validationRules } from '../../utils/validation.js'
import { BarChart } from '../../components/charts/BarChart.jsx'
import { DonutChart } from '../../components/charts/DonutChart.jsx'
import { LineChart } from '../../components/charts/LineChart.jsx'
import { Button } from '../../components/common/Button.jsx'
import { CollectionView } from '../../components/common/CollectionView.jsx'
import { ConfirmDialog } from '../../components/common/ConfirmDialog.jsx'
import { CrudModal } from '../../components/common/CrudModal.jsx'
import { FilterBar } from '../../components/common/FilterBar.jsx'
import { PageHeader } from '../../components/common/PageHeader.jsx'
import { StatCard } from '../../components/common/StatCard.jsx'
import { SurfaceCard } from '../../components/common/SurfaceCard.jsx'

const productStatusOptions = [
  { value: 'all', label: 'All statuses' },
  { value: 'In progress', label: 'In progress' },
  { value: 'Paused', label: 'Paused' },
  { value: 'In review', label: 'In review' },
]
const categoryOptions = [
  { value: 'Mutual Fund', label: 'Mutual Fund' },
  { value: 'Model Portfolio', label: 'Model Portfolio' },
  { value: 'ELSS', label: 'ELSS' },
  { value: 'Retirement', label: 'Retirement' },
  { value: 'Insurance', label: 'Insurance' },
]

const buildSegments = (items) => {
  if (!items.length) {
    return [
      { label: 'Mutual Fund', value: 40, color: '#0078d4' },
      { label: 'Model Portfolio', value: 30, color: '#4fa3e0' },
      { label: 'Retirement', value: 20, color: '#107c10' },
      { label: 'ELSS', value: 10, color: '#d67f0a' },
    ]
  }

  const grouped = items.reduce((accumulator, item) => {
    accumulator[item.category] = (accumulator[item.category] || 0) + Number(item.revenue || 0)
    return accumulator
  }, {})
  const total = Object.values(grouped).reduce((sum, value) => sum + value, 0) || 1
  const palette = ['#0078d4', '#4fa3e0', '#107c10', '#d67f0a', '#7c3aed']

  return Object.entries(grouped).map(([label, value], index) => ({
    label,
    value: Math.max(1, Math.round((value / total) * 100)),
    color: palette[index % palette.length],
  }))
}

export const EcommercePage = () => {
  const { success } = useToast()
  const productCollection = useLocalStorageCollection(COLLECTION_KEYS.ecommerceProducts, ecommerceProductSeeds, 'product')
  const modal = useModal()
  const deleteModal = useModal()
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [editingItem, setEditingItem] = useState(null)
  const [deletingItem, setDeletingItem] = useState(null)

  const filteredItems = useMemo(() => {
    return productCollection.items.filter((item) => {
      const matchesQuery = [item.name, item.company, item.category, item.manager].join(' ').toLowerCase().includes(query.toLowerCase())
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter
      return matchesQuery && matchesStatus
    })
  }, [productCollection.items, query, statusFilter])

  const stats = useMemo(() => {
    const totalRevenue = productCollection.items.reduce((sum, item) => sum + Number(item.revenue || 0), 0)
    const totalOrders = productCollection.items.reduce((sum, item) => sum + Number(item.orders || 0), 0)
    const activeProducts = productCollection.items.filter((item) => item.status === 'In progress').length
    const avgRevenue = productCollection.items.length ? totalRevenue / productCollection.items.length : 0

    return [
      { label: 'Revenue', value: totalRevenue, delta: 6.8, icon: 'wallet', format: 'currency', subValue: 'Advisory-led income' },
      { label: 'Orders', value: totalOrders, delta: 4.1, icon: 'orders', subValue: `${productCollection.items.length} live products` },
      { label: 'Active Offers', value: activeProducts, delta: 3.2, icon: 'store', subValue: 'Currently selling' },
      { label: 'Avg Revenue', value: avgRevenue, delta: 2.5, icon: 'sales', format: 'currency', subValue: 'Per product' },
    ]
  }, [productCollection.items])

  const revenueSeries = useMemo(() => {
    return productCollection.items.map((item, index) => ({
      label: item.name.split(' ')[0] || `P${index + 1}`,
      value: Number(item.revenue || 0),
    }))
  }, [productCollection.items])

  const orderSeries = useMemo(() => {
    return productCollection.items.map((item, index) => ({
      label: item.name.split(' ')[0] || `P${index + 1}`,
      value: Number(item.orders || 0),
    }))
  }, [productCollection.items])

  const productColumns = [
    {
      key: 'name',
      label: 'Product',
      render: (item) => (
        <div>
          <p className="font-semibold text-[var(--text-primary)]">{item.name}</p>
          <p className="text-xs text-[var(--text-secondary)]">{item.company}</p>
        </div>
      ),
    },
    { key: 'category', label: 'Category' },
    { key: 'manager', label: 'Manager' },
    { key: 'orders', label: 'Orders', render: (item) => formatCompactNumber(Number(item.orders || 0)) },
    { key: 'revenue', label: 'Revenue', render: (item) => formatCurrency(Number(item.revenue || 0)) },
    { key: 'status', label: 'Status', type: 'status' },
  ]

  const saveProduct = (values) => {
    const payload = {
      ...values,
      orders: Number(values.orders),
      revenue: Number(values.revenue),
    }

    if (editingItem) {
      productCollection.updateItem(editingItem.id, payload)
      success('Product updated successfully.')
    } else {
      productCollection.createItem(payload)
      success('Product created successfully.')
    }

    modal.closeModal()
    setEditingItem(null)
  }

  const deleteProduct = () => {
    if (!deletingItem) {
      return
    }

    productCollection.deleteItem(deletingItem.id)
    success('Product removed successfully.')
    deleteModal.closeModal()
    setDeletingItem(null)
  }

  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Products"
        title={ecommerceOverview.title}
        description={ecommerceOverview.description}
        actions={
          <>
            <Button variant="secondary" onClick={() => setStatusFilter('In progress')}>View active</Button>
            <Button
              onClick={() => {
                setEditingItem(null)
                modal.openModal()
              }}
            >
              Add product
            </Button>
          </>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <StatCard key={item.label} item={item} money={item.format === 'currency'} />
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.5fr_0.95fr]">
        <SurfaceCard className="space-y-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)]">Revenue build-up</p>
            <h2 className="mt-1 text-xl font-semibold text-[var(--text-primary)]">Product-wise earnings</h2>
          </div>
          <LineChart series={revenueSeries.length ? revenueSeries : [{ label: 'None', value: 0 }]} strokeColor="#106ebe" fillColor="rgba(16, 110, 190, 0.14)" />
        </SurfaceCard>

        <SurfaceCard className="space-y-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)]">Mix</p>
            <h2 className="mt-1 text-xl font-semibold text-[var(--text-primary)]">Category contribution</h2>
          </div>
          <DonutChart segments={buildSegments(productCollection.items)} centerLabel="Revenue mix" />
        </SurfaceCard>
      </div>

      <div className="grid gap-4 xl:grid-cols-[0.95fr_1.45fr]">
        <SurfaceCard className="space-y-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)]">Orders</p>
            <h2 className="mt-1 text-xl font-semibold text-[var(--text-primary)]">Order volume by product</h2>
          </div>
          <BarChart series={orderSeries.length ? orderSeries : [{ label: 'None', value: 0 }]} />
        </SurfaceCard>

        <SurfaceCard className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)]">Products</p>
              <h2 className="mt-1 text-xl font-semibold text-[var(--text-primary)]">Persistent investment product catalog</h2>
            </div>
            <Button
              onClick={() => {
                setEditingItem(null)
                modal.openModal()
              }}
            >
              Create product
            </Button>
          </div>
          <FilterBar
            query={query}
            onQueryChange={setQuery}
            filterValue={statusFilter}
            onFilterChange={setStatusFilter}
            filterOptions={productStatusOptions}
            addLabel="Add product"
            onAdd={() => {
              setEditingItem(null)
              modal.openModal()
            }}
            resultCount={filteredItems.length}
          />
          <CollectionView
            columns={productColumns}
            items={filteredItems}
            emptyTitle="No products yet"
            emptyDescription="Create an investment product or advisory offer to start tracking conversions."
            onCreate={() => {
              setEditingItem(null)
              modal.openModal()
            }}
            createLabel="Add product"
            onEdit={(item) => {
              setEditingItem(item)
              modal.openModal()
            }}
            onDelete={(item) => {
              setDeletingItem(item)
              deleteModal.openModal()
            }}
          />
        </SurfaceCard>
      </div>

      <CrudModal
        isOpen={modal.isOpen}
        title={editingItem ? 'Edit product' : 'Create product'}
        description="Manage India-first investment offers and keep revenue summaries synced with your catalog."
        fields={[
          { name: 'name', label: 'Product name', rules: validationRules.required('Product name') },
          { name: 'company', label: 'Company', rules: validationRules.required('Company') },
          { name: 'category', label: 'Category', type: 'select', options: categoryOptions, rules: validationRules.required('Category') },
          { name: 'manager', label: 'Manager', rules: validationRules.required('Manager') },
          { name: 'orders', label: 'Orders', type: 'number', rules: validationRules.amount('Orders', 1) },
          { name: 'revenue', label: 'Revenue', type: 'number', rules: validationRules.amount('Revenue', 1000) },
          { name: 'status', label: 'Status', type: 'select', options: productStatusOptions.filter((option) => option.value !== 'all'), rules: validationRules.required('Status') },
        ]}
        defaultValues={editingItem ?? { name: '', company: 'Gaur Investor Ltd', category: 'Mutual Fund', manager: 'Tarun Raj Gaur', orders: 0, revenue: 0, status: 'In progress' }}
        onClose={() => {
          modal.closeModal()
          setEditingItem(null)
        }}
        onSubmit={saveProduct}
        submitLabel={editingItem ? 'Save product' : 'Create product'}
      />

      <ConfirmDialog
        isOpen={deleteModal.isOpen}
        title="Delete product"
        description={`This will remove ${deletingItem?.name ?? 'this product'} from the advisory catalog.`}
        onClose={() => {
          deleteModal.closeModal()
          setDeletingItem(null)
        }}
        onConfirm={deleteProduct}
      />
    </div>
  )
}
