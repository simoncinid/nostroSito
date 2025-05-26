import { motion } from 'framer-motion'
import { Check, Star, Zap, Crown, ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

const WebbitzPackages = () => {
  const packages = [
    {
      id: 'essential',
      name: 'Webbitz Essential',
      price: '1999',
      originalPrice: '2999',
      badge: 'Più Popolare',
      badgeColor: 'bg-primary-500',
      icon: Zap,
      description: 'La soluzione completa per il tuo business digitale',
      features: [
        'Sito Web Responsive Premium',
        'Chatbot AI per Lead Generation',
        'SEO Ottimizzazione Completa',
        'Analytics e Tracking Avanzato',
        'Hosting Premium 1 Anno',
        'SSL Certificate Incluso',
        'Supporto 24/7 per 6 Mesi',
        'Training Team Completo',
        'Manutenzione 3 Mesi Gratuita'
      ],
      highlights: [
        'ROI Garantito del 300%',
        'Setup in 15 giorni',
        'Chatbot che converte il 25% del traffico'
      ],
      cta: 'Inizia Ora',
      popular: true
    },
    {
      id: 'premium',
      name: 'Webbitz Premium',
      price: '2299',
      originalPrice: '3499',
      badge: 'Valore Massimo',
      badgeColor: 'bg-gradient-to-r from-yellow-400 to-yellow-600',
      icon: Crown,
      description: 'Essential + Brand Identity completa per dominare il mercato',
      features: [
        'Tutto di Webbitz Essential',
        'Brand Identity Completa',
        'Logo Design Professionale',
        'Palette Colori Studiata',
        'Typography System',
        'Brand Guidelines Complete',
        'Business Card Design',
        'Social Media Templates',
        'Packaging Design (se applicabile)',
        'Supporto Esteso 12 Mesi'
      ],
      highlights: [
        'Brand Recognition +400%',
        'Identità Visiva Memorabile',
        'Coerenza su Tutti i Canali'
      ],
      cta: 'Scegli Premium',
      popular: false
    }
  ]

  return (
    <section className="py-12 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.1),transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(139,92,246,0.1),transparent_50%)]"></div>
      </div>

      <div className="container-premium relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-primary-500/20 border border-primary-400/30 backdrop-blur-sm mb-8"
          >
            <Sparkles className="w-5 h-5 text-primary-400" />
            <span className="text-primary-300 font-medium">Pacchetti Webbitz</span>
          </motion.div>

          <h2 className="heading-lg text-white mb-6">
            Soluzioni{' '}
            <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              All-in-One
            </span>
            {' '}per il Tuo Successo
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Pacchetti completi che combinano sito web, chatbot AI, SEO e brand identity. 
            Tutto quello che serve per dominare il mercato digitale.
          </p>
        </motion.div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className={`relative group ${
                pkg.popular 
                  ? 'lg:scale-105 lg:-translate-y-4' 
                  : ''
              }`}
            >
              {/* Card */}
              <div className={`relative bg-white/5 backdrop-blur-xl rounded-3xl border ${
                pkg.popular 
                  ? 'border-primary-400/50 shadow-glow-lg' 
                  : 'border-white/10'
              } p-8 h-full transition-all duration-500 group-hover:shadow-premium-lg group-hover:border-primary-400/30`}>
                
                {/* Popular Badge */}
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className={`${pkg.badgeColor} text-white px-6 py-2 rounded-full text-sm font-semibold shadow-glow`}>
                      {pkg.badge}
                    </div>
                  </div>
                )}

                {/* Header */}
                <div className="text-center mb-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 ${
                    pkg.popular 
                      ? 'bg-gradient-primary shadow-glow' 
                      : 'bg-white/10'
                  }`}>
                    <pkg.icon className={`w-8 h-8 ${
                      pkg.popular ? 'text-white' : 'text-primary-400'
                    }`} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                  <p className="text-gray-300 mb-6">{pkg.description}</p>
                  
                  {/* Pricing */}
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <span className="text-gray-400 line-through text-lg">€{pkg.originalPrice}</span>
                    <span className="text-4xl font-bold text-white">€{pkg.price}</span>
                  </div>
                  <div className="text-primary-400 font-medium">
                    Risparmi €{parseInt(pkg.originalPrice) - parseInt(pkg.price)}
                  </div>
                </div>

                {/* Highlights */}
                <div className="mb-8">
                  <h4 className="text-white font-semibold mb-4 flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 mr-2" />
                    Risultati Garantiti
                  </h4>
                  <div className="space-y-2">
                    {pkg.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center text-gray-300">
                        <div className="w-2 h-2 bg-primary-400 rounded-full mr-3"></div>
                        <span className="text-sm">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-8">
                  <h4 className="text-white font-semibold mb-4">Cosa Include:</h4>
                  <div className="space-y-3">
                    {pkg.features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05, duration: 0.3 }}
                        className="flex items-center text-gray-300"
                      >
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 ${
                          pkg.popular 
                            ? 'bg-primary-500/20 border border-primary-400/30' 
                            : 'bg-white/10 border border-white/20'
                        }`}>
                          <Check className={`w-3 h-3 ${
                            pkg.popular ? 'text-primary-400' : 'text-gray-400'
                          }`} />
                        </div>
                        <span className="text-sm">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <Link
                  to="/contact"
                  className={`group/btn relative w-full inline-flex items-center justify-center space-x-3 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:-translate-y-1 ${
                    pkg.popular
                      ? 'bg-gradient-primary text-white shadow-glow hover:shadow-glow-lg'
                      : 'bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:border-primary-400/50'
                  }`}
                >
                  <span>{pkg.cta}</span>
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                  
                  {pkg.popular && (
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-700 to-primary-900 rounded-2xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                  )}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Non Sicuro? Parliamone!
            </h3>
            <p className="text-gray-300 mb-6">
              Ogni progetto è unico. Contattaci per una consulenza gratuita 
              e scopri quale soluzione è perfetta per te.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-white/10 text-white rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <span>Consulenza Gratuita</span>
              </Link>
              <a
                href="tel:+39123456789"
                className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-primary text-white rounded-xl shadow-glow hover:shadow-glow-lg transition-all duration-300"
              >
                <span>Chiamaci Ora</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-12 mt-16 text-gray-400"
        >
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm">Garanzia Soddisfatti o Rimborsati</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse" />
            <span className="text-sm">Pagamento Sicuro</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
            <span className="text-sm">Supporto Dedicato</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default WebbitzPackages 