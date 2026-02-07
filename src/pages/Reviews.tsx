import { motion, useAnimation } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Star, MessageSquareQuote, ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logos/favicon.png';

interface ReviewItem {
  name: string;
  role: string;
  text: string;
  rating: number;
}

const Reviews = () => {
  const { t } = useTranslation();
  const scrollRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [isPaused, setIsPaused] = useState(false);

  const rawItems = t('reviews.items', { returnObjects: true });
  const items: ReviewItem[] = Array.isArray(rawItems) ? (rawItems as ReviewItem[]) : [];

  // Duplica le card per effetto loop infinito
  const duplicated = [...items, ...items, ...items];

  // Auto-scroll continuo
  useEffect(() => {
    if (!scrollRef.current || items.length === 0) return;

    const totalWidth = scrollRef.current.scrollWidth / 3;

    const startAnimation = () => {
      controls.start({
        x: -totalWidth,
        transition: {
          x: {
            duration: items.length * 8,
            ease: 'linear',
            repeat: Infinity,
            repeatType: 'loop',
          },
        },
      });
    };

    if (!isPaused) {
      startAnimation();
    } else {
      controls.stop();
    }
  }, [controls, items.length, isPaused]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-x-hidden">
      <Helmet>
        <title>{t('reviews.meta.title')}</title>
        <meta name="description" content={t('reviews.meta.description')} />
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
              <MessageSquareQuote className="w-7 h-7 text-white" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-4 leading-tight"
          >
            <span className="bg-gradient-to-r from-white via-primary-200 to-primary-400 bg-clip-text text-transparent">
              {t('reviews.hero.title')}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-400 max-w-3xl mx-auto"
          >
            {t('reviews.hero.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Reviews Scroller */}
      <section className="relative z-30 py-12 md:py-20">
        {/* Fade shadows */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-gray-900 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-gray-900 to-transparent z-10 pointer-events-none" />

        <div
          className="overflow-hidden w-full"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div
            ref={scrollRef}
            animate={controls}
            className="flex gap-6 px-4"
          >
            {duplicated.map((review, index) => (
              <div
                key={`review-${index}`}
                className="flex-shrink-0 w-[340px] md:w-[420px]"
              >
                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 md:p-8 review-card flex flex-col">
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-primary-500 fill-primary-500"
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-gray-300 leading-relaxed text-sm md:text-base flex-1 mb-6 italic">
                    "{review.text}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-sm">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">
                        {review.name}
                      </div>
                      <div className="text-gray-400 text-xs">
                        {review.role}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-30 px-4 pb-20">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white via-primary-200 to-primary-400 bg-clip-text text-transparent">
                {t('reviews.cta.title')}
              </span>
            </h2>
            <p className="text-gray-400 mb-8 text-lg">
              {t('reviews.cta.subtitle')}
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-primary-700 hover:from-primary-600 hover:to-primary-800 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 shadow-glow hover:shadow-glow-lg text-lg"
            >
              {t('reviews.cta.button')}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Reviews;
