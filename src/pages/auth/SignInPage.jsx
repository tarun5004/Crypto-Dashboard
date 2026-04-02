// This sign-in page uses React Hook Form to create a mock session and enter the protected Gaur Investor Ltd workspace.
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { authHighlights, signInDefaults } from '../../data/authData.js'
import { useAuth } from '../../hooks/useAuth.js'
import { validationRules } from '../../utils/validation.js'
import { Button } from '../../components/common/Button.jsx'
import { FormInput } from '../../components/forms/FormInput.jsx'
import { Logo } from '../../components/common/Logo.jsx'

export const SignInPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: signInDefaults })

  const from = location.state?.from?.pathname || '/dashboard/analytics'

  const onSubmit = (values) => {
    login(values)
    navigate(from, { replace: true })
  }

  return (
    <div className="panel-surface-strong rounded-[36px] p-6 sm:p-8">
      <Logo />
      <div className="mt-8 space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">Mock access</p>
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--text-primary)]">Sign in to Gaur Investor Ltd</h1>
        <p className="text-sm leading-6 text-[var(--text-secondary)]">Use the demo credentials below or enter any valid email with a password of at least 6 characters to enter the protected dashboard.</p>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3 lg:hidden">
        {authHighlights.map((highlight) => (
          <div key={highlight.label} className="rounded-[22px] border border-[var(--border-soft)] bg-white p-4">
            <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--text-muted)]">{highlight.label}</p>
            <p className="mt-2 text-lg font-semibold text-[var(--text-primary)]">{highlight.value}</p>
          </div>
        ))}
      </div>

      <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <FormInput label="Email" name="email" type="email" register={register} error={errors.email} rules={validationRules.email} />
        <FormInput label="Password" name="password" type="password" register={register} error={errors.password} rules={validationRules.password} />
        <label className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
          <input type="checkbox" className="h-4 w-4 rounded border-[var(--border-soft)]" {...register('remember')} />
          Keep this India-first workspace signed in on this device
        </label>
        <div className="rounded-[24px] border border-[var(--border-soft)] bg-[var(--accent-soft)]/45 p-4 text-sm text-[var(--text-secondary)]">
          <p className="font-semibold text-[var(--text-primary)]">Demo credentials</p>
          <p className="mt-1">Email: {signInDefaults.email}</p>
          <p>Password: {signInDefaults.password}</p>
        </div>
        <Button type="submit" className="w-full">Enter workspace</Button>
      </form>
    </div>
  )
}
