import { motion } from 'framer-motion'
import {
  FaShieldAlt, FaReact, FaGithub, FaCode,
  FaDatabase, FaLock, FaRocket, FaHeart,
  FaExternalLinkAlt, FaLayerGroup, FaPalette,
  FaBolt, FaUserSecret
} from 'react-icons/fa'
import { SiVite, SiTailwindcss, SiFramer } from 'react-icons/si'
import { GlassCard, NeonButton, SectionHeader } from '../components/index'

const techStack = [
  {
    icon: FaReact,
    name: 'React 18',
    desc: 'Component-based UI with hooks and context',
    color: 'cyan',
    link: 'https://react.dev',
  },
  {
    icon: SiVite,
    name: 'Vite',
    desc: 'Lightning-fast build tool and dev server',
    color: 'violet',
    link: 'https://vitejs.dev',
  },
  {
    icon: SiTailwindcss,
    name: 'Tailwind CSS',
    desc: 'Utility-first CSS framework for rapid styling',
    color: 'blue',
    link: 'https://tailwindcss.com',
  },
  {
    icon: SiFramer,
    name: 'Framer Motion',
    desc: 'Production-ready animations and transitions',
    color: 'green',
    link: 'https://www.framer.com/motion',
  },
  {
    icon: FaCode,
    name: 'React Router v6',
    desc: 'Client-side routing with nested layouts',
    color: 'cyan',
    link: 'https://reactrouter.com',
  },
  {
    icon: FaDatabase,
    name: 'LocalStorage',
    desc: 'Zero-backend data persistence in the browser',
    color: 'blue',
    link: 'https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage',
  },
]

const features = [
  { icon: FaLock,      label: '50+ curated cybersecurity questions' },
  { icon: FaRocket,    label: 'Deployable on GitHub Pages (static)' },
  { icon: FaLayerGroup,label: 'Glassmorphism UI with neon aesthetics' },
  { icon: FaBolt,      label: 'XP system and level progression' },
  { icon: FaPalette,   label: 'Fully responsive across all devices' },
  { icon: FaUserSecret,label: 'No tracking, no auth, no backend' },
]

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true },
  transition:  { delay, duration: 0.5 },
})

export default function About() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-14"
      >
        <p className="text-cyber-cyan font-mono text-sm uppercase tracking-widest mb-2">
          // Project info
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          About <span className="gradient-text">CyberQuiz</span>
        </h1>
        <p className="text-cyber-text-dim text-lg max-w-2xl mx-auto leading-relaxed">
          An open-source cybersecurity learning platform built as a portfolio project.
          Fully static, fully client-side, and deployable anywhere.
        </p>
      </motion.div>

      {/* Mission */}
      <motion.div {...fadeUp(0.1)} className="mb-10">
        <GlassCard hover={false} className="p-8 md:p-10">
          <div className="flex items-start gap-5">
            <FaShieldAlt className="text-4xl text-cyber-cyan shrink-0 mt-1 animate-float" />
            <div>
              <h2 className="text-2xl font-bold text-white mb-3">The Mission</h2>
              <p className="text-cyber-text leading-relaxed mb-4">
                Cybersecurity awareness is one of the most impactful skills anyone can develop
                in the digital age. CyberQuiz makes that knowledge accessible — no login,
                no paywall, no ads. Just real questions, instant feedback, and practical explanations.
              </p>
              <p className="text-cyber-text-dim leading-relaxed">
                Every quiz is backed by real-world scenarios, OWASP guidelines, and
                NIST recommendations. The goal isn't to pass a test — it's to change
                how you think about security in everyday life.
              </p>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Features list */}
      <motion.div {...fadeUp(0.15)} className="mb-12">
        <SectionHeader
          eyebrow="// What's inside"
          title="Project Highlights"
          className="mb-8"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
            >
              <GlassCard className="p-4 flex items-center gap-3">
                <f.icon className="text-cyber-cyan shrink-0" />
                <span className="text-cyber-text text-sm">{f.label}</span>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Tech Stack */}
      <motion.div {...fadeUp(0.2)} className="mb-12">
        <SectionHeader
          eyebrow="// Built with"
          title="Tech Stack"
          subtitle="Modern, lightweight tools — no backend required."
          className="mb-8"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {techStack.map((tech, i) => {
            const colorText = {
              cyan: 'text-cyber-cyan', blue: 'text-cyber-blue',
              violet: 'text-cyber-violet', green: 'text-cyber-green',
            }[tech.color]

            return (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <GlassCard className="p-5 flex gap-4 items-start h-full">
                  <tech.icon className={`text-2xl shrink-0 mt-0.5 ${colorText}`} />
                  <div>
                    <h3 className="text-white font-semibold mb-1">{tech.name}</h3>
                    <p className="text-cyber-text-dim text-sm">{tech.desc}</p>
                  </div>
                </GlassCard>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Developer section */}
      <motion.div {...fadeUp(0.25)} className="mb-10">
        <GlassCard hover={false} className="p-8 md:p-10">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar placeholder */}
            <div
              className="shrink-0 w-20 h-20 rounded-full flex items-center justify-center text-3xl"
              style={{
                background: 'linear-gradient(135deg, rgba(0,212,255,0.2), rgba(123,47,255,0.2))',
                border: '2px solid rgba(0,212,255,0.3)',
                boxShadow: '0 0 30px rgba(0,212,255,0.15)',
              }}
            >
              👨‍💻
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-white mb-1">Developer</h2>
              <p className="text-cyber-cyan font-mono text-sm mb-4">
                Full-Stack Developer &amp; Security Enthusiast
              </p>
              <p className="text-cyber-text-dim leading-relaxed mb-6 max-w-xl">
                CyberQuiz is a portfolio project demonstrating React best practices,
                thoughtful UX design, and a passion for making cybersecurity education
                accessible to everyone. Fork it, extend it, deploy it.
              </p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <NeonButton size="sm">
                    <FaGithub /> View on GitHub
                    <FaExternalLinkAlt className="text-xs" />
                  </NeonButton>
                </a>
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Deploy instructions */}
      <motion.div {...fadeUp(0.3)}>
        <SectionHeader
          eyebrow="// Get started"
          title="Deploy Your Own"
          className="mb-6"
        />
        <GlassCard hover={false} className="p-6">
          <p className="text-cyber-text-dim text-sm mb-4">
            Clone the repo, install dependencies, and deploy to GitHub Pages in minutes:
          </p>
          <div
            className="rounded-lg p-5 font-mono text-sm space-y-1 overflow-x-auto"
            style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(0,212,255,0.12)' }}
          >
            {[
              { prompt: '$', cmd: 'git clone https://github.com/your-username/cyberquiz' },
              { prompt: '$', cmd: 'cd cyberquiz && npm install' },
              { prompt: '$', cmd: 'npm run dev          # local dev server' },
              { prompt: '$', cmd: 'npm run build        # production build' },
              { prompt: '$', cmd: 'npm run deploy       # push to gh-pages branch' },
            ].map(({ prompt, cmd }, i) => (
              <div key={i} className="flex gap-3">
                <span className="text-cyber-cyan select-none">{prompt}</span>
                <span className="text-cyber-text">{cmd}</span>
              </div>
            ))}
          </div>
          <p className="text-cyber-text-dim text-xs mt-4">
            Remember to update the <code className="text-cyber-cyan">base</code> in{' '}
            <code className="text-cyber-cyan">vite.config.js</code> and{' '}
            <code className="text-cyber-cyan">basename</code> in{' '}
            <code className="text-cyber-cyan">main.jsx</code> to match your GitHub repo name.
          </p>
        </GlassCard>
      </motion.div>

      {/* Footer note */}
      <motion.div {...fadeUp(0.35)} className="mt-10 text-center">
        <p className="text-cyber-text-dim text-sm flex items-center justify-center gap-2">
          Built with <FaHeart className="text-cyber-red" /> for the open-source community.
          No data leaves your browser.
        </p>
      </motion.div>
    </div>
  )
}
