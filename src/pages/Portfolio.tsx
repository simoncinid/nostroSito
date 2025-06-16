import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  ExternalLink, 
  Github, 
  Eye, 
  X, 
  Code,
  Bot,
  Zap,
  Database,
  Layers,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface Project {
  id: number;
  titleKey: string;
  category: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  year: string;
  team: string[];
  gradient: string;
  icon: any;
  isInternational?: boolean;
  isHighTraffic?: boolean;
}

const Portfolio = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;

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

  const categories = [
    { id: 'all', nameKey: 'all', icon: Layers },
    { id: 'web', nameKey: 'web', icon: Code },
    { id: 'ai', nameKey: 'ai', icon: Bot },
    { id: 'automation', nameKey: 'automation', icon: Zap },
    { id: 'database', nameKey: 'database', icon: Database }
  ];

  const projects: Project[] = [
    {
      id: 1,
      titleKey: "aiFreightHub",
      category: "automation",
      image: "/images/ChatBot_RNDhub.png",
      technologies: ["Python", "SMTP Email Automation", "API Integration", "Google Cloud Services"],
      liveUrl: "https://rndhub.io/",
      year: "2024",
      team: ["Diego", "Tommaso"],
      gradient: "from-green-500 to-blue-600",
      icon: Zap,
      isInternational: true
    },
    {
      id: 2,
      titleKey: "thinkGoodWebsite",
      category: "web",
      image: "/images/thinkgood.png",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Node.js", "MongoDB"],
      liveUrl: "https://thinkgoodmusic.com",
      year: "2024",
      team: ["Diego", "Tommaso"],
      gradient: "from-blue-500 to-purple-600",
      icon: Code,
      isInternational: false
    },
    {
      id: 3,
      titleKey: "thinkGoodChatbot",
      category: "ai",
      image: "/images/thinkgood.png",
      technologies: ["OpenAI GPT-4", "JavaScript", "React", "Node.js", "CRM Integration", "Analytics"],
      liveUrl: "https://thinkgoodmusic.com",
      year: "2024",
      team: ["Diego", "Simone"],
      gradient: "from-purple-500 to-pink-600",
      icon: Bot,
      isHighTraffic: true
    },
    {
      id: 4,
      titleKey: "thresholdWebsite",
      category: "web",
      image: "/images/Threshold.png",
      technologies: ["React", "Node.js", "TypeScript", "PostgreSQL", "Stripe", "AWS"],
      liveUrl: "https://www.threshold.coach/",
      year: "2024",
      team: ["Diego", "Tommaso", "Simone"],
      gradient: "from-blue-500 to-purple-600",
      icon: Code,
      isInternational: true
    },
    {
      id: 5,
      titleKey: "thresholdAI",
      category: "ai",
      image: "/images/Threshold.png",
      technologies: ["OpenAI GPT-4", "Anthropic Claude", "Python", "Vector DB", "React", "Node.js"],
      liveUrl: "https://www.threshold.coach/",
      year: "2024",
      team: ["Diego", "Simone"],
      gradient: "from-purple-500 to-pink-600",
      icon: Bot,
      isInternational: true
    },
    {
      id: 6,
      titleKey: "thresholdDatabase",
      category: "database",
      image: "/images/Threshold.png",
      technologies: ["PostgreSQL", "Redis", "MongoDB", "AWS RDS", "Data Analytics", "Backup Systems"],
      liveUrl: "https://www.threshold.coach/",
      year: "2024",
      team: ["Diego", "Tommaso"],
      gradient: "from-green-400 to-blue-600",
      icon: Database,
      isInternational: true
    },
    {
      id: 7,
      titleKey: "welpyChatbot",
      category: "ai",
      image: "/images/ChatBot_welpy.png",
      technologies: ["OpenAI GPT-4", "JavaScript", "React", "Node.js", "CRM Integration", "Analytics"],
      liveUrl: "https://www.welpy.it/",
      year: "2024",
      team: ["Diego", "Simone"],
      gradient: "from-orange-500 to-red-600",
      icon: Bot,
      isHighTraffic: true
    },
    {
      id: 8,
      titleKey: "admissionHub",
      category: "web",
      image: "/images/AdmissionHub.png",
      technologies: ["React", "Node.js", "TypeScript", "MongoDB", "Stripe", "AWS"],
      liveUrl: "https://theadmissionhub.com",
      year: "2024",
      team: ["Diego", "Tommaso", "Simone"],
      gradient: "from-blue-400 to-cyan-600",
      icon: Code,
      isInternational: true
    },
    {
      id: 9,
      titleKey: "vistamare",
      category: "web",
      image: "/images/Vistamare.png",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Node.js", "MongoDB"],
      liveUrl: "https://vistamare.vercel.app/",
      year: "2024",
      team: ["Diego", "Tommaso"],
      gradient: "from-purple-500 to-pink-600",
      icon: Code,
      isInternational: false
    }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  );

  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  React.useEffect(() => {
    if (portfolioRef.current) {
      portfolioRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentPage]);

  return (
    <div ref={containerRef} className="min-h-screen bg-white overflow-hidden">
      <Helmet>
        <title>{t('portfolio.meta.title')}</title>
        <meta name="description" content={t('portfolio.meta.description')} />
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
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 1 }}
              className="text-4xl md:text-8xl font-bold mb-8 leading-tight"
            >
              <span className="bg-gradient-to-r from-gray-900 via-purple-800 to-purple-600 bg-clip-text text-transparent">
                {t('portfolio.hero.title')}
              </span>
              <br />
              <motion.span
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 bg-clip-text text-transparent bg-[length:200%_100%]"
              >
                {t('portfolio.hero.titleAnimated')}
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 1 }}
              className="text-xl md:text-2xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed"
            >
              {t('portfolio.hero.subtitle.part1')}
              <span className="text-purple-700 font-semibold">{t('portfolio.hero.subtitle.part2')}</span>
              {t('portfolio.hero.subtitle.part3')}
              <span className="hidden md:inline">
                {t('portfolio.hero.subtitle.part4')}
                <span className="text-purple-700 font-semibold">{t('portfolio.hero.subtitle.part5')}</span>
                {t('portfolio.hero.subtitle.part6')}
              </span>
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Section */}
      <motion.section
        ref={portfolioRef}
        className="relative py-4 md:py-8 px-4"
      >
        <div className="max-w-7xl mx-auto">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="w-full grid grid-cols-1 md:flex md:flex-wrap justify-center gap-4">
              {/* Mobile: 'Tutti i Progetti' sopra, largo il doppio, gli altri 2x2 sotto */}
              <div className="grid grid-cols-2 gap-2 mb-2 md:hidden">
                <button
                  key={categories[0].id}
                  onClick={() => setSelectedCategory(categories[0].id)}
                  className={`col-span-2 flex items-center justify-center gap-1 px-3 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    selectedCategory === categories[0].id
                      ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg'
                      : 'bg-white/80 backdrop-blur-lg border border-purple-200 text-gray-700 hover:border-purple-300 hover:shadow-md'
                  }`}
                  style={{ minWidth: 0 }}
                >
                  {React.createElement(categories[0].icon, { size: 16 })}
                  <span className="whitespace-nowrap overflow-hidden text-ellipsis">{t(`portfolio.categories.${categories[0].nameKey}`)}</span>
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2 md:hidden">
                {categories.slice(1).map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center justify-center gap-1 px-3 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg'
                        : 'bg-white/80 backdrop-blur-lg border border-purple-200 text-gray-700 hover:border-purple-300 hover:shadow-md'
                    }`}
                  >
                    {React.createElement(category.icon, { size: 16 })}
                    <span className="whitespace-nowrap overflow-hidden text-ellipsis">{t(`portfolio.categories.${category.nameKey}`)}</span>
                  </button>
                ))}
              </div>
              
              {/* Versione desktop */}
              {categories.map(category => (
                <button
                  key={`desktop-${category.id}`}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`hidden md:flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg'
                      : 'bg-white/80 backdrop-blur-lg border border-purple-200 text-gray-700 hover:border-purple-300 hover:shadow-md'
                  }`}
                >
                  <category.icon size={18} />
                  {t(`portfolio.categories.${category.nameKey}`)}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8"
          >
            {paginatedProjects.map((project) => {
              const projectData = t(`portfolio.projects.${project.titleKey}`, { returnObjects: true }) as any;
              
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="group relative bg-white/80 backdrop-blur-xl border border-purple-200 rounded-2xl md:rounded-3xl overflow-hidden hover:border-purple-300 hover:shadow-lg transition-all duration-500"
                >
                  {/* Project Image */}
                  <div className="relative h-32 md:h-48 overflow-hidden">
                    <motion.img
                      src={project.image}
                      alt={projectData.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    {/* Category Badge */}
                    <div className="absolute top-2 left-2 md:top-4 md:left-4">
                      <div className={`flex items-center gap-2 px-2 py-0.5 md:px-3 md:py-1 bg-gradient-to-r ${project.gradient} rounded-full text-white font-semibold`}>
                        <project.icon size={12} className="md:hidden" />
                        <project.icon size={14} className="hidden md:inline" />
                        <span
                          className="truncate"
                          style={{ fontSize: 'clamp(0.75rem, 2.5vw, 1rem)', maxWidth: '110px' }}
                        >
                          {t(`portfolio.categories.${categories.find(cat => cat.id === project.category)?.nameKey}`)}
                        </span>
                      </div>
                    </div>
                    {/* Action Buttons */}
                    <div className="absolute bottom-2 right-2 flex gap-2 md:bottom-4 md:right-4">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setSelectedProject(project)}
                        className="w-8 h-8 md:w-10 md:h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:bg-white transition-colors duration-300"
                      >
                        <Eye size={16} className="md:hidden" />
                        <Eye size={18} className="hidden md:inline" />
                      </motion.button>
                      {project.liveUrl && (
                        <motion.a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-8 h-8 md:w-10 md:h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:bg-white transition-colors duration-300"
                        >
                          <ExternalLink size={16} className="md:hidden" />
                          <ExternalLink size={18} className="hidden md:inline" />
                        </motion.a>
                      )}
                    </div>
                  </div>
                  {/* Project Info */}
                  <div className="p-3 md:p-6 flex flex-col items-start justify-between">
                    <h3
                      className="font-bold text-gray-900 mb-0 md:mb-2 group-hover:text-purple-700 transition-colors duration-300 truncate w-full"
                      style={{ fontSize: 'clamp(0.95rem, 2.8vw, 1.25rem)' }}
                    >
                      {projectData.title}
                    </h3>
                    {/* Solo su desktop */}
                    <div className="hidden md:block w-full">
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {projectData.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, 3).map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>{projectData.client}</span>
                        <span>{project.year}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* PAGINATION CONTROLS */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8 select-none">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className={`px-3 py-2 rounded-full font-semibold border transition-all duration-300 flex items-center gap-1
                  ${currentPage === 1
                    ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                    : 'bg-white border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300'}
                `}
              >
                <ChevronLeft size={18} />
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-2 rounded-full font-bold transition-all duration-300 mx-1
                    ${currentPage === i + 1
                      ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg'
                      : 'bg-white border border-purple-200 text-gray-700 hover:border-purple-300 hover:bg-purple-50'}
                  `}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className={`px-3 py-2 rounded-full font-semibold border transition-all duration-300 flex items-center gap-1
                  ${currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                    : 'bg-white border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300'}
                `}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
      </motion.section>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="relative">
                <img
                  src={selectedProject.image}
                  alt={t(`portfolio.projects.${selectedProject.titleKey}.title`)}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:bg-white transition-colors duration-300"
                >
                  <X size={20} />
                </button>

                <div className="absolute bottom-6 left-6 text-white">
                  <h2 className="text-3xl font-bold mb-2">{t(`portfolio.projects.${selectedProject.titleKey}.title`)}</h2>
                  <p className="text-white/90">{t(`portfolio.projects.${selectedProject.titleKey}.client`)} • {selectedProject.year}</p>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Main Content */}
                  <div className="lg:col-span-2">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('portfolio.modal.projectDescription')}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {t(`portfolio.projects.${selectedProject.titleKey}.longDescription`)}
                    </p>

                    <h4 className="text-xl font-bold text-gray-900 mb-4">{t('portfolio.modal.mainFeatures')}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                      {(t(`portfolio.projects.${selectedProject.titleKey}.features`, { returnObjects: true }) as string[]).map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-gray-600">
                          <div className="w-2 h-2 bg-purple-500 rounded-full" />
                          {feature}
                        </div>
                      ))}
                    </div>

                    <h4 className="text-xl font-bold text-gray-900 mb-4">{t('portfolio.modal.technologiesUsed')}</h4>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {selectedProject.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-2xl p-6">
                      <h4 className="font-bold text-gray-900 mb-4">{t('portfolio.modal.projectDetails')}</h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">{t('portfolio.modal.client')}</span>
                          <span className="font-semibold text-gray-900">{t(`portfolio.projects.${selectedProject.titleKey}.client`)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">{t('portfolio.modal.year')}</span>
                          <span className="font-semibold text-gray-900">{selectedProject.year}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">{t('portfolio.modal.development')}</span>
                          <span className="font-semibold text-gray-900">{t(`portfolio.projects.${selectedProject.titleKey}.duration`)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">{t('portfolio.modal.team')}</span>
                          <span className="font-semibold text-gray-900">{selectedProject.team.join(', ')}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-6">
                      <h4 className="font-bold text-gray-900 mb-4">{t('portfolio.modal.results')}</h4>
                      <div className="space-y-4">
                        {(t(`portfolio.projects.${selectedProject.titleKey}.results`, { returnObjects: true }) as any[]).map((result, index) => (
                          <div key={index} className="text-center">
                            <div className="text-2xl font-bold text-purple-600 mb-1">{result.value}</div>
                            <div className="text-sm font-semibold text-gray-900 mb-1">{result.metric}</div>
                            <div className="text-xs text-gray-600">{result.description}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      {selectedProject.liveUrl && (
                        <a
                          href={selectedProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <ExternalLink size={18} />
                          {t('portfolio.modal.visitSite')}
                        </a>
                      )}
                      {selectedProject.githubUrl && (
                        <a
                          href={selectedProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full bg-gray-800 text-white font-semibold py-3 px-6 rounded-xl hover:bg-gray-700 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <Github size={18} />
                          {t('portfolio.modal.sourceCode')}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <motion.section className="relative py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-gray-900 via-purple-800 to-purple-600 bg-clip-text text-transparent">
              {t('portfolio.cta.title')}
            </h2>
            <p className="text-xl text-gray-700 mb-12">
              {t('portfolio.cta.subtitle')}
            </p>
            
            <a
              href="https://wa.me/393391797616?text=Ciao,%20vorrei%20collaborare%20con%20voi%20su%20un%20nuovo%20progetto!"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-bold py-6 px-12 rounded-full transition-all duration-300 overflow-hidden text-lg inline-block"
            >
              <span className="relative z-10">{t('portfolio.cta.button')}</span>
              <span className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <span className="absolute inset-0 bg-gradient-to-r from-purple-400/0 via-white/20 to-purple-400/0 opacity-0 group-hover:opacity-100 pointer-events-none" />
            </a>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Portfolio; 