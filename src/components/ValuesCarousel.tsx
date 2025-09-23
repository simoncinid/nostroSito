import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { AIPoweredAnimation, CodiceZeroAnimation } from './NewAnimations';

interface ValueType {
  title: string;
  description: string;
  icon: any;
  color: string;
}

interface ValuesCarouselProps {
  values: ValueType[];
}

// Definizione del componente Card spostata all'inizio
const Card = ({ value, isActive }: { value: ValueType; isActive: boolean }) => {
  return (
    <motion.div
      className={`
        bg-white/80 backdrop-blur-xl border rounded-2xl p-6 cursor-pointer h-full flex flex-col items-center justify-center relative
        ${isActive ? 'border-blue-300 shadow-lg' : 'border-blue-200 shadow-sm'}
        transition-all duration-300
      `}
      whileHover={{ scale: isActive ? 1.03 : 1.05 }}
    >
      {/* Icon */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.2 }}
        className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center mb-4`}
      >
        <value.icon size={isActive ? 32 : 28} className="text-white" />
      </motion.div>
      {/* Content */}
      <h3 className={`${isActive ? 'text-2xl' : 'text-xl'} font-bold text-gray-900 mb-3 text-center`}>
        {value.title}
      </h3>
      <p className={`${isActive ? 'text-gray-600' : 'text-gray-500'} leading-relaxed text-center`}>
        {value.description}
      </p>
      {/* Hover Effect */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 hover:opacity-5 transition-opacity duration-500 rounded-2xl`}
      />
    </motion.div>
  );
};

const CARD_WIDTH = 320; // px
const CARD_GAP = 24; // px
const VISIBLE_CARDS = 3;
const SLIDE_SPEED = 60; // px/sec

const ValuesCarousel = ({ values }: ValuesCarouselProps) => {
  // Trova l'indice di "Passione" come highlight iniziale
  const initialIdx = Math.max(0, values.findIndex(v => v.title.toLowerCase() === 'passione'));
  const [highlightValueIdx, setHighlightValueIdx] = useState(initialIdx);

  // Duplico le card per effetto loop
  const cards = [...values, ...values, ...values];
  const totalCards = cards.length;
  const totalWidth = totalCards * (CARD_WIDTH + CARD_GAP);
  const visibleWidth = VISIBLE_CARDS * CARD_WIDTH + (VISIBLE_CARDS - 1) * CARD_GAP;

  const controls = useAnimation();
  const xRef = useRef(0);

  // Scorrimento continuo
  useEffect(() => {
    const distance = (values.length) * (CARD_WIDTH + CARD_GAP);
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
  }, [values.length]);

  // Aggiorna xRef per sapere sempre la posizione attuale
  const handleUpdate = (latest: any) => {
    xRef.current = latest.x ?? 0;
  };

  // Ogni 5.75 secondi la highlight passa alla card successiva nell'array values
  useEffect(() => {
    const interval = setInterval(() => {
      setHighlightValueIdx((prev) => (prev + 1) % values.length);
    }, 5750);
    return () => clearInterval(interval);
  }, [values.length]);

  return (
    <div className="w-full py-8 flex flex-col items-center">
      <div
        className="relative mx-auto flex justify-center overflow-hidden"
        style={{ width: `${visibleWidth}px`, height: '370px' }}
      >
        <motion.div
          className="flex items-center"
          style={{ gap: `${CARD_GAP}px`, minWidth: `${totalWidth}px` }}
          animate={controls}
          onUpdate={handleUpdate}
        >
          {cards.map((card, idx) => {
            const isActive = card.title === values[highlightValueIdx].title;
            return (
              <motion.div
                key={card.title + idx}
                className={`relative flex-shrink-0 cursor-pointer flex flex-col items-center justify-center ${isActive ? 'z-20' : 'z-10'}`}
                style={{ width: CARD_WIDTH, height: isActive ? 350 : 290 }}
                animate={{
                  scale: isActive ? 1 : 0.85,
                  opacity: isActive ? 1 : 0.8,
                }}
                transition={{ type: 'spring', stiffness: 120, damping: 20 }}
              >
                <Card value={card} isActive={isActive} />
                {isActive && <CardAnimation value={card.title} />}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

// Animazioni creative per ogni valore
const CardAnimation = ({ value }: { value: string }) => {
  const [isVisible, setIsVisible] = useState(true);
  const animationRef = useRef<HTMLDivElement>(null);
  
  // Mostra l'animazione per 2 secondi e poi la nasconde
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (!isVisible) return null;
  
  switch (value.toLowerCase()) {
    case 'ai-powered':
      return <AIPoweredAnimation />;
    case 'codice da zero':
      return <CodiceZeroAnimation />;
    case 'passione':
      // Esplosione di cuori premium
      return (
        <div ref={animationRef} className="absolute inset-0 pointer-events-none overflow-hidden z-30">
          {/* Esplosione principale */}
          <AnimatePresence>
            <motion.div 
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Anello di esplosione */}
              <motion.div
                className="absolute w-4 h-4 rounded-full bg-red-500"
                initial={{ scale: 0.1, opacity: 0 }}
                animate={{
                  scale: [0.1, 3, 5],
                  opacity: [0, 0.8, 0],
                }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
              
              {/* Particelle cuore che esplodono in tutte le direzioni */}
              {Array.from({ length: 15 }).map((_, i) => {
                const angle = (i / 15) * Math.PI * 2;
                const x = Math.cos(angle) * 100;
                const y = Math.sin(angle) * 100;
                const delay = i * 0.03;
                
                return (
                  <motion.div
                    key={`heart-particle-${i}`}
                    className="absolute"
                    initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                    animate={{
                      x: x,
                      y: y,
                      scale: [0, 1, 0.5],
                      opacity: [0, 1, 0],
                      rotate: [-30, 30]
                    }}
                    transition={{ 
                      duration: 1.8, 
                      delay, 
                      ease: [0.23, 1.64, 0.32, 0.99] 
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" className="filter drop-shadow-xl">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
                        fill={`rgba(${226 + i*2}, ${67 + i*5}, ${100 + i*3}, ${0.9 - i*0.02})`}/>
                    </svg>
                  </motion.div>
                );
              })}
              
              {/* Cuore principale pulsante */}
              <motion.div
                className="relative"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 1.3, 1.1],
                  opacity: [0, 1, 0.9]
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <svg width="64" height="64" viewBox="0 0 24 24" className="filter drop-shadow-lg">
                  <motion.path 
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
                    fill="#e2557a"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      fill: ["#e2557a", "#ff3980", "#e2557a"]
                    }}
                    transition={{ repeat: 3, duration: 0.6 }}
                  />
                </svg>
              </motion.div>
              
              {/* Scie luminose */}
              {Array.from({ length: 8 }).map((_, i) => {
                const delay = i * 0.05;
                const size = 20 + Math.random() * 20;
                const angle = Math.random() * Math.PI * 2;
                const distance = 30 + Math.random() * 60;
                const x = Math.cos(angle) * distance;
                const y = Math.sin(angle) * distance;
                
                return (
                  <motion.div
                    key={`sparkle-${i}`}
                    className="absolute rounded-full bg-gradient-to-r from-blue-300 to-blue-500 opacity-70 mix-blend-screen"
                    style={{ width: size, height: size / 3 }}
                    initial={{ x: 0, y: 0, scale: 0, opacity: 0, rotate: angle * (180/Math.PI) }}
                    animate={{
                      x: [0, x/2, x],
                      y: [0, y/2, y],
                      scale: [0, 1, 0],
                      opacity: [0, 0.7, 0],
                    }}
                    transition={{ duration: 1.2, delay, ease: "easeOut" }}
                  />
                );
              })}
              
              {/* Onde di amore che si espandono */}
              {[1, 2, 3].map((_, i) => (
                <motion.div
                  key={`wave-${i}`}
                  className="absolute rounded-full border-2 border-blue-500"
                  style={{ width: 20, height: 20 }}
                  initial={{ opacity: 0.7, scale: 1 }}
                  animate={{ 
                    opacity: 0,
                    scale: 10,
                    borderColor: ["rgba(236,72,153,0.7)", "rgba(236,72,153,0)"]
                  }}
                  transition={{ 
                    duration: 1.5, 
                    delay: i * 0.3,
                    ease: "easeOut"
                  }}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      );
    case 'affidabilità':
      // Scudi che ruotano e brillano - Effetto WOW premium
      return (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-30">
          {/* Effetto luccichio di sfondo */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-blue-600/5 rounded-2xl"
            animate={{ 
              backgroundImage: [
                "linear-gradient(to bottom right, rgba(79, 70, 229, 0.05), rgba(37, 99, 235, 0.05))",
                "linear-gradient(to bottom right, rgba(79, 70, 229, 0.1), rgba(37, 99, 235, 0.1))",
                "linear-gradient(to bottom right, rgba(79, 70, 229, 0.05), rgba(37, 99, 235, 0.05))"
              ]
            }}
            transition={{ duration: 2, repeat: 0 }}
          />

          {/* Flash centrale */}
          <motion.div 
            className="absolute w-80 h-80 rounded-full bg-indigo-500/30 blur-2xl"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 0.8, 0], opacity: [0, 0.3, 0] }}
            transition={{ duration: 1.2 }}
          />

          {/* Costruzione a strati dello scudo */}
          <motion.div className="relative w-40 h-40">
            {/* Cerchio di protezione */}
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-indigo-500/30"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ 
                scale: [0.5, 1.1, 1], 
                opacity: [0, 0.7, 0.5],
                rotate: [0, 180]
              }}
              transition={{ 
                duration: 1.5,
                ease: "easeOut"
              }}
            />

            {/* Scudo centrale che si forma */}
            <motion.svg
              width="120" height="120" viewBox="0 0 120 120" fill="none"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 drop-shadow-2xl"
            >
              <motion.path
                d="M60 110c0 0-35-17.5-35-60V20l35-10 35 10v30c0 42.5-35 60-35 60z"
                fill="#6366F1"
                stroke="white" 
                strokeWidth="3"
                initial={{ pathLength: 0, fill: "rgba(99, 102, 241, 0)" }}
                animate={{ 
                  pathLength: 1,
                  fill: "rgba(99, 102, 241, 1)"
                }}
                transition={{ 
                  pathLength: { duration: 1, delay: 0.3 },
                  fill: { duration: 0.8, delay: 0.6 }
                }}
              />

              {/* Checkmark that appears inside shield */}
              <motion.path
                d="M40 60L55 75L80 50"
                stroke="white"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              />
            </motion.svg>

            {/* Raggi di luce */}
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = (i / 8) * Math.PI * 2;
              const delay = 0.8 + i * 0.05;
              return (
                <motion.div
                  key={`ray-${i}`}
                  className="absolute left-1/2 top-1/2 w-1 h-16 bg-indigo-400/40 blur-sm origin-bottom"
                  style={{ 
                    transformOrigin: 'bottom center',
                    rotate: `${angle * (180 / Math.PI)}deg`
                  }}
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ scaleY: [0, 1, 0], opacity: [0, 0.8, 0] }}
                  transition={{ 
                    duration: 1.2, 
                    delay, 
                    ease: "easeOut" 
                  }}
                />
              );
            })}

            {/* Particelle scintillanti */}
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i / 12) * Math.PI * 2;
              const distance = 30 + Math.random() * 40;
              const size = 2 + Math.random() * 4;
              const x = Math.cos(angle) * distance;
              const y = Math.sin(angle) * distance;
              const delay = 1 + Math.random() * 0.5;
              
              return (
                <motion.div
                  key={`sparkle-shield-${i}`}
                  className="absolute rounded-full bg-white"
                  style={{ 
                    width: size,
                    height: size,
                    left: "50%",
                    top: "50%",
                    x: -size/2,
                    y: -size/2
                  }}
                  initial={{ x: -size/2, y: -size/2, opacity: 0 }}
                  animate={{ 
                    x: [0, x],
                    y: [0, y],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 1, 
                    delay,
                    ease: "easeOut"
                  }}
                />
              );
            })}
          </motion.div>
        </div>
      );
    case 'performance':
      // Razzo supersonic che decolla con effetti di fuoco e particelle
      return (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-30 overflow-hidden">
          {/* Effetto bagliore di sfondo */}
          <motion.div
            className="absolute w-full h-full bg-gradient-to-t from-green-500/10 to-transparent"
            animate={{ 
              opacity: [0, 0.3, 0],
              background: [
                "linear-gradient(to top, rgba(16, 185, 129, 0.1), transparent)",
                "linear-gradient(to top, rgba(16, 185, 129, 0.2), transparent)",
                "linear-gradient(to top, rgba(16, 185, 129, 0.1), transparent)"
              ]
            }}
            transition={{ duration: 2 }}
          />

          {/* Colonna di fuoco */}
          <motion.div
            className="absolute bottom-0 w-20 h-40 bg-gradient-to-t from-yellow-500 via-orange-500 to-transparent rounded-full blur-md"
            initial={{ opacity: 0, scaleY: 0.5, y: 20 }}
            animate={{ 
              opacity: [0, 0.7, 0],
              scaleY: [0.5, 1.5, 0.5],
              y: [20, -20, -60]
            }}
            transition={{ duration: 2 }}
          />

          {/* Razzo principale */}
          <motion.div
            className="absolute z-10"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: -100, opacity: [0, 1, 0] }}
            transition={{ duration: 2, ease: [0.33, 1, 0.68, 1] }}
          >
            <svg width="60" height="100" viewBox="0 0 60 100" fill="none">
              {/* Corpo del razzo */}
              <motion.path
                d="M30 5C35 15 45 35 30 85C15 35 25 15 30 5Z"
                fill="#10b981"
                stroke="white"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5 }}
              />
              
              {/* Vetro cabina */}
              <motion.ellipse
                cx="30" cy="25" rx="6" ry="8"
                fill="rgba(255, 255, 255, 0.7)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              />
              
              {/* Alette */}
              <motion.path
                d="M29 60L15 80L29 75"
                fill="#0ea271"
                initial={{ opacity: 0, x: 5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              />
              <motion.path
                d="M31 60L45 80L31 75"
                fill="#0ea271"
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              />
              
              {/* Propulsore */}
              <motion.rect
                x="25" y="75" width="10" height="15" rx="5"
                fill="#0ea271"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              />

              {/* Fiamma del razzo */}
              <motion.path
                d="M30 90C35 95 37 105 30 115C23 105 25 95 30 90Z"
                initial={{ opacity: 0, scaleY: 0.5 }}
                animate={{ 
                  opacity: [0, 1, 0.8, 1, 0.7],
                  scaleY: [0.5, 1.2, 0.8, 1.1, 0.9],
                  fill: [
                    "#fbbf24", "#f59e0b", "#fbbf24", "#f97316", "#fbbf24"
                  ]
                }}
                transition={{ 
                  duration: 1.2,
                  repeat: 1,
                  repeatType: "reverse"
                }}
              />
            </svg>
          </motion.div>

          {/* Particelle di fuoco e scintille */}
          <div className="absolute bottom-0 w-20 flex justify-center">
            {Array.from({ length: 30 }).map((_, i) => {
              const size = 2 + Math.random() * 6;
              const angle = (Math.random() - 0.5) * 0.8;
              const xOffset = (Math.random() - 0.5) * 40;
              const speedMultiplier = 0.7 + Math.random() * 0.6;
              const delayMultiplier = Math.random();
              const color = Math.random() > 0.5 ? "#fbbf24" : "#f97316";
              
              return (
                <motion.div
                  key={`particle-${i}`}
                  className="absolute rounded-full"
                  style={{ 
                    width: size, 
                    height: size,
                    backgroundColor: color,
                    boxShadow: `0 0 ${size}px ${size/2}px ${color}`
                  }}
                  initial={{ x: 0, y: 0, opacity: 0 }}
                  animate={{ 
                    x: xOffset,
                    y: [0, -50 * speedMultiplier, -100 * speedMultiplier],
                    opacity: [0, 1, 0],
                    rotate: `${angle * 360}deg`
                  }}
                  transition={{ 
                    duration: 1.5 * speedMultiplier,
                    delay: delayMultiplier * 0.5,
                    ease: "easeOut"
                  }}
                />
              );
            })}
          </div>

          {/* Onda sonora */}
          {[1, 2, 3].map((_, i) => (
            <motion.div
              key={`blast-${i}`}
              className="absolute rounded-full border-2 border-green-500/30"
              style={{ width: 10, height: 10 }}
              initial={{ opacity: 0.7, scale: 1 }}
              animate={{ 
                opacity: 0,
                scale: 15,
                borderColor: ["rgba(16, 185, 129, 0.3)", "rgba(16, 185, 129, 0)"]
              }}
              transition={{ 
                duration: 1.5, 
                delay: i * 0.4 + 0.2,
                ease: "easeOut"
              }}
            />
          ))}

          {/* Stelle di fondo che passano velocemente */}
          {Array.from({ length: 15 }).map((_, i) => {
            const size = 1 + Math.random() * 2;
            const xPos = (Math.random() * 100) - 50;
            const delay = Math.random() * 0.5;
            
            return (
              <motion.div
                key={`star-${i}`}
                className="absolute rounded-full bg-white"
                style={{ 
                  width: size, 
                  height: size * 5,
                  left: `calc(50% + ${xPos}px)`,
                  opacity: 0.7
                }}
                initial={{ y: -100, opacity: 0 }}
                animate={{ 
                  y: 100,
                  opacity: [0, 0.7, 0]
                }}
                transition={{ 
                  duration: 1 + Math.random(),
                  delay,
                  ease: "linear"
                }}
              />
            );
          })}
        </div>
      );
    case 'crescita':
      // Effetto crescita premium con grafici in ascesa e particelle di successo
      return (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-30 overflow-hidden">
          {/* Sfondo con gradiente luminoso */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.15, 0],
              background: [
                "linear-gradient(135deg, rgba(249, 158, 66, 0.05) 0%, rgba(251, 191, 36, 0.05) 100%)",
                "linear-gradient(135deg, rgba(249, 158, 66, 0.15) 0%, rgba(251, 191, 36, 0.15) 100%)",
                "linear-gradient(135deg, rgba(249, 158, 66, 0.05) 0%, rgba(251, 191, 36, 0.05) 100%)"
              ]
            }}
            transition={{ duration: 2, times: [0, 0.5, 1] }}
          />
          
          {/* Flash centrale */}
          <motion.div 
            className="absolute w-80 h-80 rounded-full bg-orange-300/10 blur-xl"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1, 0], opacity: [0, 0.3, 0] }}
            transition={{ duration: 1.5 }}
          />
          
          {/* Grafico principale che sale */}
          <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-64 h-64">
            {/* Assi del grafico */}
            <motion.div
              className="absolute bottom-0 left-0 w-0.5 h-0 bg-orange-400"
              initial={{ height: 0 }}
              animate={{ height: 160 }}
              transition={{ duration: 0.5 }}
            />
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 w-0 bg-orange-400"
              initial={{ width: 0 }}
              animate={{ width: 160 }}
              transition={{ duration: 0.5 }}
            />
            
            {/* Linea di crescita esponenziale */}
            <svg width="160" height="160" viewBox="0 0 160 160" className="absolute bottom-0 left-0">
              <motion.path
                d="M0,160 C40,160 60,120 80,80 C100,40 120,10 160,0"
                fill="none"
                stroke="#f97316"
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
              
              {/* Punto finale che pulsa */}
              <motion.circle
                cx="160" cy="0" r="6"
                fill="#f97316"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 1.5, 1],
                  opacity: [0, 1, 0.8]
                }}
                transition={{ 
                  duration: 0.7, 
                  delay: 1.3
                }}
              />
            </svg>
            
            {/* Punti di dati lungo la curva */}
            {[
              { x: 40, y: 160, delay: 0.6 },
              { x: 80, y: 80, delay: 0.8 },
              { x: 120, y: 30, delay: 1.0 }
            ].map((point, i) => (
              <motion.div
                key={`data-point-${i}`}
                className="absolute rounded-full bg-orange-500"
                style={{ 
                  width: 8, 
                  height: 8,
                  left: point.x - 4,
                  bottom: point.y - 4
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 1.3, 1],
                  opacity: 1
                }}
                transition={{ 
                  duration: 0.4, 
                  delay: point.delay
                }}
              />
            ))}
            
            {/* Barre di istogramma che salgono */}
            {[
              { x: 20, width: 12, height: 40, delay: 0.4 },
              { x: 40, width: 12, height: 70, delay: 0.5 },
              { x: 60, width: 12, height: 90, delay: 0.6 },
              { x: 80, width: 12, height: 120, delay: 0.7 },
              { x: 100, width: 12, height: 140, delay: 0.8 }
            ].map((bar, i) => (
              <motion.div
                key={`bar-${i}`}
                className="absolute rounded-t-md bg-gradient-to-t from-orange-600 to-orange-400"
                style={{ 
                  width: bar.width, 
                  left: bar.x,
                  bottom: 0,
                  opacity: 0.4
                }}
                initial={{ height: 0 }}
                animate={{ height: bar.height }}
                transition={{ 
                  duration: 0.7, 
                  delay: bar.delay,
                  ease: "backOut"
                }}
              />
            ))}
          </motion.div>
          
          {/* Frecce ascendenti premium */}
          {[0, 1, 2].map(i => {
            const posX = -40 + i*40;
            return (
              <motion.div
                key={`arrow-container-${i}`}
                className="absolute"
                style={{ left: `calc(50% + ${posX}px)` }}
              >
                <motion.svg
                  width="24" height="100" viewBox="0 0 24 100" fill="none"
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: -80, opacity: [0, 1, 0] }}
                  transition={{ 
                    duration: 1.5, 
                    delay: 0.2 + i*0.2,
                    ease: "easeOut"
                  }}
                >
                  {/* Corpo freccia */}
                  <motion.path
                    d="M12 80V20"
                    stroke="#f59e0b"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                  />
                  
                  {/* Punta freccia */}
                  <motion.path
                    d="M12 20L4 30M12 20l8 10"
                    stroke="#f59e0b"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.4, delay: 0.7 }}
                  />
                  
                  {/* Effetto scia */}
                  <motion.path
                    d="M12 80V40"
                    stroke="#fdba74"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray="1 12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.6, 0] }}
                    transition={{ 
                      duration: 1,
                      delay: 0.2
                    }}
                  />
                </motion.svg>
              </motion.div>
            );
          })}
          
          {/* Particelle di crescita che volano verso l'alto */}
          {Array.from({ length: 20 }).map((_, i) => {
            const size = 2 + Math.random() * 4;
            const xPos = (Math.random() * 200) - 100;
            const delay = Math.random() * 0.8;
            const speedMultiplier = 0.7 + Math.random() * 0.6;
            const color = Math.random() > 0.6 
              ? "#fdba74" 
              : Math.random() > 0.5 
                ? "#f97316" 
                : "#fb923c";
            
            return (
              <motion.div
                key={`growth-particle-${i}`}
                className="absolute rounded-full"
                style={{ 
                  width: size, 
                  height: size,
                  left: `calc(50% + ${xPos}px)`,
                  bottom: -10,
                  backgroundColor: color,
                  boxShadow: `0 0 ${size/2}px ${size/4}px ${color}`
                }}
                initial={{ y: 0, opacity: 0, scale: 0 }}
                animate={{ 
                  y: -200 * speedMultiplier,
                  opacity: [0, 0.9, 0],
                  scale: [0, 1, 0.5]
                }}
                transition={{ 
                  duration: 1.5 * speedMultiplier,
                  delay,
                  ease: "easeOut"
                }}
              />
            );
          })}
          
          {/* Numeri che volano */}
          {["%", "+", "↑"].map((symbol, i) => {
            const xPos = (Math.random() * 120) - 60;
            const delay = 0.3 + Math.random() * 0.6;
            const size = 16 + Math.random() * 10;
            
            return (
              <motion.div
                key={`symbol-${i}`}
                className="absolute font-bold text-orange-500/80"
                style={{ 
                  left: `calc(50% + ${xPos}px)`,
                  bottom: 20 + i * 30,
                  fontSize: size
                }}
                initial={{ y: 0, opacity: 0, rotate: -10 }}
                animate={{ 
                  y: -100,
                  opacity: [0, 1, 0],
                  rotate: 10
                }}
                transition={{ 
                  duration: 1.6,
                  delay,
                  ease: "easeOut"
                }}
              >
                {symbol}
              </motion.div>
            );
          })}
        </div>
      );
    default:
      return null;
  }
};

export default ValuesCarousel;