/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg:       '#0a0f1e',
          'bg-2':   '#0d1527',
          'bg-3':   '#111c35',
          cyan:     '#00d4ff',
          blue:     '#0066ff',
          violet:   '#7b2fff',
          green:    '#00ff88',
          red:      '#ff3860',
          'cyan-dim': '#00a8cc',
          'text':   '#c8d8e8',
          'text-dim': '#6b8098',
        }
      },
      fontFamily: {
        mono:  ['"Share Tech Mono"', 'monospace'],
        sans:  ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'neon-cyan':   '0 0 20px rgba(0,212,255,0.4), 0 0 60px rgba(0,212,255,0.1)',
        'neon-blue':   '0 0 20px rgba(0,102,255,0.4), 0 0 60px rgba(0,102,255,0.1)',
        'neon-violet': '0 0 20px rgba(123,47,255,0.4), 0 0 60px rgba(123,47,255,0.1)',
        'neon-green':  '0 0 20px rgba(0,255,136,0.4), 0 0 60px rgba(0,255,136,0.1)',
        'glass':       '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
      },
      backgroundImage: {
        'gradient-cyber': 'linear-gradient(135deg, #0a0f1e 0%, #0d1527 50%, #111c35 100%)',
        'gradient-neon':  'linear-gradient(90deg, #00d4ff, #0066ff)',
        'gradient-card':  'linear-gradient(135deg, rgba(0,212,255,0.05), rgba(0,102,255,0.05))',
      },
      animation: {
        'pulse-slow':  'pulse 3s ease-in-out infinite',
        'float':       'float 6s ease-in-out infinite',
        'scan':        'scan 4s linear infinite',
        'glitch':      'glitch 0.3s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        scan: {
          '0%':   { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '0% 100%' },
        },
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
