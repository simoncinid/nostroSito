import { motion } from 'framer-motion'
import { Globe, Bot, TrendingUp, Palette, Shield, Zap, ArrowRight, ExternalLink } from 'lucide-react'

const Features = () => {
  const features = [
    {
      icon: Globe,
      title: 'Siti Web Premium',
      description: 'Design responsive e performanti che convertono visitatori in clienti',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      secondaryIcon: ExternalLink,
      animation: "float"
    },
    {
      icon: Bot,
      title: 'Chatbot AI Avanzati',
      description: 'Assistenti virtuali intelligenti per lead generation 24/7',
      color: 'from-primary-500 to-primary-600',
      bgColor: 'bg-primary-50',
      iconColor: 'text-primary-600',
      secondaryIcon: TrendingUp,
      animation: "pulse"
    },
    {
      icon: TrendingUp,
      title: 'SEO & Marketing',
      description: 'Strategie data-driven per dominare i motori di ricerca',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      secondaryIcon: ArrowRight,
      animation: "bounce"
    },
    {
      icon: Palette,
      title: 'Brand Identity',
      description: 'Identità visive memorabili che distinguono il tuo brand',
      color: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-50',
      iconColor: 'text-pink-600',
      secondaryIcon: Globe,
      animation: "float"
    },
    {
      icon: Shield,
      title: 'Sicurezza Garantita',
      description: 'Protezione avanzata e backup automatici per la tua tranquillità',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
      secondaryIcon: Bot,
      animation: "pulse"
    },
    {
      icon: Zap,
      title: 'Performance Ottimali',
      description: 'Velocità di caricamento fulminee e ottimizzazione continua',
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50',
      iconColor: 'text-yellow-600',
      secondaryIcon: Shield,
      animation: "bounce"
    }
  ]

  return (
    <section className="py-12 bg-gray-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_70%)]" />
      </div>

      <div className="container-premium relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="heading-lg text-gray-900 mb-6">
            Perché Scegliere{' '}
            <span className="bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
              Webbitz
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Combiniamo tecnologia all'avanguardia, design innovativo e strategie vincenti 
            per creare soluzioni digitali che fanno la differenza
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group relative"
            >
              <motion.div 
                whileHover={{ 
                  scale: 1.03, 
                  y: -5,
                  boxShadow: "0 20px 30px rgba(139, 92, 246, 0.15)"
                }}
                className="relative overflow-hidden bg-white rounded-2xl p-5 border border-gray-100 transition-all duration-300 h-full text-center"
              >
                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id={`grid-feature-${index}`} width="10" height="10" patternUnits="userSpaceOnUse">
                        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" className={feature.iconColor} />
                      </pattern>
                    </defs>
                    <rect width="100" height="100" fill={`url(#grid-feature-${index})`} />
                  </svg>
                </div>
                
                {/* Secondary floating icon */}
                <motion.div 
                  className={`absolute top-3 right-3 opacity-30 ${feature.iconColor}`}
                  animate={
                    feature.animation === "float" 
                      ? { y: [0, -10, 0], opacity: [0.3, 0.5, 0.3] }
                      : feature.animation === "pulse"
                        ? { scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }
                        : { rotate: [0, 10, 0], opacity: [0.3, 0.5, 0.3] }
                  }
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    ease: "easeInOut" 
                  }}
                >
                  <feature.secondaryIcon size={18} />
                </motion.div>

                {/* Icon */}
                <div className="mb-4 relative">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${feature.bgColor} group-hover:scale-110 transition-transform duration-300 mb-1`}>
                    <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
                  </div>
                  <motion.div 
                    className="absolute inset-0 bg-white rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-xl"
                    animate={{ scale: [0.8, 1.2, 0.8] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </div>

                {/* Content */}
                <h3 className={`text-xl font-extrabold mb-2 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-base">
                  {feature.description}
                </p>

                {/* Animated border accent */}
                <motion.div 
                  className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${feature.color}`}
                  initial={{ width: "30%" }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA Semplice (senza razzo) */}
        <div className="mt-16 mb-16">
          <div className="max-w-3xl mx-auto relative">
            {/* Box con CTA */}
            <motion.div
              className="bg-white rounded-xl shadow-lg p-8 relative z-10"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ 
                type: "spring", 
                stiffness: 50, 
                damping: 14,
                duration: 1.2
              }}
            >
              <div className="text-center">
                <h3 className="text-4xl md:text-5xl font-black mb-5 
                  bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 
                  bg-clip-text text-transparent 
                  animate-gradient-xy"
                  style={{
                    backgroundSize: '300% 300%',
                    textShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  Pronto a Trasformare <br></br>il Tuo Business?
                </h3>
                <p className="text-lg text-gray-600 mb-6">
                  Scopri come possiamo aiutarti a raggiungere i tuoi obiettivi digitali
                </p>
                <button className="btn-primary">
                  Richiedi Consulenza Gratuita
                </button>
              </div>
              
              {/* Effetto shine */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-purple-300/0 via-purple-300/30 to-purple-300/0 overflow-hidden"
                initial={{ x: "-100%" }}
                whileInView={{ x: "100%" }}
                viewport={{ once: false }}
                transition={{ duration: 1.5, delay: 1.2 }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Aggiungo chiave Google Maps
export const GOOGLE_MAPS_API_KEY = "AIzaSyDs-7Ac5Ke5a60gRLf3CVtG1j88AhXfsOA";

export default Features 