import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FiExternalLink } from 'react-icons/fi';

const works = [
  {
    img: '/images/Vistamare.png',
    nome: 'Sito web Vistamare',
    link: 'https://vistamare.vercel.app/'
  },
  {
    img: '/images/ChatBot_RNDhub.png',
    nome: 'ChatBot RNDhub',
    link: 'https://rndhub.io/'
  },
  {
    img: '/images/AdmissionHub.png',
    nome: 'Sito web AdmissionHub',
    link: 'https://theadmissionhub.com/'
  },
  {
    img: '/images/ChatBot_welpy.png',
    nome: 'ChatBot Welpy',
    link: 'https://www.welpy.it/'
  },
  {
    img: '/images/Threshold.png',
    nome: 'Sito web Threshold',
    link: 'https://www.threshold.coach/'
  }
];

const CARD_WIDTH = 340; // px
const CARD_GAP = 32; // px
const VISIBLE_CARDS = 3;
const SLIDE_SPEED = 60; // px/sec

const WorksCarousel = () => {
  // Duplico le card per effetto loop
  const cards = [...works, ...works, ...works];
  const totalCards = cards.length;
  const totalWidth = totalCards * (CARD_WIDTH + CARD_GAP);
  const visibleWidth = 1400; // Allargo il carosello

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
    <section className="w-full py-12 flex flex-col items-center mt-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">I nostri lavori</h2>
      <div
        className="relative mx-auto flex justify-center overflow-hidden"
        style={{ width: `${visibleWidth}px`, height: '340px' }}
      >
        <motion.div
          className="flex items-center"
          style={{ gap: `${CARD_GAP}px`, minWidth: `${totalWidth}px` }}
          animate={controls}
          onUpdate={handleUpdate}
        >
          {cards.map((card, idx) => (
            <motion.div
              key={card.nome + idx}
              className="relative flex-shrink-0 flex flex-col items-center justify-center"
              style={{ width: CARD_WIDTH, height: 320 }}
              whileHover={{ scale: 1.04 }}
            >
              <div className="w-full h-64 bg-gray-100 flex items-center justify-center rounded-2xl mb-4">
                <img
                  src={card.img}
                  alt={card.nome}
                  className="max-w-full max-h-full object-contain rounded-2xl"
                  draggable={false}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-lg text-gray-700">{card.nome}</span>
                <a href={card.link} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800">
                  <FiExternalLink size={20} />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WorksCarousel; 