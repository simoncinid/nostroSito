import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { 
  Code, 
  Palette, 
  Users, 
  Brain, 
  Rocket, 
  Star, 
  Heart,
  TrendingUp,
  Shield,
  Clock,
  CheckCircle
} from 'lucide-react';

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const teamInView = useInView(teamRef, { once: true, amount: 0.2 });
  const valuesInView = useInView(valuesRef, { once: true, amount: 0.2 });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.95, 0.9]);

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
      experience: "5+ anni",
      projects: "200+",
      specialty: "Architetture scalabili e soluzioni AI",
      gradient: "from-blue-500 to-purple-600",
      icon: Brain
    },
    {
      name: "Tommaso",
      role: "Sviluppatore Web & Designer",
      description: "Combina creatività e codice per creare esperienze utente straordinarie. Maestro del design system e UX.",
      skills: ["React", "UI/UX", "Figma", "CSS", "Design Systems"],
      experience: "4+ anni",
      projects: "180+",
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
      projects: "300+",
      specialty: "Crescita e acquisizione clienti",
      gradient: "from-green-500 to-blue-600",
      icon: Users
    }
  ];

  const companyValues = [
    {
      icon: Code,
      title: "Codice da Zero",
      description: "Ogni progetto è sviluppato da zero, senza template. Codice pulito, scalabile e ottimizzato.",
      color: "from-blue-400 to-blue-600"
    },
    {
      icon: Brain,
      title: "AI-Powered",
      description: "Integriamo intelligenza artificiale in ogni soluzione per automatizzare e ottimizzare i processi.",
      color: "from-purple-400 to-purple-600"
    },
    {
      icon: Rocket,
      title: "Performance",
      description: "Velocità e prestazioni sono al centro di ogni nostro sviluppo. Risultati misurabili garantiti.",
      color: "from-green-400 to-green-600"
    },
    {
      icon: Heart,
      title: "Passione",
      description: "Amiamo quello che facciamo. Ogni progetto è trattato come se fosse il nostro primo e più importante.",
      color: "from-red-400 to-red-600"
    },
    {
      icon: Shield,
      title: "Affidabilità",
      description: "Sicurezza, backup e manutenzione continua. Il tuo progetto è sempre protetto e aggiornato.",
      color: "from-indigo-400 to-indigo-600"
    },
    {
      icon: TrendingUp,
      title: "Crescita",
      description: "Non solo sviluppiamo, ma aiutiamo la tua azienda a crescere con strategie digitali vincenti.",
      color: "from-orange-400 to-orange-600"
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
      <motion.section
        ref={heroRef}
        style={{ y, opacity, scale }}
        className="relative min-h-screen flex items-center justify-center px-4 pt-20"
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
              className="text-xl md:text-2xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              Siamo tre professionisti appassionati che combinano <span className="text-purple-700 font-semibold">creatività</span>, 
              <span className="text-purple-700 font-semibold"> tecnologia</span> e <span className="text-purple-700 font-semibold">strategia</span> 
              per creare soluzioni digitali che superano ogni aspettativa.
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section
        ref={teamRef}
        className="relative py-8 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 100 }}
                animate={teamInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.2, duration: 1, type: "spring", stiffness: 100 }}
                whileHover={{ 
                  y: -20, 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="group relative"
              >
                {/* Card Background with Glassmorphism */}
                <div className="relative bg-white/80 backdrop-blur-xl border border-purple-200 rounded-3xl p-8 h-full overflow-hidden group-hover:border-purple-300 group-hover:shadow-lg transition-all duration-500">
                  {/* Animated Background Gradient */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                    initial={false}
                  />

                  {/* Profile Image Placeholder */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="relative w-32 h-32 mx-auto mb-6"
                  >
                    <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center overflow-hidden border-4 border-purple-200 group-hover:border-purple-300 transition-all duration-300">
                      <member.icon size={48} className="text-white" />
                    </div>
                  </motion.div>

                  {/* Member Info */}
                  <div className="text-center mb-6">
                    <motion.h3
                      initial={{ opacity: 0 }}
                      animate={teamInView ? { opacity: 1 } : {}}
                      transition={{ delay: index * 0.2 + 0.5 }}
                      className="text-2xl font-bold text-gray-900 mb-2"
                    >
                      {member.name}
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={teamInView ? { opacity: 1 } : {}}
                      transition={{ delay: index * 0.2 + 0.6 }}
                      className={`text-lg font-semibold bg-gradient-to-r ${member.gradient} bg-clip-text text-transparent mb-4`}
                    >
                      {member.role}
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={teamInView ? { opacity: 1 } : {}}
                      transition={{ delay: index * 0.2 + 0.7 }}
                      className="text-gray-600 leading-relaxed mb-6"
                    >
                      {member.description}
                    </motion.p>
                  </div>

                  {/* Skills */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={teamInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: index * 0.2 + 0.8 }}
                    className="mb-6"
                  >
                    <h4 className="text-gray-900 font-semibold mb-3">Competenze:</h4>
                    <div className="flex flex-wrap gap-2">
                      {member.skills.map((skill, skillIndex) => (
                        <motion.span
                          key={skillIndex}
                          initial={{ scale: 0 }}
                          animate={teamInView ? { scale: 1 } : {}}
                          transition={{ delay: index * 0.2 + 0.9 + skillIndex * 0.1 }}
                          whileHover={{ scale: 1.1 }}
                          className="px-3 py-1 bg-purple-100 border border-purple-200 rounded-full text-purple-700 text-sm hover:bg-purple-200 transition-all duration-300"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Stats */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={teamInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: index * 0.2 + 1 }}
                    className="grid grid-cols-2 gap-4 mb-6"
                  >
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{member.experience}</div>
                      <div className="text-gray-600 text-sm">Esperienza</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{member.projects}</div>
                      <div className="text-gray-600 text-sm">Progetti</div>
                    </div>
                  </motion.div>

                  {/* Specialty */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={teamInView ? { opacity: 1 } : {}}
                    transition={{ delay: index * 0.2 + 1.1 }}
                    className="text-center"
                  >
                    <div className="text-gray-600 text-sm font-medium">Specialità:</div>
                    <div className="text-gray-900 font-semibold">{member.specialty}</div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Values Section */}
      <motion.section
        ref={valuesRef}
        className="relative py-8 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-purple-800 to-purple-600 bg-clip-text text-transparent">
              I Nostri Valori
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {companyValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={valuesInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: index * 0.1, duration: 0.8, type: "spring", stiffness: 100 }}
                whileHover={{ 
                  y: -10, 
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
                className="group relative"
              >
                <div className="bg-white/80 backdrop-blur-xl border border-purple-200 rounded-2xl p-8 h-full hover:border-purple-300 hover:shadow-lg transition-all duration-500 overflow-hidden">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-lg transition-all duration-300`}
                  >
                    <value.icon size={32} className="text-white" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>

                  {/* Hover Effect */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`}
                    initial={false}
                  />
                </div>
              </motion.div>
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
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2"
              >
                <Rocket size={24} className="text-white" />
              </motion.div>
            </motion.button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default About; 