'use client'
import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    // Only show custom cursor on non-touch
    if (window.matchMedia('(pointer: coarse)').matches) return

    document.body.style.cursor = 'none'

    const move = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px'
        dotRef.current.style.top = e.clientY + 'px'
      }
    }

    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12
      ring.current.y += (pos.current.y - ring.current.y) * 0.12
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + 'px'
        ringRef.current.style.top = ring.current.y + 'px'
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    const handleEnter = () => {
      if (ringRef.current) ringRef.current.style.transform = 'translate(-50%,-50%) scale(1.8)'
      if (ringRef.current) ringRef.current.style.borderColor = 'rgba(0,212,255,0.8)'
    }
    const handleLeave = () => {
      if (ringRef.current) ringRef.current.style.transform = 'translate(-50%,-50%) scale(1)'
      if (ringRef.current) ringRef.current.style.borderColor = 'rgba(0,212,255,0.4)'
    }

    document.addEventListener('mousemove', move)
    document.querySelectorAll('a,button').forEach(el => {
      el.addEventListener('mouseenter', handleEnter)
      el.addEventListener('mouseleave', handleLeave)
    })
    animate()

    return () => {
      document.removeEventListener('mousemove', move)
      cancelAnimationFrame(rafRef.current)
      document.body.style.cursor = ''
    }
  }, [])

  return (
    <>
      <div ref={dotRef} style={{
        position: 'fixed', zIndex: 9999, pointerEvents: 'none',
        width: 6, height: 6, borderRadius: '50%',
        background: '#00d4ff',
        transform: 'translate(-50%,-50%)',
        transition: 'none',
        boxShadow: '0 0 8px #00d4ff',
      }} />
      <div ref={ringRef} style={{
        position: 'fixed', zIndex: 9998, pointerEvents: 'none',
        width: 32, height: 32, borderRadius: '50%',
        border: '1px solid rgba(0,212,255,0.4)',
        transform: 'translate(-50%,-50%)',
        transition: 'transform 0.2s, border-color 0.2s',
      }} />
    </>
  )
}
