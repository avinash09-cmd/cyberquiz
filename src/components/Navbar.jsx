import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaShieldAlt, FaBars, FaTimes,
  FaHome, FaGraduationCap, FaQuestionCircle,
  FaTachometerAlt, FaInfoCircle
} from 'react-icons/fa'

const navLinks = [
  { to: '/',          label: 'Home',      icon: FaHome           },
  { to: '/learn',     label: 'Learn',     icon: FaGraduationCap  },
  { to: '/quiz',      label: 'Quiz',      icon: FaQuestionCircle },
  { to: '/dashboard', label: 'Dashboard', icon: FaTachometerAlt  },
  { to: '/about',     label: 'About',     icon: FaInfoCircle     },
]

export default function Navbar() {
  const [isOpen,     setIsOpen]     = useState(false)
  const [scrolled,   setScrolled]   = useState(false)
  const location = useLocation()

  // Close mobile menu on route change
  useEffect(() => { setIsOpen(false) }, [location])

  // Add background blur when scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? 'rgba(10,15,30,0.95)'
          : 'rgba(10,15,30,0.7)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0,212,255,0.1)',
        boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.5)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <FaShieldAlt
                className="text-2xl text-cyber-cyan transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(0,212,255,0.8)]"
              />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-cyber-green rounded-full animate-pulse-glow" />
            </div>
            <span className="font-mono text-xl font-bold gradient-text tracking-wider">
              CYBER<span className="text-white">QUIZ</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${isActive
                    ? 'text-cyber-cyan bg-cyber-cyan/10 border border-cyber-cyan/30 shadow-neon-cyan'
                    : 'text-cyber-text hover:text-cyber-cyan hover:bg-cyber-cyan/5'
                  }`
                }
              >
                <Icon className="text-xs" />
                {label}
              </NavLink>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(prev => !prev)}
            className="md:hidden p-2 rounded-lg text-cyber-cyan border border-cyber-cyan/30 hover:bg-cyber-cyan/10 transition-colors"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden"
            style={{ borderTop: '1px solid rgba(0,212,255,0.1)' }}
          >
            <div className="px-4 py-3 space-y-1 bg-cyber-bg/95">
              {navLinks.map(({ to, label, icon: Icon }, i) => (
                <motion.div
                  key={to}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <NavLink
                    to={to}
                    end={to === '/'}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all
                      ${isActive
                        ? 'text-cyber-cyan bg-cyber-cyan/10 border border-cyber-cyan/20'
                        : 'text-cyber-text hover:text-cyber-cyan hover:bg-cyber-cyan/5'
                      }`
                    }
                  >
                    <Icon />
                    {label}
                  </NavLink>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
