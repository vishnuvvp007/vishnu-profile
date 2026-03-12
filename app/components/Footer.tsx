export default function Footer() {
  return (
    <footer style={{
      position: 'relative', zIndex: 10,
      borderTop: '1px solid rgba(34,211,238,0.07)',
      padding: '2rem 3rem',
      display: 'flex', justifyContent: 'space-between',
      alignItems: 'center', flexWrap: 'wrap', gap: '1rem',
    }}>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.58rem', letterSpacing: '0.25em', color: 'rgba(241,245,249,0.18)' }}>
        © 2025 VISHNU VP · PYTHON & BACKEND ENGINEER
      </div>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.58rem', letterSpacing: '0.2em', color: 'rgba(241,245,249,0.18)' }}>
        BUILT WITH NEXT.JS
      </div>
    </footer>
  )
}
