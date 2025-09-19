import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Instagram, 
  Linkedin, 
  Twitter,
  ArrowUp
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import logo from '../../assets/logos/WEBBITZ_5.png'

const Footer = () => {
  const { t } = useTranslation()
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Get footer links from translations
  const footerLinks = {
    servizi: t('footer.links.servizi', { returnObjects: true }),
    azienda: t('footer.links.azienda', { returnObjects: true }),
    supporto: t('footer.links.supporto', { returnObjects: true })
  }

  const socialLinks = [
    { icon: Instagram, href: '#', label: t('footer.social.instagram') },
    { icon: Linkedin, href: '#', label: t('footer.social.linkedin') },
    { icon: Twitter, href: '#', label: t('footer.social.twitter') },
  ]

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-primary-700/20"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_50%)]"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-6xl mx-auto px-4 py-6 md:py-10">
          {/* Brand Section - Centered */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-6 mb-8"
          >
            <Link to="/" className="flex-shrink-0">
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <img 
                  src={logo} 
                  alt="Webbitz Logo" 
                  className="w-20 h-20 object-contain"
                  style={{ filter: 'drop-shadow(0 0 10px rgba(139, 92, 246, 0.3))' }}
                />
                <div className="absolute inset-0 rounded-xl blur-lg opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
              </motion.div>
            </Link>
            
            <div className="flex-1 max-w-xl">
              <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                {t('footer.description')}
              </p>
            </div>
          </motion.div>



          {/* Links and Newsletter Section - Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-6">
            {/* Links Sections - 3 columns */}
            <div className="lg:col-span-3 grid grid-cols-3 gap-4 md:gap-6 items-center">
              {Object.entries(footerLinks).map(([category, section], index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <h3 className="text-sm md:text-base font-display font-semibold text-white mb-2 md:mb-3">
                    {(section as any).title}
                  </h3>
                  <ul className="space-y-1 md:space-y-2">
                    {(section as any).items.map((link: any) => (
                      <li key={link.name}>
                        <Link
                          to={link.href}
                          className="text-gray-300 hover:text-primary-400 transition-colors duration-300 group inline-block text-xs md:text-base"
                        >
                          <span className="group-hover:translate-x-1 transition-transform duration-300 inline-block">
                            {link.name}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* Newsletter Section - 1 column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-1 p-6 rounded-2xl bg-gradient-to-r from-primary-600/10 to-primary-800/10 border border-primary-500/20 text-center flex flex-col justify-center"
            >
              <h3 className="text-xl font-display font-bold text-white mb-3">
                {t('footer.newsletter.title')}
              </h3>
              <p className="text-gray-300 mb-4 text-sm">
                {t('footer.newsletter.description')}
              </p>
              <div className="flex flex-col gap-3">
                <input
                  type="email"
                  placeholder={t('footer.newsletter.placeholder')}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent backdrop-blur-sm text-sm"
                />
                <button className="btn-primary text-sm py-3">
                  {t('footer.newsletter.button')}
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Contact Info - Above Bottom Bar */}
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <div className="flex items-center space-x-3 text-gray-300">
              <Mail className="w-5 h-5 text-primary-400" />
              <span className="text-sm">{t('footer.contact.email')}</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-300">
              <Phone className="w-5 h-5 text-primary-400" />
              <span className="text-sm">{t('footer.contact.phone')}</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-300">
              <MapPin className="w-5 h-5 text-primary-400" />
              <span className="text-sm">{t('footer.contact.location')}</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Centered */}
        <div className="border-t border-gray-700/50">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex flex-col items-center justify-center space-y-3">
              {/* Social Links - Top */}
              <div className="flex items-center space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-gray-400 hover:text-primary-400 hover:bg-primary-500/20 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>

              {/* Copyright - Center */}
              <div className="text-gray-400 text-sm text-center">
                {t('footer.copyright')}
              </div>


            </div>
          </div>
        </div>
      </div>

      {/* Fixed Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center text-white shadow-glow hover:shadow-glow-lg transition-all duration-300 z-50"
        aria-label={t('footer.backToTop')}
      >
        <ArrowUp className="w-6 h-6" />
      </motion.button>
    </footer>
  )
}

export default Footer