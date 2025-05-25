import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, X, ExternalLink, Globe, Bot, Palette, TrendingUp } from 'lucide-react'

interface Client {
  id: number
  name: string
  location: string
  coordinates: { x: number; y: number }
  services: string[]
  description: string
  website?: string
  logo: string
  projects: {
    type: 'website' | 'chatbot' | 'branding' | 'seo'
    title: string
    description: string
    image: string
  }[]
}

const ClientsMap = () => {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)

  // Dati clienti fittizi ma realistici
  const clients: Client[] = [
    {
      id: 1,
      name: "TechStart Milano",
      location: "Milano, IT",
      coordinates: { x: 45, y: 35 },
      services: ["Sito Web", "Chatbot AI", "SEO"],
      description: "Startup tecnologica specializzata in soluzioni IoT",
      website: "https://techstart.it",
      logo: "🚀",
      projects: [
        {
          type: 'website',
          title: "Sito Web Aziendale",
          description: "Piattaforma moderna con dashboard interattiva",
          image: "/api/placeholder/400/300"
        },
        {
          type: 'chatbot',
          title: "Chatbot Lead Generation",
          description: "AI conversazionale per acquisizione clienti",
          image: "/api/placeholder/400/300"
        }
      ]
    },
    {
      id: 2,
      name: "Fashion Roma",
      location: "Roma, IT",
      coordinates: { x: 55, y: 55 },
      services: ["E-commerce", "Brand Identity", "SEO"],
      description: "Brand di moda sostenibile con focus sul luxury",
      logo: "👗",
      projects: [
        {
          type: 'website',
          title: "E-commerce Luxury",
          description: "Piattaforma vendita con AR try-on",
          image: "/api/placeholder/400/300"
        },
        {
          type: 'branding',
          title: "Brand Identity Completa",
          description: "Logo, packaging e comunicazione visiva",
          image: "/api/placeholder/400/300"
        }
      ]
    },
    {
      id: 3,
      name: "FinTech Torino",
      location: "Torino, IT",
      coordinates: { x: 35, y: 25 },
      services: ["Web App", "Chatbot", "SEO"],
      description: "Piattaforma di investimenti automatizzati",
      logo: "💰",
      projects: [
        {
          type: 'website',
          title: "Dashboard Investimenti",
          description: "Interfaccia complessa con real-time data",
          image: "/api/placeholder/400/300"
        },
        {
          type: 'chatbot',
          title: "Assistente Finanziario AI",
          description: "Consulenza automatizzata 24/7",
          image: "/api/placeholder/400/300"
        }
      ]
    },
    {
      id: 4,
      name: "GreenTech Napoli",
      location: "Napoli, IT",
      coordinates: { x: 65, y: 70 },
      services: ["Sito Web", "Brand Identity", "SEO"],
      description: "Soluzioni per energia rinnovabile",
      logo: "🌱",
      projects: [
        {
          type: 'website',
          title: "Portale Sostenibilità",
          description: "Piattaforma educativa e commerciale",
          image: "/api/placeholder/400/300"
        },
        {
          type: 'branding',
          title: "Rebranding Completo",
          description: "Nuova identità eco-friendly",
          image: "/api/placeholder/400/300"
        }
      ]
    },
    {
      id: 5,
      name: "FoodTech Bologna",
      location: "Bologna, IT",
      coordinates: { x: 50, y: 40 },
      services: ["App Mobile", "Chatbot", "SEO"],
      description: "Delivery innovativo con AI prediction",
      logo: "🍕",
      projects: [
        {
          type: 'website',
          title: "Piattaforma Delivery",
          description: "App con AI per predizione ordini",
          image: "/api/placeholder/400/300"
        },
        {
          type: 'chatbot',
          title: "Assistente Ordini",
          description: "Bot per gestione ordini e customer care",
          image: "/api/placeholder/400/300"
        }
      ]
    },
    {
      id: 6,
      name: "HealthTech Firenze",
      location: "Firenze, IT",
      coordinates: { x: 48, y: 48 },
      services: ["Web App", "Chatbot", "Brand Identity"],
      description: "Telemedicina e diagnostica digitale",
      logo: "🏥",
      projects: [
        {
          type: 'website',
          title: "Portale Telemedicina",
          description: "Piattaforma per consulti online",
          image: "/api/placeholder/400/300"
        },
        {
          type: 'chatbot',
          title: "Assistente Medico AI",
          description: "Pre-diagnosi e supporto pazienti",
          image: "/api/placeholder/400/300"
        }
      ]
    }
  ]

  const getServiceIcon = (type: string) => {
    switch (type) {
      case 'website': return Globe
      case 'chatbot': return Bot
      case 'branding': return Palette
      case 'seo': return TrendingUp
      default: return Globe
    }
  }

  return (
    <div className="container-premium">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="heading-lg text-gray-900 mb-6">
          I Nostri Clienti in{' '}
          <span className="bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
            Tutta Italia
          </span>
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Clicca sui marker per scoprire i progetti realizzati per i nostri clienti. 
          Ogni punto rappresenta una storia di successo digitale.
        </p>
      </motion.div>

      {/* Interactive Map */}
      <div className="relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative w-full h-[600px] bg-gradient-to-br from-primary-50 to-white rounded-3xl border border-primary-100 shadow-premium overflow-hidden"
        >
          {/* Italy Map Background */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-80 h-96 opacity-10">
              <svg viewBox="0 0 400 500" className="w-full h-full text-primary-600">
                <path
                  d="M200 50 L180 80 L160 120 L140 160 L130 200 L140 240 L160 280 L180 320 L200 360 L220 400 L240 440 L260 400 L280 360 L300 320 L320 280 L340 240 L350 200 L340 160 L320 120 L300 80 L280 50 L240 40 L200 50 Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>

          {/* Client Markers */}
          {clients.map((client, index) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="absolute cursor-pointer group"
              style={{
                left: `${client.coordinates.x}%`,
                top: `${client.coordinates.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              onClick={() => setSelectedClient(client)}
            >
              {/* Pulse Animation */}
              <div className="absolute inset-0 bg-primary-500 rounded-full animate-ping opacity-30" />
              
              {/* Marker */}
              <motion.div
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="relative w-12 h-12 bg-gradient-primary rounded-full shadow-glow flex items-center justify-center text-white font-bold text-lg border-4 border-white"
              >
                {client.logo}
              </motion.div>

              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-premium border border-gray-200 whitespace-nowrap">
                  <p className="font-semibold text-gray-900">{client.name}</p>
                  <p className="text-sm text-gray-600">{client.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
        >
          {[
            { label: "Clienti Attivi", value: "150+", icon: "🏢" },
            { label: "Progetti Completati", value: "500+", icon: "✅" },
            { label: "Città Raggiunte", value: "50+", icon: "🌍" },
            { label: "Anni di Esperienza", value: "8+", icon: "⭐" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1, duration: 0.6 }}
              className="text-center p-6 bg-white rounded-2xl shadow-premium border border-gray-100"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Client Details Modal */}
      <AnimatePresence>
        {selectedClient && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedClient(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl shadow-premium-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-8 border-b border-gray-100">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center text-white text-2xl">
                      {selectedClient.logo}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{selectedClient.name}</h3>
                      <p className="text-gray-600 flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>{selectedClient.location}</span>
                      </p>
                      <p className="text-gray-700 mt-2">{selectedClient.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedClient(null)}
                    className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
                  >
                    <X className="w-6 h-6 text-gray-500" />
                  </button>
                </div>

                {/* Services */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {selectedClient.services.map((service) => (
                    <span
                      key={service}
                      className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              {/* Projects */}
              <div className="p-8">
                <h4 className="text-xl font-bold text-gray-900 mb-6">Progetti Realizzati</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedClient.projects.map((project, index) => {
                    const IconComponent = getServiceIcon(project.type)
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-gray-50 rounded-2xl p-6 hover:shadow-premium transition-all duration-300"
                      >
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                            <IconComponent className="w-5 h-5 text-primary-600" />
                          </div>
                          <h5 className="font-semibold text-gray-900">{project.title}</h5>
                        </div>
                        <p className="text-gray-600 mb-4">{project.description}</p>
                        <div className="w-full h-32 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center">
                          <span className="text-primary-600 font-medium">Preview Progetto</span>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>

                {/* CTA */}
                {selectedClient.website && (
                  <div className="mt-8 text-center">
                    <a
                      href={selectedClient.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-primary text-white font-semibold rounded-xl hover:shadow-glow transition-all duration-300"
                    >
                      <span>Visita il Sito</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ClientsMap 