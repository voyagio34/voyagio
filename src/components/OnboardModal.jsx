import React, { useCallback, useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { X } from "lucide-react";
import { FaSearch } from "react-icons/fa";

const LIBRARIES = ['places']

const containerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = {
  lat: 28.6139, // New Delhi
  lng: 77.2090,
};

export default function OnboardingModal({ isOpen, onClose, location, setLocation, ref,defaultValue }) {
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

  // const { isLoaded } = useJsApiLoader({
  //   googleMapsApiKey: import.meta.env.VITE_REACT_GOOGLE_MAPS_API_KEY,
  //   libraries: LIBRARIES
  // });

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
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-start pt-10 justify-center px-4" data-aos="fade-in" data-aos-duration="500">
      <div className="bg-white rounded-2xl w-full max-w-3xl shadow-xl relative z-50">
        <button
          onClick={onClose}
          className="absolute cursor-pointer transition-all top-8 right-6 text-gray-500 hover:text-black"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-6 pt-10">
          <h2 className="text-2xl font-semibold text-center">Select Onboarding</h2>
          <p className="text-center text-gray-500 mb-4">Search or click on map to select a location</p>

          {/* 🔍 Autocomplete Search */}
          <div className="my-4 flex md:flex-row flex-col  w-full gap-2">
            <div className="relative w-full justify-center">
              <input
                ref={ref}
                type="text"
                placeholder="Search a city, region"
                className="p-3 pr-10 border  border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                defaultValue={defaultValue}
              />
              <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>

            <button
              onClick={onClose}
              className="bg-blue-500 min-w-46 min-h-12 hover:bg-blue-600 transition-all cursor-pointer text-white px-6 rounded-md"
            >
              Confirm Location
            </button>

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

         
        </div>
      </div>
    </div>
  );
}
