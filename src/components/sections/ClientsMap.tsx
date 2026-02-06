import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ChevronDown, MapPin } from 'lucide-react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Custom marker icon
const customIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
      <circle cx="12" cy="12" r="10" fill="#E85002" stroke="#ffffff" stroke-width="3"/>
    </svg>
  `),
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16]
})

// Component to fly to location
const FlyToLocation = ({ location }: { location: { lat: number, lng: number } | null }) => {
  const map = useMap()
  
  if (location) {
    map.flyTo([location.lat, location.lng], 8, { duration: 1.5 })
  }
  
  return null
}

const ClientsMap = () => {
  const { t } = useTranslation()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number, lng: number } | null>(null)

  // Posizioni dei clienti
  const clientLocations = [
    { lat: 45.4592, lng: 9.1768, name: "ThinkGood Music (Milano)", link: "https://www.thinkgoodmusic.com" },
    { lat: 51.7520, lng: -1.2577, name: "Threshold Coach (Oxfordshire)", link: "https://www.threshold.coach/" },
    { lat: 40.6331, lng: -89.3985, name: "RnD Hub (Illinois)", link: "https://rndhub.io/" },
    { lat: 45.4064, lng: 11.8768, name: "Welpy (Padova)", link: "https://www.welpy.it/" },
    { lat: 45.5230, lng: 9.1765, name: "The Admission Hub (Milano)", link: "https://theadmissionhub.com/" },
    { lat: 43.3947, lng: 10.4177, name: "Vistamare (Livorno)", link: "https://www.vistamarerosignano.it/" },
    { lat: 43.6619, lng: 10.6306, name: "Area287 (Pisa)", link: "https://area287.it" },
    { lat: 43.6719, lng: 10.6406, name: "Fantozzi Bar (Pisa)", link: "https://barfantozzi.it" },
    { lat: 43.5511, lng: 11.2408, name: "Ristoro L'Antica Scuderia (Barberino Tavernelle)", link: "https://www.ristorolanticascuderia.it/" },
    { lat: 43.5515, lng: 11.2412, name: "La Bottega della Scuderia (Firenze)", link: "https://labottegadellascuderia.com" },
    { lat: 43.6167, lng: 10.2833, name: "Bagno Paradiso (Livorno)", link: "https://bagnoparadisotirrenia.it" },
    { lat: 40.8356, lng: 14.2250, name: "Napoli Into Core (Napoli)", link: "https://napolintocore.it" },
    { lat: 43.5500, lng: 10.3167, name: "Spicchio Di Luna (Livorno)", link: "https://spicchiodiluna.it" },
    { lat: 40.8520, lng: 14.2613, name: "Diaz Microtorrefazione (Napoli)", link: "https://diazmicrotorrefazione.com" }
  ]

  const selectClient = (index: number) => {
    setSelectedLocation({ lat: clientLocations[index].lat, lng: clientLocations[index].lng })
    setIsDropdownOpen(false)
  }

  return (
    <div className="flex justify-center py-16">
      <div className="w-full" style={{ maxWidth: '80vw' }}>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center">
          {t('clientsMap.title')} <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">{t('clientsMap.titleHighlight')}</span>
        </h2>
        
        {/* Mappa Leaflet */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative w-full h-96 md:h-[600px] rounded-3xl overflow-hidden shadow-premium border border-white/10"
        >
          <MapContainer
            center={[45.0, 10.0]}
            zoom={5}
            style={{ height: '100%', width: '100%' }}
            zoomControl={true}
            scrollWheelZoom={true}
          >
            {/* Dark theme tile layer */}
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            
            <FlyToLocation location={selectedLocation} />
            
            {clientLocations.map((location, index) => (
              <Marker 
                key={index} 
                position={[location.lat, location.lng]}
                icon={customIcon}
              >
                <Popup>
                  <div className="text-center min-w-[180px]">
                    <h3 className="text-primary-600 font-bold text-sm mb-2">
                      {location.name}
                    </h3>
                    <p className="text-gray-600 text-xs mb-3">
                      {t('clientsMap.clientInfo')}
                    </p>
                    {location.link && (
                      <a
                        href={location.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-gradient-to-r from-primary-500 to-primary-600 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all"
                      >
                        {t('clientsMap.visitSite')}
                      </a>
                    )}
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
          
          {/* Overlay con legenda */}
          <div className="absolute top-2 left-2 md:top-6 md:left-6 bg-gray-900/90 backdrop-blur-lg rounded-2xl p-2 md:p-4 shadow-lg border border-white/10 z-10">
            <p className="text-xs md:text-sm text-gray-300 mb-2 md:mb-3">{t('clientsMap.clickMarkers')}</p>
            <div className="flex items-center gap-1 md:gap-2 text-xs md:text-sm text-primary-400">
              <div className="w-3 h-3 bg-primary-600 rounded-full"></div>
              <span>{t('clientsMap.completedProjects')}</span>
            </div>
          </div>
          
          {/* Stats overlay */}
          <div className="absolute top-2 right-2 md:top-6 md:right-6 bg-gray-900/90 backdrop-blur-lg rounded-2xl p-2 md:p-4 shadow-lg border border-white/10 z-10">
            <div className="text-center">
              <div className="text-lg md:text-2xl font-bold text-primary-400">{clientLocations.length}</div>
              <div className="text-xs text-gray-300 mb-2">{t('clientsMap.activeClients')}</div>
              
              {/* Dropdown per lista clienti */}
              <div className="relative dropdown-container">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-1 text-xs text-primary-400 hover:text-primary-300 transition-colors duration-200"
                >
                  <MapPin size={12} />
                  <span>Lista Clienti</span>
                  <ChevronDown size={10} className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Dropdown menu */}
                {isDropdownOpen && (
                  <div className="absolute top-6 right-0 bg-gray-800 rounded-lg shadow-lg border border-white/10 py-2 min-w-[200px] max-h-[300px] overflow-y-auto z-10">
                    {clientLocations.map((location, index) => (
                      <button
                        key={index}
                        onClick={() => selectClient(index)}
                        className="w-full text-left px-3 py-2 text-xs text-gray-200 hover:bg-white/10 hover:text-primary-400 transition-colors duration-200 flex items-center gap-2"
                      >
                        <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                        <span className="truncate">{location.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ClientsMap
