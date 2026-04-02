import { useEffect, useState } from 'react'

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.documentElement.classList.add('modal-open')
      window.addEventListener('keydown', closeOnEscape)
    }

    return () => {
      document.documentElement.classList.remove('modal-open')
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [isOpen])

  return {
    isOpen,
    openModal: () => setIsOpen(true),
    closeModal: () => setIsOpen(false),
    setIsOpen,
  }
}
