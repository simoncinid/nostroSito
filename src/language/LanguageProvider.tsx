import { createContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'

interface LanguageContextProps {
  language: string
  setLanguage: (lang: string) => void
  availableLanguages: { code: string; label: string }[]
}

export const LanguageContext = createContext<LanguageContextProps>({
  language: 'it',
  setLanguage: () => {},
  availableLanguages: [
    { code: 'it', label: 'Italiano' },
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'Français' },
    { code: 'de', label: 'Deutsch' },
    { code: 'es', label: 'Español' },
  ],
})

function getTargetLang(code: string) {
  // DeepL accetta EN, IT, FR, DE, ES, ...
  return code.toUpperCase()
}

async function translateText(text: string, targetLang: string): Promise<string> {
  if (!text.trim()) return text
  const response = await fetch('http://localhost:3001/api/translate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, target_lang: getTargetLang(targetLang) }),
  })
  const data = await response.json()
  if (data.translations && data.translations[0]) {
    return data.translations[0].text
  }
  return text
}

// Funzione ricorsiva per tradurre i nodi di testo del DOM
async function translateDOM(targetLang: string) {
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: (node) => {
        // Escludi nodi vuoti o solo spazi
        if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT
        // Escludi script/style
        if (
          node.parentElement &&
          ['SCRIPT', 'STYLE', 'NOSCRIPT', 'IFRAME', 'CODE', 'PRE'].includes(node.parentElement.tagName)
        ) {
          return NodeFilter.FILTER_REJECT
        }
        return NodeFilter.FILTER_ACCEPT
      },
    }
  )
  const nodes: Text[] = []
  let n = walker.nextNode()
  while (n) {
    nodes.push(n as Text)
    n = walker.nextNode()
  }
  // Traduci in batch per evitare limiti API
  for (const node of nodes) {
    const original = node.nodeValue!
    try {
      const translated = await translateText(original, targetLang)
      node.nodeValue = translated
    } catch (e) {
      // In caso di errore lascia il testo originale
      node.nodeValue = original
    }
  }
}

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState('it')
  const availableLanguages = [
    { code: 'it', label: 'Italiano' },
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'Français' },
    { code: 'de', label: 'Deutsch' },
    { code: 'es', label: 'Español' },
  ]

  const setLanguage = (lang: string) => {
    setLanguageState(lang)
    if (lang !== 'it') {
      translateDOM(lang)
    } else {
      window.location.reload() // Per tornare all'italiano, ricarica la pagina
    }
  }

  useEffect(() => {
    // Se la lingua non è italiano, traduci subito
    if (language !== 'it') {
      translateDOM(language)
    }
  }, [language])

  return (
    <LanguageContext.Provider value={{ language, setLanguage, availableLanguages }}>
      {children}
    </LanguageContext.Provider>
  )
} 