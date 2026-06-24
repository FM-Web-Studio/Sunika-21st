import { useEffect, useRef } from 'react'

// A lightweight animated star canvas: twinkling stars with gentle
// parallax drift, plus the occasional shooting star. Fixed behind
// everything so the whole page feels like it's floating in the sky.
export default function Starfield() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width, height, dpr
    let stars = []
    let shooting = []
    let raf
    let t = 0

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // density scales with screen area, capped so phones stay smooth
      const count = Math.min(220, Math.floor((width * height) / 6500))
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.5 + 0.3,
        base: Math.random() * 0.5 + 0.3,
        twinkle: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.0015 + 0.0005,
        gold: Math.random() > 0.78,
      }))
    }

    const spawnShootingStar = () => {
      const startX = Math.random() * width * 0.8
      const startY = Math.random() * height * 0.4
      shooting.push({
        x: startX,
        y: startY,
        len: 0,
        maxLen: Math.random() * 140 + 80,
        vx: Math.random() * 4 + 5,
        vy: Math.random() * 2 + 1.5,
        life: 0,
      })
    }

    const draw = () => {
      t += 1
      ctx.clearRect(0, 0, width, height)

      for (const s of stars) {
        const flicker = reduce ? 1 : 0.55 + Math.sin(t * s.speed * 60 + s.twinkle) * 0.45
        const alpha = s.base * flicker
        if (s.gold) {
          ctx.fillStyle = `rgba(255, 216, 107, ${alpha})`
          ctx.shadowColor = 'rgba(255, 216, 107, 0.8)'
          ctx.shadowBlur = 6
        } else {
          ctx.fillStyle = `rgba(233, 236, 255, ${alpha})`
          ctx.shadowColor = 'rgba(180, 200, 255, 0.6)'
          ctx.shadowBlur = 3
        }
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.shadowBlur = 0

      // shooting stars
      for (let i = shooting.length - 1; i >= 0; i--) {
        const sh = shooting[i]
        sh.x += sh.vx
        sh.y += sh.vy
        sh.len = Math.min(sh.maxLen, sh.len + 8)
        sh.life += 1
        const tailX = sh.x - sh.vx * (sh.len / 8)
        const tailY = sh.y - sh.vy * (sh.len / 8)
        const grad = ctx.createLinearGradient(sh.x, sh.y, tailX, tailY)
        grad.addColorStop(0, 'rgba(255, 240, 200, 0.9)')
        grad.addColorStop(1, 'rgba(255, 240, 200, 0)')
        ctx.strokeStyle = grad
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(sh.x, sh.y)
        ctx.lineTo(tailX, tailY)
        ctx.stroke()
        if (sh.x > width + 50 || sh.y > height + 50 || sh.life > 120) {
          shooting.splice(i, 1)
        }
      }

      // occasionally launch one (not when reduced motion)
      if (!reduce && Math.random() < 0.004 && shooting.length < 2) {
        spawnShootingStar()
      }

      raf = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    if (reduce) {
      draw()
      cancelAnimationFrame(raf)
    } else {
      draw()
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="starfield" aria-hidden="true" />
}
