import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Sparkles, 
  Mail, 
  Phone, 
  MapPin, 
  Instagram, 
  Linkedin, 
  Twitter,
  ArrowUp
} from 'lucide-react'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const footerLinks = {
    servizi: [
      { name: 'Sviluppo Web', href: '/services#web' },
      { name: 'Chatbot AI', href: '/services#chatbot' },
      { name: 'SEO & Marketing', href: '/services#seo' },
      { name: 'Brand Identity', href: '/services#branding' },
    ],
    azienda: [
      { name: 'Chi Siamo', href: '/about' },
      { name: 'Portfolio', href: '/portfolio' },
      { name: 'Testimonianze', href: '/testimonials' },
      { name: 'Blog', href: '/blog' },
    ],
    supporto: [
      { name: 'Contatti', href: '/contact' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Termini di Servizio', href: '/terms' },
    ]
  }

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ]

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden mt-16">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-primary-700/20"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_50%)]"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          {/* Brand Section - Centered */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <Link to="/" className="inline-flex items-center space-x-3 group mb-6">
              <motion.div
                whileHover={{ rotate: 180, scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-primary rounded-xl blur-lg opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
              </motion.div>
              <div className="flex flex-col">
                <span className="text-2xl font-display font-bold text-white">
                  Webbitz
                </span>
                <span className="text-sm text-gray-400 font-medium tracking-wider">
                  DIGITAL AGENCY
                </span>
              </div>
            </Link>
            
            <p className="text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
              Trasformiamo le tue idee in esperienze digitali straordinarie. 
              Soluzioni premium per aziende che vogliono distinguersi.
            </p>

            {/* Contact Info - Centered */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-8">
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="w-5 h-5 text-primary-400" />
                <span>info@webbitz.it</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone className="w-5 h-5 text-primary-400" />
                <span>+39 123 456 7890</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin className="w-5 h-5 text-primary-400" />
                <span>Pontedera (PI), Italia</span>
              </div>
            </div>
          </motion.div>

          {/* Links Sections - Centered Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
            {Object.entries(footerLinks).map(([category, links], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <h3 className="text-lg font-display font-semibold text-white mb-6 capitalize">
                  {category}
                </h3>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="text-gray-300 hover:text-primary-400 transition-colors duration-300 group inline-block"
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

          {/* Newsletter Section - Centered */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-2xl mx-auto p-8 rounded-2xl bg-gradient-to-r from-primary-600/10 to-primary-800/10 border border-primary-500/20 text-center"
          >
            <h3 className="text-2xl font-display font-bold text-white mb-4">
              Resta Aggiornato
            </h3>
            <p className="text-gray-300 mb-6">
              Ricevi le ultime novità su design, tecnologia e strategie digitali
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="La tua email"
                className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent backdrop-blur-sm"
              />
              <button className="btn-primary whitespace-nowrap">
                Iscriviti
              </button>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar - Centered */}
        <div className="border-t border-gray-700/50">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex flex-col items-center justify-center space-y-4">
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
                © 2024 Webbitz. Tutti i diritti riservati.
              </div>

              {/* Back to Top - Bottom */}
              <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center text-white shadow-glow hover:shadow-glow-lg transition-all duration-300"
                aria-label="Torna su"
              >
                <ArrowUp className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 