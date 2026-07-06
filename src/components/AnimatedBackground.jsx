// Decorative animated background — used on every page
// Renders glow orbs, cyber grid, and floating particles

import { useEffect, useRef } from 'react'

export default function AnimatedBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas  = canvasRef.current
    const ctx     = canvas.getContext('2d')
    let animId

    // Resize canvas to full window
    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Particle system
    const particles = Array.from({ length: 40 }, () => ({
      x:    Math.random() * canvas.width,
      y:    Math.random() * canvas.height,
      vx:   (Math.random() - 0.5) * 0.3,
      vy:   (Math.random() - 0.5) * 0.3,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.4 + 0.1,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw and move particles
      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 212, 255, ${p.opacity})`
        ctx.fill()

        p.x += p.vx
        p.y += p.vy

        // Wrap around edges
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
      }

      // Draw lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx   = particles[i].x - particles[j].x
          const dy   = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(0, 102, 255, ${0.08 * (1 - dist / 120)})`
            ctx.lineWidth   = 0.5
            ctx.stroke()
          }
        }
      }

      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {/* Canvas particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-60"
        aria-hidden="true"
      />

      {/* Cyber grid overlay */}
      <div className="absolute inset-0 cyber-grid opacity-30" aria-hidden="true" />

      {/* Scanlines */}
      <div className="absolute inset-0 scanlines opacity-20" aria-hidden="true" />

      {/* Gradient orbs */}
      <div
        className="absolute -top-32 -left-32 glow-orb-cyan animate-pulse-slow"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 -right-48 glow-orb-blue animate-pulse-slow"
        style={{ animationDelay: '1s' }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 left-1/3 glow-orb-violet animate-pulse-slow"
        style={{ animationDelay: '2s' }}
        aria-hidden="true"
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(10,15,30,0.8) 100%)'
        }}
        aria-hidden="true"
      />
    </div>
  )
}
