import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useState } from 'react';

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactFormModal = ({ isOpen, onClose }: ContactFormModalProps) => {
  const [formData, setFormData] = useState({
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
  const [errors, setErrors] = useState<Record<string, string>>({});

  const services = [
    { id: 'web', name: 'Sviluppo Web React', icon: '🌐' },
    { id: 'ai', name: 'Soluzioni AI', icon: '🤖' },
    { id: 'automation', name: 'Automazione Processi', icon: '⚡' },
    { id: 'mobile', name: 'App Mobile', icon: '📱' },
    { id: 'ecommerce', name: 'E-commerce', icon: '🛍️' },
    { id: 'consulting', name: 'Consulenza Digitale', icon: '🎯' }
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

  const handleInputChange = (field: keyof typeof formData, value: string) => {
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
      onClose();
    }, 3000);
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
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 rounded-t-2xl flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Richiedi una Consulenza</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-300"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Form Content */}
            <div className="p-6">
              {submitStatus === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Messaggio Inviato!</h3>
                  <p className="text-gray-600">
                    Grazie per averci contattato. Ti risponderemo entro 2 ore lavorative.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Step 1: Basic Info */}
                  {currentStep === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nome *
                            {errors.name && <span className="text-red-500 text-xs ml-2">{errors.name}</span>}
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-200 ${
                              errors.name ? 'border-red-500' : 'border-gray-200 focus:border-primary-500'
                            }`}
                            placeholder="Il tuo nome"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email *
                            {errors.email && <span className="text-red-500 text-xs ml-2">{errors.email}</span>}
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-200 ${
                              errors.email ? 'border-red-500' : 'border-gray-200 focus:border-primary-500'
                            }`}
                            placeholder="la-tua-email@esempio.com"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Telefono</label>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                            placeholder="+39 123 456 7890"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Azienda</label>
                          <input
                            type="text"
                            value={formData.company}
                            onChange={(e) => handleInputChange('company', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                            placeholder="Nome della tua azienda"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Project Details */}
                  {currentStep === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Servizio Richiesto *
                          {errors.service && <span className="text-red-500 text-xs ml-2">{errors.service}</span>}
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {services.map((service) => (
                            <button
                              key={service.id}
                              type="button"
                              onClick={() => handleInputChange('service', service.id)}
                              className={`p-3 border rounded-xl text-left transition-all duration-300 ${
                                formData.service === service.id
                                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                                  : 'border-gray-200 hover:border-primary-300'
                              } ${errors.service ? 'border-red-500' : ''}`}
                            >
                              <span className="text-xl mb-1 block">{service.icon}</span>
                              <div className="font-medium text-sm">{service.name}</div>
                            </button>
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
                          <label htmlFor="otherService" className="text-sm font-medium text-gray-700">
                            Altro servizio
                          </label>
                        </div>
                        {formData.service === 'other' && (
                          <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Specifica il servizio richiesto *
                              {errors.otherService && <span className="text-red-500 text-xs ml-2">{errors.otherService}</span>}
                            </label>
                            <input
                              type="text"
                              value={formData.otherService}
                              onChange={(e) => handleInputChange('otherService', e.target.value)}
                              className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-200 ${
                                errors.otherService ? 'border-red-500' : 'border-gray-200 focus:border-primary-500'
                              }`}
                              placeholder="Descrivi il servizio che stai cercando"
                            />
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Budget *
                            {errors.budget && <span className="text-red-500 text-xs ml-2">{errors.budget}</span>}
                          </label>
                          <div className="space-y-2">
                            {budgetRanges.map((budget) => (
                              <button
                                key={budget.id}
                                type="button"
                                onClick={() => handleInputChange('budget', budget.id)}
                                className={`w-full p-3 border rounded-xl text-left transition-all duration-300 ${
                                  formData.budget === budget.id
                                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                                    : 'border-gray-200 hover:border-primary-300'
                                } ${errors.budget ? 'border-red-500' : ''}`}
                              >
                                {budget.name}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Timeline</label>
                          <div className="space-y-2">
                            {timelines.map((timeline) => (
                              <button
                                key={timeline.id}
                                type="button"
                                onClick={() => handleInputChange('timeline', timeline.id)}
                                className={`w-full p-3 border rounded-xl text-left transition-all duration-300 ${
                                  formData.timeline === timeline.id
                                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                                    : 'border-gray-200 hover:border-primary-300'
                                }`}
                              >
                                {timeline.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Message */}
                  {currentStep === 3 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Descrizione del Progetto *
                          {errors.message && <span className="text-red-500 text-xs ml-2">{errors.message}</span>}
                        </label>
                        <textarea
                          required
                          rows={5}
                          value={formData.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-200 resize-none ${
                            errors.message ? 'border-red-500' : 'border-gray-200 focus:border-primary-500'
                          }`}
                          placeholder="Descrivi il tuo progetto, i tuoi obiettivi e qualsiasi dettaglio che ritieni importante..."
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Navigation */}
                  <div className="flex justify-between items-center pt-4">
                    <div className="flex space-x-2">
                      {[1, 2, 3].map((step) => (
                        <div
                          key={step}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            step <= currentStep ? 'bg-primary-600' : 'bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>

                    <div className="flex gap-2">
                      {currentStep > 1 && (
                        <button
                          type="button"
                          onClick={prevStep}
                          className="px-4 py-2 border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all duration-300"
                        >
                          Indietro
                        </button>
                      )}

                      {currentStep < 3 ? (
                        <button
                          type="button"
                          onClick={nextStep}
                          className="px-4 py-2 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700 transition-all duration-300"
                        >
                          Avanti
                        </button>
                      ) : (
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="px-6 py-2 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700 transition-all duration-300 disabled:opacity-50"
                        >
                          {isSubmitting ? 'Invio in corso...' : 'Invia Messaggio'}
                        </button>
                      )}
                    </div>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactFormModal; 