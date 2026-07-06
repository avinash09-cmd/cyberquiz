import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home       from './pages/Home'
import Quiz       from './pages/Quiz'
import Dashboard  from './pages/Dashboard'
import Learn      from './pages/Learn'
import About      from './pages/About'
import NotFound   from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      {/* All pages share the MainLayout (Navbar + Footer + AnimatedBackground) */}
      <Route element={<MainLayout />}>
        <Route index        element={<Home />}      />
        <Route path="learn"      element={<Learn />}     />
        <Route path="quiz"       element={<Quiz />}      />
        <Route path="quiz/:quizId" element={<Quiz />}    />
        <Route path="dashboard"  element={<Dashboard />} />
        <Route path="about"      element={<About />}     />
        {/* Catch-all 404 */}
        <Route path="*"          element={<NotFound />}  />
      </Route>
    </Routes>
  )
}
