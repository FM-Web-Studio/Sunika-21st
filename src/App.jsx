import Starfield from './components/Starfield.jsx'
import Reveal from './components/Reveal.jsx'
import { content } from './content.js'
import './styles/app.css'

function Moon() {
  return (
    <div className="moon" aria-hidden="true">
      <div className="moon__halo" />
      <div className="moon__body" />
    </div>
  )
}

function Hero() {
  const { hero } = content
  return (
    <header className="hero">
      <Moon />
      <div className="hero__inner">
        <p className="hero__eyebrow">{hero.eyebrow}</p>
        <h1 className="hero__name">
          {hero.name}
          <span className="hero__occasion">{hero.occasion}</span>
        </h1>
        <p className="hero__title">{hero.title}</p>
        <p className="hero__subtitle">{hero.subtitle}</p>
        <p className="hero__blurb">{hero.blurb}</p>
        <a className="hero__cta" href="#details">
          <span>Explore the night</span>
          <span className="hero__cta-arrow">↓</span>
        </a>
      </div>
      <div className="hero__scroll" aria-hidden="true">
        <span className="hero__scroll-dot" />
      </div>
    </header>
  )
}

function Details() {
  return (
    <section id="details" className="section details">
      <div className="wrap">
        <Reveal as="h2" className="section__title">
          The Essentials
        </Reveal>
        <div className="details__grid">
          {content.details.map((d, i) => (
            <Reveal key={d.label} delay={i * 90} className="detail-card">
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
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Story() {
  const { story } = content
  return (
    <section className="section story">
      <div className="wrap wrap--narrow">
        <Reveal as="h2" className="section__title">
          {story.title}
        </Reveal>
        {story.paragraphs.map((p, i) => (
          <Reveal key={i} delay={i * 120} className="story__p" as="p">
            {p}
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Activities() {
  const { activities } = content
  return (
    <section className="section activities">
      <div className="wrap">
        <Reveal as="h2" className="section__title">
          {activities.title}
        </Reveal>
        <Reveal as="p" className="section__intro" delay={80}>
          {activities.intro}
        </Reveal>
        <div className="activities__grid">
          {activities.items.map((a, i) => (
            <Reveal key={a.title} delay={i * 110} className="activity-card">
              <span className="activity-card__icon" aria-hidden="true">
                {a.icon}
              </span>
              <h3 className="activity-card__title">{a.title}</h3>
              <p className="activity-card__text">{a.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Rsvp() {
  const { rsvp } = content
  return (
    <section className="section rsvp">
      <div className="wrap wrap--narrow rsvp__inner">
        <Reveal as="h2" className="section__title">
          {rsvp.title}
        </Reveal>
        <Reveal as="p" className="rsvp__text" delay={90}>
          {rsvp.text}
        </Reveal>
        <Reveal className="rsvp__note" delay={160}>
          {rsvp.note}
        </Reveal>
      </div>
    </section>
  )
}

function Footer() {
  const { footer } = content
  return (
    <footer className="footer">
      <p className="footer__line">{footer.line}</p>
      <p className="footer__signoff">{footer.signoff}</p>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Starfield />
      <div className="sky-wash" aria-hidden="true" />
      <main className="page">
        <Hero />
        <Details />
        <Story />
        <Activities />
        <Rsvp />
        <Footer />
      </main>
    </>
  )
}
