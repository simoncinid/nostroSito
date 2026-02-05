import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { ShieldCheck } from 'lucide-react';
import logo from '../assets/logos/favicon.png';

type PrivacySection = {
  id: string;
  title: string;
  content: string[];
};

const Privacy = () => {
  const { t } = useTranslation();

  const rawSections = t('privacy.sections', { returnObjects: true });
  const sections: PrivacySection[] = Array.isArray(rawSections) ? (rawSections as PrivacySection[]) : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-x-hidden">
      <Helmet>
        <title>{t('privacy.meta.title')}</title>
        <meta name="description" content={t('privacy.meta.description')} />
      </Helmet>

      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-24 left-16 w-96 h-96 bg-gradient-to-r from-primary-400/10 to-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-24 right-16 w-80 h-80 bg-gradient-to-r from-primary-400/10 to-primary-400/10 rounded-full blur-3xl" />
      </div>

      {/* Hero */}
      <section className="relative min-h-[300px] flex items-center justify-center px-4 pt-32 md:pt-40 pb-10 z-20 text-white">
        <div className="absolute inset-0 flex items-center justify-center pt-16 opacity-[0.02] pointer-events-none">
          <img
            src={logo}
            alt=""
            className="w-[90%] max-w-none blur-2xl"
            style={{ filter: 'drop-shadow(0 0 100px rgba(232, 80, 2, 0.4))' }}
          />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-4"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-primary-500 to-primary-700 flex items-center justify-center shadow-glow">
              <ShieldCheck className="w-7 h-7 text-white" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-4 leading-tight"
          >
            <span className="bg-gradient-to-r from-white via-primary-200 to-primary-400 bg-clip-text text-transparent">
              {t('privacy.hero.title')}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-400 max-w-3xl mx-auto"
          >
            {t('privacy.hero.subtitle')}
          </motion.p>

          <div className="mt-6 text-sm text-gray-400">
            <span className="text-gray-500">{t('privacy.lastUpdatedLabel')}</span>{' '}
            <span className="text-gray-300 font-medium">{t('privacy.lastUpdatedDate')}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="relative z-30 px-4 pb-20 mt-2">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
            {/* TOC - sticky dentro al contenitore (si ferma prima del footer) */}
            <aside className="lg:sticky lg:top-28 h-fit self-start">
              <div className="rounded-2xl border border-white/10 bg-gray-800/50 backdrop-blur-sm p-5">
                <div className="text-white font-display font-semibold mb-3">{t('privacy.tocTitle')}</div>
                <div className="max-h-[calc(100vh-8rem)] overflow-auto pr-1">
                  <ul className="space-y-2">
                    {sections.map((s) => (
                      <li key={s.id}>
                        <a
                          href={`#${s.id}`}
                          className="text-sm text-gray-300 hover:text-primary-300 transition-colors"
                        >
                          {s.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>

            {/* Sections */}
            <div className="space-y-4">
              {sections.map((section) => (
                <div
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-32 rounded-2xl border border-white/10 bg-gray-800/60 backdrop-blur-sm p-6"
                >
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
                    <span className="bg-gradient-to-r from-white via-primary-200 to-primary-400 bg-clip-text text-transparent">
                      {section.title}
                    </span>
                  </h2>
                  <div className="space-y-3 text-gray-300 leading-relaxed">
                    {section.content.map((p, idx) => (
                      <p key={idx} className="text-sm md:text-base text-gray-300">
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;

