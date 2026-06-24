import { useRef } from 'react'

// Gives children a playful 3D tilt that follows the cursor, plus a
// lift. Pointer-only — touch devices just get the normal hover state.
export default function Tilt({ children, className = '', style, max = 9, lift = 6 }) {
  const ref = useRef(null)

  const handleMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(800px) rotateX(${-py * max}deg) rotateY(${px * max}deg) translateY(-${lift}px)`
  }

  const reset = () => {
    if (ref.current) ref.current.style.transform = ''
  }

  return (
    <div
      ref={ref}
      className={`tilt ${className}`}
      style={style}
      onPointerMove={(e) => e.pointerType === 'mouse' && handleMove(e)}
      onPointerLeave={reset}
    >
      {children}
    </div>
  )
}
