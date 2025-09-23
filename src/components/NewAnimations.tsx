import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Nuove animazioni per ValuesCarousel

// AI-powered: Cervello quantistico con intelligenza visiva
export const AIPoweredAnimation = () => {
  const [isVisible, setIsVisible] = useState(true);
  
  // Mostra l'animazione per 2 secondi e poi la nasconde
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (!isVisible) return null;
  
  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-30 overflow-hidden">
      {/* Sfondo con nebulosa digitale */}
      <motion.div 
        className="absolute w-full h-full rounded-2xl"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0, 0.3, 0],
          background: [
            "radial-gradient(circle at center, rgba(96, 165, 250, 0.1) 0%, rgba(29, 78, 216, 0) 70%)",
            "radial-gradient(circle at center, rgba(96, 165, 250, 0.3) 0%, rgba(29, 78, 216, 0.1) 70%)",
            "radial-gradient(circle at center, rgba(96, 165, 250, 0.1) 0%, rgba(29, 78, 216, 0) 70%)"
          ]
        }}
        transition={{ duration: 2, times: [0, 0.5, 1] }}
      />

      {/* Griglia neurale 3D che pulsa */}
      <motion.div 
        className="absolute w-full h-full opacity-20"
        style={{
          background: "radial-gradient(circle at center, transparent 0%, transparent 100%), repeating-linear-gradient(0deg, transparent, transparent 10px, rgba(96, 165, 250, 0.1) 10px, rgba(96, 165, 250, 0.1) 11px), repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(96, 165, 250, 0.1) 10px, rgba(96, 165, 250, 0.1) 11px)"
        }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ 
          scale: [0.9, 1.05, 0.95],
          opacity: [0, 0.2, 0]
        }}
        transition={{ duration: 2 }}
      />

      {/* Cervello quantico iperrealistico */}
      <motion.div className="relative w-56 h-56">
        {/* Aura energetica */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-gradient-to-br from-blue-500/10 to-blue-600/10 blur-xl"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: [0.8, 1.5, 1.2],
            opacity: [0, 0.8, 0.2]
          }}
          transition={{ duration: 1.8 }}
        />
        
        {/* Particelle quantiche che orbitano */}
        {Array.from({ length: 24 }).map((_, i) => {
          const orbitRadius = 70 + Math.random() * 20;
          const angle = (i / 24) * Math.PI * 2;
          const speed = 0.5 + Math.random() * 1;
          const startAngle = angle + Math.random() * Math.PI;
          const size = 1.5 + Math.random() * 2.5;
          const hue = 250 + Math.random() * 40;
          const saturation = 60 + Math.random() * 40;
          const lightness = 60 + Math.random() * 20;
          
          return (
            <motion.div
              key={`quantum-particle-${i}`}
              className="absolute rounded-full"
              style={{ 
                width: size, 
                height: size,
                left: "50%",
                top: "50%",
                backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
                boxShadow: `0 0 ${size*2}px ${size/2}px hsla(${hue}, ${saturation}%, ${lightness}%, 0.8)`
              }}
              animate={{ 
                x: orbitRadius * Math.cos(startAngle),
                y: orbitRadius * Math.sin(startAngle),
                rotate: 360 * speed
              }}
              transition={{ 
                duration: 2,
                repeat: 0,
                ease: "linear",
                x: {
                  duration: 2,
                  repeat: 0,
                  ease: "easeInOut",
                  from: orbitRadius * Math.cos(startAngle - speed * Math.PI),
                  to: orbitRadius * Math.cos(startAngle + speed * Math.PI)
                },
                y: {
                  duration: 2,
                  repeat: 0,
                  ease: "easeInOut",
                  from: orbitRadius * Math.sin(startAngle - speed * Math.PI),
                  to: orbitRadius * Math.sin(startAngle + speed * Math.PI)
                }
              }}
            />
          );
        })}
        
        {/* Cervello olografico principale */}
        <motion.div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
            {/* Emisfero sinistro */}
            <motion.path
              d="M35,75 C15,65 15,45 25,30 C35,15 50,20 60,25"
              fill="#a78bfa"
              stroke="rgba(255,255,255,0.8)"
              strokeWidth="1"
              strokeDasharray="1 3"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1 }}
            />
            
            {/* Emisfero destro */}
            <motion.path
              d="M60,25 C70,20 85,15 95,30 C105,45 105,65 85,75"
              fill="#a78bfa"
              stroke="rgba(255,255,255,0.8)"
              strokeWidth="1"
              strokeDasharray="1 3"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            />
            
            {/* Base del cervello */}
            <motion.path
              d="M35,75 C50,90 70,90 85,75"
              fill="#a78bfa"
              stroke="rgba(255,255,255,0.8)"
              strokeWidth="1"
              strokeDasharray="1 3"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
            
            {/* Connessioni interne */}
            {Array.from({ length: 8 }).map((_, i) => {
              const delay = 0.6 + i * 0.05;
              const startY = 25 + i * 5;
              return (
                <motion.path
                  key={`connection-${i}`}
                  d={`M40,${startY} C50,${startY+10} 70,${startY+10} 80,${startY}`}
                  fill="none"
                  stroke="rgba(255,255,255,0.6)"
                  strokeWidth="0.5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.6 }}
                  transition={{ duration: 0.6, delay }}
                />
              );
            })}
            
            {/* Nodi di attività cerebrale */}
            {Array.from({ length: 12 }).map((_, i) => {
              const x = 30 + Math.random() * 60;
              const y = 30 + Math.random() * 40;
              const delay = 0.8 + Math.random() * 0.5;
              const size = 1 + Math.random() * 2;
              
              return (
                <motion.circle
                  key={`node-${i}`}
                  cx={x}
                  cy={y}
                  r={size}
                  fill="white"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: [0, 1.5, 1],
                    opacity: [0, 0.9, 0.6]
                  }}
                  transition={{ duration: 0.7, delay }}
                />
              );
            })}
          </svg>
        </motion.div>
        
        {/* Interfaccia olografica HUD intorno al cervello */}
        <motion.div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-blue-400/20"
          initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
          animate={{ 
            opacity: [0, 0.7, 0],
            scale: [0.8, 1.1, 0.9],
            rotate: 360
          }}
          transition={{ duration: 2, ease: "linear" }}
        />
        
        <motion.div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full border border-blue-400/10"
          initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
          animate={{ 
            opacity: [0, 0.5, 0],
            scale: [0.8, 1.2, 1],
            rotate: -360
          }}
          transition={{ duration: 2, ease: "linear" }}
        />
        
        {/* Impulsi di dati che entrano ed escono dal cervello */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const delay = i * 0.1 + 0.5;
          
          return (
            <motion.div 
              key={`data-stream-${i}`}
              className="absolute left-1/2 top-1/2 h-0.5 bg-gradient-to-r from-blue-400/0 via-blue-500/80 to-blue-400/0"
              style={{ 
                width: 100,
                transformOrigin: "0 center",
                rotate: `${angle * (180 / Math.PI)}deg`
              }}
              initial={{ x: 0, scaleX: 0, opacity: 0 }}
              animate={{ 
                x: [0, 30, 0],
                scaleX: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{ 
                duration: 1,
                delay,
                times: [0, 0.5, 1]
              }}
            />
          );
        })}
        
        {/* Scansione radar che pulsa dal centro */}
        {[1, 2].map((_, i) => (
          <motion.div
            key={`scan-${i}`}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-500/30"
            style={{ width: 20, height: 20 }}
            initial={{ scale: 0, opacity: 0.7 }}
            animate={{ 
              scale: 4,
              opacity: 0
            }}
            transition={{ 
              duration: 1.5, 
              delay: i * 0.7,
              ease: "easeOut",
              repeat: 0
            }}
          />
        ))}
        
        {/* Codice binario che fluttua attorno */}
        {[0, 1].map((digit) => (
          Array.from({ length: 10 }).map((_, i) => {
            const distance = 80 + Math.random() * 20;
            const angle = Math.random() * Math.PI * 2;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            const opacity = 0.3 + Math.random() * 0.4;
            const size = 8 + Math.random() * 6;
            const delay = Math.random() * 1.2;
            
            return (
              <motion.div
                key={`binary-${digit}-${i}`}
                className="absolute left-1/2 top-1/2 font-mono text-blue-300 font-semibold"
                style={{ 
                  fontSize: size,
                  marginLeft: -size/4,
                  marginTop: -size/4
                }}
                initial={{ x: 0, y: 0, opacity: 0 }}
                animate={{ 
                  x,
                  y,
                  opacity: [0, opacity, 0]
                }}
                transition={{ 
                  duration: 1.5,
                  delay,
                  ease: "easeOut"
                }}
              >
                {digit}
              </motion.div>
            );
          })
        ))}
      </motion.div>
    </div>
  );
};

// Codice da zero: Costruzione epica di un universo digitale
export const CodiceZeroAnimation = () => {
  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-30 overflow-hidden">
      {/* Big bang digitale iniziale */}
      <motion.div
        className="absolute w-full h-full rounded-2xl"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0, 0.3, 0],
          background: [
            "radial-gradient(circle at center, rgba(99, 102, 241, 0.1) 0%, rgba(79, 70, 229, 0) 70%)",
            "radial-gradient(circle at center, rgba(99, 102, 241, 0.3) 0%, rgba(79, 70, 229, 0.1) 70%)",
            "radial-gradient(circle at center, rgba(99, 102, 241, 0.1) 0%, rgba(79, 70, 229, 0) 70%)"
          ]
        }}
        transition={{ duration: 2, times: [0, 0.5, 1] }}
      />
      
      {/* Esplosione di codice iniziale */}
      <motion.div
        className="absolute"
        initial={{ scale: 0, opacity: 1 }}
        animate={{ 
          scale: [0, 2, 2.5],
          opacity: [1, 0.5, 0]
        }}
        transition={{ duration: 0.8 }}
      >
        <svg width="60" height="60" viewBox="0 0 60 60">
          <motion.circle
            cx="30"
            cy="30"
            r="5"
            fill="none"
            stroke="#818cf8"
            strokeWidth="2"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
          <motion.circle
            cx="30"
            cy="30"
            r="15"
            fill="none"
            stroke="#818cf8"
            strokeWidth="1"
            strokeDasharray="2 3"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.8, times: [0, 0.5, 1] }}
          />
          <motion.circle
            cx="30"
            cy="30"
            r="25"
            fill="none"
            stroke="#818cf8"
            strokeWidth="0.5"
            strokeDasharray="1 6"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.7, 0] }}
            transition={{ duration: 0.8, times: [0, 0.5, 1], delay: 0.1 }}
          />
        </svg>
      </motion.div>
      
      {/* Universo di codice in formazione */}
      <motion.div className="relative w-64 h-64">
        {/* Linee di codice che si formano a spirale */}
        {Array.from({ length: 15 }).map((_, i) => {
          const length = 30 + Math.random() * 100;
          const angle = (i / 15) * Math.PI * 2;
          const rotate = angle * (180 / Math.PI);
          const delay = 0.2 + i * 0.03;
          const opacity = 0.3 + Math.random() * 0.6;
          const hue = 230 + Math.random() * 30;
          
          return (
            <motion.div
              key={`code-line-${i}`}
              className="absolute left-1/2 top-1/2 h-px rounded-full"
              style={{ 
                width: length,
                background: `linear-gradient(90deg, transparent, hsla(${hue}, 90%, 70%, ${opacity}), transparent)`,
                transformOrigin: "0 center",
                rotate: `${rotate}deg`,
                x: 0,
                y: 0
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ 
                scaleX: 1, 
                opacity: [0, opacity, 0]
              }}
              transition={{ 
                duration: 1.8,
                delay,
                times: [0, 0.7, 1]
              }}
            />
          );
        })}
        
        {/* Particelle di codice che emergono dal centro */}
        {Array.from({ length: 40 }).map((_, i) => {
          const size = 1 + Math.random() * 3;
          const distance = 20 + Math.random() * 100;
          const angle = Math.random() * Math.PI * 2;
          const x = Math.cos(angle) * distance;
          const y = Math.sin(angle) * distance;
          const delay = 0.4 + Math.random() * 0.8;
          const duration = 1 + Math.random() * 0.5;
          const color = Math.random() > 0.7 
            ? "#818cf8" // indigo-400
            : Math.random() > 0.5 
              ? "#a5b4fc" // indigo-300
              : "#c7d2fe"; // indigo-200
          
          return (
            <motion.div
              key={`code-particle-${i}`}
              className="absolute rounded-full"
              style={{ 
                width: size, 
                height: size,
                left: "50%",
                top: "50%",
                backgroundColor: color,
                marginLeft: -size/2,
                marginTop: -size/2,
                boxShadow: size > 2 ? `0 0 ${size}px ${size/2}px ${color}` : "none"
              }}
              initial={{ x: 0, y: 0, opacity: 0 }}
              animate={{ 
                x,
                y,
                opacity: [0, 1, 0]
              }}
              transition={{ 
                duration,
                delay,
                ease: "easeOut"
              }}
            />
          );
        })}
        
        {/* Tag HTML/CSS/JS che si formano e volano */}
        {[
          { text: "<div>", color: "#3B82F6", delay: 0.5 }, // pink-500
          { text: "function()", color: "#f59e0b", delay: 0.7 }, // amber-500
          { text: "{style}", color: "#3b82f6", delay: 0.9 }, // blue-500
          { text: "</html>", color: "#ef4444", delay: 1.1 }, // red-500
          { text: "export", color: "#10b981", delay: 1.3 } // emerald-500
        ].map((tag, i) => {
          const angle = (i / 5) * Math.PI * 2;
          const distance = 60 + Math.random() * 20;
          const x = Math.cos(angle) * distance;
          const y = Math.sin(angle) * distance;
          
          return (
            <motion.div
              key={`code-tag-${i}`}
              className="absolute font-mono text-xs whitespace-nowrap"
              style={{ 
                color: tag.color,
                left: "50%",
                top: "50%",
                textShadow: `0 0 10px ${tag.color}`
              }}
              initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
              animate={{ 
                x,
                y, 
                opacity: [0, 1, 0],
                scale: [0, 1, 0.8]
              }}
              transition={{ 
                duration: 1.5,
                delay: tag.delay,
                ease: [0.16, 1, 0.3, 1]
              }}
            >
              {tag.text}
            </motion.div>
          );
        })}
        
        {/* Struttura di codice principale che si forma */}
        <motion.div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
            {/* Griglia di base */}
            <motion.path
              d="M30,30 L90,30 L90,90 L30,90 Z"
              fill="none"
              stroke="rgba(129, 140, 248, 0.5)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
            
            {/* Blocchi di codice che si formano */}
            <motion.rect
              x="40" y="40" width="40" height="10"
              rx="2"
              fill="rgba(99, 102, 241, 0.3)"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.7 }}
              style={{ transformOrigin: "left center" }}
            />
            
            <motion.rect
              x="45" y="55" width="30" height="8"
              rx="2"
              fill="rgba(99, 102, 241, 0.3)"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.9 }}
              style={{ transformOrigin: "left center" }}
            />
            
            <motion.rect
              x="50" y="68" width="20" height="8"
              rx="2"
              fill="rgba(99, 102, 241, 0.3)"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.2, delay: 1.1 }}
              style={{ transformOrigin: "left center" }}
            />
            
            {/* Simboli di codice che appaiono */}
            <motion.text
              x="35" y="35"
              fontSize="8"
              fill="#c7d2fe"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 1.3 }}
            >{"<>"}</motion.text>
            
            <motion.text
              x="85" y="85"
              fontSize="8"
              fill="#c7d2fe"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 1.4 }}
            >{"</>"}</motion.text>
          </svg>
        </motion.div>
        
        {/* Particelle binarie fluttuanti nell'ambiente */}
        {Array.from({ length: 20 }).map((_, i) => {
          const digit = Math.random() > 0.5 ? "0" : "1";
          const size = 8 + Math.random() * 6;
          const opacity = 0.3 + Math.random() * 0.4;
          const distance = 80 + Math.random() * 40;
          const angle = Math.random() * Math.PI * 2;
          const x = Math.cos(angle) * distance;
          const y = Math.sin(angle) * distance;
          const delay = 0.5 + Math.random() * 1;
          
          return (
            <motion.div
              key={`binary-float-${i}`}
              className="absolute font-mono text-indigo-300"
              style={{
                left: "50%",
                top: "50%",
                fontSize: size,
                opacity,
                marginLeft: -size/4,
                marginTop: -size/2
              }}
              initial={{ x: 0, y: 0, opacity: 0 }}
              animate={{ 
                x,
                y,
                opacity: [0, opacity, 0]
              }}
              transition={{ 
                duration: 1.5,
                delay,
                ease: "easeOut"
              }}
            >
              {digit}
            </motion.div>
          );
        })}
        
        {/* Cubo 3D rotante finale */}
        <motion.div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16"
          style={{ perspective: 800 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <motion.div
            className="relative w-full h-full"
            style={{ transformStyle: "preserve-3d" }}
            initial={{ rotateY: 0, rotateX: 0 }}
            animate={{ rotateY: 360, rotateX: 360 }}
            transition={{ duration: 3, ease: "linear", repeat: 0 }}
          >
            {/* Facce del cubo */}
            {[
              { transform: 'rotateY(0deg) translateZ(8px)', background: 'rgba(99, 102, 241, 0.4)' },
              { transform: 'rotateY(180deg) translateZ(8px)', background: 'rgba(99, 102, 241, 0.4)' },
              { transform: 'rotateY(90deg) translateZ(8px)', background: 'rgba(129, 140, 248, 0.4)' },
              { transform: 'rotateY(-90deg) translateZ(8px)', background: 'rgba(129, 140, 248, 0.4)' },
              { transform: 'rotateX(90deg) translateZ(8px)', background: 'rgba(165, 180, 252, 0.4)' },
              { transform: 'rotateX(-90deg) translateZ(8px)', background: 'rgba(165, 180, 252, 0.4)' }
            ].map((face, i) => (
              <motion.div
                key={`cube-face-${i}`}
                className="absolute w-full h-full border border-indigo-400/50 flex items-center justify-center text-xs font-mono text-indigo-200"
                style={{ 
                  ...face,
                  backfaceVisibility: 'hidden'
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 1.2 + i * 0.1 }}
              >
                {i % 2 === 0 ? '</>' : '{}'}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}; 