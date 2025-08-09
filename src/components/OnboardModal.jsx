import React, { useCallback, useEffect, useState, forwardRef, useRef } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { X } from "lucide-react";
import { FaSearch } from "react-icons/fa";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = {
  lat: 0, // New Delhi
  lng: 0,
};

const OnboardingModal = ({ isOpen, onClose, location, setLocation, defaultValue, onConfirm }) => {
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);
  const [searchValue, setSearchValue] = useState(defaultValue || '');
  const [tempLocation, setTempLocation] = useState(location);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
      window.scrollTo(0, 0);
      setTempLocation(location);
      setSearchValue(defaultValue || '');

      // Initialize autocomplete when modal opens
      if (inputRef.current && window.google?.maps?.places?.Autocomplete && !autocompleteRef.current) {
        autocompleteRef.current = new window.google.maps.places.Autocomplete(
          inputRef.current,
          {
            types: ['(cities)'],
            fields: ['place_id', 'geometry', 'name', 'formatted_address']
          }
        );

        autocompleteRef.current.addListener('place_changed', () => {
          const place = autocompleteRef.current.getPlace();
          if (place && place.geometry) {
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();
            setTempLocation({ lat, lng });
            const placeName = place.formatted_address || place.name || '';
            setSearchValue(placeName);
          }
        });
      }
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
      // Cleanup autocomplete listener
      if (autocompleteRef.current && window.google?.maps?.event) {
        window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
        autocompleteRef.current = null;
      }
    };
  }, [isOpen, location, defaultValue]);

  const handleMapClick = useCallback((event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setTempLocation({ lat, lng });
    setSearchValue(`${lat.toFixed(6)}, ${lng.toFixed(6)}`);
  }, []);

  const handleConfirm = () => {
    setLocation(tempLocation);
    if (onConfirm) {
      onConfirm(searchValue);
    }
    onClose();
  };

  const handleReset = () => {
    setSearchValue('');
    setTempLocation(defaultCenter);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
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

          <div className="my-4 flex md:flex-row flex-col w-full gap-2">
            <div className="relative w-full justify-center">
              <input
                ref={inputRef}
                type="text"
                placeholder="Search a city, region"
                className="p-3 pr-10 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              {searchValue ? (
                <button
                  type="button"
                  onClick={handleReset}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-all cursor-pointer"
                  title="Clear location"
                >
                  <X className="w-5 h-5" />
                </button>
              ) : (
                <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
              )}
            </div>

            <button
              onClick={handleConfirm}
              className="bg-blue-500 min-w-46 min-h-12 hover:bg-blue-600 transition-all cursor-pointer text-white px-6 rounded-md"
            >
              Confirm Location
            </button>
          </div>

          <div className="w-full h-[400px] rounded-md overflow-hidden border">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={tempLocation || defaultCenter}
              zoom={14}
              onClick={handleMapClick}
            >
              {tempLocation && <Marker position={tempLocation} />}
            </GoogleMap>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingModal;