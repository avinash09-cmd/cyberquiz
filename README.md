<div align="center">
░█████╗░██╗░░░██╗██████╗░███████╗██████╗░░██████╗░██╗░░░██╗██╗███████╗
██╔══██╗╚██╗░██╔╝██╔══██╗██╔════╝██╔══██╗██╔═══██╗██║░░░██║██║╚════██║
██║░░╚═╝░╚████╔╝░██████╦╝█████╗░░██████╔╝██║██╗██║██║░░░██║██║░░███╔═╝
██║░░██╗░░╚██╔╝░░██╔══██╗██╔══╝░░██╔══██╗╚██████╔╝██║░░░██║██║██╔══╝░░
╚█████╔╝░░░██║░░░██████╦╝███████╗██║░░██║░╚═██╔═╝░╚██████╔╝██║███████╗
░╚════╝░░░░╚═╝░░░╚═════╝░╚══════╝╚═╝░░╚═╝░░░╚═╝░░░░╚═════╝░╚═╝╚══════╝

<br/>

![Status](https://img.shields.io/badge/STATUS-ONLINE-00ff88?style=for-the-badge&logo=statuspage&logoColor=black)
![React](https://img.shields.io/badge/REACT-18-00d4ff?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/VITE-5-7b2fff?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/TAILWIND-3-0066ff?style=for-the-badge&logo=tailwindcss&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/DEPLOYED-GITHUB%20PAGES-00d4ff?style=for-the-badge&logo=github&logoColor=black)

<br/>

> **`[ SYSTEM ONLINE ] — Test your cybersecurity knowledge. Earn XP. Level up. Stay secure. ]`**

<br/>

### 🌐 [LAUNCH CYBERQUIZ →](https://avinash09-cmd.github.io/cyberquiz/)

</div>

---

## ⚡ INITIALIZING SYSTEM...

```bash
> LOADING MODULES.............. [OK]
> SCANNING QUIZ DATABASE........ [OK]
> CONNECTING TO DASHBOARD........ [OK]
> RENDERING UI.................. [OK]
> SYSTEM STATUS................. [ONLINE]
```

> A fully static cybersecurity quiz platform I built from scratch.
> No backend. No database. No login. Everything runs in your browser.
> Built to look like a real security platform — and to actually teach something.

---

## 🗂️ MODULES

| MODULE | DESCRIPTION | STATUS |
|--------|-------------|--------|
| 🔐 Password Security | Credential hygiene, hashing, MFA | `ACTIVE` |
| 🎣 Phishing Attacks | Social engineering, email spoofing | `ACTIVE` |
| 🌐 Network Security | Firewalls, VPNs, DDoS, MitM | `ACTIVE` |
| 🐛 Malware | Ransomware, rootkits, botnets | `ACTIVE` |
| 💻 Web Security | XSS, SQLi, CSRF, OWASP Top 10 | `ACTIVE` |

---

## 🎮 FEATURES
┌─────────────────────────────────────────────────────┐
│                                                     │
│  ⚡  50+ questions across 5 cybersecurity domains   │
│  ⏱️  30-second countdown timer per question         │
│  💡  Instant explanations after every answer        │
│  🏆  XP system — rank up from Rookie to Sentinel    │
│  📊  Personal dashboard with scores and streaks     │
│  📚  6 in-depth learning cards with tips            │
│  📱  Fully responsive — mobile and desktop          │
│  🔒  Zero tracking — all data stays in your browser │
│                                                     │
└─────────────────────────────────────────────────────┘

---

## 🧬 RANK SYSTEM

| XP RANGE | RANK | LEVEL |
|----------|------|-------|
| 0 — 199 | Rookie | ⬜ 1 |
| 200 — 599 | Junior Hacker | 🟩 2 |
| 600 — 1199 | Security Analyst | 🟦 3 |
| 1200 — 1999 | Threat Hunter | 🟪 4 |
| 2000+ | Cyber Sentinel | 🟥 5 |

---

## 🛠️ TECH STACK

```javascript
const stack = {
  framework:   "React 18",
  bundler:     "Vite 5",
  styling:     "Tailwind CSS 3",
  animations:  "Framer Motion 11",
  routing:     "React Router v6",
  storage:     "LocalStorage (zero backend)",
  deployment:  "GitHub Pages",
  design:      "Glassmorphism + Neon Cyber Theme",
}
```

---

## 📁 FILE STRUCTURE
cyberquiz/
├── 📂 src/
│   ├── 📂 components/     # GlassCard, NeonButton, Navbar, Footer
│   ├── 📂 pages/          # Home, Quiz, Dashboard, Learn, About, 404
│   ├── 📂 data/
│   │   ├── 📂 quizzes/    # 5 question files (10 questions each)
│   │   ├── learnCards.js  # Learning content
│   │   └── quizMeta.js    # Category config
│   ├── 📂 hooks/          # useQuizTimer, useLocalStorage
│   ├── 📂 utils/          # storage.js — XP, scores, streaks
│   └── 📂 styles/         # globals.css — cyber animations
├── vite.config.js         # GitHub Pages base config
└── tailwind.config.js     # Custom cyber theme tokens

---

## 🚀 DEPLOY LOCALLY

```bash
# Clone the repository
git clone https://github.com/avinash09-cmd/cyberquiz.git

# Navigate into the project
cd cyberquiz

# Install dependencies
npm install

# Start dev server
npm run dev

# Production build
npm run build

# Deploy to GitHub Pages
npm run deploy
```

> Live at → **http://localhost:5173/cyberquiz/**

---

## 🎨 DESIGN SYSTEM

```css
--cyber-bg:     #0a0f1e;   /* Deep navy background    */
--cyber-cyan:   #00d4ff;   /* Primary neon accent      */
--cyber-blue:   #0066ff;   /* Secondary accent         */
--cyber-violet: #7b2fff;   /* XP / level accent        */
--cyber-green:  #00ff88;   /* Success / correct        */
--cyber-red:    #ff3860;   /* Danger / wrong answer    */
```

---

## 📖 WHAT I LEARNED

- Building a full multi-page React app with React Router v6
- Designing a glassmorphism UI with Tailwind CSS custom tokens
- Animating components with Framer Motion
- Managing client-side state and persistence with LocalStorage
- Configuring Vite for GitHub Pages static deployment
- Writing clean, reusable component architecture

---

<div align="center">
[ BUILT BY AVINASH ]  [ OPEN SOURCE ]  [ FORK IT. IMPROVE IT. DEPLOY IT. ]

![Visitors](https://img.shields.io/badge/MADE%20WITH-REACT-00d4ff?style=for-the-badge&logo=react&logoColor=black)
![Love](https://img.shields.io/badge/AND-HARD%20WORK-ff3860?style=for-the-badge)

</div>
