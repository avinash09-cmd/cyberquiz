import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaShieldAlt, FaHome, FaTerminal } from 'react-icons/fa'
import { NeonButton } from '../components/index'

// Simulated terminal lines for the glitch effect
const TERMINAL_LINES = [
  'INITIALIZING RECOVERY PROTOCOL...',
  'SCANNING ROUTE TABLE......... [FAIL]',
  'ATTEMPTING DNS RESOLUTION.... [FAIL]',
  'FALLING BACK TO DEFAULT HANDLER',
  'ERROR 404: RESOURCE NOT FOUND',
  'OPERATOR INTERVENTION REQUIRED',
]

// Random glitch characters
const GLITCH_CHARS = '!@#$%^&*<>?/\\|{}[]~`01'
function glitchText(text, intensity = 0.15) {
  return text
    .split('')
    .map(c => Math.random() < intensity ? GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)] : c)
    .join('')
}

export default function NotFound() {
  const [lines, setLines]         = useState([])
  const [glitched, setGlitched]   = useState('404')
  const [cursorOn, setCursorOn]   = useState(true)

  // Type out terminal lines one by one
  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i < TERMINAL_LINES.length) {
        setLines(prev => [...prev, TERMINAL_LINES[i]])
        i++
      } else {
        clearInterval(interval)
      }
    }, 380)
    return () => clearInterval(interval)
  }, [])

  // Cursor blink
  useEffect(() => {
    const id = setInterval(() => setCursorOn(v => !v), 530)
    return () => clearInterval(id)
  }, [])

  // Occasional glitch on the 404 number
  useEffect(() => {
    const id = setInterval(() => {
      setGlitched(glitchText('404', 0.4))
      setTimeout(() => setGlitched('404'), 120)
    }, 2200)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 py-16 text-center">
      {/* Giant glitching 404 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 120 }}
        className="relative mb-6 select-none"
      >
        <span
          className="text-[10rem] md:text-[14rem] font-bold font-mono leading-none"
          style={{
            background: 'linear-gradient(90deg, #00d4ff 0%, #0066ff 50%, #7b2fff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: 'none',
            filter: 'drop-shadow(0 0 30px rgba(0,212,255,0.4))',
          }}
        >
          {glitched}
        </span>

        {/* Scan line effect */}
        <motion.div
          animate={{ top: ['0%', '100%'] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
          className="absolute left-0 right-0 h-0.5 pointer-events-none"
          style={{ background: 'rgba(0,212,255,0.5)', boxShadow: '0 0 8px rgba(0,212,255,0.8)' }}
        />
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-2xl md:text-3xl font-bold text-white mb-2"
      >
        Access Denied — Route Not Found
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45 }}
        className="text-cyber-text-dim max-w-md mb-10"
      >
        The page you're looking for doesn't exist, has been moved, or requires higher clearance.
      </motion.p>

      {/* Terminal block */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="w-full max-w-lg mb-10 text-left rounded-xl overflow-hidden"
        style={{
          background: 'rgba(0,0,0,0.5)',
          border: '1px solid rgba(0,212,255,0.2)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(0,212,255,0.05)',
        }}
      >
        {/* Terminal top bar */}
        <div
          className="flex items-center gap-2 px-4 py-2.5"
          style={{ background: 'rgba(0,212,255,0.05)', borderBottom: '1px solid rgba(0,212,255,0.1)' }}
        >
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-cyber-red opacity-70" />
            <span className="w-3 h-3 rounded-full bg-yellow-500 opacity-70" />
            <span className="w-3 h-3 rounded-full bg-cyber-green opacity-70" />
          </div>
          <div className="flex items-center gap-2 ml-2 text-cyber-text-dim text-xs font-mono">
            <FaTerminal className="text-[10px]" />
            cyberquiz — recovery-shell
          </div>
        </div>

        {/* Terminal body */}
        <div className="p-5 font-mono text-sm space-y-1.5 min-h-[160px]">
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex items-center gap-2 ${
                line.includes('[FAIL]')  ? 'text-cyber-red'   :
                line.includes('ERROR')  ? 'text-cyber-red'   :
                line.includes('INTERVENTION') ? 'text-yellow-400' :
                'text-cyber-text-dim'
              }`}
            >
              <span className="text-cyber-cyan select-none">&gt;</span>
              {line}
            </motion.div>
          ))}
          {/* Blinking cursor */}
          {lines.length > 0 && (
            <div className="flex items-center gap-2 text-cyber-text-dim">
              <span className="text-cyber-cyan select-none">&gt;</span>
              <span
                className="inline-block w-2 h-4"
                style={{
                  background: cursorOn ? '#00d4ff' : 'transparent',
                  boxShadow: cursorOn ? '0 0 8px rgba(0,212,255,0.8)' : 'none',
                }}
              />
            </div>
          )}
        </div>
      </motion.div>

      {/* CTA buttons */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <Link to="/">
          <NeonButton size="lg">
            <FaHome /> Return Home
          </NeonButton>
        </Link>
        <Link to="/quiz">
          <NeonButton size="lg" variant="ghost">
            <FaShieldAlt /> Take a Quiz
          </NeonButton>
        </Link>
      </motion.div>
    </div>
  )
}
