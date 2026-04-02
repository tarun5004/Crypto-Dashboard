// This clients page persists investor records and logs CRUD actions into a lightweight relationship activity feed.
import { useMemo, useState } from 'react'
import { clientActivitySeeds, clientSeeds, clientsOverview } from '../../data/clientsData.js'
import { useLocalStorageCollection } from '../../hooks/useLocalStorageCollection.js'
import { useModal } from '../../hooks/useModal.js'
import { useToast } from '../../hooks/useToast.js'
import { COLLECTION_KEYS } from '../../utils/schemaVersion.js'
import { formatDateTime } from '../../utils/formatters.js'
import { validationRules } from '../../utils/validation.js'
import { Avatar } from '../../components/common/Avatar.jsx'
import { Button } from '../../components/common/Button.jsx'
import { CollectionView } from '../../components/common/CollectionView.jsx'
import { ConfirmDialog } from '../../components/common/ConfirmDialog.jsx'
import { CrudModal } from '../../components/common/CrudModal.jsx'
import { FilterBar } from '../../components/common/FilterBar.jsx'
import { PageHeader } from '../../components/common/PageHeader.jsx'
import { StatusBadge } from '../../components/common/StatusBadge.jsx'
import { SurfaceCard } from '../../components/common/SurfaceCard.jsx'

const clientStatusOptions = [
  { value: 'all', label: 'All statuses' },
  { value: 'Active', label: 'Active' },
  { value: 'Inactive', label: 'Inactive' },
  { value: 'Blocked', label: 'Blocked' },
]
const cityOptions = [
  { value: 'Mumbai', label: 'Mumbai' },
  { value: 'Bengaluru', label: 'Bengaluru' },
  { value: 'Delhi', label: 'Delhi' },
  { value: 'Hyderabad', label: 'Hyderabad' },
  { value: 'Meerut', label: 'Meerut' },
  { value: 'Pune', label: 'Pune' },
]

const getInitials = (name) => {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export const ClientsPage = () => {
  const { success } = useToast()
  const clientsCollection = useLocalStorageCollection(COLLECTION_KEYS.clients, clientSeeds, 'client')
  const activityCollection = useLocalStorageCollection(COLLECTION_KEYS.clientActivity, clientActivitySeeds, 'client-activity')
  const modal = useModal()
  const deleteModal = useModal()
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedClientId, setSelectedClientId] = useState(clientSeeds[0]?.id ?? '')
  const [editingClient, setEditingClient] = useState(null)
  const [deletingClient, setDeletingClient] = useState(null)

  const logActivity = (title, description) => {
    activityCollection.createItem({
      title,
      time: formatDateTime(new Date().toISOString()),
      description,
    })
  }

  const filteredClients = useMemo(() => {
    return clientsCollection.items.filter((item) => {
      const matchesQuery = [item.name, item.company, item.email, item.city].join(' ').toLowerCase().includes(query.toLowerCase())
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter
      return matchesQuery && matchesStatus
    })
  }, [clientsCollection.items, query, statusFilter])

  const selectedClient = useMemo(() => {
    return clientsCollection.items.find((item) => item.id === selectedClientId) ?? clientsCollection.items[0] ?? null
  }, [clientsCollection.items, selectedClientId])

  const columns = [
    {
      key: 'name',
      label: 'Client',
      render: (item) => (
        <button type="button" className="text-left" onClick={() => setSelectedClientId(item.id)}>
          <p className="font-semibold text-[var(--text-primary)]">{item.name}</p>
          <p className="text-xs text-[var(--text-secondary)]">{item.email}</p>
        </button>
      ),
    },
    { key: 'company', label: 'Company' },
    { key: 'city', label: 'City' },
    { key: 'phone', label: 'Phone' },
    { key: 'status', label: 'Status', type: 'status' },
  ]

  const saveClient = (values) => {
    const payload = { ...values }

    if (editingClient) {
      clientsCollection.updateItem(editingClient.id, payload)
      logActivity('Client updated', `${values.name} profile details were updated in the CRM directory.`)
      success('Client updated successfully.')
    } else {
      const created = clientsCollection.createItem(payload)
      setSelectedClientId(created.id)
      logActivity('Client created', `${values.name} was added to the investor relationship book.`)
      success('Client created successfully.')
    }

    modal.closeModal()
    setEditingClient(null)
  }

  const deleteClient = () => {
    if (!deletingClient) {
      return
    }

    clientsCollection.deleteItem(deletingClient.id)
    logActivity('Client removed', `${deletingClient.name} was removed from the investor directory.`)
    success('Client removed successfully.')
    deleteModal.closeModal()
    setDeletingClient(null)
  }

  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Relationships"
        title={clientsOverview.title}
        description={clientsOverview.description}
        actions={
          <Button
            onClick={() => {
              setEditingClient(null)
              modal.openModal()
            }}
          >
            Add client
          </Button>
        }
      />

      <div className="grid gap-4 xl:grid-cols-[1.35fr_0.9fr]">
        <SurfaceCard className="space-y-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)]">Client registry</p>
            <h2 className="mt-1 text-xl font-semibold text-[var(--text-primary)]">Persisted investor directory</h2>
          </div>
          <FilterBar
            query={query}
            onQueryChange={setQuery}
            filterValue={statusFilter}
            onFilterChange={setStatusFilter}
            filterOptions={clientStatusOptions}
            addLabel="Add client"
            onAdd={() => {
              setEditingClient(null)
              modal.openModal()
            }}
            resultCount={filteredClients.length}
          />
          <CollectionView
            columns={columns}
            items={filteredClients}
            emptyTitle="No clients found"
            emptyDescription="Add an investor profile to start managing client records and spotlight details."
            onCreate={() => {
              setEditingClient(null)
              modal.openModal()
            }}
            createLabel="Add client"
            onEdit={(item) => {
              setEditingClient(item)
              modal.openModal()
            }}
            onDelete={(item) => {
              setDeletingClient(item)
              deleteModal.openModal()
            }}
          />
        </SurfaceCard>

        <SurfaceCard className="space-y-5">
          {selectedClient ? (
            <>
              <div className="flex items-start gap-4">
                <Avatar initials={getInitials(selectedClient.name)} size="xl" accent />
                <div className="min-w-0">
                  <p className="text-xl font-semibold text-[var(--text-primary)]">{selectedClient.name}</p>
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">{selectedClient.company} • {selectedClient.city}</p>
                  <div className="mt-3 inline-flex">
                    <StatusBadge value={selectedClient.status} />
                  </div>
                </div>
              </div>

              <div className="grid gap-3 rounded-[24px] border border-[var(--border-soft)] bg-white/70 p-4 text-sm text-[var(--text-secondary)]">
                <div className="flex items-center justify-between gap-3"><span>Email</span><span className="text-right font-medium text-[var(--text-primary)]">{selectedClient.email}</span></div>
                <div className="flex items-center justify-between gap-3"><span>Phone</span><span className="text-right font-medium text-[var(--text-primary)]">{selectedClient.phone}</span></div>
                <div className="flex items-center justify-between gap-3"><span>City</span><span className="text-right font-medium text-[var(--text-primary)]">{selectedClient.city}</span></div>
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)]">About</p>
                <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{selectedClient.about}</p>
              </div>
            </>
          ) : null}

          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)]">Activity</p>
              <span className="text-xs text-[var(--text-muted)]">Latest relationship updates</span>
            </div>
            {activityCollection.items.slice(0, 6).map((item) => (
              <div key={item.id} className="rounded-[22px] border border-[var(--border-soft)] bg-white/70 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-[var(--text-primary)]">{item.title}</p>
                  <span className="text-xs text-[var(--text-muted)]">{item.time}</span>
                </div>
                <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{item.description}</p>
              </div>
            ))}
          </div>
        </SurfaceCard>
      </div>

      <CrudModal
        isOpen={modal.isOpen}
        title={editingClient ? 'Edit client' : 'Add client'}
        description="Maintain investor details, contact information, and account status from one responsive workflow."
        fields={[
          { name: 'name', label: 'Client name', rules: validationRules.required('Client name') },
          { name: 'company', label: 'Company', rules: validationRules.required('Company') },
          { name: 'email', label: 'Email', type: 'email', rules: validationRules.email },
          { name: 'city', label: 'City', type: 'select', options: cityOptions, rules: validationRules.required('City') },
          { name: 'status', label: 'Status', type: 'select', options: clientStatusOptions.filter((item) => item.value !== 'all'), rules: validationRules.required('Status') },
          { name: 'phone', label: 'Phone', rules: validationRules.required('Phone') },
          { name: 'about', label: 'About', type: 'textarea', rules: validationRules.required('About') },
        ]}
        defaultValues={editingClient ?? { name: '', company: 'Gaur Investor Ltd', email: '', city: 'Meerut', status: 'Active', phone: '+91 ', about: '' }}
        onClose={() => {
          modal.closeModal()
          setEditingClient(null)
        }}
        onSubmit={saveClient}
        submitLabel={editingClient ? 'Save client' : 'Create client'}
      />

      <ConfirmDialog
        isOpen={deleteModal.isOpen}
        title="Delete client"
        description={`This will remove ${deletingClient?.name ?? 'this client'} from the persisted investor directory.`}
        onClose={() => {
          deleteModal.closeModal()
          setDeletingClient(null)
        }}
        onConfirm={deleteClient}
      />
    </div>
  )
}
