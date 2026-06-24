import { useEffect, useRef, useState } from 'react'
import Starfield from './components/Starfield.jsx'
import Slide from './components/Slide.jsx'
import AnimatedTitle from './components/AnimatedTitle.jsx'
import SideNav from './components/SideNav.jsx'
import Intro from './components/Intro.jsx'
import Modal from './components/Modal.jsx'
import Tilt from './components/Tilt.jsx'
import Gallery from './components/Gallery.jsx'
import PaintCursor from './components/PaintCursor.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import { useInView } from './hooks/useInView.js'
import { content } from './content.js'
import './styles/app.css'

const SLIDES = [
  { id: 'hero', label: 'Welcome' },
  { id: 'details', label: 'Essentials' },
  { id: 'story', label: 'The Night' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'activities', label: 'Adventure' },
  { id: 'rsvp', label: 'RSVP' },
]

function Moon() {
  const ref = useRef(null)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const onMove = (e) => {
      const x = e.clientX / window.innerWidth - 0.5
      const y = e.clientY / window.innerHeight - 0.5
      if (ref.current) ref.current.style.transform = `translate(${x * -36}px, ${y * -36}px)`
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [])
  return (
    <div className="moon" ref={ref} aria-hidden="true">
      <div className="moon__halo" />
      <div className="moon__body" />
    </div>
  )
}

function Hero() {
  const [ref, inView] = useInView(0.4)
  const { hero } = content
  return (
    <section id="hero" ref={ref} className={`slide hero ${inView ? 'is-active' : ''}`}>
      <Moon />
      <div className="slide__content slide__content--wide hero__inner">
        <p className="hero__eyebrow anim" style={{ '--i': 0 }}>
          {hero.eyebrow}
        </p>
        <AnimatedTitle as="h1" className="hero__name" text={hero.name} />
        <span className="hero__occasion anim anim--scale" style={{ '--i': 3 }}>
          {hero.occasion}
        </span>
        <p className="hero__title anim" style={{ '--i': 4 }}>
          {hero.title}
        </p>
        <p className="hero__subtitle anim" style={{ '--i': 5 }}>
          {hero.subtitle}
        </p>
        <p className="hero__blurb anim" style={{ '--i': 6 }}>
          {hero.blurb}
        </p>
        <a className="hero__cta anim anim--scale" style={{ '--i': 7 }} href="#details">
          <span>Explore the night</span>
          <span className="hero__cta-arrow">↓</span>
        </a>
      </div>
      <div className="hero__scroll" aria-hidden="true">
        <span className="hero__scroll-dot" />
      </div>
    </section>
  )
}

function Details() {
  return (
    <Slide id="details" width="wide">
      <AnimatedTitle text="The Essentials" />
      <div className="details__grid">
        {content.details.map((d, i) => (
          <Tilt key={d.label} className="detail-card anim anim--up" style={{ '--i': i + 1 }}>
            <span className="detail-card__icon" aria-hidden="true">
              {d.icon}
            </span>
            <span className="detail-card__label">{d.label}</span>
            {d.tbd ? (
              <span className="detail-card__tbd">
                <span className="detail-card__tbd-tag">To be revealed</span>
                <span className="detail-card__tbd-note">{d.tbdNote}</span>
              </span>
            ) : (
              <span className="detail-card__value">{d.value}</span>
            )}
          </Tilt>
        ))}
      </div>
    </Slide>
  )
}

function Story() {
  const { story } = content
  return (
    <Slide id="story" width="narrow" className="story">
      <AnimatedTitle text={story.title} />
      {story.paragraphs.map((p, i) => (
        <p key={i} className="story__p anim" style={{ '--i': i + 1 }}>
          {p}
        </p>
      ))}
    </Slide>
  )
}

function Activities() {
  const { activities } = content
  const [open, setOpen] = useState(null)
  const item = open !== null ? activities.items[open] : null
  return (
    <Slide id="activities" width="wide">
      <AnimatedTitle text={activities.title} />
      <p className="section__intro anim" style={{ '--i': 1 }}>
        {activities.intro}
      </p>
      <div className="activities__grid">
        {activities.items.map((a, i) => (
          <Tilt key={a.title} className="activity-card anim anim--up" style={{ '--i': i + 1 }}>
            <button className="activity-card__btn" onClick={() => setOpen(i)}>
              <span className="activity-card__icon" aria-hidden="true">
                {a.icon}
              </span>
              <h3 className="activity-card__title">{a.title}</h3>
              <p className="activity-card__text">{a.text}</p>
              <span className="activity-card__more">Tap to peek →</span>
            </button>
          </Tilt>
        ))}
      </div>
      <Modal
        open={open !== null}
        onClose={() => setOpen(null)}
        icon={item?.icon}
        title={item?.title}
      >
        <p>{item?.detail}</p>
      </Modal>
    </Slide>
  )
}

function Rsvp() {
  const { rsvp, footer } = content
  return (
    <Slide id="rsvp" width="narrow" className="rsvp">
      <AnimatedTitle text={rsvp.title} />
      <p className="rsvp__text anim" style={{ '--i': 1 }}>
        {rsvp.text}
      </p>
      <span className="rsvp__note anim anim--scale" style={{ '--i': 2 }}>
        {rsvp.note}
      </span>
      <footer className="footer anim" style={{ '--i': 3 }}>
        <p className="footer__line">{footer.line}</p>
        <p className="footer__signoff">{footer.signoff}</p>
      </footer>
    </Slide>
  )
}

export default function App() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const els = SLIDES.map((s) => document.getElementById(s.id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = els.indexOf(e.target)
            if (idx >= 0) setActive(idx)
          }
        })
      },
      { threshold: 0.5 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const jump = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <>
      <Starfield />
      <div className="sky-wash" aria-hidden="true" />
      <div className="ambient" aria-hidden="true">
        <span className="blob blob--1" />
        <span className="blob blob--2" />
        <span className="blob blob--3" />
      </div>
      <Intro />
      <ScrollProgress />
      <PaintCursor />
      <SideNav slides={SLIDES} active={active} onJump={jump} />
      <main className="deck">
        <Hero />
        <Details />
        <Story />
        <Gallery />
        <Activities />
        <Rsvp />
      </main>
    </>
  )
}
