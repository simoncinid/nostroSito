import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { 
  Code, 
  Bot, 
  Zap, 
  Smartphone, 
  ShoppingCart, 
  Cpu, 
  Database, 
  Cloud, 
  Shield,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Rocket,
  BarChart,
  MessageSquare,
  Search,
  Palette,
  Settings
} from 'lucide-react';

const Services = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);
  
  const [activeService, setActiveService] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, delay: number}>>([]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const servicesInView = useInView(servicesRef, { once: true, amount: 0.2 });
  const processInView = useInView(processRef, { once: true, amount: 0.2 });
  const techInView = useInView(techRef, { once: true, amount: 0.2 });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    // Generate particles
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5
    }));
    setParticles(newParticles);

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const mainServices = [
    {
      id: 0,
      icon: Code,
      title: "Sviluppo Web React",
      subtitle: "Siti web da zero, zero template",
      description: "Sviluppiamo applicazioni web moderne utilizzando React, TypeScript e le tecnologie più avanzate. Ogni progetto è unico, scritto da zero per garantire performance ottimali e scalabilità.",
      features: [
        "React 18 + TypeScript",
        "Design responsive e mobile-first",
        "Performance ottimizzate (Core Web Vitals)",
        "SEO tecnico avanzato",
        "Architettura scalabile",
        "Testing automatizzato"
      ],
      technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion"],
      gradient: "from-blue-500 to-purple-600",
      price: "Da €2.500",
      deliveryTime: "2-4 settimane"
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
      gradient: "from-purple-500 to-pink-600",
      price: "Da €3.500",
      deliveryTime: "3-6 settimane"
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
      gradient: "from-green-500 to-blue-600",
      price: "Da €2.000",
      deliveryTime: "2-5 settimane"
    }
  ];

  const additionalServices = [
    {
      icon: Smartphone,
      title: "App Mobile",
      description: "App native e cross-platform",
      gradient: "from-orange-500 to-red-600"
    },
    {
      icon: ShoppingCart,
      title: "E-commerce",
      description: "Negozi online performanti",
      gradient: "from-green-500 to-teal-600"
    },
    {
      icon: Database,
      title: "Backend & API",
      description: "Architetture scalabili",
      gradient: "from-indigo-500 to-purple-600"
    },
    {
      icon: Cloud,
      title: "Cloud Solutions",
      description: "Infrastrutture moderne",
      gradient: "from-blue-500 to-cyan-600"
    },
    {
      icon: Shield,
      title: "Cybersecurity",
      description: "Protezione avanzata",
      gradient: "from-red-500 to-pink-600"
    },
    {
      icon: BarChart,
      title: "Analytics & BI",
      description: "Insights data-driven",
      gradient: "from-yellow-500 to-orange-600"
    }
  ];

  const developmentProcess = [
    {
      step: "01",
      title: "Discovery & Analisi",
      description: "Analizziamo le tue esigenze e definiamo gli obiettivi del progetto",
      icon: Search,
      duration: "1-2 settimane"
    },
    {
      step: "02",
      title: "Design & Prototipazione",
      description: "Creiamo wireframe, mockup e prototipi interattivi",
      icon: Palette,
      duration: "1-3 settimane"
    },
    {
      step: "03",
      title: "Sviluppo & Testing",
      description: "Sviluppiamo il prodotto con test continui e quality assurance",
      icon: Code,
      duration: "2-8 settimane"
    },
    {
      step: "04",
      title: "Deploy & Ottimizzazione",
      description: "Lanciamo il prodotto e ottimizziamo le performance",
      icon: Rocket,
      duration: "1 settimana"
    },
    {
      step: "05",
      title: "Supporto & Manutenzione",
      description: "Forniamo supporto continuo e aggiornamenti",
      icon: Settings,
      duration: "Ongoing"
    }
  ];

  const technologies = [
    { name: "React", category: "Frontend", level: 95 },
    { name: "TypeScript", category: "Language", level: 90 },
    { name: "Node.js", category: "Backend", level: 88 },
    { name: "Python", category: "AI/ML", level: 92 },
    { name: "Next.js", category: "Framework", level: 85 },
    { name: "TailwindCSS", category: "Styling", level: 95 },
    { name: "OpenAI", category: "AI", level: 88 },
    { name: "AWS", category: "Cloud", level: 82 }
  ];

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
        className="relative py-12 px-4"
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {mainServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 100 }}
                animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.2, duration: 1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative bg-white/80 backdrop-blur-xl border border-purple-200 rounded-3xl p-8 hover:border-purple-300 hover:shadow-lg transition-all duration-500"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-2xl flex items-center justify-center mb-6`}
                >
                  <service.icon size={32} className="text-white" />
                </motion.div>

                <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-purple-700 font-semibold mb-4">{service.subtitle}</p>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Caratteristiche:</h4>
                  <ul className="space-y-2">
                    {service.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-between items-center mb-6">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{service.price}</div>
                    <div className="text-sm text-gray-600">{service.deliveryTime}</div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Scopri di più
                  <ArrowRight size={16} />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Additional Services */}
      <motion.section className="relative py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-purple-800 to-purple-600 bg-clip-text text-transparent">
              Altri Servizi
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white/80 backdrop-blur-xl border border-purple-200 rounded-2xl p-6 hover:border-purple-300 hover:shadow-lg transition-all duration-300"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`w-12 h-12 bg-gradient-to-r ${service.gradient} rounded-xl flex items-center justify-center mb-4`}
                >
                  <service.icon size={24} className="text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Development Process */}
      <motion.section
        ref={processRef}
        className="relative py-8 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={processInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-purple-800 to-purple-600 bg-clip-text text-transparent">
              Il Nostro Processo
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {developmentProcess.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={processInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                whileHover={{ y: -5 }}
                className="text-center"
              >
                <div className="bg-white/80 backdrop-blur-xl border border-purple-200 rounded-2xl p-6 hover:border-purple-300 hover:shadow-lg transition-all duration-300">
                  <div className="text-3xl font-bold text-purple-600 mb-2">{step.step}</div>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4"
                  >
                    <step.icon size={24} className="text-white" />
                  </motion.div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{step.description}</p>
                  <div className="text-purple-600 font-semibold text-sm">{step.duration}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Technologies */}
      <motion.section
        ref={techRef}
        className="relative py-8 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={techInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-purple-800 to-purple-600 bg-clip-text text-transparent">
              Tecnologie
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={techInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="bg-white/80 backdrop-blur-xl border border-purple-200 rounded-2xl p-6 hover:border-purple-300 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">{tech.name}</h3>
                <p className="text-purple-600 text-sm mb-4">{tech.category}</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={techInView ? { width: `${tech.level}%` } : {}}
                    transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                    className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full"
                  />
                </div>
                <div className="text-right text-sm text-gray-600 mt-1">{tech.level}%</div>
              </motion.div>
            ))}
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