'use client'
import { useState, useEffect } from 'react'

const NAV = [
  { id: 'home',       label: 'Home' },
  { id: 'about',      label: 'About' },
  { id: 'skills',     label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact',    label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive]     = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      const sections = NAV.map(n => document.getElementById(n.id))
      const hit = sections.findLast(s => s && s.getBoundingClientRect().top <= 140)
      if (hit) setActive(hit.id)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setActive(id); setMenuOpen(false)
  }

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '1rem 2.5rem',
      background: scrolled ? 'rgba(3,7,18,0.90)' : 'transparent',
      backdropFilter: scrolled ? 'blur(24px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(34,211,238,0.08)' : '1px solid transparent',
      transition: 'all 0.35s',
    }}>
      {/* Logo */}
      <button onClick={() => go('home')} style={{
        background: 'none', border: 'none', cursor: 'pointer',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '1rem', fontWeight: 500,
        letterSpacing: '0.2em', color: '#22d3ee',
      }}>
        {'<VVP />'}
      </button>

      {/* Desktop links */}
      <div className="nav-desktop" style={{ display: 'flex', gap: '2rem' }}>
        {NAV.map(({ id, label }) => (
          <button key={id} onClick={() => go(id)} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.8rem', fontWeight: active === id ? 600 : 400,
            letterSpacing: '0.04em',
            color: active === id ? '#22d3ee' : 'rgba(241,245,249,0.45)',
            padding: '0.2rem 0',
            borderBottom: active === id ? '1px solid #22d3ee' : '1px solid transparent',
            transition: 'all 0.2s',
          }}
            onMouseEnter={e => { if (active !== id) (e.target as HTMLElement).style.color = 'rgba(241,245,249,0.8)' }}
            onMouseLeave={e => { if (active !== id) (e.target as HTMLElement).style.color = 'rgba(241,245,249,0.45)' }}
          >{label}</button>
        ))}
      </div>

      {/* Hamburger */}
      <button className="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)} style={{
        display: 'none', background: 'none', border: 'none', cursor: 'pointer',
        flexDirection: 'column', gap: 5, padding: 4,
      }}>
        {[0,1,2].map(i => (
          <span key={i} style={{
            width: 22, height: 2, background: '#22d3ee', display: 'block',
            transition: 'all 0.3s',
            transform: menuOpen
              ? i === 0 ? 'rotate(45deg) translate(5px,5px)'
              : i === 2 ? 'rotate(-45deg) translate(5px,-5px)'
              : 'scaleX(0)' : 'none',
          }} />
        ))}
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: 60, left: 0, right: 0,
          background: 'rgba(3,7,18,0.97)',
          borderBottom: '1px solid rgba(34,211,238,0.1)',
          padding: '1.5rem 2.5rem',
          display: 'flex', flexDirection: 'column', gap: '1.2rem', zIndex: 199,
        }}>
          {NAV.map(({ id, label }) => (
            <button key={id} onClick={() => go(id)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: "'Inter', sans-serif", fontSize: '0.85rem',
              color: active === id ? '#22d3ee' : 'rgba(241,245,249,0.6)',
              textAlign: 'left', letterSpacing: '0.05em',
            }}>{label}</button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}
