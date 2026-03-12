'use client'
import { useRef, useEffect, useState } from 'react'
import { useReveal } from './UseReveal'

function RingOrbit() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef   = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const S = 240; canvas.width = S; canvas.height = S
    const cx = S / 2, cy = S / 2
    let t = 0

    const rings = [
      { r: 88,  tilt: 0.35,  speed:  0.014, color: '#22d3ee', dots: 30, active: 8 },
      { r: 70,  tilt: 1.15,  speed: -0.010, color: '#8b5cf6', dots: 22, active: 6 },
      { r: 52,  tilt: 1.90,  speed:  0.018, color: '#10b981', dots: 16, active: 4 },
      { r: 34,  tilt: 0.75,  speed: -0.022, color: '#fbbf24', dots: 10, active: 3 },
    ].map(o => ({ ...o, angle: Math.random() * Math.PI * 2 }))

    const draw = () => {
      ctx.clearRect(0, 0, S, S); t += 0.014

      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, 32)
      core.addColorStop(0, 'rgba(34,211,238,0.22)')
      core.addColorStop(0.5, 'rgba(139,92,246,0.1)')
      core.addColorStop(1, 'transparent')
      ctx.beginPath(); ctx.arc(cx, cy, 32, 0, Math.PI * 2)
      ctx.fillStyle = core; ctx.fill()

      ctx.font = "600 14px 'JetBrains Mono', monospace"
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
      ctx.fillStyle = '#22d3ee'
      ctx.shadowColor = '#22d3ee'; ctx.shadowBlur = 10
      ctx.fillText('VVP', cx, cy - 3)
      ctx.font = "300 8px 'Inter', sans-serif"
      ctx.fillStyle = 'rgba(241,245,249,0.35)'
      ctx.shadowBlur = 0
      ctx.fillText('Python Dev', cx, cy + 10)

      rings.forEach(ring => {
        ring.angle += ring.speed
        ctx.save(); ctx.translate(cx, cy); ctx.rotate(ring.tilt); ctx.scale(1, 0.28)

        ctx.beginPath(); ctx.arc(0, 0, ring.r, 0, Math.PI * 2)
        ctx.strokeStyle = ring.color + '30'; ctx.lineWidth = 1; ctx.stroke()

        for (let i = 0; i < ring.dots; i++) {
          const a = (i / ring.dots) * Math.PI * 2 + ring.angle
          const dx = Math.cos(a) * ring.r, dy = Math.sin(a) * ring.r
          const isActive = i < ring.active
          const alpha = isActive ? (0.5 + 0.5 * Math.sin(t * 3 + i)) : 0.18
          ctx.beginPath(); ctx.arc(dx, dy, isActive ? 2.2 : 1, 0, Math.PI * 2)
          ctx.fillStyle = ring.color + Math.round(alpha * 255).toString(16).padStart(2, '0')
          if (isActive) { ctx.shadowColor = ring.color; ctx.shadowBlur = 6 }
          ctx.fill(); ctx.shadowBlur = 0
        }

        const la = ring.angle * 2
        const lx = Math.cos(la) * ring.r, ly = Math.sin(la) * ring.r
        ctx.beginPath(); ctx.arc(lx, ly, 3.5, 0, Math.PI * 2)
        ctx.fillStyle = ring.color
        ctx.shadowColor = ring.color; ctx.shadowBlur = 14; ctx.fill(); ctx.shadowBlur = 0
        ctx.restore()
      })

      animRef.current = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(animRef.current)
  }, [])

  return <canvas ref={canvasRef} style={{ filter: 'drop-shadow(0 0 24px rgba(34,211,238,0.2))' }} />
}

const LINKS = [
  { icon: '📧', label: 'vishnuvvp007@gmail.com',  href: 'mailto:vishnuvvp007@gmail.com', color: '#22d3ee' },
  { icon: '📞', label: '+91 96 3375 2456',          href: 'tel:+919633752456',             color: '#8b5cf6' },
  { icon: '💼', label: 'linkedin.com/in/vishnuvvp', href: 'https://linkedin.com',          color: '#10b981' },
  { icon: '📍', label: 'Manjeri, Kerala — 676122',  href: '#',                             color: '#fbbf24' },
]

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const r1 = useReveal()
  const r2 = useReveal()
  const r3 = useReveal()
  const r4 = useReveal()

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="contact" ref={ref} style={{ position: 'relative', zIndex: 10, padding: '7rem 3rem', background: 'rgba(255,255,255,0.01)' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>

        <span className="section-label reveal" ref={r1 as any} style={{ display: 'block', textAlign: 'center' }}>
          04 / Contact
        </span>
        <h2 className="section-title reveal delay-1" ref={r1 as any} style={{ textAlign: 'center', marginBottom: '1rem' }}>
          Let's <span>Connect</span>
        </h2>

        <p ref={r2 as any} className="reveal delay-2" style={{
          fontFamily: "'Inter', sans-serif", fontWeight: 300,
          fontSize: '0.95rem', lineHeight: 1.85,
          color: 'rgba(241,245,249,0.44)', margin: '0 auto 3.5rem', maxWidth: 460,
        }}>
          Open to challenging Python/backend roles, AI/ML projects, and system architecture collaborations. Based in Kerala — fully remote-friendly.
        </p>

        <div ref={r3 as any} className="reveal delay-3" style={{
          display: 'flex', justifyContent: 'center',
          marginBottom: '3.5rem',
          animation: visible ? 'float 5s ease-in-out infinite' : 'none',
        }}>
          <RingOrbit />
        </div>

        <div ref={r4 as any} className="reveal delay-4" style={{
          display: 'flex', flexDirection: 'column', gap: '0.85rem', maxWidth: 460, margin: '0 auto',
        }}>
          {LINKS.map(({ icon, label, href, color }, i) => (
            <a key={i} href={href} style={{
              display: 'flex', alignItems: 'center', gap: '1.1rem',
              padding: '1rem 1.5rem',
              background: 'rgba(255,255,255,0.025)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 8, color: 'rgba(241,245,249,0.68)',
              textDecoration: 'none',
              fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: '0.88rem',
              transition: 'all 0.25s',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(-16px)',
              transitionDelay: `${i * 0.08 + 0.2}s`,
            }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = color + '45'
                el.style.background  = color + '0a'
                el.style.transform   = 'translateX(5px)'
                el.style.color       = '#f1f5f9'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'rgba(255,255,255,0.07)'
                el.style.background  = 'rgba(255,255,255,0.025)'
                el.style.transform   = 'translateX(0)'
                el.style.color       = 'rgba(241,245,249,0.68)'
              }}
            >
              <span style={{ fontSize: '1.1rem', width: 26, textAlign: 'center', flexShrink: 0 }}>{icon}</span>
              <span>{label}</span>
            </a>
          ))}
        </div>

      </div>
    </section>
  )
}