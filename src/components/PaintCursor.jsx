import { useEffect } from 'react'

// A trail of paint dabs follows the cursor, and every click bursts a
// little splatter of colour. Mouse-only and disabled for users who
// prefer reduced motion, so it never gets in the way on phones.
const COLORS = ['#ffd86b', '#4a76d4', '#36c2c2', '#e8927c', '#2f57c4', '#fff8e1']

export default function PaintCursor() {
  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return

    const layer = document.createElement('div')
    layer.className = 'paint-layer'
    document.body.appendChild(layer)

    const pick = () => COLORS[Math.floor(Math.random() * COLORS.length)]

    const dab = (x, y, size, burst) => {
      const d = document.createElement('span')
      d.className = burst ? 'paint-dot paint-dot--burst' : 'paint-dot'
      d.style.left = x + 'px'
      d.style.top = y + 'px'
      d.style.width = size + 'px'
      d.style.height = size + 'px'
      d.style.background = pick()
      if (burst) {
        const a = Math.random() * Math.PI * 2
        const dist = Math.random() * 70 + 25
        d.style.setProperty('--tx', Math.cos(a) * dist + 'px')
        d.style.setProperty('--ty', Math.sin(a) * dist + 'px')
      }
      layer.appendChild(d)
      setTimeout(() => d.remove(), 950)
    }

    let last = 0
    const onMove = (e) => {
      const now = performance.now()
      if (now - last < 45) return
      last = now
      dab(e.clientX, e.clientY, Math.random() * 9 + 5, false)
    }
    const onDown = (e) => {
      for (let i = 0; i < 16; i++) dab(e.clientX, e.clientY, Math.random() * 13 + 5, true)
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerdown', onDown)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      layer.remove()
    }
  }, [])

  return null
}
