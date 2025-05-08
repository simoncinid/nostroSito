import { motion } from 'framer-motion';
import { useScroll, useTransform } from 'framer-motion';

const Hero = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -25]);

  return (
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
  );
};

export default Hero; 