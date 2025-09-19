import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const Testimonials = () => {
  const testimonials = [
    {
      name: "Marco Rossi",
      role: "CEO",
      company: "TechStart Milano",
      avatar: "👨‍💼",
      rating: 5,
      text: "Webbitz ha trasformato completamente la nostra presenza online. Il chatbot AI ha aumentato i nostri lead del 300% in soli 3 mesi. Professionalità e risultati eccezionali!",
      results: "+300% Lead Generation"
    },
    {
      name: "Sofia Bianchi",
      role: "Marketing Director",
      company: "Fashion Roma",
      avatar: "👩‍💼",
      rating: 5,
      text: "Il nuovo sito e-commerce ha superato ogni aspettativa. Design elegante, performance incredibili e un ROI che non avremmo mai immaginato. Consigliatissimi!",
      results: "+250% Vendite Online"
    },
    {
      name: "Alessandro Verde",
      role: "Founder",
      company: "GreenTech Napoli",
      avatar: "👨‍🚀",
      rating: 5,
      text: "La brand identity creata da Webbitz ci ha posizionati come leader nel settore. Ogni dettaglio curato alla perfezione, dalla strategia all'esecuzione.",
      results: "+400% Brand Recognition"
    }
  ]

  return (
    <section className="py-12 bg-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-primary-200 to-primary-300 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="container-premium relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="heading-lg text-gray-900 mb-6">
            Cosa Dicono i Nostri{' '}
            <span className="bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
              Clienti
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Storie di successo reali da aziende che hanno scelto Webbitz 
            per la loro trasformazione digitale
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="group relative"
            >
              <div className="bg-white rounded-2xl p-8 shadow-premium border border-gray-100 hover:shadow-premium-lg transition-all duration-500 group-hover:-translate-y-2 h-full relative overflow-hidden flex flex-col">
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                  <Quote className="w-16 h-16 text-primary-600" />
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-gray-700 mb-6 leading-relaxed relative z-10 flex-1">
                  "{testimonial.text}"
                </blockquote>

                {/* Results Badge */}
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-100 to-green-200 text-green-800 rounded-full text-sm font-semibold mb-6">
                  {testimonial.results}
                </div>

                {/* Author */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white text-xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role} • {testimonial.company}
                    </div>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials 