// This settings page uses React Hook Form to manage editable profile and workspace preferences from settings mock data.
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { settingsFormDefaults, settingsOverview, settingsPreferences, settingsSections, settingsSelectOptions } from '../../data/settingsData.js'
import { Button } from '../../components/common/Button.jsx'
import { FormCheckbox } from '../../components/forms/FormCheckbox.jsx'
import { FormInput } from '../../components/forms/FormInput.jsx'
import { FormSelect } from '../../components/forms/FormSelect.jsx'
import { FormTextarea } from '../../components/forms/FormTextarea.jsx'
import { PageHeader } from '../../components/common/PageHeader.jsx'
import { SurfaceCard } from '../../components/common/SurfaceCard.jsx'

export const SettingsPage = () => {
  const [saved, setSaved] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...settingsFormDefaults,
      weeklySummary: true,
      productUpdates: true,
      tradeWarnings: false,
    },
  })

  const onSubmit = () => {
    setSaved(true)
    window.setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Workspace" title={settingsOverview.title} description={settingsOverview.description} actions={<Button form="settings-form">Save changes</Button>} />

      <div className="grid gap-4 xl:grid-cols-[0.36fr_1fr]">
        <SurfaceCard className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Sections</p>
          {settingsSections.map((section, index) => (
            <div key={section} className={`rounded-2xl px-4 py-3 text-sm font-medium ${index === 0 ? 'bg-sky-500/15 text-sky-300' : 'bg-white/[0.03] text-slate-300'}`}>
              {section}
            </div>
          ))}
        </SurfaceCard>

        <form id="settings-form" className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <SurfaceCard className="space-y-5">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Public info</p>
              <h2 className="mt-2 text-xl font-semibold text-white">Profile settings</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <FormInput label="Username" name="username" register={register} error={errors.username} rules={{ required: 'Username is required.' }} placeholder="Username" />
              <FormInput label="Email" name="email" register={register} error={errors.email} rules={{ required: 'Email is required.', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email address.' } }} placeholder="Email" />
            </div>
            <FormTextarea label="Biography" name="bio" register={register} error={errors.bio} rules={{ required: 'Bio is required.' }} placeholder="Tell us something about yourself" />
          </SurfaceCard>

          <SurfaceCard className="space-y-5">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Private info</p>
              <h2 className="mt-2 text-xl font-semibold text-white">Location and defaults</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <FormInput label="First name" name="firstName" register={register} error={errors.firstName} rules={{ required: 'First name is required.' }} />
              <FormInput label="Last name" name="lastName" register={register} error={errors.lastName} rules={{ required: 'Last name is required.' }} />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <FormInput label="Address line 1" name="addressLine1" register={register} error={errors.addressLine1} rules={{ required: 'Address is required.' }} />
              <FormInput label="Address line 2" name="addressLine2" register={register} error={errors.addressLine2} />
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <FormInput label="City" name="city" register={register} error={errors.city} rules={{ required: 'City is required.' }} className="xl:col-span-2" />
              <FormInput label="State" name="state" register={register} error={errors.state} rules={{ required: 'State is required.' }} />
              <FormInput label="ZIP" name="zip" register={register} error={errors.zip} rules={{ required: 'ZIP is required.' }} />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <FormSelect label="Timezone" name="timezone" register={register} options={settingsSelectOptions.timezone} error={errors.timezone} rules={{ required: 'Timezone is required.' }} />
              <FormSelect label="Language" name="language" register={register} options={settingsSelectOptions.language} error={errors.language} rules={{ required: 'Language is required.' }} />
            </div>
          </SurfaceCard>

          <SurfaceCard className="space-y-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Preferences</p>
              <h2 className="mt-2 text-xl font-semibold text-white">Notifications and alerts</h2>
            </div>
            {settingsPreferences.map((preference) => (
              <FormCheckbox key={preference.id} name={preference.id} register={register} label={preference.label} description={preference.description} />
            ))}
            <div className="flex items-center gap-3">
              <Button type="submit">Save changes</Button>
              {saved ? <span className="text-sm text-emerald-300">Changes saved locally.</span> : null}
            </div>
          </SurfaceCard>
        </form>
      </div>
    </div>
  )
}

