import React from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { X } from "lucide-react";
import "leaflet/dist/leaflet.css";

// Fix Leaflet marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

function LocationMarker({ setLocation }) {
  useMapEvents({
    click(e) {
      setLocation(e.latlng);
    },
  });
  return null;
}

export default function DestinationModal({ isOpen, onClose, location, setLocation }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl shadow-xl relative z-50">
        <button onClick={onClose} className="absolute cursor-pointer transition-all top-8 right-6 text-gray-500 hover:text-black">
          <X className="w-6 h-6" />
        </button>

        <div className="p-6 pt-10">
          <h2 className="text-2xl font-semibold text-center">Select Destination</h2>
          <p className="text-center text-gray-500 mb-4">Drop the pointer to select your destination</p>

          <div className="w-full h-[400px] rounded-md overflow-hidden border">
            <MapContainer
              center={location}
              zoom={14}
              scrollWheelZoom={true}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <LocationMarker setLocation={setLocation} />
              <Marker position={location} />
            </MapContainer>
          </div>

          <div className="flex justify-center mt-4">
            <button
              onClick={onClose}
              className="bg-blue-500 hover:bg-blue-600 cursor-pointer transition-all text-white px-6 py-2 rounded-md"
            >
              Confirm Destination
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
