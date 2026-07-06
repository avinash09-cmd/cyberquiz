import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FaTrophy, FaFire, FaBolt, FaChartLine,
  FaShieldAlt, FaLock, FaFish, FaNetworkWired,
  FaBug, FaGlobe, FaPlay, FaTrash, FaStar
} from 'react-icons/fa'
import { GlassCard, NeonButton, ProgressBar, StatCard, SectionHeader } from '../components/index'
import { getDashboardStats, resetAllData, getLevel } from '../utils/storage'
import { quizMeta } from '../data/quizMeta'

const iconMap = {
  FaLock: FaLock, FaFish: FaFish, FaNetworkWired: FaNetworkWired,
  FaBug: FaBug,   FaGlobe: FaGlobe,
}

// XP thresholds per level
const XP_LEVELS = [
  { level: 1, min: 0,    max: 200,  title: 'Rookie',           color: 'text-cyber-text-dim'  },
  { level: 2, min: 200,  max: 600,  title: 'Junior Hacker',    color: 'text-cyber-green'      },
  { level: 3, min: 600,  max: 1200, title: 'Security Analyst', color: 'text-cyber-cyan'       },
  { level: 4, min: 1200, max: 2000, title: 'Threat Hunter',    color: 'text-cyber-blue'       },
  { level: 5, min: 2000, max: 2000, title: 'Cyber Sentinel',   color: 'text-cyber-violet'     },
]

function XPBar({ xp }) {
  const lvl     = XP_LEVELS.find(l => xp < l.max) || XP_LEVELS[XP_LEVELS.length - 1]
  const nextLvl = XP_LEVELS[Math.min(lvl.level, XP_LEVELS.length - 1)]
  const pct     = lvl.level === 5 ? 100 : Math.round(((xp - lvl.min) / (lvl.max - lvl.min)) * 100)

  return (
    <div className="mt-2">
      <div className="flex justify-between text-xs font-mono text-cyber-text-dim mb-2">
        <span className={lvl.color}>{lvl.title}</span>
        <span>{lvl.level === 5 ? 'MAX LEVEL' : `${xp} / ${lvl.max} XP`}</span>
      </div>
      <ProgressBar value={pct} color="violet" />
      {lvl.level < 5 && (
        <p className="text-cyber-text-dim text-xs mt-1 text-right">
          {lvl.max - xp} XP to {nextLvl.title}
        </p>
      )}
    </div>
  )
}

export default function Dashboard() {
  const [stats, setStats]     = useState(() => getDashboardStats())
  const [showReset, setShow]  = useState(false)

  const handleReset = () => {
    resetAllData()
    setStats(getDashboardStats())
    setShow(false)
  }

  const hasAnyData = stats.totalCompleted > 0

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <p className="text-cyber-cyan font-mono text-sm uppercase tracking-widest mb-2">
          // Operator Profile
        </p>
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-4xl font-bold text-white">
              Your <span className="gradient-text">Dashboard</span>
            </h1>
            <p className="text-cyber-text-dim mt-1">All data stored locally — no account required.</p>
          </div>
          {hasAnyData && (
            <button
              onClick={() => setShow(true)}
              className="flex items-center gap-2 text-cyber-text-dim hover:text-cyber-red text-sm transition-colors"
            >
              <FaTrash className="text-xs" /> Reset data
            </button>
          )}
        </div>
      </motion.div>

      {!hasAnyData ? (
        /* Empty state */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-20"
        >
          <FaShieldAlt className="text-5xl text-cyber-cyan/30 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-white mb-3">No data yet</h2>
          <p className="text-cyber-text-dim mb-8 max-w-sm mx-auto">
            Complete a quiz to start tracking your XP, scores, and streak.
          </p>
          <Link to="/quiz">
            <NeonButton size="lg"><FaPlay /> Take your first quiz</NeonButton>
          </Link>
        </motion.div>
      ) : (
        <>
          {/* Stat cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard icon={FaTrophy}    value={stats.totalCompleted} label="Quizzes Completed" color="cyan"   delay={0}    />
            <StatCard icon={FaChartLine} value={stats.accuracy}       label="Overall Accuracy"  color="green"  delay={0.05} suffix="%" />
            <StatCard icon={FaFire}      value={stats.streak}         label="Day Streak"        color="red"    delay={0.1}  />
            <StatCard icon={FaBolt}      value={stats.xp}             label="Total XP Earned"   color="violet" delay={0.15} />
          </div>

          {/* XP progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <GlassCard hover={false} className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <FaStar className="text-cyber-violet text-lg" />
                <h3 className="text-white font-semibold">Level Progress</h3>
              </div>
              <XPBar xp={stats.xp} />
            </GlassCard>
          </motion.div>

          {/* Quiz score cards */}
          <SectionHeader
            eyebrow="// Individual results"
            title="Quiz Scores"
            className="mb-8"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {quizMeta.map((quiz, i) => {
              const Icon    = iconMap[quiz.icon] || FaShieldAlt
              const best    = stats.bestScores[quiz.id]
              const done    = stats.completedQuizzes.includes(quiz.id)

              const scoreColor =
                best === undefined ? 'cyan' :
                best >= 80 ? 'green' :
                best >= 50 ? 'blue'  : 'red'

              return (
                <motion.div
                  key={quiz.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 + 0.3 }}
                >
                  <GlassCard className="p-5 flex flex-col gap-4">
                    {/* Title row */}
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center bg-gradient-to-br ${quiz.gradient}`}>
                        <Icon className={`text-sm text-cyber-${quiz.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-medium text-sm truncate">{quiz.title}</h4>
                        <p className="text-cyber-text-dim text-xs">{quiz.difficulty}</p>
                      </div>
                      {done && <FaTrophy className="text-cyber-green text-xs shrink-0" />}
                    </div>

                    {/* Score */}
                    <div>
                      {best !== undefined ? (
                        <>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-cyber-text-dim text-xs">Best Score</span>
                            <span className={`text-sm font-bold font-mono text-cyber-${scoreColor}`}>{best}%</span>
                          </div>
                          <ProgressBar value={best} color={scoreColor} />
                        </>
                      ) : (
                        <p className="text-cyber-text-dim text-xs italic">Not attempted yet</p>
                      )}
                    </div>

                    <Link to={`/quiz/${quiz.id}`}>
                      <NeonButton variant="ghost" size="sm" className="w-full justify-center text-xs">
                        {done ? 'Retake Quiz' : 'Start Quiz'} <FaPlay className="text-[10px]" />
                      </NeonButton>
                    </Link>
                  </GlassCard>
                </motion.div>
              )
            })}
          </div>
        </>
      )}

      {/* Reset confirm dialog */}
      {showReset && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ background: 'rgba(10,15,30,0.8)', backdropFilter: 'blur(8px)' }}
          onClick={() => setShow(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-card rounded-2xl p-8 max-w-sm w-full text-center"
            onClick={e => e.stopPropagation()}
          >
            <FaTrash className="text-3xl text-cyber-red mx-auto mb-4" />
            <h3 className="text-white font-bold text-xl mb-2">Reset all data?</h3>
            <p className="text-cyber-text-dim text-sm mb-6">
              This will permanently delete all scores, XP, and streaks from your browser.
            </p>
            <div className="flex gap-3 justify-center">
              <NeonButton variant="ghost" onClick={() => setShow(false)}>Cancel</NeonButton>
              <NeonButton variant="danger" onClick={handleReset}>Reset</NeonButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
