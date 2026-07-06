import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaLock, FaDatabase, FaCode, FaUserSecret,
  FaBug, FaShieldAlt, FaChevronDown, FaLightbulb,
  FaKey, FaExclamationTriangle
} from 'react-icons/fa'
import { GlassCard, SectionHeader, Badge } from '../components/index'
import { learnCards } from '../data/learnCards'

const iconMap = {
  FaLock: FaLock, FaDatabase: FaDatabase, FaCode: FaCode,
  FaUserSecret: FaUserSecret, FaBug: FaBug, FaShieldAlt: FaShieldAlt,
}

const colorMap = {
  cyan:   { text: 'text-cyber-cyan',   border: 'border-cyber-cyan/30',   bg: 'bg-cyber-cyan/10'   },
  blue:   { text: 'text-cyber-blue',   border: 'border-cyber-blue/30',   bg: 'bg-cyber-blue/10'   },
  violet: { text: 'text-cyber-violet', border: 'border-cyber-violet/30', bg: 'bg-cyber-violet/10' },
  red:    { text: 'text-cyber-red',    border: 'border-cyber-red/30',    bg: 'bg-cyber-red/10'    },
  green:  { text: 'text-cyber-green',  border: 'border-cyber-green/30',  bg: 'bg-cyber-green/10'  },
}

function LearnCard({ card, index }) {
  const [open, setOpen] = useState(false)
  const Icon    = iconMap[card.icon] || FaShieldAlt
  const colors  = colorMap[card.color] || colorMap.cyan

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.5 }}
    >
      <div
        className="glass-card rounded-xl overflow-hidden cursor-pointer transition-all duration-300"
        style={{
          borderColor: open ? `rgba(0,212,255,0.25)` : 'rgba(0,212,255,0.08)',
          boxShadow: open ? '0 8px 32px rgba(0,212,255,0.08)' : 'none',
        }}
        onClick={() => setOpen(o => !o)}
        role="button"
        aria-expanded={open}
      >
        {/* Card header */}
        <div className="p-5 flex items-center gap-4">
          <div
            className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${colors.bg} border ${colors.border}`}
          >
            <Icon className={`text-xl ${colors.text}`} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-white font-semibold">{card.title}</h3>
              <Badge color={card.color}>{card.tagline}</Badge>
            </div>
            <p className="text-cyber-text-dim text-sm mt-0.5 truncate">{card.summary}</p>
          </div>

          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className={`shrink-0 ${colors.text}`}
          >
            <FaChevronDown />
          </motion.div>
        </div>

        {/* Expanded content */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div
                className="px-5 pb-6"
                style={{ borderTop: '1px solid rgba(0,212,255,0.08)' }}
                onClick={e => e.stopPropagation()}
              >
                {/* Summary */}
                <p className="text-cyber-text leading-relaxed mt-5 mb-6">{card.summary}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Key Points */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <FaKey className={`text-sm ${colors.text}`} />
                      <h4 className="text-white font-semibold text-sm uppercase tracking-wider font-mono">
                        Key Points
                      </h4>
                    </div>
                    <ul className="space-y-2">
                      {card.keyPoints.map((point, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.04 }}
                          className="flex items-start gap-2 text-sm text-cyber-text"
                        >
                          <span className={`shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full ${colors.bg.replace('bg-', 'bg-cyber-').replace('/10', '')}`}
                            style={{ minWidth: '6px', background: card.color === 'cyan' ? '#00d4ff' : card.color === 'green' ? '#00ff88' : card.color === 'blue' ? '#0066ff' : card.color === 'violet' ? '#7b2fff' : '#ff3860' }}
                          />
                          {point}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Prevention Tips */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <FaExclamationTriangle className="text-sm text-cyber-green" />
                      <h4 className="text-white font-semibold text-sm uppercase tracking-wider font-mono">
                        Prevention Tips
                      </h4>
                    </div>
                    <ul className="space-y-2">
                      {card.preventionTips.map((tip, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.04 + 0.1 }}
                          className="flex items-start gap-2 text-sm text-cyber-text"
                        >
                          <FaLightbulb className="shrink-0 text-cyber-green mt-0.5 text-[10px]" />
                          {tip}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default function Learn() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <p className="text-cyber-cyan font-mono text-sm uppercase tracking-widest mb-2">
          // Knowledge base
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Learning <span className="gradient-text">Center</span>
        </h1>
        <p className="text-cyber-text-dim text-lg max-w-xl mx-auto">
          Master the fundamentals before you quiz. Tap any card to expand the full learning guide.
        </p>
      </motion.div>

      {/* Tip banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-8 flex items-center gap-3 px-4 py-3 rounded-lg"
        style={{ background: 'rgba(0,212,255,0.05)', border: '1px solid rgba(0,212,255,0.15)' }}
      >
        <FaLightbulb className="text-cyber-cyan shrink-0" />
        <p className="text-cyber-text text-sm">
          <strong className="text-white">Tip:</strong> Read a topic here, then jump straight into the matching quiz to test your retention.
        </p>
      </motion.div>

      <div className="space-y-4">
        {learnCards.map((card, i) => (
          <LearnCard key={card.id} card={card} index={i} />
        ))}
      </div>
    </div>
  )
}
