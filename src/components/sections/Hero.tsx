import { motion, useMotionValue } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Code, Bot, Zap, Sparkles, Globe, Cpu, Rocket } from 'lucide-react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logos/WEBBITZ_2_PNG.png'


const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  
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

  const floatingElements = [
    { icon: Code, delay: 0, x: 100, y: 50 },
    { icon: Bot, delay: 0.5, x: -80, y: 80 },
    { icon: Zap, delay: 1, x: 120, y: -60 },
    { icon: Globe, delay: 1.5, x: -100, y: -40 },
    { icon: Cpu, delay: 2, x: 80, y: 100 },
    { icon: Rocket, delay: 2.5, x: -60, y: -80 }
  ]

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-purple-50 to-purple-100 pt-20"
    >
      {/* Logo Background */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center opacity-5 hero-logo-bg"
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
          className="w-[90%] max-w-none blur-2xl hero-logo-img"
          style={{ 
            filter: 'drop-shadow(0 0 100px rgba(139, 92, 246, 0.4))',
            willChange: 'transform'
          }}
        />
      </motion.div>

      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse-slow" />
      </div>

      {/* Floating Gradient Orbs */}
      <motion.div
        className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-3xl opacity-20"
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
        className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-3xl opacity-15"
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

      {/* Mouse Follower Gradient */}
      <motion.div
        className="absolute w-96 h-96 bg-gradient-radial from-purple-400/20 to-transparent rounded-full pointer-events-none blur-2xl"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
        animate={{
          scale: isHovered ? 1.5 : 1,
          opacity: isHovered ? 0.4 : 0.2,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />

      {/* Floating Tech Icons */}
      <div className="hidden md:block">
        {/* Posizionamento assoluto personalizzato per ogni icona */}
        <motion.div
          className="absolute text-purple-400/30"
          style={{ left: '10%', top: '18%' }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
          transition={{ delay: 0, duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Code size={48} />
        </motion.div>
        <motion.div
          className="absolute text-purple-400/30"
          style={{ left: '75%', top: '22%' }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
          transition={{ delay: 0.5, duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Bot size={48} />
        </motion.div>
        <motion.div
          className="absolute text-purple-400/30"
          style={{ left: '20%', top: '60%' }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
          transition={{ delay: 1, duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Zap size={48} />
        </motion.div>
        <motion.div
          className="absolute text-purple-400/30"
          style={{ left: '80%', top: '65%' }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
          transition={{ delay: 1.5, duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Globe size={48} />
        </motion.div>
        <motion.div
          className="absolute text-purple-400/30"
          style={{ left: '40%', top: '10%' }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
          transition={{ delay: 2, duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Cpu size={48} />
        </motion.div>
        <motion.div
          className="absolute text-purple-400/30"
          style={{ left: '60%', top: '75%' }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
          transition={{ delay: 2.5, duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Rocket size={48} />
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <motion.div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="mb-12"
          >
            {/*<img 
              src={logo} 
              alt="Webbitz Logo" 
              className="h-32 md:h-40 mx-auto"
              style={{ 
                filter: 'drop-shadow(0 0 30px rgba(139, 92, 246, 0.4))',
                willChange: 'transform'
              }}
            />*/}
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-gray-900 via-purple-800 to-purple-600 bg-clip-text text-transparent leading-tight"
          >
            Il tuo potenziale
            <br />
            <motion.span
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 bg-clip-text text-transparent bg-[length:200%_100%]"
            >
              finalmente online
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            <span className="text-purple-700 font-semibold">Piccole e medie attività</span>, è arrivato il momento di 
            <span className="text-purple-700 font-semibold"> farvi conoscere al mondo</span>. 
            Creiamo la vostra presenza digitale con siti web professionali, 
            <span className="text-purple-700 font-semibold"> soluzioni AI</span> e strategie che portano risultati concreti.
          </motion.p>

          {/* Service Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto"
          >
            {[
              { 
                icon: Code, 
                title: "Sito Web Professionale", 
                desc: "La vostra vetrina digitale perfetta",
                gradient: "from-blue-400 to-indigo-600",
                bg: "linear-gradient(45deg, rgba(59, 130, 246, 0.08) 0%, rgba(99, 102, 241, 0.08) 100%)",
                secondaryIcon: Globe,
                animation: "float"
              },
              { 
                icon: Bot, 
                title: "Assistente AI 24/7", 
                desc: "Rispondete ai clienti sempre",
                gradient: "from-purple-400 to-pink-600",
                bg: "linear-gradient(45deg, rgba(192, 132, 252, 0.08) 0%, rgba(236, 72, 153, 0.08) 100%)",
                secondaryIcon: Cpu,
                animation: "pulse"
              },
              { 
                icon: Zap, 
                title: "Risultati Garantiti", 
                desc: "Più visibilità, più clienti",
                gradient: "from-amber-400 to-orange-600",
                bg: "linear-gradient(45deg, rgba(251, 191, 36, 0.08) 0%, rgba(234, 88, 12, 0.08) 100%)",
                secondaryIcon: Rocket,
                animation: "bounce"
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  boxShadow: "0 20px 30px rgba(139, 92, 246, 0.15)"
                }}
                className="relative overflow-hidden bg-white/90 backdrop-blur-lg border border-purple-200 rounded-2xl p-5 hover:border-purple-300 transition-all duration-300 group text-center"
                style={{ background: service.bg }}
              >
                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-20">
                  <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id={`grid-${index}`} width="10" height="10" patternUnits="userSpaceOnUse">
                        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-purple-400" />
                      </pattern>
                    </defs>
                    <rect width="100" height="100" fill={`url(#grid-${index})`} />
                  </svg>
                </div>
                
                {/* Secondary floating icon */}
                <motion.div 
                  className="absolute top-3 right-3 opacity-30 text-purple-600"
                  animate={
                    service.animation === "float" 
                      ? { y: [0, -10, 0], opacity: [0.3, 0.6, 0.3] }
                      : service.animation === "pulse"
                        ? { scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }
                        : { rotate: [0, 10, 0], opacity: [0.3, 0.6, 0.3] }
                  }
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    ease: "easeInOut" 
                  }}
                >
                  <service.secondaryIcon size={24} />
                </motion.div>
                
                {/* Main icon with gradient */}
                <div className="mb-4 relative">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${service.gradient} flex items-center justify-center mb-1 mx-auto`}>
                    <service.icon className="text-white" size={24} />
                  </div>
                  <motion.div 
                    className="absolute inset-0 bg-white rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-xl"
                    animate={{ scale: [0.8, 1.2, 0.8] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </div>
                
                {/* Title and description */}
                <h3 className={`text-xl font-extrabold mb-2 bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}>
                  {service.title}
                </h3>
                <p className="text-gray-700 text-base">{service.desc}</p>
                
                {/* Animated border accent */}
                <motion.div 
                  className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${service.gradient}`}
                  initial={{ width: "30%" }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8"
          >
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(139, 92, 246, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="group relative bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 flex items-center gap-3 overflow-hidden"
              >
                <span className="relative z-10">Inizia il tuo progetto</span>
                <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" size={20} />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
            </Link>

            <Link to="/portfolio">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group bg-white/80 backdrop-blur-lg border border-purple-200 hover:border-purple-300 text-gray-900 font-bold py-4 px-8 rounded-full transition-all duration-300 flex items-center gap-3 hover:shadow-lg"
              >
                <span>Scopri i nostri lavori</span>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="text-purple-600" size={20} />
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
          className="w-6 h-10 border-2 border-purple-400 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-purple-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero 