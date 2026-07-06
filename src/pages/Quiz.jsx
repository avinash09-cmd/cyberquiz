import { useState, useCallback } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaLock, FaFish, FaNetworkWired, FaBug, FaGlobe,
  FaArrowLeft, FaArrowRight, FaClock, FaShieldAlt,
  FaCheckCircle, FaTimesCircle, FaTrophy
} from 'react-icons/fa'
import { GlassCard, NeonButton, ProgressBar, Badge } from '../components/index'
import { quizMeta } from '../data/quizMeta'
import { passwordSecurity } from '../data/quizzes/passwordSecurity'
import { phishing }         from '../data/quizzes/phishing'
import { networkSecurity }  from '../data/quizzes/networkSecurity'
import { malware }          from '../data/quizzes/malware'
import { webSecurity }      from '../data/quizzes/webSecurity'
import { useQuizTimer }     from '../hooks/useQuizTimer'
import { saveQuizResult, getBestScore } from '../utils/storage'

// Map quiz IDs to their question data
const quizData = {
  'password-security': passwordSecurity,
  'phishing':          phishing,
  'network-security':  networkSecurity,
  'malware':           malware,
  'web-security':      webSecurity,
}

const iconMap = {
  FaLock: FaLock, FaFish: FaFish, FaNetworkWired: FaNetworkWired,
  FaBug: FaBug,   FaGlobe: FaGlobe,
}

// ─── Quiz Selection Page ──────────────────────────────────────────────────────
function QuizSelection() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <p className="text-cyber-cyan font-mono text-sm uppercase tracking-widest mb-2">
          // Select a category
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Choose Your <span className="gradient-text">Challenge</span>
        </h1>
        <p className="text-cyber-text-dim text-lg max-w-xl mx-auto">
          Each quiz has 10 questions and a 30-second timer per question. Your best scores are saved locally.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {quizMeta.map((quiz, i) => {
          const Icon = iconMap[quiz.icon] || FaShieldAlt
          const bestScore = getBestScore(quiz.id)

          return (
            <motion.div
              key={quiz.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Link to={`/quiz/${quiz.id}`}>
                <GlassCard className="p-6 cursor-pointer h-full flex flex-col gap-4 group">
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br ${quiz.gradient}`}
                      style={{ border: '1px solid rgba(0,212,255,0.15)' }}>
                      <Icon className={`text-xl text-cyber-${quiz.color}`} />
                    </div>
                    {bestScore !== null && (
                      <div className="flex items-center gap-1 text-cyber-green text-sm font-mono">
                        <FaTrophy className="text-xs" />
                        {bestScore}%
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="font-semibold text-white text-lg mb-1">{quiz.title}</h3>
                    <p className="text-cyber-text-dim text-sm leading-relaxed">{quiz.description}</p>
                  </div>

                  <div className="mt-auto pt-3 flex items-center justify-between" style={{ borderTop: '1px solid rgba(0,212,255,0.08)' }}>
                    <div className="flex gap-2">
                      <Badge color={quiz.color === 'red' ? 'red' : quiz.color === 'green' ? 'green' : 'cyan'}>
                        {quiz.difficulty}
                      </Badge>
                      <span className="text-cyber-text-dim text-xs font-mono self-center">
                        +{quiz.xpReward} XP
                      </span>
                    </div>
                    <FaArrowRight className="text-cyber-cyan opacity-0 group-hover:opacity-100 transition-opacity text-sm" />
                  </div>
                </GlassCard>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Timer Ring ───────────────────────────────────────────────────────────────
function TimerRing({ timeLeft, percentage, color, total }) {
  const r   = 22
  const circ = 2 * Math.PI * r
  const dash = circ * (percentage / 100)

  return (
    <div className="flex items-center gap-2">
      <div className="relative w-14 h-14">
        <svg viewBox="0 0 52 52" className="-rotate-90 w-full h-full">
          <circle cx="26" cy="26" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
          <circle
            cx="26" cy="26" r={r} fill="none"
            stroke={color} strokeWidth="3"
            strokeDasharray={`${dash} ${circ}`}
            strokeLinecap="round"
            style={{ transition: 'stroke-dasharray 0.9s linear, stroke 0.5s' }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-sm font-bold font-mono" style={{ color }}>
          {timeLeft}
        </span>
      </div>
      <FaClock className="text-cyber-text-dim text-xs" />
    </div>
  )
}

// ─── Quiz Runner ─────────────────────────────────────────────────────────────
function QuizRunner({ quiz, questions }) {
  const navigate                    = useNavigate()
  const [currentIndex, setIndex]    = useState(0)
  const [answers, setAnswers]       = useState({})      // { questionIndex: optionIndex }
  const [submitted, setSubmitted]   = useState(false)
  const [direction, setDirection]   = useState(1)       // 1 = forward, -1 = backward

  const currentQ  = questions[currentIndex]
  const totalQ    = questions.length
  const answered  = answers[currentIndex] !== undefined

  // Auto-advance when timer expires
  const handleTimerExpire = useCallback(() => {
    if (!submitted && !answered) {
      // Mark as skipped (no answer)
      setAnswers(prev => ({ ...prev, [currentIndex]: -1 }))
      if (currentIndex < totalQ - 1) {
        setTimeout(() => { setDirection(1); setIndex(i => i + 1) }, 300)
      }
    }
  }, [submitted, answered, currentIndex, totalQ])

  const { timeLeft, percentage, color, reset } = useQuizTimer(30, handleTimerExpire)

  const selectAnswer = (optIdx) => {
    if (answered || submitted) return
    setAnswers(prev => ({ ...prev, [currentIndex]: optIdx }))
  }

  const goNext = () => {
    if (currentIndex < totalQ - 1) {
      setDirection(1)
      setIndex(i => i + 1)
      reset(30)
    }
  }

  const goPrev = () => {
    if (currentIndex > 0) {
      setDirection(-1)
      setIndex(i => i - 1)
      reset(30)
    }
  }

  const handleSubmit = () => {
    if (Object.keys(answers).length === 0) return
    const score = questions.filter((q, i) => answers[i] === q.correct).length
    saveQuizResult(quiz.id, score, totalQ)
    setSubmitted(true)
  }

  // After submission → show results page
  if (submitted) {
    const score = questions.filter((q, i) => answers[i] === q.correct).length
    return <QuizResults quiz={quiz} questions={questions} answers={answers} score={score} total={totalQ} />
  }

  const progressPct = Math.round(((currentIndex) / totalQ) * 100)

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Link to="/quiz">
          <button className="flex items-center gap-2 text-cyber-text-dim hover:text-cyber-cyan text-sm transition-colors">
            <FaArrowLeft className="text-xs" /> All Quizzes
          </button>
        </Link>
        <TimerRing timeLeft={timeLeft} percentage={percentage} color={color} total={30} />
      </div>

      {/* Progress */}
      <div className="mb-2 flex justify-between text-xs font-mono text-cyber-text-dim">
        <span>Question {currentIndex + 1} of {totalQ}</span>
        <span>{Object.keys(answers).length} answered</span>
      </div>
      <ProgressBar value={progressPct} color="cyan" className="mb-8" />

      {/* Question card */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={{
            enter:  d => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
            center:   { x: 0, opacity: 1 },
            exit:   d => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.25, ease: 'easeInOut' }}
        >
          <GlassCard hover={false} className="p-6 md:p-8 mb-6">
            <div className="text-cyber-cyan font-mono text-sm mb-4 uppercase tracking-wider">
              Q{currentIndex + 1}
            </div>
            <h2 className="text-white text-lg md:text-xl font-semibold leading-relaxed mb-6">
              {currentQ.question}
            </h2>

            {/* Options */}
            <div className="space-y-3">
              {currentQ.options.map((opt, i) => {
                const isSelected = answers[currentIndex] === i
                const isCorrect  = i === currentQ.correct
                const isWrong    = answered && isSelected && !isCorrect

                return (
                  <motion.button
                    key={i}
                    onClick={() => selectAnswer(i)}
                    whileTap={answered ? {} : { scale: 0.99 }}
                    className={`
                      w-full text-left px-5 py-4 rounded-lg border text-sm transition-all duration-200
                      ${!answered
                        ? 'border-cyber-cyan/20 bg-white/[0.03] hover:border-cyber-cyan/50 hover:bg-cyber-cyan/5 text-cyber-text cursor-pointer'
                        : isCorrect && answered
                          ? 'border-cyber-green/60 bg-cyber-green/10 text-cyber-green'
                          : isWrong
                            ? 'border-cyber-red/60 bg-cyber-red/10 text-cyber-red'
                            : 'border-white/5 bg-white/[0.02] text-cyber-text-dim cursor-default'
                      }
                      ${isSelected && !answered ? 'border-cyber-cyan/60 bg-cyber-cyan/10 text-cyber-cyan' : ''}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <span className="shrink-0 w-6 h-6 rounded border text-xs flex items-center justify-center font-mono
                        border-current opacity-70">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt}</span>
                      {answered && isCorrect && <FaCheckCircle className="ml-auto text-cyber-green shrink-0" />}
                      {isWrong && <FaTimesCircle className="ml-auto text-cyber-red shrink-0" />}
                    </div>
                  </motion.button>
                )
              })}
            </div>

            {/* Explanation (shown after answering) */}
            <AnimatePresence>
              {answered && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-5 p-4 rounded-lg"
                  style={{ background: 'rgba(0,212,255,0.05)', border: '1px solid rgba(0,212,255,0.15)' }}
                >
                  <p className="text-cyber-cyan text-xs font-mono uppercase mb-2 tracking-wider">
                    Explanation
                  </p>
                  <p className="text-cyber-text text-sm leading-relaxed">
                    {currentQ.explanation}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </GlassCard>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-4">
        <NeonButton variant="ghost" onClick={goPrev} disabled={currentIndex === 0}>
          <FaArrowLeft className="text-xs" /> Previous
        </NeonButton>

        <div className="flex gap-1">
          {questions.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > currentIndex ? 1 : -1); setIndex(i); reset(30) }}
              className={`w-2 h-2 rounded-full transition-all duration-200
                ${i === currentIndex    ? 'bg-cyber-cyan w-4' :
                  answers[i] !== undefined ? 'bg-cyber-cyan/40' :
                  'bg-white/10'}`}
            />
          ))}
        </div>

        {currentIndex < totalQ - 1 ? (
          <NeonButton onClick={goNext} disabled={!answered}>
            Next <FaArrowRight className="text-xs" />
          </NeonButton>
        ) : (
          <NeonButton
            onClick={handleSubmit}
            disabled={Object.keys(answers).length === 0}
          >
            Submit <FaTrophy className="text-xs" />
          </NeonButton>
        )}
      </div>
    </div>
  )
}

// ─── Results Page ─────────────────────────────────────────────────────────────
function QuizResults({ quiz, questions, answers, score, total }) {
  const navigate  = useNavigate()
  const pct       = Math.round((score / total) * 100)
  const Icon      = iconMap[quiz.icon] || FaShieldAlt

  const grade =
    pct >= 90 ? { label: 'EXPERT',   color: '#00ff88', msg: 'Outstanding! You\'re a true cyber professional.' }  :
    pct >= 70 ? { label: 'SKILLED',  color: '#00d4ff', msg: 'Great work! Solid understanding of the topic.'  }  :
    pct >= 50 ? { label: 'LEARNING', color: '#ffd700', msg: 'Good start! Review the explanations and try again.' } :
               { label: 'NOVICE',   color: '#ff3860', msg: 'Keep studying! Cybersecurity takes practice.'   }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <GlassCard hover={false} className="p-8 md:p-12 text-center mb-8">
          <div className="mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: `${grade.color}22`, border: `2px solid ${grade.color}66` }}
            >
              <span className="text-4xl font-bold font-mono" style={{ color: grade.color }}>
                {pct}
              </span>
            </motion.div>
            <span className="text-2xl text-white font-bold">%</span>
          </div>

          <div className="font-mono text-sm tracking-widest mb-2" style={{ color: grade.color }}>
            RANK: {grade.label}
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">{quiz.title} Complete</h2>
          <p className="text-cyber-text-dim mb-6">{grade.msg}</p>

          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: 'Correct',   value: score,       color: '#00ff88' },
              { label: 'Wrong',     value: total-score, color: '#ff3860' },
              { label: 'Total',     value: total,       color: '#00d4ff' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-bold font-mono" style={{ color: s.color }}>{s.value}</div>
                <div className="text-cyber-text-dim text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <NeonButton onClick={() => window.location.reload()}>
              Try Again
            </NeonButton>
            <Link to="/quiz">
              <NeonButton variant="ghost">Other Quizzes</NeonButton>
            </Link>
            <Link to="/dashboard">
              <NeonButton variant="ghost">Dashboard</NeonButton>
            </Link>
          </div>
        </GlassCard>

        {/* Question review */}
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <span className="text-cyber-cyan font-mono">{'>'}</span> Question Review
        </h3>
        <div className="space-y-4">
          {questions.map((q, i) => {
            const userAns   = answers[i]
            const isCorrect = userAns === q.correct
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <GlassCard hover={false} className="p-5"
                  style={{ borderColor: isCorrect ? 'rgba(0,255,136,0.2)' : 'rgba(255,56,96,0.2)' }}>
                  <div className="flex items-start gap-3">
                    {isCorrect
                      ? <FaCheckCircle className="text-cyber-green shrink-0 mt-0.5" />
                      : <FaTimesCircle className="text-cyber-red shrink-0 mt-0.5" />}
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium mb-2">{q.question}</p>
                      {!isCorrect && userAns >= 0 && (
                        <p className="text-cyber-red text-xs mb-1">
                          Your answer: {q.options[userAns]}
                        </p>
                      )}
                      {(!isCorrect || userAns === -1) && (
                        <p className="text-cyber-green text-xs mb-2">
                          Correct: {q.options[q.correct]}
                        </p>
                      )}
                      <p className="text-cyber-text-dim text-xs leading-relaxed">{q.explanation}</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}

// ─── Main Quiz Page (router) ─────────────────────────────────────────────────
export default function Quiz() {
  const { quizId } = useParams()

  if (!quizId) return <QuizSelection />

  const quiz      = quizMeta.find(q => q.id === quizId)
  const questions = quizData[quizId]

  if (!quiz || !questions) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <p className="text-cyber-red text-lg mb-4">Quiz not found: <code>{quizId}</code></p>
        <Link to="/quiz">
          <NeonButton variant="ghost"><FaArrowLeft /> Back to quizzes</NeonButton>
        </Link>
      </div>
    )
  }

  return <QuizRunner quiz={quiz} questions={questions} />
}
