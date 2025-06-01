import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useState, useEffect, lazy, Suspense } from 'react';
import { 
  Palette, 
  Users, 
  Brain, 
  Rocket
} from 'lucide-react';

// Lazy load dei componenti pesanti
const TeamMemberCard = lazy(() => import('../components/TeamMemberCard'));

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const teamMembers = [
    {
      name: "Diego",
      role: "Sviluppatore Web & AI",
      description: "Esperto in React, Node.js e intelligenza artificiale. Trasforma idee complesse in soluzioni digitali eleganti.",
      skills: ["React", "AI/ML", "Node.js", "Python", "TypeScript"],
      experience: "2+ anni",
      projects: "10+",
      specialty: "Architetture scalabili e soluzioni AI",
      gradient: "from-blue-500 to-purple-600",
      icon: Brain
    },
    {
      name: "Tommaso",
      role: "Sviluppatore Web & Designer",
      description: "Combina creatività e codice per creare esperienze utente straordinarie. Maestro del design system e UX.",
      skills: ["React", "UI/UX", "Figma", "CSS", "Design Systems"],
      experience: "2+ anni",
      projects: "5+",
      specialty: "Design-to-code perfetto",
      gradient: "from-purple-500 to-pink-600",
      icon: Palette
    },
    {
      name: "Simone",
      role: "Client Relations & Business",
      description: "Il ponte tra le esigenze del cliente e le soluzioni tecniche. Esperto in lead generation e crescita aziendale.",
      skills: ["Lead Generation", "CRM", "Marketing", "Sales", "Strategy"],
      experience: "6+ anni",
      projects: "10+",
      specialty: "Crescita e acquisizione clienti",
      gradient: "from-green-500 to-blue-600",
      icon: Users
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x * 0.1,
            y: mousePosition.y * 0.1,
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"
          animate={{
            x: -mousePosition.x * 0.05,
            y: -mousePosition.y * 0.05,
            scale: [1, 0.8, 1],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-[600px] flex items-center justify-center px-4 pt-16 mb-8 z-20"
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 1 }}
              className="text-6xl md:text-8xl font-bold mb-8 leading-tight"
            >
              <span className="bg-gradient-to-r from-gray-900 via-purple-800 to-purple-600 bg-clip-text text-transparent">
                Il Team che
              </span>
              <br />
              <motion.span
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 bg-clip-text text-transparent bg-[length:200%_100%]"
              >
                Trasforma Idee
              </motion.span>
              <br />
              <span className="bg-gradient-to-r from-gray-900 via-purple-800 to-purple-600 bg-clip-text text-transparent">
                in Realtà
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 1 }}
              className="text-xl md:text-2xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed"
            >
              Siamo tre professionisti appassionati che combinano <span className="text-purple-700 font-semibold">creatività</span>, 
              <span className="text-purple-700 font-semibold"> tecnologia</span> e <span className="text-purple-700 font-semibold">strategia</span> 
              per creare soluzioni digitali che superano ogni aspettativa.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Team Members Section */}
      <motion.section
        ref={teamRef}
        className="relative py-8 px-4 -mt-20 z-10"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <Suspense key={member.name} fallback={<div>Loading...</div>}>
                <TeamMemberCard member={member} />
              </Suspense>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section className="relative py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-gray-900 via-purple-800 to-purple-600 bg-clip-text text-transparent">
              Pronto a Trasformare la Tua Idea?
            </h2>
            <p className="text-xl text-gray-700 mb-12">
              Unisciti ai nostri clienti soddisfatti e porta la tua azienda al livello successivo
            </p>
            
            <motion.button
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 25px 50px rgba(139, 92, 246, 0.5)",
                y: -5
              }}
              whileTap={{ scale: 0.95 }}
              className="group relative bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-bold py-6 px-12 rounded-full transition-all duration-300 overflow-hidden text-lg"
            >
              <span className="relative z-10">Iniziamo Insieme</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              />
              <motion.div
                className="absolute left-0 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100"
                initial={{ x: -24, opacity: 0 }}
                whileHover={{ 
                  x: "calc(100% - 24px)",
                  opacity: 1,
                  transition: {
                    duration: 0.5,
                    ease: "easeInOut"
                  }
                }}
              >
                <Rocket size={24} className="text-white transform rotate-90" />
              </motion.div>
            </motion.button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default About; 