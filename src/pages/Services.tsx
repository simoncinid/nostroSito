import { motion, useInView } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import type { FC, ElementType } from 'react';
import logo from '../assets/logos/favicon.png';
import { 
  Clock, 
  CheckCircle, 
  Code, 
  Palette, 
  Rocket, 
  Search, 
  TestTube, 
  Bot, 
  Zap, 
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
      gradient: "from-primary-500 to-accent-500"
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
        className="relative w-full max-w-lg bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-white/10"
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
        <div className="p-6 max-h-[60vh] overflow-y-auto bg-gray-800">
          <div className="prose prose-sm prose-invert">
            <p className="text-gray-300 mb-6">{serviceData.description}</p>
            
            <h4 className="text-lg font-semibold text-white mb-3">{t('services.mainServices.modal.featuresTitle')}</h4>
            <ul className="space-y-2 mb-6">
              {features.map((feature: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <h4 className="text-lg font-semibold text-white mb-3">{t('services.mainServices.modal.technologiesTitle')}</h4>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech: string, idx: number) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer con CTA */}
        <div className="p-6 bg-gray-800/80 border-t border-white/10">
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
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
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
        className="relative h-[500px] flex items-center justify-center px-4 pt-16 md:pt-16 mb-6 z-20 text-white"
      >
        {/* Logo Background Static */}
        <div className="absolute inset-0 flex items-center justify-center pt-16 opacity-[0.02]">
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
              <span className="bg-gradient-to-r from-white via-primary-200 to-primary-400 bg-clip-text text-transparent">
                {t('services.hero.title')}
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary-400 via-primary-500 to-primary-400 bg-clip-text text-transparent">
                {t('services.hero.titleAnimated')}
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
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
            <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 mt-20 md:mt-16 bg-gradient-to-r from-white via-primary-200 to-primary-400 bg-clip-text text-transparent">
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
                  className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl p-4 md:p-8 hover:border-primary-400/30 hover:shadow-lg transition-all duration-500 flex flex-col h-full"
                >
                  <div className="flex flex-col h-full items-center text-center">
                    <div className="min-h-[auto] md:min-h-[280px] flex flex-col items-center">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className={`w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r ${service.gradient} rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6`}
                      >
                        <service.icon size={24} className="text-white" />
                      </motion.div>

                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{serviceData.title}</h3>
                      <p className="text-primary-400 font-semibold mb-2 md:mb-4 text-sm md:text-base">{serviceData.subtitle}</p>
                      
                      {/* Descrizione e bottone visibili solo su desktop */}
                      <div className="hidden md:block">
                        <p className="text-gray-300 leading-relaxed text-base">{serviceData.description}</p>
                        <div className="mt-8 w-full">
                          <h4 className="font-semibold text-white mb-3">{t('services.mainServices.modal.featuresTitle')}</h4>
                          <ul className="space-y-2">
                            {features.slice(0, 3).map((feature, idx) => (
                              <li key={idx} className="flex items-center justify-center text-sm text-gray-300">
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
            <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-white via-primary-200 to-primary-400 bg-clip-text text-transparent">
              {t('services.cta.title')}
            </h2>
            <p className="text-xl text-gray-300 mb-12">
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
  const [progress, setProgress] = useState(0);

  const developmentProcess: ProcessStep[] = [
    { stepKey: "analysis", color: "from-primary-500 to-primary-600", icon: Search },
    { stepKey: "design", color: "from-primary-500 to-primary-600", icon: Palette },
    { stepKey: "development", color: "from-primary-500 to-primary-600", icon: Code },
    { stepKey: "testing", color: "from-primary-500 to-primary-600", icon: TestTube },
    { stepKey: "launch", color: "from-primary-500 to-primary-600", icon: Rocket }
  ];

  // Progress bar animation + auto-advance
  useEffect(() => {
    setProgress(0);
    const duration = 4000;
    const interval = 50;
    const increment = 100 / (duration / interval);
    const isLastStep = activeStep === developmentProcess.length - 1;
    
    const progressInterval = setInterval(() => {
      // Se è l'ultimo step, non incrementare il progress (la barra resta ferma)
      if (isLastStep) return;
      
      setProgress(prev => {
        if (prev >= 100) {
          return prev;
        }
        return prev + increment;
      });
    }, interval);

    const timeout = setTimeout(() => {
      setActiveStep((prev) => (prev + 1) % developmentProcess.length);
    }, duration);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timeout);
    };
  }, [activeStep, developmentProcess.length]);

  const handleStepClick = (index: number) => {
    setActiveStep(index);
    setProgress(0);
  };

  // Calcola la larghezza totale della progress bar
  const getProgressWidth = () => {
    const stepWidth = 80 / (developmentProcess.length - 1);
    const completedWidth = activeStep * stepWidth;
    // Se è l'ultimo step, mostra la barra completa senza aggiungere progress
    if (activeStep === developmentProcess.length - 1) {
      return 80; // 80% è il massimo (da 10% a 90%)
    }
    const currentProgress = (progress / 100) * stepWidth;
    return completedWidth + currentProgress;
  };

  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-white">{t('services.process.title').split(' ').slice(0, -1).join(' ')} </span>
            <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              {t('services.process.title').split(' ').slice(-1)}
            </span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
            {t('services.process.subtitle')}
          </p>
        </div>

        {/* Timeline - Desktop */}
        <div className="hidden md:block">
          {/* Steps */}
          <div className="relative mb-10">
            {/* Linea di connessione base */}
            <div className="absolute top-8 left-[10%] right-[10%] h-1.5 bg-white/10 rounded-full" />
            {/* Progress bar animata */}
            <div 
              className="absolute top-8 left-[10%] h-1.5 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
              style={{ 
                width: `${getProgressWidth()}%`,
                transition: 'width 50ms linear'
              }}
            />
            
            <div className="flex justify-between relative px-[5%]">
              {developmentProcess.map((step, index) => (
                <button 
                  key={index}
                  onClick={() => handleStepClick(index)}
                  className="flex flex-col items-center relative group"
                >
                  {/* Cerchio */}
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg z-10 transition-all duration-300 ${
                    index <= activeStep 
                      ? 'bg-gradient-to-br from-primary-500 to-primary-600' 
                      : 'bg-gray-700'
                  } ${index === activeStep ? 'ring-4 ring-primary-500/30 scale-110' : 'hover:scale-105'}`}>
                    <step.icon size={26} className="text-white" />
                  </div>
                  
                  {/* Numero e Titolo */}
                  <span className={`text-xs font-bold mt-3 transition-colors duration-300 ${index <= activeStep ? 'text-primary-400' : 'text-gray-500'}`}>
                    0{index + 1}
                  </span>
                  <h3 className={`font-semibold text-sm mt-1 text-center max-w-[100px] transition-colors duration-300 ${index <= activeStep ? 'text-white' : 'text-gray-500'}`}>
                    {t(`services.process.steps.${step.stepKey}.title`)}
                  </h3>
                </button>
              ))}
            </div>
          </div>

          {/* Contenuto attivo - Titolo + testo */}
          <motion.div 
            key={activeStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent mb-3">
              {t(`services.process.steps.${developmentProcess[activeStep].stepKey}.title`)}
            </h3>
            <p className="text-gray-300 leading-relaxed mb-3">
              {t(`services.process.steps.${developmentProcess[activeStep].stepKey}.description`)}
            </p>
            <div className="flex items-center justify-center gap-2 text-primary-400 text-sm font-medium">
              <Clock size={16} />
              <span>{t(`services.process.steps.${developmentProcess[activeStep].stepKey}.duration`)}</span>
            </div>
          </motion.div>
        </div>

        {/* Timeline - Mobile */}
        <div className="md:hidden space-y-3">
          {developmentProcess.map((step, index) => (
            <button 
              key={index}
              onClick={() => handleStepClick(index)}
              className={`w-full flex items-start gap-4 rounded-xl p-4 border transition-all duration-300 text-left ${
                index === activeStep 
                  ? 'bg-white/10 border-primary-500/50' 
                  : 'bg-white/5 border-white/10 opacity-60'
              }`}
            >
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg flex-shrink-0 ${
                index === activeStep ? 'ring-2 ring-primary-500/30' : ''
              }`}>
                <step.icon size={18} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-primary-400 font-bold">0{index + 1}</span>
                  <h3 className="text-white font-semibold text-sm">
                    {t(`services.process.steps.${step.stepKey}.title`)}
                  </h3>
                </div>
                {index === activeStep && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-gray-400 text-xs leading-relaxed mb-2">
                      {t(`services.process.steps.${step.stepKey}.description`)}
                    </p>
                    <div className="flex items-center gap-1 text-primary-400 text-xs font-medium">
                      <Clock size={12} />
                      <span>{t(`services.process.steps.${step.stepKey}.duration`)}</span>
                    </div>
                  </motion.div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;