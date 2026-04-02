import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { FormCheckbox } from '../forms/FormCheckbox.jsx'
import { FormInput } from '../forms/FormInput.jsx'
import { FormSelect } from '../forms/FormSelect.jsx'
import { FormTextarea } from '../forms/FormTextarea.jsx'
import { Button } from './Button.jsx'
import { Modal } from './Modal.jsx'

export const CrudModal = ({ isOpen, title, description, fields, defaultValues, onClose, onSubmit, submitLabel = 'Save' }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues })

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  const submitForm = (values) => {
    onSubmit(values)
  }

  return (
    <Modal
      isOpen={isOpen}
      title={title}
      description={description}
      onClose={onClose}
      footer={
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit(submitForm)}>{submitLabel}</Button>
        </div>
      }
    >
      <div className="grid gap-4 md:grid-cols-2">
        {fields.map((field) => {
          if (field.type === 'textarea') {
            return (
              <div key={field.name} className="md:col-span-2">
                <FormTextarea {...field} register={register} error={errors[field.name]} />
              </div>
            )
          }

          if (field.type === 'select') {
            return <FormSelect key={field.name} {...field} register={register} error={errors[field.name]} />
          }

          if (field.type === 'checkbox') {
            return (
              <div key={field.name} className="md:col-span-2">
                <FormCheckbox {...field} register={register} />
              </div>
            )
          }

          return <FormInput key={field.name} {...field} register={register} error={errors[field.name]} />
        })}
      </div>
    </Modal>
  )
}
