import { motion, useScroll, useSpring } from 'framer-motion';
import { useEffect } from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import SpecialOffers from '../components/SpecialOffers';
import PriceList from '../components/PriceList';

const Landing = () => {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Smooth scroll polyfill per browser che non lo supportano
    import('smoothscroll-polyfill').then(smoothscroll => {
      smoothscroll.polyfill();
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-950 to-purple-900">
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-purple-400 origin-left z-50"
        style={{ scaleX }}
      />

      <Hero />      
      <About />
      <SpecialOffers />
      <PriceList />
    </div>
  );
};

export default Landing; 