'use client'
import { useEffect, useRef } from 'react'

interface Particle {
  x: number; y: number; z: number
  vx: number; vy: number; vz: number
  size: number; hue: number
}

export default function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animRef = useRef<number>(0)
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    particlesRef.current = Array.from({ length: 110 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      z: Math.random() * 900 + 50,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      vz: Math.random() * 0.45 + 0.15,
      size: Math.random() * 2 + 0.4,
      hue: Math.random() > 0.5 ? 195 : 265,
    }))

    const animate = () => {
      timeRef.current += 0.008
      const w = canvas.width, h = canvas.height
      ctx.clearRect(0, 0, w, h)
      const ps = particlesRef.current

      // connections
      for (let i = 0; i < ps.length; i++) {
        for (let j = i + 1; j < ps.length; j++) {
          const p1 = ps[i], p2 = ps[j]
          const s1 = 800 / (800 - p1.z * 0.8)
          const s2 = 800 / (800 - p2.z * 0.8)
          const x1 = (p1.x - w / 2) * s1 + w / 2
          const y1 = (p1.y - h / 2) * s1 + h / 2
          const x2 = (p2.x - w / 2) * s2 + w / 2
          const y2 = (p2.y - h / 2) * s2 + h / 2
          const d = Math.hypot(x1 - x2, y1 - y2)
          if (d < 95) {
            ctx.beginPath()
            ctx.strokeStyle = `hsla(${p1.hue},80%,70%,${0.13 * (1 - d / 95)})`
            ctx.lineWidth = 0.4
            ctx.moveTo(x1, y1)
            ctx.lineTo(x2, y2)
            ctx.stroke()
          }
        }
      }

      ps.forEach(p => {
        p.z -= p.vz
        p.x += p.vx + Math.sin(timeRef.current + p.y * 0.005) * 0.1
        p.y += p.vy + Math.cos(timeRef.current + p.x * 0.005) * 0.1
        if (p.z <= 1) { p.z = 950; p.x = Math.random() * w; p.y = Math.random() * h }
        if (p.x < 0) p.x = w
        if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h
        if (p.y > h) p.y = 0

        const sc = 800 / (800 - p.z * 0.8)
        const sx = (p.x - w / 2) * sc + w / 2
        const sy = (p.y - h / 2) * sc + h / 2
        const alpha = Math.min(1, (p.z / 950) * 1.6)
        const r = Math.max(0.3, p.size * sc * 0.22)
        ctx.beginPath()
        ctx.arc(sx, sy, r, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue},90%,75%,${alpha * 0.85})`
        ctx.fill()
      })

      animRef.current = requestAnimationFrame(animate)
    }

    animate()
    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: 0, opacity: 0.6,
        pointerEvents: 'none',
      }}
    />
  )
}
