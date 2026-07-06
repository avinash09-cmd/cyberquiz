# 🛡️ CyberQuiz

A futuristic cybersecurity quiz platform built with React + Vite. Fully static — deployable directly on GitHub Pages with zero backend.

![CyberQuiz Screenshot](https://img.shields.io/badge/Status-Live-00d4ff?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-7b2fff?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-00d4ff?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-7b2fff?style=for-the-badge&logo=vite)

---

## ✨ Features

- **5 quiz categories** — Password Security, Phishing, Network Security, Malware, Web Security
- **50+ curated questions** with real-world explanations
- **30-second countdown timer** per question
- **XP system** — earn points, level up from Rookie to Cyber Sentinel
- **Dashboard** — track best scores, streaks, and accuracy
- **Learning Center** — 6 expandable topic cards with key points and prevention tips
- **LocalStorage persistence** — all data saved client-side, no login required
- **Fully responsive** — works on mobile, tablet, and desktop
- **Animated background** — canvas particle system with glassmorphism cards
- **Neon cyber aesthetic** — dark background, cyan/blue neon, Framer Motion animations

---

## 🚀 Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| React | 18 | UI framework |
| Vite | 5 | Build tool & dev server |
| Tailwind CSS | 3 | Utility-first styling |
| Framer Motion | 11 | Animations |
| React Router | 6 | Client-side routing |
| React Icons | 5 | Icon library |
| LocalStorage | — | Client-side data persistence |

---

## 📁 Project Structure

```
src/
├── components/       # Reusable UI: GlassCard, NeonButton, ProgressBar, StatCard
├── data/
│   ├── quizzes/      # 5 quiz files — each exports 10 questions
│   ├── learnCards.js # Learning content for all 6 topics
│   └── quizMeta.js   # Quiz metadata (title, color, XP reward)
├── hooks/
│   ├── useLocalStorage.js  # Persistent state hook
│   └── useQuizTimer.js     # Countdown timer with color feedback
├── layouts/
│   └── MainLayout.jsx      # Navbar + Footer + AnimatedBackground wrapper
├── pages/            # Home, Quiz, Dashboard, Learn, About, NotFound
├── utils/
│   └── storage.js    # All LocalStorage read/write logic
└── styles/
    └── globals.css   # Tailwind base + custom cyber animations
```

---

## ⚙️ Local Development

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/cyberquiz.git
cd cyberquiz

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
# → http://localhost:5173/cyberquiz/
```

---

## 🌐 Deploy to GitHub Pages

### One-time setup

1. Create a GitHub repository named `cyberquiz`
2. Update `vite.config.js`:
   ```js
   base: '/cyberquiz/',   // ← your repo name
   ```
3. Update `src/main.jsx`:
   ```jsx
   <BrowserRouter basename="/cyberquiz">  // ← your repo name
   ```
4. Push to GitHub and enable Pages (Settings → Pages → Deploy from branch `gh-pages`)

### Deploy

```bash
npm run deploy
```

This runs `vite build` then `gh-pages -d dist` — your site will be live at:
`https://YOUR_USERNAME.github.io/cyberquiz/`

---

## 📝 Adding Quiz Questions

All questions live in `src/data/quizzes/`. Each file exports an array of question objects:

```js
{
  id: 11,
  question: "What is a zero-day vulnerability?",
  options: ["Option A", "Option B", "Option C", "Option D"],
  correct: 1,           // 0-indexed correct answer
  explanation: "A clear, educational explanation shown after answering.",
}
```

---

## 🎨 Customization

The color palette lives in `tailwind.config.js` under `theme.extend.colors.cyber`. Change the neon colors there and the whole app updates.

---

## 📄 License

MIT — free to use, fork, and deploy.

---

*Built for educational purposes. No personal data is collected. Everything runs in your browser.*
