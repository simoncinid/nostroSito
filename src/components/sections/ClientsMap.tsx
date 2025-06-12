import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

declare global {
  interface Window {
    google: any;
    initMap?: () => void;
  }
}

const ClientsMap = () => {
  const mapRef = useRef<HTMLDivElement>(null)

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
    { lat: 45.4642, lng: 9.1900, name: "ThinkGood Music (MI)", link: null },
    { lat: 51.7520, lng: -1.2577, name: "Threshold Coach (OX)", link: "https://www.threshold.coach/" },
    { lat: 40.6331, lng: -89.3985, name: "RnD Hub (IL)", link: "https://rndhub.io/" },
    { lat: 45.4064, lng: 11.8768, name: "Welpy (PD)", link: "https://www.welpy.it/" },
    { lat: 45.4642, lng: 9.1900, name: "The Admission Hub (MI)", link: "https://theadmissionhub.com/" },
    { lat: 43.3947, lng: 10.4177, name: "Vistamare (LI)", link: "https://www.vistamarerosignano.it/" }
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
        center: { lat: 45.0, lng: 10.0 }, // Centro sull'Italia
        zoom: 5,
        styles: mapStyles,
        disableDefaultUI: true,
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        gestureHandling: 'cooperative'
      })

      // Variabile per tenere traccia della infoWindow aperta
      let openInfoWindow: any = null;

      // Aggiungi marker per ogni cliente
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
                Cliente Webbitz - Progetto completato
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
                Visita Sito
              </button>` : ''}
            </div>
          `
        })

        infoWindow.setOptions({
          pixelOffset: new window.google.maps.Size(0, -5),
          maxWidth: 250,
          minWidth: 200
        })

        marker.addListener('click', () => {
          if (openInfoWindow) {
            openInfoWindow.close();
          }
          infoWindow.open(map, marker);
          openInfoWindow = infoWindow;
        })

        // Animazione ritardata per i marker
        setTimeout(() => {
          marker.setAnimation(window.google.maps.Animation.BOUNCE)
          setTimeout(() => {
            marker.setAnimation(null)
          }, 1500)
        }, index * 200)
      })
    }

    loadGoogleMaps()

    return () => {
      // Cleanup
      if (window.initMap) {
        window.initMap = undefined
      }
    }
  }, [])

  return (
    <div className="container-premium">
      <h2 className="heading-lg text-gray-900 mb-6 text-center">
        Progetti <span className="bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">Internazionali</span>
      </h2>
      {/* Mappa Google Maps */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative w-full h-64 md:h-[600px] rounded-3xl overflow-hidden shadow-premium border border-purple-200"
      >
        <div 
          ref={mapRef} 
          className="w-full h-full"
          style={{ minHeight: '16rem' }}
        />
        {/* Overlay con legenda */}
        <div className="absolute top-2 left-2 md:top-6 md:left-6 bg-white/90 backdrop-blur-lg rounded-2xl p-2 md:p-4 shadow-lg border border-purple-200">
          <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-3">Clicca sui marker per scoprire i progetti</p>
          <div className="flex items-center gap-1 md:gap-2 text-xs md:text-sm text-purple-700">
            <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
            <span>Progetti completati</span>
          </div>
        </div>
        {/* Stats overlay */}
        <div className="absolute top-2 right-2 md:top-6 md:right-6 bg-white/90 backdrop-blur-lg rounded-2xl p-2 md:p-4 shadow-lg border border-purple-200">
          <div className="text-center">
            <div className="text-lg md:text-2xl font-bold text-purple-600">6</div>
            <div className="text-xs text-gray-600">Clienti Attivi</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ClientsMap 