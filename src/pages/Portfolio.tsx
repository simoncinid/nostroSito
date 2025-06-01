import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { 
  ExternalLink, 
  Github, 
  Eye, 
  X, 
  Code,
  Bot,
  Zap,
  Database,
  Sparkles,
  Layers
} from 'lucide-react';
import React from 'react';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  client: string;
  year: string;
  duration: string;
  team: string[];
  results: {
    metric: string;
    value: string;
    description: string;
  }[];
  features: string[];
  challenges: string[];
  solutions: string[];
  gradient: string;
  icon: any;
  isInternational?: boolean;
  isHighTraffic?: boolean;
}

const Portfolio = () => {
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
    { id: 'all', name: 'Tutti i Progetti', icon: Layers },
    { id: 'web', name: 'Sviluppo Web', icon: Code },
    { id: 'ai', name: 'Soluzioni AI', icon: Bot },
    { id: 'automation', name: 'Automazione', icon: Zap },
    { id: 'database', name: 'Database', icon: Database }
  ];

  const projects: Project[] = [
    {
      id: 1,
      title: "AI Freight Hub - RnD Hub",
      category: "automation",
      description: "Sistema di automazione completo per il mondo trucking americano con AI per ricerca e quotazione automatica, invio di centinaia di email al giorno.",
      longDescription: "Sviluppato per RnD Hub, questo sistema di automazione rivoluzionario utilizza AI per la ricerca e quotazione automatica nel settore freight americano. La piattaforma gestisce automaticamente centinaia di email al giorno, servendo decine di clienti nel mercato del trasporto merci USA. Il sistema include algoritmi di matching intelligenti, automazione completa del processo di quotazione e gestione clienti avanzata.",
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=600&fit=crop",
      technologies: ["Python", "SMTP Email Automation", "API Integration", "Google Cloud Services"],
      liveUrl: "https://rndhub.io/",
      client: "RnD Hub",
      year: "2024",
      duration: "6 mesi",
      team: ["Diego", "Tommaso"],
      results: [
        { metric: "Email Inviate", value: "50.000+", description: "Email automatiche al giorno" },
        { metric: "Clienti Serviti", value: "40+", description: "Clienti attivi sulla piattaforma" },
        
      ],
      features: [
        "AI per ricerca automatica freight",
        "Sistema di quotazione intelligente",
        "Automazione email massiva",
        "Dashboard analytics real-time",
        "Gestione clienti multi-livello",
        "Integrazione API trucking"
      ],
      challenges: [
        "Gestione volumi email elevati",
        "Algoritmi di matching complessi",
        "Integrazione con sistemi USA"
      ],
      solutions: [
        "Queue system per email processing",
        "Machine learning per matching",
        "API gateway ottimizzate"
      ],
      gradient: "from-green-500 to-blue-600",
      icon: Zap,
      isInternational: true
    },
    {
      id: 2,
      title: "Threshold Coach - Piattaforma Web",
      category: "web",
      description: "Piattaforma web completa sviluppata da zero per coaching personalizzato, con architettura moderna e interfaccia utente avanzata.",
      longDescription: "Piattaforma web completa sviluppata interamente da WebBitz per Threshold Coach. Il progetto include lo sviluppo frontend e backend da zero, seguendo specificatamente gli ordini del committente. La piattaforma offre un'esperienza utente moderna con dashboard personalizzabili, gestione utenti avanzata e integrazione con sistemi di pagamento internazionali.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
      technologies: ["React", "Node.js", "TypeScript", "PostgreSQL", "Stripe", "AWS"],
      liveUrl: "https://www.threshold.coach/",
      client: "Threshold Coach",
      year: "2024",
      duration: "2 mesi",
      team: ["Diego", "Tommaso", "Simone"],
      results: [
        { metric: "Vendite sito", value: "+200%", description: "Velocità caricamento pagine" },
        { metric: "User Experience", value: "+95%", description: "Soddisfazione utente" },
        { metric: "Conversioni", value: "+150%", description: "Tasso di conversione" }
      ],
      features: [
        "Sviluppo completo da zero",
        "Architettura scalabile moderna",
        "Dashboard personalizzabili",
        "Sistema di pagamenti integrato",
        "Responsive design avanzato",
        "SEO optimization completa"
      ],
      challenges: [
        "Sviluppo completo da zero",
        "Requisiti specifici del cliente",
        "Integrazione sistemi di pagamento"
      ],
      solutions: [
        "Architettura modulare scalabile",
        "Iterazioni continue con il cliente",
        "Testing completo pre-deploy"
      ],
      gradient: "from-blue-500 to-purple-600",
      icon: Code,
      isInternational: true
    },
    {
      id: 3,
      title: "Threshold Coach - 50 Assistenti AI",
      category: "ai",
      description: "Sviluppo di quasi 50 assistenti AI specializzati con toggle OpenAI/Anthropic per coaching personalizzato e supporto utenti.",
      longDescription: "Sviluppo di un ecosistema completo di quasi 50 assistenti AI specializzati per Threshold Coach. Ogni assistente è ottimizzato per specifiche aree del coaching con la possibilità di switchare tra OpenAI e Anthropic. Il sistema include gestione conversazioni avanzata, personalizzazione AI per ogni utente e analytics dettagliate sulle interazioni.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
      technologies: ["OpenAI GPT-4", "Anthropic Claude", "Python", "Vector DB", "React", "Node.js"],
      liveUrl: "https://www.threshold.coach/",
      client: "Threshold Coach",
      year: "2024",
      duration: "10 mesi",
      team: ["Diego", "Simone"],
      results: [
        { metric: "Assistenti Sviluppati", value: "48", description: "Assistenti AI specializzati" },
        { metric: "Conversazioni", value: "10k+", description: "Conversazioni mensili" },
        { metric: "Accuratezza", value: "+92%", description: "Precisione risposte AI" }
      ],
      features: [
        "48 assistenti AI specializzati",
        "Toggle OpenAI/Anthropic",
        "Personalizzazione per utente",
        "Gestione conversazioni avanzata",
        "Analytics interazioni AI",
        "Training continuo modelli"
      ],
      challenges: [
        "Gestione multipli modelli AI",
        "Personalizzazione per 50 assistenti",
        "Ottimizzazione costi API"
      ],
      solutions: [
        "Architettura modulare per AI",
        "System prompting avanzato",
        "Caching intelligente risposte"
      ],
      gradient: "from-purple-500 to-pink-600",
      icon: Bot,
      isInternational: true
    },
    {
      id: 4,
      title: "Threshold Coach - Infrastruttura Database",
      category: "database",
      description: "Infrastruttura database enterprise per gestire tutte le conversazioni degli utenti con quasi 50 assistenti AI, con architettura scalabile e sicura.",
      longDescription: "Progettazione e implementazione di un'infrastruttura database enterprise per Threshold Coach. Il sistema gestisce tutte le conversazioni degli utenti con quasi 50 assistenti AI, garantendo scalabilità, sicurezza e performance elevate. Include backup automatici, replication, ottimizzazione query e monitoring avanzato.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
      technologies: ["PostgreSQL", "Redis", "MongoDB", "AWS RDS", "Data Analytics", "Backup Systems"],
      liveUrl: "https://www.threshold.coach/",
      client: "Threshold Coach",
      year: "2024",
      duration: "4 mesi",
      team: ["Diego", "Tommaso"],
      results: [
        { metric: "Conversazioni Gestite", value: "50k+", description: "Conversazioni archiviate" },
        { metric: "Uptime", value: "99.9%", description: "Disponibilità sistema" },
        { metric: "Performance", value: "+300%", description: "Velocità query" }
      ],
      features: [
        "Architettura database scalabile",
        "Gestione conversazioni massive",
        "Backup automatici giornalieri",
        "Replication multi-zona",
        "Monitoring real-time",
        "Ottimizzazione query avanzata"
      ],
      challenges: [
        "Gestione dati conversazioni massive",
        "Performance con 50 assistenti",
        "Sicurezza dati sensibili"
      ],
      solutions: [
        "Sharding intelligente database",
        "Indexing ottimizzato",
        "Crittografia end-to-end"
      ],
      gradient: "from-green-400 to-blue-600",
      icon: Database,
      isInternational: true
    },
    {
      id: 5,
      title: "Welpy - Chatbot Lead Generation",
      category: "ai",
      description: "Chatbot AI avanzato per lead generation automatica su sito con 40k accessi mensili, convertendo traffico in leads qualificati attraverso conversazioni intelligenti.",
      longDescription: "Sviluppo di un chatbot AI avanzato per Welpy, sito importante con 40k accessi mensili. Il sistema converte automaticamente il traffico web in leads qualificati attraverso conversazioni intelligenti e personalizzate. Il chatbot include lead scoring, integrazione CRM e analytics avanzate per ottimizzare continuamente le conversioni.",
      image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=600&fit=crop",
      technologies: ["OpenAI GPT-4", "JavaScript", "React", "Node.js", "CRM Integration", "Analytics"],
      liveUrl: "https://www.welpy.it/",
      client: "Welpy",
      year: "2024",
      duration: "6 settimane",
      team: ["Diego", "Simone"],
      results: [
        { metric: "Traffico Mensile", value: "40k", description: "Visitatori unici mensili" },
        { metric: "Conversion Rate", value: "+180%", description: "Miglioramento conversioni" },
        { metric: "Lead Qualificati", value: "+250%", description: "Incremento leads qualificati" }
      ],
      features: [
        "Lead generation automatica",
        "Conversazioni AI personalizzate",
        "Lead scoring intelligente",
        "Integrazione CRM diretta",
        "Analytics conversazioni",
        "A/B testing automatico"
      ],
      challenges: [
        "Gestione traffico elevato",
        "Qualificazione leads automatica",
        "Integrazione con sistemi esistenti"
      ],
      solutions: [
        "Load balancing chatbot",
        "Algoritmi di lead scoring",
        "API integration robuste"
      ],
      gradient: "from-orange-500 to-red-600",
      icon: Bot,
      isHighTraffic: true
    },
    {
      id: 6,
      title: "The Admission Hub - Piattaforma Completa",
      category: "web",
      description: "Piattaforma web completa sviluppata da zero per servizi di ammissione universitaria, con sistema di gestione candidati e dashboard avanzate.",
      longDescription: "Sviluppo completo da zero di The Admission Hub, piattaforma specializzata nei servizi di ammissione universitaria. Il progetto include sviluppo frontend e backend, sistema di gestione candidati, dashboard per consultants, sistema di pagamenti e tracking completo del processo di ammissione.",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9d1?w=800&h=600&fit=crop",
      technologies: ["React", "Node.js", "TypeScript", "MongoDB", "Stripe", "AWS"],
      liveUrl: "https://theadmissionhub.com",
      client: "The Admission Hub",
      year: "2024",
      duration: "10 settimane",
      team: ["Diego", "Tommaso", "Simone"],
      results: [
        { metric: "Candidati Gestiti", value: "1000+", description: "Candidati sulla piattaforma" },
        { metric: "Automazione", value: "+90%", description: "Processi automatizzati" },
        { metric: "Efficienza", value: "+200%", description: "Miglioramento workflow" }
      ],
      features: [
        "Sistema gestione candidati",
        "Dashboard consultant avanzate",
        "Tracking processo ammissione",
        "Sistema pagamenti integrato",
        "Document management",
        "Notifiche automatiche"
      ],
      challenges: [
        "Gestione processi complessi",
        "Integrazione sistemi universitari",
        "Scalabilità per crescita"
      ],
      solutions: [
        "Workflow engine personalizzato",
        "API integration standardizzate",
        "Architettura cloud scalabile"
      ],
      gradient: "from-blue-400 to-cyan-600",
      icon: Code,
      isInternational: true
    }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

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
        className="relative min-h-[70vh] md:min-h-screen flex items-center justify-center px-4 pt-20 md:pt-20"
      >
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-gray-900 via-purple-800 to-purple-600 bg-clip-text text-transparent leading-tight">
            <span className="bg-gradient-to-r from-gray-900 via-purple-800 to-purple-600 bg-clip-text text-transparent">
              Progetti che
            </span>
            <br className="hidden md:block" />
            <span className="md:hidden"> </span>
            <span
              className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 bg-clip-text text-transparent bg-[length:200%_100%]"
              style={{ display: 'inline-block' }}
            >
              Fanno la Differenza
            </span>
          </h1>
          <p className="text-2xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed">
            Scopri i <span className="text-purple-700 font-semibold">progetti innovativi</span> che abbiamo realizzato per i nostri clienti. 
            <span className="hidden md:inline"> Ogni soluzione è <span className="text-purple-700 font-semibold">unica e personalizzata</span>, 
            progettata per superare le aspettative e generare risultati concreti.</span>
          </p>
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
                  <span className="whitespace-nowrap overflow-hidden text-ellipsis">{categories[0].name}</span>
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
                    <span className="whitespace-nowrap overflow-hidden text-ellipsis">{category.name}</span>
                  </button>
                ))}
              </div>
              
              {/* Versione desktop (invariata) */}
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
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8"
          >
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group relative bg-white/80 backdrop-blur-xl border border-purple-200 rounded-2xl md:rounded-3xl overflow-hidden hover:border-purple-300 hover:shadow-lg transition-all duration-500"
                >
                  {/* Project Image */}
                  <div className="relative h-32 md:h-48 overflow-hidden">
                    <motion.img
                      src={project.image}
                      alt={project.title}
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
                          {categories.find(cat => cat.id === project.category)?.name}
                        </span>
                      </div>
                    </div>
                    {/* Action Buttons - Sempre visibili per mobile */}
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
                      {project.title}
                    </h3>
                    {/* Su mobile non mostro descrizione, tecnologie e meta */}
                    {/* Solo su desktop */}
                    <div className="hidden md:block w-full">
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {project.description}
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
                        <span>{project.client}</span>
                        <span>{project.year}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
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
              className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="relative">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
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
                  <h2 className="text-3xl font-bold mb-2">{selectedProject.title}</h2>
                  <p className="text-white/90">{selectedProject.client} • {selectedProject.year}</p>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Main Content */}
                  <div className="lg:col-span-2">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Descrizione del Progetto</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {selectedProject.longDescription}
                    </p>

                    <h4 className="text-xl font-bold text-gray-900 mb-4">Caratteristiche Principali</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                      {selectedProject.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-gray-600">
                          <div className="w-2 h-2 bg-purple-500 rounded-full" />
                          {feature}
                        </div>
                      ))}
                    </div>

                    <h4 className="text-xl font-bold text-gray-900 mb-4">Tecnologie Utilizzate</h4>
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
                      <h4 className="font-bold text-gray-900 mb-4">Dettagli Progetto</h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Cliente:</span>
                          <span className="font-semibold text-gray-900">{selectedProject.client}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Anno:</span>
                          <span className="font-semibold text-gray-900">{selectedProject.year}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Sviluppo:</span>
                          <span className="font-semibold text-gray-900">{selectedProject.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Team:</span>
                          <span className="font-semibold text-gray-900">{selectedProject.team.join(', ')}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-6">
                      <h4 className="font-bold text-gray-900 mb-4">Risultati Ottenuti</h4>
                      <div className="space-y-4">
                        {selectedProject.results.map((result, index) => (
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
                          Visita il Sito
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
                          Codice Sorgente
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
              Hai un Progetto in Mente?
            </h2>
            <p className="text-xl text-gray-700 mb-12">
              Trasformiamo la tua idea nel prossimo caso di successo del nostro portfolio
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
              <span className="relative z-10">Iniziamo a Collaborare</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2"
              >
                <Sparkles size={24} className="text-white" />
              </motion.div>
            </motion.button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Portfolio; 