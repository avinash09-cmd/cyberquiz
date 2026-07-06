import { motion } from 'framer-motion'

// ─── GlassCard ────────────────────────────────────────────────────────────────
/**
 * Glassmorphism card with optional hover glow.
 * @param {string}  className   — additional Tailwind classes
 * @param {boolean} hover       — whether to animate on hover
 * @param {string}  glowColor   — CSS color for hover glow (default cyan)
 */
export function GlassCard({ children, className = '', hover = true, glowColor = 'rgba(0,212,255,0.15)', onClick, ...props }) {
  const Tag = hover ? motion.div : 'div'
  const motionProps = hover
    ? {
        whileHover: { y: -4, boxShadow: `0 20px 40px ${glowColor}, 0 8px 32px rgba(0,0,0,0.4)` },
        transition: { duration: 0.2 },
      }
    : {}

  return (
    <Tag
      className={`glass-card rounded-xl ${className}`}
      onClick={onClick}
      {...motionProps}
      {...props}
    >
      {children}
    </Tag>
  )
}

// ─── NeonButton ───────────────────────────────────────────────────────────────
/**
 * Primary neon gradient button or ghost variant.
 * @param {'primary'|'ghost'|'danger'} variant
 */
export function NeonButton({
  children,
  variant  = 'primary',
  size     = 'md',
  disabled = false,
  className = '',
  onClick,
  type = 'button',
  ...props
}) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  }

  const variantClasses = {
    primary: 'btn-neon text-cyber-bg',
    ghost:   'btn-ghost text-cyber-cyan',
    danger:  'bg-cyber-red/10 border border-cyber-red/40 text-cyber-red hover:bg-cyber-red/20 hover:border-cyber-red transition-all',
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileTap={disabled ? {} : { scale: 0.97 }}
      className={`
        relative inline-flex items-center justify-center gap-2 rounded-lg font-semibold
        transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyber-cyan/50
        disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none
        ${sizeClasses[size]} ${variantClasses[variant]} ${className}
      `}
      {...props}
    >
      {children}
    </motion.button>
  )
}

// ─── ProgressBar ─────────────────────────────────────────────────────────────
/**
 * Animated horizontal progress bar.
 * @param {number}  value      — 0–100
 * @param {string}  color      — 'cyan' | 'green' | 'red' | 'blue' | 'violet'
 * @param {boolean} showLabel  — whether to show the percentage label
 */
export function ProgressBar({ value = 0, color = 'cyan', showLabel = false, className = '' }) {
  const clampedValue = Math.min(100, Math.max(0, value))

  const gradients = {
    cyan:   'from-cyber-cyan to-cyber-blue',
    green:  'from-cyber-green to-cyber-cyan',
    red:    'from-cyber-red to-orange-500',
    blue:   'from-cyber-blue to-cyber-violet',
    violet: 'from-cyber-violet to-cyber-blue',
  }

  return (
    <div className={`relative ${className}`}>
      <div
        className="w-full h-2 rounded-full overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.06)' }}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${gradients[color]}`}
          initial={{ width: 0 }}
          animate={{ width: `${clampedValue}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{
            boxShadow: color === 'cyan' ? '0 0 10px rgba(0,212,255,0.6)' :
                       color === 'green' ? '0 0 10px rgba(0,255,136,0.6)' :
                       color === 'red'   ? '0 0 10px rgba(255,56,96,0.6)' :
                       '0 0 10px rgba(0,102,255,0.6)'
          }}
        />
      </div>
      {showLabel && (
        <span className="absolute right-0 -top-5 text-xs text-cyber-text-dim font-mono">
          {clampedValue}%
        </span>
      )}
    </div>
  )
}

// ─── StatCard ────────────────────────────────────────────────────────────────
/**
 * Dashboard stat card with icon, value, and label.
 */
export function StatCard({ icon: Icon, value, label, color = 'cyan', suffix = '', delay = 0 }) {
  const colorMap = {
    cyan:   'text-cyber-cyan',
    green:  'text-cyber-green',
    blue:   'text-cyber-blue',
    violet: 'text-cyber-violet',
    red:    'text-cyber-red',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="glass-card rounded-xl p-5 flex flex-col gap-3"
      style={{ border: '1px solid rgba(0,212,255,0.12)' }}
    >
      <div className={`${colorMap[color]} text-2xl`}>
        <Icon />
      </div>
      <div>
        <div className="text-3xl font-bold font-mono text-white">
          {value}<span className={`text-lg ${colorMap[color]}`}>{suffix}</span>
        </div>
        <div className="text-cyber-text-dim text-sm mt-1">{label}</div>
      </div>
    </motion.div>
  )
}

// ─── SectionHeader ────────────────────────────────────────────────────────────
export function SectionHeader({ eyebrow, title, subtitle, className = '' }) {
  return (
    <div className={`text-center ${className}`}>
      {eyebrow && (
        <p className="text-cyber-cyan font-mono text-sm uppercase tracking-widest mb-2">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h2>
      {subtitle && (
        <p className="text-cyber-text-dim text-lg max-w-2xl mx-auto">{subtitle}</p>
      )}
    </div>
  )
}

// ─── Badge ───────────────────────────────────────────────────────────────────
export function Badge({ children, color = 'cyan' }) {
  const colorMap = {
    cyan:   'text-cyber-cyan   border-cyber-cyan/40   bg-cyber-cyan/10',
    green:  'text-cyber-green  border-cyber-green/40  bg-cyber-green/10',
    blue:   'text-cyber-blue   border-cyber-blue/40   bg-cyber-blue/10',
    violet: 'text-cyber-violet border-cyber-violet/40 bg-cyber-violet/10',
    red:    'text-cyber-red    border-cyber-red/40    bg-cyber-red/10',
  }
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono border ${colorMap[color]}`}>
      {children}
    </span>
  )
}
