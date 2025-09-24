import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import logo from '../assets/logos/LogoWebbitzIcona.jpeg';
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
  ShoppingCart
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
  clientName?: string;
}

interface ClientProject {
  clientName: string;
  image: string;
  liveUrl?: string;
  year: string;
  team: string[];
  isInternational?: boolean;
  projects: Project[];
  allTechnologies: string[];
}

const Portfolio = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  
  
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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

  const categories = [
    { id: 'all', nameKey: 'all', icon: Layers, gradient: 'from-gray-500 to-gray-600' },
    { id: 'web', nameKey: 'web', icon: Code, gradient: 'from-primary-500 to-accent-500' },
    { id: 'ai', nameKey: 'ai', icon: Bot, gradient: 'from-primary-500 to-accent-500' },
    { id: 'automation', nameKey: 'automation', icon: Zap, gradient: 'from-green-500 to-green-600' },
    { id: 'database', nameKey: 'database', icon: Database, gradient: 'from-orange-500 to-orange-600' },
    { id: 'ecommerce', nameKey: 'ecommerce', icon: ShoppingCart, gradient: 'from-primary-500 to-accent-500' }
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
      gradient: "from-green-500 to-primary-600",
      icon: Zap,
      isInternational: true,
      clientName: "RnD Hub"
    },
    {
      id: 2,
      titleKey: "thinkGoodWebsite",
      category: "web",
      image: "/images/thinkgood.png",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Node.js", "MongoDB"],
      liveUrl: "https://www.thinkgoodmusic.com",
      year: "2024",
      team: ["Diego", "Tommaso"],
      gradient: "from-primary-500 to-accent-500",
      icon: Code,
      isInternational: false,
      clientName: "ThinkGood Music"
    },
    {
      id: 3,
      titleKey: "thinkGoodChatbot",
      category: "ai",
      image: "/images/thinkgood.png",
      technologies: ["OpenAI GPT-4", "JavaScript", "React", "Node.js", "CRM Integration", "Analytics"],
      liveUrl: "https://www.thinkgoodmusic.com",
      year: "2024",
      team: ["Diego", "Simone"],
      gradient: "from-primary-500 to-accent-500",
      icon: Bot,
      isHighTraffic: true,
      clientName: "ThinkGood Music"
    },
    {
      id: 4,
      titleKey: "thresholdWebsite",
      category: "web",
      image: "/images/Threshold.png",
      technologies: ["React", "Node.js", "TypeScript", "PostgreSQL", "Stripe", "AWS"],
      liveUrl: "https://www.threshold.coach/",
      year: "2024",
      team: ["Diego", "Tommaso", "Francesco"],
      gradient: "from-primary-500 to-accent-500",
      icon: Code,
      isInternational: true,
      clientName: "Threshold Coach"
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
      gradient: "from-primary-500 to-accent-500",
      icon: Bot,
      isInternational: true,
      clientName: "Threshold Coach"
    },
    {
      id: 6,
      titleKey: "thresholdDatabase",
      category: "database",
      image: "/images/Threshold.png",
      technologies: ["PostgreSQL", "Redis", "MongoDB", "AWS RDS", "Data Analytics", "Backup Systems"],
      liveUrl: "https://www.threshold.coach/",
      year: "2024",
      team: ["Diego", "Tommaso", "Francesco"],
      gradient: "from-green-400 to-primary-600",
      icon: Database,
      isInternational: true,
      clientName: "Threshold Coach"
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
      isHighTraffic: true,
      clientName: "Welpy"
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
      gradient: "from-primary-400 to-cyan-600",
      icon: Code,
      isInternational: true,
      clientName: "AdmissionHub"
    },
    {
      id: 9,
      titleKey: "vistamare",
      category: "web",
      image: "/images/Vistamare.png",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Node.js", "MongoDB"],
      liveUrl: "https://vistamarerosignano.it/",
      year: "2024",
      team: ["Diego", "Tommaso"],
      gradient: "from-primary-500 to-accent-500",
      icon: Code,
      isInternational: false,
      clientName: "Vistamare"
    },
    {
      id: 10,
      titleKey: "area287Website",
      category: "web",
      image: "/images/area287.png",
      technologies: ["Shopify", "HTML", "CSS"],
      liveUrl: "https://area287.it",
      year: "2025",
      team: ["Francesco", "Andrea"],
      gradient: "from-primary-500 to-accent-500",
      icon: Code,
      isInternational: false,
      clientName: "Area287"
    },
    {
      id: 18,
      titleKey: "area287Ecommerce",
      category: "ecommerce",
      image: "/images/area287.png",
      technologies: ["Shopify", "E-commerce", "Payment Gateway", "Inventory Management"],
      liveUrl: "https://area287.it",
      year: "2025",
      team: ["Francesco", "Andrea"],
      gradient: "from-primary-500 to-accent-500",
      icon: ShoppingCart,
      isInternational: false,
      clientName: "Area287"
    },
    {
      id: 11,
      titleKey: "fantozziBarWebsite",
      category: "web",
      image: "/images/fantozzi.png",
      technologies: ["WordPress", "HTML", "CSS", "Elementor", "Pienissimo"],
      liveUrl: "https://barfantozzi.it",
      year: "2025",
      team: ["Francesco", "Andrea"],
      gradient: "from-primary-500 to-accent-500",
      icon: Code,
      isInternational: false,
      clientName: "Fantozzi Bar"
    },
    {
      id: 12,
      titleKey: "ristoroAnticaScuderiaWebsite",
      category: "web",
      image: "/images/scuderia.png",
      technologies: ["WordPress", "HTML", "CSS", "Elementor"],
      liveUrl: "https://www.ristorolanticascuderia.it/",
      year: "2025",
      team: ["Francesco", "Andrea"],
      gradient: "from-primary-500 to-accent-500",
      icon: Code,
      isInternational: false,
      clientName: "Ristoro L'Antica Scuderia"
    },
    {
      id: 13,
      titleKey: "bottegaScuderiaWebsite",
      category: "web",
      image: "/images/bottega.png",
      technologies: ["WordPress", "HTML", "CSS", "Elementor"],
      liveUrl: "https://labottegadellascuderia.com",
      year: "2025",
      team: ["Francesco", "Andrea"],
      gradient: "from-primary-500 to-accent-500",
      icon: Code,
      isInternational: false,
      clientName: "La Bottega della Scuderia"
    },
    {
      id: 14,
      titleKey: "bagnoParadisoWebsite",
      category: "web",
      image: "/images/bagnoparadiso.png",
      technologies: ["React", "HTML", "CSS"],
      liveUrl: "https://bagnoparadisotirrenia.it",
      year: "2025",
      team: ["Francesco", "Andrea"],
      gradient: "from-primary-500 to-accent-500",
      icon: Code,
      isInternational: false,
      clientName: "Bagno Paradiso"
    },
    {
      id: 15,
      titleKey: "napoliIntoCoreWebsite",
      category: "web",
      image: "/images/napoli.png",
      technologies: ["WordPress", "Elementor", "HTML", "CSS"],
      liveUrl: "https://napolintocore.it",
      year: "2025",
      team: ["Andrea"],
      gradient: "from-primary-500 to-accent-500",
      icon: Code,
      isInternational: false,
      clientName: "Napoli Into Core"
    },
    {
      id: 16,
      titleKey: "spicchioDiLunaWebsite",
      category: "web",
      image: "/images/sdl.png",
      technologies: ["React", "HTML", "CSS"],
      liveUrl: "https://spicchiodiluna.it",
      year: "2025",
      team: ["Diego", "Tommaso"],
      gradient: "from-primary-500 to-accent-500",
      icon: Code,
      isInternational: false,
      clientName: "Spicchio Di Luna"
    },
    {
      id: 17,
      titleKey: "diazMicrotorrefazioneWebsite",
      category: "web",
      image: "/images/diaz.png",
      technologies: ["WordPress", "Elementor", "HTML", "CSS"],
      liveUrl: "https://diazmicrotorrefazione.com",
      year: "2025",
      team: ["Andrea"],
      gradient: "from-primary-500 to-accent-500",
      icon: Code,
      isInternational: false,
      clientName: "Diaz Microtorrefazione"
    },
    {
      id: 19,
      titleKey: "diazMicrotorrefazioneEcommerce",
      category: "ecommerce",
      image: "/images/diaz.png",
      technologies: ["WordPress", "WooCommerce", "Payment Gateway", "Product Management"],
      liveUrl: "https://diazmicrotorrefazione.com",
      year: "2025",
      team: ["Andrea"],
      gradient: "from-primary-500 to-accent-500",
      icon: ShoppingCart,
      isInternational: false,
      clientName: "Diaz Microtorrefazione"
    }
  ];

  // Raggruppa i progetti per cliente
  const groupedProjects = projects.reduce((acc, project) => {
    const clientName = project.clientName!;
    
    if (!acc[clientName]) {
      acc[clientName] = {
        clientName,
        image: project.image,
        liveUrl: project.liveUrl,
        year: project.year,
        team: project.team,
        isInternational: project.isInternational,
        projects: [],
        allTechnologies: []
      };
    }
    
    acc[clientName].projects.push(project);
    acc[clientName].allTechnologies = [...new Set([...acc[clientName].allTechnologies, ...project.technologies])];
    
    return acc;
  }, {} as Record<string, ClientProject>);

  const clientProjects = Object.values(groupedProjects);
  
  const filteredProjects = selectedCategory === 'all' 
    ? clientProjects.sort((a, b) => parseInt(b.year) - parseInt(a.year))
    : clientProjects
        .filter(client => 
          client.projects.some(project => project.category === selectedCategory)
        )
        .sort((a, b) => parseInt(b.year) - parseInt(a.year));





  return (
    <div ref={containerRef} className="min-h-screen bg-white overflow-hidden">
      <Helmet>
        <title>{t('portfolio.meta.title')}</title>
        <meta name="description" content={t('portfolio.meta.description')} />
      </Helmet>

      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-primary-400/10 to-primary-500/10 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x * 0.1,
            y: mousePosition.y * 0.1,
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-primary-400/10 to-primary-500/10 rounded-full blur-3xl"
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
        {/* Logo Background Static */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <img 
            src={logo} 
            alt="" 
            className="w-[90%] max-w-none blur-2xl"
            style={{ 
              filter: 'drop-shadow(0 0 100px rgba(59, 130, 246, 0.4))'
            }}
          />
        </div>

        <div className="max-w-6xl mx-auto text-center">
          <div>
            <h1 className="text-4xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-gray-900 via-primary-800 to-primary-600 bg-clip-text text-transparent">
                {t('portfolio.hero.title')}
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 bg-clip-text text-transparent">
                {t('portfolio.hero.titleAnimated')}
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
              {t('portfolio.hero.subtitle.part1')}
              <span className="text-primary-700 font-semibold">{t('portfolio.hero.subtitle.part2')}</span>
              {t('portfolio.hero.subtitle.part3')}
              <span className="hidden md:inline">
                {t('portfolio.hero.subtitle.part4')}
                <span className="text-primary-700 font-semibold">{t('portfolio.hero.subtitle.part5')}</span>
                {t('portfolio.hero.subtitle.part6')}
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <motion.section
        ref={portfolioRef}
        className="relative py-4 md:py-8 px-4"
      >
        <div className="max-w-7xl mx-auto">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12 relative z-30">
            {/* Mobile Layout */}
            <div className="w-full md:hidden">
              <div className="grid grid-cols-2 gap-2 mb-2">
                <button
                  key={categories[0].id}
                  onClick={() => setSelectedCategory(categories[0].id)}
                  className={`col-span-2 flex items-center justify-center gap-1 px-3 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    selectedCategory === categories[0].id
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
                      : 'bg-white/80 backdrop-blur-lg border border-primary-200 text-gray-700 hover:border-primary-300 hover:shadow-md'
                  }`}
                  style={{ minWidth: 0 }}
                >
                  {React.createElement(categories[0].icon, { size: 16 })}
                  <span className="whitespace-nowrap overflow-hidden text-ellipsis">{t(`portfolio.categories.${categories[0].nameKey}`)}</span>
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {categories.slice(1).map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center justify-center gap-1 px-3 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
                        : 'bg-white/80 backdrop-blur-lg border border-primary-200 text-gray-700 hover:border-primary-300 hover:shadow-md'
                    }`}
                  >
                    {React.createElement(category.icon, { size: 16 })}
                    <span className="whitespace-nowrap overflow-hidden text-ellipsis">{t(`portfolio.categories.${category.nameKey}`)}</span>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Desktop Layout */}
            <div className="hidden md:flex flex-wrap justify-center gap-4 relative z-10">
              {categories.map(category => (
                <button
                  key={`desktop-${category.id}`}
                  onClick={() => {
                    console.log('Category clicked:', category.id);
                    setSelectedCategory(category.id);
                  }}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 relative z-20 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
                      : 'bg-white/80 backdrop-blur-lg border border-primary-200 text-gray-700 hover:border-primary-300 hover:shadow-md'
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
            className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 relative z-30"
          >
            {filteredProjects && filteredProjects.length > 0 ? filteredProjects.map((clientProject) => {
              const firstProject = clientProject.projects[0];
              if (!firstProject) return null; // Skip if no projects
              const projectData = t(`portfolio.projects.${firstProject.titleKey}`, { returnObjects: true }) as any;
              
              return (
                <motion.div
                  key={clientProject.clientName}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="group relative bg-white/80 backdrop-blur-xl border border-primary-200 rounded-xl md:rounded-2xl overflow-hidden hover:border-primary-300 hover:shadow-lg transition-all duration-500 z-40"
                >
                  {/* Project Image */}
                  <div className="relative h-20 md:h-32 overflow-hidden">
                    <motion.img
                      src={clientProject.image}
                      alt={projectData.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    {/* Service Icons */}
                    <div className="absolute top-2 left-2 md:top-3 md:left-3 flex gap-1">
                      {clientProject.projects.map((project, index) => {
                        const categoryInfo = categories.find(cat => cat.id === project.category);
                        return (
                          <div
                            key={index}
                            className={`flex items-center gap-1 px-1.5 py-0.5 md:px-2 md:py-1 bg-gradient-to-r ${categoryInfo?.gradient || 'from-gray-500 to-gray-600'} rounded-full text-white`}
                          >
                            <project.icon size={10} className="md:hidden" />
                            <project.icon size={12} className="hidden md:inline" />
                          </div>
                        );
                      })}
                    </div>
                    {/* Action Buttons */}
                    <div className="absolute bottom-2 right-2 flex gap-1 md:bottom-3 md:right-3 z-20">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                          console.log('Opening modal for project:', firstProject);
                          setSelectedProject(firstProject);
                        }}
                        className="w-6 h-6 md:w-8 md:h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:bg-white transition-colors duration-300 relative z-30"
                      >
                        <Eye size={12} className="md:hidden" />
                        <Eye size={14} className="hidden md:inline" />
                      </motion.button>
                      {clientProject.liveUrl && (
                        <motion.a
                          href={clientProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-6 h-6 md:w-8 md:h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:bg-white transition-colors duration-300 relative z-30"
                        >
                          <ExternalLink size={12} className="md:hidden" />
                          <ExternalLink size={14} className="hidden md:inline" />
                        </motion.a>
                      )}
                    </div>
                  </div>
                  {/* Project Info */}
                  <div className="p-2 md:p-4 flex flex-col items-start justify-between">
                    <h3
                      className="font-bold text-gray-900 mb-1 md:mb-2 group-hover:text-primary-700 transition-colors duration-300 truncate w-full"
                      style={{ fontSize: 'clamp(0.85rem, 2.2vw, 1rem)' }}
                    >
                      {projectData.client || clientProject.clientName}
                    </h3>
                    {/* Solo su desktop */}
                    <div className="hidden md:block w-full">
                      <div className="flex flex-wrap gap-1 mb-2">
                        {clientProject.allTechnologies.slice(0, 4).map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-1.5 py-0.5 bg-primary-100 text-primary-700 rounded text-xs font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                        {clientProject.allTechnologies.length > 4 && (
                          <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                            +{clientProject.allTechnologies.length - 4}
                          </span>
                        )}
                      </div>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>{clientProject.year}</span>
                        <span>{clientProject.projects.length} progetti</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            }) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">Nessun progetto trovato per questa categoria.</p>
              </div>
            )}
          </motion.div>

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
              className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[95vh] md:max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="relative">
                <img
                  src={selectedProject.image}
                  alt={t(`portfolio.projects.${selectedProject.titleKey}.title`)}
                  className="w-full h-32 md:h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:bg-white transition-colors duration-300"
                >
                  <X size={20} />
                </button>

                <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-white">
                  <h2 className="text-xl md:text-3xl font-bold mb-1 md:mb-2">{t(`portfolio.projects.${selectedProject.titleKey}.title`)}</h2>
                  <p className="text-sm md:text-base text-white/90">{t(`portfolio.projects.${selectedProject.titleKey}.client`)} • {selectedProject.year}</p>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-4 md:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
                  {/* Main Content */}
                  <div className="lg:col-span-2">
                    <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-2 md:mb-4">{t('portfolio.modal.projectDescription')}</h3>
                    <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6 leading-relaxed">
                      {t(`portfolio.projects.${selectedProject.titleKey}.longDescription`)}
                    </p>

                    <h4 className="text-base md:text-xl font-bold text-gray-900 mb-2 md:mb-4">{t('portfolio.modal.mainFeatures')}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 mb-4 md:mb-6">
                      {(t(`portfolio.projects.${selectedProject.titleKey}.features`, { returnObjects: true }) as string[]).map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-primary-500 rounded-full" />
                          {feature}
                        </div>
                      ))}
                    </div>

                    <h4 className="text-base md:text-xl font-bold text-gray-900 mb-2 md:mb-4">{t('portfolio.modal.technologiesUsed')}</h4>
                    <div className="flex flex-wrap gap-1 md:gap-2 mb-4 md:mb-6">
                      {selectedProject.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 md:px-3 md:py-1 bg-primary-100 text-primary-700 rounded-lg text-xs md:text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-4 md:space-y-6">
                    <div className="bg-gray-50 rounded-2xl p-4 md:p-6">
                      <h4 className="text-sm md:text-base font-bold text-gray-900 mb-2 md:mb-4">{t('portfolio.modal.projectDetails')}</h4>
                      <div className="space-y-2 md:space-y-3 text-xs md:text-sm">
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

                    <div className="bg-gray-50 rounded-2xl p-4 md:p-6">
                      <h4 className="text-sm md:text-base font-bold text-gray-900 mb-2 md:mb-4">{t('portfolio.modal.results')}</h4>
                      <div className="space-y-2 md:space-y-4">
                        {(t(`portfolio.projects.${selectedProject.titleKey}.results`, { returnObjects: true }) as any[]).map((result, index) => (
                          <div key={index} className="text-center">
                            <div className="text-lg md:text-2xl font-bold text-primary-600 mb-1">{result.value}</div>
                            <div className="text-xs md:text-sm font-semibold text-gray-900 mb-1">{result.metric}</div>
                            <div className="text-xs text-gray-600">{result.description}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2 md:space-y-3">
                      {selectedProject.liveUrl && (
                        <a
                          href={selectedProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold py-2 md:py-3 px-4 md:px-6 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm md:text-base"
                        >
                          <ExternalLink size={16} className="md:w-5 md:h-5" />
                          {t('portfolio.modal.visitSite')}
                        </a>
                      )}
                      {selectedProject.githubUrl && (
                        <a
                          href={selectedProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full bg-gray-800 text-white font-semibold py-2 md:py-3 px-4 md:px-6 rounded-xl hover:bg-gray-700 transition-all duration-300 flex items-center justify-center gap-2 text-sm md:text-base"
                        >
                          <Github size={16} className="md:w-5 md:h-5" />
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
      <motion.section className="relative py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-gray-900 via-primary-800 to-primary-600 bg-clip-text text-transparent">
              {t('portfolio.cta.title')}
            </h2>
            <p className="text-xl text-gray-700 mb-12">
              {t('portfolio.cta.subtitle')}
            </p>
            
            <a
              href="https://wa.me/393391797616?text=Ciao,%20vorrei%20collaborare%20con%20voi%20su%20un%20nuovo%20progetto!"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white font-bold py-6 px-12 rounded-full transition-all duration-300 overflow-hidden text-lg inline-block"
            >
              <span className="relative z-10">{t('portfolio.cta.button')}</span>
              <span className="absolute inset-0 bg-gradient-to-r from-primary-400 to-accent-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <span className="absolute inset-0 bg-gradient-to-r from-primary-400/0 via-white/20 to-accent-400/0 opacity-0 group-hover:opacity-100 pointer-events-none" />
            </a>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Portfolio; 