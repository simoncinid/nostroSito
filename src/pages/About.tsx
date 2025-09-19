import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect, lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { 
  Palette, 
  //Users, 
  Brain,
  X
} from 'lucide-react';

// Lazy load dei componenti pesanti
const TeamMemberCard = lazy(() => import('../components/TeamMemberCard'));

const About = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedMember, setSelectedMember] = useState<null | typeof teamMembers[0]>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      name: t('about.team.members.diego.name'),
      role: t('about.team.members.diego.role'),
      description: t('about.team.members.diego.description'),
      skills: ["React", "AI/ML", "Node.js", "Python", "TypeScript"],
      experience: "2+ anni",
      projects: "20+",
      specialty: t('about.team.members.diego.specialty'),
      gradient: "from-blue-500 to-purple-600",
      roleGradient: "from-blue-500 to-purple-600",
      icon: Brain,
      image: "/images/diego.png"
    },
    {
      name: t('about.team.members.tommaso.name'),
      role: t('about.team.members.tommaso.role'),
      description: t('about.team.members.tommaso.description'),
      skills: ["React", "UI/UX", "Figma", "CSS", "Design Systems"],
      experience: "2+ anni",
      projects: "20+",
      specialty: t('about.team.members.tommaso.specialty'),
      gradient: "from-purple-100 to-pink-600",
      roleGradient: "from-purple-500 to-pink-600",
      icon: Palette,
      image: "/images/tommaso.png"
    },
    {
      name: "Francesco",
      role: "Sviluppatore Web e Software & Designer",
      description: "Specialista in sviluppo full-stack e design di interfacce. Combina competenze tecniche avanzate con creatività per creare soluzioni digitali complete e innovative.",
      skills: ["React", "Node.js", "SQL", "Frontend", "Backend"],
      experience: "2+ anni",
      projects: "20+",
      specialty: "Sviluppo full-stack e architetture scalabili",
      gradient: "from-blue-500 to-purple-600",
      roleGradient: "from-blue-500 to-purple-600",
      icon: Brain,
      image: "/images/francesco.JPG"
    },
    {
      name: "Andrea",
      role: "Sviluppatore Web e Social Media Manager",
      description: "Esperto in sviluppo web e gestione strategica dei social media. Crea soluzioni digitali che si integrano perfettamente con strategie di marketing e comunicazione online.",
      skills: ["React", "Backend", "Python", "Social Media", "Content Strategy"],
      experience: "2+ anni",
      projects: "20+",
      specialty: "Integrazione web e strategie social",
      gradient: "from-purple-100 to-pink-600",
      roleGradient: "from-purple-500 to-pink-600",
      icon: Palette,
      image: "/images/andrea.jpeg"
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-white overflow-hidden">
      <Helmet>
        <title>{t('about.meta.title')}</title>
        <meta name="description" content={t('about.meta.description')} />
      </Helmet>
      
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
        className="relative h-[500px] flex items-center justify-center px-4 pt-16 md:pt-16 mb-6 z-20"
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 1 }}
              className="text-4xl md:text-7xl font-bold mb-8 leading-tight"
            >
              <span className="bg-gradient-to-r from-gray-900 via-purple-800 to-purple-600 bg-clip-text text-transparent">
                {t('about.hero.title1')}
              </span>
              <br />
              <motion.span
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 bg-clip-text text-transparent bg-[length:200%_100%]"
              >
                {t('about.hero.title2')}
              </motion.span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 1 }}
              className="text-lg md:text-xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed"
            >
              {t('about.hero.subtitle.part1')}<span className="text-purple-700 font-semibold">{t('about.hero.subtitle.part2')}</span>{t('about.hero.subtitle.part3')}
              <span className="text-purple-700 font-semibold">{t('about.hero.subtitle.part4')}</span>{t('about.hero.subtitle.part5')}<span className="text-purple-700 font-semibold">{t('about.hero.subtitle.part6')}</span>{t('about.hero.subtitle.part7')}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Team Members Section */}
      <motion.section
        ref={teamRef}
        className="relative py-8 px-4 -mt-20 z-10"
      >
        <div className="flex justify-center">
          <div className="w-full" style={{ maxWidth: '80vw' }}>
          <div className="text-center mb-8 md:mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 1 }}
              className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 mt-20 md:mt-16 bg-gradient-to-r from-gray-900 via-purple-800 to-purple-600 bg-clip-text text-transparent"
            >
              {t('about.team.title')}
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 justify-center items-stretch">
            {teamMembers.map((member) => (
              <Suspense key={member.name} fallback={<div>Loading...</div>}>
                <TeamMemberCard 
                  member={member} 
                  onClick={() => {
                    setSelectedMember(member);
                    setIsModalOpen(true);
                  }}
                />
              </Suspense>
            ))}
          </div>
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
              {t('about.cta.title')}
            </h2>
            <p className="text-xl text-gray-700 mb-12">
              {t('about.cta.subtitle')}
            </p>
            
            <a
              href="https://wa.me/393391797616?text=Ciao,%20voglio%20iniziare%20un%20progetto%20con%20voi!"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-bold py-6 px-12 rounded-full transition-all duration-300 overflow-hidden text-lg inline-block"
            >
              <span className="relative z-10">{t('about.cta.button')}</span>
              <span className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <span className="absolute inset-0 bg-gradient-to-r from-purple-400/0 via-white/20 to-purple-400/0 opacity-0 group-hover:opacity-100 pointer-events-none" />
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* Modale membro team (solo mobile) */}
      {selectedMember && isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Header con gradiente */}
            <div className={`bg-gradient-to-r ${selectedMember.gradient} p-6 flex items-center justify-between`}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <selectedMember.icon size={28} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{selectedMember.name}</h3>
                  <p className="text-white/80 text-sm">{selectedMember.role}</p>
                </div>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-white/80 hover:text-white">
                <X size={24} />
              </button>
            </div>
            {/* Contenuto */}
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              <p className="text-gray-600 mb-4">{selectedMember.description}</p>
              <h4 className="font-semibold text-gray-900 mb-2">{t('about.team.labels.skills')}</h4>
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedMember.skills.map((skill, idx) => (
                  <span key={idx} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">{skill}</span>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{selectedMember.experience}</div>
                  <div className="text-gray-600 text-sm">{t('about.team.labels.experience')}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{selectedMember.projects}</div>
                  <div className="text-gray-600 text-sm">{t('about.team.labels.projects')}</div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-gray-600 text-sm font-medium">{t('about.team.labels.specialty')}</div>
                <div className="text-gray-900 font-semibold">{selectedMember.specialty}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default About; 