import { motion, useScroll, useTransform } from 'framer-motion';

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
        style={{ y: y1, willChange: "transform" }}
      />
      <div className="text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          {/*<img 
            src={logo} 
            alt="Webbitz Logo" 
            className="h-32 md:h-40 mx-auto"
            style={{ filter: 'drop-shadow(0 0 20px rgba(139, 92, 246, 0.3))' }}
          />*/}
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ y: y2, willChange: "transform, opacity" }}
          className="text-5xl md:text-7xl font-bold text-light mb-6"
        >
          Webbitz ti da il benvenuto
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ y: y3, willChange: "transform, opacity" }}
          className="text-xl md:text-2xl text-light-dark mb-8"
        >
          Creiamo esperienze digitali straordinarie
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-accent hover:bg-accent/90 text-light font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-accent/25"
          style={{ willChange: "transform, opacity" }}
        >
          Scopri di più
        </motion.button>
      </div>
    </section>
  );
};

export default Hero; 