import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import ReactCountryFlag from 'react-country-flag'
import { ChevronDown } from 'lucide-react'

interface Language {
  code: string
  name: string
  countryCode: string
}

const languages: Language[] = [
  { code: 'it', name: 'language.italian', countryCode: 'IT' },
  { code: 'en', name: 'language.english', countryCode: 'GB' },
  { code: 'fr', name: 'language.french', countryCode: 'FR' },
  { code: 'es', name: 'language.spanish', countryCode: 'ES' },
  { code: 'de', name: 'language.german', countryCode: 'DE' },
]

const FixedLanguageSelector = () => {
  const { i18n, t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const changeLanguage = (languageCode: string) => {
    i18n.changeLanguage(languageCode)
    setIsOpen(false)
  }

  return (
    <div className="fixed bottom-6 left-6 z-50" ref={dropdownRef}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-white/90 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 text-gray-700 hover:text-blue-600"
      >
        <ReactCountryFlag
          countryCode={currentLanguage.countryCode}
          svg
          style={{
            width: '20px',
            height: '15px',
          }}
        />
        <ChevronDown 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full left-0 mb-2 bg-white/95 backdrop-blur-xl rounded-xl border border-white/20 shadow-lg min-w-[180px] z-50"
          >
            <div className="py-2">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => changeLanguage(language.code)}
                  className={`
                    w-full flex items-center space-x-3 px-4 py-2 text-left transition-all duration-200
                    ${currentLanguage.code === language.code 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  <ReactCountryFlag
                    countryCode={language.countryCode}
                    svg
                    style={{
                      width: '20px',
                      height: '15px',
                    }}
                  />
                  <span className="text-sm font-medium">{t(language.name)}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default FixedLanguageSelector
