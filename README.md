# 🚀 Webbitz - Premium Digital Agency Website

Un sito web ultra-moderno da $1,000,000 per Webbitz Digital Agency.

## ✨ Caratteristiche Premium

- **Design Ultra-Moderno** con palette viola e bianco luxury
- **Animazioni Incredibili** con Framer Motion
- **Mappa Interattiva dei Clienti** (caratteristica unica!)
- **Pacchetti Webbitz** chiaramente presentati (€1999 e €2299)
- **Responsive Design** perfetto su tutti i dispositivi
- **Performance Ottimizzate** per velocità massima

## 🛠️ Tecnologie Utilizzate

- **React 18** + TypeScript
- **Tailwind CSS** (configurazione custom)
- **Framer Motion** (animazioni premium)
- **React Router** (navigazione SPA)
- **Lucide React** (icone moderne)
- **Vite** (build tool veloce)

## 🚀 Deploy su Vercel

1. Connetti il repository a Vercel
2. Vercel rileverà automaticamente Vite
3. Il deploy avverrà automaticamente

### Variabili d'ambiente (form "Raccontaci la tua idea")

Per ricevere i lead via email su **webbitz.official@gmail.com**, imposta su Vercel (Project → Settings → Environment Variables):

- `GMAIL_USER`: `reservationwebbitz@gmail.com`
- `GMAIL_APP_PASSWORD`: password app Gmail (16 caratteri, da [Account Google → Sicurezza → Password per le app](https://myaccount.google.com/apppasswords))

### Comandi di Build

```bash
# Installazione dipendenze
npm install --legacy-peer-deps

# Build di produzione
npm run build

# Preview locale
npm run preview
```

## 📁 Struttura del Progetto

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx      # Navbar glassmorphism
│   │   └── Footer.tsx      # Footer premium
│   └── sections/
│       ├── Hero.tsx        # Hero con animazioni 3D
│       ├── ClientsMap.tsx  # Mappa interattiva clienti
│       ├── WebbitzPackages.tsx # Pacchetti pricing
│       ├── Stats.tsx       # Statistiche animate
│       ├── Features.tsx    # Caratteristiche servizi
│       └── Testimonials.tsx # Recensioni clienti
├── pages/
│   ├── Home.tsx           # Homepage completa
│   ├── About.tsx          # Chi Siamo
│   ├── Services.tsx       # Servizi
│   ├── Portfolio.tsx      # Portfolio
│   └── Contact.tsx        # Contatti
└── types/
    └── smoothscroll-polyfill.d.ts # Tipi TypeScript
```

## 🎨 Design System

- **Colori Primari**: Viola (#8B5CF6, #7C3AED)
- **Font**: Inter (corpo), Space Grotesk (titoli)
- **Effetti**: Glassmorphism, Glow, Gradients
- **Animazioni**: Scroll-triggered, Hover effects, Micro-interactions

## 🌟 Caratteristiche Uniche

### Mappa Interattiva dei Clienti
- 6 clienti posizionati geograficamente in Italia
- Marker cliccabili con animazioni
- Modal popup con progetti realizzati
- Tooltip informativi al hover

### Pacchetti Webbitz
- **Essential**: €1999 (Sito + Chatbot + SEO)
- **Premium**: €2299 (Essential + Brand Identity)
- Design cards premium con animazioni

### Animazioni Premium
- Hero con elementi fluttuanti
- Contatori animati nelle statistiche
- Scroll-triggered animations
- Micro-interactions su hover

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints ottimizzati
- Touch-friendly interactions
- Performance ottimizzate

---

**Webbitz Digital Agency** - Trasformiamo le tue idee digitali in esperienze straordinarie 🇮🇹✨
