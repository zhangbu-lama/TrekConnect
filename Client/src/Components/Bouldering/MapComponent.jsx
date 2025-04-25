import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import useLocationStore from "../Store/useLocationStore";
import rock from '../../assets/rock.png'; // Import the rock icon

const MapComponent = () => {
  const mapRef = useRef(null);
  const leafletMap = useRef(null);
  const locations = useLocationStore((state) => state.locations);

  useEffect(() => {
    if (!leafletMap.current) {
      leafletMap.current = L.map(mapRef.current).setView([28.17, 85.63], 12);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "© OpenStreetMap",
      }).addTo(leafletMap.current);
    }

    if (locations && Array.isArray(locations)) {
      leafletMap.current.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          leafletMap.current.removeLayer(layer);
        }
      });

      locations.forEach((location) => {
        const markerIcon = L.icon({
          iconUrl: rock, // Use the imported rock icon
          iconSize: [38, 38],
          iconAnchor: [19, 38],
        });

        L.marker([location.lat, location.lng], {
          icon: markerIcon,
        })
          .addTo(leafletMap.current)
          .bindPopup(location.name);
      });
    }

    return () => {
      leafletMap.current?.off();
      leafletMap.current?.remove();
      leafletMap.current = null;
    };
  }, [locations]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="container mx-auto p-6 bg-white rounded-lg shadow-xl border border-gray-200 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-teal-700">Explore Langtang Region</h1>
          <p className="text-lg mt-4 text-gray-600">
            Discover beautiful stone markers and landmarks across the stunning Langtang region.
          </p>
          <p className="text-sm mt-2 text-gray-500">
            Use the map below to find locations and explore the serene beauty of the region.
          </p>
        </div>

        <div className="map-container bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div
            ref={mapRef}
            className="h-96 w-full"
            style={{
              borderRadius: "12px",
              border: "2px solid #e2e8f0",
            }}
          />
        </div>

        <div className="text-center mt-6 text-teal-600">
          <h2 className="text-xl font-semibold">How to Use the Map</h2>
          <p className="text-sm mt-2 text-gray-600">
            Zoom in and out using the controls on the map or by scrolling. Click on any marker to view more
            details about that location.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;