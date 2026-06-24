// Vertical pagination dots (right edge) that track which slide you're
// on and let you jump straight to any section — like a deck's slide
// rail. Hidden on small screens to keep phones clean.
export default function SideNav({ slides, active, onJump }) {
  return (
    <nav className="sidenav" aria-label="Section navigation">
      {slides.map((s, i) => (
        <button
          key={s.id}
          className={`sidenav__dot ${active === i ? 'is-active' : ''}`}
          onClick={() => onJump(s.id)}
          aria-label={`Go to ${s.label}`}
          aria-current={active === i}
        >
          <span className="sidenav__label">{s.label}</span>
        </button>
      ))}
    </nav>
  )
}
