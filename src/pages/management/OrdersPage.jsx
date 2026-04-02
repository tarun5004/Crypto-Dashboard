// This orders page provides full CRUD for investor transactions with status, payment, and city filters that persist across refreshes.
import { useMemo, useState } from 'react'
import { orderSeeds, ordersOverview, orderStatusOptions, paymentMethodOptions } from '../../data/ordersData.js'
import { useLocalStorageCollection } from '../../hooks/useLocalStorageCollection.js'
import { useModal } from '../../hooks/useModal.js'
import { useToast } from '../../hooks/useToast.js'
import { COLLECTION_KEYS } from '../../utils/schemaVersion.js'
import { formatCompactNumber, formatCurrency, formatDate } from '../../utils/formatters.js'
import { validationRules } from '../../utils/validation.js'
import { Button } from '../../components/common/Button.jsx'
import { CollectionView } from '../../components/common/CollectionView.jsx'
import { ConfirmDialog } from '../../components/common/ConfirmDialog.jsx'
import { CrudModal } from '../../components/common/CrudModal.jsx'
import { FilterBar } from '../../components/common/FilterBar.jsx'
import { PageHeader } from '../../components/common/PageHeader.jsx'
import { StatCard } from '../../components/common/StatCard.jsx'
import { SurfaceCard } from '../../components/common/SurfaceCard.jsx'

const statusFilterOptions = [{ value: 'all', label: 'All statuses' }, ...orderStatusOptions.map((item) => ({ value: item, label: item }))]
const paymentOptions = paymentMethodOptions.map((item) => ({ value: item, label: item }))

export const OrdersPage = () => {
  const { success } = useToast()
  const orderCollection = useLocalStorageCollection(COLLECTION_KEYS.orders, orderSeeds, 'order')
  const modal = useModal()
  const deleteModal = useModal()
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [editingOrder, setEditingOrder] = useState(null)
  const [deletingOrder, setDeletingOrder] = useState(null)

  const filteredOrders = useMemo(() => {
    return orderCollection.items.filter((item) => {
      const matchesQuery = [item.customerName, item.paymentMethod, item.city, item.status].join(' ').toLowerCase().includes(query.toLowerCase())
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter
      return matchesQuery && matchesStatus
    })
  }, [orderCollection.items, query, statusFilter])

  const stats = useMemo(() => {
    const totalValue = orderCollection.items.reduce((sum, item) => sum + Number(item.total || 0), 0)
    const paidCount = orderCollection.items.filter((item) => item.status === 'Paid').length
    const pendingCount = orderCollection.items.filter((item) => item.status === 'Pending').length
    const averageTicket = orderCollection.items.length ? totalValue / orderCollection.items.length : 0

    return [
      { label: 'Order Value', value: totalValue, delta: 7.4, icon: 'wallet', format: 'currency', subValue: 'Persisted transaction book' },
      { label: 'Paid Orders', value: paidCount, delta: 3.1, icon: 'check', subValue: 'Successfully settled' },
      { label: 'Pending', value: pendingCount, delta: -1.4, icon: 'pulse', subValue: 'Awaiting completion' },
      { label: 'Avg Ticket', value: averageTicket, delta: 2.6, icon: 'analytics', format: 'currency', subValue: `${formatCompactNumber(orderCollection.items.length)} total orders` },
    ]
  }, [orderCollection.items])

  const columns = [
    { key: 'customerName', label: 'Investor' },
    { key: 'date', label: 'Date', render: (item) => formatDate(item.date) },
    { key: 'city', label: 'City' },
    { key: 'total', label: 'Total', render: (item) => formatCurrency(Number(item.total || 0)) },
    { key: 'paymentMethod', label: 'Payment' },
    { key: 'status', label: 'Status', type: 'status' },
  ]

  const saveOrder = (values) => {
    const payload = {
      ...values,
      total: Number(values.total),
      date: new Date(values.date).toISOString(),
    }

    if (editingOrder) {
      orderCollection.updateItem(editingOrder.id, payload)
      success('Order updated successfully.')
    } else {
      orderCollection.createItem(payload)
      success('Order created successfully.')
    }

    modal.closeModal()
    setEditingOrder(null)
  }

  const deleteOrder = () => {
    if (!deletingOrder) {
      return
    }

    orderCollection.deleteItem(deletingOrder.id)
    success('Order removed successfully.')
    deleteModal.closeModal()
    setDeletingOrder(null)
  }

  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Transactions"
        title={ordersOverview.title}
        description={ordersOverview.description}
        actions={
          <Button
            onClick={() => {
              setEditingOrder(null)
              modal.openModal()
            }}
          >
            Add order
          </Button>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <StatCard key={item.label} item={item} money={item.format === 'currency'} />
        ))}
      </div>

      <SurfaceCard className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)]">Transaction book</p>
            <h2 className="mt-1 text-xl font-semibold text-[var(--text-primary)]">Investor order management</h2>
          </div>
          <Button variant="secondary" onClick={() => setStatusFilter('Pending')}>View pending</Button>
        </div>
        <FilterBar
          query={query}
          onQueryChange={setQuery}
          filterValue={statusFilter}
          onFilterChange={setStatusFilter}
          filterOptions={statusFilterOptions}
          addLabel="Add order"
          onAdd={() => {
            setEditingOrder(null)
            modal.openModal()
          }}
          resultCount={filteredOrders.length}
        />
        <CollectionView
          columns={columns}
          items={filteredOrders}
          emptyTitle="No orders found"
          emptyDescription="Create a transaction record to begin managing investor orders."
          onCreate={() => {
            setEditingOrder(null)
            modal.openModal()
          }}
          createLabel="Add order"
          onEdit={(item) => {
            setEditingOrder(item)
            modal.openModal()
          }}
          onDelete={(item) => {
            setDeletingOrder(item)
            deleteModal.openModal()
          }}
        />
      </SurfaceCard>

      <CrudModal
        isOpen={modal.isOpen}
        title={editingOrder ? 'Edit order' : 'Add order'}
        description="Persist a transaction with editable payment method, amount, and status fields."
        fields={[
          { name: 'customerName', label: 'Investor name', rules: validationRules.required('Investor name') },
          { name: 'date', label: 'Order date', type: 'date', rules: validationRules.required('Order date') },
          { name: 'city', label: 'City', rules: validationRules.required('City') },
          { name: 'total', label: 'Order total', type: 'number', rules: validationRules.amount('Order total', 1000) },
          { name: 'paymentMethod', label: 'Payment method', type: 'select', options: paymentOptions, rules: validationRules.required('Payment method') },
          { name: 'status', label: 'Status', type: 'select', options: orderStatusOptions.map((item) => ({ value: item, label: item })), rules: validationRules.required('Status') },
        ]}
        defaultValues={editingOrder ? { ...editingOrder, date: editingOrder.date.slice(0, 10) } : { customerName: '', date: new Date().toISOString().slice(0, 10), city: 'Meerut', total: 0, paymentMethod: 'UPI', status: 'Pending' }}
        onClose={() => {
          modal.closeModal()
          setEditingOrder(null)
        }}
        onSubmit={saveOrder}
        submitLabel={editingOrder ? 'Save order' : 'Create order'}
      />

      <ConfirmDialog
        isOpen={deleteModal.isOpen}
        title="Delete order"
        description={`This will permanently remove the order for ${deletingOrder?.customerName ?? 'this investor'}.`}
        onClose={() => {
          deleteModal.closeModal()
          setDeletingOrder(null)
        }}
        onConfirm={deleteOrder}
      />
    </div>
  )
}
