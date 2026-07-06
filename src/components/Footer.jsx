import { Link } from 'react-router-dom'
import { FaShieldAlt, FaGithub, FaHeart } from 'react-icons/fa'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="relative z-10 mt-auto"
      style={{
        borderTop: '1px solid rgba(0,212,255,0.1)',
        background: 'rgba(10,15,30,0.8)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FaShieldAlt className="text-cyber-cyan text-xl" />
              <span className="font-mono text-lg font-bold gradient-text tracking-wider">
                CYBER<span className="text-white">QUIZ</span>
              </span>
            </div>
            <p className="text-cyber-text-dim text-sm leading-relaxed">
              An open-source cybersecurity learning platform.
              Test your knowledge, track your progress, and stay secure.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-cyber-cyan font-mono text-sm font-semibold mb-3 uppercase tracking-widest">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { to: '/', label: 'Home' },
                { to: '/quiz', label: 'Take a Quiz' },
                { to: '/learn', label: 'Learning Center' },
                { to: '/dashboard', label: 'My Dashboard' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-cyber-text-dim hover:text-cyber-cyan text-sm transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Topics */}
          <div>
            <h3 className="text-cyber-cyan font-mono text-sm font-semibold mb-3 uppercase tracking-widest">
              Quiz Topics
            </h3>
            <ul className="space-y-2">
              {['Password Security', 'Phishing', 'Network Security', 'Malware', 'Web Security'].map(t => (
                <li key={t} className="text-cyber-text-dim text-sm">{t}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(0,212,255,0.06)' }}
        >
          <p className="text-cyber-text-dim text-xs font-mono">
            © {year} CyberQuiz — Educational use only. No backend. No tracking.
          </p>
          <div className="flex items-center gap-4 text-cyber-text-dim text-xs">
            <span className="flex items-center gap-1">
              Built with <FaHeart className="text-cyber-red mx-1" /> and React
            </span>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyber-cyan transition-colors flex items-center gap-1"
            >
              <FaGithub /> GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
