// Metadata for each quiz category
// Used in Home, Dashboard, and Quiz selection screens

export const quizMeta = [
  {
    id: 'password-security',
    title: 'Password Security',
    description: 'Test your knowledge of strong password practices and credential management.',
    icon: 'FaLock',
    color: 'cyan',
    gradient: 'from-cyan-500/20 to-blue-500/20',
    border: 'border-cyber-cyan/30',
    difficulty: 'Beginner',
    questionCount: 10,
    xpReward: 100,
  },
  {
    id: 'phishing',
    title: 'Phishing Attacks',
    description: 'Learn to identify social engineering and phishing email tactics.',
    icon: 'FaFish',
    color: 'blue',
    gradient: 'from-blue-500/20 to-violet-500/20',
    border: 'border-cyber-blue/30',
    difficulty: 'Intermediate',
    questionCount: 10,
    xpReward: 150,
  },
  {
    id: 'network-security',
    title: 'Network Security',
    description: 'Understand firewalls, VPNs, protocols, and network attack vectors.',
    icon: 'FaNetworkWired',
    color: 'violet',
    gradient: 'from-violet-500/20 to-cyan-500/20',
    border: 'border-cyber-violet/30',
    difficulty: 'Advanced',
    questionCount: 10,
    xpReward: 200,
  },
  {
    id: 'malware',
    title: 'Malware',
    description: 'Identify types of malware, ransomware, and how they spread.',
    icon: 'FaBug',
    color: 'red',
    gradient: 'from-red-500/20 to-orange-500/20',
    border: 'border-cyber-red/30',
    difficulty: 'Intermediate',
    questionCount: 10,
    xpReward: 150,
  },
  {
    id: 'web-security',
    title: 'Web Security',
    description: 'Explore XSS, SQL injection, CSRF, and OWASP Top 10 vulnerabilities.',
    icon: 'FaGlobe',
    color: 'green',
    gradient: 'from-green-500/20 to-cyan-500/20',
    border: 'border-cyber-green/30',
    difficulty: 'Advanced',
    questionCount: 10,
    xpReward: 200,
  },
]

// Color map for dynamic styling
export const colorMap = {
  cyan:   { text: 'text-cyber-cyan',   bg: 'bg-cyber-cyan',   glow: 'shadow-neon-cyan'   },
  blue:   { text: 'text-cyber-blue',   bg: 'bg-cyber-blue',   glow: 'shadow-neon-blue'   },
  violet: { text: 'text-cyber-violet', bg: 'bg-cyber-violet', glow: 'shadow-neon-violet' },
  green:  { text: 'text-cyber-green',  bg: 'bg-cyber-green',  glow: 'shadow-neon-green'  },
  red:    { text: 'text-cyber-red',    bg: 'bg-cyber-red',    glow: 'shadow-neon-cyan'   },
}
