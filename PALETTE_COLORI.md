# 🎨 Palette Colori - Webbitz Frontend

Documento completo di tutti i colori utilizzati nel sito Webbitz per garantire coerenza nella nuova piattaforma.

---

## 📋 Indice

1. [Colori Primari (Blu)](#colori-primari-blu)
2. [Colori Accent (Magenta/Rosa)](#colori-accent-magentarosa)
3. [Colori Grigi](#colori-grigi)
4. [Gradienti](#gradienti)
5. [Colori per Componenti UI](#colori-per-componenti-ui)
6. [Colori per Testi](#colori-per-testi)
7. [Colori per Sfondi](#colori-per-sfondi)
8. [Effetti e Ombre](#effetti-e-ombre)
9. [Colori di Stato](#colori-di-stato)
10. [Variabili CSS](#variabili-css)

---

## 🎯 Colori Primari (Blu)

La palette primaria è basata su tonalità di blu, utilizzata per elementi principali, bottoni primari, link e accenti.

| Nome | Hex | RGB | Utilizzo |
|------|-----|-----|----------|
| Primary 50 | `#E6F4FF` | rgb(230, 244, 255) | Sfondi molto chiari, hover leggeri |
| Primary 100 | `#CCE9FF` | rgb(204, 233, 255) | Sfondi chiari, sezioni secondarie |
| Primary 200 | `#99D3FF` | rgb(153, 211, 255) | Bordi chiari, placeholder |
| Primary 300 | `#66BDFF` | rgb(102, 189, 255) | Elementi interattivi leggeri |
| Primary 400 | `#33A7FF` | rgb(51, 167, 255) | Hover states, icone secondarie |
| **Primary 500** | `#158CFF` | rgb(21, 140, 255) | **COLORE PRIMARIO PRINCIPALE** - Bottoni, link, accenti |
| Primary 600 | `#0F6ECC` | rgb(15, 110, 204) | Hover bottoni, link attivi |
| Primary 700 | `#0B5099` | rgb(11, 80, 153) | Testi su sfondi chiari, stati attivi |
| Primary 800 | `#073266` | rgb(7, 50, 102) | Testi scuri, titoli |
| Primary 900 | `#031433` | rgb(3, 20, 51) | Testi molto scuri, contrasto massimo |

### Variabili CSS Primarie
- `--primary-blue: #158CFF` (Primary 500)
- `--primary-blue-dark: #0F6ECC` (Primary 600)
- `--primary-blue-light: #33A7FF` (Primary 400)

---

## 💜 Colori Accent (Magenta/Rosa)

La palette accent è basata su tonalità di magenta/rosa, utilizzata per creare contrasto e enfatizzare elementi importanti.

| Nome | Hex | RGB | Utilizzo |
|------|-----|-----|----------|
| Accent 50 | `#FFE6FF` | rgb(255, 230, 255) | Sfondi molto chiari accent |
| Accent 100 | `#FFCCFF` | rgb(255, 204, 255) | Sfondi chiari accent |
| Accent 200 | `#FF99FF` | rgb(255, 153, 255) | Bordi accent chiari |
| Accent 300 | `#FF66FF` | rgb(255, 102, 255) | Elementi accent leggeri |
| Accent 400 | `#FF33FF` | rgb(255, 51, 255) | Hover states accent |
| **Accent 500** | `#FE2AFF` | rgb(254, 42, 255) | **COLORE ACCENT PRINCIPALE** - Gradienti, CTA |
| Accent 600 | `#CC22CC` | rgb(204, 34, 204) | Hover accent |
| Accent 700 | `#991999` | rgb(153, 25, 153) | Stati attivi accent |
| Accent 800 | `#661166` | rgb(102, 17, 102) | Testi accent scuri |
| Accent 900 | `#330833` | rgb(51, 8, 51) | Testi accent molto scuri |

### Variabili CSS Accent
- `--accent-blue: #FFE6FF` (Accent 50 - nota: nome legacy)

---

## ⚫ Colori Grigi

Palette di grigi per testi, sfondi, bordi e elementi neutri.

| Nome | Hex | RGB | Utilizzo |
|------|-----|-----|----------|
| Gray 50 | `#FAFAFA` | rgb(250, 250, 250) | **Sfondo principale del sito** |
| Gray 100 | `#F5F5F5` | rgb(245, 245, 245) | Sfondi secondari, scrollbar track |
| Gray 200 | `#E5E5E5` | rgb(229, 229, 229) | Bordi molto chiari |
| Gray 300 | `#D4D4D4` | rgb(212, 212, 212) | Bordi chiari |
| Gray 400 | `#A3A3A3` | rgb(163, 163, 163) | Testi secondari, placeholder |
| Gray 500 | `#737373` | rgb(115, 115, 115) | Testi secondari medi |
| Gray 600 | `#525252` | rgb(82, 82, 82) | Testi secondari scuri |
| Gray 700 | `#404040` | rgb(64, 64, 64) | Testi principali scuri |
| Gray 800 | `#1A1A1A` | rgb(26, 26, 26) | Testi molto scuri, footer |
| Gray 900 | `#0A0A0A` | rgb(10, 10, 10) | **Testo principale del sito** |

### Variabili CSS Grigi
- `--gray-50: #FAFAFA`
- `--gray-100: #F5F5F5`
- `--gray-800: #1A1A1A`
- `--gray-900: #0A0A0A`

---

## 🌈 Gradienti

Gradienti utilizzati per bottoni, sfondi, testi e effetti visivi.

### Gradiente Primario (Principale)
**Utilizzo:** Bottoni primari, CTA, link importanti, scrollbar
```
linear-gradient(135deg, #158CFF 0%, #FE2AFF 100%)
```
- Da: Primary 500 (`#158CFF`)
- A: Accent 500 (`#FE2AFF`)
- Direzione: 135° (diagonale)

**Variabile CSS:** `--gradient-primary`

### Gradiente Secondario
**Utilizzo:** Sfondi leggeri, sezioni decorative
```
linear-gradient(135deg, #FFE6FF 0%, #E6F4FF 100%)
```
- Da: Accent 50 (`#FFE6FF`)
- A: Primary 50 (`#E6F4FF`)
- Direzione: 135° (diagonale)

**Variabile CSS:** `--gradient-secondary`

### Gradiente Scuro
**Utilizzo:** Footer, sezioni dark, overlay
```
linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 100%)
```
- Da: Gray 900 (`#0A0A0A`)
- A: Gray 800 (`#1A1A1A`)
- Direzione: 135° (diagonale)

**Variabile CSS:** `--gradient-dark`

### Altri Gradienti Utilizzati

#### Gradiente Testo Hero
```
from-gray-900 via-primary-800 to-primary-600
```
- Utilizzato per titoli principali con effetto gradient text

#### Gradiente Bottoni Hover
```
from-primary-600 to-accent-600
```
- Hover state per bottoni primari

#### Gradiente Sfondo Hero
```
from-white via-primary-50 to-primary-100
```
- Sfondo della sezione hero principale

#### Gradiente Footer
```
from-gray-900 via-gray-800 to-gray-900
```
- Sfondo del footer

---

## 🎨 Colori per Componenti UI

### Bottoni

#### Bottone Primario
- **Background:** `gradient-primary` (linear-gradient(135deg, #158CFF 0%, #FE2AFF 100%))
- **Testo:** `white` (#FFFFFF)
- **Hover Background:** `from-primary-600 to-accent-600`
- **Hover Shadow:** `rgba(21, 140, 255, 0.4)` (blue-glow)
- **Bordi:** Nessun bordo
- **Border Radius:** `12px` (bottoni standard) / `rounded-full` (bottoni pill)

#### Bottone Secondario
- **Background:** `white/80` con `backdrop-blur-lg`
- **Testo:** `gray-900` (#0A0A0A)
- **Bordo:** `border-primary-200` (#99D3FF)
- **Hover Border:** `border-primary-300`
- **Hover Shadow:** `shadow-lg`

#### Bottone Ghost/Outline
- **Background:** Trasparente
- **Testo:** `gray-700` o `primary-600`
- **Bordo:** `border-primary-200` o `border-gray-300`
- **Hover Background:** `primary-50` o `gray-100`

### Card/Box

#### Card Standard
- **Background:** `white/80` o `white/90` con `backdrop-blur-xl`
- **Bordo:** `border-primary-200` (#99D3FF)
- **Hover Border:** `border-primary-300`
- **Shadow:** `shadow-lg` o `shadow-premium`

#### Card Premium (Packages)
- **Background:** `white/5` con `backdrop-blur-xl`
- **Bordo:** `border-primary-400/50` o `border-white/10`
- **Shadow:** `shadow-glow-lg`
- **Hover:** `border-primary-400/30`

### Navbar

#### Navbar Standard
- **Background:** `white/90` con `backdrop-blur-md`
- **Bordo:** `border-white/10`
- **Shadow:** `shadow-lg`

#### Navbar Scrolled
- **Background:** `white/40` con `backdrop-blur-md` (desktop)
- **Background:** `white/90` con `backdrop-blur-md` (mobile)

### Footer

#### Footer Background
- **Background:** `gradient-dark` (from-gray-900 via-gray-800 to-gray-900)
- **Testo:** `white` (#FFFFFF)
- **Link Hover:** `primary-400` (#33A7FF)

### Modal/Overlay

#### Modal Background
- **Overlay:** `black/50` con `backdrop-blur-sm`
- **Modal Card:** `white` (#FFFFFF)
- **Border Radius:** `rounded-3xl` (24px)

---

## 📝 Colori per Testi

### Testi Principali
- **Titoli H1/H2:** `gray-900` (#0A0A0A) con gradient text effect
- **Titoli H3/H4:** `gray-900` (#0A0A0A) o `primary-700` (#0B5099)
- **Paragrafi:** `gray-700` (#404040) o `gray-600` (#525252)
- **Testo Body:** `gray-900` (#0A0A0A) su sfondo chiaro

### Testi Secondari
- **Placeholder:** `gray-400` (#A3A3A3)
- **Caption:** `gray-500` (#737373)
- **Meta Info:** `gray-500` (#737373) o `gray-600` (#525252)

### Testi Accent
- **Link:** `primary-600` (#0F6ECC)
- **Link Hover:** `primary-700` (#0B5099)
- **Link Attivo:** `primary-600` (#0F6ECC)
- **Enfasi:** `primary-700` (#0B5099) con `font-semibold`

### Testi su Sfondi Scuri
- **Titoli:** `white` (#FFFFFF)
- **Paragrafi:** `gray-300` (#D4D4D4) o `gray-400` (#A3A3A3)
- **Link:** `primary-400` (#33A7FF)
- **Link Hover:** `primary-300` (#66BDFF)

### Gradient Text
- **Hero Title:** `from-gray-900 via-primary-800 to-primary-600`
- **Animated Title:** `from-primary-600 via-primary-500 to-primary-600`
- **Section Titles:** `from-gray-900 via-primary-800 to-primary-600`

---

## 🖼️ Colori per Sfondi

### Sfondi Principali
- **Body Background:** `gray-50` (#FAFAFA)
- **Section Background:** `white` (#FFFFFF)
- **Card Background:** `white/80` o `white/90` con `backdrop-blur-xl`

### Sfondi Hero
- **Hero Main:** `from-white via-primary-50 to-primary-100`
- **Hero Overlay:** `primary-400/10` o `primary-500/10` (blur orbs)

### Sfondi Sezioni Scure
- **Dark Section:** `gradient-dark` (from-gray-900 via-gray-800 to-gray-900)
- **Packages Section:** `from-gray-900 via-gray-800 to-gray-900`
- **Footer:** `from-gray-900 via-gray-800 to-gray-900`

### Sfondi Glassmorphism
- **Glass Light:** `rgba(255, 255, 255, 0.1)` con `backdrop-blur-20px`
- **Glass Dark:** `rgba(0, 0, 0, 0.1)` con `backdrop-blur-20px`
- **Bordo Glass:** `rgba(255, 255, 255, 0.2)`

### Sfondi Pattern
- **Grid Pattern:** `rgba(139, 92, 246, 0.1)` (opacity 10%)
- **Radial Gradient:** `rgba(139, 92, 246, 0.1)` (opacity 10%)

---

## ✨ Effetti e Ombre

### Glow Effects

#### Blue Glow
- **Colore:** `rgba(59, 130, 246, 0.3)` (30% opacity)
- **Variabile CSS:** `--blue-glow`
- **Utilizzo:** Ombre su bottoni, card hover, elementi interattivi

#### Glow Standard
- **Box Shadow:** `0 0 30px rgba(21, 140, 255, 0.3)`
- **Tailwind Class:** `shadow-glow`

#### Glow Large
- **Box Shadow:** `0 0 60px rgba(21, 140, 255, 0.4)`
- **Tailwind Class:** `shadow-glow-lg`

### Box Shadows

#### Shadow Premium
- **Box Shadow:** `0 25px 50px -12px rgba(0, 0, 0, 0.25)`
- **Tailwind Class:** `shadow-premium`

#### Shadow Premium Large
- **Box Shadow:** `0 35px 60px -12px rgba(0, 0, 0, 0.35)`
- **Tailwind Class:** `shadow-premium-lg`

#### Shadow Standard
- **Box Shadow:** `0 10px 30px rgba(59, 130, 246, 0.15)`
- **Utilizzo:** Card hover, bottoni hover

### Text Shadow
- **Text Glow:** `0 0 20px rgba(59, 130, 246, 0.3)`
- **Tailwind Class:** `text-glow`

### Drop Shadow
- **Logo Shadow:** `drop-shadow(0 0 10px rgba(59, 130, 246, 0.3))`
- **Hero Logo Shadow:** `drop-shadow(0 0 100px rgba(59, 130, 246, 0.4))`

---

## 🚦 Colori di Stato

### Successo
- **Background:** `green-500` (#22C55E)
- **Testo:** `white` (#FFFFFF)
- **Utilizzo:** Notifiche di successo, badge completati

### Errore
- **Background:** `red-500` (#EF4444)
- **Testo:** `white` (#FFFFFF)
- **Utilizzo:** Errori, validazione form

### Warning
- **Background:** `yellow-500` (#EAB308)
- **Testo:** `white` (#FFFFFF)
- **Utilizzo:** Avvisi, notifiche

### Info
- **Background:** `primary-500` (#158CFF)
- **Testo:** `white` (#FFFFFF)
- **Utilizzo:** Informazioni, tooltip

### Badge Popolare
- **Background:** `from-yellow-400 to-yellow-600` (gradiente)
- **Testo:** `white` (#FFFFFF)
- **Utilizzo:** Badge "Più Popolare" sui pacchetti

### Stelle (Rating)
- **Colore:** `yellow-400` (#FACC15)
- **Fill:** `yellow-400` (#FACC15)
- **Utilizzo:** Valutazioni, recensioni

### Browser Window (Animazioni)
- **Red Dot:** `red-500` (#EF4444)
- **Yellow Dot:** `yellow-500` (#EAB308)
- **Green Dot:** `green-500` (#22C55E)

---

## 🔧 Variabili CSS

Tutte le variabili CSS definite in `src/index.css`:

```css
:root {
  /* Palette Blu Premium */
  --primary-blue: #158CFF;
  --primary-blue-dark: #0F6ECC;
  --primary-blue-light: #33A7FF;
  --accent-blue: #FFE6FF;
  --blue-glow: rgba(59, 130, 246, 0.3);
  
  /* Grigi Premium */
  --gray-50: #FAFAFA;
  --gray-100: #F5F5F5;
  --gray-900: #0A0A0A;
  --gray-800: #1A1A1A;
  
  /* Gradients */
  --gradient-primary: linear-gradient(135deg, #158CFF 0%, #FE2AFF 100%);
  --gradient-secondary: linear-gradient(135deg, #FFE6FF 0%, #E6F4FF 100%);
  --gradient-dark: linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 100%);
}
```

---

## 📐 Utilizzo Tailwind

### Classi Tailwind Personalizzate

#### Background Gradients
- `bg-gradient-primary` → `linear-gradient(135deg, #158CFF 0%, #FE2AFF 100%)`
- `bg-gradient-secondary` → `linear-gradient(135deg, #FFE6FF 0%, #E6F4FF 100%)`
- `bg-gradient-dark` → `linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 100%)`

#### Box Shadows
- `shadow-glow` → `0 0 30px rgba(21, 140, 255, 0.3)`
- `shadow-glow-lg` → `0 0 60px rgba(21, 140, 255, 0.4)`
- `shadow-premium` → `0 25px 50px -12px rgba(0, 0, 0, 0.25)`
- `shadow-premium-lg` → `0 35px 60px -12px rgba(0, 0, 0, 0.35)`

#### Backdrop Blur
- `backdrop-blur-xs` → `2px`
- `backdrop-blur-lg` → `20px` (standard)
- `backdrop-blur-xl` → `24px`

---

## 🎯 Colori Principali da Ricordare

### Top 10 Colori Essenziali

1. **Primary 500** - `#158CFF` - Colore primario principale
2. **Accent 500** - `#FE2AFF` - Colore accent principale
3. **Gray 50** - `#FAFAFA` - Sfondo principale
4. **Gray 900** - `#0A0A0A` - Testo principale
5. **Primary 600** - `#0F6ECC` - Hover primario
6. **Gray 700** - `#404040` - Testi secondari
7. **White** - `#FFFFFF` - Testo su sfondi scuri
8. **Primary 400** - `#33A7FF` - Elementi interattivi
9. **Gray 100** - `#F5F5F5` - Sfondi secondari
10. **Blue Glow** - `rgba(59, 130, 246, 0.3)` - Effetti glow

---

## 📱 Responsive Colors

I colori rimangono consistenti su tutti i dispositivi. Le uniche variazioni sono:
- **Opacità backdrop-blur** può variare per performance su mobile
- **Intensità glow** può essere ridotta su dispositivi meno potenti

---

## 🔄 Coerenza con Nuova Piattaforma

Per garantire coerenza, utilizzare:

1. **Stessa palette primaria** (Primary 500: `#158CFF`)
2. **Stesso gradiente principale** per CTA e bottoni importanti
3. **Stessa scala di grigi** per testi e sfondi
4. **Stessi effetti glow** per elementi interattivi
5. **Stesse variabili CSS** quando possibile

---

## 📚 Fonti

- `tailwind.config.js` - Configurazione palette Tailwind
- `src/index.css` - Variabili CSS globali
- Componenti React - Utilizzo pratico dei colori

---

**Ultimo aggiornamento:** Gennaio 2025
**Versione:** 1.0
