import { useReveal } from '../hooks/useReveal.js'

// Wraps children and fades/slides them up the first time they
// enter the viewport. `delay` staggers items in a group.
export default function Reveal({ children, delay = 0, className = '', as: Tag = 'div' }) {
  const [ref, visible] = useReveal()
  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'reveal--in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}
