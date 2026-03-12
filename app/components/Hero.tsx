'use client'
import { useEffect, useRef, useState } from 'react'

const ROLES = [
  'Python Developer',
  'Backend Engineer',
  'AI / ML Engineer',
  'System Architect',
  'Tech Lead',
]

// 3D rotating sphere with Python-colored dots + orbit rings
function PythonSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef   = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const S = 280
    canvas.width = S; canvas.height = S
    const cx = S / 2, cy = S / 2
    let t = 0

    const ICONS = [
      { label: 'dj',      sub: 'Django',     color: '#092e20', text: '#44b78b', angle: 0 },
      { label: '⚡',      sub: 'FastAPI',    color: '#059669', text: '#ffffff', angle: Math.PI * 0.4 },
      { label: 'Flask',   sub: 'Flask',      color: '#1a1a2e', text: '#a0aec0', angle: Math.PI * 0.8 },
      { label: 'Go',      sub: 'Golang',     color: '#00acd7', text: '#ffffff', angle: Math.PI * 1.2 },
      { label: '🐘',      sub: 'PostgreSQL', color: '#336791', text: '#ffffff', angle: Math.PI * 1.6 },
      { label: '🐳',      sub: 'Docker',     color: '#2496ed', text: '#ffffff', angle: Math.PI * 2.0 },
    ]

    // Each icon has its own orbit state
    const iconStates = ICONS.map((ic, i) => ({
      ...ic,
      currentAngle: ic.angle,
      orbitRadius:  95,
      speed:        0.004 + (i % 2) * 0.002,
      bobOffset:    Math.random() * Math.PI * 2,
      scale:        1,
      targetScale:  1,
    }))

    const drawRoundRect = (x: number, y: number, w: number, h: number, r: number) => {
      ctx.beginPath()
      ctx.roundRect(x - w / 2, y - h / 2, w, h, r)
    }

    const drawPythonLogo = () => {
      // Center glow
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 52)
      glow.addColorStop(0,   'rgba(55,118,171,0.25)')
      glow.addColorStop(0.5, 'rgba(255,212,59,0.1)')
      glow.addColorStop(1,   'transparent')
      ctx.beginPath(); ctx.arc(cx, cy, 52, 0, Math.PI * 2)
      ctx.fillStyle = glow; ctx.fill()

      // Center card
      drawRoundRect(cx, cy, 72, 72, 16)
      const cardGrad = ctx.createLinearGradient(cx - 36, cy - 36, cx + 36, cy + 36)
      cardGrad.addColorStop(0, 'rgba(22,28,55,0.95)')
      cardGrad.addColorStop(1, 'rgba(12,16,40,0.98)')
      ctx.fillStyle = cardGrad; ctx.fill()
      ctx.strokeStyle = 'rgba(34,211,238,0.2)'; ctx.lineWidth = 1; ctx.stroke()

      // Python snake — blue body
      ctx.save(); ctx.translate(cx - 10, cy - 8); ctx.scale(0.72, 0.72)
      ctx.beginPath()
      ctx.roundRect(0, 0, 14, 26, 7)
      ctx.fillStyle = '#3776ab'
      ctx.shadowColor = '#3776ab'; ctx.shadowBlur = 8
      ctx.fill(); ctx.shadowBlur = 0

      // Blue head
      ctx.beginPath(); ctx.arc(7, 0, 7, 0, Math.PI * 2)
      ctx.fillStyle = '#3776ab'; ctx.fill()
      // Blue eye
      ctx.beginPath(); ctx.arc(9, -1, 2, 0, Math.PI * 2)
      ctx.fillStyle = '#fff'; ctx.fill()

      // Yellow body
      ctx.translate(14, 8)
      ctx.beginPath()
      ctx.roundRect(0, 0, 14, 26, 7)
      ctx.fillStyle = '#ffd43b'
      ctx.shadowColor = '#ffd43b'; ctx.shadowBlur = 8
      ctx.fill(); ctx.shadowBlur = 0

      // Yellow head
      ctx.beginPath(); ctx.arc(7, 26, 7, 0, Math.PI * 2)
      ctx.fillStyle = '#ffd43b'; ctx.fill()
      // Yellow eye
      ctx.beginPath(); ctx.arc(5, 27, 2, 0, Math.PI * 2)
      ctx.fillStyle = '#1a1a1a'; ctx.fill()

      ctx.restore()
    }

    const drawIcon = (
      x: number, y: number,
      label: string, color: string, textColor: string,
      scale: number, alpha: number
    ) => {
      const W = 46 * scale, H = 46 * scale, R = 11 * scale

      // Card shadow/glow
      const ig = ctx.createRadialGradient(x, y, 0, x, y, W * 0.8)
      ig.addColorStop(0,   `${color}33`)
      ig.addColorStop(1,   'transparent')
      ctx.beginPath(); ctx.arc(x, y, W * 0.8, 0, Math.PI * 2)
      ctx.fillStyle = ig; ctx.globalAlpha = alpha; ctx.fill()

      // Card background
      drawRoundRect(x, y, W, H, R)
      ctx.fillStyle = color
      ctx.globalAlpha = alpha * 0.92; ctx.fill()
      ctx.strokeStyle = `rgba(255,255,255,0.1)`
      ctx.lineWidth = 0.8; ctx.stroke()

      // Shine
      drawRoundRect(x, y - H * 0.15, W * 0.85, H * 0.4, R * 0.7)
      ctx.fillStyle = 'rgba(255,255,255,0.06)'
      ctx.globalAlpha = alpha; ctx.fill()

      // Label text
      const isEmoji = label.length <= 2 && /\p{Emoji}/u.test(label)
      ctx.font = isEmoji
        ? `${18 * scale}px serif`
        : `700 ${label.length > 2 ? 10 * scale : 14 * scale}px 'JetBrains Mono', monospace`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillStyle = textColor
      ctx.globalAlpha = alpha
      ctx.shadowColor = textColor; ctx.shadowBlur = 6
      ctx.fillText(label, x, y)
      ctx.shadowBlur = 0
      ctx.globalAlpha = 1
    }

    const draw = () => {
      ctx.clearRect(0, 0, S, S)
      t += 0.014

      // Faint orbit path
      ctx.beginPath(); ctx.arc(cx, cy, 95, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(34,211,238,0.05)'; ctx.lineWidth = 1
      ctx.setLineDash([3, 8]); ctx.stroke(); ctx.setLineDash([])

      // Update + draw icons
      iconStates.forEach((ic, i) => {
        ic.currentAngle += ic.speed
        const bob = Math.sin(t * 1.5 + ic.bobOffset) * 4
        const ix = cx + Math.cos(ic.currentAngle) * ic.orbitRadius
        const iy = cy + Math.sin(ic.currentAngle) * ic.orbitRadius * 0.55 + bob

        // Depth alpha — icons "behind" center are slightly dimmer
        const depth = Math.sin(ic.currentAngle)
        const alpha = 0.55 + 0.45 * ((depth + 1) / 2)
        const scale = 0.78 + 0.22 * ((depth + 1) / 2)

        drawIcon(ix, iy, ic.label, ic.color, ic.text, scale, alpha)

        // Sub-label
        ctx.font = `500 7px 'Inter', sans-serif`
        ctx.textAlign = 'center'
        ctx.fillStyle = `rgba(241,245,249,${alpha * 0.4})`
        ctx.globalAlpha = alpha
        ctx.fillText(ic.sub, ix, iy + 28 * scale)
        ctx.globalAlpha = 1
      })

      // Draw center Python logo on top
      drawPythonLogo()

      // Connecting lines from center to each icon (faint)
      iconStates.forEach(ic => {
        const ix = cx + Math.cos(ic.currentAngle) * ic.orbitRadius
        const iy = cy + Math.sin(ic.currentAngle) * ic.orbitRadius * 0.55
        const depth = (Math.sin(ic.currentAngle) + 1) / 2
        ctx.beginPath()
        ctx.moveTo(cx, cy)
        ctx.lineTo(ix, iy)
        ctx.strokeStyle = `rgba(34,211,238,${depth * 0.06})`
        ctx.lineWidth = 0.5; ctx.stroke()
      })

      animRef.current = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(animRef.current)
  }, [])

  return (
    <canvas ref={canvasRef} style={{
      filter: 'drop-shadow(0 0 24px rgba(55,118,171,0.2)) drop-shadow(0 0 48px rgba(255,212,59,0.08))',
    }} />
  )
}

export default function Hero() {
  const [roleIdx, setRoleIdx]   = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting]  = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const target = ROLES[roleIdx]
    let t: ReturnType<typeof setTimeout>
    if (!deleting && displayed.length < target.length)
      t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 75)
    else if (!deleting && displayed.length === target.length)
      t = setTimeout(() => setDeleting(true), 2000)
    else if (deleting && displayed.length > 0)
      t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 38)
    else { setDeleting(false); setRoleIdx(i => (i + 1) % ROLES.length) }
    return () => clearTimeout(t)
  }, [displayed, deleting, roleIdx])

  // Subtle parallax tilt on hero card
  const onMouseMove = (e: React.MouseEvent) => {
    const el = heroRef.current; if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top)  / rect.height - 0.5
    el.style.transform = `perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 4}deg)`
  }
  const onMouseLeave = () => {
    if (heroRef.current) heroRef.current.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)'
  }

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="home" style={{
      position: 'relative', zIndex: 10,
      minHeight: '100vh',
      display: 'flex', alignItems: 'center',
      padding: '0 3rem',
    }}>
      {/* Ambient radials */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: 'radial-gradient(ellipse at 70% 50%, rgba(139,92,246,0.07) 0%, transparent 55%), radial-gradient(ellipse at 20% 40%, rgba(34,211,238,0.06) 0%, transparent 50%)',
      }} />

      <div ref={heroRef}
        onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}
        style={{
          maxWidth: 1140, margin: '0 auto', width: '100%', zIndex: 10,
          display: 'grid', gridTemplateColumns: '1fr auto',
          gap: '4rem', alignItems: 'center',
          transition: 'transform 0.12s ease', transformStyle: 'preserve-3d',
        }}>

        {/* LEFT */}
        <div style={{ animation: 'fadeUp 0.9s ease both' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'rgba(34,211,238,0.07)', border: '1px solid rgba(34,211,238,0.18)',
            borderRadius: 20, padding: '0.3rem 0.9rem', marginBottom: '1.8rem',
          }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981', animation: 'pulse-glow 2s infinite' }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.3em', color: 'rgba(34,211,238,0.8)', textTransform: 'uppercase' }}>
              Available for Remote
            </span>
          </div>

          <h1 style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: 'clamp(3rem, 7.5vw, 5.5rem)',
            fontWeight: 800, lineHeight: 0.95,
            letterSpacing: '-0.03em',
            marginBottom: '0.4rem',
            background: 'linear-gradient(135deg, #fff 0%, #bfdbfe 50%, #22d3ee 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            Vishnu VP
          </h1>

          {/* Typewriter */}
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 'clamp(0.85rem, 2vw, 1.1rem)',
            color: 'rgba(34,211,238,0.7)',
            letterSpacing: '0.06em', marginBottom: '1.8rem', minHeight: '1.7rem',
          }}>
            <span style={{ color: 'rgba(139,92,246,0.6)' }}>{'> '}</span>
            {displayed}
            <span style={{ animation: 'blink 1s step-end infinite', color: '#22d3ee' }}>█</span>
          </div>

          <p style={{
            fontFamily: "'Inter', sans-serif", fontWeight: 300,
            fontSize: '1rem', lineHeight: 1.85,
            color: 'rgba(241,245,249,0.52)',
            maxWidth: 520, marginBottom: '1rem',
          }}>
            Associate Lead Software Engineer with 9+ years of
experience specializing in backend-driven full-stack
development, microservices architecture and cloud hosting. 
        
          </p>

          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.72rem', color: 'rgba(241,245,249,0.3)',
            letterSpacing: '0.08em', marginBottom: '2.4rem',
          }}>
            📍 Manjeri, Kerala, India
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button className="btn-primary" onClick={() => go('experience')}>
              View Experience →
            </button>
            <button className="btn-ghost" onClick={() => go('contact')}>
              Get In Touch
            </button>
          </div>
        </div>

        {/* RIGHT — 3D sphere + stats */}
        <div className="hero-right" style={{
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: '1.4rem',
          animation: 'fadeUp 0.9s 0.18s ease both',
        }}>
          <PythonSphere />

          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: '0.7rem', width: '100%',
          }}>
            {[
              { n: '9+', l: 'Years', color: '#22d3ee' },
              { n: '6yr', l: 'Python', color: '#fbbf24' },
              { n: '100M+', l: 'Records', color: '#10b981' },
              { n: '15+', l: 'Projects', color: '#8b5cf6' },
            ].map(({ n, l, color }, i) => (
              <div key={l} style={{
                textAlign: 'center', padding: '0.7rem 0.5rem',
                background: 'rgba(255,255,255,0.03)',
                border: `1px solid ${color}22`,
                borderRadius: 8,
                animation: `float ${4 + i * 0.5}s ease-in-out infinite`,
              }}>
                <div style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.35rem', fontWeight: 700, color, lineHeight: 1 }}>{n}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.5rem', letterSpacing: '0.2em', color: 'rgba(241,245,249,0.3)', textTransform: 'uppercase', marginTop: '0.3rem' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div style={{
        position: 'absolute', bottom: '2.5rem', left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
      }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.5rem', letterSpacing: '0.4em', color: 'rgba(241,245,249,0.2)' }}>SCROLL</span>
        <div style={{ width: 1, height: 36, background: 'linear-gradient(to bottom, #22d3ee, transparent)', animation: 'float 2s ease-in-out infinite' }} />
      </div>

      <style>{`@media(max-width:700px){.hero-right{display:none!important}}`}</style>
    </section>
  )
}
