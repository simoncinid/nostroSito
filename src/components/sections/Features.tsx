import { motion } from 'framer-motion'
import { Globe, Bot, TrendingUp, Palette, Shield, Zap } from 'lucide-react'

const Features = () => {
  const features = [
    {
      icon: Globe,
      title: 'Siti Web Premium',
      description: 'Design responsive e performanti che convertono visitatori in clienti',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      icon: Bot,
      title: 'Chatbot AI Avanzati',
      description: 'Assistenti virtuali intelligenti per lead generation 24/7',
      color: 'from-primary-500 to-primary-600',
      bgColor: 'bg-primary-50',
      iconColor: 'text-primary-600'
    },
    {
      icon: TrendingUp,
      title: 'SEO & Marketing',
      description: 'Strategie data-driven per dominare i motori di ricerca',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      icon: Palette,
      title: 'Brand Identity',
      description: 'Identità visive memorabili che distinguono il tuo brand',
      color: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-50',
      iconColor: 'text-pink-600'
    },
    {
      icon: Shield,
      title: 'Sicurezza Garantita',
      description: 'Protezione avanzata e backup automatici per la tua tranquillità',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600'
    },
    {
      icon: Zap,
      title: 'Performance Ottimali',
      description: 'Velocità di caricamento fulminee e ottimizzazione continua',
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50',
      iconColor: 'text-yellow-600'
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
              <div className="bg-white rounded-2xl p-8 shadow-premium border border-gray-100 hover:shadow-premium-lg transition-all duration-500 group-hover:-translate-y-2 h-full">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${feature.bgColor} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-8 h-8 ${feature.iconColor}`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-2xl p-8 shadow-premium border border-gray-100 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Pronto a Trasformare il Tuo Business?
            </h3>
            <p className="text-gray-600 mb-6">
              Scopri come possiamo aiutarti a raggiungere i tuoi obiettivi digitali
            </p>
            <button className="btn-primary">
              Richiedi Consulenza Gratuita
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Features 