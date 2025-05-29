import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { 
  Code, 
  Bot, 
  Zap, 
  ArrowRight,
  CheckCircle,
  Rocket,
  Search,
  Palette,
  Settings,
  Clock,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Star,
  Target,
  FileText,
  Monitor,
  Wrench
} from 'lucide-react';
import React from 'react';

const Services = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });

  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const servicesInView = useInView(servicesRef, { once: true, amount: 0.2 });
  const processInView = useInView(processRef, { once: true, amount: 0.2 });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);
  
  const timelineProgressValue = useTransform(timelineProgress, [0, 1], [0, 100]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Auto-play timeline - ralentato a 6 secondi
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % developmentProcess.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const mainServices = [
    {
      id: 0,
      icon: Code,
      title: "Sviluppo Web React",
      subtitle: "Siti web da zero, zero template",
      description: "Sviluppiamo applicazioni web moderne utilizzando React. Ogni progetto è unico, scritto da zero per garantire performance ottimali e scalabilità.",
      features: [
        "React 18 + TypeScript",
        "Design responsive e mobile-first",
        "Performance ottimizzate (Core Web Vitals)",
        "SEO tecnico avanzato",
        "Architettura scalabile",
        "Testing automatizzato"
      ],
      technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion"],
      gradient: "from-blue-500 to-purple-600"
    },
    {
      id: 1,
      icon: Bot,
      title: "Soluzioni AI",
      subtitle: "Intelligenza artificiale per il business",
      description: "Creiamo chatbot intelligenti, assistenti virtuali e sistemi di automazione basati su AI per migliorare l'efficienza aziendale e l'esperienza cliente.",
      features: [
        "Chatbot per lead generation",
        "Assistenti virtuali personalizzati",
        "Analisi predittiva dei dati",
        "Automazione customer service",
        "Integrazione CRM/ERP",
        "Machine Learning custom"
      ],
      technologies: ["OpenAI GPT", "Python", "TensorFlow", "LangChain", "Vector Databases"],
      gradient: "from-purple-500 to-pink-600"
    },
    {
      id: 2,
      icon: Zap,
      title: "Automazione Processi",
      subtitle: "Efficienza e produttività massime",
      description: "Automatizziamo i processi aziendali ripetitivi, dall'inserimento dati alla generazione di documenti, liberando tempo prezioso per attività strategiche.",
      features: [
        "Automazione inserimento dati",
        "Generazione documenti automatica",
        "Workflow personalizzati",
        "Integrazione sistemi esistenti",
        "Dashboard di monitoraggio",
        "ROI tracking e analytics"
      ],
      technologies: ["Python", "RPA Tools", "APIs", "Webhooks", "Cloud Functions"],
      gradient: "from-green-500 to-blue-600"
    }
  ];

  const developmentProcess = [
    {
      step: "01",
      title: "Discovery & Analisi",
      description: "Analizziamo a fondo le tue esigenze specifiche, studiamo il mercato di riferimento e definiamo una strategia personalizzata per il tuo progetto.",
      icon: Search,
      duration: "1-2 settimane",
      color: "from-emerald-500 to-teal-600",
      tools: ["Analytics", "User Research", "Market Analysis", "Competitive Intelligence"],
      visualExample: {
        title: "Documentazione Strategica",
        icon: FileText,
        description: "Report dettagliato con analisi mercato, personas e roadmap"
      }
    },
    {
      step: "02",
      title: "Design & Prototipazione",
      description: "Trasformiamo le idee in soluzioni visive coinvolgenti attraverso wireframe dettagliati, mockup ad alta fedeltà e prototipi interattivi.",
      icon: Palette,
      duration: "2-3 settimane",
      color: "from-violet-500 to-purple-600",
      tools: ["Figma", "Adobe Creative Suite", "Principle", "InVision"],
      visualExample: {
        title: "Prototipo Interattivo",
        icon: Monitor,
        description: "Design system completo con prototipi navigabili"
      }
    },
    {
      step: "03",
      title: "Sviluppo & Testing",
      description: "Sviluppiamo il prodotto utilizzando le tecnologie più avanzate, con test continui e quality assurance per garantire perfetta funzionalità.",
      icon: Code,
      duration: "3-8 settimane",
      color: "from-blue-500 to-indigo-600",
      tools: ["React", "TypeScript", "Jest", "Docker", "AWS/Azure"],
      visualExample: {
        title: "Applicazione Funzionante",
        icon: Code,
        description: "Versione beta completa con tutte le funzionalità"
      }
    },
    {
      step: "04",
      title: "Deploy & Ottimizzazione",
      description: "Lanciamo il prodotto con deployment sicuro e ottimizziamo performance, SEO e user experience per massimizzare i risultati.",
      icon: Rocket,
      duration: "1-2 settimane",
      color: "from-orange-500 to-red-600",
      tools: ["Vercel", "Cloudflare", "Google Analytics", "Lighthouse"],
      visualExample: {
        title: "Sito Live",
        icon: Rocket,
        description: "Prodotto online ottimizzato e monitorato"
      }
    },
    {
      step: "05",
      title: "Supporto & Evoluzione",
      description: "Forniamo supporto tecnico continuo, manutenzione proattiva e sviluppiamo nuove funzionalità per far crescere il tuo business.",
      icon: Settings,
      duration: "Ongoing",
      color: "from-teal-500 to-cyan-600",
      tools: ["Monitoring", "Backup Systems", "Security Tools", "Growth Analytics"],
      visualExample: {
        title: "Dashboard Monitoraggio",
        icon: Wrench,
        description: "Pannello controllo con metriche e aggiornamenti"
      }
    }
  ];

  const navigateTimeline = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setActiveStep((prev) => prev === 0 ? developmentProcess.length - 1 : prev - 1);
    } else {
      setActiveStep((prev) => (prev + 1) % developmentProcess.length);
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x * 0.1,
            y: mousePosition.y * 0.1,
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"
          animate={{
            x: -mousePosition.x * 0.05,
            y: -mousePosition.y * 0.05,
            scale: [1, 0.8, 1],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        style={{ y, opacity }}
        className="relative min-h-screen flex items-center justify-center px-4 pt-20"
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 1 }}
              className="text-6xl md:text-8xl font-bold mb-8 leading-tight"
            >
              <span className="bg-gradient-to-r from-gray-900 via-purple-800 to-purple-600 bg-clip-text text-transparent">
                Soluzioni Digitali
              </span>
              <br />
              <motion.span
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 bg-clip-text text-transparent bg-[length:200%_100%]"
              >
                Su Misura
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 1 }}
              className="text-xl md:text-2xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              Sviluppiamo <span className="text-purple-700 font-semibold">tecnologie all'avanguardia</span> per 
              trasformare la tua azienda. Dalla creazione di siti web React alle 
              <span className="text-purple-700 font-semibold"> soluzioni AI</span>, ogni progetto è unico e personalizzato.
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* Main Services Section */}
      <motion.section
        ref={servicesRef}
        className="relative pb-12 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-purple-800 to-purple-600 bg-clip-text text-transparent">
              Servizi Principali
            </h2>
          </motion.div>

          {/* Service Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-0">
            {mainServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 100 }}
                animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.2, duration: 1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative bg-white/80 backdrop-blur-xl border border-purple-200 rounded-3xl p-8 hover:border-purple-300 hover:shadow-lg transition-all duration-500 flex flex-col h-full"
              >
                <div className="flex flex-col h-full items-center text-center">
                  <div className="min-h-[280px]">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-2xl flex items-center justify-center mb-6 mx-auto`}
                    >
                      <service.icon size={32} className="text-white" />
                    </motion.div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-purple-700 font-semibold mb-4">{service.subtitle}</p>
                    <p className="text-gray-600 leading-relaxed">{service.description}</p>
                  </div>

                  <div className="mt-8 w-full">
                    <h4 className="font-semibold text-gray-900 mb-3">Caratteristiche:</h4>
                    <ul className="space-y-2">
                      {service.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-center justify-center text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 w-full">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      Scopri di più
                      <ArrowRight size={16} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Premium Timeline Section */}
      <motion.section
        ref={processRef}
        className="relative py-10 px-4 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-purple-50"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={processInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="text-center mb-12"
          >
            <motion.div
              animate={{
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="inline-block"
            >
              <h2 className="text-5xl md:text-7xl font-bold mb-0 bg-gradient-to-r from-slate-900 via-purple-800 to-indigo-600 bg-clip-text text-transparent">
                Il Nostro Processo
              </h2>
            </motion.div>
          </motion.div>

          {/* Premium Timeline Container */}
          <div ref={timelineRef} className="relative">
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-1/2 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
              />
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2,
                }}
                className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
              />
            </div>

            {/* Timeline Controls */}
            <div className="flex justify-center items-center gap-4 mb-12">
              <motion.button
                onClick={() => navigateTimeline('prev')}
                whileHover={{ scale: 1.1, backgroundColor: '#8b5cf6' }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 bg-white/80 backdrop-blur-xl border border-purple-200 rounded-full flex items-center justify-center text-purple-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
              >
                <ChevronLeft size={20} />
              </motion.button>
              
              <motion.button
                onClick={() => setIsPlaying(!isPlaying)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-16 h-16 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full flex items-center justify-center text-white shadow-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300"
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </motion.button>
              
              <motion.button
                onClick={() => navigateTimeline('next')}
                whileHover={{ scale: 1.1, backgroundColor: '#8b5cf6' }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 bg-white/80 backdrop-blur-xl border border-purple-200 rounded-full flex items-center justify-center text-purple-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
              >
                <ChevronRight size={20} />
              </motion.button>
            </div>

            {/* Main Timeline */}
            <div className="relative bg-white/60 backdrop-blur-xl rounded-3xl border border-purple-100 p-8 shadow-2xl shadow-purple-500/10">
              {/* Progress Bar */}
              <div className="relative mb-12">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full" />
                <motion.div
                  className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 rounded-full shadow-lg shadow-purple-500/50"
                  initial={{ width: "0%" }}
                  animate={{ 
                    width: `${((activeStep + 1) / developmentProcess.length) * 100}%`,
                  }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                />
                
                {/* Animated Particles */}
                <motion.div
                  className="absolute top-1/2 h-2 w-2 bg-white rounded-full shadow-lg border-2 border-purple-500"
                  animate={{
                    left: `${((activeStep + 1) / developmentProcess.length) * 100}%`,
                    scale: [1, 1.5, 1],
                  }}
                  transition={{ 
                    left: { duration: 1, ease: "easeInOut" },
                    scale: { duration: 2, repeat: Infinity }
                  }}
                  style={{ transform: 'translateX(-50%) translateY(-50%)' }}
                />
              </div>

              {/* Timeline Steps Navigation */}
              <div className="flex justify-between items-center mb-12 relative">
                {developmentProcess.map((step, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setActiveStep(index)}
                    className="group relative flex flex-col items-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Step Circle */}
                    <motion.div
                      className={`relative w-16 h-16 rounded-full border-4 transition-all duration-500 ${
                        index <= activeStep 
                          ? 'border-purple-500 bg-gradient-to-br from-purple-500 to-purple-600' 
                          : 'border-gray-300 bg-white'
                      }`}
                      animate={{
                        scale: index === activeStep ? [1, 1.2, 1] : 1,
                        boxShadow: index === activeStep 
                          ? ["0 0 0 0 rgba(139, 92, 246, 0.7)", "0 0 0 20px rgba(139, 92, 246, 0)", "0 0 0 0 rgba(139, 92, 246, 0.7)"]
                          : "0 0 0 0 rgba(139, 92, 246, 0)"
                      }}
                      transition={{ 
                        scale: { duration: 3, repeat: Infinity },
                        boxShadow: { duration: 3, repeat: Infinity }
                      }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          animate={{ rotate: index === activeStep ? 360 : 0 }}
                          transition={{ duration: 3, repeat: index === activeStep ? Infinity : 0, ease: "linear" }}
                        >
                          <motion.div
                            className={`w-12 h-12 bg-gradient-to-br ${developmentProcess[activeStep].color} rounded-xl flex items-center justify-center shadow-lg`}
                            animate={{ rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 6, repeat: Infinity }}
                          >
                            {React.createElement(developmentProcess[activeStep].icon, { size: 24, className: "text-white" })}
                          </motion.div>
                        </motion.div>
                      </div>
                      
                      {/* Completion Badge */}
                      {index < activeStep && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                        >
                          <CheckCircle size={16} className="text-white" />
                        </motion.div>
                      )}
                    </motion.div>
                    
                    {/* Step Number */}
                    <motion.div
                      className={`mt-3 text-sm font-bold transition-colors duration-300 ${
                        index <= activeStep ? 'text-purple-600' : 'text-gray-400'
                      }`}
                      animate={{ 
                        scale: index === activeStep ? [1, 1.1, 1] : 1 
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      {step.step}
                    </motion.div>
                  </motion.button>
                ))}
              </div>

              {/* Active Step Content */}
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -50, scale: 0.9 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative"
              >
                {/* Content Background */}
                <div className="relative bg-gradient-to-br from-white via-purple-50/50 to-white rounded-2xl border border-purple-100 p-6 shadow-xl">
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${developmentProcess[activeStep].color} opacity-5 rounded-2xl`}
                    animate={{
                      opacity: [0.05, 0.1, 0.05],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  
                  <div className="relative grid md:grid-cols-3 gap-6 items-start">
                    {/* Left Column - Main Content */}
                    <div className="md:col-span-2 space-y-4">
                      <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                      >
                        <div className="flex items-center gap-4 mb-4">
                          <motion.div
                            className={`w-12 h-12 bg-gradient-to-br ${developmentProcess[activeStep].color} rounded-xl flex items-center justify-center shadow-lg`}
                            animate={{ rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 6, repeat: Infinity }}
                          >
                            {React.createElement(developmentProcess[activeStep].icon, { size: 24, className: "text-white" })}
                          </motion.div>
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900">{developmentProcess[activeStep].title}</h3>
                            <div className="flex items-center gap-2 text-purple-600 font-semibold">
                              <Clock size={16} />
                              <span>{developmentProcess[activeStep].duration}</span>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 text-lg leading-relaxed">
                          {developmentProcess[activeStep].description}
                        </p>
                      </motion.div>
                      
                      {/* Tools */}
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="space-y-3"
                      >
                        <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                          <Settings size={18} className="text-purple-600" />
                          Strumenti & Tecnologie
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {developmentProcess[activeStep].tools.map((tool, idx) => (
                            <motion.span
                              key={idx}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.6 + idx * 0.1, duration: 0.4 }}
                              whileHover={{ scale: 1.05, y: -2 }}
                              className={`px-3 py-1 bg-gradient-to-r ${developmentProcess[activeStep].color} text-white text-sm rounded-full font-medium shadow-md cursor-pointer`}
                            >
                              {tool}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                    
                    {/* Right Column - Tools & Stats */}
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                      className="space-y-6"
                    >
                      {/* Tools Section */}
                      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-purple-100 shadow-lg">
                        <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                          <Settings size={18} className="text-purple-600" />
                          Strumenti & Tecnologie
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {developmentProcess[activeStep].tools.map((tool, idx) => (
                            <motion.span
                              key={idx}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.7 + idx * 0.1, duration: 0.4 }}
                              whileHover={{ scale: 1.05, y: -2 }}
                              className={`px-3 py-1 bg-gradient-to-r ${developmentProcess[activeStep].color} text-white text-sm rounded-full font-medium shadow-md cursor-pointer`}
                            >
                              {tool}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                      
                      {/* Progress Indicators */}
                      <div className="space-y-4">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5, duration: 0.6 }}
                          className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-purple-100"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-semibold text-gray-700">Progresso Fase</span>
                            <span className="text-sm font-bold text-purple-600">{Math.round(((activeStep + 1) / developmentProcess.length) * 100)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <motion.div
                              className={`h-2 bg-gradient-to-r ${developmentProcess[activeStep].color} rounded-full`}
                              initial={{ width: "0%" }}
                              animate={{ width: `${((activeStep + 1) / developmentProcess.length) * 100}%` }}
                              transition={{ duration: 1, ease: "easeInOut" }}
                            />
                          </div>
                        </motion.div>
                        
                        
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
              
              {/* Navigation Dots */}
              <div className="flex justify-center items-center gap-3 mt-8">
                {developmentProcess.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setActiveStep(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === activeStep 
                        ? 'bg-purple-600 scale-125' 
                        : 'bg-gray-300 hover:bg-purple-300'
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    animate={{
                      scale: index === activeStep ? [1.25, 1.4, 1.25] : 1,
                    }}
                    transition={{
                      scale: index === activeStep 
                        ? { duration: 2, repeat: Infinity }
                        : { duration: 0.2 }
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section className="relative py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-gray-900 via-purple-800 to-purple-600 bg-clip-text text-transparent">
              Pronto a Iniziare?
            </h2>
            <p className="text-xl text-gray-700 mb-12">
              Trasformiamo la tua idea in una soluzione digitale di successo
            </p>
            
            <motion.button
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 25px 50px rgba(139, 92, 246, 0.5)",
                y: -5
              }}
              whileTap={{ scale: 0.95 }}
              className="group relative bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-bold py-6 px-12 rounded-full transition-all duration-300 overflow-hidden text-lg"
            >
              <span className="relative z-10">Richiedi Preventivo</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2"
              >
                <Rocket size={24} className="text-white" />
              </motion.div>
            </motion.button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Services;