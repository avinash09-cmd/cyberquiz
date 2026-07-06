import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AnimatedBackground from '../components/AnimatedBackground'

export default function MainLayout() {
  return (
    <div className="relative min-h-screen flex flex-col" style={{ background: '#0a0f1e' }}>
      {/* Decorative background (fixed, z-0) */}
      <AnimatedBackground />

      {/* Navbar (z-50) */}
      <Navbar />

      {/* Page content (z-10, padded for navbar) */}
      <main className="relative z-10 flex-1 pt-16">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
