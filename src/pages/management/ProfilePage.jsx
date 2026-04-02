// This profile page persists advisor identity data plus CRUD-managed social links and activity notes for the primary user profile.
import { useState } from 'react'
import { profileActivitySeeds, profileLinkSeeds, profileOverview, profileSeed } from '../../data/profileData.js'
import { useLocalStorage } from '../../hooks/useLocalStorage.js'
import { useLocalStorageCollection } from '../../hooks/useLocalStorageCollection.js'
import { useModal } from '../../hooks/useModal.js'
import { useToast } from '../../hooks/useToast.js'
import { COLLECTION_KEYS } from '../../utils/schemaVersion.js'
import { validationRules } from '../../utils/validation.js'
import { Avatar } from '../../components/common/Avatar.jsx'
import { Button } from '../../components/common/Button.jsx'
import { CollectionView } from '../../components/common/CollectionView.jsx'
import { ConfirmDialog } from '../../components/common/ConfirmDialog.jsx'
import { CrudModal } from '../../components/common/CrudModal.jsx'
import { PageHeader } from '../../components/common/PageHeader.jsx'
import { SurfaceCard } from '../../components/common/SurfaceCard.jsx'

export const ProfilePage = () => {
  const { success } = useToast()
  const [profile, setProfile] = useLocalStorage(COLLECTION_KEYS.profile, profileSeed)
  const linksCollection = useLocalStorageCollection(COLLECTION_KEYS.profileLinks, profileLinkSeeds, 'profile-link')
  const activityCollection = useLocalStorageCollection(COLLECTION_KEYS.profileActivity, profileActivitySeeds, 'profile-activity')
  const profileModal = useModal()
  const linkModal = useModal()
  const activityModal = useModal()
  const deleteModal = useModal()
  const [editingLink, setEditingLink] = useState(null)
  const [editingActivity, setEditingActivity] = useState(null)
  const [deleteState, setDeleteState] = useState({ type: '', item: null })

  const linkColumns = [
    { key: 'label', label: 'Channel' },
    { key: 'value', label: 'Value' },
  ]

  const activityColumns = [
    { key: 'title', label: 'Note' },
    { key: 'time', label: 'Date' },
    {
      key: 'body',
      label: 'Summary',
      render: (item) => <span className="line-clamp-2 max-w-[30rem]">{item.body}</span>,
    },
  ]

  const saveProfile = (values) => {
    setProfile(values)
    success('Profile updated successfully.')
    profileModal.closeModal()
  }

  const saveLink = (values) => {
    if (editingLink) {
      linksCollection.updateItem(editingLink.id, values)
      success('Profile link updated successfully.')
    } else {
      linksCollection.createItem(values)
      success('Profile link added successfully.')
    }

    linkModal.closeModal()
    setEditingLink(null)
  }

  const saveActivity = (values) => {
    if (editingActivity) {
      activityCollection.updateItem(editingActivity.id, values)
      success('Activity note updated successfully.')
    } else {
      activityCollection.createItem(values)
      success('Activity note added successfully.')
    }

    activityModal.closeModal()
    setEditingActivity(null)
  }

  const deleteRecord = () => {
    if (!deleteState.item) {
      return
    }

    if (deleteState.type === 'link') {
      linksCollection.deleteItem(deleteState.item.id)
      success('Profile link removed successfully.')
    }

    if (deleteState.type === 'activity') {
      activityCollection.deleteItem(deleteState.item.id)
      success('Activity note removed successfully.')
    }

    deleteModal.closeModal()
    setDeleteState({ type: '', item: null })
  }

  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Identity"
        title={profileOverview.title}
        description={profileOverview.description}
        actions={<Button onClick={profileModal.openModal}>Edit profile</Button>}
      />

      <div className="grid gap-4 xl:grid-cols-[0.95fr_1.35fr]">
        <SurfaceCard className="space-y-5">
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
            <Avatar initials={profile.initials} size="xl" accent />
            <div>
              <p className="text-2xl font-semibold text-[var(--text-primary)]">{profile.name}</p>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">{profile.role}</p>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">{profile.company}</p>
            </div>
          </div>

          <div className="rounded-[24px] border border-[var(--border-soft)] bg-white/70 p-4 text-sm text-[var(--text-secondary)]">
            <p className="leading-6">{profile.bio}</p>
            <div className="mt-4 grid gap-3">
              <div className="flex items-center justify-between gap-3"><span>City</span><span className="font-medium text-[var(--text-primary)]">{profile.city}</span></div>
              <div className="flex items-center justify-between gap-3"><span>Home</span><span className="font-medium text-[var(--text-primary)]">{profile.hometown}</span></div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)]">Social links</p>
              <Button variant="secondary" onClick={() => { setEditingLink(null); linkModal.openModal() }}>Add link</Button>
            </div>
            <CollectionView
              columns={linkColumns}
              items={linksCollection.items}
              emptyTitle="No profile links"
              emptyDescription="Add website or social links so the profile stays complete."
              onCreate={() => { setEditingLink(null); linkModal.openModal() }}
              createLabel="Add link"
              onEdit={(item) => { setEditingLink(item); linkModal.openModal() }}
              onDelete={(item) => { setDeleteState({ type: 'link', item }); deleteModal.openModal() }}
            />
          </div>
        </SurfaceCard>

        <SurfaceCard className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)]">Activity notes</p>
              <h2 className="mt-1 text-xl font-semibold text-[var(--text-primary)]">Leadership and communication log</h2>
            </div>
            <Button onClick={() => { setEditingActivity(null); activityModal.openModal() }}>Add note</Button>
          </div>
          <CollectionView
            columns={activityColumns}
            items={activityCollection.items}
            emptyTitle="No activity notes"
            emptyDescription="Create a profile activity note to capture investor communication or leadership updates."
            onCreate={() => { setEditingActivity(null); activityModal.openModal() }}
            createLabel="Add note"
            onEdit={(item) => { setEditingActivity(item); activityModal.openModal() }}
            onDelete={(item) => { setDeleteState({ type: 'activity', item }); deleteModal.openModal() }}
          />
        </SurfaceCard>
      </div>

      <CrudModal
        isOpen={profileModal.isOpen}
        title="Edit profile"
        description="Update the advisor identity presented across the Gaur Investor Ltd workspace."
        fields={[
          { name: 'name', label: 'Name', rules: validationRules.required('Name') },
          { name: 'role', label: 'Role', rules: validationRules.required('Role') },
          { name: 'company', label: 'Company', rules: validationRules.required('Company') },
          { name: 'city', label: 'City', rules: validationRules.required('City') },
          { name: 'hometown', label: 'Hometown', rules: validationRules.required('Hometown') },
          { name: 'initials', label: 'Initials', rules: validationRules.required('Initials') },
          { name: 'bio', label: 'Bio', type: 'textarea', rules: validationRules.required('Bio') },
        ]}
        defaultValues={profile}
        onClose={profileModal.closeModal}
        onSubmit={saveProfile}
        submitLabel="Save profile"
      />

      <CrudModal
        isOpen={linkModal.isOpen}
        title={editingLink ? 'Edit profile link' : 'Add profile link'}
        description="Maintain the public and professional channels visible on the advisor profile."
        fields={[
          { name: 'label', label: 'Label', rules: validationRules.required('Label') },
          { name: 'value', label: 'Value', rules: validationRules.required('Value') },
        ]}
        defaultValues={editingLink ?? { label: '', value: '' }}
        onClose={() => {
          linkModal.closeModal()
          setEditingLink(null)
        }}
        onSubmit={saveLink}
        submitLabel={editingLink ? 'Save link' : 'Create link'}
      />

      <CrudModal
        isOpen={activityModal.isOpen}
        title={editingActivity ? 'Edit activity note' : 'Add activity note'}
        description="Capture leadership notes, investor communication, and platform updates in a persisted feed."
        fields={[
          { name: 'title', label: 'Title', rules: validationRules.required('Title') },
          { name: 'time', label: 'Date label', rules: validationRules.required('Date label') },
          { name: 'body', label: 'Details', type: 'textarea', rules: validationRules.required('Details') },
        ]}
        defaultValues={editingActivity ?? { title: '', time: '02 Apr 2026', body: '' }}
        onClose={() => {
          activityModal.closeModal()
          setEditingActivity(null)
        }}
        onSubmit={saveActivity}
        submitLabel={editingActivity ? 'Save note' : 'Create note'}
      />

      <ConfirmDialog
        isOpen={deleteModal.isOpen}
        title="Delete record"
        description={`This will remove ${deleteState.item?.label ?? deleteState.item?.title ?? 'this record'} from the profile page.`}
        onClose={() => {
          deleteModal.closeModal()
          setDeleteState({ type: '', item: null })
        }}
        onConfirm={deleteRecord}
      />
    </div>
  )
}
