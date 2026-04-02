// This analytics page manages persisted projects and campaigns, then derives portfolio summary widgets from those collections.
import { useMemo, useState } from 'react'
import { analyticsCampaignSeeds, analyticsOverview, analyticsProjectSeeds, analyticsTrafficSegments } from '../../data/analyticsData.js'
import { useLocalStorageCollection } from '../../hooks/useLocalStorageCollection.js'
import { useModal } from '../../hooks/useModal.js'
import { useToast } from '../../hooks/useToast.js'
import { COLLECTION_KEYS } from '../../utils/schemaVersion.js'
import { formatCompactNumber, formatCurrency } from '../../utils/formatters.js'
import { validationRules } from '../../utils/validation.js'
import { Button } from '../../components/common/Button.jsx'
import { CollectionView } from '../../components/common/CollectionView.jsx'
import { ConfirmDialog } from '../../components/common/ConfirmDialog.jsx'
import { CrudModal } from '../../components/common/CrudModal.jsx'
import { FilterBar } from '../../components/common/FilterBar.jsx'
import { PageHeader } from '../../components/common/PageHeader.jsx'
import { StatCard } from '../../components/common/StatCard.jsx'
import { SurfaceCard } from '../../components/common/SurfaceCard.jsx'
import { DonutChart } from '../../components/charts/DonutChart.jsx'
import { LineChart } from '../../components/charts/LineChart.jsx'

const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const statusOptions = [
  { value: 'all', label: 'All statuses' },
  { value: 'On track', label: 'On track' },
  { value: 'In review', label: 'In review' },
  { value: 'At risk', label: 'At risk' },
]
const monthOptions = monthOrder.map((month) => ({ value: month, label: month }))
const campaignChannelOptions = [
  { value: 'WhatsApp', label: 'WhatsApp' },
  { value: 'Email', label: 'Email' },
  { value: 'Events', label: 'Events' },
  { value: 'Partner Referral', label: 'Partner Referral' },
]

const buildSegments = (items, key, fallback) => {
  if (!items.length) {
    return fallback
  }

  const totals = items.reduce((accumulator, item) => {
    const group = item[key] || 'Other'
    accumulator[group] = (accumulator[group] || 0) + 1
    return accumulator
  }, {})

  const total = Object.values(totals).reduce((sum, value) => sum + value, 0)
  const palette = ['#0078d4', '#4fa3e0', '#107c10', '#d67f0a', '#7c3aed']

  return Object.entries(totals).map(([label, value], index) => ({
    label,
    value: Math.max(1, Math.round((value / total) * 100)),
    color: palette[index % palette.length],
  }))
}

export const AnalyticsPage = () => {
  const { success } = useToast()
  const projectCollection = useLocalStorageCollection(COLLECTION_KEYS.analyticsProjects, analyticsProjectSeeds, 'project')
  const campaignCollection = useLocalStorageCollection(COLLECTION_KEYS.analyticsCampaigns, analyticsCampaignSeeds, 'campaign')
  const projectModal = useModal()
  const campaignModal = useModal()
  const deleteModal = useModal()
  const [projectQuery, setProjectQuery] = useState('')
  const [campaignQuery, setCampaignQuery] = useState('')
  const [projectStatus, setProjectStatus] = useState('all')
  const [campaignStatus, setCampaignStatus] = useState('all')
  const [editingProject, setEditingProject] = useState(null)
  const [editingCampaign, setEditingCampaign] = useState(null)
  const [deleteState, setDeleteState] = useState({ type: '', item: null })

  const summaryStats = useMemo(() => {
    const investmentTotal = projectCollection.items.reduce((sum, item) => sum + Number(item.investmentValue || 0), 0)
    const campaignBudget = campaignCollection.items.reduce((sum, item) => sum + Number(item.budget || 0), 0)
    const totalLeads = campaignCollection.items.reduce((sum, item) => sum + Number(item.leads || 0), 0)
    const averageProgress = projectCollection.items.length
      ? projectCollection.items.reduce((sum, item) => sum + Number(item.progress || 0), 0) / projectCollection.items.length
      : 0

    return [
      { label: 'Tracked AUM', value: investmentTotal, delta: 8.6, icon: 'wallet', format: 'currency', subValue: `${projectCollection.items.length} active mandates` },
      { label: 'Campaign Budget', value: campaignBudget, delta: 5.1, icon: 'sales', format: 'currency', subValue: `${campaignCollection.items.length} live campaigns` },
      { label: 'Qualified Leads', value: totalLeads, delta: 12.3, icon: 'users', subValue: 'India-first investor pipeline' },
      { label: 'Average Progress', value: Math.round(averageProgress), delta: 3.4, icon: 'analytics', subValue: 'Delivery completion rate' },
    ]
  }, [campaignCollection.items, projectCollection.items])

  const revenueSeries = useMemo(() => {
    const totals = monthOrder.map((month) => {
      const value = projectCollection.items
        .filter((item) => item.month === month)
        .reduce((sum, item) => sum + Number(item.investmentValue || 0), 0)

      return { label: month, value: value || 0 }
    })

    return totals.filter((item) => item.value > 0)
  }, [projectCollection.items])

  const trafficSegments = useMemo(() => buildSegments(campaignCollection.items, 'channel', analyticsTrafficSegments), [campaignCollection.items])

  const filteredProjects = useMemo(() => {
    return projectCollection.items.filter((item) => {
      const matchesQuery = [item.name, item.company, item.city, item.owner].join(' ').toLowerCase().includes(projectQuery.toLowerCase())
      const matchesStatus = projectStatus === 'all' || item.status === projectStatus
      return matchesQuery && matchesStatus
    })
  }, [projectCollection.items, projectQuery, projectStatus])

  const filteredCampaigns = useMemo(() => {
    return campaignCollection.items.filter((item) => {
      const matchesQuery = [item.name, item.channel, item.status].join(' ').toLowerCase().includes(campaignQuery.toLowerCase())
      const matchesStatus = campaignStatus === 'all' || item.status === campaignStatus
      return matchesQuery && matchesStatus
    })
  }, [campaignCollection.items, campaignQuery, campaignStatus])

  const projectColumns = [
    {
      key: 'name',
      label: 'Project',
      render: (item) => (
        <div>
          <p className="font-semibold text-[var(--text-primary)]">{item.name}</p>
          <p className="text-xs text-[var(--text-secondary)]">{item.company}</p>
        </div>
      ),
    },
    { key: 'city', label: 'City' },
    { key: 'owner', label: 'Owner' },
    {
      key: 'investmentValue',
      label: 'AUM',
      render: (item) => formatCurrency(Number(item.investmentValue || 0)),
    },
    {
      key: 'progress',
      label: 'Progress',
      render: (item) => `${item.progress}%`,
    },
    { key: 'status', label: 'Status', type: 'status' },
  ]

  const campaignColumns = [
    { key: 'name', label: 'Campaign' },
    { key: 'channel', label: 'Channel' },
    {
      key: 'budget',
      label: 'Budget',
      render: (item) => formatCurrency(Number(item.budget || 0)),
    },
    {
      key: 'leads',
      label: 'Leads',
      render: (item) => formatCompactNumber(Number(item.leads || 0)),
    },
    {
      key: 'roi',
      label: 'ROI',
      render: (item) => `${Number(item.roi || 0).toFixed(1)}%`,
    },
    { key: 'status', label: 'Status', type: 'status' },
  ]

  const openProjectCreate = () => {
    setEditingProject(null)
    projectModal.openModal()
  }

  const openCampaignCreate = () => {
    setEditingCampaign(null)
    campaignModal.openModal()
  }

  const saveProject = (values) => {
    const payload = {
      ...values,
      investmentValue: Number(values.investmentValue),
      progress: Number(values.progress),
    }

    if (editingProject) {
      projectCollection.updateItem(editingProject.id, payload)
      success('Project updated successfully.')
    } else {
      projectCollection.createItem(payload)
      success('Project added successfully.')
    }

    projectModal.closeModal()
    setEditingProject(null)
  }

  const saveCampaign = (values) => {
    const payload = {
      ...values,
      budget: Number(values.budget),
      leads: Number(values.leads),
      roi: Number(values.roi),
    }

    if (editingCampaign) {
      campaignCollection.updateItem(editingCampaign.id, payload)
      success('Campaign updated successfully.')
    } else {
      campaignCollection.createItem(payload)
      success('Campaign added successfully.')
    }

    campaignModal.closeModal()
    setEditingCampaign(null)
  }

  const confirmDelete = () => {
    if (!deleteState.item) {
      return
    }

    if (deleteState.type === 'project') {
      projectCollection.deleteItem(deleteState.item.id)
      success('Project removed successfully.')
    }

    if (deleteState.type === 'campaign') {
      campaignCollection.deleteItem(deleteState.item.id)
      success('Campaign removed successfully.')
    }

    deleteModal.closeModal()
    setDeleteState({ type: '', item: null })
  }

  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Performance"
        title={analyticsOverview.title}
        description={analyticsOverview.description}
        actions={
          <>
            <Button variant="secondary" onClick={openCampaignCreate}>New campaign</Button>
            <Button onClick={openProjectCreate}>Add project</Button>
          </>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {summaryStats.map((item) => (
          <StatCard key={item.label} item={item} money={item.format === 'currency'} />
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.55fr_0.95fr]">
        <SurfaceCard className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)]">AUM movement</p>
              <h2 className="mt-1 text-xl font-semibold text-[var(--text-primary)]">Monthly advisory momentum</h2>
            </div>
            <div className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold text-[var(--accent)]">Derived from project value</div>
          </div>
          <LineChart series={revenueSeries.length ? revenueSeries : [{ label: 'Jan', value: 0 }]} />
        </SurfaceCard>

        <SurfaceCard className="space-y-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)]">Channel mix</p>
            <h2 className="mt-1 text-xl font-semibold text-[var(--text-primary)]">Campaign distribution</h2>
          </div>
          <DonutChart segments={trafficSegments} centerLabel="Lead mix" />
        </SurfaceCard>
      </div>

      <SurfaceCard className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)]">Projects</p>
            <h2 className="mt-1 text-xl font-semibold text-[var(--text-primary)]">Investor growth initiatives</h2>
          </div>
          <Button onClick={openProjectCreate}>Create project</Button>
        </div>
        <FilterBar
          query={projectQuery}
          onQueryChange={setProjectQuery}
          filterValue={projectStatus}
          onFilterChange={setProjectStatus}
          filterOptions={statusOptions}
          addLabel="Add project"
          onAdd={openProjectCreate}
          resultCount={filteredProjects.length}
        />
        <CollectionView
          columns={projectColumns}
          items={filteredProjects}
          emptyTitle="No projects yet"
          emptyDescription="Create an advisory initiative to start tracking India-focused growth programs."
          onCreate={openProjectCreate}
          createLabel="Add project"
          onEdit={(item) => {
            setEditingProject(item)
            projectModal.openModal()
          }}
          onDelete={(item) => {
            setDeleteState({ type: 'project', item })
            deleteModal.openModal()
          }}
        />
      </SurfaceCard>

      <SurfaceCard className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)]">Campaigns</p>
            <h2 className="mt-1 text-xl font-semibold text-[var(--text-primary)]">Lead generation and education efforts</h2>
          </div>
          <Button onClick={openCampaignCreate}>Create campaign</Button>
        </div>
        <FilterBar
          query={campaignQuery}
          onQueryChange={setCampaignQuery}
          filterValue={campaignStatus}
          onFilterChange={setCampaignStatus}
          filterOptions={statusOptions}
          addLabel="Add campaign"
          onAdd={openCampaignCreate}
          resultCount={filteredCampaigns.length}
        />
        <CollectionView
          columns={campaignColumns}
          items={filteredCampaigns}
          emptyTitle="No campaigns yet"
          emptyDescription="Add a campaign to monitor marketing budgets, leads, and ROI."
          onCreate={openCampaignCreate}
          createLabel="Add campaign"
          onEdit={(item) => {
            setEditingCampaign(item)
            campaignModal.openModal()
          }}
          onDelete={(item) => {
            setDeleteState({ type: 'campaign', item })
            deleteModal.openModal()
          }}
        />
      </SurfaceCard>

      <CrudModal
        isOpen={projectModal.isOpen}
        title={editingProject ? 'Edit project' : 'Create project'}
        description="Persist a growth initiative and reflect its impact across analytics summary cards."
        fields={[
          { name: 'name', label: 'Project name', rules: validationRules.required('Project name') },
          { name: 'company', label: 'Company', rules: validationRules.required('Company') },
          { name: 'city', label: 'City', rules: validationRules.required('City') },
          { name: 'owner', label: 'Owner', rules: validationRules.required('Owner') },
          { name: 'investmentValue', label: 'AUM value', type: 'number', rules: validationRules.amount('AUM value', 1000) },
          { name: 'progress', label: 'Progress %', type: 'number', rules: { required: 'Progress is required.', min: { value: 0, message: 'Progress cannot be negative.' }, max: { value: 100, message: 'Progress cannot exceed 100%.' } } },
          { name: 'status', label: 'Status', type: 'select', options: statusOptions.filter((option) => option.value !== 'all'), rules: validationRules.required('Status') },
          { name: 'month', label: 'Month', type: 'select', options: monthOptions, rules: validationRules.required('Month') },
        ]}
        defaultValues={editingProject ?? { name: '', company: 'Gaur Investor Ltd', city: 'Meerut', owner: 'Tarun Raj Gaur', investmentValue: 0, progress: 0, status: 'On track', month: 'Apr' }}
        onClose={() => {
          projectModal.closeModal()
          setEditingProject(null)
        }}
        onSubmit={saveProject}
        submitLabel={editingProject ? 'Save project' : 'Create project'}
      />

      <CrudModal
        isOpen={campaignModal.isOpen}
        title={editingCampaign ? 'Edit campaign' : 'Create campaign'}
        description="Track acquisition activity with persistent campaign records and ROI metrics."
        fields={[
          { name: 'name', label: 'Campaign name', rules: validationRules.required('Campaign name') },
          { name: 'channel', label: 'Channel', type: 'select', options: campaignChannelOptions, rules: validationRules.required('Channel') },
          { name: 'budget', label: 'Budget', type: 'number', rules: validationRules.amount('Budget', 1000) },
          { name: 'leads', label: 'Leads', type: 'number', rules: validationRules.amount('Leads', 1) },
          { name: 'roi', label: 'ROI %', type: 'number', rules: { required: 'ROI is required.', min: { value: 0, message: 'ROI cannot be negative.' } } },
          { name: 'status', label: 'Status', type: 'select', options: statusOptions.filter((option) => option.value !== 'all'), rules: validationRules.required('Status') },
        ]}
        defaultValues={editingCampaign ?? { name: '', channel: 'WhatsApp', budget: 0, leads: 0, roi: 0, status: 'On track' }}
        onClose={() => {
          campaignModal.closeModal()
          setEditingCampaign(null)
        }}
        onSubmit={saveCampaign}
        submitLabel={editingCampaign ? 'Save campaign' : 'Create campaign'}
      />

      <ConfirmDialog
        isOpen={deleteModal.isOpen}
        title="Delete record"
        description={`This will permanently remove ${deleteState.item?.name ?? 'this item'} from the analytics dashboard.`}
        onClose={() => {
          deleteModal.closeModal()
          setDeleteState({ type: '', item: null })
        }}
        onConfirm={confirmDelete}
      />
    </div>
  )
}
