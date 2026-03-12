import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import NeuralBackground from './components/NeuralBackground'
import CustomCursor from './components/CustomCursor'

export default function Home() {
  return (
    <>
     <CustomCursor />
      <NeuralBackground />

      {/* Global ambient overlay */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: `
          radial-gradient(ellipse at 15% 60%, rgba(139,92,246,0.06) 0%, transparent 50%),
          radial-gradient(ellipse at 85% 20%, rgba(34,211,238,0.05) 0%, transparent 50%)
        `,
      }} />

      <Navbar />

      <main style={{ position: 'relative', zIndex: 10 }}>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
