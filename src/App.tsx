import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/ScrollToTop'
import FixedLanguageSelector from './components/FixedLanguageSelector'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Portfolio from './pages/Portfolio'
import Contact from './pages/Contact'
import Faq from './pages/Faq'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Reviews from './pages/Reviews'
import { Analytics } from '@vercel/analytics/react'
import './index.css'

function App() {
  useEffect(() => {
    // Smooth scroll polyfill per browser più vecchi
    if (!('scrollBehavior' in document.documentElement.style)) {
      import('smoothscroll-polyfill').then(smoothscroll => {
        smoothscroll.polyfill()
      })
    }
  }, [])

  return (
    <div className="App min-h-screen bg-white overflow-x-hidden">
      <ScrollToTop />
      <Navbar />
      <main className="relative">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </main>
      <Footer />
      <FixedLanguageSelector />
      <Analytics />
    </div>
  )
}

export default App
