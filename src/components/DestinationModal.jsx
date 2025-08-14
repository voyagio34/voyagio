import React, { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { FaSearch } from "react-icons/fa";

const containerStyle = { width: "100%", height: "100%" };
const defaultCenter = {
  lat: 28.6139,
  lng: 77.2090
}
;

const DestinationModal = ({ isOpen, onClose, location, setLocation, defaultValue, onConfirm }) => {
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);
  const geocoderRef = useRef(null);
  const [searchValue, setSearchValue] = useState(defaultValue || "");
  const [tempLocation, setTempLocation] = useState(location);

  // helper to pick a nice "City, State, Country" string from geocoder results
  const pickCityString = (result) => {
    if (!result) return null;
    const comps = result.address_components || [];
    const get = (type) => comps.find((c) => c.types.includes(type))?.long_name;

    const city = get("locality") || get("postal_town") || get("sublocality") || get("administrative_area_level_2");
    const state = get("administrative_area_level_1");
    const country = get("country");

    if (city && state && country) return `${city}, ${state}, ${country}`;
    if (city && country) return `${city}, ${country}`;
    if (state && country) return `${state}, ${country}`;
    return result.formatted_address || null;
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
      window.scrollTo(0, 0);
      setTempLocation(location);
      setSearchValue(defaultValue || "");

      // init geocoder
      if (window.google?.maps?.Geocoder && !geocoderRef.current) {
        geocoderRef.current = new window.google.maps.Geocoder();
      }

      // init autocomplete
      if (inputRef.current && window.google?.maps?.places?.Autocomplete && !autocompleteRef.current) {
        autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
          types: ["(cities)"],
          fields: ["place_id", "geometry", "name", "formatted_address", "address_components"],
        });

        autocompleteRef.current.addListener("place_changed", () => {
          const place = autocompleteRef.current.getPlace();
          if (place && place.geometry) {
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();
            setTempLocation({ lat, lng });

            // format city string if components available
            const comps = place.address_components || [];
            const get = (type) => comps.find((c) => c.types.includes(type))?.long_name;
            const city = get("locality") || get("postal_town");
            const state = get("administrative_area_level_1");
            const country = get("country");

            const nice =
              (city && state && country && `${city}, ${state}, ${country}`) ||
              (city && country && `${city}, ${country}`) ||
              place.formatted_address ||
              place.name ||
              "";

            setSearchValue(nice);
          }
        });
      }
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
      if (autocompleteRef.current && window.google?.maps?.event) {
        window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
        autocompleteRef.current = null;
      }
    };
  }, [isOpen, location, defaultValue]);

  const reverseGeocode = useCallback(async (lat, lng) => {
    if (!geocoderRef.current) return null;
    return new Promise((resolve) => {
      geocoderRef.current.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === "OK" && results && results.length) {
          const localityResult =
            results.find((r) => r.types.includes("locality")) ||
            results.find((r) => r.types.includes("postal_town")) ||
            results.find((r) => r.types.includes("administrative_area_level_2")) ||
            results[0];

          resolve(pickCityString(localityResult));
        } else {
          resolve(null);
        }
      });
    });
  }, []);

  const handleMapClick = useCallback(
    async (event) => {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setTempLocation({ lat, lng });

      const cityString = await reverseGeocode(lat, lng);
      setSearchValue(cityString || `${lat.toFixed(6)}, ${lng.toFixed(6)}`); // fallback to coords
    },
    [reverseGeocode]
  );

  const handleConfirm = () => {
    setLocation(tempLocation);
    if (onConfirm) onConfirm(searchValue); // now a nice city string when available
    onClose();
  };

  const handleReset = () => {
    setSearchValue("");
    setTempLocation(defaultCenter);
    if (inputRef.current) inputRef.current.value = "";
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm pt-10 z-50 flex items-start justify-center px-4" data-aos="fade-in" data-aos-duration="500">
      <div className="bg-white rounded-2xl w-full max-w-3xl shadow-xl relative z-50">
        <button onClick={onClose} className="absolute cursor-pointer transition-all top-8 right-6 text-gray-500 hover:text-black">
          <X className="w-6 h-6" />
        </button>

        <div className="p-6 pt-10">
          <h2 className="text-2xl font-semibold text-center">Select Destination</h2>
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

            <button onClick={handleConfirm} className="bg-blue-500 min-w-46 min-h-12 hover:bg-blue-600 transition-all cursor-pointer text-white px-6 rounded-md">
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

export default DestinationModal;
