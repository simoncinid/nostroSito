import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, CheckCircle, Loader, ArrowRight, X } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

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

  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
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
      gradient: 'from-blue-500 to-blue-700'
    },
    {
      icon: Phone,
      title: t('contact.info.phone.title'),
      value: t('contact.info.phone.value'),
      description: t('contact.info.phone.description'),
      gradient: 'from-green-500 to-green-700'
    },
    {
      icon: MapPin,
      title: t('contact.info.location.title'),
      value: t('contact.info.location.value'),
      description: t('contact.info.location.description'),
      gradient: 'from-purple-500 to-purple-700'
    },
    {
      icon: Clock,
      title: t('contact.info.hours.title'),
      value: t('contact.info.hours.value'),
      description: t('contact.info.hours.description'),
      gradient: 'from-orange-500 to-orange-700'
    }
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
    <div ref={containerRef} className="min-h-screen bg-white overflow-hidden">
      <Helmet>
        <title>{t('contact.meta.title')}</title>
        <meta name="description" content={t('contact.meta.description')} />
      </Helmet>

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
              className="text-4xl md:text-7xl font-bold mb-8 leading-tight"
            >
              <span className="bg-gradient-to-r from-gray-900 via-purple-800 to-purple-600 bg-clip-text text-transparent">
                {t('contact.hero.title1')}
              </span>
              <br />
              <motion.span
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 bg-clip-text text-transparent bg-[length:200%_100%]"
              >
                {t('contact.hero.title2')}
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 1 }}
              className="text-lg md:text-xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed"
            >
              {t('contact.hero.subtitle.part1')}
              <span className="text-purple-700 font-semibold">{t('contact.hero.subtitle.part2')}</span>
              {t('contact.hero.subtitle.part3')}
              <span className="hidden md:inline">
                {t('contact.hero.subtitle.part4')}
                <span className="text-purple-700 font-semibold">{t('contact.hero.subtitle.part5')}</span>
                {t('contact.hero.subtitle.part6')}
              </span>
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
              {t('contact.form.title')}
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
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('contact.form.success.title')}</h3>
                <p className="text-gray-600 mb-6">
                  {t('contact.form.success.description')}
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
                  {t('contact.form.success.button')}
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
                      <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-1 md:mb-2">{t('contact.form.steps.basic.title')}</h3>
                      <p className="text-gray-600 text-xs md:text-base">{t('contact.form.steps.basic.subtitle')}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
                      <div>
                        <label className="block text-gray-700 font-semibold mb-1 md:mb-2 text-xs md:text-base">
                          {t('contact.form.fields.name.label')} *
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
                          placeholder={t('contact.form.fields.name.placeholder')}
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-1 md:mb-2 text-xs md:text-base">
                          {t('contact.form.fields.email.label')} *
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
                          placeholder={t('contact.form.fields.email.placeholder')}
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-1 md:mb-2 text-xs md:text-base">{t('contact.form.fields.phone.label')}</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="w-full px-3 py-2 md:px-4 md:py-3 border border-purple-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-xs md:text-base"
                          placeholder={t('contact.form.fields.phone.placeholder')}
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-1 md:mb-2 text-xs md:text-base">{t('contact.form.fields.company.label')}</label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => handleInputChange('company', e.target.value)}
                          className="w-full px-3 py-2 md:px-4 md:py-3 border border-purple-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-xs md:text-base"
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
                      <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-1 md:mb-2">{t('contact.form.steps.project.title')}</h3>
                      <p className="text-gray-600 text-xs md:text-base">{t('contact.form.steps.project.subtitle')}</p>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2 md:mb-4 text-xs md:text-base">
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
                                ? 'border-purple-500 bg-purple-50 text-purple-700'
                                : 'border-purple-200 hover:border-purple-300'
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
                          className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                        />
                        <label htmlFor="otherService" className="text-sm font-medium text-gray-700">
                          {t('contact.form.fields.service.other')}
                        </label>
                      </div>
                      {formData.service === 'other' && (
                        <div className="mt-4">
                          <label className="block text-gray-700 font-semibold mb-1 md:mb-2 text-xs md:text-base">
                            {t('contact.form.fields.service.otherDescription.label')} *
                            {errors.otherService && <span className="text-red-500 text-xs ml-2">{errors.otherService}</span>}
                          </label>
                          <input
                            type="text"
                            value={formData.otherService}
                            onChange={(e) => handleInputChange('otherService', e.target.value)}
                            className={`w-full px-3 py-2 md:px-4 md:py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-200 text-xs md:text-base ${
                              errors.otherService ? 'border-red-500' : 'border-purple-200 focus:border-purple-500'
                            }`}
                            placeholder={t('contact.form.fields.service.otherDescription.placeholder')}
                          />
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2 md:mb-4 text-xs md:text-base">
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
                        <label className="block text-gray-700 font-semibold mb-2 md:mb-4 text-xs md:text-base">{t('contact.form.fields.timeline.label')}</label>
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
                      <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-1 md:mb-2">{t('contact.form.steps.message.title')}</h3>
                      <p className="text-gray-600 text-xs md:text-base">{t('contact.form.steps.message.subtitle')}</p>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-1 md:mb-2 text-xs md:text-base">
                        {t('contact.form.fields.message.label')} *
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
                        {t('contact.form.buttons.back')}
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
                        {t('contact.form.buttons.next')}
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
            className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-2xl shadow-premium-lg border border-purple-200 z-50 flex flex-col"
          >
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-4 rounded-t-2xl flex justify-between items-center">
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
                  placeholder={t('contact.chat.placeholder')}
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