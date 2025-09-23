import { motion } from 'framer-motion'
import { Globe, Bot, TrendingUp, Palette, Shield, Zap, ArrowRight, ExternalLink } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import WorksCarousel from './WorksCarousel'

const Features = () => {
  const { t } = useTranslation()
  
  const features = [
    {
      icon: Globe,
      title: 'features.items.website.title',
      description: 'features.items.website.description',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      secondaryIcon: ExternalLink,
      animation: "float"
    },
    {
      icon: Bot,
      title: 'features.items.chatbot.title',
      description: 'features.items.chatbot.description',
      color: 'from-primary-500 to-primary-600',
      bgColor: 'bg-primary-50',
      iconColor: 'text-primary-600',
      secondaryIcon: TrendingUp,
      animation: "pulse"
    },
    {
      icon: TrendingUp,
      title: 'features.items.seo.title',
      description: 'features.items.seo.description',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      secondaryIcon: ArrowRight,
      animation: "bounce"
    },
    {
      icon: Palette,
      title: 'features.items.brand.title',
      description: 'features.items.brand.description',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      secondaryIcon: Globe,
      animation: "float"
    },
    {
      icon: Shield,
      title: 'features.items.security.title',
      description: 'features.items.security.description',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
      secondaryIcon: Bot,
      animation: "pulse"
    },
    {
      icon: Zap,
      title: 'features.items.performance.title',
      description: 'features.items.performance.description',
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
            {t('features.title')}{' '}
            <span className="bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
              {t('features.titleHighlight')}
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('features.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 grid-rows-3 gap-3 md:grid-cols-2 md:grid-rows-3 lg:grid-cols-3 lg:grid-rows-2">
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
                  boxShadow: "0 20px 30px rgba(59, 130, 246, 0.15)"
                }}
                className="relative overflow-hidden bg-white/95 rounded-xl p-3 border border-blue-100 transition-all duration-300 h-full text-center md:bg-white md:rounded-2xl md:p-5 md:border-gray-100 lg:bg-white lg:rounded-2xl lg:p-5 lg:border-gray-100"
              >
                {/* Secondary floating icon */}
                <motion.div 
                  className={`absolute top-3 right-3 opacity-30 ${feature.iconColor}`}
                  initial={{ opacity: 0 }}
                  whileInView={
                    feature.animation === "float" 
                      ? { y: [0, -10, 0], opacity: [0.3, 0.5, 0.3] }
                      : feature.animation === "pulse"
                        ? { scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }
                        : { rotate: [0, 10, 0], opacity: [0.3, 0.5, 0.3] }
                  }
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    ease: "easeInOut",
                    willChange: "transform, opacity"
                  }}
                  viewport={{ once: true, margin: "50px" }}
                >
                  <feature.secondaryIcon className="md:w-5 md:h-5 w-4 h-4" />
                </motion.div>

                {/* Icon */}
                <div className="mb-2 relative">
                  <div 
                    className={`inline-flex items-center justify-center rounded-lg group-hover:scale-105 transition-transform duration-300 mb-1 ` +
                      `${feature.bgColor} w-8 h-8 md:w-12 md:h-12 md:rounded-xl lg:w-12 lg:h-12 lg:rounded-xl`}
                    style={{ willChange: "transform" }}
                  >
                    <feature.icon className={`w-5 h-5 md:w-6 md:h-6 lg:w-6 lg:h-6 ${feature.iconColor}`} />
                  </div>
                </div>

                {/* Content */}
                <h3 className={`font-extrabold mb-1 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent text-base md:text-xl lg:text-xl`}>
                  {t(feature.title)}
                </h3>
                <p className="text-gray-600 text-xs md:text-base lg:text-base">
                  {t(feature.description)}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>

      </div>
      
      {/* WorksCarousel fuori dal container-premium per larghezza completa */}
      <div className="w-full">
        <WorksCarousel />
      </div>
    </section>
  )
}

// Aggiungo chiave Google Maps
export const GOOGLE_MAPS_API_KEY = "AIzaSyDs-7Ac5Ke5a60gRLf3CVtG1j88AhXfsOA";

export default Features 