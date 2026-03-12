'use client'
import { useRef, useEffect, useState } from 'react'
import { useReveal } from './UseReveal'

const JOBS = [
  {
  role: 'Associate Lead Software Engineer',
  company: 'Techversant Infotech Pvt Ltd',
  location: 'Kerala',
  period: 'Aug 2025 – Present',
  type: 'Full-time',
  color: '#22d3ee',
  stack: ['FastAPI', 'Python', 'Docker', 'AWS', 'S3', 'LLM', 'PostgreSQL'],
  bullets: [
    'Leading architectural planning for a modular workflow engine — Windows desktop application with plugin-based architecture',
    'Designed scalable backend for Titan AI using FastAPI, integrating AI/LLM models for automated requirement generation',
    'Built Recruitment Management System — DB schema design, authentication APIs, and external system integrations',
    'Managed Docker deployments on AWS with secure file storage on Amazon S3',
    'Assigned tasks, conducted code reviews, and maintained project documentation across multiple products',
  ],
},
  {
    role: 'Senior Application Developer',
    company: 'IBM India Private Limited',
    location: 'Bangalore',
    period: 'Jan 2025 – Aug 2025',
    type: 'Full-time',
    color: '#22d3ee',
    stack: ['FastAPI', 'Python', 'Couchbase', 'Databricks', 'REST API'],
    bullets: [
  'Contributed to large-scale enterprise app designing scalable RESTful APIs using FastAPI with microservices architecture',
  'Worked on four core microservices: Visit Planning, MD Extension, Store Visit, and Employee Routing',
  'Integrated Couchbase NoSQL for high-performance document storage and optimized querying',
  'Developed async background jobs and schedulers using Databricks for file-based processing workflows',
  'Implemented employee routing and allocation logic for optimal customer visit distribution',
  'Optimized Docker image builds and container startup times for production and pre-production readiness',
  'Fixed SonarQube issues, performed code refactoring, and implemented centralized CLE logging across services',
],
  },
  {
    role: 'Assistant Co-ordinator & Senior Developer',
    company: 'RGC Dynamics Pvt. Ltd',
    location: 'Calicut, Kerala',
    period: 'Jul 2021 – Aug 2024',
    type: 'Full-time',
    color: '#8b5cf6',
    stack: ['Python', 'Django REST', 'Golang', 'AWS', 'PostgreSQL', 'Rasa', 'RabbitMQ'],
    bullets: [
      'Led AI/ML department — Rasa chatbot, image search, fraud detection, spam detection, recommendation engine',
      'Architected and migrated monolith services to Golang microservices on live production',
      'Built B2B/C2B e-commerce platform with Django REST, PostgreSQL and AWS',
      'Designed RESTful APIs consumed by mobile and third-party integrations',
      'Architected optimised PostgreSQL schemas for high-volume transaction systems',
      'Led a team: set goals, conducted code reviews, mentored junior developers, handled recruitment',
      'Managed AWS accounts, Git repos, and server infrastructure',
    ],
  },
  {
    role: 'Senior Software Engineer',
    company: 'Epixel Solutions Pvt. Ltd',
    location: 'Palakkad, Kerala',
    period: 'Jul 2016 – Jul 2021',
    type: 'Full-time',
    color: '#10b981',
    stack: ['Python', 'Django', 'Golang', 'MySQL', 'PHP', 'RabbitMQ'],
    bullets: [
      'Developed multi-wallet system supporting BTC, ETH, and fiat currencies — tested with 100M entries',
      'Integrated payment gateways: USD/EUR/BTC, UPS/USPS shipping, Xero accounting, Twilio',
      'Led 10+ MLM product builds (Binary, Unilevel, Matrix plans) using Django & Golang',
      'Migrated entire transaction process to Golang on a live project — improved performance significantly',
      'Led web app development with Django and MySQL, optimising DB integrity and query performance',
      'Conducted website testing, troubleshooting, and pre-deployment validation',
      'Contributed to 15+ R&D projects as a core team member',
    ],
  },
]

export default function Experience() {
  const ref     = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [open, setOpen]       = useState<number | null>(0)
  const r1 = useReveal()   // label + heading
  const r2 = useReveal()   // timeline
  const r3 = useReveal()   // education

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.08 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="experience" ref={ref} style={{ position: 'relative', zIndex: 10, padding: '7rem 3rem' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>

        <span className="section-label reveal" ref={r1 as any}>03 / Experience</span>
        <h2 className="section-title reveal delay-1" style={{ marginBottom: '3.5rem' }} ref={r1 as any}>
          Work <span>History</span>
        </h2>

        {/* Timeline */}
        <div ref={r2 as any} className="reveal delay-2" style={{ position: 'relative' }}>
          {/* Vertical line */}
          <div style={{
            position: 'absolute', left: 0, top: 0, bottom: 0,
            width: 1,
            background: 'linear-gradient(to bottom, #22d3ee44, #8b5cf644, #10b98144)',
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem', paddingLeft: '2.5rem' }}>
            {JOBS.map((job, i) => (
              <JobCard
                key={i} job={job} index={i}
                isOpen={open === i}
                onToggle={() => setOpen(open === i ? null : i)}
                visible={visible}
              />
            ))}
          </div>
        </div>

        {/* Education */}
        <div ref={r3 as any} className="reveal delay-3" style={{ marginTop: '4rem', paddingTop: '3rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <span className="section-label" style={{ marginBottom: '1.5rem' }}>Education</span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
            {[
              { degree: 'Diploma in Computer Science', school: 'SSM Polytechnic College', location: 'Tirur, Kerala', year: '2013–2016' },
              { degree: 'Computer Science (12th)', school: 'Govt. Nellikuth HSS', location: 'Pandikkad, Kerala', year: '2011–2013' },
            ].map(e => (
              <div key={e.school} className="card-surface" style={{ padding: '1.3rem 1.5rem' }}>
                <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: '0.88rem', color: '#f1f5f9', marginBottom: '0.3rem' }}>{e.degree}</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '0.8rem', color: 'rgba(241,245,249,0.5)', marginBottom: '0.2rem' }}>{e.school}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: '#22d3ee88', letterSpacing: '0.15em' }}>{e.location} · {e.year}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

function JobCard({ job, index, isOpen, onToggle, visible }: {
  job: typeof JOBS[0]; index: number; isOpen: boolean; onToggle: () => void; visible: boolean
}) {
  return (
    <div style={{ position: 'relative' }}>
      {/* Timeline dot */}
      <div style={{
        position: 'absolute', left: -34, top: 22,
        width: 10, height: 10, borderRadius: '50%',
        background: job.color,
        boxShadow: `0 0 12px ${job.color}88`,
        border: `2px solid ${job.color}55`,
        transform: 'translateX(-50%)',
      }} />

      <div
        onClick={onToggle}
        className="card-surface"
        style={{
          padding: '1.6rem 1.8rem', cursor: 'pointer',
          borderLeft: `3px solid ${isOpen ? job.color : job.color + '40'}`,
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateX(0)' : 'translateX(-20px)',
          transition: `opacity 0.6s ${index * 0.12}s, transform 0.6s ${index * 0.12}s, border-color 0.25s, box-shadow 0.25s`,
          boxShadow: isOpen ? `0 8px 32px ${job.color}12` : 'none',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.58rem', letterSpacing: '0.28em', color: job.color, marginBottom: '0.35rem', opacity: 0.85 }}>{job.period}</div>
            <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: '#f1f5f9', marginBottom: '0.25rem', letterSpacing: '-0.01em' }}>{job.role}</h3>
            <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '0.83rem', color: 'rgba(241,245,249,0.42)', letterSpacing: '0.02em' }}>
              {job.company} · {job.location}
            </div>
          </div>
          <div style={{
            width: 28, height: 28, borderRadius: '50%',
            border: `1px solid ${job.color}55`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: job.color, fontSize: '1.1rem',
            transition: 'transform 0.3s',
            transform: isOpen ? 'rotate(45deg)' : 'none', flexShrink: 0,
          }}>+</div>
        </div>

        {/* Stack tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.9rem' }}>
          {job.stack.map(t => (
            <span key={t} className="tag-pill" style={{
              background: `${job.color}0d`, border: `1px solid ${job.color}28`, color: job.color,
            }}>{t}</span>
          ))}
        </div>

        {/* Expanded bullets */}
        {isOpen && (
          <div style={{ marginTop: '1.4rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.3rem' }}>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {job.bullets.map((b, j) => (
                <li key={j} style={{
                  display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
                  fontFamily: "'Inter', sans-serif", fontWeight: 300,
                  fontSize: '0.85rem', color: 'rgba(241,245,249,0.62)', lineHeight: 1.7,
                  animation: `slideIn 0.3s ${j * 0.05}s ease both`,
                }}>
                  <span style={{ color: job.color, flexShrink: 0, marginTop: '0.15rem', fontSize: '0.7rem' }}>▸</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}


