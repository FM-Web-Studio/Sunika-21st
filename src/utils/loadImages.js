// Auto-discovers every image dropped into src/gallery/ at build time.
// Vite's import.meta.glob scans the folder so the user never has to
// register files by hand — drop an image in, it shows up in the gallery.
const modules = import.meta.glob(
  '../gallery/*.{jpg,jpeg,png,webp,avif,gif,svg,JPG,JPEG,PNG,WEBP,AVIF,GIF,SVG}',
  { eager: true, import: 'default' },
)

export const galleryImages = Object.entries(modules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, src]) => {
    const file = path.split('/').pop()
    // turn "01-paint-night.jpg" into "Paint Night" for the caption
    const name = file
      .replace(/\.[^.]+$/, '')
      .replace(/^[0-9]+[-_\s]*/, '')
      .replace(/[-_]+/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase())
    return { src, name, file }
  })
