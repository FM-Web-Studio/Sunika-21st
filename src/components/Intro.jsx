import { useEffect, useState } from 'react'
import { content } from '../content.js'

// A paint-stroke wipe: the name sits on a panel of paint, then a brush
// sweeps across and the paint skews away to reveal the page, trailing
// fading bristle streaks. Auto-dismisses; tap to skip; skipped entirely
// for reduced-motion users.
const STREAKS = [
  { c: 'var(--star)', t: '20%', h: 14, d: '40ms' },
  { c: 'var(--teal)', t: '38%', h: 8, d: '120ms' },
  { c: 'var(--moon)', t: '52%', h: 18, d: '0ms' },
  { c: 'var(--rose)', t: '66%', h: 10, d: '180ms' },
  { c: 'var(--swirl-soft)', t: '80%', h: 12, d: '90ms' },
]

export default function Intro() {
  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const [leaving, setLeaving] = useState(false)
  const [gone, setGone] = useState(reduce)

  useEffect(() => {
    if (reduce) return
    const t1 = setTimeout(() => setLeaving(true), 1700)
    const t2 = setTimeout(() => setGone(true), 3050)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [reduce])

  if (gone) return null

  const skip = () => {
    setLeaving(true)
    setTimeout(() => setGone(true), 1300)
  }

  return (
    <div className={`intro ${leaving ? 'intro--leaving' : ''}`} onClick={skip} role="presentation">
      <div className="intro__fill" />
      <div className="intro__streaks" aria-hidden="true">
        {STREAKS.map((s, i) => (
          <span
            key={i}
            style={{ '--c': s.c, '--t': s.t, '--h': `${s.h}px`, '--d': s.d }}
          />
        ))}
      </div>
      <div className="intro__brush" aria-hidden="true">
        🖌️
      </div>
      <div className="intro__content">
        <p className="intro__eyebrow">{content.hero.eyebrow}</p>
        <h1 className="intro__name">{content.hero.name}</h1>
        <p className="intro__sub">{content.hero.occasion.replace(/^['’]s\s*/, '')}</p>
        <span className="intro__hint">tap to enter</span>
      </div>
    </div>
  )
}
