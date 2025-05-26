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

  // Posizioni dei clienti in Toscana
  const clientLocations = [
    { lat: 43.7696, lng: 11.2558, name: "Firenze - TechStart" },
    { lat: 43.3188, lng: 11.3307, name: "Siena - Fashion Boutique" },
    { lat: 43.5402, lng: 10.3106, name: "Pisa - FinTech Solutions" },
    { lat: 43.8777, lng: 10.2014, name: "Lucca - GreenTech" },
    { lat: 42.4396, lng: 11.2134, name: "Grosseto - FoodTech" },
    { lat: 43.4642, lng: 11.8816, name: "Arezzo - HealthTech" },
    { lat: 43.9493, lng: 10.5055, name: "Viareggio - Tourism Tech" },
    { lat: 42.7635, lng: 11.1168, name: "Follonica - Marine Tech" }
  ]

  useEffect(() => {
    // Carica Google Maps API
    const loadGoogleMaps = () => {
      if (window.google) {
        initializeMap()
        return
      }

      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dO_BcqCGAOtEAA&callback=initMap`
      script.async = true
      script.defer = true
      document.head.appendChild(script)

      window.initMap = initializeMap
    }

    const initializeMap = () => {
      if (!mapRef.current) return

      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 43.4642, lng: 11.2558 }, // Centro della Toscana
        zoom: 8,
        styles: mapStyles,
        disableDefaultUI: true,
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        gestureHandling: 'cooperative'
      })

      // Aggiungi marker per ogni cliente
      clientLocations.forEach((location, index) => {
        const marker = new window.google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map: map,
          title: location.name,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: '#8B5CF6',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 3
          },
          animation: window.google.maps.Animation.DROP
        })

        // Aggiungi info window
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 10px; font-family: Inter, sans-serif;">
              <h3 style="color: #7C3AED; margin: 0 0 5px 0; font-size: 14px; font-weight: 600;">
                ${location.name}
              </h3>
              <p style="color: #6B7280; margin: 0; font-size: 12px;">
                Cliente Webbitz - Progetto completato
              </p>
            </div>
          `
        })

        marker.addListener('click', () => {
          infoWindow.open(map, marker)
        })

        // Animazione ritardata per i marker
        setTimeout(() => {
          marker.setAnimation(window.google.maps.Animation.BOUNCE)
          setTimeout(() => {
            marker.setAnimation(null)
          }, 2000)
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
      {/* Mappa Google Maps */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative w-full h-[600px] rounded-3xl overflow-hidden shadow-premium border border-purple-200"
      >
        <div 
          ref={mapRef} 
          className="w-full h-full"
          style={{ minHeight: '600px' }}
        />
        
        {/* Overlay con informazioni */}
        <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-lg rounded-2xl p-4 shadow-lg border border-purple-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">I Nostri Clienti in Toscana</h3>
          <p className="text-sm text-gray-600 mb-3">Clicca sui marker per scoprire i progetti</p>
          <div className="flex items-center gap-2 text-sm text-purple-700">
            <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
            <span>Progetti completati</span>
          </div>
        </div>

        {/* Stats overlay */}
        <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-lg rounded-2xl p-4 shadow-lg border border-purple-200">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-purple-600">50+</div>
              <div className="text-xs text-gray-600">Città Raggiunte</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">150+</div>
              <div className="text-xs text-gray-600">Clienti Attivi</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ClientsMap 