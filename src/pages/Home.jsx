import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FaShieldAlt, FaLock, FaBug, FaNetworkWired,
  FaGlobe, FaFish, FaArrowRight, FaChartLine,
  FaTrophy, FaGraduationCap, FaBolt, FaPlay
} from 'react-icons/fa'
import { GlassCard, NeonButton, SectionHeader } from '../components/index'
import { quizMeta } from '../data/quizMeta'

// Fade-up animation variant (reusable)
const fadeUp = (delay = 0) => ({
  initial:   { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport:  { once: true },
  transition: { delay, duration: 0.6, ease: 'easeOut' },
})

const iconMap = {
  FaLock: FaLock, FaFish: FaFish, FaNetworkWired: FaNetworkWired,
  FaBug: FaBug,   FaGlobe: FaGlobe,
}

const features = [
  {
    icon: FaBolt,
    title: 'Instant Feedback',
    description: 'Get detailed explanations for every question — right or wrong — so you actually learn.',
    color: 'cyan',
  },
  {
    icon: FaTrophy,
    title: 'XP & Leveling',
    description: 'Earn experience points as you quiz. Climb from Rookie to Cyber Sentinel.',
    color: 'blue',
  },
  {
    icon: FaChartLine,
    title: 'Progress Tracking',
    description: 'Your best scores, streaks, and accuracy are saved locally — no account needed.',
    color: 'violet',
  },
  {
    icon: FaGraduationCap,
    title: 'Learning Cards',
    description: 'Detailed learning material on 6 cybersecurity topics with key points and prevention tips.',
    color: 'green',
  },
]

const stats = [
  { value: '5',    label: 'Quiz Categories', suffix: '' },
  { value: '50',   label: 'Unique Questions', suffix: '+' },
  { value: '100',  label: 'Open Source',     suffix: '%' },
  { value: '0',    label: 'Data Collected',  suffix: 'KB' },
]

export default function Home() {
  return (
    <div className="relative">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 py-20 text-center">
        {/* Terminal badge */}
        <motion.div
          {...fadeUp(0)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyber-cyan/30 bg-cyber-cyan/5 text-cyber-cyan text-sm font-mono mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
          SYSTEM ONLINE — QUIZ PLATFORM v2.4.1
        </motion.div>

        {/* Main heading */}
        <motion.h1
          {...fadeUp(0.1)}
          className="text-5xl md:text-7xl lg:text-8xl font-bold font-mono mb-6 leading-tight"
        >
          <span className="gradient-text">CYBER</span>
          <span className="text-white">QUIZ</span>
          <br />
          <span
            className="text-3xl md:text-4xl lg:text-5xl font-normal text-cyber-text-dim"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Test your security knowledge
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          {...fadeUp(0.2)}
          className="text-cyber-text text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Five interactive quizzes covering password security, phishing, malware,
          network defense, and web vulnerabilities. Earn XP. Track your progress.
          Stay cyber-ready.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          {...fadeUp(0.3)}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/quiz">
            <NeonButton size="lg" variant="primary" className="gap-3">
              <FaPlay className="text-sm" />
              Start a Quiz
            </NeonButton>
          </Link>
          <Link to="/learn">
            <NeonButton size="lg" variant="ghost" className="gap-3">
              <FaGraduationCap />
              Learn First
            </NeonButton>
          </Link>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cyber-text-dim text-xs font-mono"
        >
          <span>SCROLL</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-px h-8 bg-gradient-to-b from-cyber-cyan/60 to-transparent"
          />
        </motion.div>
      </section>

      {/* ── Quiz Categories ────────────────────────────────────────────────── */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            eyebrow="// Choose your challenge"
            title="Quiz Categories"
            subtitle="Five domains. Real-world knowledge. Are you ready?"
            className="mb-12"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {quizMeta.map((quiz, i) => {
              const Icon = iconMap[quiz.icon] || FaShieldAlt
              const difficultyColor = {
                Beginner:     'green',
                Intermediate: 'blue',
                Advanced:     'red',
              }[quiz.difficulty] || 'cyan'

              return (
                <motion.div
                  key={quiz.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                >
                  <Link to={`/quiz/${quiz.id}`}>
                    <GlassCard
                      className="p-6 cursor-pointer h-full flex flex-col gap-4 group"
                      glowColor="rgba(0,212,255,0.12)"
                    >
                      {/* Icon */}
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br ${quiz.gradient}`}
                        style={{ border: '1px solid rgba(0,212,255,0.15)' }}
                      >
                        <Icon className={`text-xl text-cyber-${quiz.color}`} />
                      </div>

                      {/* Title + difficulty */}
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-white text-lg leading-tight">
                          {quiz.title}
                        </h3>
                        <span className={`text-xs font-mono px-2 py-0.5 rounded border text-cyber-${difficultyColor} border-cyber-${difficultyColor}/30 bg-cyber-${difficultyColor}/10 shrink-0`}>
                          {quiz.difficulty}
                        </span>
                      </div>

                      <p className="text-cyber-text-dim text-sm leading-relaxed flex-1">
                        {quiz.description}
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-2" style={{ borderTop: '1px solid rgba(0,212,255,0.08)' }}>
                        <span className="text-cyber-text-dim text-xs font-mono">
                          {quiz.questionCount} questions • +{quiz.xpReward} XP
                        </span>
                        <FaArrowRight className="text-cyber-cyan opacity-0 group-hover:opacity-100 transition-opacity text-sm" />
                      </div>
                    </GlassCard>
                  </Link>
                </motion.div>
              )
            })}
          </div>

          <motion.div {...fadeUp(0.3)} className="text-center mt-8">
            <Link to="/quiz">
              <NeonButton variant="ghost" size="md">
                View All Quizzes <FaArrowRight className="text-xs" />
              </NeonButton>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Features ──────────────────────────────────────────────────────── */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            eyebrow="// Why CyberQuiz?"
            title="Built for learners"
            subtitle="Everything you need to build real cybersecurity awareness — in the browser, no login required."
            className="mb-12"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <GlassCard className="p-6 flex gap-4 items-start">
                  <div className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-cyber-${f.color}`}
                    style={{ background: `rgba(var(--${f.color}), 0.1)`, border: '1px solid rgba(0,212,255,0.15)' }}>
                    <f.icon className="text-lg" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{f.title}</h3>
                    <p className="text-cyber-text-dim text-sm leading-relaxed">{f.description}</p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────────────────── */}
      <section className="relative py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-bold font-mono gradient-text">
                    {s.value}{s.suffix}
                  </div>
                  <div className="text-cyber-text-dim text-sm mt-2">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ─────────────────────────────────────────────────────── */}
      <section className="relative py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-10 md:p-16"
            style={{ border: '1px solid rgba(0,212,255,0.2)' }}
          >
            <FaShieldAlt className="text-5xl text-cyber-cyan mx-auto mb-6 animate-float" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to test your defenses?
            </h2>
            <p className="text-cyber-text-dim mb-8">
              Pick a topic, answer 10 questions, and find out where your cybersecurity knowledge stands.
            </p>
            <Link to="/quiz">
              <NeonButton size="lg">
                Launch Quiz <FaArrowRight />
              </NeonButton>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
