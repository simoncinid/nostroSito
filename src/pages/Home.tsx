import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Hero from '../components/sections/Hero'
import ClientsMap from '../components/sections/ClientsMap'
import WebbitzPackages from '../components/sections/WebbitzPackages'
import Features from '../components/sections/Features'
import Testimonials from '../components/sections/Testimonials'
import Stats from '../components/sections/Stats'

const Home = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />
      
      {/* Stats Section */}
      <Stats />
      
      {/* Features Section */}
      <Features />
      
      {/* Clients Map Section */}
      <motion.section
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="py-24 bg-gray-50"
      >
        <ClientsMap />
      </motion.section>
      
      {/* Webbitz Packages Section */}
      <WebbitzPackages />
      
      {/* Testimonials Section */}
      <Testimonials />
    </div>
  )
}

export default Home 