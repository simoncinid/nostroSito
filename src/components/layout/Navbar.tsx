import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import logo from '../../assets/logos/LogoWebbitz.png'
import ContactFormModal from '../modals/ContactFormModal'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'nav.home', path: '/' },
    { name: 'nav.about', path: '/about', isExtended: true },
    { name: 'nav.services', path: '/services' },
    { name: 'nav.portfolio', path: '/portfolio' },
    { name: 'nav.contact', path: '/contact' },
  ]

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 lg:top-4 left-0 right-0 z-50 transition-all duration-500 flex justify-center w-full lg:w-auto max-w-full lg:max-w-[80vw] ${
          scrolled 
            ? 'bg-white/90 lg:bg-white/40 backdrop-blur-md border-b lg:border border-white/10 shadow-lg lg:shadow-premium' 
            : 'bg-transparent'
        } lg:rounded-2xl`}
        style={{ 
          margin: '0 auto'
        }}
      >
        <div className="px-4 lg:px-6 w-full">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group flex-shrink-0" onClick={closeMenu}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <img 
                  src={logo} 
                  alt="Webbitz Logo" 
                  className="w-36 h-36 object-contain"
                  style={{ filter: 'drop-shadow(0 0 10px rgba(232, 80, 2, 0.3))' }}
                />
                <div className="absolute inset-0 rounded-xl blur-lg opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
              </motion.div>
            </Link>

            {/* Desktop Navigation - Centrato */}
            <div className="hidden lg:flex items-center space-x-6 absolute left-1/2 transform -translate-x-1/2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-3 py-2 font-medium text-sm transition-all duration-300 group ${
                    location.pathname === item.path
                      ? 'text-primary-600'
                      : 'text-gray-700 hover:text-primary-600'
                  } ${item.isExtended ? 'px-6' : ''}`}
                >
                  {t(item.name)}
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-primary"
                    initial={{ width: 0 }}
                    animate={{ 
                      width: location.pathname === item.path ? '100%' : 0 
                    }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center flex-shrink-0">
              <button
                onClick={() => {
                  setIsContactModalOpen(true)
                  closeMenu()
                }}
                className="btn-primary group relative overflow-hidden py-2 px-4 text-sm"
              >
                <span className="relative z-10">{t('nav.startNow')}</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary-700 to-primary-900"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={toggleMenu}
                className="p-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-6 h-6 text-gray-700" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-6 h-6 text-gray-700" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-xl border-t border-gray-200 lg:rounded-b-2xl lg:mx-4 lg:mt-2"
            >
              <div className="px-6 py-8">
                <div className="flex flex-col space-y-3">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={item.path}
                        onClick={closeMenu}
                        className={`block px-6 py-4 rounded-xl font-medium text-lg transition-all duration-300 ${
                          location.pathname === item.path
                            ? 'bg-primary-100 text-primary-700 border-2 border-primary-300 shadow-md'
                            : 'text-gray-800 hover:bg-gray-100 hover:text-primary-600'
                        }`}
                      >
                        {t(item.name)}
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navItems.length * 0.1 }}
                    className="pt-6"
                  >
                    <button
                      onClick={() => {
                        setIsContactModalOpen(true)
                        closeMenu()
                      }}
                      className="btn-primary w-full text-center py-4 text-lg font-semibold shadow-lg"
                    >
                      {t('nav.startNow')}
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <ContactFormModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </>
  )
}

export default Navbar 