import { motion, useInView } from 'framer-motion';
import React, { useState, useEffect, useRef } from 'react';
import type { FC, ElementType } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Clock, 
  Settings, 
  CheckCircle, 
  Code, 
  Palette, 
  Rocket, 
  Search, 
  TestTube, 
  Globe,
  Bot, 
  Zap, 
  //ArrowRight,
  FileText,
  Monitor,
  Info,
  X,
  MessageSquare
} from 'lucide-react';

interface Service {
  id: number;
  icon: ElementType;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  technologies: string[];
  gradient: string;
}

interface ProcessStep {
  step: string;
  title: string;
  description: string;
  icon: ElementType;
  duration: string;
  color: string;
  tools: string[];
  visualExample?: {
    title: string;
    icon: ElementType;
    description: string;
  };
}

const mainServices: Service[] = [
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

interface ServiceModalProps {
  service: Service | null;
  isOpen: boolean;
  onClose: () => void;
}

const ServiceModal: FC<ServiceModalProps> = ({ service, isOpen, onClose }) => {
  if (!service) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isOpen ? 1 : 0 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${!isOpen && 'pointer-events-none'}`}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        {/* Header con gradiente */}
        <div className={`bg-gradient-to-r ${service.gradient} p-6 flex items-start justify-between`}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <service.icon size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{service.title}</h3>
              <p className="text-white/80 text-sm">{service.subtitle}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* Contenuto */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <div className="prose prose-sm">
            <p className="text-gray-600 mb-6">{service.description}</p>
            
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Caratteristiche:</h4>
            <ul className="space-y-2 mb-6">
              {service.features.map((feature: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <h4 className="text-lg font-semibold text-gray-900 mb-3">Tecnologie:</h4>
            <div className="flex flex-wrap gap-2">
              {service.technologies.map((tech: string, idx: number) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer con CTA */}
        <div className="p-6 bg-gray-50 border-t border-gray-100">
          <a
            href="https://wa.me/3391797616?text=Sono%20interessato%20ad%20un%20preventivo%20per%20il%20vostro%20servizio"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl shadow-glow hover:shadow-glow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <MessageSquare className="w-5 h-5" />
            <span>Richiedi Preventivo</span>
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Services = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const servicesInView = useInView(servicesRef, { once: true, amount: 0.2 });

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
      <section
        ref={heroRef}
        className="relative h-[500px] flex items-center justify-center px-4 pt-16 md:pt-16 mb-6 z-20"
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
              transition={{ delay: 0.2, duration: 1 }}
              className="text-4xl md:text-8xl font-bold mb-8 leading-tight"
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
              transition={{ delay: 0.4, duration: 1 }}
              className="text-xl md:text-2xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed"
            >
              Sviluppiamo <span className="text-purple-700 font-semibold">tecnologie all'avanguardia</span> per 
              trasformare la tua azienda. Dalla creazione di siti web React alle 
              <span className="text-purple-700 font-semibold"> soluzioni AI</span>, ogni progetto è unico e personalizzato.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Main Services Section */}
      <motion.section
        ref={servicesRef}
        className="relative pb-12 px-4 -mt-12 z-10"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 mt-20 md:mt-16 bg-gradient-to-r from-gray-900 via-purple-800 to-purple-600 bg-clip-text text-transparent">
              Servizi Principali
            </h2>
          </motion.div>

          {/* Service Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8 mb-0">
            {mainServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 100 }}
                animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.2, duration: 1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative bg-white/80 backdrop-blur-xl border border-purple-200 rounded-2xl md:rounded-3xl p-4 md:p-8 hover:border-purple-300 hover:shadow-lg transition-all duration-500 flex flex-col h-full"
              >
                <div className="flex flex-col h-full items-center text-center">
                  <div className="min-h-[auto] md:min-h-[280px] flex flex-col items-center">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r ${service.gradient} rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6`}
                    >
                      <service.icon size={24} className="text-white" />
                    </motion.div>

                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-purple-700 font-semibold mb-2 md:mb-4 text-sm md:text-base">{service.subtitle}</p>
                    
                    {/* Descrizione e bottone visibili solo su desktop */}
                    <div className="hidden md:block">
                      <p className="text-gray-600 leading-relaxed text-base">{service.description}</p>
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
                        {/*<div className="mt-6">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      Scopri di più
                      <ArrowRight size={16} />
                    </motion.button>
                        </div>*/}
                      </div>
                    </div>

                    {/* Bottone info visibile solo su mobile */}
                    <div className="md:hidden mt-4">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                          setSelectedService(service);
                          setIsModalOpen(true);
                        }}
                        className={`w-10 h-10 bg-gradient-to-r ${service.gradient} rounded-full flex items-center justify-center text-white shadow-lg`}
                      >
                        <Info size={20} />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Process Section */}
      <ProcessSection />

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
              onClick={() => window.open('https://wa.me/3391797616?text=Sono%20interessato%20ad%20un%20preventivo%20per%20il%20vostro%20servizio', '_blank')}
            >
              <span className="relative z-10">Richiedi Preventivo</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-400/0 via-white/20 to-purple-400/0 opacity-0 group-hover:opacity-100"
                initial={{ x: "-100%" }}
                whileHover={{
                  x: "100%",
                  transition: {
                    duration: 1,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse"
                  }
                }}
              />
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* Modal */}
      <ServiceModal
        service={selectedService}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedService(null);
        }}
      />
    </div>
  );
};

interface ProcessSectionProps {}

const ProcessSection: FC<ProcessSectionProps> = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const developmentProcess: ProcessStep[] = [
    {
      step: "01",
      title: "Analisi & Strategia",
      description: "Analizziamo le tue esigenze e definiamo una strategia chiara per il tuo progetto digitale.",
      duration: "1-2 settimane",
      tools: ["Analytics", "Research", "Strategy"],
      color: "from-blue-500 to-blue-600",
      icon: Search,
      visualExample: {
        title: "Report Strategico",
        icon: FileText,
        description: "Analisi dettagliata e piano d'azione"
      }
    },
    {
      step: "02", 
      title: "Design & UX",
      description: "Creiamo un design accattivante e un'esperienza utente ottimale per i tuoi visitatori.",
      duration: "2-3 settimane",
      tools: ["Figma", "Adobe XD", "Sketch"],
      color: "from-purple-500 to-purple-600",
      icon: Palette,
      visualExample: {
        title: "Design System",
        icon: Monitor,
        description: "UI/UX design completo e interattivo"
      }
    },
    {
      step: "03",
      title: "Sviluppo",
      description: "Sviluppiamo il tuo progetto utilizzando le tecnologie più moderne e performanti.",
      duration: "3-4 settimane", 
      tools: ["React", "Next.js", "Node.js"],
      color: "from-green-500 to-green-600",
      icon: Code,
      visualExample: {
        title: "Codice Sorgente",
        icon: Code,
        description: "Sviluppo frontend e backend"
      }
    },
    {
      step: "04",
      title: "Testing",
      description: "Testiamo ogni funzionalità per garantire qualità e performance ottimali.",
      duration: "1 settimana",
      tools: ["Jest", "Cypress", "Lighthouse"],
      color: "from-orange-500 to-orange-600", 
      icon: TestTube,
      visualExample: {
        title: "Test Report",
        icon: TestTube,
        description: "Report completo dei test eseguiti"
      }
    },
    {
      step: "05",
      title: "Launch",
      description: "Lanciamo il tuo progetto e monitoriamo le performance per garantire il successo.",
      duration: "1 settimana",
      tools: ["Vercel", "AWS", "Analytics"],
      color: "from-pink-500 to-pink-600",
      icon: Rocket,
      visualExample: {
        title: "Deployment",
        icon: Globe,
        description: "Sito live e monitoraggio attivo"
      }
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isPlaying) {
      interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % developmentProcess.length);
      }, 4000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, developmentProcess.length]);

  const navigateTimeline = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setActiveStep((prev) => prev === 0 ? developmentProcess.length - 1 : prev - 1);
    } else {
      setActiveStep((prev) => (prev + 1) % developmentProcess.length);
    }
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <h2 className="font-bold bg-gradient-to-r from-gray-900 to-purple-600 bg-clip-text text-transparent"
              style={{ fontSize: 'clamp(1.3rem,6vw,2.7rem)' }}>
              Il Nostro Processo
            </h2>
            <div className="flex items-center gap-2 sm:gap-3 mt-4 sm:mt-0">
              <button
                onClick={() => navigateTimeline('prev')}
                className="w-8 h-8 sm:w-10 sm:h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-purple-50 hover:border-purple-200 hover:text-purple-600 transition-all duration-200 shadow-sm"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-600 hover:bg-purple-700 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-200"
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              </button>
              <button
                onClick={() => navigateTimeline('next')}
                className="w-8 h-8 sm:w-10 sm:h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-purple-50 hover:border-purple-200 hover:text-purple-600 transition-all duration-200 shadow-sm"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
          <p className="text-gray-600 mx-auto mt-4" style={{ fontSize: 'clamp(0.95rem,3vw,1.2rem)', maxWidth: '95vw' }}>
            Un approccio strutturato per trasformare le tue idee in soluzioni digitali di successo
          </p>
        </div>

        {/* Main Container */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-8 shadow-lg">
          {/* Progress Bar */}
          <div className="relative mb-4">
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${((activeStep + 1) / developmentProcess.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Step Navigation */}
          <div className="flex justify-between items-center mb-6 sm:mb-8 -mt-2">
            {developmentProcess.map((step, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className="flex flex-col items-center min-w-0 flex-shrink-0 group"
              >
                <div className={`relative w-8 h-8 sm:w-12 sm:h-12 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                  index === activeStep 
                    ? 'border-purple-500 bg-purple-500 shadow-lg' 
                    : index < activeStep
                    ? 'border-green-500 bg-green-500'
                    : 'border-gray-300 bg-white hover:border-purple-300'
                }`}>
                  {index < activeStep ? (
                    <CheckCircle size={14} className="text-white sm:w-5 sm:h-5" />
                  ) : (
                    <step.icon 
                      size={14} 
                      className={`${
                        index === activeStep ? 'text-white' : 
                        index < activeStep ? 'text-white' : 'text-gray-500'
                      } sm:w-5 sm:h-5`} 
                    />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Active Step Content */}
          <div className="max-w-5xl mx-auto px-2 sm:px-4">
            <div className="space-y-6 sm:space-y-8">
              {/* Prima riga: Icona, Nome e Descrizione */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-8 text-center sm:text-left">
                <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${developmentProcess[activeStep].color} rounded-xl flex items-center justify-center shadow-lg flex-shrink-0 mx-auto sm:mx-0`}>
                  {React.createElement(developmentProcess[activeStep].icon, { size: 22, className: "text-white sm:w-7 sm:h-7" })}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-2" style={{ fontSize: 'clamp(1.1rem,4vw,2.1rem)' }}>
                    {developmentProcess[activeStep].title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed" style={{ fontSize: 'clamp(0.95rem,2.5vw,1.15rem)' }}>
                    {developmentProcess[activeStep].description}
                  </p>
                </div>
              </div>

              {/* Seconda riga: Tempistica e Strumenti */}
              <div className="flex flex-col sm:flex-row items-center justify-between border-t border-gray-100 pt-4 sm:pt-6 gap-4 sm:gap-0">
                <div className="flex items-center gap-2 text-purple-600 font-medium">
                  <Clock size={16} className="sm:w-5 sm:h-5" />
                  <span style={{ fontSize: 'clamp(0.95rem,2vw,1.1rem)' }}>{developmentProcess[activeStep].duration}</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-4 flex-wrap justify-center sm:justify-start">
                  <h4 className="font-semibold text-gray-900 flex items-center gap-2" style={{ fontSize: 'clamp(0.95rem,2vw,1.1rem)' }}>
                    <Settings size={16} className="text-purple-600 sm:w-5 sm:h-5" />
                    Strumenti:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {developmentProcess[activeStep].tools.map((tool: string, idx: number) => (
                      <span
                        key={idx}
                        className={`px-3 py-1 bg-gradient-to-r ${developmentProcess[activeStep].color} text-white text-xs sm:text-sm rounded-full font-medium shadow-sm`}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation Dots */}
          <div className="flex justify-center items-center gap-2 mt-6 sm:mt-8">
            {developmentProcess.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeStep 
                    ? 'bg-purple-600 w-6' 
                    : 'bg-gray-300 hover:bg-purple-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;