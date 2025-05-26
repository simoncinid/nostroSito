import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { 
  ExternalLink, 
  Github, 
  Eye, 
  X, 
  ArrowLeft, 
  ArrowRight,
  Code,
  Bot,
  Zap,
  Smartphone,
  ShoppingCart,
  Users,
  TrendingUp,
  Award,
  Sparkles,
  Heart,
  Layers
} from 'lucide-react';

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
}

const Portfolio = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const portfolioInView = useInView(portfolioRef, { once: true, amount: 0.2 });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);

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
    { id: 'mobile', name: 'App Mobile', icon: Smartphone },
    { id: 'ecommerce', name: 'E-commerce', icon: ShoppingCart }
  ];

  const projects: Project[] = [
    {
      id: 1,
      title: "TechStart Milano - Piattaforma SaaS",
      category: "web",
      description: "Piattaforma SaaS completa per la gestione di startup tecnologiche con dashboard avanzate e analytics in tempo reale.",
      longDescription: "Una piattaforma SaaS completa sviluppata per TechStart Milano, leader nell'accelerazione di startup tecnologiche. Il progetto include dashboard personalizzabili, sistema di analytics avanzato, gestione utenti multi-livello e integrazione con oltre 20 servizi esterni.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Redis", "AWS"],
      liveUrl: "https://techstart-milano.com",
      githubUrl: "https://github.com/webbitz/techstart",
      client: "TechStart Milano",
      year: "2024",
      duration: "4 mesi",
      team: ["Diego", "Tommaso", "Simone"],
      results: [
        { metric: "Performance", value: "+150%", description: "Miglioramento velocità caricamento" },
        { metric: "Conversioni", value: "+85%", description: "Aumento tasso di conversione" },
        { metric: "Utenti Attivi", value: "+200%", description: "Crescita utenti mensili" }
      ],
      features: [
        "Dashboard personalizzabili",
        "Analytics in tempo reale",
        "Sistema di notifiche push",
        "API RESTful complete",
        "Autenticazione multi-fattore",
        "Export dati avanzato"
      ],
      challenges: [
        "Gestione di grandi volumi di dati",
        "Performance con migliaia di utenti simultanei",
        "Integrazione con sistemi legacy"
      ],
      solutions: [
        "Implementazione di caching Redis",
        "Ottimizzazione query database",
        "Architettura microservizi"
      ],
      gradient: "from-blue-500 to-purple-600",
      icon: Code
    },
    {
      id: 2,
      title: "AI Assistant per Fashion Roma",
      category: "ai",
      description: "Assistente virtuale AI per e-commerce fashion con raccomandazioni personalizzate e chatbot per customer service.",
      longDescription: "Un assistente virtuale basato su intelligenza artificiale sviluppato per Fashion Roma, boutique di lusso. Il sistema include raccomandazioni personalizzate, chatbot per customer service 24/7, analisi del sentiment dei clienti e automazione del processo di vendita.",
      image: "https://images.unsplash.com/photo-1555421689-491a97ff2040?w=800&h=600&fit=crop",
      technologies: ["Python", "OpenAI GPT-4", "TensorFlow", "React", "FastAPI", "Vector DB"],
      liveUrl: "https://fashion-roma.ai",
      client: "Fashion Roma",
      year: "2024",
      duration: "6 settimane",
      team: ["Diego", "Simone"],
      results: [
        { metric: "Customer Satisfaction", value: "+95%", description: "Soddisfazione clienti" },
        { metric: "Response Time", value: "-80%", description: "Riduzione tempo risposta" },
        { metric: "Sales", value: "+120%", description: "Incremento vendite online" }
      ],
      features: [
        "Raccomandazioni AI personalizzate",
        "Chatbot multilingue",
        "Analisi sentiment real-time",
        "Integrazione CRM",
        "Machine Learning predittivo",
        "Dashboard analytics"
      ],
      challenges: [
        "Training del modello su dati fashion",
        "Gestione conversazioni complesse",
        "Integrazione con sistemi esistenti"
      ],
      solutions: [
        "Fine-tuning di GPT-4 su dataset fashion",
        "Implementazione di context awareness",
        "API middleware personalizzate"
      ],
      gradient: "from-purple-500 to-pink-600",
      icon: Bot
    },
    {
      id: 3,
      title: "Automazione FinTech Torino",
      category: "automation",
      description: "Sistema di automazione completo per processi finanziari con RPA, document processing e workflow intelligenti.",
      longDescription: "Sistema di automazione avanzato per FinTech Torino che automatizza completamente i processi di onboarding clienti, verifica documenti, calcolo rischi e generazione report. Include RPA, OCR avanzato e workflow intelligenti.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      technologies: ["Python", "RPA Tools", "OCR", "Machine Learning", "PostgreSQL", "Docker"],
      client: "FinTech Torino",
      year: "2024",
      duration: "8 settimane",
      team: ["Diego", "Tommaso"],
      results: [
        { metric: "Efficienza", value: "+300%", description: "Riduzione tempi processo" },
        { metric: "Errori", value: "-95%", description: "Riduzione errori manuali" },
        { metric: "ROI", value: "+250%", description: "Ritorno investimento annuale" }
      ],
      features: [
        "RPA per processi ripetitivi",
        "OCR intelligente documenti",
        "Workflow automatizzati",
        "Dashboard monitoraggio",
        "Alert e notifiche",
        "Audit trail completo"
      ],
      challenges: [
        "Integrazione con sistemi bancari legacy",
        "Compliance normative finanziarie",
        "Sicurezza dati sensibili"
      ],
      solutions: [
        "API gateway sicure",
        "Crittografia end-to-end",
        "Audit logging completo"
      ],
      gradient: "from-green-500 to-blue-600",
      icon: Zap
    },
    {
      id: 4,
      title: "GreenTech App Mobile",
      category: "mobile",
      description: "App mobile per monitoraggio energia rinnovabile con IoT integration e dashboard real-time.",
      longDescription: "Applicazione mobile nativa per GreenTech che permette il monitoraggio in tempo reale di impianti di energia rinnovabile. Include integrazione IoT, notifiche push intelligenti e analytics predittive.",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
      technologies: ["React Native", "TypeScript", "Node.js", "MongoDB", "IoT", "AWS"],
      liveUrl: "https://greentech-app.com",
      client: "GreenTech Solutions",
      year: "2024",
      duration: "10 settimane",
      team: ["Tommaso", "Diego"],
      results: [
        { metric: "Engagement", value: "+180%", description: "Tempo utilizzo app" },
        { metric: "Efficienza", value: "+90%", description: "Monitoraggio impianti" },
        { metric: "Risparmio", value: "+45%", description: "Riduzione costi energia" }
      ],
      features: [
        "Monitoraggio real-time",
        "Notifiche intelligenti",
        "Dashboard personalizzabili",
        "Integrazione IoT",
        "Analytics predittive",
        "Offline mode"
      ],
      challenges: [
        "Sincronizzazione dati IoT",
        "Performance su dispositivi diversi",
        "Gestione offline/online"
      ],
      solutions: [
        "Protocolli MQTT ottimizzati",
        "Caching intelligente",
        "Sync queue avanzata"
      ],
      gradient: "from-green-400 to-emerald-600",
      icon: Smartphone
    },
    {
      id: 5,
      title: "FoodTech E-commerce Platform",
      category: "ecommerce",
      description: "Piattaforma e-commerce completa per delivery food con AI prediction e gestione multi-ristorante.",
      longDescription: "Piattaforma e-commerce avanzata per FoodTech che gestisce ordini multi-ristorante, predizione AI per inventory management, sistema di rating avanzato e logistics optimization.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
      technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Redis", "AI/ML"],
      liveUrl: "https://foodtech-delivery.com",
      client: "FoodTech Bologna",
      year: "2024",
      duration: "12 settimane",
      team: ["Diego", "Tommaso", "Simone"],
      results: [
        { metric: "Ordini", value: "+220%", description: "Incremento ordini mensili" },
        { metric: "Delivery Time", value: "-35%", description: "Riduzione tempi consegna" },
        { metric: "Customer Retention", value: "+160%", description: "Fidelizzazione clienti" }
      ],
      features: [
        "Multi-restaurant management",
        "AI inventory prediction",
        "Real-time tracking",
        "Payment gateway integrato",
        "Rating system avanzato",
        "Logistics optimization"
      ],
      challenges: [
        "Gestione picchi di traffico",
        "Sincronizzazione multi-ristorante",
        "Ottimizzazione delivery routes"
      ],
      solutions: [
        "Load balancing avanzato",
        "Event-driven architecture",
        "Algoritmi di routing AI"
      ],
      gradient: "from-orange-500 to-red-600",
      icon: ShoppingCart
    },
    {
      id: 6,
      title: "HealthTech Telemedicine Platform",
      category: "web",
      description: "Piattaforma di telemedicina completa con video consultazioni, AI diagnosis support e patient management.",
      longDescription: "Piattaforma completa di telemedicina per HealthTech Firenze che include video consultazioni sicure, supporto AI per diagnosi, gestione pazienti avanzata e integrazione con sistemi ospedalieri.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop",
      technologies: ["React", "WebRTC", "Python", "AI/ML", "FHIR", "AWS"],
      liveUrl: "https://healthtech-telemedicine.com",
      client: "HealthTech Firenze",
      year: "2024",
      duration: "16 settimane",
      team: ["Diego", "Tommaso", "Simone"],
      results: [
        { metric: "Consultazioni", value: "+400%", description: "Aumento consultazioni online" },
        { metric: "Accuracy", value: "+85%", description: "Precisione diagnosi AI" },
        { metric: "Patient Satisfaction", value: "+92%", description: "Soddisfazione pazienti" }
      ],
      features: [
        "Video consultazioni HD",
        "AI diagnosis support",
        "Patient records digitali",
        "Prescription management",
        "Integrazione FHIR",
        "Compliance GDPR/HIPAA"
      ],
      challenges: [
        "Sicurezza dati medici",
        "Qualità video in tempo reale",
        "Integrazione sistemi ospedalieri"
      ],
      solutions: [
        "Crittografia end-to-end",
        "WebRTC ottimizzato",
        "API FHIR standardizzate"
      ],
      gradient: "from-blue-400 to-cyan-600",
      icon: Heart
    }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => (prev + 1) % 3);
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => (prev - 1 + 3) % 3);
    }
  };

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
        style={{ y, opacity }}
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
                Progetti che
              </span>
              <br />
              <motion.span
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 bg-clip-text text-transparent bg-[length:200%_100%]"
              >
                Fanno la Differenza
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 1 }}
              className="text-xl md:text-2xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              Scopri i <span className="text-purple-700 font-semibold">progetti innovativi</span> che abbiamo realizzato per i nostri clienti. 
              Ogni soluzione è <span className="text-purple-700 font-semibold">unica e personalizzata</span>, 
              progettata per superare le aspettative e generare risultati concreti.
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* Portfolio Section */}
      <motion.section
        ref={portfolioRef}
        className="relative py-8 px-4"
      >
        <div className="max-w-7xl mx-auto">
          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={portfolioInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={portfolioInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg'
                    : 'bg-white/80 backdrop-blur-lg border border-purple-200 text-gray-700 hover:border-purple-300 hover:shadow-md'
                }`}
              >
                <category.icon size={18} />
                {category.name}
              </motion.button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
                  className="group relative bg-white/80 backdrop-blur-xl border border-purple-200 rounded-3xl overflow-hidden hover:border-purple-300 hover:shadow-lg transition-all duration-500"
                >
                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <div className={`flex items-center gap-2 px-3 py-1 bg-gradient-to-r ${project.gradient} rounded-full text-white text-sm font-semibold`}>
                        <project.icon size={14} />
                        {categories.find(cat => cat.id === project.category)?.name}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setSelectedProject(project)}
                        className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:bg-white transition-colors duration-300"
                      >
                        <Eye size={18} />
                      </motion.button>
                      {project.liveUrl && (
                        <motion.a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:bg-white transition-colors duration-300"
                        >
                          <ExternalLink size={18} />
                        </motion.a>
                      )}
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Technologies */}
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

                    {/* Project Meta */}
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>{project.client}</span>
                      <span>{project.year}</span>
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
              className="bg-white rounded-3xl shadow-premium-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto"
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
                          <span className="text-gray-600">Durata:</span>
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