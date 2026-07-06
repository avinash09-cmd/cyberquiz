// Utility functions for managing CyberQuiz data in LocalStorage
// All data is stored client-side — no backend required

const STORAGE_KEYS = {
  BEST_SCORES:      'cyberquiz_best_scores',
  COMPLETED_QUIZZES:'cyberquiz_completed',
  TOTAL_XP:         'cyberquiz_xp',
  STREAK:           'cyberquiz_streak',
  LAST_QUIZ_DATE:   'cyberquiz_last_date',
}

// ─── Score Management ───────────────────────────────────────────────────────

/** Save a quiz result; only keep the best score per quiz */
export function saveQuizResult(quizId, score, total) {
  const percentage = Math.round((score / total) * 100)

  // Update best scores
  const bestScores = getBestScores()
  const previous   = bestScores[quizId] || 0
  if (percentage > previous) {
    bestScores[quizId] = percentage
    localStorage.setItem(STORAGE_KEYS.BEST_SCORES, JSON.stringify(bestScores))
  }

  // Track completions
  const completed = getCompletedQuizzes()
  if (!completed.includes(quizId)) {
    completed.push(quizId)
    localStorage.setItem(STORAGE_KEYS.COMPLETED_QUIZZES, JSON.stringify(completed))
  }

  // Award XP (only for new best score improvement or first completion)
  if (percentage > previous || !completed.includes(quizId)) {
    const xpEarned = Math.round((percentage / 100) * getXpRewardForQuiz(quizId))
    addXP(xpEarned)
  }

  // Update streak
  updateStreak()

  return { percentage, isNewBest: percentage > previous }
}

/** Get all best scores { quizId: percentage } */
export function getBestScores() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.BEST_SCORES)) || {}
  } catch {
    return {}
  }
}

/** Get best score for a specific quiz */
export function getBestScore(quizId) {
  return getBestScores()[quizId] || null
}

// ─── Quiz Completion Tracking ────────────────────────────────────────────────

export function getCompletedQuizzes() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.COMPLETED_QUIZZES)) || []
  } catch {
    return []
  }
}

export function getCompletionCount() {
  return getCompletedQuizzes().length
}

// ─── XP System ───────────────────────────────────────────────────────────────

export function getTotalXP() {
  return parseInt(localStorage.getItem(STORAGE_KEYS.TOTAL_XP) || '0', 10)
}

export function addXP(amount) {
  const current = getTotalXP()
  localStorage.setItem(STORAGE_KEYS.TOTAL_XP, String(current + amount))
}

/** XP level thresholds */
export function getLevel(xp) {
  if (xp >= 2000) return { level: 5, title: 'Cyber Sentinel' }
  if (xp >= 1200) return { level: 4, title: 'Threat Hunter' }
  if (xp >= 600)  return { level: 3, title: 'Security Analyst' }
  if (xp >= 200)  return { level: 2, title: 'Junior Hacker' }
  return            { level: 1, title: 'Rookie' }
}

/** XP reward per quiz (matching quizMeta.js) */
function getXpRewardForQuiz(quizId) {
  const rewards = {
    'password-security': 100,
    'phishing':          150,
    'network-security':  200,
    'malware':           150,
    'web-security':      200,
  }
  return rewards[quizId] || 100
}

// ─── Streak System ────────────────────────────────────────────────────────────

export function updateStreak() {
  const today    = new Date().toDateString()
  const lastDate = localStorage.getItem(STORAGE_KEYS.LAST_QUIZ_DATE)
  const streak   = getStreak()

  if (lastDate === today) {
    // Already quizzed today — streak unchanged
    return streak
  }

  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)

  let newStreak
  if (lastDate === yesterday.toDateString()) {
    // Consecutive day — increment
    newStreak = streak + 1
  } else {
    // Streak broken — reset to 1
    newStreak = 1
  }

  localStorage.setItem(STORAGE_KEYS.STREAK, String(newStreak))
  localStorage.setItem(STORAGE_KEYS.LAST_QUIZ_DATE, today)
  return newStreak
}

export function getStreak() {
  return parseInt(localStorage.getItem(STORAGE_KEYS.STREAK) || '0', 10)
}

// ─── Accuracy Calculation ────────────────────────────────────────────────────

/** Average of all best scores as overall accuracy */
export function getOverallAccuracy() {
  const scores = Object.values(getBestScores())
  if (scores.length === 0) return 0
  return Math.round(scores.reduce((sum, s) => sum + s, 0) / scores.length)
}

// ─── Full Dashboard Stats ────────────────────────────────────────────────────

export function getDashboardStats() {
  const xp       = getTotalXP()
  const levelInfo = getLevel(xp)

  return {
    bestScores:       getBestScores(),
    completedQuizzes: getCompletedQuizzes(),
    totalCompleted:   getCompletionCount(),
    accuracy:         getOverallAccuracy(),
    streak:           getStreak(),
    xp,
    level:            levelInfo.level,
    levelTitle:       levelInfo.title,
  }
}

// ─── Reset (for testing) ─────────────────────────────────────────────────────

export function resetAllData() {
  Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key))
}
