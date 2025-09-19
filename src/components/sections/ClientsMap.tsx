import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ChevronDown, MapPin } from 'lucide-react'

declare global {
  interface Window {
    google: any;
    initMap?: () => void;
    openInfoWindow?: any;
  }
}

const ClientsMap = () => {
  const { t } = useTranslation()
  const mapRef = useRef<HTMLDivElement>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [mapInstance, setMapInstance] = useState<any>(null)
  const [markers, setMarkers] = useState<any[]>([])

  // Funzione per evidenziare un marker specifico (hover)
  const highlightMarker = (markerIndex: number) => {
    if (!mapInstance || !markers[markerIndex]) return;
    
    const markerData = markers[markerIndex];
    const marker = markerData.marker;
    
    // Centra la mappa sul marker
    mapInstance.setCenter(marker.getPosition());
    mapInstance.setZoom(8);
    
    // Evidenzia il marker con un'animazione
    marker.setAnimation(window.google.maps.Animation.BOUNCE);
    setTimeout(() => {
      marker.setAnimation(null);
    }, 2000);
    
    // Apri l'InfoWindow immediatamente
    const infoWindow = markerData.infoWindow;
    if (infoWindow) {
      // Chiudi altre InfoWindow aperte
      if (window.openInfoWindow) {
        window.openInfoWindow.close();
      }
      infoWindow.open(mapInstance, marker);
      window.openInfoWindow = infoWindow;
    }
  }

  // Funzione per chiudere il dropdown quando si clicca su un elemento
  const selectClient = (markerIndex: number) => {
    highlightMarker(markerIndex);
    setIsDropdownOpen(false);
  }

  // Stile personalizzato per la mappa (viola e bianco)
  const mapStyles = [
    {
      "featureType": "all",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#7C3AED"
        }
      ]
    },
    {
      "featureType": "all",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#ffffff"
        },
        {
          "weight": 2
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#F5F3FF"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#8B5CF6"
        },
        {
          "weight": 1
        }
      ]
    },
    {
      "featureType": "landscape",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ffffff"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#EDE9FE"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#DDD6FE"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#A78BFA"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#C4B5FD"
        }
      ]
    }
  ]

  // Posizioni dei clienti
  const clientLocations = [
    { lat: 45.4642, lng: 9.1900, name: "ThinkGood Music (Milano)", link: "https://thinkgoodmusic.com" },
    { lat: 51.7520, lng: -1.2577, name: "Threshold Coach (Oxfordshire)", link: "https://www.threshold.coach/" },
    { lat: 40.6331, lng: -89.3985, name: "RnD Hub (Illinois)", link: "https://rndhub.io/" },
    { lat: 45.4064, lng: 11.8768, name: "Welpy (Padova)", link: "https://www.welpy.it/" },
    { lat: 45.4742, lng: 9.2100, name: "The Admission Hub (Milano)", link: "https://theadmissionhub.com/" },
    { lat: 43.3947, lng: 10.4177, name: "Vistamare (Livorno)", link: "https://www.vistamarerosignano.it/" },
    { lat: 43.6619, lng: 10.6306, name: "Area287 (Pisa)", link: "https://area287.it" },
    { lat: 43.6719, lng: 10.6406, name: "Fantozzi Bar (Pisa)", link: "https://barfantozzi.it" },
    { lat: 43.5511, lng: 11.2408, name: "Ristoro L'Antica Scuderia (Firenze)", link: "https://www.ristorolanticascuderia.it/" },
    { lat: 43.5515, lng: 11.2412, name: "La Bottega della Scuderia (Firenze)", link: "https://labottegadellascruderia.com" },
    { lat: 43.6167, lng: 10.2833, name: "Bagno Paradiso (Livorno)", link: "https://bagnoparadisotirrenia.it" },
    { lat: 40.8518, lng: 14.2681, name: "Napoli Into Core (Napoli)", link: "https://napolintocore.it" },
    { lat: 43.5500, lng: 10.3167, name: "Spicchio Di Luna (Livorno)", link: "https://spicchiodiluna.it" },
    { lat: 40.8518, lng: 14.2681, name: "Diaz Microtorrefazione (Napoli)", link: "https://diazmicrotorrefazione.com" }
  ]

  useEffect(() => {
    // Carica Google Maps API
    const loadGoogleMaps = () => {
      if (window.google) {
        initializeMap()
        return
      }

      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBeeaMML5_I6jEdAWEKM2CzblRLYMmQ1qU&callback=initMap`
      script.async = true
      script.defer = true
      document.head.appendChild(script)

      window.initMap = initializeMap
    }

    const initializeMap = () => {
      if (!mapRef.current) return

      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 45.0, lng: 10.0 }, // Centro iniziale sull'Italia
        zoom: 5, // Zoom focalizzato sull'Italia
        styles: mapStyles,
        disableDefaultUI: true,
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        gestureHandling: 'cooperative'
      })
      
      // Salva l'istanza della mappa
      setMapInstance(map);

      // Variabile per tenere traccia della infoWindow aperta
      window.openInfoWindow = null;

      // Aggiungi marker per ogni cliente
      const createdMarkers: any[] = [];
      clientLocations.forEach((location, index) => {
        const marker = new window.google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map: map,
          title: location.name,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 12,
            fillColor: '#D946EF', // fuxia
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 4
          },
          animation: window.google.maps.Animation.DROP
        })

        // Aggiungi info window
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 15px; font-family: Inter, sans-serif; text-align: center; min-width: 200px;">
              <h3 style="color: #7C3AED; margin: 0 0 8px 0; font-size: 16px; font-weight: 700; text-align: center;">
                ${location.name}
              </h3>
              <p style="color: #6B7280; margin: 0 0 12px 0; font-size: 13px; text-align: center;">
                ${t('clientsMap.clientInfo')}
              </p>
              ${location.link ? `<button 
                style="
                  background: linear-gradient(to right, #8B5CF6, #6D28D9); 
                  color: white; 
                  border: none; 
                  padding: 8px 16px; 
                  border-radius: 8px; 
                  font-size: 13px;
                  font-weight: 600;
                  cursor: pointer;
                  transition: all 0.2s;
                  box-shadow: 0 4px 6px rgba(139, 92, 246, 0.25);"
                onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 10px rgba(139, 92, 246, 0.3)';" 
                onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 6px rgba(139, 92, 246, 0.25)';"
                onclick="window.open('${location.link}', '_blank')"
              >
                ${t('clientsMap.visitSite')}
              </button>` : ''}
            </div>
          `
        })

        infoWindow.setOptions({
          pixelOffset: new window.google.maps.Size(0, -5),
          maxWidth: 250,
          minWidth: 200
        })
        
        // Associa l'InfoWindow al marker
        marker.infoWindow = infoWindow;

        marker.addListener('click', () => {
          if (window.openInfoWindow) {
            window.openInfoWindow.close();
          }
          infoWindow.open(map, marker);
          window.openInfoWindow = infoWindow;
        })
        
        // Salva il marker con le informazioni del cliente e l'InfoWindow
        createdMarkers.push({
          marker,
          location,
          index,
          infoWindow
        });

        // Animazione ritardata per i marker
        setTimeout(() => {
          marker.setAnimation(window.google.maps.Animation.BOUNCE)
          setTimeout(() => {
            marker.setAnimation(null)
          }, 1500)
        }, index * 200)
      })
      
      // Salva i marker nello stato
      setMarkers(createdMarkers);
    }

    loadGoogleMaps()

    return () => {
      // Cleanup
      if (window.initMap) {
        window.initMap = undefined
      }
    }
  }, [t])

  // Chiudi dropdown quando si clicca fuori (ma non sui clienti)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isDropdownOpen) {
        const target = event.target as HTMLElement;
        const dropdown = target.closest('.dropdown-container');
        if (!dropdown) {
          setIsDropdownOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen])

  return (
    <div className="flex justify-center py-16">
      <div className="w-full" style={{ maxWidth: '80vw' }}>
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">
        {t('clientsMap.title')} <span className="bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">{t('clientsMap.titleHighlight')}</span>
      </h2>
      {/* Mappa Google Maps */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative w-full h-96 md:h-[600px] rounded-3xl overflow-hidden shadow-premium border border-purple-200"
      >
        <div 
          ref={mapRef} 
          className="w-full h-full"
          style={{ minHeight: '16rem' }}
        />
        {/* Overlay con legenda */}
        <div className="absolute top-2 left-2 md:top-6 md:left-6 bg-white/90 backdrop-blur-lg rounded-2xl p-2 md:p-4 shadow-lg border border-purple-200">
          <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-3">{t('clientsMap.clickMarkers')}</p>
          <div className="flex items-center gap-1 md:gap-2 text-xs md:text-sm text-purple-700">
            <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
            <span>{t('clientsMap.completedProjects')}</span>
          </div>
        </div>
        {/* Stats overlay */}
        <div className="absolute top-2 right-2 md:top-6 md:right-6 bg-white/90 backdrop-blur-lg rounded-2xl p-2 md:p-4 shadow-lg border border-purple-200">
          <div className="text-center">
            <div className="text-lg md:text-2xl font-bold text-purple-600">{clientLocations.length}</div>
            <div className="text-xs text-gray-600 mb-2">{t('clientsMap.activeClients')}</div>
            
            {/* Dropdown per lista clienti */}
            <div className="relative dropdown-container">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-1 text-xs text-purple-600 hover:text-purple-800 transition-colors duration-200"
              >
                <MapPin size={12} />
                <span>Lista Clienti</span>
                <ChevronDown size={10} className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Dropdown menu */}
              {isDropdownOpen && (
                <div className="absolute top-6 right-0 bg-white rounded-lg shadow-lg border border-purple-200 py-2 min-w-[200px] max-h-[300px] overflow-y-auto z-10 scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-purple-100">
                  {clientLocations.map((location, index) => (
                    <button
                      key={index}
                      onMouseEnter={() => highlightMarker(index)}
                      onClick={() => selectClient(index)}
                      className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors duration-200 flex items-center gap-2"
                    >
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      <span className="truncate">{location.name}</span>
                    </button>
                  ))}
                  {/* Indicatore scroll */}
                  {clientLocations.length > 8 && (
                    <div className="text-center py-1 text-xs text-purple-500 border-t border-purple-100 mt-1">
                      {t('clientsMap.scrollToSeeAll')}
                    </div>
                  )}
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