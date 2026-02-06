import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, Loader, ArrowRight, X } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import logo from '../assets/logos/favicon.png';

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
  const { t } = useTranslation();
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
  const [submitError, setSubmitError] = useState<string>('');
  const [currentStep, setCurrentStep] = useState(1);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      text: t('contact.chat.initialMessage'),
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [chatInput, setChatInput] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});

  const formInView = useInView(formRef, { once: true, amount: 0.2 });

  // Get services, budgets, and timelines from translations
  const services = t('contact.form.services', { returnObjects: true }) as Array<{id: string, name: string}>;
  const budgetRanges = t('contact.form.budgets', { returnObjects: true }) as Array<{id: string, name: string}>;
  const timelines = t('contact.form.timelines', { returnObjects: true }) as Array<{id: string, name: string}>;

  const contactInfo = [
    {
      icon: Mail,
      title: t('contact.info.email.title'),
      value: t('contact.info.email.value'),
      description: t('contact.info.email.description'),
      gradient: 'from-primary-500 to-primary-600'
    },
    {
      icon: MapPin,
      title: t('contact.info.location.title'),
      value: t('contact.info.location.value'),
      description: t('contact.info.location.description'),
      gradient: 'from-primary-500 to-primary-600'
    },
    {
      icon: Clock,
      title: t('contact.info.hours.title'),
      value: t('contact.info.hours.value'),
      description: t('contact.info.hours.description'),
      gradient: 'from-primary-500 to-primary-600'
    }
  ];

  const teamContacts = [
    { name: 'Francesco', phone: '370 337 4703', gradient: 'from-primary-400 to-primary-500' },
    { name: 'Andrea', phone: '389 998 5029', gradient: 'from-primary-400 to-primary-500' },
    { name: 'Diego', phone: '339 179 7616', gradient: 'from-primary-400 to-primary-500' },
    { name: 'Tommaso', phone: '370 317 3289', gradient: 'from-primary-400 to-primary-500' }
  ];

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.name.trim()) {
          newErrors.name = t('contact.form.fields.name.required');
        }
        if (!formData.email.trim()) {
          newErrors.email = t('contact.form.fields.email.required');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = t('contact.form.fields.email.invalid');
        }
        break;
      case 2:
        if (!formData.service) {
          newErrors.service = t('contact.form.fields.service.required');
        } else if (formData.service === 'other' && !formData.otherService.trim()) {
          newErrors.otherService = t('contact.form.fields.service.otherDescription.required');
        }
        if (!formData.budget) {
          newErrors.budget = t('contact.form.fields.budget.required');
        }
        break;
      case 3:
        if (!formData.message.trim()) {
          newErrors.message = t('contact.form.fields.message.required');
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Remove error when user starts typing
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
    setSubmitStatus('idle');
    setSubmitError('');

    try {
      const res = await fetch('/api/send-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const contentType = res.headers.get('content-type') || '';
      const isJson = contentType.includes('application/json');
      const data = isJson ? await res.json().catch(() => ({})) : null;

      if (!res.ok || !data?.success) {
        const msg = data?.error || data?.detail ||
          (res.status === 404 ? 'Servizio temporaneamente non disponibile. Riprova più tardi.' :
            !isJson ? 'Il server non ha risposto correttamente. Controlla che l\'API sia configurata su Vercel.' :
              `Errore ${res.status}. Riprova più tardi.`);
        setSubmitError(msg);
        setSubmitStatus('error');
        setIsSubmitting(false);
        return;
      }
      setSubmitStatus('success');
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
      setTimeout(() => {
        setSubmitStatus('idle');
        setErrors({});
      }, 3000);
    } catch (err) {
      setSubmitError('Connessione fallita. Controlla la rete e riprova.');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
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
        text: t('contact.chat.response'),
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
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      <Helmet>
        <title>{t('contact.meta.title')}</title>
        <meta name="description" content={t('contact.meta.description')} />
      </Helmet>

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
                {t('contact.hero.title1')}
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary-400 via-primary-500 to-primary-400 bg-clip-text text-transparent">
                {t('contact.hero.title2')}
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              {t('contact.hero.subtitle.part1')}
              <span className="text-primary-700 font-semibold">{t('contact.hero.subtitle.part2')}</span>
              {t('contact.hero.subtitle.part3')}
              <span className="hidden md:inline">
                {t('contact.hero.subtitle.part4')}
                <span className="text-primary-700 font-semibold">{t('contact.hero.subtitle.part5')}</span>
                {t('contact.hero.subtitle.part6')}
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <motion.section className="relative py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 mb-8 md:mb-12">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-3 md:p-6 hover:border-primary-400/30 hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`w-8 h-8 md:w-12 md:h-12 bg-gradient-to-r ${info.gradient} rounded-xl flex items-center justify-center mb-2 md:mb-4`}
                >
                  <info.icon size={18} className="text-white md:w-6 md:h-6" />
                </motion.div>
                <h3 className="text-xs md:text-lg font-bold text-white mb-1 md:mb-2">{info.title}</h3>
                <p className="text-white font-semibold text-xs md:text-base mb-0.5 md:mb-1">{info.value}</p>
                <p className="text-gray-400 text-[10px] md:text-sm">{info.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Team Contacts */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h3 className="text-xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-white via-primary-200 to-primary-400 bg-clip-text text-transparent">
              Il Nostro Team
            </h3>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {teamContacts.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-3 md:p-6 hover:border-primary-400/30 hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`w-8 h-8 md:w-12 md:h-12 bg-gradient-to-r ${member.gradient} rounded-xl flex items-center justify-center mb-2 md:mb-4`}
                >
                  <Phone size={18} className="text-white md:w-6 md:h-6" />
                </motion.div>
                <h3 className="text-xs md:text-lg font-bold text-white mb-1 md:mb-2">{member.name}</h3>
                <p className="text-white font-semibold text-xs md:text-base mb-0.5 md:mb-1">{member.phone}</p>
                <p className="text-gray-400 text-[10px] md:text-sm">Disponibile per chiamate</p>
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
        <div className="max-w-sm md:max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={formInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="text-center mb-6 md:mb-8"
          >
            <h2 className="text-2xl md:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-white via-primary-200 to-primary-400 bg-clip-text text-transparent">
              {t('contact.form.title')}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={formInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 1 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl px-6 py-3 md:p-8 shadow-lg"
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
                <h3 className="text-2xl font-bold text-white mb-4">{t('contact.form.success.title')}</h3>
                <p className="text-gray-300 mb-6">
                  {t('contact.form.success.description')}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSubmitStatus('idle');
                    setCurrentStep(1);
                  }}
                  className="bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold py-3 px-8 rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  {t('contact.form.success.button')}
                </motion.button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                {submitStatus === 'error' && submitError && (
                  <div className="rounded-xl bg-red-500/20 border border-red-400/50 px-4 py-3 text-red-200 text-sm">
                    <strong>Invio fallito.</strong> {submitError}
                  </div>
                )}
                {/* Step 1: Basic Info */}
                {currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-4 md:space-y-6"
                  >
                    <div className="text-center mb-4 md:mb-8">
                      <h3 className="text-lg md:text-2xl font-bold text-white mb-1 md:mb-2">{t('contact.form.steps.basic.title')}</h3>
                      <p className="text-gray-400 text-xs md:text-base">{t('contact.form.steps.basic.subtitle')}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
                      <div>
                        <label className="block text-gray-300 font-semibold mb-1 md:mb-2 text-xs md:text-base">
                          {t('contact.form.fields.name.label')} *
                          {errors.name && <span className="text-red-500 text-xs ml-2">{errors.name}</span>}
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className={`w-full px-3 py-2 md:px-4 md:py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white/5 text-white placeholder-gray-500 text-xs md:text-base ${
                            errors.name ? 'border-red-500' : 'border-white/20 focus:border-primary-500'
                          }`}
                          placeholder={t('contact.form.fields.name.placeholder')}
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 font-semibold mb-1 md:mb-2 text-xs md:text-base">
                          {t('contact.form.fields.email.label')} *
                          {errors.email && <span className="text-red-500 text-xs ml-2">{errors.email}</span>}
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className={`w-full px-3 py-2 md:px-4 md:py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white/5 text-white placeholder-gray-500 text-xs md:text-base ${
                            errors.email ? 'border-red-500' : 'border-white/20 focus:border-primary-500'
                          }`}
                          placeholder={t('contact.form.fields.email.placeholder')}
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 font-semibold mb-1 md:mb-2 text-xs md:text-base">{t('contact.form.fields.phone.label')}</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="w-full px-3 py-2 md:px-4 md:py-3 border border-white/20 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500 bg-white/5 text-white placeholder-gray-500 text-xs md:text-base"
                          placeholder={t('contact.form.fields.phone.placeholder')}
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 font-semibold mb-1 md:mb-2 text-xs md:text-base">{t('contact.form.fields.company.label')}</label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => handleInputChange('company', e.target.value)}
                          className="w-full px-3 py-2 md:px-4 md:py-3 border border-white/20 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500 bg-white/5 text-white placeholder-gray-500 text-xs md:text-base"
                          placeholder={t('contact.form.fields.company.placeholder')}
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
                      <h3 className="text-lg md:text-2xl font-bold text-white mb-1 md:mb-2">{t('contact.form.steps.project.title')}</h3>
                      <p className="text-gray-400 text-xs md:text-base">{t('contact.form.steps.project.subtitle')}</p>
                    </div>

                    <div>
                      <label className="block text-gray-300 font-semibold mb-2 md:mb-4 text-xs md:text-base">
                        {t('contact.form.fields.service.label')} *
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
                                ? 'border-primary-500 bg-primary-500/20 text-primary-300'
                                : 'border-white/20 hover:border-primary-400/50 bg-white/5 text-gray-200'
                            } ${errors.service ? 'border-red-500' : ''}`}
                          >
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
                          className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                        />
                        <label htmlFor="otherService" className="text-sm font-medium text-gray-300">
                          {t('contact.form.fields.service.other')}
                        </label>
                      </div>
                      {formData.service === 'other' && (
                        <div className="mt-4">
                          <label className="block text-gray-300 font-semibold mb-1 md:mb-2 text-xs md:text-base">
                            {t('contact.form.fields.service.otherDescription.label')} *
                            {errors.otherService && <span className="text-red-500 text-xs ml-2">{errors.otherService}</span>}
                          </label>
                          <input
                            type="text"
                            value={formData.otherService}
                            onChange={(e) => handleInputChange('otherService', e.target.value)}
                            className={`w-full px-3 py-2 md:px-4 md:py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white/5 text-white placeholder-gray-500 text-xs md:text-base ${
                              errors.otherService ? 'border-red-500' : 'border-white/20 focus:border-primary-500'
                            }`}
                            placeholder={t('contact.form.fields.service.otherDescription.placeholder')}
                          />
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
                      <div>
                        <label className="block text-gray-300 font-semibold mb-2 md:mb-4 text-xs md:text-base">
                          {t('contact.form.fields.budget.label')} *
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
                                  ? 'border-primary-500 bg-primary-500/20 text-primary-300'
                                  : 'border-white/20 hover:border-primary-400/50 bg-white/5 text-gray-200'
                              } ${errors.budget ? 'border-red-500' : ''}`}
                            >
                              {budget.name}
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-300 font-semibold mb-2 md:mb-4 text-xs md:text-base">{t('contact.form.fields.timeline.label')}</label>
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
                                  ? 'border-primary-500 bg-primary-500/20 text-primary-300'
                                  : 'border-white/20 hover:border-primary-400/50 bg-white/5 text-gray-200'
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
                      <h3 className="text-lg md:text-2xl font-bold text-white mb-1 md:mb-2">{t('contact.form.steps.message.title')}</h3>
                      <p className="text-gray-400 text-xs md:text-base">{t('contact.form.steps.message.subtitle')}</p>
                    </div>

                    <div>
                      <label className="block text-gray-300 font-semibold mb-1 md:mb-2 text-xs md:text-base">
                        {t('contact.form.fields.message.label')} *
                        {errors.message && <span className="text-red-500 text-xs ml-2">{errors.message}</span>}
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        className={`w-full px-3 py-2 md:px-4 md:py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none bg-white/5 text-white placeholder-gray-500 text-xs md:text-base ${
                          errors.message ? 'border-red-500' : 'border-white/20 focus:border-primary-500'
                        }`}
                        placeholder={t('contact.form.fields.message.placeholder')}
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
                          step <= currentStep ? 'bg-primary-500' : 'bg-white/20'
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
                        className="px-4 py-2 md:px-6 md:py-3 border border-white/20 text-gray-200 font-semibold rounded-xl hover:border-primary-400/50 hover:bg-white/10 transition-all duration-300 text-xs md:text-base"
                      >
                        {t('contact.form.buttons.back')}
                      </motion.button>
                    )}

                    {currentStep < 3 ? (
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={nextStep}
                        className="px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center gap-1 md:gap-2 text-xs md:text-base"
                      >
                        {t('contact.form.buttons.next')}
                        <ArrowRight size={16} className="md:w-5 md:h-5" />
                      </motion.button>
                    ) : (
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                        whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                        className="px-6 py-2 md:px-8 md:py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center gap-1 md:gap-2 disabled:opacity-50 text-xs md:text-base"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader className="animate-spin" size={16} />
                            {t('contact.form.buttons.submitting')}
                          </>
                        ) : (
                          <>
                            <Send size={16} />
                            {t('contact.form.buttons.submit')}
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

      {/* Chat Widget */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-80 h-96 bg-gray-800 rounded-2xl shadow-premium-lg border border-white/10 z-50 flex flex-col"
          >
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-4 rounded-t-2xl flex justify-between items-center">
              <div>
                <h3 className="font-bold">{t('contact.chat.title')}</h3>
                <p className="text-sm opacity-90">{t('contact.chat.status')}</p>
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
                        ? 'bg-white/10 text-gray-200'
                        : 'bg-gradient-to-r from-primary-600 to-primary-700 text-white'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleChatSend()}
                  placeholder={t('contact.chat.placeholder')}
                  className="flex-1 px-3 py-2 border border-white/20 rounded-lg focus:outline-none focus:border-primary-500 bg-white/5 text-white placeholder-gray-500 text-sm"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleChatSend}
                  className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-2 rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  <Send size={16} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Contact; 