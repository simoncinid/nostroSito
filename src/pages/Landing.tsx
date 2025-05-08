import { motion, useScroll, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import Hero from '../components/Hero';
import About from '../components/About';
import SpecialOffers from '../components/SpecialOffers';
import PriceList from '../components/PriceList';
import '../styles/locomotive-scroll.css';

const Landing = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    if (!scrollRef.current) return;

    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      multiplier: 1,
      class: 'is-revealed',
      lerp: 0.1,
      smartphone: {
        smooth: true,
      },
      tablet: {
        smooth: true,
        breakpoint: 0
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

      <Hero />      
      <About />
      <SpecialOffers />
      <PriceList />
    </div>
  );
};

export default Landing; 