import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const WorksCarousel = () => {
  const { t } = useTranslation();

  const works = [
    { img: '/images/Vistamare.png', nameKey: 'vistamare', link: 'https://vistamarerosignano.it/' },
    { img: '/images/ChatBot_RNDhub.png', nameKey: 'rndhub', link: 'https://rndhub.io/' },
    { img: '/images/AdmissionHub.png', nameKey: 'admissionhub', link: 'https://theadmissionhub.com/' },
    { img: '/images/ChatBot_welpy.png', nameKey: 'welpy', link: 'https://www.welpy.it/' },
    { img: '/images/Threshold.png', nameKey: 'threshold', link: 'https://www.threshold.coach/' },
    { img: '/images/area287.png', nameKey: 'area287', link: 'https://area287.it' },
    { img: '/images/fantozzi.png', nameKey: 'fantozzi', link: 'https://barfantozzi.it' },
    { img: '/images/scuderia.png', nameKey: 'scuderia', link: 'https://www.ristorolanticascuderia.it/' },
    { img: '/images/bottega.png', nameKey: 'bottega', link: 'https://labottegadellascuderia.com' },
    { img: '/images/bagnoparadiso.png', nameKey: 'bagnoparadiso', link: 'https://bagnoparadisotirrenia.it' },
    { img: '/images/napoli.png', nameKey: 'napoli', link: 'https://napolintocore.it' },
    { img: '/images/sdl.png', nameKey: 'sdl', link: 'https://spicchiodiluna.it' },
    { img: '/images/diaz.png', nameKey: 'diaz', link: 'https://diazmicrotorrefazione.com' }
  ];

  // Dividi i progetti in due righe
  const midPoint = Math.ceil(works.length / 2);
  const topRow = works.slice(0, midPoint);
  const bottomRow = works.slice(midPoint);

  // Dimensioni responsive
  const getCardDimensions = () => {
    if (typeof window === 'undefined') return { width: 280, height: 180, gap: 16 };
    if (window.innerWidth < 640) return { width: 240, height: 150, gap: 12 };
    if (window.innerWidth < 1024) return { width: 300, height: 190, gap: 16 };
    return { width: 360, height: 220, gap: 20 };
  };

  const [dimensions, setDimensions] = useState(getCardDimensions());
  const SLIDE_SPEED = 40;

  const controlsTop = useAnimation();
  const controlsBottom = useAnimation();

  useEffect(() => {
    const handleResize = () => setDimensions(getCardDimensions());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animazione riga superiore (verso sinistra)
  useEffect(() => {
    const totalWidth = topRow.length * (dimensions.width + dimensions.gap);
    const duration = totalWidth / SLIDE_SPEED;
    
    controlsTop.set({ x: 0 });
    controlsTop.start({
      x: -totalWidth,
      transition: {
        duration,
        ease: 'linear',
        repeat: Infinity,
        repeatType: 'loop',
      },
    });
  }, [dimensions, controlsTop, topRow.length]);

  // Animazione riga inferiore (verso destra)
  useEffect(() => {
    const totalWidth = bottomRow.length * (dimensions.width + dimensions.gap);
    const duration = totalWidth / SLIDE_SPEED;
    
    controlsBottom.set({ x: -totalWidth });
    controlsBottom.start({
      x: 0,
      transition: {
        duration,
        ease: 'linear',
        repeat: Infinity,
        repeatType: 'loop',
      },
    });
  }, [dimensions, controlsBottom, bottomRow.length]);

  // Duplica le card per loop continuo
  const topCards = [...topRow, ...topRow, ...topRow];
  const bottomCards = [...bottomRow, ...bottomRow, ...bottomRow];

  const ImageCard = ({ card, index }: { card: typeof works[0], index: number }) => (
    <motion.a
      key={card.nameKey + index}
      href={card.link}
      target="_blank"
      rel="noopener noreferrer"
      className="relative flex-shrink-0 overflow-hidden rounded-xl group"
      style={{ 
        width: dimensions.width, 
        height: dimensions.height 
      }}
      whileHover={{ scale: 1.05, zIndex: 10 }}
      transition={{ duration: 0.3 }}
    >
      <img
        src={card.img}
        alt={t(`worksCarousel.projects.${card.nameKey}`)}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        draggable={false}
      />
      {/* Overlay hover con nome progetto */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
        <span className="text-white font-semibold text-sm md:text-base">
          {t(`worksCarousel.projects.${card.nameKey}`)}
        </span>
      </div>
    </motion.a>
  );

  return (
    <section className="w-full py-12 mt-8">
      <div className="w-full">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-10 text-center px-4 sm:px-6 lg:px-8">
          {t('worksCarousel.title')}{' '}
          <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
            {t('worksCarousel.titleHighlight')}
          </span>
        </h2>
        
        {/* Container con ombre sfumate sui lati */}
        <div className="relative">
          {/* Ombra sinistra */}
          <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent z-10 pointer-events-none" />
          {/* Ombra destra */}
          <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-l from-gray-900 via-gray-900/80 to-transparent z-10 pointer-events-none" />

          {/* Riga superiore - scorre verso sinistra */}
          <div className="overflow-hidden w-full mb-4 md:mb-5">
            <motion.div
              className="flex items-center"
              style={{ gap: `${dimensions.gap}px` }}
              animate={controlsTop}
            >
              {topCards.map((card, idx) => (
                <ImageCard key={`top-${card.nameKey}-${idx}`} card={card} index={idx} />
              ))}
            </motion.div>
          </div>

          {/* Riga inferiore - scorre verso destra */}
          <div className="overflow-hidden w-full">
            <motion.div
              className="flex items-center"
              style={{ gap: `${dimensions.gap}px` }}
              animate={controlsBottom}
            >
              {bottomCards.map((card, idx) => (
                <ImageCard key={`bottom-${card.nameKey}-${idx}`} card={card} index={idx} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorksCarousel;
