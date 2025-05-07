import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import '../styles/locomotive-scroll.css';

const Landing = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Effetto di parallasse per gli elementi
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -25]);

  useEffect(() => {
    if (!scrollRef.current) return;

    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      multiplier: 1,
      class: 'is-revealed',
      lerp: 0.1, // Linear interpolation, più basso = più fluido
      smartphone: {
        smooth: true,
        //multiplier: 1
      },
      tablet: {
        smooth: true,
        breakpoint: 0
        //multiplier: 1
      }
    });

    return () => {
      scroll.destroy();
    };
  }, []);

  return (
    <div 
      ref={scrollRef}
      data-scroll-container
      className="min-h-screen bg-gradient-to-b from-dark to-dark-lighter"
    >
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent origin-left z-50"
        style={{ scaleX }}
      />

      {/* Hero Section */}
      <section 
        data-scroll-section
        className="h-screen flex items-center justify-center px-4 relative overflow-hidden"
      >
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent opacity-50"
          style={{ y: y1 }}
        />
        <div className="text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ y: y2 }}
            className="text-5xl md:text-7xl font-bold text-light mb-6"
          >
            Benvenuti nel Nostro Studio
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ y: y3 }}
            className="text-xl md:text-2xl text-light-dark mb-8"
          >
            Creiamo esperienze digitali straordinarie
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-accent hover:bg-accent/90 text-light font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-accent/25"
          >
            Scopri di più
          </motion.button>
        </div>
      </section>

      {/* About Section */}
      <section 
        data-scroll-section
        className="py-20 px-4"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-light mb-6">Chi Siamo</h2>
            <p className="text-lg text-light-dark">
              Siamo un team di professionisti appassionati di design e tecnologia,
              dedicati a creare soluzioni digitali innovative e su misura.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {['Design', 'Sviluppo', 'Innovazione'].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-dark-lighter p-6 rounded-lg shadow-lg border border-dark-light/20 hover:border-accent/50 transition-colors duration-300"
              >
                <h3 className="text-xl font-bold text-light mb-4">{item}</h3>
                <p className="text-light-dark">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing; 