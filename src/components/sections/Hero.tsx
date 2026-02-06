import { motion, useMotionValue } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Code, Bot, Zap, Sparkles, Globe, Cpu, Rocket } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import logo from '../../assets/logos/favicon.png'

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const { t } = useTranslation()
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  


  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return
      
      const rect = heroRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height
      
      mouseX.set(x)
      mouseY.set(y)
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-20"
    >
      {/* Logo Background - intensità ridotta per leggibilità */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center opacity-[0.02] hero-logo-bg"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <img 
          src={logo} 
          alt="" 
          className="w-[95%] max-w-none blur-2xl hero-logo-img"
          style={{ 
            filter: 'drop-shadow(0 0 80px rgba(232, 80, 2, 0.12))',
            willChange: 'transform'
          }}
        />
      </motion.div>

      {/* Animated Background Grid - intensità ridotta */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(232,80,2,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(232,80,2,0.15)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse-slow" />
      </div>

      {/* Floating Gradient Orbs - intensità ridotta */}
      <motion.div
        className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-primary-400 to-primary-500 rounded-full blur-3xl opacity-[0.08]"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-primary-400 to-primary-500 rounded-full blur-3xl opacity-[0.06]"
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Mouse Follower Gradient - intensità ridotta */}
      <motion.div
        className="absolute w-96 h-96 bg-gradient-radial from-primary-400/10 to-transparent rounded-full pointer-events-none blur-2xl"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
        animate={{
          scale: isHovered ? 1.5 : 1,
          opacity: isHovered ? 0.15 : 0.08,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />

      {/* Floating Tech Icons */}
      <div className="hidden md:block">
        {/* Posizionamento assoluto personalizzato per ogni icona */}
        <motion.div
          className="absolute text-primary-400/30"
          style={{ left: '10%', top: '18%' }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
          transition={{ delay: 0, duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Code size={48} />
        </motion.div>
        <motion.div
          className="absolute text-primary-400/30"
          style={{ left: '75%', top: '22%' }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
          transition={{ delay: 0.5, duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Bot size={48} />
        </motion.div>
        <motion.div
          className="absolute text-primary-400/30"
          style={{ left: '20%', top: '60%' }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
          transition={{ delay: 1, duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Zap size={48} />
        </motion.div>
        <motion.div
          className="absolute text-primary-400/30"
          style={{ left: '80%', top: '65%' }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
          transition={{ delay: 1.5, duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Globe size={48} />
        </motion.div>
        <motion.div
          className="absolute text-primary-400/30"
          style={{ left: '40%', top: '10%' }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
          transition={{ delay: 2, duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Cpu size={48} />
        </motion.div>
        <motion.div
          className="absolute text-primary-400/30"
          style={{ left: '60%', top: '75%' }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
          transition={{ delay: 2.5, duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Rocket size={48} />
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto -mt-12">
        <motion.div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative"
        >
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
                          className="text-4xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-primary-200 to-primary-400 bg-clip-text text-transparent leading-tight"
          >
            {t('hero.title1')}
            <br />
            <motion.span
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 bg-clip-text text-transparent bg-[length:200%_100%]"
            >
              {t('hero.title2')}
            </motion.span>
          </motion.h1>

          {/* Subtitle - Hidden on mobile, shown on desktop */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="hidden md:block text-lg md:text-xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed"
          >
            <span className="text-primary-700 font-semibold">{t('hero.subtitle.part1')}</span>{t('hero.subtitle.part2')}
            <span className="text-primary-700 font-semibold">{t('hero.subtitle.part3')}</span>{t('hero.subtitle.part4')}
            <span className="text-primary-700 font-semibold">{t('hero.subtitle.part5')}</span>{t('hero.subtitle.part6')}
          </motion.p>

          {/* Slogan - Mobile */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="md:hidden text-lg italic text-center mb-8"
          >
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">We Design,</span>
            <br />
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">We Build,</span>
            <br />
            <span className="text-primary-500 font-semibold">You</span>
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"> Grow.</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center mt-4 mb-8"
          >
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(232, 80, 2, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="group relative bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold py-3 px-6 md:py-4 md:px-8 rounded-full transition-all duration-500 ease-out flex items-center gap-2 md:gap-3 overflow-hidden text-sm md:text-base"
              >
                <span className="relative z-10">{t('hero.cta.primary')}</span>
                <ArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" size={18} />
                <div className="absolute inset-0 bg-gradient-to-r from-primary-400 via-primary-500 to-accent-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
              </motion.button>
            </Link>

            <Link to="/portfolio">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group bg-white/10 backdrop-blur-xl border border-white/20 hover:border-primary-400/50 text-white font-bold py-3 px-6 md:py-4 md:px-8 rounded-full transition-all duration-300 flex items-center gap-2 md:gap-3 hover:shadow-lg text-sm md:text-base"
              >
                <span>{t('hero.cta.secondary')}</span>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="text-primary-600" size={18} />
                </motion.div>
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-primary-400 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-primary-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero 