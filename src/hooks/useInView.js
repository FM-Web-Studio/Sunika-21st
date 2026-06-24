import { useEffect, useRef, useState } from 'react'

// Like useReveal, but it RE-FIRES: it reports true whenever the
// element is on screen and false when it leaves. That's what makes
// each slide's animations replay every time you scroll back to it —
// the thing that makes it feel like a live presentation.
export function useInView(threshold = 0.35) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])

  return [ref, inView]
}
