import { Button } from './Button.jsx'
import { Modal } from './Modal.jsx'

export const ConfirmDialog = ({ isOpen, title, description, onClose, onConfirm, confirmLabel = 'Delete' }) => {
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
          <Button className="bg-rose-500 text-white hover:bg-rose-400" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      }
    />
  )
}
