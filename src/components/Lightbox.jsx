import { useEffect, useRef } from 'react'

// Fullscreen popup viewer for gallery images. Supports prev/next
// buttons, arrow keys, Esc to close, click-the-backdrop to close,
// and swipe on touch screens.
export default function Lightbox({ images, index, onClose, onNavigate }) {
  const touchX = useRef(null)
  const img = images[index]

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') onNavigate(1)
      else if (e.key === 'ArrowLeft') onNavigate(-1)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, onNavigate])

  const onTouchStart = (e) => (touchX.current = e.touches[0].clientX)
  const onTouchEnd = (e) => {
    if (touchX.current == null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    if (Math.abs(dx) > 50) onNavigate(dx < 0 ? 1 : -1)
    touchX.current = null
  }

  return (
    <div className="lightbox" onClick={onClose} role="dialog" aria-modal="true" aria-label="Image viewer">
      <button className="lightbox__close" onClick={onClose} aria-label="Close">
        ×
      </button>

      <button
        className="lightbox__nav lightbox__nav--prev"
        onClick={(e) => {
          e.stopPropagation()
          onNavigate(-1)
        }}
        aria-label="Previous image"
      >
        ‹
      </button>

      <figure
        className="lightbox__stage"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <img key={img.src} className="lightbox__img" src={img.src} alt={img.name} />
        <figcaption className="lightbox__caption">
          <span>{img.name}</span>
          <span className="lightbox__count">
            {index + 1} / {images.length}
          </span>
        </figcaption>
      </figure>

      <button
        className="lightbox__nav lightbox__nav--next"
        onClick={(e) => {
          e.stopPropagation()
          onNavigate(1)
        }}
        aria-label="Next image"
      >
        ›
      </button>
    </div>
  )
}
