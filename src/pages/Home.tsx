import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Hero from '../components/sections/Hero'
import ClientsMap from '../components/sections/ClientsMap'
import WebbitzPackages from '../components/sections/WebbitzPackages'
import Features from '../components/sections/Features'
import vistamareLogo from '../assets/logos/VISTAMARE.png'
// Sezione recensioni rimossa perché non ci sono recensioni reali
// import Testimonials from '../components/sections/Testimonials'

const Home = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />
      
      {/* Features Section */}
      <Features />
      
      {/* Clients Map Section - Direttamente dopo Features, senza titolo */}
      <motion.section
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="py-12 bg-white"
      >
        <ClientsMap />
      </motion.section>
      
      {/* Webbitz Packages Section */}
      <WebbitzPackages />
      
      {/* Partner Section */}
      <section className="py-16 bg-white/80 relative overflow-hidden">
        <div className="container-premium relative z-10 text-center">
          <h2 className="heading-lg mb-8">
            <span className="bg-gradient-to-r from-gray-900 via-primary-600 to-primary-800 bg-clip-text text-transparent">
              I nostri partner
            </span>
          </h2>
          <div className="flex flex-col items-center justify-center gap-6">
            <img src={vistamareLogo} alt="Vistamare logo" className="h-20 md:h-28 object-contain mx-auto drop-shadow-lg" style={{maxWidth: 220}} />           
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      {/* <Testimonials /> */}
    </div>
  )
}

export default Home 