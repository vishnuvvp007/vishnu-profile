'use client'
import { useRef, useEffect, useState } from 'react'

const HIGHLIGHTS = [
  { icon: '🐍', label: 'Python Expert', sub: '6 years core expertise' },
  { icon: '⚡', label: 'Golang Backend', sub: '4 years production systems' },
  { icon: '🤖', label: 'AI / ML Lead', sub: 'Rasa, NLP, fraud detection' },
  { icon: '☁️', label: 'Cloud & DevOps', sub: 'AWS, Docker, Microservices' },
]

export default function About() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.15 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="about" ref={ref} style={{ position: 'relative', zIndex: 10, padding: '7rem 3rem' }}>
      <div style={{ maxWidth: 1140, margin: '0 auto' }}>
        <span className="section-label">01 / About</span>
        <h2 className="section-title" style={{ marginBottom: '3.5rem' }}>
          Who I <span>Am</span>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>

          {/* Left: bio */}
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateX(0)' : 'translateX(-24px)', transition: 'all 0.7s' }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '1.02rem', lineHeight: 1.95, color: 'rgba(241,245,249,0.6)', marginBottom: '1.4rem' }}>
              I'm a <strong style={{ color: '#22d3ee', fontWeight: 500 }}>Senior Python & Backend Developer</strong> with 9+ years of experience designing and building scalable, high-performance systems. My primary stack is Python — with deep expertise in Django, FastAPI, Flask, and the entire ecosystem around it.
            </p>
          
            <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '1.02rem', lineHeight: 1.95, color: 'rgba(241,245,249,0.6)' }}>
             Currently an <strong style={{ color: '#8b5cf6', fontWeight: 500 }}>Associate Lead at Techversant Infotech</strong>, leading AI/LLM integrations, architectural planning, and team delivery across multiple products. Previously a Senior Application Developer at IBM building enterprise FastAPI microservices with Couchbase and Databricks.
            </p>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
              {['Python', 'Golang', 'Django', 'FastAPI', 'AI/ML', 'Microservices'].map(t => (
                <span key={t} className="tag-pill" style={{
                  background: 'rgba(34,211,238,0.07)',
                  border: '1px solid rgba(34,211,238,0.22)',
                  color: '#22d3ee',
                }}>{t}</span>
              ))}
            </div>
          </div>

          {/* Right: highlight cards */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(24px)',
            transition: 'all 0.7s 0.15s',
          }}>
            {HIGHLIGHTS.map(({ icon, label, sub }, i) => (
              <HighlightCard key={label} icon={icon} label={label} sub={sub} delay={i * 0.08} />
            ))}
          </div>
        </div>
      </div>

      <style>{`@media(max-width:768px){#about .grid-2{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}

function HighlightCard({ icon, label, sub, delay }: { icon: string; label: string; sub: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current; if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(500px) rotateX(${-y * 14}deg) rotateY(${x * 14}deg) translateZ(6px)`
    el.style.borderColor = 'rgba(34,211,238,0.3)'
  }
  const onLeave = () => {
    const el = ref.current; if (!el) return
    el.style.transform = 'perspective(500px) rotateX(0) rotateY(0) translateZ(0)'
    el.style.borderColor = 'rgba(255,255,255,0.07)'
  }

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      className="card-surface"
      style={{
        padding: '1.4rem', cursor: 'default',
        transformStyle: 'preserve-3d', transition: 'transform 0.15s ease, border-color 0.25s',
        animationDelay: `${delay}s`,
      }}>
      <div style={{ fontSize: '1.8rem', marginBottom: '0.7rem' }}>{icon}</div>
      <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: '0.88rem', color: '#f1f5f9', marginBottom: '0.3rem' }}>{label}</div>
      <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '0.75rem', color: 'rgba(241,245,249,0.38)', lineHeight: 1.5 }}>{sub}</div>
    </div>
  )
}
