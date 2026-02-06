import { motion } from 'framer-motion'
import { Zap, Crown, ArrowRight, Sparkles, MessageSquare, Bot, Search, Globe, Briefcase, Palette, BarChart3, Database, Settings, Smartphone, Check, Info, X, ChevronRight, Star, Laptop, Monitor, Terminal, Code } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import type { LucideIcon } from 'lucide-react'

// Tipi
interface FeatureInfo {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface PopupState {
  open: boolean;
  title: string;
  description: string;
  icon: LucideIcon | null;
  featureType: string;
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
      <div className="bg-gray-800 h-7 flex items-center px-2 border-b border-gray-700">
        <div className="flex space-x-1.5 mr-4">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
        </div>
        <div className="bg-gray-700 rounded-full px-3 py-0.5 text-xs text-gray-300 flex-1 text-center">
          www.tuosito.it
        </div>
      </div>
      
      <div className="p-2 relative">
        <motion.div 
          className="absolute inset-0 flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: step >= 1 ? 1 : 0 }}
        >
          <div className="h-6 w-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-t"></div>
          <div className="flex-1 bg-gray-800 flex flex-col p-2">
            <div className="h-16 bg-primary-900/50 flex items-center justify-center mb-2 rounded">
              <div className="text-white text-xs font-bold">Hero Section</div>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-2">
              <div className="bg-primary-800/30 h-10 rounded flex items-center justify-center">
                <div className="text-white text-[8px]">Feature</div>
              </div>
              <div className="bg-primary-800/30 h-10 rounded flex items-center justify-center">
                <div className="text-white text-[8px]">Feature</div>
              </div>
              <div className="bg-primary-800/30 h-10 rounded flex items-center justify-center">
                <div className="text-white text-[8px]">Feature</div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {step >= 5 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute right-2 bottom-2 flex space-x-2"
          >
            <div className="bg-primary-700/50 p-1 rounded"><Smartphone className="w-3 h-3 text-white" /></div>
            <div className="bg-primary-700/50 p-1 rounded"><Laptop className="w-3 h-3 text-white" /></div>
            <div className="bg-primary-700/50 p-1 rounded"><Monitor className="w-3 h-3 text-white" /></div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

// Componente per l'animazione del chatbot
const ChatbotAnimation = () => {
  const messages = [
    { isBot: true, text: 'Ciao! Come posso aiutarti?' },
    { isBot: false, text: 'Vorrei info sui servizi' },
    { isBot: true, text: 'Certo! Cosa ti interessa?' },
    { isBot: false, text: 'Un sito web per la mia azienda' },
    { isBot: true, text: 'Ottimo! Lasciami la tua email' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    if (currentIndex < messages.length) {
      const timer = setTimeout(() => setCurrentIndex(currentIndex + 1), 1000);
      return () => clearTimeout(timer);
    } else {
      const resetTimer = setTimeout(() => setCurrentIndex(0), 2500);
      return () => clearTimeout(resetTimer);
    }
  }, [currentIndex, messages.length]);

  return (
    <div className="bg-gray-100 rounded-lg h-48 mb-4 overflow-hidden flex flex-col relative">
      <div className="bg-primary-600 text-white px-3 py-2 flex items-center">
        <Bot className="w-4 h-4 mr-2" />
        <div className="text-sm font-medium">Chatbot AI</div>
      </div>
      
      <div className="flex-1 p-2 overflow-hidden flex flex-col space-y-2">
        {messages.slice(0, currentIndex).map((message, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
          >
            <div className={`max-w-[80%] px-2 py-1 rounded-lg text-xs ${
              message.isBot ? 'bg-white text-gray-800 shadow' : 'bg-primary-500 text-white'
            }`}>
              {message.text}
            </div>
          </motion.div>
        ))}
      </div>
      
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
    const timer = setTimeout(() => setStep((prev) => (prev < 5 ? prev + 1 : 0)), 1500);
    return () => clearTimeout(timer);
  }, [step]);
  
  return (
    <div className="bg-white rounded-lg h-48 mb-4 overflow-hidden flex flex-col border border-gray-200 relative">
      <div className="bg-gray-100 border-b border-gray-200 p-2 flex items-center">
        <div className="bg-white flex-1 rounded-full flex items-center px-3 py-1 border border-gray-300">
          <Search className="w-3 h-3 text-gray-400 mr-2" />
          <div className="text-xs text-primary-600">sito web personalizzato</div>
        </div>
      </div>
      
      <div className="flex-1 p-2 overflow-hidden">
        <motion.div animate={{ y: step >= 2 ? -60 : 0 }} transition={{ duration: 1 }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: step >= 1 ? 1 : 0 }} className="mb-3 pb-2 border-b border-gray-100">
            <div className="text-xs text-primary-700 font-medium">Il Tuo Sito - Primo su Google</div>
            <div className="text-xs text-green-700">www.tuosito.it</div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: step >= 2 ? 1 : 0 }} className="flex mt-1 items-center">
              <div className="flex mr-2">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-2 h-2 text-yellow-400 fill-yellow-400" />)}
              </div>
              <div className="text-[10px] text-primary-600">142 recensioni</div>
            </motion.div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: step >= 3 ? 1 : 0 }} className="mb-3 pb-2 border-b border-gray-100">
            <div className="text-xs text-gray-600 font-medium">Competitor 1</div>
            <div className="text-xs text-green-700">www.competitor.it</div>
          </motion.div>
        </motion.div>
      </div>
      
      {step >= 5 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-primary-600 text-white px-4 py-3 rounded-lg flex items-center font-medium text-sm">
            <Search className="w-4 h-4 mr-2" />1° su Google!
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
    const timer = setTimeout(() => setStep((prev) => (prev < 5 ? prev + 1 : 0)), 1200);
    return () => clearTimeout(timer);
  }, [step]);
  
  return (
    <div className="bg-white rounded-lg p-4 h-48 mb-4 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100"></div>
      <div className="relative h-full flex items-center justify-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: step >= 1 ? 1 : 0.8, opacity: step >= 1 ? 1 : 0 }}
          className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center text-white font-bold text-2xl"
        >
          W
        </motion.div>
        
        {step >= 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute top-2 left-2 flex space-x-1">
            {['bg-primary-500', 'bg-amber-500', 'bg-primary-600', 'bg-gray-800'].map((color, i) => (
              <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.1 }} className={`w-4 h-4 rounded-full ${color}`}></motion.div>
            ))}
          </motion.div>
        )}
        
        {step >= 3 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute top-2 right-2 flex flex-col items-end">
            <div className="text-xs font-bold text-gray-800">BRAND</div>
            <div className="text-[8px] text-gray-500">Typography</div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

// Componente per l'animazione Design/UX
const DesignAnimation = () => {
  const [step, setStep] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => setStep((prev) => (prev < 4 ? prev + 1 : 0)), 1200);
    return () => clearTimeout(timer);
  }, [step]);
  
  return (
    <div className="bg-gray-900 rounded-lg p-4 h-48 mb-4 overflow-hidden relative">
      <div className="grid grid-cols-2 gap-2 h-full">
        <motion.div animate={{ opacity: step >= 1 ? 1 : 0.3 }} className="bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-lg p-2 flex flex-col items-center justify-center">
          <Palette className="w-6 h-6 text-primary-400 mb-1" />
          <span className="text-[10px] text-white">Design</span>
        </motion.div>
        <motion.div animate={{ opacity: step >= 2 ? 1 : 0.3 }} className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg p-2 flex flex-col items-center justify-center">
          <Settings className="w-6 h-6 text-blue-400 mb-1" />
          <span className="text-[10px] text-white">UX</span>
        </motion.div>
        <motion.div animate={{ opacity: step >= 3 ? 1 : 0.3 }} className="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-lg p-2 flex flex-col items-center justify-center">
          <Check className="w-6 h-6 text-green-400 mb-1" />
          <span className="text-[10px] text-white">Accessibilità</span>
        </motion.div>
        <motion.div animate={{ opacity: step >= 4 ? 1 : 0.3 }} className="bg-gradient-to-br from-amber-500/20 to-amber-600/20 rounded-lg p-2 flex flex-col items-center justify-center">
          <Zap className="w-6 h-6 text-amber-400 mb-1" />
          <span className="text-[10px] text-white">Performance</span>
        </motion.div>
      </div>
    </div>
  );
};

// Componente per l'animazione Responsive
const ResponsiveAnimation = () => {
  const [device, setDevice] = useState(0);
  const devices = [
    { icon: Smartphone, label: 'Mobile', width: 'w-16' },
    { icon: Laptop, label: 'Tablet', width: 'w-24' },
    { icon: Monitor, label: 'Desktop', width: 'w-32' },
  ];
  
  useEffect(() => {
    const timer = setTimeout(() => setDevice((prev) => (prev + 1) % 3), 1500);
    return () => clearTimeout(timer);
  }, [device]);
  
  return (
    <div className="bg-gray-900 rounded-lg p-4 h-48 mb-4 flex items-center justify-center">
      <div className="text-center">
        <motion.div
          key={device}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center"
        >
          {(() => { const DeviceIcon = devices[device].icon; return <DeviceIcon className="w-12 h-12 text-primary-400 mb-2" />; })()}
          <div className={`${devices[device].width} h-20 bg-gradient-to-br from-primary-500/30 to-primary-600/30 rounded-lg border-2 border-primary-400/50 flex items-center justify-center`}>
            <span className="text-xs text-white">{devices[device].label}</span>
          </div>
        </motion.div>
        <p className="text-xs text-gray-400 mt-3">Stesso sito, ogni dispositivo</p>
      </div>
    </div>
  );
};

// Componente per l'animazione Analytics
const AnalyticsAnimation = () => {
  const [values, setValues] = useState([40, 60, 45, 80, 65, 90]);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setValues(prev => prev.map(() => Math.floor(Math.random() * 60) + 30));
    }, 2000);
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="bg-gray-900 rounded-lg p-4 h-48 mb-4">
      <div className="flex items-end justify-between h-28 gap-2">
        {values.map((val, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: `${val}%` }}
            transition={{ duration: 0.8 }}
            className="flex-1 bg-gradient-to-t from-primary-600 to-primary-400 rounded-t"
          />
        ))}
      </div>
      <div className="flex justify-between mt-2">
        <div className="text-center">
          <div className="text-lg font-bold text-primary-400">+127%</div>
          <div className="text-[10px] text-gray-400">Visite</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-green-400">+85%</div>
          <div className="text-[10px] text-gray-400">Conversioni</div>
        </div>
      </div>
    </div>
  );
};

// Componente per l'animazione Database
const DatabaseAnimation = () => {
  const [step, setStep] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => setStep((prev) => (prev < 3 ? prev + 1 : 0)), 1200);
    return () => clearTimeout(timer);
  }, [step]);
  
  return (
    <div className="bg-gray-900 rounded-lg p-4 h-48 mb-4 flex items-center justify-center">
      <div className="relative">
        <motion.div animate={{ scale: step >= 1 ? 1 : 0.8, opacity: step >= 1 ? 1 : 0.5 }} className="w-20 h-24 bg-gradient-to-b from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
          <Database className="w-10 h-10 text-white" />
        </motion.div>
        
        {step >= 2 && (
          <>
            <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="absolute -left-16 top-2 w-12 h-8 bg-primary-500/30 rounded flex items-center justify-center">
              <span className="text-[8px] text-white">Input</span>
            </motion.div>
            <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="absolute -right-16 top-2 w-12 h-8 bg-green-500/30 rounded flex items-center justify-center">
              <span className="text-[8px] text-white">Output</span>
            </motion.div>
          </>
        )}
        
        {step >= 3 && (
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-green-400">
            ✓ Sincronizzato
          </motion.div>
        )}
      </div>
    </div>
  );
};

// Componente per l'animazione Automazioni
const AutomazioniAnimation = () => {
  const [step, setStep] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => setStep((prev) => (prev < 4 ? prev + 1 : 0)), 1000);
    return () => clearTimeout(timer);
  }, [step]);
  
  return (
    <div className="bg-gray-900 rounded-lg p-4 h-48 mb-4">
      <div className="flex items-center justify-center h-full">
        <div className="flex items-center gap-2">
          <motion.div animate={{ opacity: step >= 1 ? 1 : 0.3 }} className="w-12 h-12 bg-blue-500/30 rounded-lg flex items-center justify-center">
            <Globe className="w-6 h-6 text-blue-400" />
          </motion.div>
          <motion.div animate={{ scaleX: step >= 2 ? 1 : 0 }} className="w-8 h-1 bg-primary-500 origin-left" />
          <motion.div animate={{ opacity: step >= 2 ? 1 : 0.3 }} className="w-12 h-12 bg-primary-500/30 rounded-lg flex items-center justify-center">
            <Settings className="w-6 h-6 text-primary-400" />
          </motion.div>
          <motion.div animate={{ scaleX: step >= 3 ? 1 : 0 }} className="w-8 h-1 bg-primary-500 origin-left" />
          <motion.div animate={{ opacity: step >= 3 ? 1 : 0.3 }} className="w-12 h-12 bg-green-500/30 rounded-lg flex items-center justify-center">
            <Check className="w-6 h-6 text-green-400" />
          </motion.div>
        </div>
      </div>
      {step >= 4 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-xs text-green-400 mt-2">
          Processo automatizzato ✓
        </motion.div>
      )}
    </div>
  );
};

// Componente per l'animazione Integrazioni
const IntegrazioniAnimation = () => {
  return (
    <div className="bg-gray-900 rounded-lg p-4 h-48 mb-4 flex items-center justify-center">
      <div className="relative">
        <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center">
          <Globe className="w-8 h-8 text-white" />
        </div>
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.2 }}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-50px)`,
            }}
            className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center"
          >
            <Code className="w-4 h-4 text-primary-400" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Componente per l'animazione Supporto
const SupportoAnimation = () => {
  return (
    <div className="bg-gray-900 rounded-lg p-4 h-48 mb-4 flex items-center justify-center">
      <div className="text-center">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3"
        >
          <Check className="w-10 h-10 text-white" />
        </motion.div>
        <p className="text-sm text-white font-medium">Supporto Dedicato</p>
        <p className="text-xs text-gray-400">Sempre al tuo fianco</p>
      </div>
    </div>
  );
};

// Componente di selezione animazione
const FeatureAnimation = ({ type }: { type: string }) => {
  switch(type) {
    case 'sito': return <WebsiteAnimation />;
    case 'chatbot': return <ChatbotAnimation />;
    case 'seo': return <SEOAnimation />;
    case 'brand': return <BrandAnimation />;
    case 'design': return <DesignAnimation />;
    case 'responsive': return <ResponsiveAnimation />;
    case 'analytics': return <AnalyticsAnimation />;
    case 'database': return <DatabaseAnimation />;
    case 'automazioni': return <AutomazioniAnimation />;
    case 'integrazioni': return <IntegrazioniAnimation />;
    case 'supporto': return <SupportoAnimation />;
    default: return <WebsiteAnimation />;
  }
};

// Componente del popup
const FeaturePopup = ({ isOpen, onClose, title, description, icon: Icon, featureType }: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  icon: LucideIcon;
  featureType: string;
}) => {
  if (!isOpen) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <motion.div 
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-gray-800 rounded-2xl p-6 shadow-xl max-w-md w-full relative z-10 border border-white/10"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <X size={16} className="text-gray-300" />
        </button>
      
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-primary-500/20 p-3 rounded-full">
            <Icon className="w-6 h-6 text-primary-400" />
          </div>
          <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
        
        <p className="text-gray-300 mb-4">{description}</p>
        
        <FeatureAnimation type={featureType} />
        
        <button 
          onClick={onClose} 
          className="w-full bg-primary-600 text-white py-3 rounded-xl font-medium hover:bg-primary-700 transition-colors flex items-center justify-center"
        >
          <span>Ho capito</span>
          <ChevronRight size={18} className="ml-1" />
        </button>
      </motion.div>
    </motion.div>
  );
};

const WebbitzPackages = () => {
  const { t } = useTranslation()
  const [activeIndex, setActiveIndex] = useState(1)
  const [popup, setPopup] = useState<PopupState>({ open: false, title: '', description: '', icon: null, featureType: '' })

  const openPopup = (info: string) => {
    const feature = featuresWithInfo[info];
    if (feature) {
      setPopup({ open: true, title: feature.title, description: feature.description, icon: feature.icon, featureType: info });
    }
  };

  const closePopup = () => setPopup({ ...popup, open: false });

  const featuresWithInfo: Record<string, FeatureInfo> = {
    sito: {
      icon: Globe,
      title: 'Sito Web Personalizzato',
      description: 'Sviluppiamo siti web da zero, senza template. Design completamente personalizzato, ottimizzato per tutti i dispositivi, con un\'esperienza utente eccezionale.'
    },
    chatbot: {
      icon: Bot,
      title: 'Chatbot AI Avanzato',
      description: 'Assistente virtuale intelligente che interagisce con i visitatori 24/7, risponde a domande, raccoglie dati e qualifica lead automaticamente.'
    },
    seo: {
      icon: Search,
      title: 'SEO Ottimizzata',
      description: 'Ottimizziamo il tuo sito per i motori di ricerca con strategie tecniche avanzate per posizionarti ai primi posti su Google.'
    },
    brand: {
      icon: Palette,
      title: 'Brand Identity Completa',
      description: 'Sviluppiamo un\'identità visiva coerente e memorabile: logo, palette colori, tipografia e linee guida complete.'
    },
    design: {
      icon: Palette,
      title: 'Design Moderno & UX Ottimizzata',
      description: 'Interfacce moderne, intuitive e user-friendly. Ogni elemento è studiato per guidare l\'utente verso l\'azione desiderata.'
    },
    responsive: {
      icon: Smartphone,
      title: '100% Responsive',
      description: 'Il tuo sito si adatta perfettamente a ogni dispositivo: smartphone, tablet e desktop. Un\'esperienza ottimale ovunque.'
    },
    analytics: {
      icon: BarChart3,
      title: 'Dashboard Analytics & Monitoraggio',
      description: 'Monitora le performance del tuo sito in tempo reale: visite, conversioni, comportamento utenti e KPI personalizzati.'
    },
    database: {
      icon: Database,
      title: 'Database & Gestione Dati',
      description: 'Infrastruttura database sicura e scalabile per gestire tutti i dati della tua azienda con backup automatici.'
    },
    automazioni: {
      icon: Settings,
      title: 'Automazioni Personalizzate',
      description: 'Automatizza i processi ripetitivi: notifiche, report, sincronizzazioni e workflow personalizzati per la tua azienda.'
    },
    integrazioni: {
      icon: Globe,
      title: 'Integrazioni con Sistemi Esistenti',
      description: 'Colleghiamo il tuo gestionale con CRM, ERP, software di fatturazione e qualsiasi altro sistema già in uso.'
    },
    supporto: {
      icon: Check,
      title: 'Supporto Tecnico Dedicato',
      description: 'Team di supporto sempre disponibile per assisterti, risolvere problemi e implementare nuove funzionalità.'
    }
  };

  const packages = [
    {
      id: 'premium',
      name: t('packages.premium.name'),
      badge: t('packages.premium.badge'),
      badgeColor: 'bg-gradient-to-r from-amber-500 to-amber-600',
      icon: Crown,
      description: t('packages.premium.description'),
      features: [
        { text: t('packages.features.website'), info: 'sito', icon: Globe },
        { text: t('packages.features.design'), info: 'design', icon: Palette },
        { text: t('packages.features.responsive'), info: 'responsive', icon: Smartphone },
        { text: t('packages.features.seo'), info: 'seo', icon: Search },
        { text: t('packages.features.brand'), info: 'brand', icon: Palette },
        { text: t('packages.features.analytics'), info: 'analytics', icon: BarChart3 },
      ],
      cta: t('packages.premium.cta'),
      whatsappLink: 'https://wa.me/3391797616?text=Sono%20interessato%20al%20pacchetto%20Premium',
    },
    {
      id: 'essential',
      name: t('packages.essential.name'),
      badge: t('packages.essential.badge'),
      badgeColor: 'bg-primary-500',
      icon: Zap,
      description: t('packages.essential.description'),
      features: [
        { text: t('packages.features.website'), info: 'sito', icon: Globe },
        { text: t('packages.features.design'), info: 'design', icon: Palette },
        { text: t('packages.features.responsive'), info: 'responsive', icon: Smartphone },
        { text: t('packages.features.seo'), info: 'seo', icon: Search },
      ],
      cta: t('packages.essential.cta'),
      whatsappLink: 'https://wa.me/3391797616?text=Sono%20interessato%20al%20pacchetto%20Essential',
    },
    {
      id: 'gestionali',
      name: t('packages.gestionali.name'),
      badge: t('packages.gestionali.badge'),
      badgeColor: 'bg-gradient-to-r from-blue-500 to-blue-600',
      icon: Briefcase,
      description: t('packages.gestionali.description'),
      features: [
        { text: t('packages.features.database'), info: 'database', icon: Database },
        { text: t('packages.features.automazioni'), info: 'automazioni', icon: Settings },
        { text: t('packages.features.integrazioni'), info: 'integrazioni', icon: Globe },
        { text: t('packages.features.design'), info: 'design', icon: Palette },
        { text: t('packages.features.supporto'), info: 'supporto', icon: Check },
      ],
      cta: t('packages.gestionali.cta'),
      whatsappLink: 'https://wa.me/3391797616?text=Sono%20interessato%20al%20pacchetto%20Gestionale',
    }
  ];

  return (
    <section className="py-12 pb-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(232,80,2,0.04),transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(232,80,2,0.04),transparent_50%)]"></div>
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

        {/* Cards Grid */}
        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-4 lg:gap-6 max-w-6xl mx-auto mb-16 px-4">
          {packages.map((pkg, index) => {
            const isActive = index === activeIndex
            
            return (
              <motion.div
                key={pkg.id}
                onClick={() => setActiveIndex(index)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className={`relative cursor-pointer transition-all duration-500 w-full lg:w-auto ${
                  isActive ? 'lg:flex-[1.3] z-20' : 'lg:flex-1 z-10'
                }`}
              >
                <div 
                  className={`relative rounded-3xl border p-6 h-full transition-all duration-500 ${
                    isActive 
                      ? 'bg-white/10 backdrop-blur-xl border-primary-400/50 shadow-[0_0_60px_rgba(232,80,2,0.25)] scale-100 lg:scale-105' 
                      : 'bg-white/5 backdrop-blur-xl border-white/10 opacity-60 hover:opacity-80 scale-95 lg:scale-90'
                  }`}
                >
                  {/* Badge */}
                  <div className={`absolute -top-3 left-1/2 transform -translate-x-1/2 transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-50'}`}>
                    <div className={`${pkg.badgeColor} text-white px-5 py-1.5 rounded-full text-xs font-semibold shadow-lg`}>
                      {pkg.badge}
                    </div>
                  </div>

                  {/* Header */}
                  <div className="text-center mb-5 mt-3">
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3 transition-all duration-500 ${
                      isActive ? 'bg-gradient-to-br from-primary-500 to-primary-600 shadow-lg' : 'bg-white/10'
                    }`}>
                      <pkg.icon className={`w-7 h-7 ${isActive ? 'text-white' : 'text-primary-400'}`} />
                    </div>
                    
                    <h3 className={`text-xl font-bold mb-2 transition-all duration-500 ${isActive ? 'text-white' : 'text-gray-400'}`}>
                      {pkg.name}
                    </h3>
                    <p className={`text-sm mb-3 transition-all duration-500 ${isActive ? 'text-gray-300' : 'text-gray-500'}`}>
                      {pkg.description}
                    </p>
                    
                    <span className={`text-base font-semibold transition-all duration-500 ${isActive ? 'text-primary-400' : 'text-gray-500'}`}>
                      {t('packages.contactQuote')}
                    </span>
                  </div>

                  {/* Features */}
                  <div className="mb-5">
                    <h4 className={`font-semibold mb-3 text-center text-sm transition-all duration-500 ${isActive ? 'text-white' : 'text-gray-500'}`}>
                      {t('packages.includes')}
                    </h4>
                    <ul className="space-y-2">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <div className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-500 ${isActive ? 'bg-white/10' : 'bg-white/5'}`}>
                            <feature.icon className={`w-3.5 h-3.5 transition-all duration-500 ${isActive ? 'text-primary-400' : 'text-gray-600'}`} />
                          </div>
                          <span className={`text-sm flex-1 transition-all duration-500 ${isActive ? 'text-gray-300' : 'text-gray-600'}`}>
                            {feature.text}
                          </span>
                          <button
                            onClick={(e) => { e.stopPropagation(); openPopup(feature.info); }}
                            className={`p-1 rounded-full transition-all duration-300 ${isActive ? 'bg-white/10 hover:bg-white/20' : 'bg-white/5 hover:bg-white/10'}`}
                          >
                            <Info className={`w-3.5 h-3.5 ${isActive ? 'text-primary-400' : 'text-gray-600'}`} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <a
                    href={pkg.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className={`group w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all duration-500 ${
                      isActive
                        ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg hover:shadow-xl hover:-translate-y-1'
                        : 'bg-white/5 text-gray-500 border border-white/10'
                    }`}
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span className="font-bold text-sm">{pkg.cta}</span>
                    <ArrowRight className={`w-4 h-4 transition-transform ${isActive ? 'group-hover:translate-x-1' : ''}`} />
                  </a>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Addon Section - Chatbot */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="max-w-3xl mx-auto mb-16"
        >
          <div className="text-center mb-6">
            <span className="text-primary-400 font-medium text-sm uppercase tracking-wider">
              {t('packages.addon.title')}
            </span>
          </div>
          
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 p-6 md:p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl"></div>
            
            <div className="relative flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg">
                  <Bot className="w-10 h-10 text-white" />
                </div>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {t('packages.addon.chatbot.name')}
                </h3>
                <p className="text-gray-400 mb-4">
                  {t('packages.addon.chatbot.description')}
                </p>
              </div>
              
              <div className="flex-shrink-0 flex items-center gap-2">
                <button
                  onClick={() => openPopup('chatbot')}
                  className="p-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all duration-300"
                >
                  <Info className="w-5 h-5 text-primary-400" />
                </button>
                <a
                  href="https://wa.me/3391797616?text=Sono%20interessato%20ad%20aggiungere%20il%20Chatbot%20AI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-primary-400/50 text-white rounded-xl font-semibold transition-all duration-300 hover:-translate-y-1"
                >
                  <span>{t('packages.addon.chatbot.cta')}</span>
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center"
        >
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              {t('packages.bottomCTA.title')}
            </h3>
            <p className="text-gray-300 mb-6">
              {t('packages.bottomCTA.description')}
            </p>
            <a
              href="https://wa.me/3391797616?text=Sono%20interessato%20ad%20una%20consulenza%20gratuita"
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <MessageSquare className="w-5 h-5" />
              <span>{t('packages.bottomCTA.button')}</span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Popup */}
      {popup.icon && (
        <FeaturePopup 
          isOpen={popup.open} 
          onClose={closePopup} 
          title={popup.title} 
          description={popup.description} 
          icon={popup.icon}
          featureType={popup.featureType}
        />
      )}
    </section>
  )
}

export default WebbitzPackages
