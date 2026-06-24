import { useInView } from '../hooks/useInView.js'

// A full-viewport "slide". When it scrolls into view it gets the
// `is-active` class, which triggers all the child entrance animations
// (elements with .anim / AnimatedTitle inside). Scroll away and back
// and they play again.
export default function Slide({ id, className = '', width = 'wide', threshold = 0.4, children }) {
  const [ref, inView] = useInView(threshold)
  return (
    <section
      id={id}
      ref={ref}
      className={`slide ${inView ? 'is-active' : ''} ${className}`}
    >
      <div className={`slide__content slide__content--${width}`}>{children}</div>
    </section>
  )
}
