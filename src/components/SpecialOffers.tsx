import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SpecialOffers = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const bundles = [
    {
      title: "Pacchetto Startup",
      price: "€999",
      features: [
        "Sito Web Responsive",
        "Logo Design",
        "Social Media Setup",
        "SEO Base"
      ],
      description: "Perfetto per chi inizia"
    },
    {
      title: "Pacchetto Business",
      price: "€1999",
      features: [
        "Sito Web Premium",
        "Brand Identity",
        "Social Media Management",
        "SEO Avanzato",
        "Email Marketing"
      ],
      description: "Per chi vuole crescere"
    },
    {
      title: "Pacchetto Enterprise",
      price: "€3999",
      features: [
        "E-commerce Completo",
        "Brand Strategy",
        "Social Media Strategy",
        "SEO Premium",
        "Content Marketing",
        "Analytics Setup"
      ],
      description: "Per chi vuole eccellere"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bundles.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bundles.length) % bundles.length);
  };

  return (
    <section className="py-12 px-4 bg-gradient-to-br from-purple-900/20 to-purple-600/10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-6">Offerte Speciali</h2>
          <p className="text-lg text-purple-200">
            Scopri i nostri pacchetti all-inclusive pensati per le tue esigenze
          </p>
        </motion.div>

        {/* Desktop Grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8">
          {bundles.map((bundle, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-lg p-8 rounded-xl border border-purple-300/20 hover:border-purple-300/50 transition-all duration-300 h-full"
            >
              <h3 className="text-2xl font-bold text-white mb-4">{bundle.title}</h3>
              <div className="text-3xl font-bold text-purple-300 mb-6">{bundle.price}</div>
              <ul className="space-y-3 mb-6">
                {bundle.features.map((feature, i) => (
                  <li key={i} className="text-purple-100 flex items-center">
                    <span className="text-purple-300 mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <p className="text-purple-200 italic mb-6">{bundle.description}</p>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300">
                Scegli questo pacchetto
              </button>
            </motion.div>
          ))}
        </div>

        {/* Mobile Slider */}
        <div className="lg:hidden relative">
          <div className="overflow-hidden">
            <motion.div
              className="flex"
              animate={{ x: -currentSlide * 100 + '%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {bundles.map((bundle, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="bg-white/10 backdrop-blur-lg p-8 rounded-xl border border-purple-300/20"
                  >
                    <h3 className="text-2xl font-bold text-white mb-4">{bundle.title}</h3>
                    <div className="text-3xl font-bold text-purple-300 mb-6">{bundle.price}</div>
                    <ul className="space-y-3 mb-6">
                      {bundle.features.map((feature, i) => (
                        <li key={i} className="text-purple-100 flex items-center">
                          <span className="text-purple-300 mr-2">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <p className="text-purple-200 italic mb-6">{bundle.description}</p>
                    <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300">
                      Scegli questo pacchetto
                    </button>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-purple-600/80 hover:bg-purple-600 text-white p-2 rounded-full transition-all duration-300"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-purple-600/80 hover:bg-purple-600 text-white p-2 rounded-full transition-all duration-300"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {bundles.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index ? 'bg-purple-400' : 'bg-purple-600/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers; 