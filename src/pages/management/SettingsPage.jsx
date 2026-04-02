// This settings page persists workspace preferences, theme controls, and notification CRUD from one responsive management surface.
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { settingsFormDefaults, settingsOverview, settingsPreferences, settingsSections, settingsSelectOptions } from '../../data/settingsData.js'
import { useAppContext } from '../../hooks/useAppContext.js'
import { useLocalStorage } from '../../hooks/useLocalStorage.js'
import { useModal } from '../../hooks/useModal.js'
import { useTheme } from '../../hooks/useTheme.js'
import { useToast } from '../../hooks/useToast.js'
import { COLLECTION_KEYS } from '../../utils/schemaVersion.js'
import { validationRules } from '../../utils/validation.js'
import { Button } from '../../components/common/Button.jsx'
import { CollectionView } from '../../components/common/CollectionView.jsx'
import { ConfirmDialog } from '../../components/common/ConfirmDialog.jsx'
import { CrudModal } from '../../components/common/CrudModal.jsx'
import { FormCheckbox } from '../../components/forms/FormCheckbox.jsx'
import { FormInput } from '../../components/forms/FormInput.jsx'
import { FormSelect } from '../../components/forms/FormSelect.jsx'
import { FormTextarea } from '../../components/forms/FormTextarea.jsx'
import { PageHeader } from '../../components/common/PageHeader.jsx'
import { SurfaceCard } from '../../components/common/SurfaceCard.jsx'

const buildDefaultSettings = () => ({
  ...settingsFormDefaults,
  weeklySummary: true,
  productUpdates: true,
  tradeWarnings: false,
})

const notificationCategoryOptions = [
  { value: 'Advisory', label: 'Advisory' },
  { value: 'Market', label: 'Market' },
  { value: 'Compliance', label: 'Compliance' },
  { value: 'Operations', label: 'Operations' },
]

export const SettingsPage = () => {
  const { success } = useToast()
  const themeContext = useTheme()
  const appContext = useAppContext()
  const [settings, setSettings] = useLocalStorage(COLLECTION_KEYS.settings, buildDefaultSettings())
  const notificationModal = useModal()
  const deleteModal = useModal()
  const [editingNotification, setEditingNotification] = useState(null)
  const [deletingNotification, setDeletingNotification] = useState(null)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: settings })

  useEffect(() => {
    reset(settings)
  }, [reset, settings])

  const onSubmit = (values) => {
    setSettings(values)
    success('Settings saved locally.')
  }

  const notificationColumns = [
    { key: 'title', label: 'Title' },
    { key: 'category', label: 'Category' },
    {
      key: 'message',
      label: 'Message',
      render: (item) => <span className="line-clamp-2 max-w-[28rem]">{item.message}</span>,
    },
    { key: 'read', label: 'State', render: (item) => (item.read ? 'Read' : 'Unread') },
  ]

  const saveNotification = (values) => {
    if (editingNotification) {
      appContext.updateNotification(editingNotification.id, values)
      success('Notification updated successfully.')
    } else {
      appContext.createNotification(values)
      success('Notification created successfully.')
    }

    notificationModal.closeModal()
    setEditingNotification(null)
  }

  const removeNotification = () => {
    if (!deletingNotification) {
      return
    }

    appContext.deleteNotification(deletingNotification.id)
    success('Notification deleted successfully.')
    deleteModal.closeModal()
    setDeletingNotification(null)
  }

  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Workspace"
        title={settingsOverview.title}
        description={settingsOverview.description}
        actions={<Button form="settings-form">Save settings</Button>}
      />

      <div className="grid gap-4 xl:grid-cols-[0.34fr_1fr]">
        <SurfaceCard className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)]">Sections</p>
          {settingsSections.map((section) => (
            <div key={section} className="rounded-2xl border border-[var(--border-soft)] bg-white/70 px-4 py-3 text-sm font-medium text-[var(--text-primary)]">
              {section}
            </div>
          ))}
          <div className="rounded-[24px] border border-[var(--border-soft)] bg-[var(--accent-soft)]/45 p-4">
            <p className="text-sm font-semibold text-[var(--text-primary)]">Theme mode</p>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">Current mode: {themeContext.theme === 'light' ? 'Azure Light' : 'Dark'}</p>
            <div className="mt-3 flex gap-2">
              <Button className="flex-1" variant="secondary" onClick={() => themeContext.setTheme('light')}>Light</Button>
              <Button className="flex-1" variant="secondary" onClick={() => themeContext.setTheme('dark')}>Dark</Button>
            </div>
            <Button className="mt-2 w-full" onClick={themeContext.toggleTheme}>Toggle mode</Button>
          </div>
        </SurfaceCard>

        <div className="space-y-4">
          <form id="settings-form" className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <SurfaceCard className="space-y-5">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)]">Public info</p>
                <h2 className="mt-1 text-xl font-semibold text-[var(--text-primary)]">Profile settings</h2>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <FormInput label="Username" name="username" register={register} error={errors.username} rules={validationRules.required('Username')} />
                <FormInput label="Email" name="email" type="email" register={register} error={errors.email} rules={validationRules.email} />
              </div>
              <FormTextarea label="Biography" name="bio" register={register} error={errors.bio} rules={validationRules.required('Biography')} />
            </SurfaceCard>

            <SurfaceCard className="space-y-5">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)]">Private info</p>
                <h2 className="mt-1 text-xl font-semibold text-[var(--text-primary)]">Location and defaults</h2>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <FormInput label="First name" name="firstName" register={register} error={errors.firstName} rules={validationRules.required('First name')} />
                <FormInput label="Last name" name="lastName" register={register} error={errors.lastName} rules={validationRules.required('Last name')} />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <FormInput label="Address line 1" name="addressLine1" register={register} error={errors.addressLine1} rules={validationRules.required('Address line 1')} />
                <FormInput label="Address line 2" name="addressLine2" register={register} error={errors.addressLine2} />
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <FormInput label="City" name="city" register={register} error={errors.city} rules={validationRules.required('City')} className="xl:col-span-2" />
                <FormInput label="State" name="state" register={register} error={errors.state} rules={validationRules.required('State')} />
                <FormInput label="PIN" name="zip" register={register} error={errors.zip} rules={validationRules.required('PIN')} />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <FormSelect label="Timezone" name="timezone" register={register} options={settingsSelectOptions.timezone} error={errors.timezone} rules={validationRules.required('Timezone')} />
                <FormSelect label="Language" name="language" register={register} options={settingsSelectOptions.language} error={errors.language} rules={validationRules.required('Language')} />
              </div>
            </SurfaceCard>

            <SurfaceCard className="space-y-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)]">Preferences</p>
                <h2 className="mt-1 text-xl font-semibold text-[var(--text-primary)]">Alerts and investor communication</h2>
              </div>
              {settingsPreferences.map((preference) => (
                <FormCheckbox key={preference.id} name={preference.id} register={register} label={preference.label} description={preference.description} />
              ))}
              <div className="flex justify-end">
                <Button type="submit">Save changes</Button>
              </div>
            </SurfaceCard>
          </form>

          <SurfaceCard className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)]">Notifications</p>
                <h2 className="mt-1 text-xl font-semibold text-[var(--text-primary)]">Unread badge management</h2>
              </div>
              <Button onClick={() => { setEditingNotification(null); notificationModal.openModal() }}>Add notification</Button>
            </div>
            <CollectionView
              columns={notificationColumns}
              items={appContext.notifications}
              emptyTitle="No notifications"
              emptyDescription="Create a system update, market alert, or advisory message for the shell badge and dropdown."
              onCreate={() => { setEditingNotification(null); notificationModal.openModal() }}
              createLabel="Add notification"
              onEdit={(item) => { setEditingNotification(item); notificationModal.openModal() }}
              onDelete={(item) => { setDeletingNotification(item); deleteModal.openModal() }}
            />
          </SurfaceCard>
        </div>
      </div>

      <CrudModal
        isOpen={notificationModal.isOpen}
        title={editingNotification ? 'Edit notification' : 'Create notification'}
        description="Manage lightweight shell notifications and keep the unread badge in sync with persisted records."
        fields={[
          { name: 'title', label: 'Title', rules: validationRules.required('Title') },
          { name: 'category', label: 'Category', type: 'select', options: notificationCategoryOptions, rules: validationRules.required('Category') },
          { name: 'message', label: 'Message', type: 'textarea', rules: validationRules.required('Message') },
          { name: 'read', label: 'Mark as read', type: 'checkbox', description: 'Unchecked records will contribute to the unread badge in the navbar.' },
        ]}
        defaultValues={editingNotification ?? { title: '', category: 'Advisory', message: '', read: false }}
        onClose={() => {
          notificationModal.closeModal()
          setEditingNotification(null)
        }}
        onSubmit={saveNotification}
        submitLabel={editingNotification ? 'Save notification' : 'Create notification'}
      />

      <ConfirmDialog
        isOpen={deleteModal.isOpen}
        title="Delete notification"
        description={`This will remove ${deletingNotification?.title ?? 'this notification'} from the shell feed.`}
        onClose={() => {
          deleteModal.closeModal()
          setDeletingNotification(null)
        }}
        onConfirm={removeNotification}
      />
    </div>
  )
}
