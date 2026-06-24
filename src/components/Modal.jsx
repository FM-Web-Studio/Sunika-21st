import { useEffect } from 'react'

// A centered popup with a scale-in flourish, used for the activity
// "peek" cards. Esc / backdrop / button all close it.
export default function Modal({ open, onClose, icon, title, children }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="modal" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal__card" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <div className="modal__icon" aria-hidden="true">
          {icon}
        </div>
        <h3 className="modal__title">{title}</h3>
        <div className="modal__body">{children}</div>
      </div>
    </div>
  )
}
