import { motion, useInView } from 'framer-motion';
import React, { useState, useEffect, useRef } from 'react';
import type { FC, ElementType } from 'react';
import logo from '../assets/logos/LogoWebbitzIcona.jpeg';
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
  Bot, 
  Zap, 
  //ArrowRight,
  Info,
  X,
  MessageSquare
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

interface Service {
  id: number;
  icon: ElementType;
  titleKey: string;
  gradient: string;
}

interface ProcessStep {
  stepKey: string;
  icon: ElementType;
  color: string;
}

const mainServices: Service[] = [
    {
      id: 0,
      icon: Code,
      titleKey: "webDevelopment",
      gradient: "from-primary-500 to-accent-500"
    },
    {
      id: 1,
      icon: Bot,
      titleKey: "aiSolutions",
      gradient: "from-primary-500 to-accent-500"
    },
    {
      id: 2,
      icon: Zap,
      titleKey: "automation",
      gradient: "from-green-500 to-primary-600"
    }
  ];

interface ServiceModalProps {
  service: Service | null;
  isOpen: boolean;
  onClose: () => void;
}

const ServiceModal: FC<ServiceModalProps> = ({ service, isOpen, onClose }) => {
  const { t } = useTranslation();
  
  if (!service) return null;

  const serviceData = t(`services.mainServices.services.${service.titleKey}`, { returnObjects: true }) as any;
  const features = t(`services.mainServices.services.${service.titleKey}.features`, { returnObjects: true }) as string[];
  const technologies = t(`services.mainServices.services.${service.titleKey}.technologies`, { returnObjects: true }) as string[];

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
              <h3 className="text-xl font-bold text-white">{serviceData.title}</h3>
              <p className="text-white/80 text-sm">{serviceData.subtitle}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* Contenuto */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <div className="prose prose-sm">
            <p className="text-gray-600 mb-6">{serviceData.description}</p>
            
            <h4 className="text-lg font-semibold text-gray-900 mb-3">{t('services.mainServices.modal.featuresTitle')}</h4>
            <ul className="space-y-2 mb-6">
              {features.map((feature: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <h4 className="text-lg font-semibold text-gray-900 mb-3">{t('services.mainServices.modal.technologiesTitle')}</h4>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech: string, idx: number) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm"
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
            className="w-full inline-flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl shadow-glow hover:shadow-glow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <MessageSquare className="w-5 h-5" />
            <span>{t('services.mainServices.modal.requestQuote')}</span>
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Services = () => {
  const { t } = useTranslation();
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
      <Helmet>
        <title>{t('services.meta.title')}</title>
        <meta name="description" content={t('services.meta.description')} />
      </Helmet>

      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-primary-400/10 to-primary-500/10 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x * 0.1,
            y: mousePosition.y * 0.1,
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-primary-400/10 to-primary-500/10 rounded-full blur-3xl"
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
        {/* Logo Background Static */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <img 
            src={logo} 
            alt="" 
            className="w-[90%] max-w-none blur-2xl"
            style={{ 
              filter: 'drop-shadow(0 0 100px rgba(232, 80, 2, 0.4))'
            }}
          />
        </div>

        <div className="max-w-6xl mx-auto text-center">
          <div>
            <h1 className="text-4xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-gray-900 via-primary-800 to-primary-600 bg-clip-text text-transparent">
                {t('services.hero.title')}
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 bg-clip-text text-transparent">
                {t('services.hero.titleAnimated')}
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
              {t('services.hero.subtitle.part1')}
              <span className="text-primary-700 font-semibold">{t('services.hero.subtitle.part2')}</span>
              {t('services.hero.subtitle.part3')}
              <span className="text-primary-700 font-semibold">{t('services.hero.subtitle.part4')}</span>
              {t('services.hero.subtitle.part5')}
            </p>
          </div>
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
            <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 mt-20 md:mt-16 bg-gradient-to-r from-gray-900 via-primary-800 to-primary-600 bg-clip-text text-transparent">
              {t('services.mainServices.title')}
            </h2>
          </motion.div>

          {/* Service Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8 mb-0">
            {mainServices.map((service, index) => {
              const serviceData = t(`services.mainServices.services.${service.titleKey}`, { returnObjects: true }) as any;
              const features = t(`services.mainServices.services.${service.titleKey}.features`, { returnObjects: true }) as string[];
              
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 100 }}
                  animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.2, duration: 1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group relative bg-white/80 backdrop-blur-xl border border-primary-200 rounded-2xl md:rounded-3xl p-4 md:p-8 hover:border-primary-300 hover:shadow-lg transition-all duration-500 flex flex-col h-full"
                >
                  <div className="flex flex-col h-full items-center text-center">
                    <div className="min-h-[auto] md:min-h-[280px] flex flex-col items-center">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className={`w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r ${service.gradient} rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6`}
                      >
                        <service.icon size={24} className="text-white" />
                      </motion.div>

                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{serviceData.title}</h3>
                      <p className="text-primary-700 font-semibold mb-2 md:mb-4 text-sm md:text-base">{serviceData.subtitle}</p>
                      
                      {/* Descrizione e bottone visibili solo su desktop */}
                      <div className="hidden md:block">
                        <p className="text-gray-600 leading-relaxed text-base">{serviceData.description}</p>
                        <div className="mt-8 w-full">
                          <h4 className="font-semibold text-gray-900 mb-3">{t('services.mainServices.modal.featuresTitle')}</h4>
                          <ul className="space-y-2">
                            {features.slice(0, 3).map((feature, idx) => (
                              <li key={idx} className="flex items-center justify-center text-sm text-gray-600">
                                <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>
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
              );
            })}
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
            <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-gray-900 via-primary-800 to-primary-600 bg-clip-text text-transparent">
              {t('services.cta.title')}
            </h2>
            <p className="text-xl text-gray-700 mb-12">
              {t('services.cta.subtitle')}
            </p>
            
            <motion.button
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 25px 50px rgba(232, 80, 2, 0.5)",
                y: -5
              }}
              whileTap={{ scale: 0.95 }}
              className="group relative bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white font-bold py-6 px-12 rounded-full transition-all duration-300 overflow-hidden text-lg"
              onClick={() => window.open('https://wa.me/3391797616?text=Sono%20interessato%20ad%20un%20preventivo%20per%20il%20vostro%20servizio', '_blank')}
            >
              <span className="relative z-10">{t('services.cta.button')}</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary-400 to-accent-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary-400/0 via-white/20 to-accent-400/0 opacity-0 group-hover:opacity-100"
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
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const developmentProcess: ProcessStep[] = [
    {
      stepKey: "analysis",
      color: "from-primary-500 to-accent-500",
      icon: Search
    },
    {
      stepKey: "design", 
      color: "from-primary-500 to-accent-500",
      icon: Palette
    },
    {
      stepKey: "development",
      color: "from-green-500 to-green-600",
      icon: Code
    },
    {
      stepKey: "testing",
      color: "from-orange-500 to-orange-600", 
      icon: TestTube
    },
    {
      stepKey: "launch",
      color: "from-primary-500 to-accent-500",
      icon: Rocket
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
      <div className="flex justify-center">
        <div className="w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <h2 className="font-bold bg-gradient-to-r from-gray-900 to-primary-600 bg-clip-text text-transparent"
              style={{ fontSize: 'clamp(1.3rem,6vw,2.7rem)' }}>
              {t('services.process.title')}
            </h2>
            <div className="flex items-center gap-2 sm:gap-3 mt-4 sm:mt-0">
              <button
                onClick={() => navigateTimeline('prev')}
                className="w-8 h-8 sm:w-10 sm:h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-primary-50 hover:border-primary-200 hover:text-primary-600 transition-all duration-200 shadow-sm"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-600 hover:bg-primary-700 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-200"
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              </button>
              <button
                onClick={() => navigateTimeline('next')}
                className="w-8 h-8 sm:w-10 sm:h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-primary-50 hover:border-primary-200 hover:text-primary-600 transition-all duration-200 shadow-sm"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
          <p className="text-gray-600 mx-auto mt-4" style={{ fontSize: 'clamp(0.95rem,3vw,1.2rem)', maxWidth: '95vw' }}>
            {t('services.process.subtitle')}
          </p>
        </div>

        {/* Main Container */}
        <div className="bg-white rounded-2xl border border-gray-100 p-3 sm:p-6 shadow-lg">
          {/* Progress Bar */}
          <div className="relative mb-4">
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full transition-all duration-700 ease-out"
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
                    ? 'border-primary-500 bg-primary-500 shadow-lg' 
                    : index < activeStep
                    ? 'border-green-500 bg-green-500'
                    : 'border-gray-300 bg-white hover:border-primary-300'
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
          <div className="max-w-4xl mx-auto px-2 sm:px-4">
            <div className="space-y-4 sm:space-y-6">
              {/* Prima riga: Icona, Nome e Descrizione */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-8 text-center sm:text-left">
                <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${developmentProcess[activeStep].color} rounded-xl flex items-center justify-center shadow-lg flex-shrink-0 mx-auto sm:mx-0`}>
                  {React.createElement(developmentProcess[activeStep].icon, { size: 22, className: "text-white sm:w-7 sm:h-7" })}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-2" style={{ fontSize: 'clamp(1.1rem,4vw,2.1rem)' }}>
                    {t(`services.process.steps.${developmentProcess[activeStep].stepKey}.title`)}
                  </h3>
                  <p className="text-gray-600 leading-relaxed" style={{ fontSize: 'clamp(0.95rem,2.5vw,1.15rem)' }}>
                    {t(`services.process.steps.${developmentProcess[activeStep].stepKey}.description`)}
                  </p>
                </div>
              </div>

              {/* Seconda riga: Tempistica e Strumenti */}
              <div className="flex flex-col sm:flex-row items-center justify-between border-t border-gray-100 pt-3 sm:pt-4 gap-4 sm:gap-0">
                <div className="flex items-center gap-2 text-primary-600 font-medium">
                  <Clock size={16} className="sm:w-5 sm:h-5" />
                  <span style={{ fontSize: 'clamp(0.95rem,2vw,1.1rem)' }}>{t(`services.process.steps.${developmentProcess[activeStep].stepKey}.duration`)}</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-4 flex-wrap justify-center sm:justify-start">
                  <h4 className="font-semibold text-gray-900 flex items-center gap-2" style={{ fontSize: 'clamp(0.95rem,2vw,1.1rem)' }}>
                    <Settings size={16} className="text-primary-600 sm:w-5 sm:h-5" />
                    {t('services.process.toolsLabel')}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {(t(`services.process.steps.${developmentProcess[activeStep].stepKey}.tools`, { returnObjects: true }) as string[]).map((tool: string, idx: number) => (
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
          <div className="flex justify-center items-center gap-2 mt-4 sm:mt-6">
            {developmentProcess.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeStep 
                    ? 'bg-primary-600 w-6' 
                    : 'bg-gray-300 hover:bg-primary-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default Services;