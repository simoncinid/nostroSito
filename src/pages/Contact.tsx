import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, CheckCircle, Loader, Globe, ArrowRight, Zap, Target, Code, Bot, X } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  otherService: string;
  budget: string;
  message: string;
  timeline: string;
}

interface ChatMessage {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const Contact = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    otherService: '',
    budget: '',
    message: '',
    timeline: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [currentStep, setCurrentStep] = useState(1);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      text: "Ciao! 👋 Sono l'assistente virtuale di Webbitz. Come posso aiutarti oggi?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [chatInput, setChatInput] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});

  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const formInView = useInView(formRef, { once: true, amount: 0.2 });

  const services = [
    { id: 'web', name: 'Sviluppo Web React', icon: Code },
    { id: 'ai', name: 'Soluzioni AI', icon: Bot },
    { id: 'automation', name: 'Automazione Processi', icon: Zap },
    { id: 'mobile', name: 'App Mobile', icon: Phone },
    { id: 'ecommerce', name: 'E-commerce', icon: Globe },
    { id: 'consulting', name: 'Consulenza Digitale', icon: Target }
  ];

  const budgetRanges = [
    { id: '1k-5k', name: '€1.000 - €5.000' },
    { id: '5k+', name: '€5.000+' },
    { id: 'discuss', name: 'Da discutere' }
  ];

  const timelines = [
    { id: 'urgent', name: 'Urgente (1-2 settimane)' },
    { id: 'normal', name: 'Normale (1-2 mesi)' },
    { id: 'flexible', name: 'Flessibile (3+ mesi)' },
    { id: 'planning', name: 'Fase di pianificazione' }
  ];

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'hello@webbitz.it',
      description: 'Rispondiamo entro 2 ore',
      gradient: 'from-blue-500 to-blue-700'
    },
    {
      icon: Phone,
      title: 'Telefono',
      value: '+39 339 179 7616',
      description: 'Lun-Ven 9:00-18:00',
      gradient: 'from-green-500 to-green-700'
    },
    {
      icon: MapPin,
      title: 'Sede',
      value: 'Pontedera (PI), Italia',
      description: 'Lavoriamo in tutta Italia',
      gradient: 'from-purple-500 to-purple-700'
    },
    {
      icon: Clock,
      title: 'Orari',
      value: '24/7 Support',
      description: 'Assistenza sempre disponibile',
      gradient: 'from-orange-500 to-orange-700'
    }
  ];

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.name.trim()) {
          newErrors.name = 'Il nome è obbligatorio';
        }
        if (!formData.email.trim()) {
          newErrors.email = 'L\'email è obbligatoria';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = 'Inserisci un\'email valida';
        }
        break;
      case 2:
        if (!formData.service) {
          newErrors.service = 'Seleziona un servizio';
        } else if (formData.service === 'other' && !formData.otherService.trim()) {
          newErrors.otherService = 'Specifica il servizio richiesto';
        }
        if (!formData.budget) {
          newErrors.budget = 'Seleziona un budget';
        }
        break;
      case 3:
        if (!formData.message.trim()) {
          newErrors.message = 'La descrizione del progetto è obbligatoria';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Rimuovi l'errore quando l'utente inizia a digitare
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitStatus('success');
    
    // Reset form after success
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        otherService: '',
        budget: '',
        message: '',
        timeline: ''
      });
      setCurrentStep(1);
      setSubmitStatus('idle');
      setErrors({});
    }, 3000);
  };

  const handleChatSend = () => {
    if (!chatInput.trim()) return;

    const userMessage: ChatMessage = {
      id: chatMessages.length + 1,
      text: chatInput,
      isBot: false,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: chatMessages.length + 2,
        text: "Grazie per il tuo messaggio! Un nostro esperto ti contatterà presto. Nel frattempo, puoi compilare il form per darci più dettagli sul tuo progetto. 🚀",
        isBot: true,
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 3) setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-white overflow-hidden">
      {/* Animated Background rimosso per pulizia warning */}

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
              transition={{ delay: 0.4, duration: 1 }}
              className="text-4xl md:text-8xl font-bold mb-8 leading-tight"
            >
              <span className="bg-gradient-to-r from-gray-900 via-purple-800 to-purple-600 bg-clip-text text-transparent">
                Parliamo del tuo
              </span>
              <br />
              <motion.span
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 bg-clip-text text-transparent bg-[length:200%_100%]"
              >
                Progetto
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 1 }}
              className="text-xl md:text-2xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed"
            >
              Hai un'idea in mente? <span className="text-purple-700 font-semibold">Contattaci</span> per trasformarla in realtà. 
              <span className="hidden md:inline"> Siamo qui per ascoltare le tue esigenze e creare <span className="text-purple-700 font-semibold">soluzioni su misura</span> per il tuo business.</span>
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <motion.section className="relative py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-8 md:mb-12">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white/80 backdrop-blur-xl border border-purple-200 rounded-2xl p-3 md:p-6 hover:border-purple-300 hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center md:text-left md:items-start"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`w-8 h-8 md:w-12 md:h-12 bg-gradient-to-r ${info.gradient} rounded-xl flex items-center justify-center mb-2 md:mb-4`}
                >
                  <info.icon size={18} className="text-white md:w-6 md:h-6" />
                </motion.div>
                <h3 className="text-xs md:text-lg font-bold text-gray-900 mb-1 md:mb-2">{info.title}</h3>
                <p className="text-gray-900 font-semibold text-xs md:text-base mb-0.5 md:mb-1">{info.value}</p>
                <p className="text-gray-600 text-[10px] md:text-sm">{info.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Contact Form */}
      <motion.section
        ref={formRef}
        className="relative py-4 md:py-8 px-2 md:px-4"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={formInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="text-center mb-6 md:mb-8"
          >
            <h2 className="text-2xl md:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-gray-900 via-purple-800 to-purple-600 bg-clip-text text-transparent">
              Raccontaci il Tuo Progetto
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={formInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 1 }}
            className="bg-white/80 backdrop-blur-xl border border-purple-200 rounded-2xl md:rounded-3xl p-3 md:p-8 shadow-lg"
          >
            {submitStatus === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle size={40} className="text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Messaggio Inviato!</h3>
                <p className="text-gray-600 mb-6">
                  Grazie per averci contattato. Ti risponderemo entro 2 ore lavorative.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSubmitStatus('idle');
                    setCurrentStep(1);
                  }}
                  className="bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold py-3 px-8 rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  Invia un Altro Messaggio
                </motion.button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                {/* Step 1: Basic Info */}
                {currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-4 md:space-y-6"
                  >
                    <div className="text-center mb-4 md:mb-8">
                      <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-1 md:mb-2">Informazioni di Base</h3>
                      <p className="text-gray-600 text-xs md:text-base">Iniziamo con le informazioni essenziali</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
                      <div>
                        <label className="block text-gray-700 font-semibold mb-1 md:mb-2 text-xs md:text-base">
                          Nome *
                          {errors.name && <span className="text-red-500 text-xs ml-2">{errors.name}</span>}
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className={`w-full px-3 py-2 md:px-4 md:py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-200 text-xs md:text-base ${
                            errors.name ? 'border-red-500' : 'border-purple-200 focus:border-purple-500'
                          }`}
                          placeholder="Il tuo nome"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-1 md:mb-2 text-xs md:text-base">
                          Email *
                          {errors.email && <span className="text-red-500 text-xs ml-2">{errors.email}</span>}
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className={`w-full px-3 py-2 md:px-4 md:py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-200 text-xs md:text-base ${
                            errors.email ? 'border-red-500' : 'border-purple-200 focus:border-purple-500'
                          }`}
                          placeholder="la-tua-email@esempio.com"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-1 md:mb-2 text-xs md:text-base">Telefono</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="w-full px-3 py-2 md:px-4 md:py-3 border border-purple-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-xs md:text-base"
                          placeholder="+39 123 456 7890"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-1 md:mb-2 text-xs md:text-base">Azienda</label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => handleInputChange('company', e.target.value)}
                          className="w-full px-3 py-2 md:px-4 md:py-3 border border-purple-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-xs md:text-base"
                          placeholder="Nome della tua azienda"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Project Details */}
                {currentStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-4 md:space-y-6"
                  >
                    <div className="text-center mb-4 md:mb-8">
                      <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-1 md:mb-2">Dettagli del Progetto</h3>
                      <p className="text-gray-600 text-xs md:text-base">Parlaci del tuo progetto</p>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2 md:mb-4 text-xs md:text-base">
                        Servizio Richiesto *
                        {errors.service && <span className="text-red-500 text-xs ml-2">{errors.service}</span>}
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
                        {services.map((service) => (
                          <motion.button
                            key={service.id}
                            type="button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleInputChange('service', service.id)}
                            className={`p-2 md:p-4 border rounded-xl text-left transition-all duration-300 text-xs md:text-base ${
                              formData.service === service.id
                                ? 'border-purple-500 bg-purple-50 text-purple-700'
                                : 'border-purple-200 hover:border-purple-300'
                            } ${errors.service ? 'border-red-500' : ''}`}
                          >
                            <service.icon size={16} className="mb-1 md:mb-2" />
                            <div className="font-semibold text-xs md:text-sm">{service.name}</div>
                          </motion.button>
                        ))}
                      </div>
                      <div className="mt-4 flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="otherService"
                          checked={formData.service === 'other'}
                          onChange={(e) => handleInputChange('service', e.target.checked ? 'other' : '')}
                          className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                        />
                        <label htmlFor="otherService" className="text-sm font-medium text-gray-700">
                          Altro servizio
                        </label>
                      </div>
                      {formData.service === 'other' && (
                        <div className="mt-4">
                          <label className="block text-gray-700 font-semibold mb-1 md:mb-2 text-xs md:text-base">
                            Specifica il servizio richiesto *
                            {errors.otherService && <span className="text-red-500 text-xs ml-2">{errors.otherService}</span>}
                          </label>
                          <input
                            type="text"
                            value={formData.otherService}
                            onChange={(e) => handleInputChange('otherService', e.target.value)}
                            className={`w-full px-3 py-2 md:px-4 md:py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-200 text-xs md:text-base ${
                              errors.otherService ? 'border-red-500' : 'border-purple-200 focus:border-purple-500'
                            }`}
                            placeholder="Descrivi il servizio che stai cercando"
                          />
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2 md:mb-4 text-xs md:text-base">
                          Budget *
                          {errors.budget && <span className="text-red-500 text-xs ml-2">{errors.budget}</span>}
                        </label>
                        <div className="space-y-1 md:space-y-2">
                          {budgetRanges.map((budget) => (
                            <motion.button
                              key={budget.id}
                              type="button"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleInputChange('budget', budget.id)}
                              className={`w-full p-2 md:p-3 border rounded-xl text-left transition-all duration-300 text-xs md:text-base ${
                                formData.budget === budget.id
                                  ? 'border-purple-500 bg-purple-50 text-purple-700'
                                  : 'border-purple-200 hover:border-purple-300'
                              } ${errors.budget ? 'border-red-500' : ''}`}
                            >
                              {budget.name}
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold mb-2 md:mb-4 text-xs md:text-base">Timeline</label>
                        <div className="space-y-1 md:space-y-2">
                          {timelines.map((timeline) => (
                            <motion.button
                              key={timeline.id}
                              type="button"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleInputChange('timeline', timeline.id)}
                              className={`w-full p-2 md:p-3 border rounded-xl text-left transition-all duration-300 text-xs md:text-base ${
                                formData.timeline === timeline.id
                                  ? 'border-purple-500 bg-purple-50 text-purple-700'
                                  : 'border-purple-200 hover:border-purple-300'
                              }`}
                            >
                              {timeline.name}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Message */}
                {currentStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-4 md:space-y-6"
                  >
                    <div className="text-center mb-4 md:mb-8">
                      <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-1 md:mb-2">Il Tuo Messaggio</h3>
                      <p className="text-gray-600 text-xs md:text-base">Raccontaci di più sul tuo progetto</p>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-1 md:mb-2 text-xs md:text-base">
                        Descrizione del Progetto *
                        {errors.message && <span className="text-red-500 text-xs ml-2">{errors.message}</span>}
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        className={`w-full px-3 py-2 md:px-4 md:py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-200 resize-none text-xs md:text-base ${
                          errors.message ? 'border-red-500' : 'border-purple-200 focus:border-purple-500'
                        }`}
                        placeholder="Descrivi il tuo progetto, i tuoi obiettivi e qualsiasi dettaglio che ritieni importante..."
                      />
                    </div>
                  </motion.div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center pt-4 md:pt-6">
                  <div className="flex space-x-1 md:space-x-2">
                    {[1, 2, 3].map((step) => (
                      <div
                        key={step}
                        className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                          step <= currentStep ? 'bg-purple-600' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>

                  <div className="flex gap-2 md:gap-4">
                    {currentStep > 1 && (
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={prevStep}
                        className="px-4 py-2 md:px-6 md:py-3 border border-purple-200 text-purple-700 font-semibold rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-all duration-300 text-xs md:text-base"
                      >
                        Indietro
                      </motion.button>
                    )}

                    {currentStep < 3 ? (
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={nextStep}
                        className="px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center gap-1 md:gap-2 text-xs md:text-base"
                      >
                        Avanti
                        <ArrowRight size={16} className="md:w-5 md:h-5" />
                      </motion.button>
                    ) : (
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                        whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                        className="px-6 py-2 md:px-8 md:py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center gap-1 md:gap-2 disabled:opacity-50 text-xs md:text-base"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader className="animate-spin" size={16} />
                            Invio in corso...
                          </>
                        ) : (
                          <>
                            <Send size={16} />
                            Invia Messaggio
                          </>
                        )}
                      </motion.button>
                    )}
                  </div>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials */}
      {/* Testimonials 
      <motion.section className="relative py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-purple-800 to-purple-600 bg-clip-text text-transparent">
              Cosa Dicono i Clienti
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white/80 backdrop-blur-xl border border-purple-200 rounded-2xl p-6 hover:border-purple-300 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-purple-600 text-sm">{testimonial.company}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 italic">"{testimonial.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      */}

      {/* Chat Widget */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-2xl shadow-premium-lg border border-purple-200 z-50 flex flex-col"
          >
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-4 rounded-t-2xl flex justify-between items-center">
              <div>
                <h3 className="font-bold">Assistente Webbitz</h3>
                <p className="text-sm opacity-90">Online ora</p>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-white hover:bg-white/20 rounded-lg p-1 transition-colors duration-300"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.isBot
                        ? 'bg-gray-100 text-gray-800'
                        : 'bg-gradient-to-r from-purple-600 to-purple-700 text-white'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleChatSend()}
                  placeholder="Scrivi un messaggio..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 text-sm"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleChatSend}
                  className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-2 rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  <Send size={16} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full shadow-premium-lg hover:shadow-premium-xl transition-all duration-300 flex items-center justify-center z-40"
      >
        <MessageSquare size={24} />
      </motion.button>
    </div>
  );
};

export default Contact; 