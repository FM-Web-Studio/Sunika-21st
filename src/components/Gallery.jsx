import { useMemo, useState } from 'react'
import { galleryImages } from '../utils/loadImages.js'
import Slide from './Slide.jsx'
import AnimatedTitle from './AnimatedTitle.jsx'
import Tilt from './Tilt.jsx'
import Lightbox from './Lightbox.jsx'
import { content } from '../content.js'

export default function Gallery() {
  const [open, setOpen] = useState(null)
  const images = galleryImages
  const { gallery } = content

  const navigate = (dir) => setOpen((i) => (i + dir + images.length) % images.length)

  // Per-image randomness for the scatter / random pop-in. Computed once
  // so it stays stable across re-renders (e.g. opening the lightbox).
  const rnd = useMemo(
    () =>
      images.map(() => ({
        rot: (Math.random() * 16 - 8).toFixed(2), // -8°..8° scrapbook tilt
        delay: Math.floor(Math.random() * 900), // random pop time
        fdur: (Math.random() * 4 + 5).toFixed(2), // 5s..9s idle float
        fdelay: (-Math.random() * 5).toFixed(2), // desync the floats
      })),
    [images.length],
  )

  return (
    <Slide id="gallery" width="wide" className="gallery" threshold={0.25}>
      <AnimatedTitle text={gallery.title} />
      <p className="section__intro anim" style={{ '--i': 1 }}>
        {gallery.intro}
      </p>

      {images.length === 0 ? (
        <div className="gallery__empty anim" style={{ '--i': 2 }}>
          <span className="gallery__empty-icon">🖼️</span>
          <p>
            No photos yet. Drop images into <code>src/gallery/</code> and they’ll appear
            here automatically.
          </p>
        </div>
      ) : (
        <div className="gallery__grid">
          {images.map((img, i) => (
            <Tilt
              key={img.src}
              className="gallery__item pop"
              style={{ '--rot': `${rnd[i].rot}deg`, '--delay': `${rnd[i].delay}ms` }}
              max={7}
              lift={4}
            >
              <div
                className="gallery__float"
                style={{ '--fdur': `${rnd[i].fdur}s`, '--fdelay': `${rnd[i].fdelay}s` }}
              >
                <button
                  className="gallery__btn"
                  onClick={() => setOpen(i)}
                  aria-label={`Open ${img.name}`}
                >
                  <img className="gallery__img" src={img.src} alt={img.name} loading="lazy" />
                  <span className="gallery__overlay">
                    <span className="gallery__zoom">⤢</span>
                    <span className="gallery__name">{img.name}</span>
                  </span>
                </button>
              </div>
            </Tilt>
          ))}
        </div>
      )}

      {open !== null && (
        <Lightbox
          images={images}
          index={open}
          onClose={() => setOpen(null)}
          onNavigate={navigate}
        />
      )}
    </Slide>
  )
}
