import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { ChevronDown, HelpCircle } from 'lucide-react';
import logo from '../assets/logos/favicon.png';

interface FaqItem {
  question: string;
  answer: string;
}

const Faq = () => {
  const { t } = useTranslation();
  const [openId, setOpenId] = useState<number | null>(null);

  const items = useMemo(() => {
    const raw = t('faq.items', { returnObjects: true });
    if (!Array.isArray(raw)) return [];
    return raw as FaqItem[];
  }, [t]);

  const toggle = (index: number) => {
    setOpenId((current) => (current === index ? null : index));
  };

  const isOpen = (index: number) => openId === index;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      <Helmet>
        <title>{t('faq.meta.title')}</title>
        <meta name="description" content={t('faq.meta.description')} />
      </Helmet>

      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-primary-400/10 to-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-primary-400/10 to-primary-400/10 rounded-full blur-3xl" />
      </div>

      {/* Hero - pt generoso per distacco dall'header */}
      <section className="relative min-h-[320px] flex items-center justify-center px-4 pt-32 md:pt-40 pb-10 z-20 text-white">
        <div className="absolute inset-0 flex items-center justify-center pt-16 opacity-[0.02] pointer-events-none">
          <img
            src={logo}
            alt=""
            className="w-[90%] max-w-none blur-2xl"
            style={{ filter: 'drop-shadow(0 0 100px rgba(232, 80, 2, 0.4))' }}
          />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-4"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-primary-500 to-primary-700 flex items-center justify-center shadow-glow">
              <HelpCircle className="w-7 h-7 text-white" />
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-4 leading-tight"
          >
            <span className="bg-gradient-to-r from-white via-primary-200 to-primary-400 bg-clip-text text-transparent">
              {t('faq.hero.title')}
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto"
          >
            {t('faq.hero.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* FAQ Accordion - riscritto da zero */}
      <section className="relative z-30 px-4 pb-20 mt-2">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-3">
            {items.map((item, index) => {
              const open = isOpen(index);
              return (
                <div
                  key={`faq-${index}`}
                  className="relative z-10 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden pointer-events-auto faq-card"
                >
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-white/5 transition-colors duration-200 cursor-pointer pointer-events-auto"
                    aria-expanded={open}
                  >
                    <span className="font-semibold text-white text-base md:text-lg pr-2">
                      {item.question}
                    </span>
                    <span
                      className={`flex-shrink-0 w-10 h-10 rounded-xl bg-primary-500/20 flex items-center justify-center text-primary-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                    >
                      <ChevronDown className="w-5 h-5" />
                    </span>
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-300 ease-in-out"
                    style={{ maxHeight: open ? '1000px' : '0' }}
                  >
                    <div className="px-5 pb-4 pt-0 border-t border-white/10">
                      <p className="text-gray-400 leading-relaxed text-sm md:text-base pt-4">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-gray-400 mb-4">{t('faq.cta.text')}</p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-primary-700 hover:from-primary-600 hover:to-primary-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-glow hover:shadow-glow-lg"
            >
              {t('faq.cta.button')}
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Faq;
