import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './styles/globals.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* BrowserRouter wraps the whole app for client-side routing */}
    <BrowserRouter basename="/cyberquiz">
      <App />
    </BrowserRouter>
  </StrictMode>,
)
