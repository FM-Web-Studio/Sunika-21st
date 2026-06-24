// Splits a heading into words that rise up from behind a mask,
// staggered one after another — the polished title reveal you see
// in motion-design decks. Lives inside a Slide and plays when the
// slide becomes active.
export default function AnimatedTitle({ text, className = '', as: Tag = 'h2' }) {
  const words = text.split(' ')
  return (
    <Tag className={`atitle ${className}`} aria-label={text}>
      {words.map((w, i) => (
        <span className="atitle__word" key={i} aria-hidden="true">
          <span className="atitle__inner" style={{ '--i': i }}>
            {w}
          </span>
        </span>
      ))}
    </Tag>
  )
}
