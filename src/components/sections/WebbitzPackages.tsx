import { motion } from 'framer-motion'
import { Check, Zap, Crown, ArrowRight, Sparkles, Info, MessageSquare, Code, Bot, Search, Settings, Globe, X, ChevronRight, Star, Smartphone, Laptop, Monitor, Terminal } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import type { LucideIcon } from 'lucide-react'

// Definizione dei tipi
interface FeaturePopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  icon: LucideIcon;
  featureType: string;
}

interface FeatureInfo {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface FeatureWithInfo {
  text: string;
  info: 'sito' | 'chatbot' | 'seo' | 'brand' | 'codice';
  icon?: LucideIcon;
}

interface PackageInfo {
  id: string;
  name: string;
  price: string;
  originalPrice: string;
  badge: string;
  badgeColor: string;
  icon: LucideIcon;
  description: string;
  features: FeatureWithInfo[];
  cta: string;
  whatsappLink: string;
  popular: boolean;
}

interface PopupState {
  open: boolean;
  title: string;
  description: string;
  icon: LucideIcon | null;
  featureType?: string;
}

// Componente per l'animazione del sito web
const WebsiteAnimation = () => {
  const [step, setStep] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setStep((prevStep) => (prevStep < 5 ? prevStep + 1 : 0));
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [step]);
  
  return (
    <div className="bg-gray-900 rounded-lg p-0 h-48 overflow-hidden mb-4 relative">
      {/* Browser frame */}
      <div className="bg-gray-800 h-7 flex items-center px-2 border-b border-gray-700">
        <div className="flex space-x-1.5 mr-4">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
        </div>
        <div className="bg-gray-700 rounded-full px-3 py-0.5 text-xs text-gray-300 flex-1 text-center">
          www.tuositowebbitz.it
        </div>
      </div>
      
      {/* Content */}
      <div className="p-2 relative">
        {/* Steps of site creation */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center bg-gray-900"
          initial={{ opacity: 1 }}
          animate={{ opacity: step > 0 ? 0 : 1 }}
        >
          <motion.div
            animate={{ scale: [0.95, 1.05, 0.95] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="bg-gray-800 rounded p-2 text-xs text-primary-400 font-mono"
          >
            {'<div className="app-container">'}
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="absolute inset-0 flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: step === 1 ? 1 : 0 }}
        >
          <div className="h-6 w-full bg-gradient-primary rounded-t mb-2"></div>
          <div className="flex-1 bg-gray-800 flex items-center justify-center">
            <div className="text-white text-xs">Header</div>
          </div>
        </motion.div>
        
        <motion.div 
          className="absolute inset-0 flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: step === 2 ? 1 : 0 }}
        >
          <div className="h-6 w-full bg-gradient-primary rounded-t"></div>
          <div className="flex-1 bg-gray-800 flex flex-col">
            <div className="h-16 bg-gray-700 flex items-center justify-center mb-2">
              <div className="text-white text-xs">Hero Section</div>
            </div>
            <div className="flex-1"></div>
          </div>
        </motion.div>
        
        <motion.div 
          className="absolute inset-0 flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: step === 3 ? 1 : 0 }}
        >
          <div className="h-6 w-full bg-gradient-primary rounded-t"></div>
          <div className="flex-1 bg-gray-800 flex flex-col">
            <div className="h-16 bg-gray-700 flex items-center justify-center mb-2">
              <div className="text-white text-xs">Hero Section</div>
            </div>
            <div className="grid grid-cols-3 gap-2 px-2">
              <div className="bg-gray-700 h-12 rounded flex items-center justify-center">
                <div className="text-white text-[8px]">Feature 1</div>
              </div>
              <div className="bg-gray-700 h-12 rounded flex items-center justify-center">
                <div className="text-white text-[8px]">Feature 2</div>
              </div>
              <div className="bg-gray-700 h-12 rounded flex items-center justify-center">
                <div className="text-white text-[8px]">Feature 3</div>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="absolute inset-0 flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: step === 4 ? 1 : 0 }}
        >
          <div className="h-6 w-full bg-gradient-primary rounded-t"></div>
          <div className="flex-1 bg-gray-800 flex flex-col">
            <div className="h-16 bg-primary-900/50 flex items-center justify-center mb-2">
              <div className="text-white text-xs font-bold">Webbitz</div>
            </div>
            <div className="grid grid-cols-3 gap-2 px-2 mb-2">
              <div className="bg-primary-800/30 h-12 rounded flex items-center justify-center">
                <div className="text-white text-[8px]">Feature 1</div>
              </div>
              <div className="bg-primary-800/30 h-12 rounded flex items-center justify-center">
                <div className="text-white text-[8px]">Feature 2</div>
              </div>
              <div className="bg-primary-800/30 h-12 rounded flex items-center justify-center">
                <div className="text-white text-[8px]">Feature 3</div>
              </div>
            </div>
            <div className="h-8 bg-gray-700 mx-8 rounded flex items-center justify-center">
              <div className="text-white text-[8px]">CTA Button</div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: step === 5 ? 1 : 0 }}
        >
          <div className="absolute inset-0 flex flex-col">
            <div className="h-6 w-full bg-gradient-primary rounded-t"></div>
            <div className="flex-1 bg-gray-800 flex flex-col">
              <div className="h-16 bg-primary-900/50 flex items-center justify-center mb-2">
                <div className="text-white text-xs font-bold">Webbitz</div>
              </div>
              <div className="grid grid-cols-3 gap-2 px-2 mb-2">
                <div className="bg-primary-800/30 h-12 rounded flex items-center justify-center">
                  <div className="text-white text-[8px]">Feature 1</div>
                </div>
                <div className="bg-primary-800/30 h-12 rounded flex items-center justify-center">
                  <div className="text-white text-[8px]">Feature 2</div>
                </div>
                <div className="bg-primary-800/30 h-12 rounded flex items-center justify-center">
                  <div className="text-white text-[8px]">Feature 3</div>
                </div>
              </div>
              <div className="h-8 bg-primary-600 mx-8 rounded flex items-center justify-center">
                <div className="text-white text-[8px] font-medium">Contattaci</div>
              </div>
            </div>
          </div>
          
          <div className="absolute right-2 bottom-2 flex space-x-2">
            <div className="bg-primary-700/50 p-1 rounded">
              <Smartphone className="w-3 h-3 text-white" />
            </div>
            <div className="bg-primary-700/50 p-1 rounded">
              <Laptop className="w-3 h-3 text-white" />
            </div>
            <div className="bg-primary-700/50 p-1 rounded">
              <Monitor className="w-3 h-3 text-white" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Componente per l'animazione del chatbot
const ChatbotAnimation = () => {
  const messages = [
    { isBot: true, text: 'Ciao! Come posso aiutarti oggi?' },
    { isBot: false, text: 'Vorrei sapere di più sui vostri servizi' },
    { isBot: true, text: 'Siamo specializzati in siti web, SEO e marketing digitale. Quale ti interessa?' },
    { isBot: false, text: 'Mi serve un sito web per la mia azienda' },
    { isBot: true, text: 'Ottimo! Posso avere la tua email per inviarti maggiori informazioni?' },
    { isBot: false, text: 'cliente@esempio.com' },
    { isBot: true, text: 'Grazie! Un nostro esperto ti contatterà presto.' }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    if (currentIndex < messages.length) {
      const timer = setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      const resetTimer = setTimeout(() => {
        setCurrentIndex(0);
      }, 2500);
      return () => clearTimeout(resetTimer);
    }
  }, [currentIndex, messages.length]);

  return (
    <div className="bg-gray-100 rounded-lg p-0 h-48 mb-4 overflow-hidden flex flex-col relative">
      {/* Chat header */}
      <div className="bg-primary-600 text-white px-3 py-2 flex items-center">
        <Bot className="w-4 h-4 mr-2" />
        <div className="text-sm font-medium">Chatbot Webbitz</div>
      </div>
      
      {/* Chat body */}
      <div className="flex-1 p-2 overflow-hidden flex flex-col space-y-2">
        {messages.slice(0, currentIndex).map((message, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
          >
            <div className={`max-w-[80%] px-2 py-1 rounded-lg text-xs ${
              message.isBot 
                ? 'bg-white text-gray-800 rounded-bl-none shadow'
                : 'bg-primary-500 text-white rounded-br-none'
            }`}>
              {message.text}
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Notification */}
      {currentIndex >= messages.length && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center"
        >
          <div className="bg-green-500 text-white px-3 py-2 rounded-lg flex items-center font-medium text-sm">
            <Check className="w-4 h-4 mr-2" />
            Lead Acquisito!
          </div>
        </motion.div>
      )}
    </div>
  );
};

// Componente per l'animazione SEO
const SEOAnimation = () => {
  const [step, setStep] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setStep((prevStep) => (prevStep < 5 ? prevStep + 1 : 0));
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [step]);
  
  return (
    <div className="bg-white rounded-lg p-0 h-48 mb-4 overflow-hidden flex flex-col border border-gray-200 relative">
      {/* Search bar */}
      <div className="bg-gray-100 border-b border-gray-200 p-2 flex items-center">
        <div className="bg-white flex-1 rounded-full flex items-center px-3 py-1 border border-gray-300">
          <Search className="w-3 h-3 text-gray-400 mr-2" />
          <div className="text-xs text-primary-600">sito web personalizzato</div>
        </div>
      </div>
      
      {/* Search results */}
      <div className="flex-1 p-2 overflow-hidden">
        <motion.div
          animate={{ y: step >= 2 ? -80 : 0 }}
          transition={{ duration: 1 }}
        >
          {/* Webbitz result - PRIMO RISULTATO */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : 10 }}
            className="mb-3 pb-2 border-b border-gray-100"
          >
            <div className="text-xs text-primary-700 font-medium mb-0.5">Webbitz | Siti Web Personalizzati - Realizzazione Siti Custom</div>
            <div className="text-xs text-green-700">www.webbitz.it › servizi › sito-personalizzato</div>
            <div className="text-xs text-gray-600">Sviluppiamo siti web da zero, senza template o WordPress...</div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: step >= 2 ? 1 : 0 }}
              className="flex mt-1 items-center"
            >
              <div className="flex mr-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-2 h-2 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <div className="text-[10px] text-primary-600">142 recensioni</div>
            </motion.div>
          </motion.div>
          
          {/* Competitor */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: step >= 3 ? 1 : 0, y: step >= 3 ? 0 : 10 }}
            className="mb-3 pb-2 border-b border-gray-100"
          >
            <div className="text-xs text-primary-700 font-medium mb-0.5">Realizzazione Siti Web | Agenzia Web</div>
            <div className="text-xs text-green-700">www.altrocompetitor.it</div>
            <div className="text-xs text-gray-600">Sviluppiamo siti web personalizzati per aziende...</div>
          </motion.div>
          
          {/* More competitors */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: step >= 4 ? 1 : 0, y: step >= 4 ? 0 : 10 }}
            className="mb-3 pb-2 border-b border-gray-100"
          >
            <div className="text-xs text-primary-700 font-medium mb-0.5">Siti Web Personalizzati - Sviluppo...</div>
            <div className="text-xs text-green-700">www.altroweb.it</div>
            <div className="text-xs text-gray-600">Web design e sviluppo siti...</div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: step >= 4 ? 1 : 0, y: step >= 4 ? 0 : 10 }}
            className="mb-3"
          >
            <div className="text-xs text-primary-700 font-medium mb-0.5">Template Siti Web - Soluzioni...</div>
            <div className="text-xs text-green-700">www.templateweb.it</div>
            <div className="text-xs text-gray-600">Template e temi WordPress...</div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Position marker - Notifica a centro schermo */}
      {step >= 5 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center"
        >
          <div className="bg-primary-600 text-white px-4 py-3 rounded-lg flex items-center font-medium text-sm">
            <Search className="w-4 h-4 mr-2" />
            1° su Google!
          </div>
        </motion.div>
      )}
    </div>
  );
};

// Componente per l'animazione del brand
const BrandAnimation = () => {
  const [step, setStep] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setStep((prevStep) => (prevStep < 5 ? prevStep + 1 : 0));
    }, 1200);
    
    return () => clearTimeout(timer);
  }, [step]);
  
  return (
    <div className="bg-white rounded-lg p-4 h-48 mb-4 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100"></div>
      
      <div className="relative h-full flex items-center justify-center">
        {/* Logo */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: step >= 1 ? 1 : 0.8, 
            opacity: step >= 1 ? 1 : 0,
            rotate: step === 5 ? 360 : 0
          }}
          transition={{ 
            duration: step === 5 ? 0.8 : 0.4,
            type: step === 5 ? "spring" : "tween"
          }}
          className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center text-white font-bold text-2xl"
        >
          W
        </motion.div>
        
        {/* Color palette */}
        {step >= 2 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute top-2 left-2 flex space-x-1"
          >
            {['bg-primary-500', 'bg-indigo-500', 'bg-primary-500', 'bg-primary-600'].map((color, i) => (
              <motion.div 
                key={i}
                initial={{ scale: 0, y: 10 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`w-4 h-4 rounded-full ${color}`}
              ></motion.div>
            ))}
          </motion.div>
        )}
        
        {/* Typography */}
        {step >= 3 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-2 right-2 flex flex-col items-end"
          >
            <div className="text-xs font-bold text-gray-800">WEBBITZ</div>
            <div className="text-[8px] text-gray-500">Open Sans</div>
          </motion.div>
        )}
        
        {/* Design elements */}
        {step >= 4 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute bottom-0 inset-x-0 flex justify-between items-center p-2"
          >
            <motion.div 
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.1 }}
              className="h-10 w-4 bg-primary-200 rounded-full"
            ></motion.div>
            <motion.div 
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2 }}
              className="h-6 w-16 bg-primary-300 rounded-md"
            ></motion.div>
            <motion.div 
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.3 }}
              className="h-8 w-8 bg-primary-400 rounded-lg"
            ></motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

// Componente per l'animazione del codice
const CodeAnimation = () => {
  const [line, setLine] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLine((prevLine) => (prevLine < 8 ? prevLine + 1 : 0));
    }, 600);
    
    return () => clearTimeout(timer);
  }, [line]);
  
  const codeLines = [
    { text: "import React from 'react';", color: "text-primary-400" },
    { text: "import { motion } from 'framer-motion';", color: "text-primary-400" },
    { text: "", color: "text-white" },
    { text: "const WebbitzComponent = () => {", color: "text-yellow-300" },
    { text: "  const [isActive, setIsActive] = useState(false);", color: "text-white" },
    { text: "", color: "text-white" },
    { text: "  return (", color: "text-white" },
    { text: '    <div className="container">', color: "text-primary-300" },
    { text: "      <Header />", color: "text-green-300" },
    { text: "    </div>", color: "text-primary-300" },
    { text: "  );", color: "text-white" },
    { text: "};", color: "text-yellow-300" },
    { text: "", color: "text-white" },
    { text: "export default WebbitzComponent;", color: "text-primary-400" }
  ];
  
  return (
    <div className="bg-gray-900 rounded-lg p-0 h-48 mb-4 overflow-hidden flex flex-col">
      {/* Editor header */}
      <div className="bg-gray-800 px-3 py-1 flex items-center border-b border-gray-700">
        <div className="text-xs text-gray-400 flex items-center">
          <Terminal className="w-3 h-3 mr-1" />
          <span>component.jsx</span>
        </div>
      </div>
      
      {/* Code editor */}
      <div className="flex-1 p-3 font-mono text-xs overflow-hidden relative">
        <div className="relative">
          {codeLines.map((codeLine, idx) => (
            <div key={idx} className="flex items-center">
              <div className="w-5 text-gray-500 mr-2">{idx + 1}</div>
              <motion.div
                initial={{ opacity: idx <= line ? 1 : 0, y: idx <= line ? 0 : 10 }}
                animate={{ opacity: idx <= line ? 1 : 0, y: idx <= line ? 0 : 10 }}
                className={codeLine.color}
              >
                {codeLine.text}
              </motion.div>
              {idx === line && (
                <motion.div 
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-2 h-4 bg-gray-400 ml-0.5"
                ></motion.div>
              )}
            </div>
          ))}
        </div>
        
        {/* Fade effect at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-900 to-transparent"></div>
      </div>
    </div>
  );
};

// Componente di placeholder per l'animazione
const FeatureAnimation = ({ type }: { type: string }) => {
  switch(type) {
    case 'sito':
      return <WebsiteAnimation />;
    case 'chatbot':
      return <ChatbotAnimation />;
    case 'seo':
      return <SEOAnimation />;
    case 'brand':
      return <BrandAnimation />;
    case 'codice':
      return <CodeAnimation />;
    default:
      return <WebsiteAnimation />;
  }
}

// Componente del popup
const FeaturePopup = ({ isOpen, onClose, title, description, icon: Icon, featureType }: FeaturePopupProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: isOpen ? 1 : 0, scale: isOpen ? 1 : 0.8 }}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${isOpen ? '' : 'pointer-events-none'}`}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <motion.div 
        className="bg-white rounded-2xl p-6 shadow-xl max-w-md w-full relative z-10 overflow-hidden"
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", damping: 25 }}
      >
        <div className="absolute top-0 right-0 m-4">
          <button 
            onClick={onClose}
            className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <X size={16} className="text-gray-500" />
          </button>
        </div>
      
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-primary-500/20 p-3 rounded-full">
            <Icon className="w-6 h-6 text-primary-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        </div>
        
        <p className="text-gray-600 mb-4">{description}</p>
        
        {/* Animazione in base al tipo */}
        <FeatureAnimation type={featureType} />
        
        <button 
          onClick={onClose} 
          className="w-full bg-primary-600 text-white py-3 rounded-xl font-medium hover:bg-primary-700 transition-colors flex items-center justify-center"
        >
          <span>Scopri di più</span>
          <ChevronRight size={18} className="ml-1" />
        </button>
      </motion.div>
    </motion.div>
  )
}

const WebbitzPackages = () => {
  const { t } = useTranslation()
  const [popup, setPopup] = useState<PopupState>({ open: false, title: '', description: '', icon: null })

  const openPopup = (title: string, description: string, icon: LucideIcon, featureType: string) => {
    setPopup({ open: true, title, description, icon, featureType })
  }

  const closePopup = () => {
    setPopup({ ...popup, open: false })
  }

  const featuresWithInfo: Record<string, FeatureInfo> = {
    sito: {
      icon: Globe,
      title: 'Sito Web Responsive Personalizzato',
      description: 'Sviluppiamo siti web da zero, senza template o WordPress. Design completamente personalizzato, ottimizzato per tutti i dispositivi, con un\'esperienza utente eccezionale e tempi di caricamento rapidi.'
    },
    chatbot: {
      icon: Bot,
      title: 'Chatbot AI per Lead Generation',
      description: 'Il nostro chatbot AI avanzato interagisce con i visitatori 24/7, rispondendo a domande, raccogliendo dati e qualificando lead anche quando dormi. Converte in media il 25% del traffico in contatti concreti.'
    },
    seo: {
      icon: Search,
      title: 'SEO Ottimizzazione Completa',
      description: 'Ottimizziamo il tuo sito per i motori di ricerca con strategie tecniche avanzate, ricerca keyword, ottimizzazione on-page e costruzione di link di qualità per posizionarti ai primi posti su Google.'
    },
    brand: {
      icon: Settings,
      title: 'Brand Identity Completa',
      description: 'Sviluppiamo un\'identità visiva coerente e memorabile che include logo professionale, palette colori, tipografia, e linee guida complete per un brand riconoscibile e di impatto.'
    },
    codice: {
      icon: Code,
      title: 'Codice Personalizzato',
      description: 'Scriviamo codice pulito, ottimizzato e su misura per le tue esigenze. Niente template o soluzioni preconfezionate, solo sviluppo web professionale con le tecnologie più moderne.'
    }
  }

  const packages: PackageInfo[] = [
    {
      id: 'essential',
      name: t('packages.essential.name'),
      price: '1999',
      originalPrice: '2999',
      badge: t('packages.essential.badge'),
      badgeColor: 'bg-primary-500',
      icon: Zap,
      description: t('packages.essential.description'),
      features: [
        { text: t('packages.features.chatbot'), info: 'chatbot', icon: Bot },
        { text: t('packages.features.website'), info: 'sito', icon: Globe },
        { text: t('packages.features.seo'), info: 'seo', icon: Search },
        { text: '', info: 'sito' } // Feature vuota per allineare con il pacchetto Premium
      ],
      cta: t('packages.essential.cta'),
      whatsappLink: 'https://wa.me/3391797616?text=Sono%20interessato%20al%20pacchetto%20Essential',
      popular: true
    },
    {
      id: 'premium',
      name: t('packages.premium.name'),
      price: '2299',
      originalPrice: '3499',
      badge: t('packages.premium.badge'),
      badgeColor: 'bg-gradient-to-r from-yellow-400 to-yellow-600',
      icon: Crown,
      description: t('packages.premium.description'),
      features: [
        { text: t('packages.features.chatbot'), info: 'chatbot', icon: Bot },
        { text: t('packages.features.website'), info: 'sito', icon: Globe },
        { text: t('packages.features.seo'), info: 'seo', icon: Search },
        { text: t('packages.features.brand'), info: 'brand', icon: Settings }
      ],
      cta: t('packages.premium.cta'),
      whatsappLink: 'https://wa.me/3391797616?text=Sono%20interessato%20al%20pacchetto%20Premium',
      popular: false
    }
  ]

  return (
    <section className="py-12 pb-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.1),transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(139,92,246,0.1),transparent_50%)]"></div>
      </div>

      <div className="container-premium relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-primary-500/20 border border-primary-400/30 backdrop-blur-sm mb-8"
          >
            <Sparkles className="w-5 h-5 text-primary-400" />
            <span className="text-primary-300 font-medium">{t('packages.badge')}</span>
          </motion.div>

          <h2 className="heading-lg text-white mb-6">
            {t('packages.title')}{' '}
            <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              {t('packages.titleHighlight')}
            </span>
            {' '}{t('packages.titleEnd')}
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t('packages.subtitle')}
          </p>
        </motion.div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className={`relative group ${
                pkg.popular 
                  ? 'lg:scale-105 lg:-translate-y-4' 
                  : ''
              }`}
            >
              {/* Card */}
              <div className={`relative bg-white/5 backdrop-blur-xl rounded-3xl border ${
                pkg.popular 
                  ? 'border-primary-400/50 shadow-glow-lg' 
                  : 'border-white/10'
              } p-3 md:p-6 h-full flex flex-col transition-all duration-500 group-hover:shadow-premium-lg group-hover:border-primary-400/30`}>
                {/* Popular Badge */}
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 md:-top-4">
                    <div className={`${pkg.badgeColor} text-white px-4 md:px-6 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-semibold shadow-glow`}>
                      {pkg.badge}
                    </div>
                  </div>
                )}

                {/* Header */}
                <div className="text-center mb-3 md:mb-6">
                  <div className={`inline-flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-2xl mb-2 md:mb-3 ${
                    pkg.popular 
                      ? 'bg-gradient-primary shadow-glow' 
                      : 'bg-white/10'
                  }`}>
                    <pkg.icon className={`w-5 h-5 md:w-7 md:h-7 ${
                      pkg.popular ? 'text-white' : 'text-primary-400'
                    }`} />
                  </div>
                  
                  <h3 className="text-base md:text-xl font-bold text-white mb-1 md:mb-2">{pkg.name}</h3>
                  <p className="text-gray-300 text-xs md:text-sm mb-2 md:mb-4">{pkg.description}</p>
                  {/* Preventivo personalizzato */}
                  <div className="flex items-center justify-center mb-1 md:mb-2">
                    <span className="text-sm md:text-lg font-semibold text-primary-500">{t('packages.contactQuote')}</span>
                  </div>
                </div>

                 {/* Features - Nuova versione centrata con info popup */}
                 <div className="mb-3 md:mb-6 text-center flex flex-col">
                  <h4 className="text-white font-semibold mb-2 md:mb-4 text-sm md:text-base">{t('packages.includes')}</h4>
                                      <ul className="flex flex-col gap-1.5 md:gap-3 px-0">
                    {pkg.features.map((feature, idx) => (
                      feature.text ? (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1, duration: 0.5 }}
                          className="flex items-center gap-2 md:gap-3 px-0 md:px-2"
                        >
                          {feature.icon && (
                            <div className="flex-shrink-0 w-5 md:w-7 flex items-center justify-center">
                              <feature.icon className="w-4 h-4 md:w-5 md:h-5 text-primary-300 package-feature-icon" />
                            </div>
                          )}
                          <span className="text-white font-medium package-feature-text text-[clamp(0.65rem,2.5vw,0.9rem)] md:text-base flex-1 text-left">{feature.text}</span>
                          <button 
                            onClick={() => openPopup(
                              featuresWithInfo[feature.info].title, 
                              featuresWithInfo[feature.info].description,
                              featuresWithInfo[feature.info].icon || Globe,
                              feature.info
                            )}
                            className="p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors ml-1"
                          >
                            <Info className="w-4 h-4 text-primary-300" />
                          </button>
                        </motion.li>
                      ) : (
                        <li key={idx} className="h-[32px] md:h-[70px]"></li> // Spazio vuoto invece del box
                      )
                    ))}
                  </ul>
                  {/* Spacer per allineare il bottone Premium SOLO su desktop */}
                  {pkg.id === 'premium' && (
                    <li className="hidden md:block h-[32px] md:h-[70px]"></li>
                  )}
                </div>

                {/* CTA Button */}
                <div className="mt-auto pt-4">
                  <a
                    href={pkg.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group/btn relative w-full inline-flex items-center justify-center space-x-2 md:space-x-3 px-4 md:px-8 py-3 md:py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:-translate-y-1 ${
                      pkg.popular
                        ? 'bg-gradient-primary text-white shadow-glow hover:shadow-glow-lg'
                        : 'bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:border-primary-400/50'
                    }`}
                  >
                    <MessageSquare className="w-5 h-5 mr-1 md:mr-2 z-10 relative" />
                    <span className="relative z-10 font-bold text-sm md:text-base">{pkg.cta}</span>
                    <motion.div
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                      className="relative z-10"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center mt-16 mb-16"
        >
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              {t('packages.bottomCTA.title')}
            </h3>
            <p className="text-gray-300 mb-6">
              {t('packages.bottomCTA.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/3391797616?text=Sono%20interessato%20ad%20una%20consulenza%20gratuita"
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-primary text-white rounded-xl shadow-glow hover:shadow-glow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <MessageSquare className="w-5 h-5" />
                <span>{t('packages.bottomCTA.button')}</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Popup informativo */}
      {popup.icon && (
        <FeaturePopup 
          isOpen={popup.open} 
          onClose={closePopup} 
          title={popup.title} 
          description={popup.description} 
          icon={popup.icon}
          featureType={popup.featureType || 'sito'}
        />
      )}
    </section>
  )
}

export default WebbitzPackages 