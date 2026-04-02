// This pricing page manages advisory plans and FAQ entries with persisted CRUD flows and responsive collection views.
import { useMemo, useState } from 'react'
import { pricingFaqSeeds, pricingOverview, pricingPlanSeeds } from '../../data/pricingData.js'
import { useLocalStorageCollection } from '../../hooks/useLocalStorageCollection.js'
import { useModal } from '../../hooks/useModal.js'
import { useToast } from '../../hooks/useToast.js'
import { COLLECTION_KEYS } from '../../utils/schemaVersion.js'
import { formatCurrency } from '../../utils/formatters.js'
import { validationRules } from '../../utils/validation.js'
import { Button } from '../../components/common/Button.jsx'
import { CollectionView } from '../../components/common/CollectionView.jsx'
import { ConfirmDialog } from '../../components/common/ConfirmDialog.jsx'
import { CrudModal } from '../../components/common/CrudModal.jsx'
import { FilterBar } from '../../components/common/FilterBar.jsx'
import { PageHeader } from '../../components/common/PageHeader.jsx'
import { StatCard } from '../../components/common/StatCard.jsx'
import { SurfaceCard } from '../../components/common/SurfaceCard.jsx'

const featuredOptions = [
  { value: 'all', label: 'All plans' },
  { value: 'featured', label: 'Featured only' },
  { value: 'standard', label: 'Standard only' },
]

export const PricingPage = () => {
  const { success } = useToast()
  const plansCollection = useLocalStorageCollection(COLLECTION_KEYS.pricingPlans, pricingPlanSeeds, 'plan')
  const faqCollection = useLocalStorageCollection(COLLECTION_KEYS.pricingFaqs, pricingFaqSeeds, 'faq')
  const planModal = useModal()
  const faqModal = useModal()
  const deleteModal = useModal()
  const [planQuery, setPlanQuery] = useState('')
  const [faqQuery, setFaqQuery] = useState('')
  const [featuredFilter, setFeaturedFilter] = useState('all')
  const [editingPlan, setEditingPlan] = useState(null)
  const [editingFaq, setEditingFaq] = useState(null)
  const [deleteState, setDeleteState] = useState({ type: '', item: null })

  const filteredPlans = useMemo(() => {
    return plansCollection.items.filter((item) => {
      const matchesQuery = [item.name, item.description, ...(item.features || [])].join(' ').toLowerCase().includes(planQuery.toLowerCase())
      const matchesFeatured = featuredFilter === 'all' || (featuredFilter === 'featured' ? item.featured : !item.featured)
      return matchesQuery && matchesFeatured
    })
  }, [featuredFilter, planQuery, plansCollection.items])

  const filteredFaqs = useMemo(() => {
    return faqCollection.items.filter((item) => [item.question, item.answer].join(' ').toLowerCase().includes(faqQuery.toLowerCase()))
  }, [faqCollection.items, faqQuery])

  const stats = useMemo(() => {
    const featuredPlans = plansCollection.items.filter((item) => item.featured).length
    const averagePrice = plansCollection.items.length
      ? plansCollection.items.reduce((sum, item) => sum + Number(item.price || 0), 0) / plansCollection.items.length
      : 0

    return [
      { label: 'Plans', value: plansCollection.items.length, delta: 2.5, icon: 'pricing', subValue: 'Advisory packages' },
      { label: 'Featured', value: featuredPlans, delta: 1.4, icon: 'check', subValue: 'Highlighted offers' },
      { label: 'Avg Price', value: averagePrice, delta: 4.8, icon: 'wallet', format: 'currency', subValue: 'Monthly advisory fee' },
      { label: 'FAQs', value: faqCollection.items.length, delta: 3.2, icon: 'analytics', subValue: 'Self-serve answers' },
    ]
  }, [faqCollection.items.length, plansCollection.items])

  const planColumns = [
    {
      key: 'name',
      label: 'Plan',
      render: (item) => (
        <div>
          <p className="font-semibold text-[var(--text-primary)]">{item.name}</p>
          <p className="text-xs text-[var(--text-secondary)]">{item.description}</p>
        </div>
      ),
    },
    { key: 'price', label: 'Price', render: (item) => formatCurrency(Number(item.price || 0)) },
    { key: 'featured', label: 'Tier', render: (item) => (item.featured ? 'Featured' : 'Standard') },
    { key: 'features', label: 'Features', render: (item) => `${item.features?.length ?? 0} included` },
  ]

  const faqColumns = [
    { key: 'question', label: 'Question' },
    {
      key: 'answer',
      label: 'Answer',
      render: (item) => <span className="line-clamp-2 max-w-[28rem]">{item.answer}</span>,
    },
  ]

  const savePlan = (values) => {
    const payload = {
      ...values,
      price: Number(values.price),
      features: values.features.split(',').map((feature) => feature.trim()).filter(Boolean),
    }

    if (editingPlan) {
      plansCollection.updateItem(editingPlan.id, payload)
      success('Plan updated successfully.')
    } else {
      plansCollection.createItem(payload)
      success('Plan created successfully.')
    }

    planModal.closeModal()
    setEditingPlan(null)
  }

  const saveFaq = (values) => {
    if (editingFaq) {
      faqCollection.updateItem(editingFaq.id, values)
      success('FAQ updated successfully.')
    } else {
      faqCollection.createItem(values)
      success('FAQ created successfully.')
    }

    faqModal.closeModal()
    setEditingFaq(null)
  }

  const deleteRecord = () => {
    if (!deleteState.item) {
      return
    }

    if (deleteState.type === 'plan') {
      plansCollection.deleteItem(deleteState.item.id)
      success('Plan removed successfully.')
    }

    if (deleteState.type === 'faq') {
      faqCollection.deleteItem(deleteState.item.id)
      success('FAQ removed successfully.')
    }

    deleteModal.closeModal()
    setDeleteState({ type: '', item: null })
  }

  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Commercial"
        title={pricingOverview.title}
        description={pricingOverview.description}
        actions={
          <>
            <Button variant="secondary" onClick={() => { setEditingFaq(null); faqModal.openModal() }}>Add FAQ</Button>
            <Button onClick={() => { setEditingPlan(null); planModal.openModal() }}>Add plan</Button>
          </>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <StatCard key={item.label} item={item} money={item.format === 'currency'} />
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.2fr_1fr]">
        <SurfaceCard className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)]">Plans</p>
              <h2 className="mt-1 text-xl font-semibold text-[var(--text-primary)]">Advisory packages</h2>
            </div>
            <Button onClick={() => { setEditingPlan(null); planModal.openModal() }}>Create plan</Button>
          </div>
          <FilterBar
            query={planQuery}
            onQueryChange={setPlanQuery}
            filterValue={featuredFilter}
            onFilterChange={setFeaturedFilter}
            filterOptions={featuredOptions}
            addLabel="Add plan"
            onAdd={() => { setEditingPlan(null); planModal.openModal() }}
            resultCount={filteredPlans.length}
          />
          <CollectionView
            columns={planColumns}
            items={filteredPlans}
            emptyTitle="No plans found"
            emptyDescription="Create advisory plans to organize your commercial offering."
            onCreate={() => { setEditingPlan(null); planModal.openModal() }}
            createLabel="Add plan"
            onEdit={(item) => { setEditingPlan(item); planModal.openModal() }}
            onDelete={(item) => { setDeleteState({ type: 'plan', item }); deleteModal.openModal() }}
          />
        </SurfaceCard>

        <SurfaceCard className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)]">FAQs</p>
              <h2 className="mt-1 text-xl font-semibold text-[var(--text-primary)]">Investor enablement content</h2>
            </div>
            <Button variant="secondary" onClick={() => { setEditingFaq(null); faqModal.openModal() }}>Create FAQ</Button>
          </div>
          <FilterBar
            query={faqQuery}
            onQueryChange={setFaqQuery}
            filterValue="all"
            onFilterChange={() => {}}
            filterOptions={[]}
            addLabel="Add FAQ"
            onAdd={() => { setEditingFaq(null); faqModal.openModal() }}
            resultCount={filteredFaqs.length}
          />
          <CollectionView
            columns={faqColumns}
            items={filteredFaqs}
            emptyTitle="No FAQ entries found"
            emptyDescription="Add investor FAQs to support plan comparison and onboarding."
            onCreate={() => { setEditingFaq(null); faqModal.openModal() }}
            createLabel="Add FAQ"
            onEdit={(item) => { setEditingFaq(item); faqModal.openModal() }}
            onDelete={(item) => { setDeleteState({ type: 'faq', item }); deleteModal.openModal() }}
          />
        </SurfaceCard>
      </div>

      <CrudModal
        isOpen={planModal.isOpen}
        title={editingPlan ? 'Edit plan' : 'Create plan'}
        description="Maintain India-ready advisory packages with pricing, positioning, and included features."
        fields={[
          { name: 'name', label: 'Plan name', rules: validationRules.required('Plan name') },
          { name: 'price', label: 'Monthly price', type: 'number', rules: validationRules.amount('Monthly price', 0) },
          { name: 'description', label: 'Description', type: 'textarea', rules: validationRules.required('Description') },
          { name: 'features', label: 'Features (comma separated)', type: 'textarea', rules: validationRules.required('Features') },
          { name: 'featured', label: 'Mark as featured', type: 'checkbox', description: 'Use this for the highlighted plan on the pricing page.' },
        ]}
        defaultValues={editingPlan ? { ...editingPlan, features: editingPlan.features.join(', ') } : { name: '', price: 0, description: '', features: '', featured: false }}
        onClose={() => {
          planModal.closeModal()
          setEditingPlan(null)
        }}
        onSubmit={savePlan}
        submitLabel={editingPlan ? 'Save plan' : 'Create plan'}
      />

      <CrudModal
        isOpen={faqModal.isOpen}
        title={editingFaq ? 'Edit FAQ' : 'Create FAQ'}
        description="Answer common investor questions and keep pricing communication sharp across the platform."
        fields={[
          { name: 'question', label: 'Question', rules: validationRules.required('Question') },
          { name: 'answer', label: 'Answer', type: 'textarea', rules: validationRules.required('Answer') },
        ]}
        defaultValues={editingFaq ?? { question: '', answer: '' }}
        onClose={() => {
          faqModal.closeModal()
          setEditingFaq(null)
        }}
        onSubmit={saveFaq}
        submitLabel={editingFaq ? 'Save FAQ' : 'Create FAQ'}
      />

      <ConfirmDialog
        isOpen={deleteModal.isOpen}
        title="Delete record"
        description={`This will remove ${deleteState.item?.name ?? deleteState.item?.question ?? 'this record'} from pricing management.`}
        onClose={() => {
          deleteModal.closeModal()
          setDeleteState({ type: '', item: null })
        }}
        onConfirm={deleteRecord}
      />
    </div>
  )
}
