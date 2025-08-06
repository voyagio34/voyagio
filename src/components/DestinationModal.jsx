import React, { useCallback, useEffect, useState } from "react";
import { X } from "lucide-react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";


const containerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = {
  lat: 28.6139, // New Delhi
  lng: 77.2090,
};

export default function DestinationModal({ isOpen, onClose, location, setLocation }) {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden'); // Cleanup
    };
  }, [isOpen]);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_REACT_GOOGLE_MAPS_API_KEY,
    libraries: ['places']
  });

  const [searchValue, setSearchValue] = useState(null);

  // Keep search input in sync with selected location
  useEffect(() => {
    if (!location) setSearchValue(null);
  }, [location]);

  const handleMapClick = useCallback((event) => {
    setLocation({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  }, [setLocation]);

  const handlePlaceSelect = (place) => {
    const lat = place.value.geometry.location.lat();
    const lng = place.value.geometry.location.lng();
    const coords = { lat, lng };
    setLocation(coords);
    setSearchValue(place);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl shadow-xl relative z-50">
        <button onClick={onClose} className="absolute cursor-pointer transition-all top-8 right-6 text-gray-500 hover:text-black">
          <X className="w-6 h-6" />
        </button>


        <div className="p-6 pt-10">
          <h2 className="text-2xl font-semibold text-center">Select Destination</h2>
          <p className="text-center text-gray-500 mb-4">Search or click on map to select a location</p>

          {/* 🔍 Autocomplete Search */}
          <div className="mb-4 relative w-full">
            <GooglePlacesAutocomplete
              apiKey={import.meta.env.VITE_REACT_GOOGLE_MAP_API_KEY}
              
              selectProps={{
                value: searchValue,
                onChange: handlePlaceSelect,
                placeholder: 'Search a city, region',
                isClearable: 'true',
                components: {
                  DropdownIndicator: () => null, // Hides dropdown arrow
                  IndicatorSeparator: () => null,
                },
                styles: {
                  control: (base) => ({
                    ...base,
                    padding: '4px',
                    borderRadius: '8px',
                    borderColor: '#D1D5DB',
                    boxShadow: 'none',
                  }),
                  placeholder: (base) => ({
                    ...base,
                    color: '#6B7280',
                  }),
                },
              }}
            />

            
          </div>

          {/* 🗺 Map Container */}
          <div className="w-full h-[400px] rounded-md overflow-hidden border">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={location || defaultCenter}
              zoom={14}
              onClick={handleMapClick}
            >
              {location && <Marker position={location} />}
            </GoogleMap>
          </div>

          <div className="flex justify-center mt-4">
            <button
              onClick={onClose}
              className="bg-blue-500 hover:bg-blue-600 transition-all cursor-pointer text-white px-6 py-2 rounded-md"
            >
              Confirm Location
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
