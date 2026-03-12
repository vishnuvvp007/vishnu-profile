'use client'
import { useRef, useEffect, useState } from 'react'
import { useReveal } from './UseReveal'

const SKILL_GROUPS = [
  {
    label: 'Python Ecosystem',
    color: '#22d3ee',
    icon: '🐍',
    skills: [
      { name: 'Python', level: 98 },
      { name: 'Django', level: 95 },
      { name: 'FastAPI', level: 90 },
      { name: 'Flask', level: 88 },
      { name: 'Django REST', level: 93 },
      { name: 'Celery', level: 85 },
    ],
  },
  {
    label: 'AI / Machine Learning',
    color: '#fbbf24',
    icon: '🤖',
    skills: [
      { name: 'Rasa (Chatbot)', level: 88 },
      { name: 'NLP', level: 82 },
      { name: 'Image Search', level: 80 },
      { name: 'Recommendation Engine', level: 83 },
      { name: 'Fraud Detection', level: 85 },
      { name: 'LLM Integration', level: 80 },
      { name: 'Databricks', level: 78 },
    ],
  },
  {
    label: 'Backend & APIs',
    color: '#8b5cf6',
    icon: '⚙️',
    skills: [
      { name: 'Golang', level: 88 },
      { name: 'Gorilla Mux', level: 85 },
      { name: 'Microservices', level: 90 },
      { name: 'REST API Design', level: 95 },
      { name: 'RabbitMQ', level: 82 },
      { name: 'Node.js', level: 72 },
    ],
  },
  {
    label: 'Databases',
    color: '#10b981',
    icon: '🗄️',
    skills: [
      { name: 'PostgreSQL', level: 92 },
      { name: 'MySQL', level: 88 },
      { name: 'MongoDB', level: 82 },
      { name: 'Redis', level: 85 },
      { name: 'Elasticsearch', level: 78 },
      { name: 'Couchbase', level: 75 },
    ],
  },
  {
    label: 'Cloud & DevOps',
    color: '#f43f5e',
    icon: '☁️',
    skills: [
      { name: 'AWS', level: 85 },
      { name: 'Docker', level: 88 },
      { name: 'CI/CD Pipelines', level: 82 },
      { name: 'GitHub / BitBucket', level: 90 },
      { name: 'Linux / Server Admin', level: 88 },
      { name: 'Nginx', level: 82 },
      { name: 'SonarQube', level: 78 },
    ],
  },
  {
    label: 'Additional Skills',
    color: '#6366f1',
    icon: '🛠️',
    skills: [
      { name: 'PHP', level: 72 },
      { name: 'Drupal / WordPress', level: 68 },
      { name: 'WhatsApp Chatbot', level: 80 },
      { name: 'MLM System Design', level: 85 },
      { name: 'DNS / CDN / S3', level: 80 },
      { name: 'Google Analytics / GTM', level: 75 },
      { name: 'Plugin Architecture', level: 82 },
      { name: 'WhatsApp Chatbot', level: 80 },
      { name: 'HRMS / LMS Platforms', level: 78 },
    ],
  },
]

function TiltCard({ color, icon, label, skills, delay, visible }: {
  color: string; icon: string; label: string
  skills: { name: string; level: number }[]
  delay: number; visible: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const shineRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current; if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    el.style.transform = `perspective(550px) rotateX(${(y - 0.5) * -16}deg) rotateY(${(x - 0.5) * 16}deg) translateZ(10px)`
    if (shineRef.current)
      shineRef.current.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, ${color}20 0%, transparent 65%)`
  }
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = 'perspective(550px) rotateX(0) rotateY(0) translateZ(0)'
    if (shineRef.current) shineRef.current.style.background = 'transparent'
    setHovered(false)
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onMouseEnter={() => setHovered(true)}
      style={{
        position: 'relative', overflow: 'hidden',
        background: 'rgba(255,255,255,0.025)',
        border: `1px solid ${hovered ? color + '35' : 'rgba(255,255,255,0.07)'}`,
        borderRadius: 12, padding: '1.8rem',
        cursor: 'default', transformStyle: 'preserve-3d',
        transition: `transform 0.15s ease, border-color 0.25s, box-shadow 0.25s`,
        boxShadow: hovered ? `0 12px 40px ${color}12` : 'none',
        opacity: visible ? 1 : 0,
        transitionDelay: `${delay}s`,
        animationFillMode: 'both',
      }}
    >
      {/* Shine layer */}
      <div ref={shineRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', transition: 'background 0.2s', borderRadius: 12, zIndex: 1 }} />

      <div style={{ position: 'relative', zIndex: 2 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '1.4rem' }}>
          <span style={{ fontSize: '1.5rem' }}>{icon}</span>
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.56rem', letterSpacing: '0.4em', color, textTransform: 'uppercase', opacity: 0.8, marginBottom: '0.15rem' }}>{label}</div>
            <div style={{ width: 28, height: 2, background: color, borderRadius: 1, opacity: 0.5 }} />
          </div>
        </div>

        {/* Skill bars */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {skills.map(({ name, level }) => (
            <div key={name}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.28rem' }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: '0.78rem', color: 'rgba(241,245,249,0.7)' }}>{name}</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: color + 'cc' }}>{level}%</span>
              </div>
              <div style={{ height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{
                  height: '100%', borderRadius: 2,
                  width: visible ? `${level}%` : '0%',
                  background: `linear-gradient(90deg, ${color}88, ${color})`,
                  transition: `width 1s ${delay + 0.3}s cubic-bezier(0.4,0,0.2,1)`,
                  boxShadow: `0 0 8px ${color}60`,
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const r1 = useReveal()
  const r2 = useReveal()
  const r3 = useReveal()

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.08 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="skills" ref={ref} style={{ position: 'relative', zIndex: 10, padding: '7rem 3rem', background: 'rgba(255,255,255,0.01)' }}>
      <div style={{ maxWidth: 1140, margin: '0 auto' }}>
        <span className="section-label reveal" ref={r1 as any}>02 / Skills</span>
        <h2 className="section-title reveal delay-1" style={{ marginBottom: '0.8rem' }} ref={r1 as any}>
          Technical <span>Expertise</span>
        </h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '0.95rem', color: 'rgba(241,245,249,0.4)', marginBottom: '3.5rem', maxWidth: 520 }}>
          8.9 years of hands-on expertise across the full backend stack — hover each card to explore.
        </p>

        <div ref={r2 as any} className="reveal delay-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.3rem' }}>
          {SKILL_GROUPS.map((g, i) => (
            <TiltCard key={g.label} {...g} delay={i * 0.07} visible={visible} />
          ))}
        </div>

        {/* Soft skills strip */}
        <div ref={r3 as any} className="reveal delay-3" style={{
          marginTop: '3rem', padding: '1.8rem 2rem',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 10, display: 'flex', flexWrap: 'wrap', gap: '0.7rem', alignItems: 'center',
        }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.58rem', letterSpacing: '0.35em', color: 'rgba(241,245,249,0.3)', textTransform: 'uppercase', marginRight: '0.5rem' }}>Soft Skills</span>
          {['Team Leadership', 'Project Management', 'Technical Documentation', 'Database Design', 'Mentorship', 'Code Review', 'Agile'].map(s => (
            <span key={s} className="tag-pill" style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)', color: '#a78bfa' }}>{s}</span>
          ))}
        </div>

        {/* Languages strip */}
        <div style={{
          marginTop: '1rem', padding: '1.2rem 2rem',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 10, display: 'flex', flexWrap: 'wrap', gap: '0.7rem', alignItems: 'center',
        }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.58rem', letterSpacing: '0.35em', color: 'rgba(241,245,249,0.3)', textTransform: 'uppercase', marginRight: '0.5rem' }}>Languages</span>
          {['English', 'Malayalam', 'Hindi', 'Tamil'].map(l => (
            <span key={l} className="tag-pill" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', color: '#34d399' }}>{l}</span>
          ))}
        </div>
      </div>
    </section>
  )
}