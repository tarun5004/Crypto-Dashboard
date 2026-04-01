// This sign-in page uses React Hook Form to mock authentication and enter the protected dashboard shell.
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { signInDefaults } from '../../data/authData.js'
import { useAuth } from '../../hooks/useAuth.js'
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
    <div className="panel-surface-strong rounded-[36px] p-8 sm:p-10">
      <Logo />
      <div className="mt-10 space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-300">Mock auth</p>
        <h1 className="text-3xl font-semibold text-white">Sign in to the dashboard suite</h1>
        <p className="text-sm leading-6 text-slate-400">Use the prefilled demo credentials or enter any valid email and a password with at least 6 characters.</p>
      </div>
      <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="Email"
          name="email"
          type="email"
          register={register}
          error={errors.email}
          rules={{
            required: 'Email is required.',
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email address.' },
          }}
        />
        <FormInput
          label="Password"
          name="password"
          type="password"
          register={register}
          error={errors.password}
          rules={{
            required: 'Password is required.',
            minLength: { value: 6, message: 'Password must be at least 6 characters.' },
          }}
        />
        <label className="flex items-center gap-3 text-sm text-slate-400">
          <input type="checkbox" className="h-4 w-4 rounded border-white/15 bg-slate-950" {...register('remember')} />
          Keep me signed in on this device
        </label>
        <Button type="submit" className="w-full">Enter workspace</Button>
      </form>
    </div>
  )
}

