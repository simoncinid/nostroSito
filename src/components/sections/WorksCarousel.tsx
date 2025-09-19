import { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FiExternalLink } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

const WorksCarousel = () => {
  const { t } = useTranslation();

  const works = [
    {
      img: '/images/Vistamare.png',
      nameKey: 'vistamare',
      link: 'https://vistamarerosignano.it/'
    },
    {
      img: '/images/ChatBot_RNDhub.png',
      nameKey: 'rndhub',
      link: 'https://rndhub.io/'
    },
    {
      img: '/images/AdmissionHub.png',
      nameKey: 'admissionhub',
      link: 'https://theadmissionhub.com/'
    },
    {
      img: '/images/ChatBot_welpy.png',
      nameKey: 'welpy',
      link: 'https://www.welpy.it/'
    },
    {
      img: '/images/Threshold.png',
      nameKey: 'threshold',
      link: 'https://www.threshold.coach/'
    },
    {
      img: '/images/area287.png',
      nameKey: 'area287',
      link: 'https://area287.it'
    },
    {
      img: '/images/fantozzi.png',
      nameKey: 'fantozzi',
      link: 'https://barfantozzi.it'
    },
    {
      img: '/images/scuderia.png',
      nameKey: 'scuderia',
      link: 'https://www.ristorolanticascuderia.it/'
    },
    {
      img: '/images/bottega.png',
      nameKey: 'bottega',
      link: 'https://labottegadellascruderia.com'
    },
    {
      img: '/images/bagnoparadiso.png',
      nameKey: 'bagnoparadiso',
      link: 'https://bagnoparadisotirrenia.it'
    },
    {
      img: '/images/napoli.png',
      nameKey: 'napoli',
      link: 'https://napolintocore.it'
    },
    {
      img: '/images/sdl.png',
      nameKey: 'sdl',
      link: 'https://spicchiodiluna.it'
    },
    {
      img: '/images/diaz.png',
      nameKey: 'diaz',
      link: 'https://diazmicrotorrefazione.com'
    }
  ];

  const CARD_WIDTH = 340; // px
  const CARD_GAP = 32; // px
  const SLIDE_SPEED = 60; // px/sec

  // Duplico le card per effetto loop
  const cards = [...works, ...works, ...works];
  const totalCards = cards.length;
  const totalWidth = totalCards * (CARD_WIDTH + CARD_GAP);

  const controls = useAnimation();
  const xRef = useRef(0);

  // Scorrimento continuo
  useEffect(() => {
    const distance = works.length * (CARD_WIDTH + CARD_GAP);
    const duration = distance / SLIDE_SPEED;
    controls.set({ x: 0 });
    controls.start({
      x: -distance,
      transition: {
        duration,
        ease: 'linear',
        repeat: Infinity,
        repeatType: 'loop',
      },
    });
    // eslint-disable-next-line
  }, []);

  // Aggiorna xRef per sapere sempre la posizione attuale
  const handleUpdate = (latest: any) => {
    xRef.current = latest.x ?? 0;
  };

  return (
    <section className="w-full py-12 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">
          {t('worksCarousel.title')}{' '}
          <span className="bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
            {t('worksCarousel.titleHighlight')}
          </span>
        </h2>
        
        <div className="relative overflow-hidden">
          <motion.div
            className="flex items-center"
            style={{ gap: `${CARD_GAP}px`, minWidth: `${totalWidth}px` }}
            animate={controls}
            onUpdate={handleUpdate}
          >
            {cards.map((card, idx) => (
              <motion.div
                key={card.nameKey + idx}
                className="relative flex-shrink-0 flex flex-col items-center justify-center"
                style={{ width: CARD_WIDTH, height: 320 }}
                whileHover={{ scale: 1.04 }}
              >
                <a 
                    href={card.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex flex-col items-center justify-center w-full h-full text-purple-600 hover:text-purple-800 transition-colors duration-300"
                  >
                <div className="w-full h-64 bg-gray-100 flex items-center justify-center rounded-2xl mb-4 shadow-sm">
                
                  <img
                    src={card.img}
                    alt={t(`worksCarousel.projects.${card.nameKey}`)}
                    className="max-w-full max-h-full object-contain rounded-2xl"
                    draggable={false}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-lg text-gray-700">
                    {t(`worksCarousel.projects.${card.nameKey}`)}
                  </span>
                  
                    <FiExternalLink size={20} />
                  
                </div>
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WorksCarousel; 